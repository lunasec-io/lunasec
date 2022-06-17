ALTER TABLE builds
    DROP COLUMN existing_github_check_id;

ALTER TABLE settings
    DROP COLUMN pr_check_enabled;
