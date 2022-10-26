
ALTER TABLE analysis.manifest_dependency_edge_result ADD COLUMN finding_source_version INT NOT NULL DEFAULT 1;
ALTER TABLE analysis.manifest_dependency_edge_result ADD COLUMN output JSONB NULL;

alter table "analysis"."manifest_dependency_edge_result" drop constraint "manifest_dependency_edge_result_manifest_dependency_edge_id_vul";
alter table "analysis"."manifest_dependency_edge_result" add constraint "manifest_dependency_edge_result_vulnerability_id_manifest_dependency_edge_id_finding_source_finding_source_version_key" unique ("vulnerability_id", "manifest_dependency_edge_id", "finding_source", "finding_source_version");
