ALTER TABLE public.project_access_tokens
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE public.project_access_tokens
    ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.project_access_tokens
    ADD COLUMN IF NOT EXISTS created_by_user_id uuid REFERENCES public.identities;

--  Not currently using the last_used field but it will be nice for people to know which of their tokens are deprecated, eventually
ALTER TABLE public.project_access_tokens
    ADD COLUMN IF NOT EXISTS last_used TIMESTAMP WITHOUT TIME ZONE;
