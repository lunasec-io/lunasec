CREATE UNIQUE INDEX "name_namespaced_index" on
  "public"."vulnerabilities" using btree ("name_namespaced");
