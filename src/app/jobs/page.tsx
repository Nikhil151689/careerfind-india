import React from 'react';
import type { Metadata } from 'next';
import { fetchJobs, fetchCategories } from '@/lib/data-store';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import AdBanner from '@/components/ads/AdBanner';
import { 
  Briefcase, 
  Search, 
  ArrowUpDown, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Job Openings in India - IT, Freshers, Remote & Govt Vacancies',
  description: 'Search verified job openings across India. Filter by IT & Software, B.Tech freshers, Work-from-home, salary, and location in Bengaluru, Hyderabad, Pune, and Mumbai.',
};

interface JobsPageProps {
  searchParams: {
    q?: string;
    location?: string;
    category?: string;
    experience?: string;
    jobType?: string;
    workMode?: string;
    isFresher?: string;
    isGovernment?: string;
    isWfh?: string;
    isFeatured?: string;
    page?: string;
    sortBy?: 'latest' | 'salary_desc' | 'deadline_asc';
  };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const query = searchParams.q || '';
  const location = searchParams.location || '';
  const category = searchParams.category || '';
  const experience = searchParams.experience || '';
  const jobType = searchParams.jobType || '';
  const workMode = searchParams.workMode || '';
  const isFresher = searchParams.isFresher === 'true';
  const isGovernment = searchParams.isGovernment === 'true';
  const isWfh = searchParams.isWfh === 'true';
  const isFeatured = searchParams.isFeatured === 'true';
  const page = parseInt(searchParams.page || '1', 10);
  const sortBy = searchParams.sortBy || 'latest';
  const limit = 8;

  const [categories, { jobs, total, totalPages }] = await Promise.all([
    fetchCategories(),
    fetchJobs({
      query,
      location,
      category,
      experience,
      jobType,
      workMode,
      isFresher,
      isGovernment,
      isWfh,
      isFeatured,
      page,
      limit,
      sortBy,
    }),
  ]);

  // Helper to build URL with query params
  const buildPageUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (experience) params.set('experience', experience);
    if (jobType) params.set('jobType', jobType);
    if (workMode) params.set('workMode', workMode);
    if (isFresher) params.set('isFresher', 'true');
    if (isGovernment) params.set('isGovernment', 'true');
    if (isWfh) params.set('isWfh', 'true');
    if (isFeatured) params.set('isFeatured', 'true');
    if (sortBy && sortBy !== 'latest') params.set('sortBy', sortBy);
    params.set('page', newPage.toString());
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Job Listings</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Verified Job Openings in India
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Showing {jobs.length} of {total} verified openings with direct employer applications
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free For Candidates</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <JobFilters categories={categories} />

            {/* Sidebar Ad Slot */}
            <div className="mt-6 hidden lg:block">
              <AdBanner placement="sidebar" />
            </div>
          </div>
        </aside>

        {/* Listings Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Search bar & Sorting bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Inline Query Search Form */}
            <form
              action="/jobs"
              method="GET"
              className="relative w-full sm:max-w-md"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search job title, skills, or company..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {/* Keep other filters as hidden inputs */}
              {category && <input type="hidden" name="category" value={category} />}
              {location && <input type="hidden" name="location" value={location} />}
            </form>

            {/* Sort Options */}
            <div className="flex items-center gap-2 text-xs self-end sm:self-auto w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Sort by:</span>
              <div className="flex gap-1">
                <Link
                  href={buildPageUrl(1).replace(/sortBy=[^&]*/, '').concat('&sortBy=latest')}
                  className={`px-2.5 py-1 rounded-lg border font-medium ${
                    sortBy === 'latest'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Latest
                </Link>
                <Link
                  href={buildPageUrl(1).replace(/sortBy=[^&]*/, '').concat('&sortBy=salary_desc')}
                  className={`px-2.5 py-1 rounded-lg border font-medium ${
                    sortBy === 'salary_desc'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Highest Salary
                </Link>
                <Link
                  href={buildPageUrl(1).replace(/sortBy=[^&]*/, '').concat('&sortBy=deadline_asc')}
                  className={`px-2.5 py-1 rounded-lg border font-medium ${
                    sortBy === 'deadline_asc'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Ending Soon
                </Link>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {jobs.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No matching jobs found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try loosening your search terms or resetting filters to see verified campus and government recruitment drives.
              </p>
              <Link
                href="/jobs"
                className="inline-block px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Clear All Filters
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <React.Fragment key={job.id}>
                  <JobCard job={job} />
                  {/* Insert AdSense in-feed ad after every 4th job */}
                  {(index + 1) % 4 === 0 && (
                    <AdBanner placement="listing-infeed" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                {page > 1 ? (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-400 opacity-50 cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </button>
                )}

                {page < totalPages ? (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-400 opacity-50 cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
