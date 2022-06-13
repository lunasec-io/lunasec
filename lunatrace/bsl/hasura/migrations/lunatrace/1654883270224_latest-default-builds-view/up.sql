CREATE VIEW public.latest_default_builds AS
SELECT DISTINCT ON (project_id) *
FROM public.default_branch_builds
ORDER BY public.default_branch_builds.project_id ASC, build_number DESC;

CREATE INDEX IF NOT EXISTS build_project_id_and_build_number_idx ON public.builds (project_id, build_number);
