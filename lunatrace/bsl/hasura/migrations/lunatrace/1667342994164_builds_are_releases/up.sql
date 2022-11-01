COMMENT ON TABLE manifest_dependency IS 'DEPRECATED:
direct dependencies are now regular items in the merkel tree

direct dependencies of builds with pointers to their location in the merkel tree table';

ALTER TABLE resolved_manifest
    ADD manifest_dependency_node_id uuid;

COMMENT ON COLUMN resolved_manifest.manifest_dependency_node_id IS 'Node ID for the dependency in the merkel tree that represents this manifest. This node should not have any parents. Nullable because existing builds use different format.';

ALTER TABLE resolved_manifest
    ADD CONSTRAINT resolved_manifest_manifest_dependency_node_null_fk
        FOREIGN KEY (manifest_dependency_node_id) REFERENCES manifest_dependency_node (id);

ALTER TABLE package.package
    ADD internal bool DEFAULT FALSE NOT NULL;

COMMENT ON COLUMN package.package.internal IS 'if true, package was created implicitly from analyzing first party code';

