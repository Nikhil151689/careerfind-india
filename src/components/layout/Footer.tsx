import React from 'react';
import Link from 'next/link';
import { Briefcase, ShieldAlert, Heart, Mail, ExternalLink, MapPin } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'IT & Software Jobs', href: '/categories/it-software' },
    { name: 'Data Analyst & BI', href: '/categories/data-analyst' },
    { name: 'AI & Machine Learning', href: '/categories/ai-machine-learning' },
    { name: 'Network Engineer', href: '/categories/network-engineer' },
    { name: 'Software Developer', href: '/categories/software-developer' },
    { name: 'B.Tech Fresher Hiring', href: '/categories/btech-fresher-jobs' },
  ];

  const popularTypes = [
    { name: 'Government & Banking Jobs', href: '/categories/government-jobs' },
    { name: 'Work From Home (Remote)', href: '/categories/work-from-home' },
    { name: 'Paid Tech Internships', href: '/categories/internships' },
    { name: 'Walk-In Interview Drives', href: '/categories/walk-in-interviews' },
    { name: 'Graduate Engineer Trainee', href: '/categories/graduate-trainee' },
    { name: 'Non-IT & Operations', href: '/categories/non-it-jobs' },
  ];

  const legalPages = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Recruitment Disclaimer', href: '/disclaimer' },
    { name: 'Advertise With Us', href: '/advertise' },
    { name: 'Career Advice Blog', href: '/blog' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Advisory Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-400">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold tracking-wide">
              Important Candidate Advisory:
            </span>
            <span className="text-slate-300">
              CareerFind India never requests fees or charges for interviews or placement. Always apply via verified official employer URLs.
            </span>
          </div>
          <Link
            href="/disclaimer"
            className="text-indigo-400 hover:text-indigo-300 underline font-medium whitespace-nowrap"
          >
            Read Fraud Prevention Guide &rarr;
          </Link>
        </div>
      </div>

      {/* Responsive Footer Banner Advertisement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <AdBanner placement="footer-banner" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  CareerFind
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-purple-900/80 text-purple-200">
                  India
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              CareerFind India is a trusted job portal aggregating verified recruitment drives, campus placements, off-campus examinations, and government openings across India.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Covering Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR, Chennai & Remote India</span>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% Free & Transparent for Job Seekers
              </span>
            </div>
          </div>

          {/* Column 1: Tech & Engineering */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tech Roles
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Government & Trainee */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Special Drives
            </h3>
            <ul className="space-y-2.5 text-sm">
              {popularTypes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Information & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalPages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} CareerFind India. All rights reserved. Built for Indian job seekers & freshers.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>&bull;</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
