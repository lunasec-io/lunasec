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
