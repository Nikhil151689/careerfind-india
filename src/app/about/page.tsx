import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Briefcase, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Award, 
  CheckCircle2, 
  FileText,
  Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CareerFind India - Our Mission & Verification Process',
  description: 'CareerFind India is dedicated to bridging the gap between Indian job seekers and genuine corporate and public sector employers with 100% verified job links.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <Briefcase className="w-3.5 h-3.5" />
          <span>About CareerFind India</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Empowering Indian Careers with Transparency & Trust
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Founded with a clear mission: to eliminate recruitment scams and provide Indian students, freshers, and experienced professionals with genuine, verified employment notifications.
        </p>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            100% Official Links
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every opening listed on CareerFind India points exclusively to the employer&apos;s verified careers portal (e.g., TCS iON, Infosys Careers, ISRO, SBI) or official government notifications.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Zero Charges for Candidates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe access to employment opportunities should always be free. We never charge job seekers for searching, applying, or receiving alerts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Pan-India Coverage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            From Tier-1 hubs like Bengaluru, Hyderabad, and Pune to Tier-2/3 off-campus college drives and remote work-from-home positions.
          </p>
        </div>
      </div>

      {/* How We Verify Openings */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Our Rigorous 4-Step Verification Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Domain & SSL Verification</h4>
              <p className="text-xs text-slate-500 mt-0.5">We confirm employer domains against verified corporate and government registrars.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Official Gazettes & Circulars</h4>
              <p className="text-xs text-slate-500 mt-0.5">Government vacancies are cross-referenced with official gazettes and employment news.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Deadline Tracking</h4>
              <p className="text-xs text-slate-500 mt-0.5">Jobs automatically expire the moment application cutoff dates pass to avoid wasted effort.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Third-Party Aggregation</h4>
              <p className="text-xs text-slate-500 mt-0.5">We never scrape or mirror unauthorized portals or publish unverified WhatsApp rumors.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
        >
          <span>Explore Verified Openings</span>
          <Briefcase className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
