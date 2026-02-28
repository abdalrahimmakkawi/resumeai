import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?redirectTo=/dashboard');

  const { data: resumes } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isPro ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
              {isPro ? '⭐ Pro' : 'Free'}
            </span>
            <Link href="/resume-builder"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
              + New Resume
            </Link>
          </div>
        </div>

        {resumes && resumes.length > 0 ? (
          <div className="grid gap-4">
            {resumes.map((resume: any) => (
              <div key={resume.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{resume.job_title || 'Untitled Resume'}</h3>
                  <p className="text-sm text-gray-500">{resume.company_name || 'No company'} · {new Date(resume.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  {resume.ats_score && (
                    <span className={`text-sm font-bold ${resume.ats_score >= 70 ? 'text-green-600' : resume.ats_score >= 40 ? 'text-yellow-600' : 'text-red-500'}`}>
                      ATS: {resume.ats_score}%
                    </span>
                  )}
                  <Link href={`/resumes/${resume.id}`} className="text-indigo-600 text-sm hover:underline">View</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No resumes yet</p>
            <Link href="/resume-builder" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Create Your First Resume
            </Link>
          </div>
        )}

        {!isPro && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
            <p className="text-indigo-800 font-semibold mb-2">You're on the Free plan</p>
            <p className="text-indigo-600 text-sm mb-4">Upgrade to Pro for unlimited resumes, cover letters & PDF downloads</p>
            <Link href="/pricing" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Upgrade to Pro — $12/mo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
