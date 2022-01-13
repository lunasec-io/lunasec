CREATE  INDEX "pkg_slug_index" on
  "public"."package_versions" using btree ("pkg_slug");
