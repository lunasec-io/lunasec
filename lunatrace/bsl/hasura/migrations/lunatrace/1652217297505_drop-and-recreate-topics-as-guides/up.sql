DROP TABLE public.topic_vulnerabilities;
DROP TABLE public.topic_related_topics;
DROP TABLE public.topics;



CREATE TABLE public.guides
(
    id                      uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at              timestamp with time zone DEFAULT now() NOT NULL,
    updated_at              timestamp with time zone DEFAULT now() NOT NULL,
    guide_unique_id         text    NOT NULL UNIQUE,
    data_source_link        text    NOT NULL UNIQUE,
    body                    text    NOT NULL,
    severity                public.severity_enum NOT NULL,
    -- We pull some fields from metadata to the top level as well for easier querying.
    title                   text    NOT NULL,
    summary                 text    NOT NULL,
    tags                    text [] NOT NULL,
    metadata                jsonb   NOT NULL,
    metadata_schema_version integer NOT NULL
);


CREATE TABLE public.guide_vulnerabilities
(
    id               uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at       timestamp with time zone DEFAULT now() NOT NULL,
    updated_at       timestamp with time zone DEFAULT now() NOT NULL,
    guide_id         uuid references public.guides ON DELETE CASCADE          NOT NULL,
    vulnerability_id uuid references public.vulnerabilities ON DELETE CASCADE NOT NULL,
    CONSTRAINT guide_vulnerabilities_unique UNIQUE (guide_id, vulnerability_id)
);


CREATE TABLE public.guide_related_guides
(
    id                 uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at         timestamp with time zone DEFAULT now() NOT NULL,
    updated_at         timestamp with time zone DEFAULT now() NOT NULL,
    from_guide_id      uuid references public.guides ON DELETE CASCADE                   NOT NULL,
    to_guide_unique_id text references public.guides (guide_unique_id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT guide_related_guides_unique UNIQUE (from_guide_id, to_guide_unique_id)
);
