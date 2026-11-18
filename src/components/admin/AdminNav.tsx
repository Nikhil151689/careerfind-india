'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Briefcase, 
  FolderTree, 
  Building2, 
  BookOpen, 
  Users, 
  PlusCircle, 
  LogOut,
  LayoutDashboard,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated');
      sessionStorage.removeItem('admin_authenticated');
      const supabase = getSupabaseClient();
      if (supabase && isSupabaseConfigured) {
        try {
          await supabase.auth.signOut();
        } catch {}
      }
      router.push('/admin/login');
    }
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Jobs', href: '/admin/jobs', icon: Briefcase },
    { label: 'AI Job Collector', href: '/admin/collector', icon: Sparkles },
    { label: 'Post New Job', href: '/admin/jobs/new', icon: PlusCircle },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal title */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  CareerFind Admin
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">
                  Verified Portal Control
                </span>
              </div>
            </Link>

            {/* Nav items */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-2.5 py-1.5 rounded-lg border border-rose-900/60 transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
