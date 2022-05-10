ALTER TABLE public.users DROP CONSTRAINT users_kratos_id_unique;

ALTER TABLE public.organizations DROP CONSTRAINT organizations_creator_id_fkey;
UPDATE public.organizations SET creator_id = NULL;

ALTER TABLE public.organizations
    ADD CONSTRAINT organizations_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.identities(id) ON DELETE SET NULL;

