ALTER TABLE "public"."builds" ADD COLUMN "pull_request_id" INTEGER NULL;

ALTER TABLE "public"."organizations" ADD COLUMN "github_owner_type" TEXT NULL;
