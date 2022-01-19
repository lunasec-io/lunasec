
ALTER TABLE "public"."sboms" ALTER COLUMN "id" drop default;


ALTER TABLE "public"."organizations" ALTER COLUMN "id" drop default;

ALTER TABLE "public"."instances" ALTER COLUMN "last_heartbeat" drop default;


alter table "public"."instances" drop constraint "instances_build_id_fkey";

alter table "public"."instances" rename column "instance_id" to "id";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."instances" add column "build_id" uuid
--  not null;
