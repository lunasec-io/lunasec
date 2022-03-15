
alter table "public"."organizations" add column "installation_id" integer not null;

alter table "public"."projects" alter column "organization_id" set not null;

alter table "public"."projects" add column "github_id" integer not null;
alter table "public"."projects" drop column "github_id" cascade;

CREATE TABLE "public"."github_repository" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "github_id" integer NOT NULL, "git_url" text NOT NULL, "api_response" jsonb NOT NULL, "project_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."github_repository" IS E'Metadata about a github repository and where to find it.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."github_repository" rename to "github_repositories";

alter table "public"."organizations" add column "github_id" text
 not null;

alter table "public"."organizations" drop column "github_id" cascade;

alter table "public"."organizations" add column "github_id" integer
 not null;

alter table "public"."projects" drop constraint "projects_organization_id_fkey",
  add constraint "projects_organization_id_fkey"
  foreign key ("organization_id")
  references "public"."organizations"
  ("id") on update cascade on delete cascade;

alter table "public"."organization_user" add constraint "organization_user_user_id_organization_id_key" unique ("user_id", "organization_id");

alter table "public"."organization_user" drop constraint "organization_user_organization_id_fkey",
  add constraint "organization_user_organization_id_fkey"
  foreign key ("organization_id")
  references "public"."organizations"
  ("id") on update cascade on delete cascade;

alter table "public"."organization_user" drop constraint "organization_user_user_id_fkey",
  add constraint "organization_user_user_id_fkey"
  foreign key ("user_id")
  references "public"."identities"
  ("id") on update cascade on delete cascade;
