import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const admin = createAdminClient();
  const { data: subscription } = await admin.from('subscriptions').select('*').eq('user_id', user.id).single();
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';
  if (!isPro) return NextResponse.json({ error: 'Cover letters are a Pro feature. Please upgrade.' }, { status: 403 });

  const { resume, jobDescription, companyName } = await req.json();

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are an expert cover letter writer. Write a compelling 3-paragraph cover letter. Match the company tone. Never use clichés like "I am writing to express my interest". End with a confident call to action. Output plain text only.

Resume: ${JSON.stringify(resume)}
Job Description: ${jobDescription}
Company: ${companyName || 'the company'}`
      }],
      temperature: 0.8,
    });

    const coverLetter = response.choices[0].message.content || '';
    return NextResponse.json({ coverLetter });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
