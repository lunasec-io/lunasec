create type package.license_source as enum ('manual', 'scan_repo', 'scan_binary', 'api_npm');

create type package.package_manager as enum ('npm');

alter table package.release_license
    alter column source type package.license_source using source::text::package.license_source;

alter table package.package
    alter column package_manager type package.package_manager using package_manager::text::package.package_manager;

alter table package.maintainer
    alter column package_manager type package.package_manager using package_manager::text::package.package_manager;

drop type public.license_source;

drop type public.package_manager;

CREATE UNIQUE INDEX ON "package"."maintainer" ("package_manager", "email");
ALTER TABLE package.maintainer
    DROP CONSTRAINT maintainer_package_manager_email_idx;

CREATE UNIQUE INDEX ON "package"."package_maintainer" ("package_id", "maintainer_id");
ALTER TABLE package.package_maintainer
    DROP CONSTRAINT package_maintainer_package_id_maintainer_id_idx;

CREATE UNIQUE INDEX ON "package"."package" ("package_manager", "custom_registry", "name");
ALTER TABLE package.package
    DROP CONSTRAINT package_package_manager_custom_registry_name_idx;
drop index package.package_package_manager_expr_name_idx;

CREATE UNIQUE INDEX ON "package"."release" ("package_id", "version");
ALTER TABLE package.release
    DROP CONSTRAINT release_package_id_version_idx;

CREATE UNIQUE INDEX ON "package"."release_dependency" ("release_id", "package_name", "package_version_query");
ALTER TABLE package.release_dependency
    DROP CONSTRAINT release_dependency_release_id_package_name_package_version__idx;

CREATE UNIQUE INDEX ON "package"."license" ("name");
ALTER TABLE package.license
    DROP CONSTRAINT license_name_idx;

alter table package.package
    drop column fetched_time;

alter table package.release
    drop column fetched_time;

