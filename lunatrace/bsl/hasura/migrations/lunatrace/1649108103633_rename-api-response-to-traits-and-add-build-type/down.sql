ALTER TABLE public.github_repositories RENAME COLUMN "traits" TO "api_response";
ALTER TABLE public.builds DROP COLUMN source_type;
DROP TYPE public.builds_source_type;
