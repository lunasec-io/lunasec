CREATE  INDEX "affected_package_id_idx" on
  "vulnerability"."affected" using btree ("package_id");
