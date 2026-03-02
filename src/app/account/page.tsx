'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        router.push('/auth/login?redirectTo=/account'); 
        return; 
      }
      setUser(user);
      const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
      setSubscription(sub);
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Profile</h2>
          <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-semibold">{isPro ? '⭐ Pro Plan' : 'Free Plan'}</p>
              <p className="text-gray-500 text-sm">{isPro ? `Status: ${subscription?.status}` : 'Limited to 1 resume generation'}</p>
            </div>
            {isPro ? (
              <a 
                href="https://app.lemonsqueezy.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition"
              >
                Manage Billing
              </a>
            ) : (
              <Link href="/pricing" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Actions</h2>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm hover:underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
