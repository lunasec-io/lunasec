alter table "public"."package_versions"
  add constraint "package_versions_pkg_slug_fkey"
  foreign key ("pkg_slug")
  references "public"."vulnerability_packages"
  ("slug") on update restrict on delete cascade;
