import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchJobs, fetchCategories, fetchCategoryBySlug, localStore } from '@/lib/data-store';
import JobCard from '@/components/jobs/JobCard';
import { 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Search,
  Sparkles
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found - CareerFind India' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfindindia.com';
  const canonicalUrl = `${siteUrl}/categories/${category.slug}`;

  return {
    title: `${category.name} in India - Latest Vacancies & Recruitment Drives`,
    description: `Browse latest verified ${category.name} job openings in Bengaluru, Hyderabad, Pune, and Pan-India. Apply directly to official employer portals.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} in India | CareerFind India`,
      description: `Explore verified ${category.name} openings, eligibility requirements, and compensation packages.`,
      url: canonicalUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const { jobs, total } = await fetchJobs({
    category: category.slug,
    limit: 20,
  });

  const allCategories = await fetchCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/jobs" className="hover:text-indigo-600">Categories</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">{category.name}</span>
      </div>

      {/* Category Header Hero */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Category Hub &bull; India</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
            <span>{total} Verified Openings</span>
            <span>&bull;</span>
            <span>Free Direct Applications</span>
          </div>
        </div>
      </div>

      {/* Jobs List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sub-nav of other categories */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              Other Job Sectors
            </h3>
            <div className="space-y-1">
              {allCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className={`block px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    c.slug === category.slug
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Job Cards */}
        <div className="lg:col-span-3 space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No active openings under {category.name} right now
              </h3>
              <p className="text-xs text-slate-500">
                New drives are verified daily. Browse all available jobs across other sectors.
              </p>
              <Link
                href="/jobs"
                className="inline-block px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl"
              >
                Browse All Jobs
              </Link>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
