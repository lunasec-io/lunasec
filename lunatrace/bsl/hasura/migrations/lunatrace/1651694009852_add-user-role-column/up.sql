CREATE TYPE public.user_role AS ENUM ('organization_user', 'lunatrace_admin');
ALTER TABLE public.users ADD COLUMN role [] NOT NULL DEFAULT '{organization_user}';
