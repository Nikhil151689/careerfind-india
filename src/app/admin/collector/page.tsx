'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Eye, 
  Edit3, 
  Trash2, 
  Send, 
  Filter, 
  Search, 
  ShieldAlert, 
  Building2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  CopyCheck, 
  Loader2,
  Check,
  X
} from 'lucide-react';
import { CollectedJob, CollectorStats, CollectedJobStatus } from '@/types/job';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function AICollectorAdminPage() {
  const [stats, setStats] = useState<CollectorStats | null>(null);
  const [jobs, setJobs] = useState<CollectedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [expiring, setExpiring] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'published' | 'duplicates' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [previewJob, setPreviewJob] = useState<CollectedJob | null>(null);
  const [editJob, setEditJob] = useState<CollectedJob | null>(null);

  const getAuthHeaders = async (): Promise<HeadersInit> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const supabase = getSupabaseClient();
    if (supabase && isSupabaseConfigured) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
      } catch {}
    }
    if (typeof window !== 'undefined' && localStorage.getItem('admin_authenticated') === 'true') {
      headers['x-admin-auth'] = 'true';
    }
    return headers;
  };

  const fetchStatsAndJobs = async () => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      const res = await fetch('/api/collector/stats', { headers });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setJobs(data.jobs || []);
      } else if (res.status === 401 || res.status === 403) {
        setFeedback({ type: 'error', message: 'Unauthorized: Please log in as an administrator to manage collected jobs.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to connect to collector data service.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndJobs();
  }, []);

  // 1. Manual Collection Trigger
  const handleTriggerCollection = async () => {
    setTriggering(true);
    setFeedback({ type: 'info', message: 'Running daily job collection & Gemini extraction pipeline...' });
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/collector/trigger', {
        method: 'POST',
        headers,
        body: JSON.stringify({ triggered_by: 'admin_manual' }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: data.message });
        await fetchStatsAndJobs();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Collection run failed.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error triggering collector.' });
    } finally {
      setTriggering(false);
    }
  };

  // 2. Auto Expiry Trigger
  const handleTriggerExpiry = async () => {
    setExpiring(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/collector/expire', { method: 'POST', headers });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: data.message });
        await fetchStatsAndJobs();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to process expirations.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to process expirations.' });
    } finally {
      setExpiring(false);
    }
  };

  // 3. Actions: Approve & Publish
  const handlePublishJob = async (id: string, editedData?: Partial<CollectedJob>) => {
    setActionLoading(id);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/collector/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ action: 'publish', editedData }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Job approved and published to public portal!' });
        if (editJob?.id === id) setEditJob(null);
        await fetchStatsAndJobs();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to publish job.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error publishing job.' });
    } finally {
      setActionLoading(null);
    }
  };

  // 4. Reject Job
  const handleRejectJob = async (id: string) => {
    const reason = window.prompt('Optional: Enter rejection reason (e.g. Expired link, outside India, incomplete details)', 'Rejected by administrator');
    if (reason === null) return;

    setActionLoading(id);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/collector/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ action: 'reject', rejection_reason: reason }),
      });
      if (res.ok) {
        setFeedback({ type: 'info', message: 'Job marked as rejected.' });
        await fetchStatsAndJobs();
      } else {
        const data = await res.json();
        setFeedback({ type: 'error', message: data.error || 'Failed to reject job.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to reject job.' });
    } finally {
      setActionLoading(null);
    }
  };

  // 5. Delete Job
  const handleDeleteJob = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this collected job record permanently?')) return;

    setActionLoading(id);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/collector/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        setFeedback({ type: 'info', message: 'Record deleted from queue.' });
        await fetchStatsAndJobs();
      } else {
        const data = await res.json();
        setFeedback({ type: 'error', message: data.error || 'Failed to delete record.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting job.' });
    } finally {
      setActionLoading(null);
    }
  };

  // 6. Save Edits
  const handleSaveEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;

    setActionLoading(editJob.id);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/collector/${editJob.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ action: 'edit', ...editJob }),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Edits saved successfully.' });
        setEditJob(null);
        await fetchStatsAndJobs();
      } else {
        const data = await res.json();
        setFeedback({ type: 'error', message: data.error || 'Failed to save edits.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to save edits.' });
    } finally {
      setActionLoading(null);
    }
  };

  // Filter jobs based on tab & query
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'pending' && job.status !== 'pending') return false;
    if (activeTab === 'approved' && job.status !== 'approved') return false;
    if (activeTab === 'published' && job.status !== 'published') return false;
    if (activeTab === 'rejected' && job.status !== 'rejected') return false;
    if (activeTab === 'duplicates' && !job.is_duplicate) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.company_name.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Automation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Daily Job Collector &amp; Approval Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Automated 8:00 AM ingestion from lawful Indian career feeds &amp; gazettes powered by Google Gemini AI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleTriggerExpiry}
            disabled={expiring}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
            title="Automatically unpublishes jobs past their application cutoff"
          >
            {expiring ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
            <span>Auto-Expiry Check</span>
          </button>

          <button
            onClick={handleTriggerCollection}
            disabled={triggering}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {triggering ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running Collection &amp; Gemini...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Trigger Collection Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification / Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center justify-between gap-3 animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
              : feedback.type === 'error'
              ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
              : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            {feedback.type === 'error' && <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
            {feedback.type === 'info' && <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pending Items Urgent Alert */}
      {stats && stats.pending > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Action Required:</strong> You have <strong>{stats.pending}</strong> collected openings awaiting administrator review and approval before they appear on the public portal.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('pending')}
            className="px-3 py-1 bg-amber-600 text-white rounded-lg text-[11px] font-bold hover:bg-amber-700 whitespace-nowrap ml-2"
          >
            Review Pending &rarr;
          </button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {stats?.total ?? 0}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5">Total Ingested</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            {stats?.pending ?? 0}
          </div>
          <div className="text-[11px] font-medium text-amber-700 dark:text-amber-300 mt-0.5">Pending Approval</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats?.published ?? 0}
          </div>
          <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 mt-0.5">Live Published</div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {stats?.approved ?? 0}
          </div>
          <div className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 mt-0.5">Approved Queue</div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
            {stats?.duplicates ?? 0}
          </div>
          <div className="text-[11px] font-medium text-purple-700 dark:text-purple-300 mt-0.5">Flagged Duplicates</div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
            {stats?.rejected ?? 0}
          </div>
          <div className="text-[11px] font-medium text-rose-700 dark:text-rose-300 mt-0.5">Rejected</div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'pending', label: 'Pending Approval', count: stats?.pending },
            { id: 'all', label: 'All Collected', count: stats?.total },
            { id: 'published', label: 'Published Live', count: stats?.published },
            { id: 'duplicates', label: 'Duplicates', count: stats?.duplicates },
            { id: 'rejected', label: 'Rejected', count: stats?.rejected },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collected jobs..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Main Jobs Queue Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
            <span>Loading collected queue...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              No jobs matching this filter ({activeTab}).
            </p>
            <p>Use &ldquo;Trigger Collection Now&rdquo; to fetch new opportunities from lawful Indian sources.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Status &amp; Flags</th>
                  <th className="py-3.5 px-4">Role &amp; Company</th>
                  <th className="py-3.5 px-4">Category &amp; Location</th>
                  <th className="py-3.5 px-4">Salary &amp; Deadline</th>
                  <th className="py-3.5 px-4">Source &amp; Link</th>
                  <th className="py-3.5 px-4 text-right">Review Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredJobs.map((job) => {
                  const isProcessing = actionLoading === job.id;

                  return (
                    <tr
                      key={job.id}
                      className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                        job.is_duplicate ? 'bg-purple-50/20 dark:bg-purple-950/10' : ''
                      }`}
                    >
                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              job.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : job.status === 'approved'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                : job.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span className="capitalize">{job.status}</span>
                          </span>

                          {job.is_duplicate && (
                            <div>
                              <span
                                className="inline-flex items-center gap-1 text-[9px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded"
                                title={job.duplicate_reason || 'Identified duplicate'}
                              >
                                <CopyCheck className="w-2.5 h-2.5" />
                                <span>Duplicate</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title & Company */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {job.title}
                        </div>
                        <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 flex-shrink-0" />
                          <span className="line-clamp-1 font-medium">{job.company_name}</span>
                        </div>
                      </td>

                      {/* Category & Location */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {job.category_slug}
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                      </td>

                      {/* Salary & Deadline */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {job.salary_text}
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{job.application_deadline ? `Cutoff: ${job.application_deadline}` : 'No deadline'}</span>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                          {job.source_name}
                        </div>
                        <a
                          href={job.official_apply_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:underline mt-0.5"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Inspect / Preview */}
                          <button
                            onClick={() => setPreviewJob(job)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Preview Extracted JSON"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => setEditJob(job)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950"
                            title="Edit Extracted Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Approve & Publish Directly */}
                          {job.status !== 'published' && (
                            <button
                              onClick={() => handlePublishJob(job.id)}
                              disabled={isProcessing}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all disabled:opacity-50"
                              title="Approve and promote to active job listings"
                            >
                              {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                              <span>Publish</span>
                            </button>
                          )}

                          {/* Reject */}
                          {job.status === 'pending' && (
                            <button
                              onClick={() => handleRejectJob(job.id)}
                              disabled={isProcessing}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950"
                              title="Reject opening"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            disabled={isProcessing}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950"
                            title="Delete permanently"
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
        )}
      </div>

      {/* MODAL 1: PREVIEW EXTRACTED JOB DETAILS */}
      {previewJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 uppercase font-bold">
                  Extracted via Gemini AI
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {previewJob.title}
                </h3>
                <p className="text-xs text-slate-500">{previewJob.company_name} &bull; {previewJob.location}</p>
              </div>
              <button onClick={() => setPreviewJob(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Compensation</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewJob.salary_text}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Work Mode</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewJob.work_mode}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Experience</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewJob.experience_level}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Cutoff Date</span>
                <span className="font-bold text-slate-900 dark:text-white">{previewJob.application_deadline || 'Not Disclosed'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Eligibility &amp; Qualification</h4>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">{previewJob.qualification}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewJob.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 text-[11px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Role Description</h4>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 leading-relaxed">{previewJob.description}</p>
              </div>

              {previewJob.raw_content && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Original Raw Source Text</h4>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 text-[10px] font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {previewJob.raw_content}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={previewJob.official_apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Verify Official Apply URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditJob(previewJob);
                    setPreviewJob(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Edit Details
                </button>
                {previewJob.status !== 'published' && (
                  <button
                    onClick={() => {
                      handlePublishJob(previewJob.id);
                      setPreviewJob(null);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Approve &amp; Publish Live
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT EXTRACTED DETAILS BEFORE APPROVAL */}
      {editJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveEdits}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Extracted Job Parameters
              </h3>
              <button type="button" onClick={() => setEditJob(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editJob.title}
                  onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={editJob.company_name}
                  onChange={(e) => setEditJob({ ...editJob, company_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={editJob.location}
                  onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category Slug</label>
                <select
                  value={editJob.category_slug}
                  onChange={(e) => setEditJob({ ...editJob, category_slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="it-software">IT &amp; Software</option>
                  <option value="data-analyst">Data Analyst</option>
                  <option value="ai-machine-learning">AI &amp; Machine Learning</option>
                  <option value="network-engineer">Network Engineer</option>
                  <option value="software-developer">Software Developer</option>
                  <option value="non-it-jobs">Non-IT Jobs</option>
                  <option value="government-jobs">Government Jobs</option>
                  <option value="work-from-home">Work From Home</option>
                  <option value="internships">Internships</option>
                  <option value="btech-fresher-jobs">B.Tech Fresher Jobs</option>
                  <option value="walk-in-interviews">Walk-in Interviews</option>
                  <option value="graduate-trainee">Graduate Trainee</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Salary Text</label>
                <input
                  type="text"
                  value={editJob.salary_text}
                  onChange={(e) => setEditJob({ ...editJob, salary_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Deadline (YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={editJob.application_deadline || ''}
                  onChange={(e) => setEditJob({ ...editJob, application_deadline: e.target.value || undefined })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Apply URL *</label>
              <input
                type="url"
                required
                value={editJob.official_apply_url}
                onChange={(e) => setEditJob({ ...editJob, official_apply_url: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qualification</label>
              <input
                type="text"
                value={editJob.qualification}
                onChange={(e) => setEditJob({ ...editJob, qualification: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditJob(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Edits
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
