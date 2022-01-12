
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
