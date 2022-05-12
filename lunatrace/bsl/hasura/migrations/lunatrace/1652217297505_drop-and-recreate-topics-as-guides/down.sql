DROP TABLE public.guide_vulnerabilities;
DROP TABLE public.guide_related_guides;
DROP TABLE public.guides;

CREATE TABLE public.topics
(
    id                      uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at              timestamp with time zone DEFAULT now() NOT NULL,
    updated_at              timestamp with time zone DEFAULT now() NOT NULL,
    topic_unique_id         text    NOT NULL UNIQUE,
    data_source_link        text    NOT NULL UNIQUE,
    body                    text    NOT NULL,
    -- We pull some fields from metadata to the top level as well for easier querying.
    title                   text    NOT NULL,
    summary                 text    NOT NULL,
    tags                    text [] NOT NULL,
    severity                public.severity_enum NOT NULL,
    metadata                jsonb   NOT NULL,
    metadata_schema_version integer NOT NULL
);


CREATE TABLE public.topic_vulnerabilities
(
    id               uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at       timestamp with time zone DEFAULT now() NOT NULL,
    updated_at       timestamp with time zone DEFAULT now() NOT NULL,
    topic_id         uuid references public.topics ON DELETE CASCADE          NOT NULL,
    vulnerability_id uuid references public.vulnerabilities ON DELETE CASCADE NOT NULL,
    CONSTRAINT topic_vulnerabilities_unique UNIQUE (topic_id, vulnerability_id)
);


CREATE TABLE public.topic_related_topics
(
    id                 uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at         timestamp with time zone DEFAULT now() NOT NULL,
    updated_at         timestamp with time zone DEFAULT now() NOT NULL,
    from_topic_id      uuid references public.topics ON DELETE CASCADE                   NOT NULL,
    to_topic_unique_id text references public.topics (topic_unique_id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT topic_related_topics_unique UNIQUE (from_topic_id, to_topic_unique_id)
);
