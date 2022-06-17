ALTER TABLE public.users
    ADD CONSTRAINT users_kratos_id_unique UNIQUE (kratos_id);

ALTER TABLE public.organizations
    DROP CONSTRAINT organizations_creator_id_fkey;
UPDATE public.organizations
SET creator_id = NULL;

ALTER TABLE public.organizations
    ADD CONSTRAINT organizations_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users (id) ON DELETE SET NULL;
