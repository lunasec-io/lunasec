ALTER TABLE "analysis"."manifest_dependency_edge_result" ALTER COLUMN "created_at" SET DEFAULT now();

ALTER TABLE "analysis"."manifest_dependency_edge_result" ADD CONSTRAINT "manifest_dependency_edge_result_manifest_dependency_edge_id_vulnerability_id_key" UNIQUE ("manifest_dependency_edge_id", "vulnerability_id");
