'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const active = (path: string) =>
    pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-600">ResumeAI</Link>
      <div className="flex items-center gap-6 text-sm">
        {user ? (
          <>
            <Link href="/dashboard" className={active('/dashboard')}>Dashboard</Link>
            <Link href="/resume-builder" className={active('/resume-builder')}>Builder</Link>
            <Link href="/pricing" className={active('/pricing')}>Pricing</Link>
            <Link href="/account" className={active('/account')}>Account</Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link href="/pricing" className={active('/pricing')}>Pricing</Link>
            <Link href="/auth/login" className={active('/auth/login')}>Login</Link>
            <Link href="/auth/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
