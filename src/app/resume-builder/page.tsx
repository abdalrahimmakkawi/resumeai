'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ResumeBuilderPage() {
  const [experience, setExperience] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [resume, setResume] = useState<any>(null);
  const [ats, setAts] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const supabase = createClient();

  const generateResume = async () => {
    setLoading(true);
    setError('');
    setResume(null);
    setAts(null);
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience, jobDescription, jobTitle, companyName }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403) setError('Free plan limit reached. Please upgrade to Pro.');
        else setError(data.error || 'Failed to generate resume');
        return;
      }
      setResume(data.resume);
      setAts(data.ats);
      setResumeId(data.id);
      setSaved(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateCoverLetter = async () => {
    setCoverLoading(true);
    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription, companyName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to generate cover letter');
        return;
      }
      setCoverLetter(data.coverLetter);
    } catch {
      setError('Something went wrong.');
    } finally {
      setCoverLoading(false);
    }
  };

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
            }}>Resume Builder</h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>Create an ATS-optimized resume tailored to your target job</p>
          </div>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              background: 'white',
              color: '#4f46e5',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
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
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px'
      }}>
        {/* Left Column - Input Form */}
        <div>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 24px 0'
            }}>Job Information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Job Title</label>
                  <input
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.style.borderColor = '#4f46e5';
                      target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.style.borderColor = '#d1d5db';
                      target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Company Name</label>
                  <input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Google"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.style.borderColor = '#4f46e5';
                      target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.style.borderColor = '#d1d5db';
                      target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Your Experience / Current Resume</label>
                <textarea
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  rows={6}
                  placeholder="Paste your current resume or describe your work experience..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    resize: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.borderColor = '#4f46e5';
                    target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.borderColor = '#d1d5db';
                    target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  rows={6}
                  placeholder="Paste the job description here..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    resize: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.borderColor = '#4f46e5';
                    target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.borderColor = '#d1d5db';
                    target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {error && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '14px'
                }}>
                  <div>{error}</div>
                  {error.includes('Free plan') && (
                    <Link
                      href="/pricing"
                      style={{
                        color: '#4f46e5',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginTop: '8px'
                      }}
                      onMouseOver={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.textDecoration = 'underline';
                      }}
                      onMouseOut={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.textDecoration = 'none';
                      }}
                    >
                      Upgrade to Pro →
                    </Link>
                  )}
                </div>
              )}

              <button
                onClick={generateResume}
                disabled={loading || !experience || !jobDescription}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: loading ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)';
                    target.style.transform = 'translateY(-1px)';
                    target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                    Tailoring your resume...
                  </>
                ) : (
                  <>✨ Generate Resume</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Resume Preview */}
        <div>
          {resume ? (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              padding: '32px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0'
                }}>Your Tailored Resume</h2>
                {ats && (
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: ats.score >= 80 ? '#10b981' : ats.score >= 60 ? '#f59e0b' : '#ef4444',
                    color: 'white'
                  }}>
                    ATS Score: {ats.score}%
                  </div>
                )}
              </div>

              {/* Resume Content */}
              <div style={{
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '16px',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 8px 0'
                  }}>{resume.name}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0'
                  }}>{resume.email} · {resume.phone} · {resume.location}</p>
                </div>

                {resume.summary && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#4f46e5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 8px 0'
                    }}>Summary</h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: '1.6',
                      margin: '0'
                    }}>{resume.summary}</p>
                  </div>
                )}

                {resume.experience?.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#4f46e5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 12px 0'
                    }}>Experience</h4>
                    {resume.experience.map((exp: any, i: number) => (
                      <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '4px'
                        }}>
                          <p style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0'
                          }}>{exp.title} — {exp.company}</p>
                          <p style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            margin: '0'
                          }}>{exp.dates}</p>
                        </div>
                        <ul style={{
                          margin: '8px 0 0 0',
                          paddingLeft: '20px'
                        }}>
                          {exp.bullets?.map((b: string, j: number) => (
                            <li key={j} style={{
                              fontSize: '14px',
                              color: '#374151',
                              marginBottom: '4px',
                              lineHeight: '1.5'
                            }}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {resume.education?.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#4f46e5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 8px 0'
                    }}>Education</h4>
                    {resume.education.map((edu: any, i: number) => (
                      <p key={i} style={{
                        fontSize: '14px',
                        color: '#374151',
                        margin: '0 0 4px 0'
                      }}>{edu.degree} — {edu.school}, {edu.year}</p>
                    ))}
                  </div>
                )}

                {resume.skills?.length > 0 && (
                  <div>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#4f46e5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 8px 0'
                    }}>Skills</h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {resume.skills.map((skill: string, i: number) => (
                        <span key={i} style={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          color: 'white',
                          fontSize: '12px',
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontWeight: '500'
                        }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ATS Analysis */}
              {ats && (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 16px 0'
                  }}>ATS Analysis</h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#10b981',
                        margin: '0 0 8px 0'
                      }}>✅ Matched Keywords</p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        {ats.matched_keywords?.map((k: string, i: number) => (
                          <span key={i} style={{
                            background: '#10b981',
                            color: 'white',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontWeight: '500'
                          }}>{k}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#ef4444',
                        margin: '0 0 8px 0'
                      }}>❌ Missing Keywords</p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        {ats.missing_keywords?.map((k: string, i: number) => (
                          <span key={i} style={{
                            background: '#ef4444',
                            color: 'white',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontWeight: '500'
                          }}>{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {ats.suggestions?.length > 0 && (
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 8px 0'
                      }}>💡 Suggestions</p>
                      <ul style={{
                        margin: '0',
                        paddingLeft: '20px'
                      }}>
                        {ats.suggestions.map((s: string, i: number) => (
                          <li key={i} style={{
                            fontSize: '13px',
                            color: '#6b7280',
                            marginBottom: '4px',
                            lineHeight: '1.4'
                          }}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={generateCoverLetter}
                  disabled={coverLoading}
                  style={{
                    padding: '12px 20px',
                    background: coverLoading ? '#9ca3af' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: coverLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: coverLoading ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    if (!coverLoading) {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!coverLoading) {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                    }
                  }}
                >
                  {coverLoading ? 'Generating...' : '✉️ Generate Cover Letter'}
                </button>
                <Link
                  href="/pricing"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    background: 'white',
                    color: '#4f46e5',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
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
                  📄 Download PDF (Pro)
                </Link>
              </div>
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
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>Your resume will appear here</h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0'
              }}>Fill in the job information and click "Generate Resume" to get started</p>
            </div>
          )}

          {/* Cover Letter */}
          {coverLetter && (
            <div style={{
              marginTop: '32px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              padding: '32px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 24px 0'
              }}>Cover Letter</h2>
              <div style={{
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '8px',
                padding: '24px',
                fontSize: '14px',
                color: '#374151',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}>
                {coverLetter}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
