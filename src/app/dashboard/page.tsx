'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        router.push('/auth/login?redirectTo=/dashboard'); 
        return; 
      }
      
      setUser(user);
      
      const { data: resumesData } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setResumes(resumesData || []);
      
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      setSubscription(sub);
      setLoading(false);
    };
    
    load();
  }, []);

  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f9fafb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px 32px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 4px 0'
            }}>My Resumes</h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>{user.email}</p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              background: isPro ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#f3f4f6',
              color: isPro ? 'white' : '#6b7280'
            }}>
              {isPro ? '⭐ Pro Plan' : 'Free Plan'}
            </div>
            <Link
              href="/resume-builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)';
                target.style.transform = 'translateY(-1px)';
                target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              + Create New Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px'
      }}>
        {resumes && resumes.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {resumes.map((resume: any) => (
              <div
                key={resume.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  padding: '24px',
                  transition: 'all 0.2s',
                  border: '1px solid #e5e7eb'
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 4px 0'
                    }}>{resume.job_title || 'Untitled Resume'}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '0'
                    }}>
                      {resume.company_name || 'No company'} · {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {isPro && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}>⭐</div>
                  )}
                </div>

                {resume.ats_score && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: resume.ats_score >= 80 ? '#10b981' : resume.ats_score >= 60 ? '#f59e0b' : '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {resume.ats_score}%
                      </div>
                      <div>
                        <p style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          margin: '0'
                        }}>ATS Score</p>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: resume.ats_score >= 80 ? '#10b981' : resume.ats_score >= 60 ? '#f59e0b' : '#ef4444',
                          margin: '0'
                        }}>
                          {resume.ats_score >= 80 ? 'Excellent' : resume.ats_score >= 60 ? 'Good' : 'Needs Work'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <Link
                    href={`/resumes/${resume.id}`}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.background = 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)';
                    }}
                    onMouseOut={(e) => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                    }}
                  >
                    View Resume
                  </Link>
                  <Link
                    href={`/resume-builder?id=${resume.id}`}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 16px',
                      background: 'white',
                      color: '#4f46e5',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: '1px solid #d1d5db',
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
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px'
            }}>📄</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>No resumes yet</h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 32px 0',
              maxWidth: '400px'
            }}>Create your first AI-powered resume to start landing more interviews</p>
            <Link
              href="/resume-builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)';
                target.style.transform = 'translateY(-1px)';
                target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              Create Your First Resume
            </Link>
          </div>
        )}

        {/* Upgrade Banner */}
        {!isPro && (
          <div style={{
            marginTop: '48px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '28px'
            }}>⭐</div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 12px 0'
            }}>Upgrade to ResumeAI Pro</h3>
            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              margin: '0 0 32px 0',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Unlock unlimited resumes, advanced ATS scoring, cover letter generation, and professional PDF templates
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
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
                Upgrade Now - $12/month
              </Link>
              <Link
                href="/resume-builder"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
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
        )}
      </div>
    </div>
  );
}
