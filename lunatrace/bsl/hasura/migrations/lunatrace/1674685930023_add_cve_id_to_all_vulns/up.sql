ALTER TABLE vulnerability.vulnerability ADD COLUMN cve_id text NULL DEFAULT NULL;



DROP FUNCTION IF EXISTS vulnerability.cisa_known_exploited_vulnerability;

DROP FUNCTION IF EXISTS vulnerability.vulnerability_cisa_known_exploited
