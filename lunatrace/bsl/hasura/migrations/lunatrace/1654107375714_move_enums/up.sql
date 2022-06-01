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


