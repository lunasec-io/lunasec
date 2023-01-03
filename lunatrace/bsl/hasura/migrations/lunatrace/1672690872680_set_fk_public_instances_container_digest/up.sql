alter table "public"."instances"
  add constraint "instances_container_digest_fkey"
  foreign key ("container_digest")
  references "public"."builds"
  ("container_digest") on update cascade on delete cascade;
