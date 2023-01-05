
alter table "public"."instance_log" drop constraint "instance_log_affected_analysis_config_id_fkey";

alter table "public"."instance_log" rename column "affected_analysis_config_id" to "affected_id";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."instance_log" add column "affected_id" uuid
--  null;

DROP TABLE "public"."project_analysis_config";

alter table "vulnerability"."affected_analysis_config" drop constraint "affected_analysis_config_affected_id_fkey";

alter table "vulnerability"."affected_analysis_config" rename to "vulnerability_analysis_config";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vulnerability"."vulnerability_analysis_config" add column "affected_id" uuid
--  null;

comment on column "vulnerability"."vulnerability_analysis_config"."vulnerability_id" is E'Analysis configuration for a tracing a vulnerability.';
alter table "vulnerability"."vulnerability_analysis_config" alter column "vulnerability_id" drop not null;
alter table "vulnerability"."vulnerability_analysis_config" add column "vulnerability_id" uuid;

alter table "vulnerability"."vulnerability_analysis_config"
  add constraint "vulnerability_analysis_config_vulnerability_id_fkey"
  foreign key ("vulnerability_id")
  references "vulnerability"."vulnerability"
  ("id") on update cascade on delete cascade;

DROP TABLE "vulnerability"."vulnerability_analysis_config";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."instances" add column "hostname" text
--  null;

DROP TABLE "public"."instance_log";

ALTER TABLE "public"."instances" ALTER COLUMN "id" drop default;
alter table "public"."instances" rename column "id" to "instance_id";

alter table "public"."instances"
  add constraint "instances_agent_access_token_fkey"
  foreign key ("agent_access_token")
  references "public"."builds"
  ("agent_access_token") on update no action on delete cascade;
