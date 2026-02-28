import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?redirectTo=/account');

  const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

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
            {isPro && subscription?.stripe_customer_id ? (
              <form action="/api/stripe/portal" method="POST">
                <button type="submit" className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition">
                  Manage Billing
                </button>
              </form>
            ) : (
              <Link href="/pricing" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Actions</h2>
          <form action="/auth/signout" method="POST">
            <button type="submit"
              className="text-red-500 text-sm hover:underline"
              onClick={async (e) => {
                e.preventDefault();
                const { createClient } = await import('@/lib/supabase/client');
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.href = '/';
              }}>
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
