ALTER TABLE public.organizations
    DROP COLUMN github_owner_type;
ALTER TABLE public.builds
    DROP COLUMN pull_request_id;
