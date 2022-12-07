ALTER TABLE public.project_folder_settings
    ADD COLUMN root BOOLEAN NOT NULL DEFAULT FALSE;

-- Only one root setting per project
CREATE UNIQUE INDEX one_root_folder_setting_only ON public.project_folder_settings (project_id)
    WHERE root = TRUE;
