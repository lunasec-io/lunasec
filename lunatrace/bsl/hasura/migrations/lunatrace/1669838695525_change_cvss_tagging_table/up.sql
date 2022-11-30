DROP TABLE public.project_environmental_adjustment;


CREATE TABLE public.project_folder_settings
(
    id         uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    path_glob  TEXT NOT NULL,
    project_id uuid NOT NULL REFERENCES public.projects ON DELETE CASCADE,
    ignore     bool             DEFAULT FALSE
);


CREATE TABLE public.folder_environmental_adjustment
(
    id                               uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    cvss_environmental_adjustment_id uuid NOT NULL REFERENCES public.cvss_environmental_adjustment ON DELETE CASCADE,
    project_folder_settings_id       uuid NOT NULL REFERENCES public.project_folder_settings ON DELETE CASCADE,
    UNIQUE (project_folder_settings_id, cvss_environmental_adjustment_id)
);

CREATE INDEX IF NOT EXISTS adjustment_name_idx ON public.cvss_environmental_adjustment (name);
