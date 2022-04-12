CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT public.gen_random_uuid(),
    "github_id" text UNIQUE NOT NULL,
    "github_node_id" text UNIQUE,
    "kratos_id" uuid,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("kratos_id")
       REFERENCES "public"."identities"("id")
       ON UPDATE cascade
       ON DELETE cascade
);

COMMENT ON TABLE "public"."users" IS E'LunaTrace users, identified by their various auth identifiers (ex. github, kratos, etc.)';

ALTER TABLE "public"."organization_user" DROP CONSTRAINT "organization_user_user_id_fkey",
  ADD CONSTRAINT "organization_user_user_id_fkey"
  FOREIGN KEY ("user_id")
  REFERENCES "public"."users"
  ("id") ON UPDATE cascade ON DELETE cascade;

ALTER TABLE "public"."project_access_tokens"
  ADD CONSTRAINT "project_access_tokens_created_by_user_id_fkey"
  FOREIGN KEY ("created_by_user_id")
  REFERENCES "public"."users"
  ("id") ON UPDATE NO ACTION ON DELETE SET NULL;
