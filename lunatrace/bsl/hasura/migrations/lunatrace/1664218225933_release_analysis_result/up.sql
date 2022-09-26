CREATE TYPE "finding_state" AS ENUM (
  'vulnerable',
  'not_vulnerable'
);

CREATE TABLE "package"."release_analysis_result" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "manifest_dependency_edge_id" uuid,
  "vulnerability_id" uuid,
  "state" finding_state,
  "created_at" timestamptz,
  "source" TEXT
);

ALTER TABLE "package"."release_analysis_result" ADD FOREIGN KEY ("manifest_dependency_edge_id") REFERENCES "manifest_dependency_edge" ("id");

ALTER TABLE "package"."release_analysis_result" ADD FOREIGN KEY ("vulnerability_id") REFERENCES "vulnerability"."vulnerability" ("id");
