CREATE TABLE public.users
(
    id             uuid NOT NULL DEFAULT public.gen_random_uuid(),
    github_id      TEXT UNIQUE,
    github_node_id TEXT UNIQUE,
    kratos_id      uuid,
    PRIMARY KEY (id),
    FOREIGN KEY (kratos_id)
        REFERENCES public.identities (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
COMMENT ON TABLE public.users IS E'LunaTrace users, identified by their various auth identifiers (ex. github, kratos, etc.)';

ALTER TABLE public.organization_user
    DROP CONSTRAINT organization_user_user_id_fkey;

INSERT INTO public.users (kratos_id)
SELECT id
FROM public.identities;
UPDATE public.organization_user AS o
SET user_id = (SELECT id FROM public.users AS u WHERE o.user_id = u.kratos_id);

ALTER TABLE public.organization_user
    ADD CONSTRAINT organization_user_user_id_fkey
        FOREIGN KEY (user_id)
            REFERENCES public.users
                (id) ON UPDATE CASCADE ON DELETE CASCADE;

UPDATE public.users
SET github_id = (SELECT kratos.github_id
                 FROM (SELECT config -> 'providers' -> 0 ->> 'subject' AS github_id, identity_id
                       FROM public.identity_credentials
                                JOIN public.identities
                                     ON public.identities.id = public.identity_credentials.identity_id) AS kratos
                 WHERE public.users.kratos_id = kratos.identity_id
                   AND kratos.github_id IS NOT NULL);
