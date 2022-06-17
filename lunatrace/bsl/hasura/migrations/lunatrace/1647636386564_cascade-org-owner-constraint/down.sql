ALTER TABLE public.organizations
    DROP CONSTRAINT organizations_creator_id_fkey;
ALTER TABLE public.organizations
    ADD CONSTRAINT organizations_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.identities;

ALTER TABLE public.project_access_tokens
    DROP CONSTRAINT project_access_tokens_created_by_user_id_fkey;
ALTER TABLE public.project_access_tokens
    ADD CONSTRAINT project_access_tokens_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.identities;
