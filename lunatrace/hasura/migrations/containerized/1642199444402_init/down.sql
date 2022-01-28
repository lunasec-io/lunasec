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

-- ALTER TABLE ONLY public.vulnerability_packages DROP CONSTRAINT vulnerability_packages_vuln_slug_fkey;
-- ALTER TABLE ONLY public.scans DROP CONSTRAINT scans_sbom_id_fkey;
-- ALTER TABLE ONLY public.scans DROP CONSTRAINT scans_project_id_fkey;
-- ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_project_id_fkey;
-- ALTER TABLE ONLY public.related_vulnerabilities DROP CONSTRAINT related_vulnerability_vulnerability_slug_fkey;
-- ALTER TABLE ONLY public.related_vulnerabilities DROP CONSTRAINT related_vulnerabilities_related_vulnerability_slug_fkey;
-- ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_settings_id_fkey;
-- ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_organization_id_fkey;
-- ALTER TABLE ONLY public.package_versions DROP CONSTRAINT package_versions_pkg_slug_fkey;
-- ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_settings_id_fkey;
-- ALTER TABLE ONLY public.organization_user DROP CONSTRAINT organization_user_user_id_fkey;
-- ALTER TABLE ONLY public.organization_user DROP CONSTRAINT organization_user_organization_id_fkey;
-- DROP TRIGGER set_public_organization_user_updated_at ON public.organization_user;
-- DROP INDEX public.vuln_slug_index;
-- DROP INDEX public.vuln_pkg_id_index;
-- DROP INDEX public.version_slug;
-- DROP INDEX public.slug;
-- DROP INDEX public.related_vulnerability;
-- DROP INDEX public.pkg_slug_index;
--
-- ALTER TABLE ONLY public.vulnerability_packages DROP CONSTRAINT vulnerability_packages_slug_key;
-- ALTER TABLE ONLY public.vulnerability_packages DROP CONSTRAINT vulnerability_packages_pkey;
-- ALTER TABLE ONLY public.vulnerability_packages DROP CONSTRAINT vulnerability_packages_id_key;
-- ALTER TABLE ONLY public.vulnerabilities DROP CONSTRAINT vulnerabilities_slug_key;
-- ALTER TABLE ONLY public.vulnerabilities DROP CONSTRAINT vulnerabilities_pkey;
-- ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
-- ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
-- ALTER TABLE ONLY public.settings DROP CONSTRAINT settings_pkey;
-- ALTER TABLE ONLY public.related_vulnerabilities DROP CONSTRAINT secondary_finding_vulnerability_pkey;
-- ALTER TABLE ONLY public.scans DROP CONSTRAINT scans_pkey;
-- ALTER TABLE ONLY public.sboms DROP CONSTRAINT sboms_pkey;
-- ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_pkey;
-- ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
-- ALTER TABLE ONLY public.package_versions DROP CONSTRAINT package_versions_pkey;
-- ALTER TABLE ONLY public.package_versions DROP CONSTRAINT package_versions_id_key;
-- ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_pkey;
-- ALTER TABLE ONLY public.organization_user DROP CONSTRAINT organization_user_pkey;

DROP TABLE public.findings
,public.vulnerability_packages
,public.vulnerabilities
,public.users
,public.settings
,public.scans
,public.sboms
,public.reports
,public.related_vulnerabilities
,public.projects
,public.package_versions
,public.organizations
,public.organization_user
CASCADE;
