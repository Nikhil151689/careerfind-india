import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CareerFind India',
  description: 'CareerFind India privacy policy outlining user data protection, cookies, newsletter subscription, and adherence to the Indian Information Technology Act.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-500">Last updated: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-4">
        <p>
          At <strong>CareerFind India</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take your personal privacy seriously. This Privacy Policy describes how we collect, use, and protect your information when you visit our website at careerfindindia.com and use our job notification services.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Email Addresses for Job Alerts:</strong> When you voluntarily subscribe to our newsletter or job category notifications, we store your email address and category preferences to dispatch relevant listings.</li>
          <li><strong>Usage and Log Data:</strong> We automatically collect standard server logs including your IP address, browser type, referral URLs, and pages viewed to optimize portal performance.</li>
          <li><strong>Direct Inquiries:</strong> Details you provide via our Contact Us or grievance forms (name, email, feedback).</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. How We Use Your Information
        </h2>
        <p>
          We use collected information solely to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Send requested job alerts and recruitment updates.</li>
          <li>Maintain the security, uptime, and fraud prevention mechanisms of the portal.</li>
          <li>Comply with applicable provisions of the Information Technology Act, 2000 and the Digital Personal Data Protection Act (DPDP), 2023.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. We Never Sell Your Data
        </h2>
        <p>
          CareerFind India does not sell, rent, or lease candidate email addresses or contact details to third-party telemarketers or commercial data brokers under any circumstances.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          4. External Employer Links
        </h2>
        <p>
          Our listings contain hyperlinks to official third-party employer websites (e.g. TCS, Infosys, Microsoft, ISRO, SBI). Once you leave CareerFind India, your interactions are governed by the respective employer&apos;s privacy policies. We encourage you to review their terms.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          5. Cookies and Google AdSense
        </h2>
        <p>
          We may use cookies and web beacons for traffic analytics and to display contextual advertisements through Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting Google Ad Settings.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          6. Grievance Officer Contact
        </h2>
        <p>
          In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, queries regarding this policy should be directed to:
        </p>
        <p className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-xs">
          Grievance Officer, CareerFind India<br />
          Email: grievance@careerfindindia.com<br />
          Outer Ring Road, Bengaluru, Karnataka, India
        </p>
      </div>
    </div>
  );
}
