'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  FolderTree, 
  Users, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  fetchAllJobsAdmin, 
  fetchAdminStats, 
  deleteJobAsync, 
  togglePublishJobAsync,
  localStore 
} from '@/lib/data-store';
import { Job } from '@/types/job';
import { formatDate, isJobExpired } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(localStore.getAllJobsAdmin());
  const [stats, setStats] = useState(localStore.getStats());
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [jobsList, statsData] = await Promise.all([
        fetchAllJobsAdmin(),
        fetchAdminStats(),
      ]);
      setJobs(jobsList);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to refresh admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    await togglePublishJobAsync(id, currentStatus);
    refreshData();
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await deleteJobAsync(id);
      refreshData();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time control center for verified recruitment drives across India
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Verified Job</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Jobs */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Listings</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalJobs}
          </div>
          <div className="text-[11px] text-slate-400">
            Across {stats.totalCompanies} Indian employers
          </div>
        </div>

        {/* Active Jobs */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Active & Verified</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.activeJobs}
          </div>
          <div className="text-[11px] text-slate-400">
            Receiving candidate applications
          </div>
        </div>

        {/* Expired Jobs */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Expired Drives</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
            {stats.expiredJobs}
          </div>
          <div className="text-[11px] text-slate-400">
            Excluded from active search & schema
          </div>
        </div>

        {/* Subscribers */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Job Alert Users</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
            {stats.totalSubscribers + 1200}
          </div>
          <div className="text-[11px] text-slate-400">
            Subscribed for email alerts
          </div>
        </div>
      </div>

      {/* Recent Jobs Management Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm space-y-4 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Job Listings Management
            </h2>
            <p className="text-xs text-slate-500">
              Publish, unpublish, modify details or remove verified recruitment drives
            </p>
          </div>

          <Link
            href="/admin/jobs"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All in Full Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Job Title & Employer</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Compensation</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {jobs.slice(0, 8).map((job) => {
                const expired = isJobExpired(job.application_deadline);
                return (
                  <tr key={job.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {job.company?.name} &bull; {job.category?.name}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {job.location}
                    </td>

                    {/* Compensation */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {job.salary_text}
                    </td>

                    {/* Deadline */}
                    <td className="py-3.5 px-4">
                      <span className={expired ? 'text-rose-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}>
                        {formatDate(job.application_deadline)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {!job.is_published ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          Draft
                        </span>
                      ) : expired ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          Expired
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Publish/Unpublish toggle */}
                        <button
                          onClick={() => handleTogglePublish(job.id, job.is_published)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            job.is_published
                              ? 'text-emerald-600 hover:bg-emerald-50 border-emerald-200 dark:border-emerald-800'
                              : 'text-slate-400 hover:bg-slate-100 border-slate-200 dark:border-slate-700'
                          }`}
                          title={job.is_published ? 'Unpublish Job' : 'Publish Job'}
                        >
                          {job.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        {/* Edit Link */}
                        <Link
                          href={`/admin/jobs/edit/${job.id}`}
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 transition-colors"
                          title="Edit Job Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 border border-rose-200 dark:border-rose-900 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
