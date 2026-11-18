'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { Category } from '@/types/job';

interface JobFiltersProps {
  categories: Category[];
}

const TOP_LOCATIONS = [
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'Delhi NCR',
  'Chennai',
  'Noida',
  'Remote',
];

const EXPERIENCE_LEVELS = [
  { label: 'All Experience', value: '' },
  { label: 'Freshers (0 Yrs)', value: 'Fresher' },
  { label: '0-2 Years', value: '0-2 Years' },
  { label: '2-5 Years', value: '2-5 Years' },
  { label: '5+ Years', value: '5+ Years' },
];

const WORK_MODES = [
  { label: 'All Modes', value: '' },
  { label: 'In-Office', value: 'In-Office' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Work From Home', value: 'Work From Home' },
];

const JOB_TYPES = [
  { label: 'All Types', value: '' },
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Internship', value: 'Internship' },
  { label: 'Walk-In', value: 'Walk-In' },
];

export default function JobFilters({ categories }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';
  const selectedLocation = searchParams.get('location') || '';
  const selectedExperience = searchParams.get('experience') || '';
  const selectedJobType = searchParams.get('jobType') || '';
  const selectedWorkMode = searchParams.get('workMode') || '';
  const isFresherOnly = searchParams.get('isFresher') === 'true';
  const isGovernmentOnly = searchParams.get('isGovernment') === 'true';
  const isWfhOnly = searchParams.get('isWfh') === 'true';

  const updateFilter = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset to page 1 on filter change

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    router.push(`/jobs?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('/jobs');
  };

  const hasActiveFilters = Boolean(
    selectedCategory ||
    selectedLocation ||
    selectedExperience ||
    selectedJobType ||
    selectedWorkMode ||
    isFresherOnly ||
    isGovernmentOnly ||
    isWfhOnly
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Filter Jobs
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Quick Toggle Checkboxes */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Quick Filters
        </span>
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isFresherOnly}
              onChange={(e) => updateFilter('isFresher', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Fresher Hiring Only</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isGovernmentOnly}
              onChange={(e) => updateFilter('isGovernment', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Govt / PSU Recruitment</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isWfhOnly}
              onChange={(e) => updateFilter('isWfh', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>100% Work From Home</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Category
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="">All Categories ({categories.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Locations */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Top Indian Hubs
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TOP_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.toLowerCase() === loc.toLowerCase();
            return (
              <button
                key={loc}
                type="button"
                onClick={() => updateFilter('location', isSelected ? '' : loc)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Experience Level
        </span>
        <div className="space-y-1.5">
          {EXPERIENCE_LEVELS.map((exp) => (
            <button
              key={exp.value}
              type="button"
              onClick={() => updateFilter('experience', exp.value)}
              className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg text-left transition-colors ${
                selectedExperience === exp.value
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{exp.label}</span>
              {selectedExperience === exp.value && <Check className="w-3.5 h-3.5 text-indigo-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Work Mode */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Work Mode
        </span>
        <select
          value={selectedWorkMode}
          onChange={(e) => updateFilter('workMode', e.target.value)}
          className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {WORK_MODES.map((wm) => (
            <option key={wm.value} value={wm.value}>
              {wm.label}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          Employment Type
        </span>
        <select
          value={selectedJobType}
          onChange={(e) => updateFilter('jobType', e.target.value)}
          className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {JOB_TYPES.map((jt) => (
            <option key={jt.value} value={jt.value}>
              {jt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
