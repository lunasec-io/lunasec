DROP INDEX "package"."release_license_release_id_idx"

alter table package.release_dependency
    drop column is_dev;
