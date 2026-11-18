import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  BarChart3, 
  Cpu, 
  Network, 
  Terminal, 
  Users, 
  Landmark, 
  Home, 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  Award,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Category } from '@/types/job';

// Map icon string names to Lucide icons
const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  BarChart3,
  Cpu,
  Network,
  Terminal,
  Users,
  Landmark,
  Home,
  GraduationCap,
  Sparkles,
  MapPin,
  Award,
  Briefcase,
};

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Sectors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Job Categories in India
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Discover verified campus drives, government recruitments, and corporate job openings curated for Indian job seekers.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group self-start sm:self-auto"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 12-Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon_name] || Briefcase;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">
                    {cat.job_count || 10}+ Openings
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
