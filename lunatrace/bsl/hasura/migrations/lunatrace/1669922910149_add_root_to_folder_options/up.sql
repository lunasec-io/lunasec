ALTER TABLE public.project_folder_settings
    ADD COLUMN root BOOLEAN NOT NULL DEFAULT FALSE;

-- Only one root setting per project
CREATE UNIQUE INDEX one_root_folder_setting_only ON public.project_folder_settings (project_id)
    WHERE root = TRUE;

ALTER TABLE public.cvss_environmental_adjustment
    ADD COLUMN group_name TEXT;
ALTER TABLE public.cvss_environmental_adjustment
    ALTER COLUMN group_name SET NOT NULL;

--  internet exposure
--  TODO: when implementing this in the backend, make sure these internet settings can only LOWER a vulnerabilities value and not raise it, since these are overrides
INSERT INTO public.cvss_environmental_adjustment (group_name, name, attack_vector)
VALUES ('internet', 'internet', 'N'),
       ('internet', 'internal', 'A'),
       ('internet', 'offline', 'L');

-- PII
INSERT INTO public.cvss_environmental_adjustment (group_name, name, confidentiality_requirement)
VALUES ('PII', 'PII', 'H'),
       ('PII', 'no PII', 'L');

-- frontend/backend
INSERT INTO public.cvss_environmental_adjustment (group_name, name, availability_requirement)
VALUES ('frontend-or-backend', 'frontend', 'L'),
       ('frontend-or-backend', 'backend', 'X');

-- tests
INSERT INTO public.cvss_environmental_adjustment (group_name, name, availability_requirement,
                                                  confidentiality_requirement, integrity_requirement)
VALUES ('tests', 'tests', 'L', 'L', 'L');

ALTER TABLE project_folder_settings
    DROP CONSTRAINT IF EXISTS project_folder_settings_project_id_precedence_key;

-- this is a good reason to use named constraints, PG generated these dupes when it migrated up and down on my machine so these are here to clean up anyone else if they are in a similar situation
ALTER TABLE project_folder_settings
    DROP CONSTRAINT IF EXISTS project_folder_settings_project_id_precedence_key1;

ALTER TABLE project_folder_settings
    DROP CONSTRAINT IF EXISTS project_folder_settings_project_id_precedence_key2;

-- may as well let the root one be null
ALTER TABLE public.project_folder_settings
    ALTER COLUMN precedence DROP NOT NULL;


-- trigger to make sure projects always have a root settings available. Less buggy than doing this from the frontend
CREATE OR REPLACE FUNCTION insert_root_settings_on_project()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$function$
BEGIN
    INSERT INTO public.project_folder_settings (root, path_glob, project_id)
    VALUES (TRUE, '**', new.id)
    ON CONFLICT DO NOTHING;
    RETURN new;
END;
$function$;

DROP TRIGGER IF EXISTS trigger_on_project_insert ON public.projects;

CREATE TRIGGER trigger_on_project_insert
    AFTER INSERT
    ON public.projects
    FOR EACH ROW
EXECUTE PROCEDURE insert_root_settings_on_project();

-- make a root setting for any existing projects, which obviously wont be covered by the above trigger
DO
$$
    DECLARE
        project_id uuid;
    BEGIN
        FOR project_id IN SELECT id FROM public.projects
            LOOP
                INSERT INTO public.project_folder_settings (root, path_glob, project_id)
                VALUES (TRUE, '**', project_id)
                ON CONFLICT DO NOTHING;
            END LOOP;
    END
$$;
