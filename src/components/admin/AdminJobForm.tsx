'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  Calendar,
  ExternalLink,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { Job, Company, Category, WorkMode, JobType, ExperienceLevel } from '@/types/job';
import { localStore, createJobAsync, updateJobAsync, fetchCompanies, fetchCategories } from '@/lib/data-store';
import { slugify } from '@/lib/utils';
import Link from 'next/link';

interface AdminJobFormProps {
  initialJob?: Job;
  isEdit?: boolean;
}

export default function AdminJobForm({ initialJob, isEdit = false }: AdminJobFormProps) {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>(localStore.getCompanies());
  const [categories, setCategories] = useState<Category[]>(localStore.getCategories());

  useEffect(() => {
    async function loadMeta() {
      const [comps, cats] = await Promise.all([
        fetchCompanies(),
        fetchCategories(),
      ]);
      if (comps.length > 0) setCompanies(comps);
      if (cats.length > 0) setCategories(cats);
    }
    loadMeta();
  }, []);

  const [formData, setFormData] = useState({
    title: initialJob?.title || '',
    slug: initialJob?.slug || '',
    company_id: initialJob?.company_id || (companies[0]?.id || ''),
    category_id: initialJob?.category_id || (categories[0]?.id || ''),
    location: initialJob?.location || 'Bengaluru, Karnataka',
    work_mode: (initialJob?.work_mode || 'In-Office') as WorkMode,
    job_type: (initialJob?.job_type || 'Full-Time') as JobType,
    experience_level: (initialJob?.experience_level || '0-2 Years') as ExperienceLevel,
    experience_min: initialJob?.experience_min || 0,
    experience_max: initialJob?.experience_max || 2,
    salary_text: initialJob?.salary_text || '₹6 - ₹12 LPA',
    qualification: initialJob?.qualification || 'B.Tech / B.E in CS / IT / Electronics or equivalent',
    skills: initialJob?.skills ? initialJob.skills.join(', ') : 'Java, Python, SQL',
    description: initialJob?.description || '',
    responsibilities: initialJob?.responsibilities ? initialJob.responsibilities.join('\n') : '',
    eligibility_criteria: initialJob?.eligibility_criteria ? initialJob.eligibility_criteria.join('\n') : '',
    application_deadline: initialJob?.application_deadline || '',
    official_apply_url: initialJob?.official_apply_url || 'https://',
    source_url: initialJob?.source_url || '',
    is_featured: !!initialJob?.is_featured,
    is_fresher: !!initialJob?.is_fresher,
    is_government: !!initialJob?.is_government,
    is_wfh: !!initialJob?.is_wfh,
    is_walkin: !!initialJob?.is_walkin,
    is_internship: !!initialJob?.is_internship,
    is_published: initialJob?.is_published !== undefined ? initialJob.is_published : true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEdit ? prev.slug : slugify(val),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.official_apply_url || !formData.description) {
      setError('Job title, description, and official application URL are strictly required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const respArray = formData.responsibilities
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean);

      const eligArray = formData.eligibility_criteria
        .split('\n')
        .map((c) => c.trim())
        .filter(Boolean);

      const jobPayload: Partial<Job> = {
        title: formData.title,
        slug: formData.slug || slugify(formData.title),
        company_id: formData.company_id,
        category_id: formData.category_id,
        location: formData.location,
        work_mode: formData.work_mode,
        job_type: formData.job_type,
        experience_level: formData.experience_level,
        experience_min: Number(formData.experience_min),
        experience_max: Number(formData.experience_max),
        salary_text: formData.salary_text,
        qualification: formData.qualification,
        skills: skillsArray,
        description: formData.description,
        responsibilities: respArray,
        eligibility_criteria: eligArray,
        application_deadline: formData.application_deadline || undefined,
        official_apply_url: formData.official_apply_url,
        source_url: formData.source_url || undefined,
        is_featured: formData.is_featured,
        is_fresher: formData.is_fresher,
        is_government: formData.is_government,
        is_wfh: formData.is_wfh,
        is_walkin: formData.is_walkin,
        is_internship: formData.is_internship,
        is_published: formData.is_published,
      };

      if (isEdit && initialJob) {
        await updateJobAsync(initialJob.id, jobPayload);
      } else {
        await createJobAsync(jobPayload);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } catch {
      setError('Failed to save listing. Please verify the inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Overview</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {isEdit ? 'Edit Job Opening' : 'Post New Verified Job'}
          </h1>
          <p className="text-xs text-slate-500">
            Recorded with official source verification and Schema.org compliance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Duplicate Check Active</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Listing saved successfully! Redirecting to dashboard...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            1. Role & Employer Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. TCS NQT Digital Cadre 2026 or Software Engineer II"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                URL Slug (SEO friendly) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. tcs-nqt-freshers-recruitment-2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company *
              </label>
              <select
                value={formData.company_id}
                onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.headquarters || 'India'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Location, Mode, Compensation & Experience */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            2. Location & Compensation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Bengaluru, Karnataka or Pan India"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Work Mode
              </label>
              <select
                value={formData.work_mode}
                onChange={(e) => setFormData({ ...formData, work_mode: e.target.value as WorkMode })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="In-Office">In-Office</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Work From Home">Work From Home</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Job Type
              </label>
              <select
                value={formData.job_type}
                onChange={(e) => setFormData({ ...formData, job_type: e.target.value as JobType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Walk-In">Walk-In</option>
                <option value="Contract">Contract</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Salary Display Text *
              </label>
              <input
                type="text"
                required
                value={formData.salary_text}
                onChange={(e) => setFormData({ ...formData, salary_text: e.target.value })}
                placeholder="e.g. ₹6.0 - ₹12.0 LPA or ₹30,000/month"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Experience Level *
              </label>
              <select
                value={formData.experience_level}
                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value as ExperienceLevel })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Fresher">Fresher (0 Years)</option>
                <option value="0-2 Years">0-2 Years</option>
                <option value="2-5 Years">2-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Qualifications & Description */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            3. Job Description, Skills & Eligibility
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Required Educational Qualification *
            </label>
            <input
              type="text"
              required
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. B.Tech/B.E in CS/IT, MCA, BCA (60% aggregate)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              required
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Java, React, SQL, Cloud, Algorithms"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Job Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a comprehensive role overview..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Key Responsibilities (one per line)
              </label>
              <textarea
                rows={3}
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="Develop microservices&#10;Conduct code reviews&#10;Deploy on cloud"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Eligibility Criteria (one per line)
              </label>
              <textarea
                rows={3}
                value={formData.eligibility_criteria}
                onChange={(e) => setFormData({ ...formData, eligibility_criteria: e.target.value })}
                placeholder="Min 60% in Graduation&#10;No active backlogs&#10;Up to 2 years education gap"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 4: URLs, Deadlines & Verification */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            4. Official Verification & Application Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Application URL *
              </label>
              <input
                type="url"
                required
                value={formData.official_apply_url}
                onChange={(e) => setFormData({ ...formData, official_apply_url: e.target.value })}
                placeholder="https://careers.company.com/apply"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <p className="text-[11px] text-slate-400 mt-1">Must be the official career website.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Source URL (Gazette / Circular / PDF)
              </label>
              <input
                type="url"
                value={formData.source_url}
                onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                placeholder="https://isro.gov.in/advt-123.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Application Deadline Date
            </label>
            <input
              type="date"
              value={formData.application_deadline}
              onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="text-[11px] text-slate-400 mt-1">Job automatically expires after this date.</p>
          </div>
        </div>

        {/* Section 5: Classification Badges & Publishing */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            5. Flags & Visibility
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Published & Visible</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Featured Priority</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_fresher}
                onChange={(e) => setFormData({ ...formData, is_fresher: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Fresher Eligible</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_government}
                onChange={(e) => setFormData({ ...formData, is_government: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Government / PSU</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_wfh}
                onChange={(e) => setFormData({ ...formData, is_wfh: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Work From Home</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_walkin}
                onChange={(e) => setFormData({ ...formData, is_walkin: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Walk-In Interview</span>
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin"
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Listing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Update Job Listing' : 'Publish Verified Job'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
