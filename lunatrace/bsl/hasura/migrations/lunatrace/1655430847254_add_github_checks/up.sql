ALTER TABLE public.builds
    ADD COLUMN existing_github_check_id INTEGER
        NULL;

ALTER TABLE settings
    ADD pr_check_enabled BOOLEAN DEFAULT TRUE;

