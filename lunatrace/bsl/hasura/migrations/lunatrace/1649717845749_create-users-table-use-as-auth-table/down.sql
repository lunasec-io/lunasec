ALTER TABLE public.organization_user
    DROP CONSTRAINT organization_user_user_id_fkey;

UPDATE public.organization_user AS o
SET user_id = (SELECT kratos_id FROM public.users AS u WHERE o.user_id = u.id);

ALTER TABLE public.organization_user
    ADD CONSTRAINT organization_user_user_id_fkey
        FOREIGN KEY (user_id)
            REFERENCES public.identities
                (id) ON UPDATE CASCADE ON DELETE CASCADE;

DROP TABLE public.users;
