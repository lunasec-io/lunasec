DROP INDEX package.release_license_release_id_idx;

ALTER TABLE package.release_dependency
    DROP COLUMN is_dev;
