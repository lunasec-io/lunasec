-- This simply adds a new column to store the EPSS score alongside the CVE data.
-- This value will always be between 0.0 and 1.0
ALTER TABLE vulnerability.vulnerability
ADD COLUMN epss_score REAL
CHECK (epss_score >= 0.0 AND epss_score <= 1.0);

CREATE INDEX IF NOT EXISTS vulnerability_epss_score_idx ON vulnerability.vulnerability (epss_score);

-- The EPSS percentile is useful for measuring "relative" to other vulnerabilities, how bad is a given CVE?
ALTER TABLE vulnerability.vulnerability
ADD COLUMN epss_percentile REAL
CHECK (epss_percentile >= 0.0 AND epss_percentile <= 1.0);

CREATE INDEX IF NOT EXISTS vulnerability_epss_percentile_idx ON vulnerability.vulnerability (epss_percentile);

-- Add some other indexes on the vulnerability table that were missing.
CREATE INDEX IF NOT EXISTS vulnerability_cvss_score_idx ON vulnerability.vulnerability (cvss_score);

CREATE INDEX IF NOT EXISTS analysis_manifest_dependency_edge_id_to_finding_source_version_idx
ON analysis.manifest_dependency_edge_result (manifest_dependency_edge_id, finding_source_version);

CREATE INDEX IF NOT EXISTS analysis_manifest_dependency_edge_id_idx
ON analysis.manifest_dependency_edge_result (manifest_dependency_edge_id);

CREATE INDEX IF NOT EXISTS analysis_manifest_dependency_edge_result_finding_source_version_idx
ON analysis.manifest_dependency_edge_result (finding_source_version);

DROP INDEX manifest_dependency_edge_parent_id_idx;
CREATE INDEX manifest_dependency_edge_parent_id_idx
ON manifest_dependency_edge (parent_id) INCLUDE (child_id, id);

CREATE INDEX IF NOT EXISTS manifest_dependency_edge_child_id_idx
ON manifest_dependency_edge (child_id) INCLUDE (parent_id, id);
