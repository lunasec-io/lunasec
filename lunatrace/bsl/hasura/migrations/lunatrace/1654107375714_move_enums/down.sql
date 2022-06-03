CREATE TYPE package.license_source AS ENUM ('manual', 'scan_repo', 'scan_binary', 'api_npm');

CREATE TYPE package.package_manager AS ENUM ('npm');

ALTER TABLE package.release_license
    ALTER COLUMN source TYPE package.license_source USING source::TEXT::package.license_source;

ALTER TABLE package.package
    ALTER COLUMN package_manager TYPE package.package_manager USING package_manager::TEXT::package.package_manager;

ALTER TABLE package.maintainer
    ALTER COLUMN package_manager TYPE package.package_manager USING package_manager::TEXT::package.package_manager;

DROP TYPE public.license_source;

DROP TYPE public.package_manager;

CREATE UNIQUE INDEX ON package.maintainer (package_manager, email);
ALTER TABLE package.maintainer
    DROP CONSTRAINT maintainer_package_manager_email_idx;

CREATE UNIQUE INDEX ON package.package_maintainer (package_id, maintainer_id);
ALTER TABLE package.package_maintainer
    DROP CONSTRAINT package_maintainer_package_id_maintainer_id_idx;

CREATE UNIQUE INDEX ON package.package (package_manager, custom_registry, name);
ALTER TABLE package.package
    DROP CONSTRAINT package_package_manager_custom_registry_name_idx;

CREATE UNIQUE INDEX ON package.release (package_id, version);
ALTER TABLE package.release
    DROP CONSTRAINT release_package_id_version_idx;

CREATE UNIQUE INDEX ON package.release_dependency (release_id, package_name, package_version_query);
ALTER TABLE package.release_dependency
    DROP CONSTRAINT release_dependency_release_id_package_name_package_version__idx;

CREATE UNIQUE INDEX ON package.license (name);
ALTER TABLE package.license
    DROP CONSTRAINT license_name_idx;

ALTER TABLE package.package
    DROP COLUMN fetched_time;

ALTER TABLE package.release
    DROP COLUMN fetched_time;

ALTER TABLE package.package
    ALTER COLUMN custom_registry DROP NOT NULL;

ALTER TABLE package.package
    ALTER COLUMN custom_registry DROP DEFAULT;
