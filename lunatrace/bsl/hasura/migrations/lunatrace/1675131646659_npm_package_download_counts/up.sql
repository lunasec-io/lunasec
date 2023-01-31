CREATE TABLE "npm"."package_download_count" (
    "name" TEXT NOT NULL,
    "day" TIMESTAMPTZ NOT NULL,
    "downloads" INT NOT NULL
);
COMMENT ON TABLE "npm"."package_download_count" IS E'Package download count for a specific day.';
