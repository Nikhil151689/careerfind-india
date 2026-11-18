import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions - CareerFind India',
  description: 'Terms and Conditions for accessing and using the CareerFind India recruitment aggregator portal.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
        Terms and Conditions
      </h1>
      <p className="text-xs text-slate-500">Effective Date: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
        <p>
          Welcome to <strong>CareerFind India</strong> (accessible at <strong>https://careerfind-india.vercel.app</strong>). By accessing or using this website, you agree to be bound by the following terms and conditions. If you disagree with any part of these terms, please refrain from using our services.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Aggregator & Information Service
        </h2>
        <p>
          CareerFind India operates as an online employment news aggregator and informational index. We do not act as an employer, recruitment agency, staffing firm, or placement broker for candidates unless expressly designated in writing.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. No Fee Charged to Candidates
        </h2>
        <p>
          Access to search, browse, filter, and view curated job circulars on CareerFind India is 100% free of charge. Users are cautioned that CareerFind India will NEVER solicit fees, registration charges, or cash deposits for recruitment, interview slots, or employment offers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. Accuracy and External Applications
        </h2>
        <p>
          While our editorial team conducts rigorous manual verification of job notifications, deadline dates, and employer websites, employers reserve the absolute right to modify eligibility criteria, reschedule examination dates, or cancel vacancies at their sole discretion. Candidates must read official notification PDFs and circulars thoroughly before applying.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          4. Prohibited Uses
        </h2>
        <p>
          Users agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Scrape or programmatically extract job data using automated bots or spiders without prior written approval.</li>
          <li>Post fraudulent job postings, malicious URLs, or misleading recruitment claims.</li>
          <li>Attempt to breach the security or authentication layers of the admin portal.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          5. Limitation of Liability
        </h2>
        <p>
          In no event shall CareerFind India, its creators, or administrators be liable for any indirect, incidental, or consequential damages resulting from a candidate&apos;s job application, interview travel, or interactions with third-party hiring organizations.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          6. Governing Law & Contact
        </h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of India. For any questions or legal notices regarding these Terms, please contact us at:
        </p>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <p className="font-semibold text-slate-900 dark:text-white">CareerFind India Support & Legal Desk</p>
          <p>Email: <a href="mailto:careerfindjobssupport@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-medium underline">careerfindjobssupport@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}