CREATE SCHEMA package;

CREATE TYPE package.package_manager AS ENUM (
    'npm'
    );

CREATE TYPE package.license_source AS ENUM (
    'manual',
    'scan_repo',
    'scan_binary',
    'api_npm'
    );

CREATE TABLE package.maintainer
(
    id              UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    package_manager package.package_manager,
    email           TEXT NOT NULL,
    name            TEXT
);

CREATE TABLE package.package_maintainer
(
    package_id    UUID,
    maintainer_id UUID
);

CREATE TABLE package.package
(
    id              UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    package_manager package.package_manager NOT NULL,
    custom_registry TEXT,
    name            TEXT                    NOT NULL,
    description     TEXT
);

CREATE TABLE package.release
(
    id                       UUID PRIMARY KEY     DEFAULT public.gen_random_uuid(),
    package_id               UUID,
    publishing_maintainer_id UUID,
    version                  TEXT        NOT NULL,
    upstream_data            jsonb,
    release_time             timestamptz,
    observed_time            timestamptz NOT NULL DEFAULT (NOW()),
    blob_hash                TEXT,
    upstream_blob_url        TEXT,
    mirrored_blob_url        TEXT
);

CREATE TABLE package.release_dependency
(
    id                    UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    release_id            UUID NOT NULL,
    dependency_package_id UUID,
    dependency_release_id UUID,
    package_name          TEXT NOT NULL,
    package_version_query TEXT NOT NULL
);

CREATE TABLE package.release_license
(
    id            UUID PRIMARY KEY                DEFAULT public.gen_random_uuid(),
    source        package.license_source NOT NULL,
    release_id    UUID                   NOT NULL,
    scan_time     timestamptz            NOT NULL DEFAULT (NOW()),
    license_id    UUID                   NOT NULL,
    scan_metadata jsonb
);

CREATE TABLE package.license
(
    id   UUID PRIMARY KEY DEFAULT public.gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE UNIQUE INDEX ON package.maintainer (package_manager, email);

CREATE UNIQUE INDEX ON package.package_maintainer (package_id, maintainer_id);

CREATE UNIQUE INDEX ON package.package (package_manager, custom_registry, name);

CREATE UNIQUE INDEX ON package.release (package_id, version);

CREATE UNIQUE INDEX ON package.release_dependency (release_id, package_name, package_version_query);

CREATE UNIQUE INDEX ON package.license (name);

ALTER TABLE package.package_maintainer
    ADD FOREIGN KEY (package_id) REFERENCES package.package (id);

ALTER TABLE package.package_maintainer
    ADD FOREIGN KEY (maintainer_id) REFERENCES package.maintainer (id);

ALTER TABLE package.release
    ADD FOREIGN KEY (package_id) REFERENCES package.package (id);

ALTER TABLE package.release
    ADD FOREIGN KEY (publishing_maintainer_id) REFERENCES package.maintainer (id);

ALTER TABLE package.release_dependency
    ADD FOREIGN KEY (release_id) REFERENCES package.release (id);

ALTER TABLE package.release_dependency
    ADD FOREIGN KEY (dependency_package_id) REFERENCES package.package (id);

ALTER TABLE package.release_dependency
    ADD FOREIGN KEY (dependency_release_id) REFERENCES package.release (id);

ALTER TABLE package.release_license
    ADD FOREIGN KEY (release_id) REFERENCES package.release (id);

ALTER TABLE package.release_license
    ADD FOREIGN KEY (license_id) REFERENCES package.license (id);
