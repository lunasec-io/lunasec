
DROP TABLE public.folder_environmental_adjustment;

DROP TABLE public.project_folder_settings;


CREATE TABLE public.project_environmental_adjustment
(
    path_glob                        TEXT NOT NULL,
    project_id                       uuid NOT NULL REFERENCES public.projects ON DELETE CASCADE,
    cvss_environmental_adjustment_id uuid NOT NULL REFERENCES public.cvss_environmental_adjustment ON DELETE CASCADE,
    UNIQUE (project_id, path_glob)
);





