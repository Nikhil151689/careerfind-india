import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Home,
  Landmark,
  AlertTriangle
} from 'lucide-react';
import { Job } from '@/types/job';
import { formatDate, formatTimeAgo, isJobExpired, getDaysLeft } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  const expired = isJobExpired(job.application_deadline);
  const daysLeft = getDaysLeft(job.application_deadline);

  return (
    <div
      className={`group relative rounded-2xl transition-all duration-300 bg-white dark:bg-slate-900 border p-5 sm:p-6 hover:shadow-card-hover ${
        featured || job.is_featured
          ? 'border-indigo-300 dark:border-indigo-800/80 ring-1 ring-indigo-500/10 dark:ring-indigo-500/20 shadow-sm'
          : 'border-slate-200/90 dark:border-slate-800 shadow-subtle'
      }`}
    >
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Category Tag */}
          {job.category && (
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              {job.category.name}
            </span>
          )}

          {/* Special highlights */}
          {job.is_fresher && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3 h-3" />
              Fresher Drive
            </span>
          )}

          {job.is_government && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
              <Landmark className="w-3 h-3" />
              Govt / PSU
            </span>
          )}

          {job.is_wfh && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60">
              <Home className="w-3 h-3" />
              WFH / Remote
            </span>
          )}
        </div>

        {/* Verification Status */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified {formatTimeAgo(job.last_verified_at)}</span>
        </div>
      </div>

      {/* Main info row: Logo & Titles */}
      <div className="flex items-start gap-4">
        {/* Company Avatar / Logo */}
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden font-bold text-slate-700 dark:text-slate-200">
          {job.company?.logo_url ? (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link
            href={`/jobs/${job.slug}`}
            className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
          >
            {job.title}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {job.company?.name}
            </span>
            {job.company?.verified && (
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Official
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid: Experience, Salary, Location, Type */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.experience_level}</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="truncate">{job.salary_text}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.job_type}</span>
        </div>
      </div>

      {/* Skills pills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[10px] text-slate-400 font-medium">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer row: Deadline info & action buttons */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div>
          {expired ? (
            <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Deadline Ended
            </span>
          ) : daysLeft !== null && daysLeft <= 5 ? (
            <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              Closing in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
            </span>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">
              Deadline: <strong className="text-slate-700 dark:text-slate-300">{formatDate(job.application_deadline)}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={job.official_apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
