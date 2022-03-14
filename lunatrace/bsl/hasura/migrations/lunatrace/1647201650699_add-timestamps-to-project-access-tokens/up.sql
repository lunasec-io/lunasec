ALTER TABLE public.project_access_tokens ADD COLUMN IF NOT EXISTS created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL;
ALTER TABLE public.project_access_tokens ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.project_access_tokens ADD COLUMN IF NOT EXISTS created_by_user_id uuid references public.identities;

--  Not currently using the last_used field but it will be nice for people to know which of their tokens are deprecated, eventually
ALTER TABLE public.project_access_tokens ADD COLUMN IF NOT EXISTS last_used timestamp without time zone;
