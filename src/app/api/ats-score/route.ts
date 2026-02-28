import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resume, jobDescription } = await req.json();

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are an ATS specialist. Compare this resume against the job description. Output ONLY valid JSON: { "score": 0, "matched_keywords": [], "missing_keywords": [], "suggestions": [] }

Resume: ${JSON.stringify(resume)}
Job Description: ${jobDescription}`
      }],
      temperature: 0.3,
    });

    const text = response.choices[0].message.content || '';
    const match = text.match(/\{[\s\S]*\}/);
    const ats = match ? JSON.parse(match[0]) : { score: 0, matched_keywords: [], missing_keywords: [], suggestions: [] };
    return NextResponse.json({ ats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
