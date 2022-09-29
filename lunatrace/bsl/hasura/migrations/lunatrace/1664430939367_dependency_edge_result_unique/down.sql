ALTER TABLE "analysis"."manifest_dependency_edge_result" DROP CONSTRAINT "manifest_dependency_edge_result_manifest_dependency_edge_id_vulnerability_id_key";

ALTER TABLE "analysis"."manifest_dependency_edge_result" ALTER COLUMN "created_at" drop default;
