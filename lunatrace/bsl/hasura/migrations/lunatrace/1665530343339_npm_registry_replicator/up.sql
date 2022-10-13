CREATE SCHEMA "npm";

CREATE TABLE "npm"."revision" (
    "rev" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "doc" JSONB NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "seq" INTEGER PRIMARY KEY
);
COMMENT ON TABLE "npm"."revision" IS E'Revision of a NPM CouchDB document.';
