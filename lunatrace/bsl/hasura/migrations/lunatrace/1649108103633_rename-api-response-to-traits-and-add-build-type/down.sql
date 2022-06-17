DROP TRIGGER IF EXISTS api_response_update ON public.github_repositories;

DROP FUNCTION IF EXISTS insert_api_response();

ALTER TABLE public.github_repositories
    DROP COLUMN traits;
ALTER TABLE public.github_repositories
    ALTER COLUMN api_response SET NOT NULL;


ALTER TABLE public.builds
    DROP COLUMN source_type;
DROP TYPE public.builds_source_type;
