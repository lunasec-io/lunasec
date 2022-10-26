alter table "public"."builds"
  add constraint "builds_release_id_fkey"
  foreign key ("release_id")
  references "package"."release"
  ("id") on update restrict on delete restrict;
