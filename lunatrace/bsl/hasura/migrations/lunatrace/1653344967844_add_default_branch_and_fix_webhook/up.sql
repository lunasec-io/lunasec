ALTER TABLE public.github_repositories
    ADD COLUMN default_branch TEXT;

CREATE INDEX IF NOT EXISTS build_branch_index ON public.builds (git_branch);

ALTER TABLE public.webhook_cache
    ALTER COLUMN event_type TYPE TEXT;
