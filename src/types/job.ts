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
