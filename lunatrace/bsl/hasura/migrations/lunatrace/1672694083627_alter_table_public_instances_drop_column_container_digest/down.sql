alter table "public"."instances" alter column "container_digest" drop not null;
alter table "public"."instances" add column "container_digest" text;
