DROP TABLE "public"."users";

ALTER TABLE "public"."organization_user" DROP CONSTRAINT "organization_user_user_id_fkey",
    ADD CONSTRAINT "organization_user_user_id_fkey"
    FOREIGN KEY ("user_id")
    REFERENCES "public"."identities"
    ("id") ON UPDATE cascade ON DELETE CASCADE;

ALTER TABLE "public"."project_access_tokens"
    ADD CONSTRAINT "project_access_tokens_created_by_user_id_fkey"
        FOREIGN KEY ("created_by_user_id")
    REFERENCES "public"."identities"
    ("id") ON UPDATE NO ACTION ON DELETE SET NULL;
