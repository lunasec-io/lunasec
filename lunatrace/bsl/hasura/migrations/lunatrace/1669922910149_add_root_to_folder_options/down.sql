DROP INDEX one_root_folder_setting_only;

ALTER TABLE public.project_folder_settings
    DROP COLUMN root;

