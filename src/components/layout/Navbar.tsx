'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Building2, 
  GraduationCap, 
  Landmark, 
  Home, 
  Sparkles,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const navLinks = [
    { label: 'All Jobs', href: '/jobs' },
    { label: 'Fresher Jobs', href: '/categories/btech-fresher-jobs' },
    { label: 'Govt Jobs', href: '/categories/government-jobs' },
    { label: 'Remote / WFH', href: '/categories/work-from-home' },
    { label: 'Career Blog', href: '/blog' },
  ];

  const categorySublinks = [
    { label: 'IT & Software', href: '/categories/it-software', icon: Briefcase },
    { label: 'AI & Machine Learning', href: '/categories/ai-machine-learning', icon: Sparkles },
    { label: 'Data Analyst', href: '/categories/data-analyst', icon: Building2 },
    { label: 'Software Developer', href: '/categories/software-developer', icon: Briefcase },
    { label: 'Internships', href: '/categories/internships', icon: GraduationCap },
    { label: 'Government & Banking', href: '/categories/government-jobs', icon: Landmark },
    { label: 'Work From Home', href: '/categories/work-from-home', icon: Home },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
              {/* Subtle India Flag color touch */}
              <div className="absolute -top-1 -right-1 flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-white border border-slate-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  CareerFind
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                  India
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Verified Indian Recruitment Portal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/jobs"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/jobs')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              All Jobs
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith('/categories')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-xl">
                    <div className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-500 px-3 py-1.5 tracking-wider">
                      Popular Sectors
                    </div>
                    {categorySublinks.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setCategoriesOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Icon className="w-4 h-4 text-indigo-500" />
                          <span>{cat.label}</span>
                        </Link>
                      );
                    })}
                    <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href="/jobs"
                        onClick={() => setCategoriesOpen(false)}
                        className="block text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline py-1.5"
                      >
                        Browse All 12+ Categories &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Quick Search Shortcut */}
            <Link
              href="/jobs"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Search Jobs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search</span>
            </Link>

            {/* Admin Dashboard Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">Admin Portal</span>
              <span className="md:hidden">Admin</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <Link
            href="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>Search All Jobs</span>
          </Link>

          <div className="py-1">
            <p className="px-3 text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Popular Indian Categories
            </p>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {categorySublinks.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Career Advice & ATS Guides</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              About CareerFind India
            </Link>
            <Link
              href="/disclaimer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Recruitment Disclaimer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
