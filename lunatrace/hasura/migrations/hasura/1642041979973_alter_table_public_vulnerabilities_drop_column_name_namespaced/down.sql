alter table "public"."vulnerabilities" add constraint "vulnerabilities_name_namespaced_key" unique (name_namespaced);
alter table "public"."vulnerabilities"
  add constraint "vulnerability_packages_vulnerability_name_namespaced_fkey"
  foreign key (vulnerability_name_namespaced)
  references "public"."vulnerabilities"
  (name_namespaced) on update restrict on delete cascade;
alter table "public"."vulnerabilities" alter column "name_namespaced" drop not null;
alter table "public"."vulnerabilities" add column "name_namespaced" text;
