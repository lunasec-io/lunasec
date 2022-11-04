ALTER TABLE public.build_log
    DROP CONSTRAINT build_log_build_id_fkey;

ALTER TABLE public.build_log
    ADD FOREIGN KEY (build_id) REFERENCES builds;
