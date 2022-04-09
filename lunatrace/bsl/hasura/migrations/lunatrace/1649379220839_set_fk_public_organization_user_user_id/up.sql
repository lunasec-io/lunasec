alter table "public"."organization_user" drop constraint "organization_user_user_id_fkey",
  add constraint "organization_user_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete cascade;
