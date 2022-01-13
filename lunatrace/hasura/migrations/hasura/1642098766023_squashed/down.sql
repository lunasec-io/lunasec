
alter table "public"."vulnerability_packages"
  add constraint "vulnerability_packages_vuln_slug_fkey"
  foreign key ("vuln_slug")
  references "public"."vulnerabilities"
  ("slug") on update no action on delete no action;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_fkey",
  add constraint "vulnerability_packages_vuln_slug_fkey"
  foreign key ("vuln_slug")
  references "public"."vulnerabilities"
  ("slug") on update no action on delete no action;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_fkey",
  add constraint "vulnerability_packages_vuln_slug_fkey"
  foreign key ("vuln_slug")
  references "public"."vulnerabilities"
  ("slug") on update no action on delete no action;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_fkey",
  add constraint "vulnerability_packages_vuln_slug_fkey"
  foreign key ("vuln_slug")
  references "public"."vulnerabilities"
  ("slug") on update restrict on delete cascade;

DROP INDEX IF EXISTS "public"."version_slug";


alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_fkey";

alter table "public"."package_versions" drop constraint "package_versions_pkg_slug_fkey",
  add constraint "package_versions_pkg_slug_fkey"
  foreign key ("pkg_slug")
  references "public"."vulnerability_packages"
  ("slug") on update restrict on delete cascade;

comment on column "public"."vulnerability_packages"."fixed_in_versions" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "fixed_in_versions" drop not null;
alter table "public"."vulnerability_packages" add column "fixed_in_versions" text;

comment on column "public"."vulnerability_packages"."version_format" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "version_format" drop not null;
alter table "public"."vulnerability_packages" add column "version_format" text;

comment on column "public"."vulnerability_packages"."fix_state" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "fix_state" drop not null;
alter table "public"."vulnerability_packages" add column "fix_state" text;

comment on column "public"."vulnerability_packages"."version_constraint" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "version_constraint" drop not null;
alter table "public"."vulnerability_packages" add column "version_constraint" text;

comment on column "public"."vulnerability_packages"."cpes" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "cpes" drop not null;
alter table "public"."vulnerability_packages" add column "cpes" jsonb;

comment on column "public"."vulnerability_packages"."ephemeral_id_dont_use" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "ephemeral_id_dont_use" set default gen_random_uuid();
alter table "public"."vulnerability_packages" alter column "ephemeral_id_dont_use" drop not null;
alter table "public"."vulnerability_packages" add column "ephemeral_id_dont_use" uuid;

comment on column "public"."vulnerability_packages"."pkg_name" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "pkg_name" drop not null;
alter table "public"."vulnerability_packages" add column "pkg_name" text;

comment on column "public"."vulnerability_packages"."vulnerability_name_namespaced" is E'All of the package vulnerabilities belonging to a given vulnerability';
alter table "public"."vulnerability_packages" alter column "vulnerability_name_namespaced" drop not null;
alter table "public"."vulnerability_packages" add column "vulnerability_name_namespaced" text;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_pkey";
alter table "public"."vulnerability_packages"
    add constraint "vulnerability_packages_pkey"
    primary key ("ephemeral_id_dont_use");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "urls" text[]
--  null;

alter table "public"."vulnerabilities" alter column "urls" drop not null;
alter table "public"."vulnerabilities" add column "urls" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerability_packages" add column "name" text
--  null;

alter table "public"."vulnerabilities" add constraint "vulnerabilities_name_namespaced_key" unique (name_namespaced);
alter table "public"."vulnerabilities"
  add constraint "vulnerability_packages_vulnerability_name_namespaced_fkey"
  foreign key (vulnerability_name_namespaced)
  references "public"."vulnerabilities"
  (name_namespaced) on update restrict on delete cascade;
alter table "public"."vulnerabilities" alter column "name_namespaced" drop not null;
alter table "public"."vulnerabilities" add column "name_namespaced" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "topic_id" uuid
--  null;

DROP INDEX IF EXISTS "public"."slug";

CREATE  INDEX "name_namespaced_index" on
  "public"."vulnerabilities" using btree ("name_namespaced");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerabilities" add column "slug" text
--  not null unique;

alter table "public"."package_versions" drop constraint "package_versions_pkg_slug_fkey";

alter table "public"."vulnerability_packages" add constraint "vulnerability_packages_vuln_slug_key" unique ("vuln_slug");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerability_packages" add column "slug" text
--  not null unique;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."vulnerability_packages" add column "vuln_slug" text
--  not null unique;

DROP TABLE "public"."package_versions";

DROP INDEX IF EXISTS "public"."vulnerability_name_namespaced";

CREATE  INDEX "name_namespaced" on
  "public"."vulnerabilities" using btree ("name_namespaced");

DROP INDEX IF EXISTS "public"."name_namespaced_index";

DROP TABLE "public"."vulnerability_packages";

alter table "public"."vulnerabilities"
  add constraint "vulnerabilities_related_vulnerability_id_fkey"
  foreign key (related_vulnerability_id)
  references "public"."vulnerabilities"
  (id) on update no action on delete no action;
alter table "public"."vulnerabilities" alter column "related_vulnerability_id" drop not null;
alter table "public"."vulnerabilities" add column "related_vulnerability_id" uuid;

alter table "public"."vulnerabilities" alter column "pkgs" drop not null;
alter table "public"."vulnerabilities" add column "pkgs" jsonb;

ALTER TABLE "public"."vulnerabilities" ALTER COLUMN "id" drop default;


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
