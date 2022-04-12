
ALTER TABLE public.github_repositories ADD COLUMN "traits" jsonb NULL;
UPDATE public.github_repositories SET traits = api_response WHERE traits IS NULL;
ALTER TABLE public.github_repositories ALTER COLUMN traits SET NOT NULL;
ALTER TABLE public.github_repositories ALTER COLUMN api_response DROP NOT NULL;
-- Handle writes to the old column
CREATE OR REPLACE FUNCTION public.insert_api_response() RETURNS TRIGGER AS $BODY$
BEGIN
    NEW.traits = NEW.api_response;
    RETURN NEW;
END
$BODY$ LANGUAGE PLPGSQL;

CREATE TRIGGER api_response_update
    BEFORE INSERT OR UPDATE ON public.github_repositories
    FOR EACH ROW
    WHEN (NEW.api_response IS NOT NULL)
    EXECUTE PROCEDURE public.insert_api_response();


CREATE TYPE public.builds_source_type AS ENUM ('pr','gui','cli');


ALTER TABLE public.builds ADD COLUMN source_type public.builds_source_type NOT NULL DEFAULT 'cli';
ALTER TABLE public.builds ALTER COLUMN source_type DROP DEFAULT;
