
alter table "public"."organization_user" drop constraint "organization_user_user_id_fkey",
  add constraint "organization_user_user_id_fkey"
  foreign key ("user_id")
  references "public"."identities"
  ("id") on update no action on delete no action;

alter table "public"."organization_user" drop constraint "organization_user_organization_id_fkey",
  add constraint "organization_user_organization_id_fkey"
  foreign key ("organization_id")
  references "public"."organizations"
  ("id") on update no action on delete no action;

alter table "public"."organization_user" drop constraint "organization_user_user_id_organization_id_key";

alter table "public"."projects" drop constraint "projects_organization_id_fkey",
  add constraint "projects_organization_id_fkey"
  foreign key ("organization_id")
  references "public"."organizations"
  ("id") on update no action on delete no action;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."organizations" add column "github_id" integer
--  not null;

alter table "public"."organizations" alter column "github_id" drop not null;
alter table "public"."organizations" add column "github_id" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."organizations" add column "github_id" text
--  not null;

alter table "public"."github_repositories" rename to "github_repository";

DROP TABLE "public"."github_repository";

alter table "public"."projects" alter column "github_id" drop not null;
alter table "public"."projects" add column "github_id" int4;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."projects" add column "github_id" integer
--  not null;

alter table "public"."projects" alter column "organization_id" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."organizations" add column "installation_id" integer
--  not null;
