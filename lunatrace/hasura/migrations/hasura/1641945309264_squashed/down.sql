
DROP INDEX IF EXISTS "public"."name_namespaced";

alter table "public"."vulnerabilities" alter column "pkgs" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "pkgs" jsonb
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "description" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "urls" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "severity" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "record_source" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "data_source" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "related_vulnerabilities" text
--  null;

alter table "public"."vulnerabilities" add constraint "vulnerabilities_name_key" unique ("name");
alter table "public"."vulnerabilities" alter column "name" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "name_namespaced" text
--  not null unique;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "namespace" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_metadata" jsonb
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "searched_by_cpes" Text[]
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "searched_by_namespace" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "matcher" text
--  null;

alter table "public"."findings" rename column "artifact_metdata_pom_group_id" to "pom_group_id";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_metadata_manifest_name" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "pom_group_id" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_metadata_pom_artifact_id" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_metadata_virtual_path" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_package_url" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_cpes" Text[]
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_licenses" Text[]
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_language" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_locations" Text[]
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_type" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_version" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."findings" add column "artifact_name" text
--  null;

DROP TABLE "public"."secondary_finding_vulnerability";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."users" add column "email" text
--  not null unique;

DROP TABLE "public"."organization_user";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TABLE "users" (
--   "id" uuid PRIMARY KEY,
--   "name" varchar(200) NOT NULL,
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL
-- );
-- CREATE TABLE "settings" (
--   "id" uuid PRIMARY KEY,
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL,
--   "is_org_settings" boolean
-- );
-- CREATE TABLE "organizations" (
--   "id" uuid PRIMARY KEY,
--   "name" varchar(200) NOT NULL,
--   "createdAt" timestamp DEFAULT current_timestamp NOT NULL,
--   "settings_id" uuid REFERENCES "settings"
-- );
-- CREATE TABLE "projects" (
--   "id" uuid PRIMARY KEY,
--   "name" varchar(500) NOT NULL,
--   "repo" varchar(500),
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL,
--   "settings_id" uuid REFERENCES "settings",
--   "organization_id" uuid REFERENCES "organizations"
-- );
-- CREATE TABLE "sboms" (
--   "id" uuid PRIMARY KEY,
--   "s3_url" text,
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL
-- );
-- CREATE TABLE "vulnerabilities" (
--   "id" uuid PRIMARY KEY,
--   "name" text UNIQUE,
--   "related_vulnerability_id" uuid REFERENCES "vulnerabilities",
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL
-- );
-- CREATE TABLE "scans" (
--   "id" uuid PRIMARY KEY,
--   "project_id" uuid REFERENCES "projects",
--   "sbom_id" uuid REFERENCES "sboms",
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL
-- );
-- CREATE TABLE "findings" (
--   "id" uuid PRIMARY KEY,
--   "vulnerability_id" uuid REFERENCES "vulnerabilities",
--   "created_at" timestamp DEFAULT current_timestamp NOT NULL
-- );
DROP TABLE "findings";
DROP TABLE "scans";
DROP TABLE "vulnerabilities";
DROP TABLE "sboms";
DROP TABLE "projects";
DROP TABLE "organizations";
DROP TABLE "settings";
DROP TABLE "users";
DELETE FROM "public"."pgmigrations" WHERE name='1641672420565_init';
