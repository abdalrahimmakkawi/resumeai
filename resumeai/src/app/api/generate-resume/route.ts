import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { experience, jobDescription, jobTitle, companyName } = await req.json();
  if (!experience || !jobDescription) {
    return NextResponse.json({ error: 'Experience and job description are required' }, { status: 400 });
  }

  // Check free plan limit
  const admin = createAdminClient();
  const { data: subscription } = await admin.from('subscriptions').select('*').eq('user_id', user.id).single();
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

  if (!isPro) {
    const { count } = await admin.from('resumes').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
    if ((count ?? 0) >= 1) {
      return NextResponse.json({ error: 'Free plan limit reached. Upgrade to Pro.' }, { status: 403 });
    }
  }

  try {
    // Generate resume
    const resumeResponse = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are an expert resume writer. Given the user's experience and a job description, rewrite the resume to mirror keywords naturally, quantify achievements, prioritize relevant experience, and use strong action verbs. Output ONLY valid JSON with no other text: { "name": "", "email": "", "phone": "", "location": "", "summary": "", "experience": [{"title":"","company":"","dates":"","bullets":[]}], "education": [{"degree":"","school":"","year":""}], "skills": [] }

User Experience:
${experience}

Job Description:
${jobDescription}`
      }],
      temperature: 0.7,
    });

    const resumeText = resumeResponse.choices[0].message.content || '';
    const jsonMatch = resumeText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
    const resume = JSON.parse(jsonMatch[0]);

    // Generate ATS score
    const atsResponse = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are an ATS specialist. Compare this resume against the job description. Output ONLY valid JSON with no other text: { "score": 0, "matched_keywords": [], "missing_keywords": [], "suggestions": [] }

Resume: ${JSON.stringify(resume)}
Job Description: ${jobDescription}`
      }],
      temperature: 0.3,
    });

    const atsText = atsResponse.choices[0].message.content || '';
    const atsMatch = atsText.match(/\{[\s\S]*\}/);
    const ats = atsMatch ? JSON.parse(atsMatch[0]) : { score: 0, matched_keywords: [], missing_keywords: [], suggestions: [] };

    // Save to DB
    const { data: saved } = await admin.from('resumes').insert({
      user_id: user.id,
      job_title: jobTitle || null,
      company_name: companyName || null,
      resume_json: resume,
      ats_score: ats.score,
    }).select().single();

    return NextResponse.json({ id: saved?.id, resume, ats });
  } catch (error: any) {
    console.error('Generate resume error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate resume' }, { status: 500 });
  }
}
