CREATE TABLE "package"."reference_content" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "package_id" uuid NOT NULL REFERENCES "package"."package"("id") ON UPDATE cascade ON DELETE cascade,
    "url" text NOT NULL,
    "content" text NOT NULL,
    "normalized_content" text NOT NULL,
    "content_type" text NOT NULL,
    "last_successful_fetch" timestamptz DEFAULT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("package_id", "url")
);

CREATE TABLE "package"."content_embedding" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "content_hash" text NOT NULL,
    "reference_content_id" uuid NOT NULL REFERENCES "package"."reference_content"("id") ON UPDATE cascade ON DELETE cascade,
    "content" text NOT NULL,
    "embedding" vector (1536) NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("content_hash")
);

CREATE INDEX ON "package"."content_embedding"
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
