alter table "public"."instances"
  add constraint "instances_agent_access_token_fkey"
  foreign key ("agent_access_token")
  references "public"."builds"
  ("agent_access_token") on update no action on delete cascade;
