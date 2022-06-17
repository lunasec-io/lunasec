SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.SET_CONFIG('search_path', '', FALSE);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP TABLE
    public.manifests ,public.findings
    ,public.vulnerability_packages
    ,public.vulnerabilities
    ,public.settings
    ,public.scans
    ,public.related_vulnerabilities
    ,public.projects
    ,public.package_versions
    ,public.organizations
    ,public.organization_user
    ,public.builds
    ,public.instances
    ,public.project_access_tokens
    CASCADE;

DROP FUNCTION public.set_current_timestamp_updated_at();
DROP TYPE public.severity_enum;
DROP TYPE public.fix_state_enum;
DROP TYPE public.organization_user_role;
DROP FUNCTION public.make_project_sequence_for_build();
DROP FUNCTION public.fill_in_build_number();
DROP FUNCTION public.make_scans_seq_for_build();
DROP FUNCTION public.fill_in_scan_number();
DROP EXTENSION pgcrypto;
