DROP TABLE "build_dependency_relationship" CASCADE;

ALTER TABLE package.package DROP COLUMN last_failed_fetch;
ALTER TABLE package.package DROP COLUMN last_successful_fetch;
ALTER TABLE package.package ADD COLUMN fetched_time timestamptz;
