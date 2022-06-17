ALTER TABLE public.organizations
    DROP COLUMN installation_id;
ALTER TABLE public.organizations
    DROP COLUMN github_id;

ALTER TABLE public.projects
    DROP CONSTRAINT projects_name_organization_id_key;

ALTER TABLE public.organization_user
    DROP CONSTRAINT organization_user_user_id_organization_id_key;

DROP TABLE public.github_repositories;

-- Reset actions to not cascade, but instead do nothing
ALTER TABLE public.projects
    DROP CONSTRAINT projects_organization_id_fkey,
    ADD CONSTRAINT projects_organization_id_fkey
        FOREIGN KEY (organization_id)
            REFERENCES public.organizations
                (id) ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE public.organization_user
    DROP CONSTRAINT organization_user_organization_id_fkey,
    ADD CONSTRAINT organization_user_organization_id_fkey
        FOREIGN KEY (organization_id)
            REFERENCES public.organizations
                (id) ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE public.organization_user
    DROP CONSTRAINT organization_user_user_id_fkey,
    ADD CONSTRAINT organization_user_user_id_fkey
        FOREIGN KEY (user_id)
            REFERENCES public.identities
                (id) ON UPDATE NO ACTION ON DELETE NO ACTION;
