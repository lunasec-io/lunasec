
alter table "public"."organization_user" drop constraint "organization_user_user_id_fkey";

alter table "public"."organization_user"
  add constraint "organization_user_user_id_fkey"
  foreign key ("user_id")
  references "public"."identities"
  ("id") on update restrict on delete restrict;

DROP table "public"."users";
