--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Debian 12.9-1.pgdg110+1)
-- Dumped by pg_dump version 13.4

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN _new := NEW;
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



ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings
(
    id              uuid                                                  NOT NULL PRIMARY KEY,
    created_at      timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_org_settings boolean
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users
(
    id         uuid                                                  NOT NULL PRIMARY KEY,
    name       character varying(200)                                NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email      text                                                  NOT NULL
);

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations
(
    id          uuid                                                  NOT NULL PRIMARY KEY,
    name        character varying(200)                                NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    settings_id uuid
);



CREATE TABLE public.organization_user
(
    id              uuid                     DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at      timestamp with time zone DEFAULT now()                    NOT NULL,
    updated_at      timestamp with time zone DEFAULT now()                    NOT NULL,
    user_id         uuid                                                      NOT NULL REFERENCES public.users (id),
    organization_id uuid                                                      NOT NULL REFERENCES public.organizations (id)
);


--
-- Name: TABLE organization_user; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.organization_user IS 'join table';



--
-- Name: package_versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.package_versions
(
    slug               text                                  NOT NULL UNIQUE,
    version_constraint text                                  NOT NULL,
    version_format     text                                  NOT NULL,
    fixed_in_versions  text[]                                NOT NULL,
    fix_state          text                                  NOT NULL,
    pkg_slug           text                                  NOT NULL,
    cpes               text[]                                NOT NULL,
    id                 uuid DEFAULT public.gen_random_uuid() NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX pkg_ver_slug_indx on public.package_versions (slug);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects
(
    id              uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name            character varying(500)                                       NOT NULL,
    repo            character varying(500),
    created_at      timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    settings_id     uuid,
    organization_id uuid REFERENCES public.organizations (id)
);



CREATE TABLE public.vulnerabilities
(
    id                        uuid                        DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name                      text                                                         NOT NULL,
    created_at                timestamp without time zone DEFAULT CURRENT_TIMESTAMP        NOT NULL,
    namespace                 text                                                         NOT NULL,
    data_source               text,
    record_source             text,
    severity                  text,
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

--
-- Name: related_vulnerabilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.related_vulnerabilities
(
    id                         uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    vulnerability_slug         text                                  NOT NULL REFERENCES public.vulnerabilities (slug),
    related_vulnerability_slug text                                  NOT NULL REFERENCES public.vulnerabilities (slug)
);

ALTER TABLE public.related_vulnerabilities
    ADD CONSTRAINT constraint_name UNIQUE (vulnerability_slug, related_vulnerability_slug);

CREATE INDEX related_vulnerabilities_indx on public.related_vulnerabilities (vulnerability_slug);


--
-- Name: TABLE related_vulnerabilities; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.related_vulnerabilities IS 'join table for adding holding additional vulns on a finding';


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports
(
    source_type    text                                  NOT NULL,
    target         text                                  NOT NULL,
    id             uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    db_date        date                                  NOT NULL,
    grype_version  text                                  NOT NULL,
    distro_name    text                                  NOT NULL,
    distro_version text                                  NOT NULL,
    project_id     uuid                                  NOT NULL REFERENCES public.projects (id)
);



--
-- Name: TABLE reports; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.reports IS 'scan reports';


--
-- Name: sboms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sboms
(
    id         uuid                                                  NOT NULL PRIMARY KEY,
    s3_url     text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: scans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scans
(
    id             uuid                                                  NOT NULL PRIMARY KEY,
    project_id     uuid REFERENCES public.projects (id),
    sbom_id        uuid REFERENCES public.sboms,
    created_at     timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    source_type    text                                                  NOT NULL,
    target         text                                                  NOT NULL,
    db_date        timestamp                                             NOT NULL,
    grype_version  text                                                  NOT NULL,
    distro_name    text,
    distro_version text
);

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

CREATE INDEX vuln_pkg_slug on public.vulnerability_packages (slug);



--
-- Name: TABLE vulnerability_packages; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.vulnerability_packages IS 'All of the package vulnerabilities belonging to a given vulnerability';

--
-- Name: organization_user organization_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

CREATE TABLE public.findings
(
    id                       uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    vulnerability_id         uuid references public.vulnerabilities (id),
    vulnerability_package_id uuid references public.vulnerability_packages (id),
    package_version_id       uuid references public.package_versions (id),
    report_id                uuid references public.reports (id),

    package_name             text                                  NOT NULL,
    version                  text                                  NOT NULL,
    version_matcher          text                                  NOT NULL,
    type                     text                                  NOT NULL,
    locations                text[]                                NOT NULL,
    language                 text                                  NOT NULL,
    purl                     text                                  NOT NULL,
    virtual_path             text,
    matcher                  text                                  NOT NULL
);

