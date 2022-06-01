ALTER TABLE public.github_repositories DROP COLUMN default_branch;

ALTER TYPE public.github_webhook_event ADD VALUE IF NOT EXISTS 'installation';

-- Have to close out the transaction to make the new enum value available below
COMMIT;
BEGIN;
ALTER TABLE public.webhook_cache ALTER COLUMN event_type TYPE public.github_webhook_event USING event_type::github_webhook_event;
