ALTER TABLE resolved_manifest
    DROP CONSTRAINT manifest_build_id_fkey,
    ADD CONSTRAINT manifest_build_id_fkey
        FOREIGN KEY (build_id)
        REFERENCES builds(id)
        ON DELETE CASCADE;

ALTER TABLE manifest_dependency
    DROP CONSTRAINT manifest_dependency_manifest_id_fkey,
    ADD CONSTRAINT manifest_dependency_manifest_id_fkey
        FOREIGN KEY (manifest_id)
            REFERENCES resolved_manifest(id)
            ON DELETE CASCADE;

