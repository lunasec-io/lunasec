ALTER TABLE public.settings ADD COLUMN pr_feedback_enabled boolean DEFAULT true NOT NULL;
ALTER TABLE public.settings DROP COLUMN is_org_settings;
ALTER TABLE public.projects ADD CONSTRAINT project_settings_fkey FOREIGN KEY (settings_id) REFERENCES public.settings;
ALTER TABLE public.organizations ADD CONSTRAINT organization_settings_fkey FOREIGN KEY (settings_id) REFERENCES public.settings;

--  get caught up on the missing settings rows
DO $$
    declare
        project record;
    BEGIN
FOR project IN SELECT * FROM public.projects WHERE settings_id IS NULL
LOOP
    WITH setting AS (INSERT INTO public.settings DEFAULT VALUES RETURNING id)
    UPDATE public.projects
    SET settings_id=setting.id
    FROM setting
    WHERE public.projects.id = project.id;
END LOOP;
END; $$;


-- make sure any new projects or orgs have a settings table associated
CREATE OR REPLACE FUNCTION always_create_settings()
    RETURNS trigger AS
$BODY$
BEGIN
    if (NEW.settings_id IS NULL) then
        INSERT INTO public.settings DEFAULT VALUES RETURNING id INTO NEW.settings_id;
    end if;
    RETURN NEW;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE;


CREATE TRIGGER add_project_settings
    BEFORE INSERT
    ON public.projects
    FOR EACH ROW
EXECUTE PROCEDURE always_create_settings();

CREATE TRIGGER add_organization_settings
    BEFORE INSERT
    ON public.organizations
    FOR EACH ROW
EXECUTE PROCEDURE always_create_settings();
