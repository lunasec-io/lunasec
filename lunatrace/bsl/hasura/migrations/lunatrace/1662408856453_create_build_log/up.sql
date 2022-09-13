CREATE TABLE public.build_state
(
    value TEXT PRIMARY KEY
);

INSERT INTO public.build_state (value) VALUES
    ('snapshot_queued'),
    ('snapshot_started'),
    ('snapshot_completed'),
    ('snapshot_failed'),
    ('snapshot_scan_queued'),
    ('snapshot_scan_started'),
    ('snapshot_scan_completed'),
    ('snapshot_scan_failed');

CREATE TABLE public.build_log
(
    id         uuid PRIMARY KEY         DEFAULT (gen_random_uuid()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    build_id   uuid                                   NOT NULL REFERENCES builds (id),
    state      TEXT NOT NULL REFERENCES public.build_state,
    message    TEXT
);
