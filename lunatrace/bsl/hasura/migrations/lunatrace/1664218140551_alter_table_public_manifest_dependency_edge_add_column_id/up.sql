CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."manifest_dependency_edge" add column "id" uuid
 not null default gen_random_uuid();
