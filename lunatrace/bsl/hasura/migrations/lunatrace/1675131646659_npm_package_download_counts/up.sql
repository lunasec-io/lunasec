CREATE TABLE "npm"."package_download_count" (
    "name" TEXT NOT NULL,
    "package_id" uuid NULL,
    "day" TIMESTAMPTZ NOT NULL,
    "downloads" INT NOT NULL,
    UNIQUE ("name", "day"),
    FOREIGN KEY ("package_id") REFERENCES "package"."package"("id")
);
COMMENT ON TABLE "npm"."package_download_count" IS E'Package download count for a specific day.';

CREATE TABLE "npm"."package_version_download_count" (
    "name" TEXT NOT NULL,
    "release_id" uuid NULL,
    "version" TEXT NOT NULL,
    "downloads" INT NOT NULL,
    "day" TIMESTAMPTZ NOT NULL,
    UNIQUE ("name", "version", "day"),
    FOREIGN KEY ("release_id") REFERENCES "package"."release"("id")
);
COMMENT ON TABLE "npm"."package_version_download_count" IS E'Package version download count data from within a week.';
