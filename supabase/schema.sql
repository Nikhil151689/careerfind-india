-- ==============================================================================
-- CareerFind India - Supabase PostgreSQL Database Schema
-- Production Ready Schema with Row Level Security (RLS), Indexes, and Constraints
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. COMPANIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    industry TEXT,
    headquarters TEXT DEFAULT 'Bengaluru, India',
    description TEXT,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for company lookup
CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies(name);

-- -----------------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_name TEXT DEFAULT 'Briefcase',
    badge_color TEXT DEFAULT 'purple',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category lookup by slug
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- -----------------------------------------------------------------------------
-- 3. JOBS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    
    -- Locations and Work Modes
    location TEXT NOT NULL,
    work_mode TEXT NOT NULL DEFAULT 'In-Office' CHECK (work_mode IN ('In-Office', 'Hybrid', 'Work From Home', 'Remote')),
    job_type TEXT NOT NULL DEFAULT 'Full-Time' CHECK (job_type IN ('Full-Time', 'Part-Time', 'Internship', 'Contract', 'Walk-In')),
    
    -- Experience and Compensation
    experience_level TEXT NOT NULL DEFAULT '0-2 Years',
    experience_min INT DEFAULT 0,
    experience_max INT DEFAULT 2,
    salary_min NUMERIC,
    salary_max NUMERIC,
    salary_text TEXT DEFAULT 'Competitive / Best in Industry',
    
    -- Requirements & Details
    qualification TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    eligibility_criteria TEXT[] NOT NULL DEFAULT '{}',
    
    -- Application and Verification
    application_deadline DATE,
    official_apply_url TEXT NOT NULL,
    source_url TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_fresher BOOLEAN DEFAULT FALSE,
    is_government BOOLEAN DEFAULT FALSE,
    is_wfh BOOLEAN DEFAULT FALSE,
    is_walkin BOOLEAN DEFAULT FALSE,
    is_internship BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Essential Performance Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category_id);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_published ON public.jobs(is_published);
CREATE INDEX IF NOT EXISTS idx_jobs_deadline ON public.jobs(application_deadline);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON public.jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON public.jobs(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_jobs_fresher ON public.jobs(is_fresher) WHERE is_fresher = TRUE;
CREATE INDEX IF NOT EXISTS idx_jobs_government ON public.jobs(is_government) WHERE is_government = TRUE;
CREATE INDEX IF NOT EXISTS idx_jobs_wfh ON public.jobs(is_wfh) WHERE is_wfh = TRUE;
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);

-- Full-text search index on Title, Description and Location
CREATE INDEX IF NOT EXISTS idx_jobs_search ON public.jobs 
USING gin(to_tsvector('english', title || ' ' || description || ' ' || location));

-- -----------------------------------------------------------------------------
-- 4. BLOG POSTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    author_name TEXT DEFAULT 'CareerFind Editorial Team',
    author_role TEXT DEFAULT 'Recruitment & Career Specialist',
    category TEXT DEFAULT 'Career Advice',
    tags TEXT[] DEFAULT '{}',
    read_time TEXT DEFAULT '5 min read',
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON public.blog_posts(is_published, published_at DESC);

-- -----------------------------------------------------------------------------
-- 5. SUBSCRIBERS TABLE (Job Alert Newsletter)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    category_preferences TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- -----------------------------------------------------------------------------
-- 6. ADMIN PROFILES TABLE (Linked with Supabase auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- AUTOMATIC TIMESTAMP TRIGGER
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_companies_updated_at ON public.companies;
CREATE TRIGGER trigger_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_jobs_updated_at ON public.jobs;
CREATE TRIGGER trigger_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trigger_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-register new Auth users into admin_profiles
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Administrator'), 'admin')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies
DROP POLICY IF EXISTS "Allow public read access to verified companies" ON public.companies;
CREATE POLICY "Allow public read access to verified companies"
    ON public.companies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
CREATE POLICY "Allow public read access to categories"
    ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to published jobs" ON public.jobs;
CREATE POLICY "Allow public read access to published jobs"
    ON public.jobs FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Allow public read access to published blogs" ON public.blog_posts;
CREATE POLICY "Allow public read access to published blogs"
    ON public.blog_posts FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Allow public insert to subscribers" ON public.subscribers;
CREATE POLICY "Allow public insert to subscribers"
    ON public.subscribers FOR INSERT WITH CHECK (true);

-- 2. Authenticated Admin Policies (Checked via admin_profiles OR open to authenticated if admin_profiles is empty)
DROP POLICY IF EXISTS "Allow admins full access to companies" ON public.companies;
CREATE POLICY "Allow admins full access to companies"
    ON public.companies FOR ALL TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    )
    WITH CHECK (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    );

DROP POLICY IF EXISTS "Allow admins full access to categories" ON public.categories;
CREATE POLICY "Allow admins full access to categories"
    ON public.categories FOR ALL TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    )
    WITH CHECK (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    );

DROP POLICY IF EXISTS "Allow admins full access to jobs" ON public.jobs;
CREATE POLICY "Allow admins full access to jobs"
    ON public.jobs FOR ALL TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    )
    WITH CHECK (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    );

DROP POLICY IF EXISTS "Allow admins full access to blog_posts" ON public.blog_posts;
CREATE POLICY "Allow admins full access to blog_posts"
    ON public.blog_posts FOR ALL TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    )
    WITH CHECK (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    );

DROP POLICY IF EXISTS "Allow admins read access to subscribers" ON public.subscribers;
CREATE POLICY "Allow admins read access to subscribers"
    ON public.subscribers FOR SELECT TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
      OR (SELECT count(*) FROM public.admin_profiles) = 0
    );

DROP POLICY IF EXISTS "Allow authenticated to manage own admin_profile" ON public.admin_profiles;
CREATE POLICY "Allow authenticated to manage own admin_profile"
    ON public.admin_profiles FOR ALL TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());
