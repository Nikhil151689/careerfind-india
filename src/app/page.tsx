import React from 'react';
import Link from 'next/link';
import { 
  fetchJobs, 
  fetchCategories, 
  fetchBlogPosts 
} from '@/lib/data-store';
import JobSearchHero from '@/components/jobs/JobSearchHero';
import JobCard from '@/components/jobs/JobCard';
import CategoryGrid from '@/components/home/CategoryGrid';
import NewsletterSection from '@/components/home/NewsletterSection';
import AdBanner from '@/components/ads/AdBanner';
import { 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Landmark, 
  Home as HomeIcon, 
  ArrowRight,
  Clock,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const [categories, allJobsData, blogs] = await Promise.all([
    fetchCategories(),
    fetchJobs({ limit: 12 }),
    fetchBlogPosts(),
  ]);

  const allJobs = allJobsData.jobs;
  const featuredJobs = allJobs.filter((j) => j.is_featured);
  const fresherJobs = allJobs.filter((j) => j.is_fresher);
  const wfhJobs = allJobs.filter((j) => j.is_wfh || j.work_mode === 'Work From Home');
  const govtJobs = allJobs.filter((j) => j.is_government);
  const internshipJobs = allJobs.filter((j) => j.is_internship || j.job_type === 'Internship');

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HOMEPAGE: HORIZONTAL BANNER BELOW NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdBanner placement="homepage-top" />
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors overflow-hidden">
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm animate-in fade-in slide-in-from-top-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Over 1,500+ New Vacancies Added This Week</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Find Your Dream Job in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">India</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified campus placements, MNC tech drives, off-campus examinations, and central/state government recruitment across India.
          </p>

          {/* Search Hero */}
          <div className="pt-4">
            <JobSearchHero />
          </div>

          {/* Highlight Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/80 text-left">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                100%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Verified Official Links
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                10,000+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Active Listings
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                500+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Top Indian Employers
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                ₹0
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Fee for Candidates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR JOB CATEGORIES (12 CATEGORIES) */}
      <CategoryGrid categories={categories} />

      {/* 4. FEATURED JOBS SECTION WITH DESKTOP SIDEBAR AD & IN-FEED AD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Priority Recruitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Job Openings
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Hand-picked opportunities from leading technology firms and public sector enterprises.
            </p>
          </div>

          <Link
            href="/jobs?isFeatured=true"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Featured</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop Grid with Sidebar & Mobile Responsive In-Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Job Listings Area with In-Feed Ad */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredJobs.slice(0, 2).map((job) => (
                <JobCard key={job.id} job={job} featured={true} />
              ))}
            </div>

            {/* In-Feed Advertisement between Job Listings */}
            <AdBanner placement="homepage-infeed" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredJobs.slice(2, 4).map((job) => (
                <JobCard key={job.id} job={job} featured={true} />
              ))}
            </div>
          </div>

          {/* Desktop-only Sidebar Advertisement next to Job Listings (hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24">
            <AdBanner placement="homepage-sidebar" />
          </aside>
        </div>
      </section>

      {/* 5. FRESHER & CAMPUS HIRING DRIVES */}
      <section className="bg-slate-50/70 dark:bg-slate-900/40 py-12 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>2025 & 2026 Batch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Fresher & B.Tech Job Openings
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Mass IT hiring, off-campus qualifying tests, and trainee positions requiring 0 years experience.
              </p>
            </div>

            <Link
              href="/categories/btech-fresher-jobs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Explore All Fresher Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {fresherJobs.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. REMOTE & WORK-FROM-HOME OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Anywhere in India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Work-From-Home (Remote) Jobs
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Work for high-growth tech firms without relocating from your hometown.
            </p>
          </div>

          <Link
            href="/categories/work-from-home"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Remote Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {wfhJobs.slice(0, 2).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* 7. GOVERNMENT & PSU OPPORTUNITIES */}
      {govtJobs.length > 0 && (
        <section className="bg-amber-50/40 dark:bg-amber-950/20 py-12 border-y border-amber-200/50 dark:border-amber-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Public Sector & Defense</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Government & Banking Openings
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Official vacancies at ISRO, SBI, DRDO, PSU undertakings and public banks.
                </p>
              </div>

              <Link
                href="/categories/government-jobs"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline"
              >
                <span>View All Govt Vacancies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {govtJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CAREER ADVICE BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Career Advice & Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Insights for Job Seekers
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Exam tips, ATS resume templates, and compensation benchmarks crafted by senior technical recruiters.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {post.cover_image && (
                  <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                    <span>{post.category}</span>
                    <span>&bull;</span>
                    <span className="text-slate-400">{post.read_time}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-500">
                <span>By {post.author_name}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER SUBSCRIPTION */}
      <NewsletterSection />

    </div>
  );
}
