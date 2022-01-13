CREATE  INDEX "vuln_slug_index" on
  "public"."vulnerability_packages" using btree ("vuln_slug");
