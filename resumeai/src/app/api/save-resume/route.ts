import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resumeId, resume, jobTitle, companyName, atsScore, coverLetter } = await req.json();
  const admin = createAdminClient();

  if (resumeId) {
    const { data } = await admin.from('resumes').update({
      resume_json: resume,
      job_title: jobTitle,
      company_name: companyName,
      ats_score: atsScore,
      cover_letter: coverLetter,
    }).eq('id', resumeId).eq('user_id', user.id).select().single();
    return NextResponse.json({ id: data?.id });
  }

  const { data } = await admin.from('resumes').insert({
    user_id: user.id,
    resume_json: resume,
    job_title: jobTitle,
    company_name: companyName,
    ats_score: atsScore,
    cover_letter: coverLetter,
  }).select().single();

  return NextResponse.json({ id: data?.id });
}
