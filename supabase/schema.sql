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
