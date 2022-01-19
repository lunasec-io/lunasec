


alter table "public"."instances" add column "build_id" uuid
 not null;

alter table "public"."instances" rename column "id" to "instance_id";

alter table "public"."instances"
  add constraint "instances_build_id_fkey"
  foreign key ("build_id")
  references "public"."builds"
  ("id") on update cascade on delete cascade;

alter table "public"."instances" alter column "last_heartbeat" set default now();

alter table "public"."organizations" alter column "id" set default gen_random_uuid();

alter table "public"."sboms" alter column "id" set default gen_random_uuid();
