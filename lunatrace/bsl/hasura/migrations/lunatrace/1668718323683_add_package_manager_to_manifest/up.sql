ALTER TABLE public.resolved_manifest ADD COLUMN package_manager TEXT NULL;
ALTER TABLE public.resolved_manifest ADD COLUMN lockfile_version INT NULL;

COMMENT ON TABLE public.manifests IS 'DEPRECATED. Use public.resolved_manifest';
