CREATE INDEX ON "package"."release_license" ("release_id");

alter table package.release_dependency
    add is_dev bool default false not null;
