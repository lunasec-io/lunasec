create type public.license_source as enum ('manual', 'scan_repo', 'scan_binary', 'api_npm');

create type public.package_manager as enum ('npm');

alter table package.release_license
    alter column source type public.license_source using source::text::public.license_source;

alter table package.package
    alter column package_manager type public.package_manager using package_manager::text::public.package_manager;

alter table package.maintainer
    alter column package_manager type public.package_manager using package_manager::text::public.package_manager;

drop type package.license_source;

drop type package.package_manager;

drop index if exists package.release_dependency_release_id_package_name_package_version__idx;
ALTER TABLE package.release_dependency
    ADD CONSTRAINT release_dependency_release_id_package_name_package_version__idx UNIQUE (release_id, package_name, package_version_query);

drop index if exists package.release_package_id_version_idx;
ALTER TABLE package.release
    ADD CONSTRAINT release_package_id_version_idx UNIQUE (package_id, version);

drop index if exists package.package_maintainer_package_id_maintainer_id_idx;
ALTER TABLE package.package_maintainer
    ADD CONSTRAINT package_maintainer_package_id_maintainer_id_idx UNIQUE (package_id, maintainer_id);

drop index if exists package.package_package_manager_custom_registry_name_idx;
ALTER TABLE package.package
    ADD CONSTRAINT package_package_manager_custom_registry_name_idx UNIQUE (package_manager, custom_registry, name);

drop index if exists package.maintainer_package_manager_email_idx;
ALTER TABLE package.maintainer
    ADD CONSTRAINT maintainer_package_manager_email_idx UNIQUE (package_manager, email);

drop index if exists package.license_name_idx;
ALTER TABLE package.license
    ADD CONSTRAINT license_name_idx UNIQUE (name);

alter table package.package
    add fetched_time timestamptz;

alter table package.release
    add fetched_time timestamptz;

alter table package.package
    alter column custom_registry set not null;

alter table package.package
    alter column custom_registry set default '';
