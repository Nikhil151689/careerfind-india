-- ==============================================================================
-- CareerFind India - AI Job Collector & Automation Schema
-- Module: Automated Daily Ingestion, Gemini Extraction, Deduplication & Approval Queue
-- ==============================================================================

-- 1. COLLECTED JOBS QUEUE TABLE
CREATE TABLE IF NOT EXISTS public.collected_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Ingestion Source Metadata
    source_name TEXT NOT NULL DEFAULT 'Permitted Feed',
    source_url TEXT,
    raw_title TEXT,
    raw_company TEXT,
    raw_content TEXT,
    extracted_data JSONB DEFAULT '{}'::jsonb,
    
    -- Processing & Review Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'published')),
    is_duplicate BOOLEAN NOT NULL DEFAULT FALSE,
    duplicate_reason TEXT,
    matched_job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    published_job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    rejection_reason TEXT,
    
    -- Structured AI-Extracted Fields
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    category_slug TEXT DEFAULT 'it-software',
    location TEXT NOT NULL DEFAULT 'Pan India',
    work_mode TEXT NOT NULL DEFAULT 'In-Office' CHECK (work_mode IN ('In-Office', 'Hybrid', 'Work From Home', 'Remote')),
    job_type TEXT NOT NULL DEFAULT 'Full-Time' CHECK (job_type IN ('Full-Time', 'Part-Time', 'Internship', 'Contract', 'Walk-In')),
    experience_level TEXT NOT NULL DEFAULT '0-2 Years',
    experience_min INT DEFAULT 0,
    experience_max INT DEFAULT 2,
    salary_min NUMERIC,
    salary_max NUMERIC,
    salary_text TEXT DEFAULT 'Not Disclosed',
    qualification TEXT NOT NULL DEFAULT 'Graduate / Diploma / Degree',
    skills TEXT[] NOT NULL DEFAULT '{}',
    description TEXT NOT NULL DEFAULT '',
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    eligibility_criteria TEXT[] NOT NULL DEFAULT '{}',
    application_deadline DATE,
    official_apply_url TEXT NOT NULL,
    
    -- Classification Flags
    is_fresher BOOLEAN DEFAULT FALSE,
    is_government BOOLEAN DEFAULT FALSE,
    is_wfh BOOLEAN DEFAULT FALSE,
    is_internship BOOLEAN DEFAULT FALSE,
    is_walkin BOOLEAN DEFAULT FALSE,
    
    -- Deduplication Keys
    normalized_url TEXT,
    normalized_key TEXT,
    
    -- Review Audit Trail
    reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_collected_jobs_status ON public.collected_jobs(status);
CREATE INDEX IF NOT EXISTS idx_collected_jobs_dup ON public.collected_jobs(is_duplicate);
CREATE INDEX IF NOT EXISTS idx_collected_jobs_created_at ON public.collected_jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_collected_jobs_norm_url ON public.collected_jobs(normalized_url);
CREATE INDEX IF NOT EXISTS idx_collected_jobs_norm_key ON public.collected_jobs(normalized_key);
CREATE INDEX IF NOT EXISTS idx_collected_jobs_deadline ON public.collected_jobs(application_deadline);

-- 2. COLLECTOR RUNS AUDIT TABLE
CREATE TABLE IF NOT EXISTS public.collector_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    triggered_by TEXT NOT NULL DEFAULT 'n8n_cron', -- 'n8n_cron', 'admin_manual', 'webhook'
    jobs_collected INT DEFAULT 0,
    jobs_pending INT DEFAULT 0,
    duplicates_found INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('running', 'completed', 'failed')),
    error_log TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_collector_runs_started ON public.collector_runs(started_at DESC);

-- 3. TRIGGER FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_collected_jobs_updated_at ON public.collected_jobs;
CREATE TRIGGER trigger_collected_jobs_updated_at
    BEFORE UPDATE ON public.collected_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.collected_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collector_runs ENABLE ROW LEVEL SECURITY;

-- Strict Admin RLS: Only authenticated users explicitly listed in public.admin_profiles with valid admin roles can view and manage
DROP POLICY IF EXISTS "Allow admins full access to collected_jobs" ON public.collected_jobs;
CREATE POLICY "Allow admins full access to collected_jobs"
    ON public.collected_jobs FOR ALL TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role IN ('super_admin', 'admin', 'editor')
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role IN ('super_admin', 'admin', 'editor')
      )
    );

DROP POLICY IF EXISTS "Allow admins full access to collector_runs" ON public.collector_runs;
CREATE POLICY "Allow admins full access to collector_runs"
    ON public.collector_runs FOR ALL TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role IN ('super_admin', 'admin', 'editor')
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role IN ('super_admin', 'admin', 'editor')
      )
    );

-- 5. AUTOMATIC EXPIRY FUNCTION FOR JOBS
-- Can be called via cron, webhook, or RPC from the Next.js API
CREATE OR REPLACE FUNCTION public.unpublish_expired_jobs()
RETURNS TABLE(unregistered_count INT) AS $$
DECLARE
    affected_rows INT;
BEGIN
    UPDATE public.jobs
    SET is_published = FALSE,
        updated_at = NOW()
    WHERE application_deadline IS NOT NULL
      AND application_deadline < CURRENT_DATE
      AND is_published = TRUE;
      
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RETURN QUERY SELECT affected_rows;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
