ALTER TABLE "public"."package_versions" ALTER COLUMN "cpes" TYPE text[];
alter table "public"."package_versions" alter column "cpes" set not null;
