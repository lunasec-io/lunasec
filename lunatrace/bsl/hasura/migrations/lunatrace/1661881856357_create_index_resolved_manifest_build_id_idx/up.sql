CREATE  INDEX "resolved_manifest_build_id_idx" on
  "public"."resolved_manifest" using btree ("build_id");
