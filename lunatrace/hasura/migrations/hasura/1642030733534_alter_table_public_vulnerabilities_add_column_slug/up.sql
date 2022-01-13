alter table "public"."vulnerabilities" add column "slug" text
 not null unique;
