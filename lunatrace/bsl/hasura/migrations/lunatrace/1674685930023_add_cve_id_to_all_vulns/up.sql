ALTER TABLE vulnerability.vulnerability ADD COLUMN cve_id text NULL DEFAULT NULL;



DROP FUNCTION vulnerability.cisa_known_exploited_vulnerability;

DROP FUNCTION vulnerability.vulnerability_cisa_known_exploited
