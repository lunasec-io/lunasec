CREATE SCHEMA "npm";

CREATE TABLE "npm"."revision" (
    "rev" TEXT,
    "id" TEXT,
    "doc" JSONB,
    "deleted" BOOLEAN,
    "seq" INTEGER PRIMARY KEY
);
COMMENT ON TABLE "npm"."revision" IS E'Revision of a NPM CouchDB document.';
