ALTER TABLE public.projects
    DROP COLUMN settings_id;
ALTER TABLE public.projects
    ADD COLUMN settings_id uuid REFERENCES public.settings;

ALTER TABLE public.organizations
    DROP COLUMN settings_id;
ALTER TABLE public.organizations
    ADD COLUMN settings_id uuid REFERENCES public.settings;

DROP FUNCTION public.insert_default_settings() CASCADE;

ALTER TABLE public.settings
    DROP COLUMN pr_feedback_disabled;



-- previously was
-- DROP TRIGGER add_project_settings ON public.projects;
-- DROP TRIGGER add_organization_settings ON public.organizations;
--
-- ALTER TABLE public.projects DROP CONSTRAINT project_settings_fkey;
-- ALTER TABLE public.organizations DROP CONSTRAINT organization_settings_fkey;
--
-- ALTER TABLE public.settings DROP COLUMN pr_feedback_enabled;
-- ALTER TABLE public.settings ADD COLUMN is_org_settings boolean;
--
--
--
