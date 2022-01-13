


CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);
CREATE TABLE "settings" (
  "id" uuid PRIMARY KEY,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "is_org_settings" boolean
);
CREATE TABLE "organizations" (
  "id" uuid PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "createdAt" timestamp DEFAULT current_timestamp NOT NULL,
  "settings_id" uuid REFERENCES "settings"
);
CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY,
  "name" varchar(500) NOT NULL,
  "repo" varchar(500),
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "settings_id" uuid REFERENCES "settings",
  "organization_id" uuid REFERENCES "organizations"
);
CREATE TABLE "sboms" (
  "id" uuid PRIMARY KEY,
  "s3_url" text,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);
CREATE TABLE "vulnerabilities" (
  "id" uuid PRIMARY KEY,
  "name" text UNIQUE,
  "related_vulnerability_id" uuid REFERENCES "vulnerabilities",
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);
CREATE TABLE "scans" (
  "id" uuid PRIMARY KEY,
  "project_id" uuid REFERENCES "projects",
  "sbom_id" uuid REFERENCES "sboms",
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);
CREATE TABLE "findings" (
  "id" uuid PRIMARY KEY,
  "vulnerability_id" uuid REFERENCES "vulnerabilities",
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);

CREATE TABLE "public"."organization_user"
(
    "id"              uuid        NOT NULL DEFAULT gen_random_uuid(),
    "created_at"      timestamptz NOT NULL DEFAULT now(),
    "updated_at"      timestamptz NOT NULL DEFAULT now(),
    "user_id"         uuid        NOT NULL,
    "organization_id" uuid        NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("organization_id") REFERENCES "public"."organizations" ("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE restrict ON DELETE restrict,
    UNIQUE ("id")
);
COMMENT ON TABLE "public"."organization_user" IS E'join table';
CREATE
OR REPLACE
FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_organization_user_updated_at"
    BEFORE UPDATE
    ON "public"."organization_user"
    FOR EACH ROW
    EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_organization_user_updated_at" ON "public"."organization_user" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE
EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."users" add column "email" text
 not null unique;

CREATE TABLE "public"."secondary_finding_vulnerability" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "finding_id" uuid NOT NULL, "vulnerability_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("vulnerability_id") REFERENCES "public"."vulnerabilities"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("finding_id") REFERENCES "public"."findings"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));COMMENT ON TABLE "public"."secondary_finding_vulnerability" IS E'join table for adding holding additional vulns on a finding';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."findings" add column "artifact_name" text
 null;

alter table "public"."findings" add column "artifact_version" text
 null;

alter table "public"."findings" add column "artifact_type" text
 null;

alter table "public"."findings" add column "artifact_locations" Text[]
 null;

alter table "public"."findings" add column "artifact_language" text
 null;

alter table "public"."findings" add column "artifact_licenses" Text[]
 null;

alter table "public"."findings" add column "artifact_cpes" Text[]
 null;

alter table "public"."findings" add column "artifact_package_url" text
 null;

alter table "public"."findings" add column "artifact_metadata_virtual_path" text
 null;

alter table "public"."findings" add column "artifact_metadata_pom_artifact_id" text
 null;

alter table "public"."findings" add column "pom_group_id" text
 null;

alter table "public"."findings" add column "artifact_metadata_manifest_name" text
 null;

alter table "public"."findings" rename column "pom_group_id" to "artifact_metdata_pom_group_id";

alter table "public"."findings" add column "matcher" text
 null;

alter table "public"."findings" add column "searched_by_namespace" text
 null;

alter table "public"."findings" add column "searched_by_cpes" Text[]
 null;

alter table "public"."findings" add column "artifact_metadata" jsonb
 null;

alter table "public"."vulnerabilities" add column "namespace" text
 not null;

alter table "public"."vulnerabilities" add column "name_namespaced" text
 not null unique;

alter table "public"."vulnerabilities" alter column "name" set not null;
alter table "public"."vulnerabilities" drop constraint "vulnerabilities_name_key";

alter table "public"."vulnerabilities" add column "related_vulnerabilities" text
 null;

alter table "public"."vulnerabilities" add column "data_source" text
 null;

alter table "public"."vulnerabilities" add column "record_source" text
 null;

alter table "public"."vulnerabilities" add column "severity" text
 null;

alter table "public"."vulnerabilities" add column "urls" text
 null;

alter table "public"."vulnerabilities" add column "description" text
 null;

alter table "public"."vulnerabilities" add column "pkgs" jsonb
 null;

alter table "public"."vulnerabilities" alter column "pkgs" set not null;

CREATE  INDEX "name_namespaced" on
  "public"."vulnerabilities" using btree ("name_namespaced");

alter table "public"."vulnerabilities" alter column "id" set default gen_random_uuid();

alter table "public"."vulnerabilities" drop column "pkgs" cascade;

alter table "public"."vulnerabilities" drop column "related_vulnerability_id" cascade;

CREATE TABLE "public"."vulnerability_packages" ("vulnerability_name_namespaced" text NOT NULL, "pkg_name" text NOT NULL, "version_constraint" text NOT NULL, "version_format" text NOT NULL, "fixed_in_versions" text NOT NULL, "fix_state" text NOT NULL, "cpes" jsonb NOT NULL, "advisories" text NOT NULL, "ephemeral_id_dont_use" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("ephemeral_id_dont_use") , FOREIGN KEY ("vulnerability_name_namespaced") REFERENCES "public"."vulnerabilities"("name_namespaced") ON UPDATE restrict ON DELETE cascade, UNIQUE ("ephemeral_id_dont_use"));COMMENT ON TABLE "public"."vulnerability_packages" IS E'All of the package vulnerabilities belonging to a given vulnerability';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE UNIQUE INDEX "name_namespaced_index" on
  "public"."vulnerabilities" using btree ("name_namespaced");

DROP INDEX IF EXISTS "public"."name_namespaced";

CREATE  INDEX "vulnerability_name_namespaced" on
  "public"."vulnerability_packages" using btree ("vulnerability_name_namespaced");

CREATE TABLE "public"."package_versions" ("slug" text NOT NULL, "version_constraint" text NOT NULL, "version_format" text NOT NULL, "fixed_in_versions" Text[] NOT NULL, "fix_state" text NOT NULL, "cpes" jsonb, "pkg_slug" text NOT NULL, PRIMARY KEY ("slug") , UNIQUE ("slug"));

alter table "public"."vulnerability_packages" add column "vuln_slug" text
 not null unique;

alter table "public"."vulnerability_packages" add column "slug" text
 not null unique;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_key";

alter table "public"."package_versions"
  add constraint "package_versions_pkg_slug_fkey"
  foreign key ("pkg_slug")
  references "public"."vulnerability_packages"
  ("slug") on update restrict on delete cascade;

alter table "public"."vulnerabilities" add column "slug" text
 not null unique;

DROP INDEX IF EXISTS "public"."name_namespaced_index";

CREATE UNIQUE INDEX "slug" on
  "public"."vulnerabilities" using btree ("slug");

alter table "public"."vulnerabilities" add column "topic_id" uuid
 null;

alter table "public"."vulnerabilities" drop column "name_namespaced" cascade;

alter table "public"."vulnerability_packages" add column "name" text
 null;

alter table "public"."vulnerabilities" drop column "urls" cascade;

alter table "public"."vulnerabilities" add column "urls" text[]
 null;

BEGIN TRANSACTION;
ALTER TABLE "public"."vulnerability_packages" DROP CONSTRAINT "vulnerability_packages_pkey";

ALTER TABLE "public"."vulnerability_packages"
    ADD CONSTRAINT "vulnerability_packages_pkey" PRIMARY KEY ("slug");
COMMIT TRANSACTION;

alter table "public"."vulnerability_packages" drop column "vulnerability_name_namespaced" cascade;

alter table "public"."vulnerability_packages" drop column "pkg_name" cascade;

alter table "public"."vulnerability_packages" drop column "ephemeral_id_dont_use" cascade;

alter table "public"."vulnerability_packages" drop column "cpes" cascade;

alter table "public"."vulnerability_packages" drop column "version_constraint" cascade;

alter table "public"."vulnerability_packages" drop column "fix_state" cascade;

alter table "public"."vulnerability_packages" drop column "version_format" cascade;

alter table "public"."vulnerability_packages" drop column "fixed_in_versions" cascade;

alter table "public"."package_versions" drop constraint "package_versions_pkg_slug_fkey",
  add constraint "package_versions_pkg_slug_fkey"
  foreign key ("pkg_slug")
  references "public"."vulnerability_packages"
  ("slug") on update restrict on delete cascade;

alter table "public"."vulnerability_packages"
  add constraint "vulnerability_packages_vuln_slug_fkey"
  foreign key ("vuln_slug")
  references "public"."vulnerabilities"
  ("slug") on update restrict on delete cascade;

CREATE UNIQUE INDEX "version_slug" on
  "public"."package_versions" using btree ("slug");

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
  ("slug") on update no action on delete no action;

alter table "public"."vulnerability_packages" drop constraint "vulnerability_packages_vuln_slug_fkey";
