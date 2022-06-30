CREATE INDEX IF NOT EXISTS build_created_at_idx ON public.builds (project_id, build_number);


-- This view is used when we want to rescan the recent builds when the vulnerability database is updated
-- It uses a LATERAL JOIN to limit to the ten latest builds per project, and makes sure to include the latest build
-- on the default branch using a UNION.
-- https://stackoverflow.com/a/71601781/650775

CREATE VIEW public.latest_builds AS
SELECT latest_builds.*
FROM (SELECT DISTINCT project_id
      FROM public.builds) project_groups
         JOIN LATERAL (
    SELECT *
    FROM public.builds builds_inner
    WHERE builds_inner.project_id = project_groups.project_id
    ORDER BY builds_inner.build_number DESC
    LIMIT 10
    ) latest_builds ON true
UNION
SELECT *
FROM public.latest_default_builds
ORDER BY project_id, build_number;
