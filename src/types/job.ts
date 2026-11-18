export type WorkMode = 'In-Office' | 'Hybrid' | 'Work From Home' | 'Remote';
export type JobType = 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract' | 'Walk-In';
export type ExperienceLevel = 'Fresher' | '0-2 Years' | '2-5 Years' | '5+ Years';

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  website_url?: string;
  industry?: string;
  headquarters?: string;
  description?: string;
  verified: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_name: string;
  badge_color?: string;
  display_order?: number;
  job_count?: number;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  company_id: string;
  company?: Company;
  category_id?: string;
  category?: Category;
  
  location: string;
  work_mode: WorkMode;
  job_type: JobType;
  
  experience_level: ExperienceLevel;
  experience_min: number;
  experience_max: number;
  salary_min?: number;
  salary_max?: number;
  salary_text: string;
  
  qualification: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  eligibility_criteria: string[];
  
  application_deadline?: string;
  official_apply_url: string;
  source_url?: string;
  last_verified_at: string;
  
  is_featured: boolean;
  is_fresher: boolean;
  is_government: boolean;
  is_wfh: boolean;
  is_walkin: boolean;
  is_internship: boolean;
  is_published: boolean;
  
  posted_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobFilterParams {
  query?: string;
  location?: string;
  category?: string;
  experience?: string;
  jobType?: string;
  workMode?: string;
  minSalary?: number;
  isFresher?: boolean;
  isGovernment?: boolean;
  isWfh?: boolean;
  isFeatured?: boolean;
  isInternship?: boolean;
  isWalkin?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'salary_desc' | 'deadline_asc';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_name: string;
  author_role: string;
  category: string;
  tags: string[];
  read_time: string;
  is_published: boolean;
  published_at: string;
  created_at?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  category_preferences?: string[];
  is_active: boolean;
  subscribed_at: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'super_admin' | 'admin' | 'editor';
}

export type CollectedJobStatus = 'pending' | 'approved' | 'rejected' | 'published';

export interface ExtractedJobPayload {
  title: string;
  company_name: string;
  category_slug?: string;
  location: string;
  work_mode: WorkMode;
  job_type: JobType;
  experience_level: ExperienceLevel;
  experience_min: number;
  experience_max: number;
  salary_text: string;
  salary_min?: number;
  salary_max?: number;
  qualification: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  eligibility_criteria: string[];
  application_deadline?: string;
  official_apply_url: string;
  source_url?: string;
  is_fresher: boolean;
  is_government: boolean;
  is_wfh: boolean;
  is_internship: boolean;
  is_walkin: boolean;
}

export interface CollectedJob extends ExtractedJobPayload {
  id: string;
  source_name: string;
  raw_title?: string;
  raw_company?: string;
  raw_content?: string;
  extracted_data?: Record<string, unknown>;
  status: CollectedJobStatus;
  is_duplicate: boolean;
  duplicate_reason?: string;
  matched_job_id?: string;
  published_job_id?: string;
  rejection_reason?: string;
  normalized_url?: string;
  normalized_key?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface CollectorRun {
  id: string;
  triggered_by: 'n8n_cron' | 'admin_manual' | 'webhook';
  jobs_collected: number;
  jobs_pending: number;
  duplicates_found: number;
  status: 'running' | 'completed' | 'failed';
  error_log?: string;
  started_at: string;
  completed_at?: string;
}

export interface CollectorStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  published: number;
  duplicates: number;
  lastRun?: CollectorRun;
}
