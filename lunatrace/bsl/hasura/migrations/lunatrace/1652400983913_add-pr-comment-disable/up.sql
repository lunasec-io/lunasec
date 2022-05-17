ALTER TABLE public.settings ADD COLUMN pr_feedback_disabled boolean DEFAULT NULL;

CREATE OR REPLACE FUNCTION public.insert_default_settings()
    RETURNS uuid AS
$BODY$
DECLARE new_id uuid;
BEGIN
    INSERT INTO public.settings DEFAULT VALUES RETURNING id INTO new_id;
    return new_id;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE;


ALTER TABLE public.projects DROP COLUMN settings_id;
ALTER TABLE public.projects ADD COLUMN settings_id uuid NOT NULL DEFAULT public.insert_default_settings() REFERENCES public.settings;

ALTER TABLE public.organizations DROP COLUMN settings_id;
ALTER TABLE public.organizations ADD COLUMN settings_id uuid NOT NULL DEFAULT public.insert_default_settings() REFERENCES public.settings;
