import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recruitment Disclaimer & Fraud Prevention Notice - CareerFind India',
  description: 'Official candidate advisory: CareerFind India never charges fees for job placement. Learn how to verify official employer links and avoid fake job scams.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Warning Header */}
      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-bold text-base">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>Statutory Recruitment Advisory & Anti-Fraud Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
          CareerFind India is an independent informational job aggregator. We do not recruit candidates directly, nor do we issue employment appointment letters. All candidates are advised to verify openings on the official employer domains.
        </p>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
        Official Disclaimer
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-5 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          1. Aggregator Role & Official Sources
        </h2>
        <p>
          Information published on CareerFind India is curated from public recruitment notifications, official employer careers portals (e.g., TCS iON, Infosys Careers, Microsoft Careers, Google Jobs), employment news gazettes, and verified corporate press releases.
        </p>
        <p>
          While we maintain strict editorial checks and record verified dates for every job listing, we make no warranties regarding the guaranteed availability, scheduling changes, or final hiring decisions of third-party organizations.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          2. Zero Tolerance for Recruitment Scams
        </h2>
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          NEVER PAY ANY MONEY FOR RECRUITMENT, INTERVIEWS, OR OFFER LETTERS!
        </p>
        <p>
          Reputed Indian enterprises including Tata Consultancy Services (TCS), Infosys, Wipro, HCLTech, Microsoft, Google, L&T, State Bank of India, and ISRO <strong>never charge any registration fee, security deposit, laptop fee, or training fee</strong> from prospective candidates.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Signs of a Fake Job Scam:
          </h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>Emails originating from free webmail accounts (e.g., <code>@gmail.com</code>, <code>@yahoo.com</code>, <code>@outlook.com</code>) claiming to represent major IT corporations.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>Demands for UPI transfers, bank deposits, or gift cards for &ldquo;refundable interview security deposit&rdquo; or &ldquo;medical verification&rdquo;.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>Job offers issued without any technical or formal interview evaluation.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>Unsolicited WhatsApp, Telegram, or SMS messages promising part-time YouTube rating or like-and-earn tasks.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          3. How to Report Suspected Scams
        </h2>
        <p>
          If you encounter any job listing or third-party party misusing our name or requesting monetary transactions, please notify our grievance cell immediately at <a href="mailto:fraud-alert@careerfindindia.com" className="text-indigo-600 underline font-medium">fraud-alert@careerfindindia.com</a> so we can take immediate action and update our public warnings.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold"
        >
          <span>Report a Fraudulent Job Posting</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
