--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Debian 12.9-1.pgdg110+1)
-- Dumped by pg_dump version 13.4

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

-- CREATE EXTENSION pg_trgm;

-- create schema "public";

CREATE
    FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
DECLARE
    _new record;
BEGIN
    _new := NEW;
    _new."updated_at" = NOW();
    RETURN _new;
END;
$$;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


-- ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings
(
    id              uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at      timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    is_org_settings boolean
);

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations
(
    id          uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name        character varying(200)                                       NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    settings_id uuid,
    creator_id  uuid references public.identities (id)
);


CREATE
    TYPE public.organization_user_role AS ENUM ('readonly','normal','admin');


CREATE TABLE public.organization_user
(
    id              uuid                          DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at      timestamp with time zone      DEFAULT now()                    NOT NULL,
    updated_at      timestamp with time zone      DEFAULT now()                    NOT NULL,
    user_id         uuid                                                           NOT NULL REFERENCES public.identities (id),
    organization_id uuid                                                           NOT NULL REFERENCES public.organizations (id),
    role            public.organization_user_role DEFAULT 'normal'                 NOT NULL
);


--
-- Name: TABLE organization_user; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.organization_user IS 'join table';

--
-- Name: package_versions; Type: TABLE; Schema: public; Owner: postgres
--


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects
(
    id              uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name            text                                                         NOT NULL,
    repo            text,
    created_at      timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    settings_id     uuid,
    organization_id uuid REFERENCES public.organizations (id)
);


-- The below functions let us automatically fill the "build_number" column, scoped to whatever project the build is in
CREATE
    FUNCTION public.make_project_sequence_for_build() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    execute format('create sequence if not exists public.project_builds_sequence_%s OWNED BY public.projects.id',
                   translate(NEW.id::text, '-', '_'));
    return NEW;
end
$$;

CREATE TRIGGER make_project_sequence_for_build
    AFTER INSERT
    ON public.projects
    FOR EACH ROW
EXECUTE PROCEDURE public.make_project_sequence_for_build();

CREATE
    FUNCTION public.fill_in_build_number() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    NEW.build_number := nextval('public.project_builds_sequence_' || translate(NEW.project_id::text, '-', '_'));
    RETURN NEW;
end
$$;

CREATE TABLE public.builds
(
    id                 uuid                        DEFAULT public.gen_random_uuid()        NOT NULL PRIMARY KEY,
    created_at         timestamp without time zone DEFAULT CURRENT_TIMESTAMP               NOT NULL,
    project_id         uuid REFERENCES public.projects (id),
    s3_url             text,
    agent_access_token uuid                        DEFAULT public.gen_random_uuid() UNIQUE NOT NULL,
    build_number       int,
    git_remote         text,
    git_branch         text,
    git_hash           text,
    UNIQUE (build_number, project_id)
);



CREATE TRIGGER fill_in_scan_number
    BEFORE INSERT
    ON public.builds
    FOR EACH ROW
EXECUTE PROCEDURE public.fill_in_build_number();



CREATE TABLE public.project_access_tokens
(
    id           uuid DEFAULT public.gen_random_uuid()                  NOT NULL PRIMARY KEY,
    project_uuid uuid references public.projects (id) ON DELETE CASCADE NOT NULL,
    access_token uuid DEFAULT public.gen_random_uuid()                  NOT NULL UNIQUE
);

-- This allows sorting by severity, VERY nice
CREATE
    TYPE public.severity_enum AS ENUM ('Critical','High','Medium','Low','Negligible','Unknown');

CREATE TABLE public.vulnerabilities
(
    id                        uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name                      text                                                         NOT NULL,
    created_at                timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    namespace                 text                                                         NOT NULL,
    data_source               text                                                         NOT NUll,
    record_source             text,
    severity                  public.severity_enum                                         NOT NULL,
    cvss_version              text,
    cvss_score                NUMERIC(3, 1),
    cvss_exploitability_score NUMERIC(3, 1),
    cvss_impact_score         NUMERIC(3, 1),
    cvss_inferred             boolean,
    description               text,
    slug                      text                                                         NOT NULL UNIQUE,
    topic_id                  uuid,
    urls                      text[]
);

CREATE INDEX vuln_slug on public.vulnerabilities (slug);
-- CREATE INDEX vuln_name on public.vulnerabilities (name);
-- CREATE INDEX vuln_description_gin ON public.vulnerabilities USING gin(description);
--
-- Name: related_vulnerabilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.related_vulnerabilities
(
    id                         uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    vulnerability_slug         text                                  NOT NULL REFERENCES public.vulnerabilities (slug),
    related_vulnerability_slug text                                  NOT NULL REFERENCES public.vulnerabilities (slug),
    UNIQUE (vulnerability_slug, related_vulnerability_slug)
);


CREATE INDEX related_vulnerabilities_indx on public.related_vulnerabilities (vulnerability_slug);


--
-- Name: TABLE related_vulnerabilities; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.related_vulnerabilities IS 'join table for adding holding additional vulns on a finding';


--
-- Name: scans; Type: TABLE; Schema: public; Owner: postgres
--


-- The below functions let us automatically fill the "scan_number" column, scoped to whatever build the scan is for
CREATE
    FUNCTION public.make_scans_seq_for_build() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    execute format('create sequence if not exists public.build_scans_seq_%s OWNED BY public.scans.scan_number',
                   translate(NEW.id::text, '-', '_'));
    return NEW;
end
$$;

CREATE TRIGGER make_scans_seq_for_build
    AFTER INSERT
    ON public.builds
    FOR EACH ROW
EXECUTE PROCEDURE public.make_scans_seq_for_build();

CREATE
    FUNCTION public.fill_in_scan_number() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    NEW.scan_number := nextval('public.build_scans_seq_' || translate(NEW.build_id::text, '-', '_'));
    RETURN NEW;
end
$$;


CREATE TABLE public.scans
(
    created_at     timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    source_type    text                                                         NOT NULL,
    target         text                                                         NOT NULL,
    id             uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    build_id       uuid                                                         NOT NULL REFERENCES public.builds (id),
    db_date        date                                                         NOT NULL,
    grype_version  text                                                         NOT NULL,
    distro_name    text                                                         NOT NULL,
    distro_version text                                                         NOT NULL,
    scan_number    int,
    UNIQUE (scan_number, build_id)
);



CREATE TRIGGER fill_in_scan_number
    BEFORE INSERT
    ON public.scans
    FOR EACH ROW
EXECUTE PROCEDURE public.fill_in_scan_number();

--
-- Name: TABLE reports; Type: COMMENT; Schema: public; Owner: postgres
--


COMMENT ON TABLE public.scans IS 'An individual time a scan was run on a build';

--
-- Name: vulnerabilities; Type: TABLE; Schema: public; Owner: postgres
--


--
-- Name: vulnerability_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vulnerability_packages
(
    advisories text                                  NOT NULL,
    vuln_slug  text                                  NOT NULL REFERENCES public.vulnerabilities (slug),
    slug       text                                  NOT NULL UNIQUE,
    name       text,
    id         uuid DEFAULT public.gen_random_uuid() NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX vuln_pkg_slug_idx on public.vulnerability_packages (slug);
CREATE INDEX vuln_pkg_vuln_slug_idx on public.vulnerability_packages (vuln_slug);

CREATE TABLE public.package_versions
(
    slug               text                                  NOT NULL UNIQUE,
    version_constraint text                                  NOT NULL,
    version_format     text                                  NOT NULL,
    fixed_in_versions  text[]                                NOT NULL,
    fix_state          text                                  NOT NULL,
    pkg_slug           text                                  NOT NULL REFERENCES public.vulnerability_packages (slug),
    cpes               text[]                                NOT NULL,
    id                 uuid DEFAULT public.gen_random_uuid() NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX pkg_ver_slug_indx on public.package_versions (slug);
CREATE INDEX pkg_ver_pkg_slug_indx on public.package_versions (pkg_slug);

--
-- Name: TABLE vulnerability_packages; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.vulnerability_packages IS 'All of the package vulnerabilities belonging to a given vulnerability';

--
-- Name: organization_user organization_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

CREATE
    TYPE public.fix_state_enum AS ENUM ('fixed','not-fixed','unknown');


CREATE TABLE public.findings
(
    id                       uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at               timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    updated_at               timestamp with time zone    DEFAULT now()                    NOT NULL,
    vulnerability_id         uuid references public.vulnerabilities (id)                  NOT NULL,
    vulnerability_package_id uuid references public.vulnerability_packages (id),
    package_version_id       uuid references public.package_versions (id),
    scan_id                  uuid references public.scans (id)                            NOT NULL,
    build_id                 uuid references public.builds (id)                           NOT NULL,
    fix_state                public.fix_state_enum                                        NOT NULL,
    fix_versions             text[],
    package_name             text                                                         NOT NULL,
    version                  text                                                         NOT NULL,
    version_matcher          text                                                         NOT NULL,
    type                     text                                                         NOT NULL,
    locations                text[]                                                       NOT NULL,
    language                 text                                                         NOT NULL,
    purl                     text                                                         NOT NULL,
    virtual_path             text,
    matcher                  text                                                         NOT NULL,
    dedupe_slug              text                                                         NOT NULL,
    severity                 public.severity_enum                                         NOT NULL,
    UNIQUE (dedupe_slug, build_id)
);

CREATE INDEX finding_severity_index ON public.findings (build_id, severity);
CREATE INDEX finding_vuln_id_index ON public.findings (vulnerability_id);
CREATE INDEX finding_build_id_index ON public.findings (build_id);


CREATE TABLE public.instances
(
    instance_id        uuid                                                  NOT NULL PRIMARY KEY,
    created_at         timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_heartbeat     timestamp without time zone DEFAULT now()             NOT NULL,
    agent_access_token uuid references public.builds (agent_access_token) ON DELETE CASCADE
);

CREATE TABLE public.manifests
(
    id         uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    project_id uuid references public.projects (id)                         NOT NULL,
    s3_url     text                                                         NOT NULL UNIQUE,
    filename   text                                                         NOT NULL,
    status     text,
    message    text,
    s3_key         text                                                            NOT NULL
);

CREATE INDEX manifest_s3_key_index  ON public.manifests (s3_key);

