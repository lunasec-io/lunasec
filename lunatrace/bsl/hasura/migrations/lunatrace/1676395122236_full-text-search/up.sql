CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- -- function used for combining multiple text fields together into the full text search index
-- This function is immutable, and that means it can be used for the index, where as naked concat_ws cannot
CREATE OR REPLACE FUNCTION f_concat_ws(VARIADIC text[])
    RETURNS text
    LANGUAGE sql
    IMMUTABLE PARALLEL SAFE AS
'SELECT array_to_string($1, '' '')';





-- SELECT *
-- FROM vulnerability.vulnerability
-- WHERE 'GHSA-f3fp-gc8g-vw66' <% f_concat_ws(source_id, cve_id, summary, details)
-- ORDER BY SIMILARITY(f_concat_ws(source_id, cve_id, summary, details), 'GHSA-f3fp-gc8g-vw66' )
-- DESC;

--     If the search field is blank, we need to skip the text search and just return all

CREATE OR REPLACE FUNCTION search_vulnerabilities(search text)
    returns setof vulnerability.vulnerability AS $$
BEGIN
    IF search = '' THEN
        RETURN QUERY SELECT *
            FROM vulnerability.vulnerability;
    ELSE
        RETURN QUERY SELECT *
                FROM vulnerability.vulnerability
                WHERE search <% f_concat_ws(source_id, cve_id, summary, details)
                ORDER BY SIMILARITY(f_concat_ws(source_id, cve_id, summary, details), search)
                        DESC;
    END IF;
END
--
-- SELECT *
-- FROM vulnerability.vulnerability
-- WHERE search <% f_concat_ws(source_id, cve_id, summary, details)
-- ORDER BY SIMILARITY(f_concat_ws(source_id, cve_id, summary, details), search)
--         DESC;

$$ LANGUAGE plpgsql STABLE;


CREATE INDEX vulnerability_fts_idx ON vulnerability.vulnerability USING GIN (
    -- use this exact same f_concat_ws expression in queries in order to use this index. Lightening fast if you use it right
                                                                             f_concat_ws(source_id, cve_id, summary, details)
                                                                             gin_trgm_ops
    );

