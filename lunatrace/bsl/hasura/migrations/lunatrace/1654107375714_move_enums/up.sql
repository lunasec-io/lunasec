CREATE TYPE public.license_source AS ENUM ('manual', 'scan_repo', 'scan_binary', 'api_npm');

CREATE TYPE public.package_manager AS ENUM ('npm');

ALTER TABLE package.release_license
    ALTER COLUMN source TYPE public.license_source USING source::TEXT::public.license_source;

ALTER TABLE package.package
    ALTER COLUMN package_manager TYPE public.package_manager USING package_manager::TEXT::public.package_manager;

ALTER TABLE package.maintainer
    ALTER COLUMN package_manager TYPE public.package_manager USING package_manager::TEXT::public.package_manager;

DROP TYPE package.license_source;

DROP TYPE package.package_manager;

DROP INDEX IF EXISTS package.release_dependency_release_id_package_name_package_version__idx;
ALTER TABLE package.release_dependency
    ADD CONSTRAINT release_dependency_release_id_package_name_package_version__idx UNIQUE (release_id, package_name, package_version_query);

DROP INDEX IF EXISTS package.release_package_id_version_idx;
ALTER TABLE package.release
    ADD CONSTRAINT release_package_id_version_idx UNIQUE (package_id, version);

DROP INDEX IF EXISTS package.package_maintainer_package_id_maintainer_id_idx;
ALTER TABLE package.package_maintainer
    ADD CONSTRAINT package_maintainer_package_id_maintainer_id_idx UNIQUE (package_id, maintainer_id);

DROP INDEX IF EXISTS package.package_package_manager_custom_registry_name_idx;
ALTER TABLE package.package
    ADD CONSTRAINT package_package_manager_custom_registry_name_idx UNIQUE (package_manager, custom_registry, name);

DROP INDEX IF EXISTS package.maintainer_package_manager_email_idx;
ALTER TABLE package.maintainer
    ADD CONSTRAINT maintainer_package_manager_email_idx UNIQUE (package_manager, email);

DROP INDEX IF EXISTS package.license_name_idx;
ALTER TABLE package.license
    ADD CONSTRAINT license_name_idx UNIQUE (name);

ALTER TABLE package.package
    ADD fetched_time timestamptz;

ALTER TABLE package.release
    ADD fetched_time timestamptz;

ALTER TABLE package.package
    ALTER COLUMN custom_registry SET NOT NULL;

ALTER TABLE package.package
    ALTER COLUMN custom_registry SET DEFAULT '';
