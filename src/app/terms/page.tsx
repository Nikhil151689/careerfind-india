import React from 'react';
import type { Metadata } from 'next';

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
          Welcome to <strong>CareerFind India</strong>. By accessing or using this website, you agree to be bound by the following terms and conditions. If you disagree with any part of these terms, please refrain from using our services.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Aggregator & Information Service
        </h2>
        <p>
          CareerFind India operates as an online employment news aggregator and informational index. We do not act as an employer, recruitment agency, or placement agent for candidates unless expressly designated in writing.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. No Fee Charged to Candidates
        </h2>
        <p>
          Access to search, browse, filter, and view verified job circulars on CareerFind India is 100% free of charge. Users are cautioned that CareerFind India will NEVER solicit fees or cash deposits for recruitment, interview slots, or employment offers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. Accuracy and External Applications
        </h2>
        <p>
          While our editorial team conducts rigorous manual verification of job notifications, deadline dates, and employer websites, employers reserve the absolute right to modify eligibility criteria, cancel drives, or close vacancies at their sole discretion. Candidates must read official circulars thoroughly before applying.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          4. Prohibited Uses
        </h2>
        <p>
          Users agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Scrape or programmatically extract job data using bots without prior written approval.</li>
          <li>Post fraudulent job postings, malicious URLs, or misleading recruitment claims.</li>
          <li>Attempt to breach the security or authentication layers of the admin portal.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          5. Limitation of Liability
        </h2>
        <p>
          In no event shall CareerFind India, its directors, or employees be liable for any indirect, incidental, or consequential damages resulting from a candidate&apos;s job application, interview travel, or interactions with third-party hiring organizations.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          6. Governing Law & Jurisdiction
        </h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka.
        </p>
      </div>
    </div>
  );
}
