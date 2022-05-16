DROP TRIGGER add_project_settings ON public.projects;
DROP TRIGGER add_organization_settings ON public.organizations;

ALTER TABLE public.projects DROP CONSTRAINT project_settings_fkey;
ALTER TABLE public.organizations DROP CONSTRAINT organization_settings_fkey;

ALTER TABLE public.settings DROP COLUMN pr_feedback_enabled;
ALTER TABLE public.settings ADD COLUMN is_org_settings boolean;


