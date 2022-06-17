CREATE TABLE public.topics
(
    id                      uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    updated_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    topic_unique_id         TEXT                                                      NOT NULL UNIQUE,
    data_source_link        TEXT                                                      NOT NULL UNIQUE,
    body                    TEXT                                                      NOT NULL,
    -- We pull some fields from metadata to the top level as well for easier querying.
    title                   TEXT                                                      NOT NULL,
    summary                 TEXT                                                      NOT NULL,
    tags                    TEXT[]                                                    NOT NULL,

    metadata                jsonb                                                     NOT NULL,
    metadata_schema_version INTEGER                                                   NOT NULL
);


CREATE TABLE public.topic_vulnerabilities
(
    id               uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()                    NOT NULL,
    topic_id         uuid REFERENCES public.topics ON DELETE CASCADE           NOT NULL,
    vulnerability_id uuid REFERENCES public.vulnerabilities ON DELETE CASCADE  NOT NULL,
    CONSTRAINT topic_vulnerabilities_unique UNIQUE (topic_id, vulnerability_id)
);


CREATE TABLE public.topic_related_topics
(
    id                 uuid                     DEFAULT public.gen_random_uuid()         NOT NULL PRIMARY KEY,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()                            NOT NULL,
    updated_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()                            NOT NULL,
    from_topic_id      uuid REFERENCES public.topics ON DELETE CASCADE                   NOT NULL,
    to_topic_unique_id TEXT REFERENCES public.topics (topic_unique_id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT topic_related_topics_unique UNIQUE (from_topic_id, to_topic_unique_id)
);
