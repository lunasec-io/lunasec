ALTER TABLE vulnerability.affected ALTER COLUMN package_id DROP NOT NULL;
ALTER TABLE vulnerability.affected ALTER COLUMN vulnerability_id DROP NOT NULL;
