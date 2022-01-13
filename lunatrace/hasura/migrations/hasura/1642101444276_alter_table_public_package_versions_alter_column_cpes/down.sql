alter table "public"."package_versions" alter column "cpes" drop not null;
ALTER TABLE "public"."package_versions" ALTER COLUMN "cpes" TYPE ARRAY;
