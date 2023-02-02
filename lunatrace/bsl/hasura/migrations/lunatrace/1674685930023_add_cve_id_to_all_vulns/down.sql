ALTER TABLE vulnerability.vulnerability DROP COLUMN cve_id;


CREATE OR REPLACE FUNCTION vulnerability.cisa_known_exploited_vulnerability(known_exploited vulnerability.cisa_known_exploited)
    RETURNS SETOF vulnerability.vulnerability AS $$
SELECT *
FROM vulnerability.vulnerability
WHERE source_id = known_exploited.cve
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION vulnerability.vulnerability_cisa_known_exploited(vulnerability vulnerability.vulnerability)
    RETURNS SETOF vulnerability.cisa_known_exploited
    LANGUAGE sql
    STABLE
AS $function$
SELECT *
FROM vulnerability.cisa_known_exploited
WHERE cve = vulnerability.source_id
$function$
