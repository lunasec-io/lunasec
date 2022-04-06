
ALTER TABLE "public"."organizations" DROP COLUMN "github_node_id" text;

ALTER TABLE "public"."github_repositories" DROP COLUMN "github_node_id" text;

ALTER TABLE "public"."github_repositories" ALTER COLUMN "github_id" SET NOT NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."github_repositories" add column "github_node_id" text
--  null unique;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."organizations" add column "github_node_id" text
--  null unique;
