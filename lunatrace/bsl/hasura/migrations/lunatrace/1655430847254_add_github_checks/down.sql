ALTER TABLE public.builds
    DROP COLUMN existing_github_check_id;

ALTER TABLE public.settings
    DROP COLUMN pr_check_enabled;
