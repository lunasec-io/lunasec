
DROP TABLE vulnerability.code_snippet;

-- Add a generated summary to the reference to make it easier for the LLM to choose what to read
ALTER TABLE vulnerability.reference_content DROP COLUMN summary;

ALTER TABLE package.package DROP COLUMN readme_text;
ALTER TABLE package.package DROP COLUMN use_case_summary;
