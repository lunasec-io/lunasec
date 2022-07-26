ALTER TABLE vulnerability.vulnerability
    ADD COLUMN severity severity_enum
        NULL;

COMMENT ON TABLE vulnerability.vulnerability IS E'Vulnerabilities in OSV format enriched with LunaSec data.';

COMMENT ON TABLE vulnerability.severity IS E'Severities for a given vulnerability. Supports multiple sources and types.';
