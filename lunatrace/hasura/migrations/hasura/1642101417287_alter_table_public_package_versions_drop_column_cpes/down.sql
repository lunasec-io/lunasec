alter table "public"."package_versions" alter column "cpes" drop not null;
alter table "public"."package_versions" add column "cpes" jsonb;
