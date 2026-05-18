-- ==========================================
-- Catapult Recovery Services Database Schema
-- ==========================================

-- 0. Clean slate (Drop existing to prevent already exists errors)
DROP TABLE IF EXISTS public.intake_submissions CASCADE;
DROP TYPE IF EXISTS assistance_category CASCADE;
DROP TYPE IF EXISTS submission_status CASCADE;

-- 1. Create custom types
CREATE TYPE assistance_category AS ENUM (
    'Housing Assistance', 
    'Substance Abuse Recovery', 
    'Mental Health Counseling', 
    'General Support'
);

CREATE TYPE submission_status AS ENUM (
    'Pending',
    'Reviewed',
    'Contacted'
);

-- 2. Create Intake Submissions Table
CREATE TABLE public.intake_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    phone TEXT NOT NULL,
    assistance_type assistance_category NOT NULL,
    description TEXT,
    status submission_status DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (submit forms)
CREATE POLICY "Enable insert for anonymous users" 
ON public.intake_submissions 
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow ONLY authenticated users (like Catapult Staff) to SELECT (read)
CREATE POLICY "Enable read for authenticated staff only" 
ON public.intake_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- ==========================================
-- AI Social Director Data Models
-- ==========================================

-- Drop types if they exist to prevent errors on reload
DROP TYPE IF EXISTS campaign_status CASCADE;
DROP TYPE IF EXISTS variant_status CASCADE;

CREATE TYPE campaign_status AS ENUM (
    'Draft',
    'Awaiting_Meta_Connection',
    'Active',
    'Completed'
);

CREATE TYPE variant_status AS ENUM (
    'Pending_Review',
    'Approved',
    'Rejected'
);

-- 4. Create Ad Campaigns Table
CREATE TABLE public.ad_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective TEXT NOT NULL,
    context TEXT NOT NULL,
    status campaign_status DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Ad Variants Table
CREATE TABLE public.ad_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    skill TEXT NOT NULL,
    headline TEXT NOT NULL,
    primary_text TEXT NOT NULL,
    image_url TEXT,
    status variant_status DEFAULT 'Pending_Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RLS for Campaigns & Variants
ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_variants ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT campaigns/variants (from the Command Center UI)
CREATE POLICY "Enable insert for anonymous users" ON public.ad_campaigns FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable insert for anonymous users" ON public.ad_variants FOR INSERT TO public WITH CHECK (true);

-- Allow anonymous users to SELECT (so UI can redirect/show success)
CREATE POLICY "Enable read for anonymous users" ON public.ad_campaigns FOR SELECT TO public USING (true);
CREATE POLICY "Enable read for anonymous users" ON public.ad_variants FOR SELECT TO public USING (true);

-- Allow authenticated users full control
CREATE POLICY "Enable all for authenticated users" ON public.ad_campaigns FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.ad_variants FOR ALL TO authenticated USING (true);
