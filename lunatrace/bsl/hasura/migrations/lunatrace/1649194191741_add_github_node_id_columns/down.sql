
ALTER TABLE "public"."organizations" DROP COLUMN "github_node_id";

ALTER TABLE "public"."github_repositories" DROP COLUMN "github_node_id";

ALTER TABLE "public"."github_repositories" ALTER COLUMN "github_id" SET NOT NULL;
