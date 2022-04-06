ALTER TABLE public.github_repositories RENAME COLUMN "api_response" TO "traits";


CREATE TYPE public.builds_source_type AS ENUM ('pr','gui','cli');


ALTER TABLE public.builds ADD COLUMN source_type public.builds_source_type NOT NULL DEFAULT 'cli';
ALTER TABLE public.builds ALTER COLUMN source_type DROP DEFAULT;
