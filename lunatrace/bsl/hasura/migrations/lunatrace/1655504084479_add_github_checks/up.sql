ALTER TABLE public.builds
    ADD COLUMN existing_github_check_id BIGINT
        NULL;

ALTER TABLE public.settings
    ADD pr_check_enabled BOOLEAN DEFAULT TRUE;

