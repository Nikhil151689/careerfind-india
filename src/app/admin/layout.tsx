'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // If already on login page, skip check
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }

    async function checkAuth() {
      // 1. Check local session token or mock demo auth
      const localToken = localStorage.getItem('admin_authenticated');
      if (localToken === 'true') {
        setIsAuth(true);
        setChecking(false);
        return;
      }

      // 2. If Supabase is configured, check real Supabase auth session
      const supabase = getSupabaseClient();
      if (supabase && isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            localStorage.setItem('admin_authenticated', 'true');
            setIsAuth(true);
            setChecking(false);
            return;
          }
        } catch {
          // session check error fallback
        }
      }

      // 3. Otherwise redirect to admin login
      router.push('/admin/login');
    }

    checkAuth();
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs text-slate-400">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <AdminNav />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
