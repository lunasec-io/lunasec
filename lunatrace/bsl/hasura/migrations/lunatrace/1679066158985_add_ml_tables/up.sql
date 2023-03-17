
CREATE TABLE vulnerability.code_snippet
(
    id          uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- Reference may be null because we may have pulled code from a non-web source such as vuln-db
    reference_id uuid NULL references vulnerability.reference,
    -- Include url since reference might be null but its still nice to be able to point a source like a vuln-db link for non-scraped content
    source_url text NOT NULL,
    vulnerability uuid NOT NULL references vulnerability.vulnerability,
    code text NOT NULL,
    score integer NOT NULL,
    summary text NOT NULL,
    type text NOT NULL,
    language text NOT NULL
);

-- Add a generated summary to the reference to make it easier for the LLM to choose what to read
ALTER TABLE vulnerability.reference_content ADD COLUMN summary text NULL;

ALTER TABLE package.package ADD COLUMN readme_text text NULL;
ALTER TABLE package.package ADD COLUMN use_case_summary text NULL;
