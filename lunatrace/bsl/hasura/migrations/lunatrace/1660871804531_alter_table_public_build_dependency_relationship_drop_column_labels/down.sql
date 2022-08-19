alter table "public"."build_dependency_relationship" alter column "labels" drop not null;
alter table "public"."build_dependency_relationship" add column "labels" jsonb;
