import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  fetchJobBySlug, 
  fetchJobs, 
  fetchRelatedJobs,
  localStore 
} from '@/lib/data-store';
import JobStructuredData from '@/components/jobs/JobStructuredData';
import ApplyButton from '@/components/jobs/ApplyButton';
import JobCard from '@/components/jobs/JobCard';
import AdBanner from '@/components/ads/AdBanner';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Home, 
  Landmark, 
  ShieldAlert, 
  GraduationCap, 
  FileText, 
  CheckSquare, 
  ListChecks,
  Share2,
  Globe,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { formatDate, formatTimeAgo, isJobExpired, getDaysLeft } from '@/lib/utils';

interface JobDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);
  if (!job) {
    return {
      title: 'Job Not Found - CareerFind India',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfindindia.com';
  const canonicalUrl = `${siteUrl}/jobs/${job.slug}`;

  return {
    title: `${job.title} at ${job.company?.name || 'Top Company'} - Apply Online`,
    description: `Apply for ${job.title} vacancy at ${job.company?.name}. Location: ${job.location}. Salary: ${job.salary_text}. Experience: ${job.experience_level}. Eligibility: ${job.qualification}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${job.title} - ${job.company?.name} Recruitment`,
      description: `${job.title} opening at ${job.company?.name}. Eligibility: ${job.qualification}. Apply on the official careers page.`,
      url: canonicalUrl,
      type: 'article',
      images: job.company?.logo_url ? [{ url: job.company.logo_url }] : undefined,
    },
    twitter: {
      card: 'summary',
      title: `${job.title} at ${job.company?.name}`,
      description: `Official job opening: ${job.title} in ${job.location}. Apply now!`,
    },
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await fetchJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const expired = isJobExpired(job.application_deadline);
  const daysLeft = getDaysLeft(job.application_deadline);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfindindia.com';
  
  // Related jobs
  const relatedJobs = await fetchRelatedJobs(job.id, job.category_id, 3);

  return (
    <>
      {/* Schema.org Structured Data */}
      <JobStructuredData job={job} siteUrl={siteUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Back Link & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-indigo-600">Jobs</Link>
            <span>/</span>
            {job.category && (
              <>
                <Link href={`/categories/${job.category.slug}`} className="hover:text-indigo-600">
                  {job.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">
              {job.title}
            </span>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse More Openings</span>
          </Link>
        </div>

        {/* Expired Warning Banner */}
        {expired && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">This job opening expired on {formatDate(job.application_deadline)}.</p>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
                The application deadline set by the employer has passed. You can explore active recruitment drives below.
              </p>
            </div>
          </div>
        )}

        {/* Job Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            
            {/* Logo and Titles */}
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden font-bold text-xl text-slate-700 dark:text-slate-200">
                {job.company?.logo_url ? (
                  <img
                    src={job.company.logo_url}
                    alt={job.company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {job.category && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {job.category.name}
                    </span>
                  )}
                  {job.is_fresher && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Fresher Eligible
                    </span>
                  )}
                  {job.is_government && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      Government / PSU
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>{job.company?.name}</span>
                  {job.company?.website_url && (
                    <a
                      href={job.company.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Company Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Verification & Posted Timestamps */}
            <div className="flex flex-col sm:items-end gap-1.5 text-xs text-slate-500 self-stretch sm:self-auto pt-2 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Listing &bull; {formatTimeAgo(job.last_verified_at)}</span>
              </div>
              <span>Posted: {formatDate(job.posted_at)}</span>
              {job.source_url && (
                <a
                  href={job.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  <span>Official Notification Circular</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Key-Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>Salary / Compensation</span>
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white">
                {job.salary_text}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Experience Required</span>
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white">
                {job.experience_level}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Location</span>
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white truncate">
                {job.location} ({job.work_mode})
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Application Deadline</span>
              </div>
              <div className={`font-extrabold ${expired ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                {formatDate(job.application_deadline)}
                {daysLeft !== null && !expired && (
                  <span className="text-xs text-amber-600 font-semibold ml-1">
                    ({daysLeft}d left)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Job Overview + Sidebar Apply Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Job Description */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Job Description & Overview
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* ADVERTISEMENT BELOW JOB DESCRIPTION */}
            <AdBanner placement="job-details" />

            {/* 2. Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <ListChecks className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Key Responsibilities & Deliverables
                  </h2>
                </div>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Eligibility Criteria & Qualification */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Eligibility Criteria & Educational Qualification
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm">
                <span className="font-bold text-slate-900 dark:text-white">Minimum Education:</span>{' '}
                <span className="text-slate-700 dark:text-slate-300">{job.qualification}</span>
              </div>

              {job.eligibility_criteria && job.eligibility_criteria.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {job.eligibility_criteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 4. Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Required Technical Skills & Competencies
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold border border-indigo-200 dark:border-indigo-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* 6. Company Background */}
            {job.company?.description && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    About {job.company.name}
                  </h2>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {job.company.description}
                </p>
                {job.company.headquarters && (
                  <p className="text-xs text-slate-500 pt-1">
                    <strong>Headquarters:</strong> {job.company.headquarters} &bull;{' '}
                    <strong>Industry:</strong> {job.company.industry || 'Technology'}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar: Apply Action Box + Fraud Advisory */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Apply Action Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-md space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Application Process
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    Official Employer Submission
                  </h3>
                </div>

                <ApplyButton
                  applyUrl={job.official_apply_url}
                  sourceUrl={job.source_url}
                  jobTitle={job.title}
                  companyName={job.company?.name || 'the employer'}
                  isExpired={expired}
                />

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Application Fee:</span>
                    <strong className="text-emerald-600">₹0 (Free)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mode of Application:</span>
                    <strong className="text-slate-700 dark:text-slate-300">Online</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct Official URL:</span>
                    <strong className="text-indigo-600">Verified</strong>
                  </div>
                </div>
              </div>

              {/* Anti-Fraud Notice */}
              <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-2 text-amber-950 dark:text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Fraud Alert & Safety Tip</span>
                </div>
                <p className="leading-relaxed">
                  Genuine recruiters will never ask you to pay money or deposit security money for tests, interview slots, or offer letters. If anyone demands payment, please report immediately to our grievance desk.
                </p>
                <Link
                  href="/disclaimer"
                  className="inline-block text-amber-800 dark:text-amber-300 font-bold underline pt-1"
                >
                  Learn how to identify fake job offers &rarr;
                </Link>
              </div>

              {/* Sidebar Ad Placement */}
              <AdBanner placement="sidebar" />
            </div>
          </aside>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Related Job Vacancies
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                More openings matching this profile in India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedJobs.map((rJob) => (
                <JobCard key={rJob.id} job={rJob} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
