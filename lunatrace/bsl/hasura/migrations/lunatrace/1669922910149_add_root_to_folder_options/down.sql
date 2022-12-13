DELETE FROM public.cvss_environmental_adjustment;

DROP INDEX one_root_folder_setting_only;

ALTER TABLE public.project_folder_settings
    DROP COLUMN root;


ALTER TABLE public.cvss_environmental_adjustment DROP COLUMN group_name;

