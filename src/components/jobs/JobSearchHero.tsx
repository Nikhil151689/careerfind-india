'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building2, Sparkles, ArrowRight } from 'lucide-react';

interface JobSearchHeroProps {
  initialQuery?: string;
  initialLocation?: string;
}

export default function JobSearchHero({
  initialQuery = '',
  initialLocation = '',
}: JobSearchHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (location.trim()) params.set('location', location.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  const trendingTags = [
    { label: 'TCS NQT 2026', query: 'TCS NQT' },
    { label: 'Software Engineer', query: 'Software' },
    { label: 'Work From Home', query: 'Remote' },
    { label: 'Govt Banking / ISRO', query: 'ISRO' },
    { label: 'Data Analyst', query: 'Data Analyst' },
    { label: 'Freshers 2025/2026', query: 'Fresher' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="p-2 sm:p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3">
          
          {/* Query input */}
          <div className="md:col-span-6 relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skills, or company (e.g. React, Infosys)"
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 transition-colors border border-transparent focus:border-indigo-400"
            />
          </div>

          {/* Location input */}
          <div className="md:col-span-4 relative flex items-center">
            <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g. Bengaluru, Remote)"
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 transition-colors border border-transparent focus:border-indigo-400"
            />
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-full min-h-[48px] py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </form>

      {/* Trending Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4 px-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Trending Searches:
        </span>
        {trendingTags.map((tag) => (
          <button
            key={tag.label}
            type="button"
            onClick={() => {
              setQuery(tag.query);
              router.push(`/jobs?q=${encodeURIComponent(tag.query)}`);
            }}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors hover:border-indigo-300 dark:hover:border-indigo-600"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
