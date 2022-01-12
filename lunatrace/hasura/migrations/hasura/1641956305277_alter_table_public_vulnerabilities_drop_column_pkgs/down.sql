alter table "public"."vulnerabilities" alter column "pkgs" drop not null;
alter table "public"."vulnerabilities" add column "pkgs" jsonb;
