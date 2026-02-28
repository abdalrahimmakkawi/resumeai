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
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resume Builder</h1>

        {/* Inputs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Google"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience / Current Resume</label>
            <textarea value={experience} onChange={e => setExperience(e.target.value)}
              rows={6} placeholder="Paste your current resume or describe your work experience..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)}
              rows={6} placeholder="Paste the job description here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes('Free plan') && (
                <Link href="/pricing" className="text-indigo-600 font-semibold text-sm hover:underline mt-1 block">
                  Upgrade to Pro →
                </Link>
              )}
            </div>
          )}
          <button onClick={generateResume} disabled={loading || !experience || !jobDescription}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <><span className="animate-spin">⏳</span> Tailoring your resume...</>
            ) : '✨ Generate Resume'}
          </button>
        </div>

        {/* Resume Output */}
        {resume && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Tailored Resume</h2>
              {ats && (
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${ats.score >= 70 ? 'bg-green-100 text-green-700' : ats.score >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                  ATS Score: {ats.score}%
                </span>
              )}
            </div>

            {/* Resume Content */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{resume.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{resume.email} · {resume.phone} · {resume.location}</p>
            </div>
            {resume.summary && (
              <div className="mb-4">
                <h4 className="font-semibold text-indigo-600 uppercase text-xs tracking-wide mb-2">Summary</h4>
                <p className="text-gray-700 text-sm">{resume.summary}</p>
              </div>
            )}
            {resume.experience?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-indigo-600 uppercase text-xs tracking-wide mb-2">Experience</h4>
                {resume.experience.map((exp: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-900">{exp.title} — {exp.company}</p>
                      <p className="text-gray-400 text-xs">{exp.dates}</p>
                    </div>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {exp.bullets?.map((b: string, j: number) => (
                        <li key={j} className="text-gray-700 text-sm">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {resume.education?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-indigo-600 uppercase text-xs tracking-wide mb-2">Education</h4>
                {resume.education.map((edu: any, i: number) => (
                  <p key={i} className="text-gray-700 text-sm">{edu.degree} — {edu.school}, {edu.year}</p>
                ))}
              </div>
            )}
            {resume.skills?.length > 0 && (
              <div>
                <h4 className="font-semibold text-indigo-600 uppercase text-xs tracking-wide mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill: string, i: number) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* ATS Details */}
            {ats && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">ATS Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-600 font-medium mb-1">✅ Matched Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {ats.matched_keywords?.map((k: string, i: number) => (
                        <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-red-500 font-medium mb-1">❌ Missing Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {ats.missing_keywords?.map((k: string, i: number) => (
                        <span key={i} className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {ats.suggestions?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-gray-600 font-medium mb-1">💡 Suggestions</p>
                    <ul className="list-disc list-inside space-y-1">
                      {ats.suggestions.map((s: string, i: number) => (
                        <li key={i} className="text-gray-600 text-xs">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6 flex-wrap">
              <button onClick={generateCoverLetter} disabled={coverLoading}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
                {coverLoading ? 'Generating...' : '✉️ Generate Cover Letter'}
              </button>
              <Link href="/pricing"
                className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition">
                📄 Download PDF (Pro)
              </Link>
            </div>
          </div>
        )}

        {/* Cover Letter */}
        {coverLetter && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cover Letter</h2>
            <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{coverLetter}</div>
          </div>
        )}
      </div>
    </div>
  );
}
