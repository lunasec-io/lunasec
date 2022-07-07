CREATE TABLE vulnerability.range
(
    id UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    introduced text NULL,
    fixed text NULL,
    affected_id UUID NOT NULL REFERENCES vulnerability.affected ON DELETE CASCADE
);

-- The idea with these constraints is that when an introduced vulnerability is later fixed, this will cause the previous range to be overwritten
ALTER TABLE vulnerability.range ADD CONSTRAINT range_uniq_introduced UNIQUE (affected_id, introduced);
-- This one is just best effort in case someone moves the introduced version around and we already have a fixed version, so we can keep track
ALTER TABLE vulnerability.range ADD CONSTRAINT range_uniq_fixed UNIQUE (affected_id, fixed);


CREATE INDEX range_affected_idx ON vulnerability.range (affected_id);

ALTER TABLE vulnerability.vulnerability ADD COLUMN reviewed_by_source boolean DEFAULT FALSE NOT NULL;
ALTER TABLE vulnerability.vulnerability ALTER COLUMN reviewed_by_source DROP DEFAULT;

ALTER TABLE vulnerability.vulnerability ADD COLUMN reviewed_by_lunasec boolean DEFAULT FALSE NOT NULL;


