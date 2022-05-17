ALTER TABLE public.settings DROP COLUMN pr_feedback_disabled;
ALTER TABLE public.settings ADD COLUMN is_org_settings boolean;
ALTER TABLE public.settings DROP COLUMN project_id;

ALTER TABLE public.projects ADD COLUMN settings_id uuid;
ALTER TABLE public.organizations ADD COLUMN settings_id uuid;

