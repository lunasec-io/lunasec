CREATE INDEX ON package.release_license (release_id);

ALTER TABLE package.release_dependency
    ADD is_dev bool DEFAULT FALSE NOT NULL;
