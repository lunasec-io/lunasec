CREATE SCHEMA analysis;

CREATE TABLE analysis.finding_type
(
    value TEXT PRIMARY KEY
);

INSERT INTO analysis.finding_type (value)
VALUES ('not_vulnerable'),
       ('vulnerable'),
       ('not_vulnerable_not_imported'),
       ('not_vulnerable_not_called');

CREATE TABLE analysis.finding_source
(
    value TEXT PRIMARY KEY
);

INSERT INTO analysis.finding_source (value)
VALUES ('semgrep_imported_called');


CREATE TABLE analysis.manifest_dependency_edge_result
(
    id                          uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
    manifest_dependency_edge_id uuid        NOT NULL,
    vulnerability_id            uuid        NOT NULL,
    finding_type                TEXT        NOT NULL REFERENCES analysis.finding_type,
    finding_source              TEXT        NOT NULL REFERENCES analysis.finding_type,
    created_at                  timestamptz NOT NULL
);

ALTER TABLE analysis.manifest_dependency_edge_result
    ADD FOREIGN KEY (manifest_dependency_edge_id) REFERENCES manifest_dependency_edge (id);

ALTER TABLE analysis.manifest_dependency_edge_result
    ADD FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability (id);
