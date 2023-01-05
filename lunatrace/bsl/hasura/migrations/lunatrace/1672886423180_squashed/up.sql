
alter table "public"."instances" rename column "instance_id" to "id";

CREATE TABLE "public"."instance_log" ("id" serial NOT NULL, "instance_id" uuid NOT NULL, "message" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("instance_id") REFERENCES "public"."instances"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."instance_log" IS E'Instance log messages from runtime tracing.';

alter table "public"."instances"
  add constraint "instances_agent_access_token_fkey"
  foreign key ("agent_access_token")
  references "public"."builds"
  ("agent_access_token") on update cascade on delete cascade;

alter table "public"."instances" alter column "id" set default gen_random_uuid();

alter table "public"."instances" add column "hostname" text
 null;

CREATE TABLE "vulnerability"."vulnerability_analysis_config" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "config" jsonb NOT NULL, "vulnerability_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("vulnerability_id") REFERENCES "vulnerability"."vulnerability"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "vulnerability"."vulnerability_analysis_config" IS E'Analysis configuration for a tracing a vulnerability.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "vulnerability"."vulnerability_analysis_config" drop constraint "vulnerability_analysis_config_vulnerability_id_fkey";

alter table "vulnerability"."vulnerability_analysis_config" drop column "vulnerability_id" cascade;

alter table "vulnerability"."vulnerability_analysis_config" add column "affected_id" uuid
 null;

alter table "vulnerability"."vulnerability_analysis_config" rename to "affected_analysis_config";

alter table "vulnerability"."affected_analysis_config"
  add constraint "affected_analysis_config_affected_id_fkey"
  foreign key ("affected_id")
  references "vulnerability"."affected"
  ("id") on update cascade on delete cascade;

CREATE TABLE "public"."project_analysis_config" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "config" jsonb NOT NULL, "project_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."project_analysis_config" IS E'Analysis configuration for a project.';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."instance_log" add column "affected_id" uuid
 null;

alter table "public"."instance_log" rename column "affected_id" to "affected_analysis_config_id";

alter table "public"."instance_log"
  add constraint "instance_log_affected_analysis_config_id_fkey"
  foreign key ("affected_analysis_config_id")
  references "vulnerability"."affected_analysis_config"
  ("id") on update cascade on delete cascade;
