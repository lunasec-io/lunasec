
CREATE TABLE public."build_dependency_relationship"
(
    "id"                  UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    "build_id"            UUID                                      NOT NULL REFERENCES public.builds (id) ON DELETE CASCADE,
    "release_id"          UUID NOT NULL REFERENCES "package"."release" ("id") ON DELETE CASCADE,
    "labels"              jsonb NOT NULL,
    "depended_by_relationship_id" UUID NULL REFERENCES "public"."build_dependency_relationship" ("id") ON DELETE CASCADE, -- points to another node on this graph.  if this is null its a root dep
    "range"               text  NOT NULL,
    project_path text NOT NULL
);

CREATE INDEX ON "build_dependency_relationship" ("build_id");

CREATE INDEX ON "build_dependency_relationship" ("release_id");
CREATE INDEX ON "build_dependency_relationship" ("depended_by_relationship_id");


-- Keep track of when we last tried to sync a package from npm
-- this is useful in the case of lazily stubbed packages coming in from people's manifests/projects that may NOT be in the public manager or otherwise be fake news
ALTER TABLE package.package
    ADD COLUMN last_failed_fetch timestamptz DEFAULT NULL;
ALTER TABLE package.package
    ADD COLUMN last_successful_fetch timestamptz DEFAULT NULL;
ALTER TABLE package.package DROP COLUMN fetched_time;

CREATE INDEX package_last_fetch ON package.package (last_successful_fetch);

