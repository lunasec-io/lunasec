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
