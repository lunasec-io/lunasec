ALTER TABLE public.project_folder_settings
    ADD COLUMN root BOOLEAN NOT NULL DEFAULT FALSE;

-- Only one root setting per project
CREATE UNIQUE INDEX one_root_folder_setting_only ON public.project_folder_settings (project_id)
    WHERE root = TRUE;

ALTER TABLE public.cvss_environmental_adjustment
    ADD COLUMN group_name TEXT;
ALTER TABLE public.cvss_environmental_adjustment
    ALTER COLUMN group_name SET NOT NULL;

INSERT INTO public.cvss_environmental_adjustment (group_name, name)
VALUES ('frontend-or-backend', 'frontend'),
       ('frontend-or-backend', 'backend'),
       ('internet', 'internet exposed'),
       ('internet', 'not internet exposed'),
       ('pii', 'PII'),
       ('pii', 'no PII'),
       ('tests', 'tests'),
       ('ignore', 'ignore all');

ALTER TABLE project_folder_settings
    DROP CONSTRAINT project_folder_settings_project_id_precedence_key;

-- this is a good reason to use named constraints, PG generated these dupes when it migrated up and down on my machine so these are here to clean up anyone else if they are in a similar situation
ALTER TABLE project_folder_settings
    DROP CONSTRAINT IF EXISTS project_folder_settings_project_id_precedence_key1;

ALTER TABLE project_folder_settings
    DROP CONSTRAINT IF EXISTS project_folder_settings_project_id_precedence_key2;

