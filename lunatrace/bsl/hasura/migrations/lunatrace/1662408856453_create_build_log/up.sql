CREATE TABLE public.build_log
(
    id         uuid PRIMARY KEY         DEFAULT (gen_random_uuid()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    build_id   uuid                                   NOT NULL REFERENCES builds (id),
    message    TEXT
);
