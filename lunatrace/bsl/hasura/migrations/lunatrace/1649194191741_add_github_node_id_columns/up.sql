ALTER TABLE public.organizations
    ADD COLUMN github_node_id TEXT
        NULL UNIQUE;

ALTER TABLE public.github_repositories
    ADD COLUMN github_node_id TEXT
        NULL UNIQUE;

ALTER TABLE public.github_repositories
    ALTER COLUMN github_id DROP NOT NULL;
