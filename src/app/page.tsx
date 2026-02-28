import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", margin: 0, padding: 0, backgroundColor: '#fff' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: '#4F46E5' }}>ResumeAI</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/pricing" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '15px' }}>Pricing</Link>
          <Link href="/auth/login" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '15px' }}>Login</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#4F46E5', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)', color: '#fff', padding: '100px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '24px', fontWeight: 500 }}>
            🚀 AI-Powered Resume Builder
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', margin: '0 0 24px 0' }}>
            Land Your Dream Job <span style={{ color: '#FCD34D' }}>Faster</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', lineHeight: 1.6 }}>
            ResumeAI tailors your resume to every job description automatically — beating ATS filters and impressing hiring managers in seconds.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{ backgroundColor: '#fff', color: '#4F46E5', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 700, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              Get Started Free →
            </Link>
            <Link href="/pricing" style={{ border: '2px solid rgba(255,255,255,0.6)', color: '#fff', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 600 }}>
              View Pricing
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>No credit card required · Free plan available</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '48px', display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
        {[
          { number: '10x', label: 'Faster Resume Writing' },
          { number: '85%', label: 'Higher ATS Pass Rate' },
          { number: '3min', label: 'Average Time to Resume' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '40px', fontWeight: 900, color: '#4F46E5', margin: '0 0 4px 0' }}>{stat.number}</p>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '96px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 800, textAlign: 'center', color: '#111827', marginBottom: '16px' }}>
          Everything You Need to Get Hired
        </h2>
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '18px', marginBottom: '64px' }}>
          Stop sending generic resumes. Start getting interviews.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {[
            { icon: '🎯', title: 'Job-Tailored Resume', desc: 'Paste any job description and we instantly rewrite your resume to match keywords, tone, and requirements perfectly.', color: '#EEF2FF' },
            { icon: '📊', title: 'ATS Score Analysis', desc: 'See exactly how well your resume matches the job with a score, matched keywords, missing terms, and improvement suggestions.', color: '#F0FDF4' },
            { icon: '✉️', title: 'Cover Letter Generator', desc: 'Generate a personalized, compelling cover letter in seconds based on your resume and the specific job posting.', color: '#FFF7ED' },
            { icon: '📄', title: 'PDF Download', desc: 'Download your tailored resume as a professionally formatted PDF ready to send to employers instantly.', color: '#FDF4FF' },
            { icon: '💾', title: 'Resume History', desc: 'Save all your tailored resumes and access them anytime. Track which version you sent to which company.', color: '#F0F9FF' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Powered by advanced AI, your tailored resume is ready in under 30 seconds. Apply to more jobs in less time.', color: '#FFFBEB' },
          ].map((f) => (
            <div key={f.title} style={{ backgroundColor: f.color, borderRadius: '16px', padding: '32px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '96px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>How It Works</h2>
          <p style={{ color: '#6B7280', fontSize: '18px', marginBottom: '64px' }}>Three simple steps to your perfect resume</p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { step: '1', title: 'Paste Your Experience', desc: 'Add your current resume or describe your work history' },
              { step: '2', title: 'Add the Job Description', desc: 'Paste the job posting you want to apply for' },
              { step: '3', title: 'Get Your Tailored Resume', desc: 'Download your ATS-optimized resume instantly' },
            ].map((item) => (
              <div key={item.step} style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '96px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>Simple Pricing</h2>
          <p style={{ color: '#6B7280', fontSize: '18px', marginBottom: '64px' }}>Start free, upgrade when you're ready</p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Free */}
            <div style={{ backgroundColor: '#fff', border: '2px solid #E5E7EB', borderRadius: '20px', padding: '40px', width: '300px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>Free</h3>
              <p style={{ fontSize: '48px', fontWeight: 900, color: '#111827', margin: '0 0 4px' }}>$0</p>
              <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '32px' }}>Forever free</p>
              {[
                ['✅', '1 Resume Generation'],
                ['✅', 'ATS Score & Analysis'],
                ['❌', 'Cover Letter'],
                ['❌', 'PDF Download'],
                ['❌', 'Unlimited Resumes'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '15px', color: '#374151' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
              <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', border: '2px solid #4F46E5', color: '#4F46E5', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, marginTop: '32px' }}>
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div style={{ background: 'linear-gradient(135deg, #4F46E5, #2563EB)', borderRadius: '20px', padding: '40px', width: '300px', textAlign: 'left', position: 'relative', boxShadow: '0 20px 60px rgba(79,70,229,0.4)' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#FCD34D', color: '#78350F', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>Pro</h3>
              <p style={{ fontSize: '48px', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>$12<span style={{ fontSize: '18px', fontWeight: 400 }}>/mo</span></p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '32px' }}>Cancel anytime</p>
              {[
                ['✅', 'Unlimited Resumes'],
                ['✅', 'ATS Score & Analysis'],
                ['✅', 'Cover Letter Generator'],
                ['✅', 'PDF Download'],
                ['✅', 'Priority Support'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
              <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: '#fff', color: '#4F46E5', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, marginTop: '32px' }}>
                Get Pro Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)', padding: '96px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '44px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>Ready to Land Your Dream Job?</h2>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>Join thousands of job seekers using ResumeAI</p>
        <Link href="/auth/signup" style={{ backgroundColor: '#fff', color: '#4F46E5', padding: '16px 40px', borderRadius: '10px', textDecoration: 'none', fontSize: '18px', fontWeight: 700, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
          Start For Free Today →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', padding: '32px 48px', textAlign: 'center', fontSize: '14px' }}>
        <p style={{ margin: 0 }}>© 2026 ResumeAI. All rights reserved. · Built with ❤️ using AI</p>
      </footer>
    </main>
  );
}
