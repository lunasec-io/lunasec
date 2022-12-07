-- general use ENUMs for cvss modifiers since many are shared
CREATE TYPE cvss_low_medium_high AS ENUM ('X','L','M','H');
CREATE TYPE cvss_none_low_high AS ENUM ('X','N','L','H');

-- specific use case ENUMs for cvss modifiers that are unique
CREATE TYPE cvss_vector AS ENUM ('X','N','A','L','P');
CREATE TYPE cvss_interaction AS ENUM ('X','N','R');
CREATE TYPE cvss_scope AS ENUM ('X','U','C');
CREATE TYPE cvss_complexity AS ENUM ('X','L','H');


CREATE TABLE public.cvss_environmental_adjustment
(
    id                          uuid PRIMARY KEY              DEFAULT (gen_random_uuid()),
    created_at                  timestamptz                   DEFAULT NOW(),
    name                       TEXT                 NOT NULL,
    -- exploitability metrics
    attack_vector               cvss_vector          NOT NULL DEFAULT 'X',
    attack_complexity           cvss_complexity      NOT NULL DEFAULT 'X',
    privileges_required         cvss_none_low_high   NOT NULL DEFAULT 'X',
    user_interaction            cvss_interaction     NOT NULL DEFAULT 'X',
    scope                       cvss_scope           NOT NULL DEFAULT 'X',
    -- impact metrics
    confidentiality_impact      cvss_none_low_high   NOT NULL DEFAULT 'X',
    integrity_impact            cvss_none_low_high   NOT NULL DEFAULT 'X',
    availability_impact         cvss_none_low_high   NOT NULL DEFAULT 'X',
    -- subscore modifiers
    confidentiality_requirement cvss_low_medium_high NOT NULL DEFAULT 'X',
    integrity_requirement       cvss_low_medium_high NOT NULL DEFAULT 'X',
    availability_requirement    cvss_low_medium_high NOT NULL DEFAULT 'X'
);




CREATE TABLE public.project_environmental_adjustment
(
    path_glob                        TEXT NOT NULL,
    project_id                       uuid NOT NULL REFERENCES public.projects ON DELETE CASCADE,
    cvss_environmental_adjustment_id uuid NOT NULL REFERENCES public.cvss_environmental_adjustment ON DELETE CASCADE,
    UNIQUE (project_id, path_glob)
)
