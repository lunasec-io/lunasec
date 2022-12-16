-- Remove the epss_score and epss_percentile columns from the vulnerability.vulnerability table
ALTER TABLE vulnerability.vulnerability
DROP COLUMN epss_score,
DROP COLUMN epss_percentile;

DROP INDEX vulnerability_epss_score_idx;
DROP INDEX vulnerability_epss_percentile_idx;

-- Remove the other new indexes also
DROP INDEX vulnerability_cvss_score_idx;
DROP INDEX analysis.analysis_manifest_dependency_edge_id_to_finding_source_version_idx;
DROP INDEX analysis.analysis_manifest_dependency_edge_id_idx;
DROP INDEX analysis.analysis_manifest_dependency_edge_result_finding_source_version_idx;
DROP INDEX vulnerability_cvss_score_idx;

DROP INDEX manifest_dependency_edge_parent_id_idx;
CREATE INDEX manifest_dependency_edge_parent_id_idx ON manifest_dependency_edge (parent_id);

DROP INDEX manifest_dependency_edge_child_id_idx;
