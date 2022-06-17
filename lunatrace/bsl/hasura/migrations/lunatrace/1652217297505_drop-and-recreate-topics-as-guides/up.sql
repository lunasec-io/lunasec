DROP TABLE public.topic_vulnerabilities;
DROP TABLE public.topic_related_topics;
DROP TABLE public.topics;



CREATE TABLE public.guides
(
    id                      uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    updated_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    guide_unique_id         TEXT                                                      NOT NULL UNIQUE,
    data_source_link        TEXT                                                      NOT NULL UNIQUE,
    body                    TEXT                                                      NOT NULL,
    severity                public.severity_enum                                      NOT NULL,
    -- We pull some fields from metadata to the top level as well for easier querying.
    title                   TEXT                                                      NOT NULL,
    summary                 TEXT                                                      NOT NULL,
    tags                    TEXT[]                                                    NOT NULL,
    metadata                jsonb                                                     NOT NULL,
    metadata_schema_version INTEGER                                                   NOT NULL
);


CREATE TABLE public.guide_vulnerabilities
(
    id               uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    guide_id         uuid REFERENCES public.guides ON DELETE CASCADE           NOT NULL,
    vulnerability_id uuid REFERENCES public.vulnerabilities ON DELETE CASCADE  NOT NULL,
    CONSTRAINT guide_vulnerabilities_unique UNIQUE (guide_id, vulnerability_id)
);


CREATE TABLE public.guide_related_guides
(
    id                 uuid                     DEFAULT public.gen_random_uuid()         NOT NULL PRIMARY KEY,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()                            NOT NULL,
    updated_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()                            NOT NULL,
    from_guide_id      uuid REFERENCES public.guides ON DELETE CASCADE                   NOT NULL,
    to_guide_unique_id TEXT REFERENCES public.guides (guide_unique_id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT guide_related_guides_unique UNIQUE (from_guide_id, to_guide_unique_id)
);
