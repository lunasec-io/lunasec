COMMENT ON TABLE vulnerability.severity IS NULL;

COMMENT ON TABLE vulnerability.vulnerability IS NULL;

ALTER TABLE vulnerability.vulnerability
    DROP COLUMN severity
