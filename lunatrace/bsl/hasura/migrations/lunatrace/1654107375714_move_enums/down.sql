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


