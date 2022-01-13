alter table "public"."vulnerabilities" alter column "urls" drop not null;
alter table "public"."vulnerabilities" add column "urls" text;
