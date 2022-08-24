CREATE TABLE "manifest" (
                            "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
                            "build_id" uuid NOT NULL,
                            "path" text
);

CREATE TABLE "manifest_dependency" (
                                       "manifest_id" uuid NOT NULL,
                                       "labels" jsonb,
                                       "manifest_dependency_node_id" uuid NOT NULL
);

CREATE TABLE "manifest_dependency_node" (
                                            "id" uuid PRIMARY KEY NOT NULL,
                                            "range" text NOT NULL,
                                            "release_id" uuid NOT NULL
);

CREATE TABLE "manifest_dependency_edge" (
                                            "parent_id" uuid NOT NULL,
                                            "child_id" uuid NOT NULL
);

CREATE UNIQUE INDEX ON "manifest" ("build_id", "path");

CREATE UNIQUE INDEX ON "manifest_dependency" ("manifest_id", "manifest_dependency_node_id");

CREATE UNIQUE INDEX ON "manifest_dependency_edge" ("parent_id", "child_id");

CREATE INDEX ON "manifest_dependency_edge" ("parent_id");

COMMENT ON TABLE "manifest_dependency" IS 'direct dependencies of builds with pointers to their location in the merkel tree table';

COMMENT ON TABLE "build_dependency_relationship" IS 'DEPRECATED: old dependency tree';

COMMENT ON COLUMN "manifest"."path" IS 'path in repo of manifest file. empty string if the ecosystem does not have a manifest file.';

COMMENT ON COLUMN "manifest_dependency"."manifest_dependency_node_id" IS 'entrypoint to dep tree';

COMMENT ON COLUMN "manifest_dependency_node"."id" IS 'merkle tree hash of dependency relationship and its transitive dependencies. not a random UUID.';

ALTER TABLE "manifest" ADD FOREIGN KEY ("build_id") REFERENCES "builds" ("id");

ALTER TABLE "manifest_dependency" ADD FOREIGN KEY ("manifest_id") REFERENCES "manifest" ("id");

ALTER TABLE "manifest_dependency" ADD FOREIGN KEY ("manifest_dependency_node_id") REFERENCES "manifest_dependency_node" ("id");

ALTER TABLE "manifest_dependency_node" ADD FOREIGN KEY ("release_id") REFERENCES "package"."release" ("id");

ALTER TABLE "manifest_dependency_edge" ADD FOREIGN KEY ("parent_id") REFERENCES "manifest_dependency_node" ("id");

ALTER TABLE "manifest_dependency_edge" ADD FOREIGN KEY ("child_id") REFERENCES "manifest_dependency_node" ("id");
