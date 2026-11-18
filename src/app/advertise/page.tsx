import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Megaphone, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advertise With Us - Reach 250,000+ Indian Job Seekers',
  description: 'Promote your recruitment drives, edtech courses, and career certifications to high-intent engineering freshers, data analysts, and tech professionals across India.',
};

export default function AdvertisePage() {
  const adFormats = [
    {
      title: 'Homepage Top Leaderboard',
      placement: 'homepage-banner',
      dimensions: '970x90 / 728x90 Responsive',
      description: 'Maximum visibility at the top of the portal viewed by every visitor.',
    },
    {
      title: 'Job Search In-Feed Native Ad',
      placement: 'listing-infeed',
      dimensions: 'Fluid Responsive Card',
      description: 'Integrated seamlessly between active search results with clear "Sponsored" labeling.',
    },
    {
      title: 'Job Details Sidebar Ad',
      placement: 'sidebar',
      dimensions: '300x250 / 300x600 Half-Page',
      description: 'High engagement placement beside the primary "Apply Now" application box.',
    },
    {
      title: 'Blog In-Article Contextual Ad',
      placement: 'blog-inarticle',
      dimensions: 'Responsive In-Content',
      description: 'Positioned within high-ranking career guides (TCS NQT, resume templates, salary guides).',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Advertise on CareerFind India</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Connect with India&apos;s Ambitious Tech & Fresher Talent
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Over 250,000+ monthly page views from engineering students, B.Tech freshers, software engineers, and government exam aspirants across India.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">250K+</div>
          <div className="text-xs text-slate-500 mt-1">Monthly Active Views</div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">68%</div>
          <div className="text-xs text-slate-500 mt-1">B.Tech / MCA Freshers</div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Top Hubs</div>
          <div className="text-xs text-slate-500 mt-1">BLR, HYD, PNQ, DEL, CHE</div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
          <div className="text-xs text-slate-500 mt-1">Brand Safety & Quality</div>
        </div>
      </div>

      {/* Available Ad Placements */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Advertisement Placements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {adFormats.map((slot) => (
            <div
              key={slot.title}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {slot.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {slot.dimensions}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {slot.description}
              </p>
              <div className="pt-2 text-[11px] text-indigo-600 font-semibold">
                Placement Key: <code className="font-mono">{slot.placement}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Compliance Guidelines */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict AdSense & Partner Brand Quality Standards</span>
        </div>
        <p>
          CareerFind India enforces strict quality guidelines for all promotional placements:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No pop-ups, automatic sound audio, deceptive buttons, or fake &ldquo;Download / Apply&rdquo; overlays.</li>
          <li>All advertising containers are strictly segregated from organic job listings and application buttons with clear &ldquo;Advertisement&rdquo; or &ldquo;Sponsored&rdquo; labels.</li>
          <li>No gambling, adult, misleading multi-level marketing, or fee-charging recruitment scams.</li>
        </ul>
      </div>

      {/* Inquire CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold">
          Ready to Advertise with Us?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Contact our advertising partnerships team for custom media kits, direct brand integrations, and programmatic inquiries.
        </p>
        <div className="pt-2">
          <a
            href="mailto:advertise@careerfindindia.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-slate-100 shadow-lg transition-all"
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Email advertise@careerfindindia.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
