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
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-500 mb-12">Start free. Upgrade when you're ready.</p>

        <div className="flex gap-6 justify-center flex-wrap">
          {/* Free */}
          <div className="bg-white rounded-2xl shadow p-8 w-72 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
            <p className="text-4xl font-bold text-gray-900 mb-1">$0</p>
            <p className="text-gray-400 text-sm mb-6">Forever free</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>✅ 1 Resume Generation</li>
              <li>✅ ATS Score & Analysis</li>
              <li>❌ Cover Letter</li>
              <li>❌ PDF Download</li>
              <li>❌ Unlimited Resumes</li>
            </ul>
            {user ? (
              <Link href="/resume-builder" className="block text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-semibold">
                Go to Builder
              </Link>
            ) : (
              <Link href="/auth/signup" className="block text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-semibold">
                Get Started
              </Link>
            )}
          </div>

          {/* Pro */}
          <div className="bg-indigo-600 text-white rounded-2xl shadow-xl p-8 w-72 text-left relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </span>
            <h2 className="text-xl font-bold mb-1">Pro</h2>
            <p className="text-4xl font-bold mb-1">$12<span className="text-lg font-normal">/mo</span></p>
            <p className="text-indigo-200 text-sm mb-6">Cancel anytime</p>
            <ul className="space-y-3 text-sm text-indigo-100 mb-8">
              <li>✅ Unlimited Resumes</li>
              <li>✅ ATS Score & Analysis</li>
              <li>✅ Cover Letter Generator</li>
              <li>✅ PDF Download</li>
              <li>✅ Priority Support</li>
            </ul>
            {isPro ? (
              <button disabled className="w-full bg-white/20 text-white py-2 rounded-lg font-semibold cursor-not-allowed">
                ✅ You're Pro
              </button>
            ) : user ? (
              <CheckoutButton />
            ) : (
              <Link href="/auth/signup" className="block text-center bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-50 transition">
                Get Pro
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutButton() {
  'use client';
  return (
    <form action="/api/stripe/checkout" method="POST">
      <button type="submit" className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-indigo-50 transition">
        Upgrade to Pro
      </button>
    </form>
  );
}
