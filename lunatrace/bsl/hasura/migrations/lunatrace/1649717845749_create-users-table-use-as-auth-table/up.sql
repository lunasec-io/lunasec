CREATE TABLE public.users (
    "id" uuid NOT NULL DEFAULT public.gen_random_uuid(),
    "github_id" text UNIQUE,
    "github_node_id" text UNIQUE,
    "kratos_id" uuid,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("kratos_id")
       REFERENCES public.identities("id")
       ON UPDATE cascade
       ON DELETE cascade
);
COMMENT ON TABLE public.users IS E'LunaTrace users, identified by their various auth identifiers (ex. github, kratos, etc.)';

ALTER TABLE public.organization_user DROP CONSTRAINT organization_user_user_id_fkey;

INSERT INTO public.users (kratos_id) SELECT id FROM public.identities;
UPDATE public.organization_user as o SET user_id = (SELECT id FROM public.users as u WHERE o.user_id = u.kratos_id);

ALTER TABLE public.organization_user ADD CONSTRAINT organization_user_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.users
  (id) ON UPDATE cascade ON DELETE cascade;
