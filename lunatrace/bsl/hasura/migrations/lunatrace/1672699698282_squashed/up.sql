alter table "public"."instances" rename column "instance_id" to "id";

CREATE TABLE "public"."instance_log" ("id" serial NOT NULL, "instance_id" uuid NOT NULL, "message" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("instance_id") REFERENCES "public"."instances"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."instance_log" IS E'Instance log messages from runtime tracing.';

alter table "public"."instances"
  add constraint "instances_agent_access_token_fkey"
  foreign key ("agent_access_token")
  references "public"."builds"
  ("agent_access_token") on update cascade on delete cascade;

alter table "public"."instances" alter column "id" set default gen_random_uuid();
