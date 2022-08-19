alter table "public"."build_dependency"
  add constraint "build_dependency_build_dependency_relationship_id_fkey"
  foreign key ("build_dependency_relationship_id")
  references "public"."build_dependency_relationship"
  ("id") on update restrict on delete restrict;
