alter table "public"."vulnerabilities" alter column "related_vulnerabilities" drop not null;
alter table "public"."vulnerabilities" add column "related_vulnerabilities" text;
