alter table "analysis"."manifest_dependency_edge_result" drop constraint "manifest_dependency_edge_result_manifest_dependency_edge_id_vul";
alter table "analysis"."manifest_dependency_edge_result" add constraint "manifest_dependency_edge_result_manifest_dependency_edge_id_vul" unique ("vulnerability_id", "manifest_dependency_edge_id");

ALTER TABLE analysis.manifest_dependency_edge_result DROP COLUMN finding_source_version;
ALTER TABLE analysis.manifest_dependency_edge_result DROP COLUMN output;
