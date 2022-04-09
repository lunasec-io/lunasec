alter table "public"."project_access_tokens" drop constraint "project_access_tokens_created_by_user_id_fkey",
  add constraint "project_access_tokens_created_by_user_id_fkey"
  foreign key ("created_by_user_id")
  references "public"."identities"
  ("id") on update no action on delete set null;
