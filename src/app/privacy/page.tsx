import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - CareerFind India',
  description: 'CareerFind India privacy policy outlining user data protection, cookies, Google AdSense disclosures, newsletter subscriptions, and adherence to the Indian Information Technology Act.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-500">Last updated: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-5 leading-relaxed">
        <p>
          At <strong>CareerFind India</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), accessible from <strong>https://careerfind-india.vercel.app</strong>, the privacy of our visitors is of paramount importance to us. This Privacy Policy outlines the types of personal information that is received and collected by CareerFind India and how it is used.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Email Addresses for Job Alerts:</strong> When you voluntarily subscribe to our newsletter or category job notifications, we collect and store your email address and preferred job categories to dispatch curated recruitment notifications.</li>
          <li><strong>Contact & Grievance Forms:</strong> Information submitted via our Contact Us form, including your name, email address, subject, and message details, used exclusively to respond to your inquiry or resolve grievances.</li>
          <li><strong>Log Files & Technical Data:</strong> Like many websites, CareerFind India utilizes standard server log files. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user movement, and gather demographic information.</li>
          <li><strong>Supabase Authentication Tokens:</strong> For registered administrative users, secure authentication session tokens are stored locally in the browser to maintain authorized sessions.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          2. How We Use Your Information
        </h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide, operate, and maintain our job portal and notifications.</li>
          <li>Improve, personalize, and expand candidate user experience.</li>
          <li>Understand and analyze how visitors navigate our job search and career blog resources.</li>
          <li>Communicate with you regarding support queries, candidate advisories, or newsletter alerts.</li>
          <li>Detect, prevent, and mitigate fraudulent recruitment scams and cyber threats.</li>
          <li>Comply with statutory requirements under the Information Technology Act, 2000 and the Digital Personal Data Protection Act (DPDP), 2023.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          3. Cookies and Web Beacons
        </h2>
        <p>
          CareerFind India uses cookies to store information about visitors&apos; preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors&apos; browser type or other information that the visitor sends via their browser.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          4. Google AdSense & Third-Party Advertising Partners
        </h2>
        <p>
          Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
          <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">Google Ads Settings</a>.</li>
          <li>Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">aboutads.info</a>.</li>
        </ul>
        <p>
          These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on CareerFind India, which are sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our site&apos;s third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on the site.
        </p>
        <p className="text-xs text-slate-500">
          CareerFind India has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          5. External Official Employer Links
        </h2>
        <p>
          Our job listings contain hyperlinks directing applicants to third-party employer career sites (e.g., TCS, Infosys, Microsoft, Google, ISRO, SBI, Flipkart). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          6. We Never Sell Candidate Data
        </h2>
        <p>
          We do not sell, rent, trade, or otherwise transfer your personally identifiable information to outside parties for telemarketing or commercial lead generation.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
          7. Grievance Officer & Statutory Contact
        </h2>
        <p>
          In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the name and contact details of the Grievance Officer are published below:
        </p>
        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
          <p className="font-bold text-slate-900 dark:text-white text-sm">Grievance Officer, CareerFind India</p>
          <p>Email: <a href="mailto:careerfindjobssupport@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">careerfindjobssupport@gmail.com</a></p>
          <p className="text-slate-500">Response Window: Acknowledgement within 24 hours; resolution within 15 working days.</p>
        </div>
      </div>
    </div>
  );
}