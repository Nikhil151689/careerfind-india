import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { localStore, fetchJobs } from '@/lib/data-store';
import JobCard from '@/components/jobs/JobCard';
import { 
  Building2, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  ArrowLeft,
  Briefcase
} from 'lucide-react';

interface CompanyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const company = localStore.getCompanyBySlug(params.slug);
  if (!company) {
    return { title: 'Company Not Found - CareerFind India' };
  }

  return {
    title: `${company.name} Careers & Job Openings in India`,
    description: `Browse verified job openings, campus drives, and vacancies at ${company.name}. Headquarters: ${company.headquarters || 'India'}.`,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const company = localStore.getCompanyBySlug(params.slug);
  if (!company) {
    notFound();
  }

  const { jobs } = await fetchJobs({
    query: company.name,
    limit: 20,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/jobs" className="hover:text-indigo-600">Companies</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">{company.name}</span>
      </div>

      {/* Company Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden font-bold text-xl text-slate-700 dark:text-slate-200">
            {company.logo_url ? (
              <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-8 h-8 text-slate-400" />
            )}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {company.name}
              </h1>
              {company.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Employer
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
              {company.headquarters && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{company.headquarters}</span>
                </div>
              )}
              {company.industry && (
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{company.industry}</span>
                </div>
              )}
              {company.website_url && (
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  <span>Official Careers Portal</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {company.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
            {company.description}
          </p>
        )}
      </div>

      {/* Openings Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Active Verified Openings at {company.name} ({jobs.length})
        </h2>

        {jobs.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            No active openings currently listed for this employer. Check back soon!
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
