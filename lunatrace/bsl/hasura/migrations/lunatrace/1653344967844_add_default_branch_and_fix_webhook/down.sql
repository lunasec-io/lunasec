ALTER TABLE public.github_repositories DROP COLUMN default_branch;

ALTER TABLE public.webhook_cache ALTER COLUMN event_type TYPE public.github_webhook_event USING event_type::github_webhook_event;
