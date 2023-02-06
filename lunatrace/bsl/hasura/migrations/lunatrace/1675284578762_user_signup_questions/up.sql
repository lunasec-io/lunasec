
ALTER TABLE public.users ADD COLUMN survey jsonb CHECK (length(survey::text) < 10000) NULL;

