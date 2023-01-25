ALTER TABLE vulnerability.vulnerability ADD COLUMN cve_id text NULL;

CREATE INDEX IF NOT EXISTS cisa_cve ON vulnerability.cisa_known_exploited (cve);
