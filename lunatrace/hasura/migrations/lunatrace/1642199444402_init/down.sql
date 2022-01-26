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

DROP TABLE public.findings
,public.vulnerability_packages
,public.vulnerabilities
,public.users
,public.settings
,public.scans
,public.reports
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
