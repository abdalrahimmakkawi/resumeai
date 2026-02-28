import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Land Your Dream Job Faster</h1>
        <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
          ResumeAI tailors your resume to every job description automatically — beating ATS filters and impressing hiring managers.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/signup" className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition">
            Get Started Free
          </Link>
          <Link href="/pricing" className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition">
            View Pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need to Get Hired</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🎯', title: 'Job-Tailored Resume', desc: 'Paste any job description and we instantly rewrite your resume to match keywords and tone.' },
            { icon: '📊', title: 'ATS Score', desc: 'See exactly how well your resume matches the job with a score, matched keywords, and suggestions.' },
            { icon: '✉️', title: 'Cover Letter', desc: 'Generate a personalized cover letter in seconds based on your resume and the job.' },
          ].map((f) => (
            <div key={f.title} className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-indigo-50 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
        <p className="text-gray-600 mb-8">Start free, upgrade when you need more.</p>
        <div className="flex gap-6 justify-center flex-wrap">
          <div className="bg-white rounded-xl p-8 shadow w-64">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold text-indigo-600 mb-4">$0</p>
            <ul className="text-gray-600 text-sm space-y-2 mb-6">
              <li>✅ 1 Resume Generation</li>
              <li>✅ ATS Score</li>
              <li>❌ Cover Letter</li>
              <li>❌ PDF Download</li>
            </ul>
            <Link href="/auth/signup" className="block bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </Link>
          </div>
          <div className="bg-indigo-600 text-white rounded-xl p-8 shadow w-64">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$12<span className="text-lg font-normal">/mo</span></p>
            <ul className="text-sm space-y-2 mb-6 text-indigo-100">
              <li>✅ Unlimited Resumes</li>
              <li>✅ ATS Score</li>
              <li>✅ Cover Letter</li>
              <li>✅ PDF Download</li>
            </ul>
            <Link href="/pricing" className="block bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-50 transition">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        © 2026 ResumeAI. All rights reserved.
      </footer>
    </main>
  );
}
