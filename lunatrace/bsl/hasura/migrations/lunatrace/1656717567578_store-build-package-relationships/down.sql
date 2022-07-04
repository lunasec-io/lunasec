DROP TABLE "build_dependency" CASCADE;
DROP TABLE "build_dependency_relationship" CASCADE;

ALTER TABLE package.package DROP COLUMN synced;
