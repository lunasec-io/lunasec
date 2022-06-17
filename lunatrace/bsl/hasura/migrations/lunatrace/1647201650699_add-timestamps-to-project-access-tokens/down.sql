ALTER TABLE public.project_access_tokens
    DROP COLUMN created_at;
ALTER TABLE public.project_access_tokens
    DROP COLUMN name;
ALTER TABLE public.project_access_tokens
    DROP COLUMN created_by_user_id;
ALTER TABLE public.project_access_tokens
    DROP COLUMN last_used;
