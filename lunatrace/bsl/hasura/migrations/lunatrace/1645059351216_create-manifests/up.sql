CREATE TABLE public.manifests
(
    id         uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    project_id uuid references public.projects (id) NOT NULL,
    s3_url     text                                 NOT NULL UNIQUE,
    filename   text                                 NOT NULL
)
