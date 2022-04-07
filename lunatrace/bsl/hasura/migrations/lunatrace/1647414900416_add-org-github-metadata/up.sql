CREATE TABLE "public"."github_repositories" (
    "id" uuid NOT NULL DEFAULT public.gen_random_uuid(),
    "github_id" INTEGER NOT NULL,
    "git_url" text NOT NULL,
    "api_response" jsonb NOT NULL,
    "project_id" uuid NOT NULL,
    CONSTRAINT "github_repositories_github_id_key" UNIQUE ("github_id"),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

COMMENT ON TABLE "public"."github_repositories" IS E'Metadata about a github repository and where to find it.';

ALTER TABLE "public"."organizations" ADD COLUMN "installation_id" INTEGER;
ALTER TABLE "public"."organizations" ADD COLUMN "github_id" INTEGER;
ALTER TABLE "public"."organizations" ADD CONSTRAINT "organizations_github_id_key" UNIQUE ("github_id");

ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_name_organization_id_key" UNIQUE ("name", "organization_id");

ALTER TABLE "public"."organization_user" ADD CONSTRAINT "organization_user_user_id_organization_id_key" UNIQUE ("user_id", "organization_id");

-- Set action to cascade
ALTER TABLE "public"."projects" DROP CONSTRAINT "projects_organization_id_fkey",
    ADD CONSTRAINT "projects_organization_id_fkey"
    FOREIGN KEY ("organization_id")
    REFERENCES "public"."organizations"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "public"."organization_user" DROP CONSTRAINT "organization_user_organization_id_fkey",
    ADD CONSTRAINT "organization_user_organization_id_fkey"
    FOREIGN KEY ("organization_id")
    REFERENCES "public"."organizations"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "public"."organization_user" DROP CONSTRAINT "organization_user_user_id_fkey",
    ADD CONSTRAINT "organization_user_user_id_fkey"
    FOREIGN KEY ("user_id")
    REFERENCES "public"."identities"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
