CREATE TABLE public."build_dependency"
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    "root_range"       text                               NULL,
    "build_id"   UUID                                  NOT NULL REFERENCES public.builds (id) ON DELETE CASCADE,
    "version"    text                                  NOT NULL,
    "release_id" UUID REFERENCES "package"."release" ("id") ON DELETE CASCADE,
    "dev" boolean DEFAULT FALSE
);

CREATE TABLE public."build_dependency_relationship"
(
    "from_dependency" UUID REFERENCES "build_dependency" ("id") ON DELETE CASCADE,
    "to_dependency"   UUID REFERENCES "build_dependency" ("id") ON DELETE CASCADE,
    "range"           text
);


CREATE INDEX ON "build_dependency" ("build_id");

CREATE INDEX ON "build_dependency" ("release_id");

ALTER TABLE package.package ADD COLUMN synced boolean DEFAULT false;

