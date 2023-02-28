CREATE EXTENSION vector;

CREATE TABLE "vulnerability"."reference_content" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "reference_id" uuid NOT NULL REFERENCES "vulnerability"."reference"("id") ON UPDATE cascade ON DELETE cascade,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "normalized_content" text NOT NULL,
    "content_type" text NOT NULL,
    "last_successful_fetch" timestamptz DEFAULT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("reference_id")
);

CREATE TABLE "vulnerability"."reference_embedding" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "content_hash" text NOT NULL,
    "reference_content_id" uuid NOT NULL REFERENCES "vulnerability"."reference_content"("id") ON UPDATE cascade ON DELETE cascade,
    "content" text NOT NULL,
    "embedding" vector (1536) NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("content_hash")
);

CREATE INDEX ON "vulnerability"."reference_embedding"
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

create or replace function vulnerability.match_reference_embedding (
    query_embedding vector(1536),
    similarity_threshold float,
    match_count int
)
    returns table (
                      id uuid,
                      url text,
                      content text,
                      similarity float
                  )
    language plpgsql
as $$
begin
    return query
        select
            r.id,
            r.url,
            re.content,
            1 - (re.embedding <=> query_embedding) as similarity
        from vulnerability.reference_embedding re
                 join vulnerability.reference_content rc on rc.id = re.reference_content_id
                 join vulnerability.reference r on r.id = rc.reference_id
        where 1 - (re.embedding <=> query_embedding) > similarity_threshold
        order by re.embedding <=> query_embedding
        limit match_count;
end;
$$;
