import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/data-store';
import { BookOpen, Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Career Advice, ATS Resume Guides & Tech Salary Trends in India',
  description: 'Expert guides on cracking TCS NQT, crafting ATS-compliant resumes, preparing for off-campus drives, and current developer salary trends across Indian IT hubs.',
};

export default async function BlogIndexPage() {
  const blogs = await fetchBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Indian Recruitment & Placement Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Career Advice & Prep Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Practical strategies, syllabus breakdowns, and compensation benchmarks written by industry recruiters to help you land your dream role.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <article
            key={post.id}
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              {post.cover_image && (
                <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                  <span>{post.category}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.read_time}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="block font-bold text-lg text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800/80 mt-4">
              <span>{post.author_name}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
