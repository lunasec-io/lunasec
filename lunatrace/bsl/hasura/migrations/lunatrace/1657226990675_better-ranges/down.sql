
ALTER TABLE vulnerability.vulnerability DROP COLUMN reviewed_by_source;
ALTER TABLE vulnerability.vulnerability DROP COLUMN reviewed_by_lunasec;



ALTER TABLE vulnerability.range DROP CONSTRAINT range_uniq_introduced ;
ALTER TABLE vulnerability.range ADD CONSTRAINT range_uniq_fixed;


DROP INDEX range_affected_idx;


DROP TABLE vulnerability.range;


