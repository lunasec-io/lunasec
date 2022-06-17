ALTER TABLE public.github_repositories
    ADD COLUMN api_response jsonb NOT NULL DEFAULT '{}';
