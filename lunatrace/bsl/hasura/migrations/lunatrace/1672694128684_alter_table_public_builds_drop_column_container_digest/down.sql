alter table "public"."builds" alter column "container_digest" drop not null;
alter table "public"."builds" add column "container_digest" text;
