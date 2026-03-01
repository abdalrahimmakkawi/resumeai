import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isPro = false;
  if (user) {
    const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
    isPro = sub?.plan === 'pro' && sub?.status === 'active';
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        padding: '80px 32px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Choose Your Plan</h1>
        <p style={{
          fontSize: '20px',
          opacity: 0.9,
          margin: '0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>Select the perfect plan for your career needs and start landing more interviews today</p>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '-48px auto 0',
        padding: '0 32px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Free Plan */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '40px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.3s',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'translateY(-8px)';
          target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        }}
        onMouseOut={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>📄</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>Free</h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>Perfect for getting started</p>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>$0</div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>per month</p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            {[
              '3 resumes per month',
              'Basic ATS scoring',
              '1 template option'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                fontSize: '16px',
                color: '#374151'
              }}>
                <span style={{ color: '#10b981', marginRight: '12px', fontSize: '20px' }}>✓</span>
                {feature}
              </div>
            ))}
            {[
              'Cover letter generation',
              'PDF downloads',
              'Priority support'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                fontSize: '16px',
                color: '#9ca3af'
              }}>
                <span style={{ marginRight: '12px', fontSize: '20px' }}>✗</span>
                {feature}
              </div>
            ))}
          </div>

          {user ? (
            <Link
              href="/resume-builder"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                background: 'white',
                color: '#4f46e5',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: '1px solid #d1d5db',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = '#f9fafb';
                target.style.borderColor = '#4f46e5';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'white';
                target.style.borderColor = '#d1d5db';
              }}
            >
              Get Started
            </Link>
          ) : (
            <Link
              href="/auth/signup"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                background: 'white',
                color: '#4f46e5',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: '1px solid #d1d5db',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = '#f9fafb';
                target.style.borderColor = '#4f46e5';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'white';
                target.style.borderColor = '#d1d5db';
              }}
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Pro Plan */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)',
          padding: '40px',
          color: 'white',
          transform: 'scale(1.05)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            background: '#ef4444',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Most Popular</div>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>⭐</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>Pro</h3>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              margin: '0'
            }}>For serious job seekers</p>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              margin: '0 0 8px 0'
            }}>$12</div>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              margin: '0'
            }}>per month</p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            {[
              'Unlimited resumes',
              'Advanced ATS scoring',
              'Cover letter generation',
              'Multiple templates',
              'PDF downloads',
              'Priority support'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                fontSize: '16px'
              }}>
                <span style={{ color: '#fbbf24', marginRight: '12px', fontSize: '20px' }}>✓</span>
                {feature}
              </div>
            ))}
          </div>

          {isPro ? (
            <button
              disabled
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'not-allowed',
                textAlign: 'center'
              }}
            >
              ✅ You're Pro
            </button>
          ) : user ? (
            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px 24px',
                  background: 'white',
                  color: '#4f46e5',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = '#f9fafb';
                  target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'white';
                  target.style.transform = 'translateY(0)';
                }}
              >
                Start Free Trial
              </button>
            </form>
          ) : (
            <Link
              href="/auth/signup"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                background: 'white',
                color: '#4f46e5',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = '#f9fafb';
                target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'white';
                target.style.transform = 'translateY(0)';
              }}
            >
              Get Pro
            </Link>
          )}
        </div>

        {/* Enterprise Plan */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '40px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'translateY(-8px)';
          target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        }}
        onMouseOut={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>🏢</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>Enterprise</h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>For teams and organizations</p>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>Custom</div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>pricing</p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            {[
              'Everything in Pro',
              'Custom branding',
              'Team collaboration',
              'Custom integrations',
              'Dedicated support',
              'SLA guarantee'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                fontSize: '16px',
                color: '#374151'
              }}>
                <span style={{ color: '#10b981', marginRight: '12px', fontSize: '20px' }}>✓</span>
                {feature}
              </div>
            ))}
          </div>

          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 24px',
              background: 'white',
              color: '#4f46e5',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = '#f9fafb';
              target.style.borderColor = '#4f46e5';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'white';
              target.style.borderColor = '#d1d5db';
            }}
          >
            Contact Sales
          </button>
        </div>
      </div>

      {/* Feature Comparison */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px 80px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: '48px'
        }}>Feature Comparison</h2>
        
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Feature</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Free</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4f46e5' }}>Pro</th>
                <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Monthly Resumes', free: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
                { feature: 'ATS Scoring', free: '✓', pro: '✓', enterprise: '✓' },
                { feature: 'Cover Letters', free: '✗', pro: '✓', enterprise: '✓' },
                { feature: 'PDF Downloads', free: '✗', pro: '✓', enterprise: '✓' },
                { feature: 'Templates', free: '1', pro: '5+', enterprise: 'Custom' },
                { feature: 'Support', free: 'Email', pro: 'Priority', enterprise: 'Dedicated' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151' }}>{row.feature}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{row.free}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#4f46e5', fontWeight: '600' }}>{row.pro}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        padding: '80px 32px',
        textAlign: 'center',
        color: 'white',
        borderRadius: '16px',
        margin: '0 32px 80px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          margin: '0 0 16px 0'
        }}>Ready to Transform Your Job Search?</h2>
        <p style={{
          fontSize: '18px',
          opacity: 0.9,
          margin: '0 0 32px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>Join thousands of job seekers who have landed their dream jobs with AI-powered resumes</p>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/auth/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              background: 'white',
              color: '#4f46e5',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.background = '#f9fafb';
              target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.background = 'white';
              target.style.transform = 'translateY(0)';
            }}
          >
            Start Your Free Trial
          </Link>
          <Link
            href="/resume-builder"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Try Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
