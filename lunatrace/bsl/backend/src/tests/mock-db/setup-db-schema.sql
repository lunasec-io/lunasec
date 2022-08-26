--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Debian 12.9-1.pgdg110+1)
-- Dumped by pg_dump version 14.3

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

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA hdb_catalog;


--
-- Name: package; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA package;


--
-- Name: vulnerability; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA vulnerability;


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

-- CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: affected_range_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.affected_range_type AS ENUM (
    'git',
    'semver',
    'ecosystem'
);


--
-- Name: builds_source_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.builds_source_type AS ENUM (
    'pr',
    'gui',
    'cli',
    'default_branch'
);


--
-- Name: fix_state_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.fix_state_enum AS ENUM (
    'fixed',
    'not-fixed',
    'unknown'
);


--
-- Name: github_webhook_event; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.github_webhook_event AS ENUM (
    'branch_protection_rule',
    'check_run',
    'check_suite',
    'code_scanning_alert',
    'commit_comment',
    'create',
    'delete',
    'deployment',
    'deployment_status',
    'deploy_key',
    'discussion',
    'discussion_comment',
    'fork',
    'gollum',
    'issues',
    'issue_comment',
    'label',
    'member',
    'membership',
    'meta',
    'milestone',
    'organization',
    'org_block',
    'package',
    'page_build',
    'project',
    'project_card',
    'project_column',
    'public',
    'pull_request',
    'pull_request_review',
    'pull_request_review_comment',
    'pull_request_review_thread',
    'push',
    'registry_package',
    'release',
    'repository',
    'repository_import',
    'repository_vulnerability_alert',
    'secret_scanning_alert',
    'star',
    'status',
    'team',
    'team_add',
    'watch',
    'workflow_job',
    'workflow_run',
    'unknown'
);


--
-- Name: license_source; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.license_source AS ENUM (
    'manual',
    'scan_repo',
    'scan_binary',
    'api_npm'
);


--
-- Name: organization_user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.organization_user_role AS ENUM (
    'readonly',
    'normal',
    'admin'
);


--
-- Name: package_manager; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.package_manager AS ENUM (
    'npm',
    'packagist',
    'crates_io',
    'go',
    'hex',
    'maven',
    'nuget',
    'pypi',
    'rubygems'
);


--
-- Name: reference_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.reference_type AS ENUM (
    'advisory',
    'article',
    'report',
    'fix',
    'git',
    'package',
    'web'
);


--
-- Name: severity_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.severity_enum AS ENUM (
    'Critical',
    'High',
    'Medium',
    'Low',
    'Negligible',
    'Unknown'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'organization_user',
    'lunatrace_admin'
);



SET default_table_access_method = heap;

--
-- Name: build_dependency_relationship; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.build_dependency_relationship (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    build_id uuid NOT NULL,
    release_id uuid NOT NULL,
    labels jsonb NOT NULL,
    depended_by_relationship_id uuid,
    range text NOT NULL,
    project_path text NOT NULL
);


--
-- Name: license; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.license (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);


--
-- Name: maintainer; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.maintainer (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    package_manager public.package_manager,
    email text NOT NULL,
    name text
);


--
-- Name: package; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.package (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    package_manager public.package_manager NOT NULL,
    custom_registry text DEFAULT ''::text NOT NULL,
    name text NOT NULL,
    description text,
    upstream_data jsonb,
    last_failed_fetch timestamp with time zone,
    last_successful_fetch timestamp with time zone
);


--
-- Name: package_maintainer; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.package_maintainer (
    package_id uuid,
    maintainer_id uuid
);


--
-- Name: release; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.release (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    package_id uuid NOT NULL,
    publishing_maintainer_id uuid,
    version text NOT NULL,
    upstream_data jsonb,
    release_time timestamp with time zone,
    observed_time timestamp with time zone DEFAULT now() NOT NULL,
    blob_hash text,
    upstream_blob_url text,
    mirrored_blob_url text,
    fetched_time timestamp with time zone
);


--
-- Name: release_dependency; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.release_dependency (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    release_id uuid NOT NULL,
    dependency_package_id uuid,
    dependency_release_id uuid,
    package_name text NOT NULL,
    package_version_query text NOT NULL,
    is_dev boolean DEFAULT false NOT NULL
);


--
-- Name: release_license; Type: TABLE; Schema: package; Owner: -
--

CREATE TABLE package.release_license (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    source public.license_source NOT NULL,
    release_id uuid NOT NULL,
    scan_time timestamp with time zone DEFAULT now() NOT NULL,
    license_id uuid NOT NULL,
    scan_metadata jsonb
);


--
-- Name: scans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scans (
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    source_type text NOT NULL,
    target text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    build_id uuid NOT NULL,
    db_date date NOT NULL,
    grype_version text NOT NULL,
    distro_name text NOT NULL,
    distro_version text NOT NULL,
    scan_number integer
);


--
-- Name: build_scans_seq_08dfb7f8_528f_41ac_b5f1_6f7ecbc1015b; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_08dfb7f8_528f_41ac_b5f1_6f7ecbc1015b
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_08dfb7f8_528f_41ac_b5f1_6f7ecbc1015b; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_08dfb7f8_528f_41ac_b5f1_6f7ecbc1015b OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_0cee22d3_41b7_4d42_98bf_dfed10975166; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_0cee22d3_41b7_4d42_98bf_dfed10975166
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_0cee22d3_41b7_4d42_98bf_dfed10975166; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_0cee22d3_41b7_4d42_98bf_dfed10975166 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_0d57b0c4_1adf_4aaf_b86d_dc1f7e22a210; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_0d57b0c4_1adf_4aaf_b86d_dc1f7e22a210
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_0d57b0c4_1adf_4aaf_b86d_dc1f7e22a210; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_0d57b0c4_1adf_4aaf_b86d_dc1f7e22a210 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_0f94b05a_adbd_4180_b62a_8e593bc909ee; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_0f94b05a_adbd_4180_b62a_8e593bc909ee
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_0f94b05a_adbd_4180_b62a_8e593bc909ee; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_0f94b05a_adbd_4180_b62a_8e593bc909ee OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_0f997154_f176_44ac_945d_bf05800bf170; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_0f997154_f176_44ac_945d_bf05800bf170
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_0f997154_f176_44ac_945d_bf05800bf170; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_0f997154_f176_44ac_945d_bf05800bf170 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_11ebbe94_3af5_4970_995e_174b68adc92e; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_11ebbe94_3af5_4970_995e_174b68adc92e
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_11ebbe94_3af5_4970_995e_174b68adc92e; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_11ebbe94_3af5_4970_995e_174b68adc92e OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_1b777f2e_7762_4369_8a35_fa0046dea74a; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_1b777f2e_7762_4369_8a35_fa0046dea74a
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_1b777f2e_7762_4369_8a35_fa0046dea74a; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_1b777f2e_7762_4369_8a35_fa0046dea74a OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_1c390816_d45b_49be_83c2_e48dc514ae5c; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_1c390816_d45b_49be_83c2_e48dc514ae5c
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_1c390816_d45b_49be_83c2_e48dc514ae5c; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_1c390816_d45b_49be_83c2_e48dc514ae5c OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_1e86f6b1_215f_466f_ab15_47926ddc332d; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_1e86f6b1_215f_466f_ab15_47926ddc332d
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_1e86f6b1_215f_466f_ab15_47926ddc332d; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_1e86f6b1_215f_466f_ab15_47926ddc332d OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_1fa76c88_d15a_4e9f_85a1_85880e3842e5; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_1fa76c88_d15a_4e9f_85a1_85880e3842e5
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_1fa76c88_d15a_4e9f_85a1_85880e3842e5; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_1fa76c88_d15a_4e9f_85a1_85880e3842e5 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_20b8b12a_acdb_4a3b_83a3_e1d1d56223da; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_20b8b12a_acdb_4a3b_83a3_e1d1d56223da
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_20b8b12a_acdb_4a3b_83a3_e1d1d56223da; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_20b8b12a_acdb_4a3b_83a3_e1d1d56223da OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_2513d172_38ae_4124_8400_a308944c5155; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_2513d172_38ae_4124_8400_a308944c5155
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_2513d172_38ae_4124_8400_a308944c5155; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_2513d172_38ae_4124_8400_a308944c5155 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_2b905e03_3c6b_42aa_8355_1527463d5554; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_2b905e03_3c6b_42aa_8355_1527463d5554
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_2b905e03_3c6b_42aa_8355_1527463d5554; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_2b905e03_3c6b_42aa_8355_1527463d5554 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_37913bfe_09f8_45de_a4a8_a1527ef2ded1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_37913bfe_09f8_45de_a4a8_a1527ef2ded1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_37913bfe_09f8_45de_a4a8_a1527ef2ded1; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_37913bfe_09f8_45de_a4a8_a1527ef2ded1 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_3bf3328c_e443_434b_a64d_2f48de8372ca; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_3bf3328c_e443_434b_a64d_2f48de8372ca
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_3bf3328c_e443_434b_a64d_2f48de8372ca; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_3bf3328c_e443_434b_a64d_2f48de8372ca OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_4555f02c_4d5a_46b6_a463_1ac25fcc080d; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_4555f02c_4d5a_46b6_a463_1ac25fcc080d
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_4555f02c_4d5a_46b6_a463_1ac25fcc080d; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_4555f02c_4d5a_46b6_a463_1ac25fcc080d OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_47efee85_3323_4657_840b_7637fd465ca8; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_47efee85_3323_4657_840b_7637fd465ca8
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_47efee85_3323_4657_840b_7637fd465ca8; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_47efee85_3323_4657_840b_7637fd465ca8 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_49fb09c7_34c4_455f_9699_50b31cec244c; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_49fb09c7_34c4_455f_9699_50b31cec244c
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_49fb09c7_34c4_455f_9699_50b31cec244c; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_49fb09c7_34c4_455f_9699_50b31cec244c OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_4e0e2c8c_73ca_4f8a_9dd8_c4f194ff2619; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_4e0e2c8c_73ca_4f8a_9dd8_c4f194ff2619
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_4e0e2c8c_73ca_4f8a_9dd8_c4f194ff2619; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_4e0e2c8c_73ca_4f8a_9dd8_c4f194ff2619 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_4ede5de8_bdf4_4fa7_8c6e_29bbabc81821; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_4ede5de8_bdf4_4fa7_8c6e_29bbabc81821
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_4ede5de8_bdf4_4fa7_8c6e_29bbabc81821; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_4ede5de8_bdf4_4fa7_8c6e_29bbabc81821 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_51f79386_2f71_4fa7_b1b8_5fb2967ae1fc; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_51f79386_2f71_4fa7_b1b8_5fb2967ae1fc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_51f79386_2f71_4fa7_b1b8_5fb2967ae1fc; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_51f79386_2f71_4fa7_b1b8_5fb2967ae1fc OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_59d2711d_8e94_4916_a819_f148a14c3750; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_59d2711d_8e94_4916_a819_f148a14c3750
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_59d2711d_8e94_4916_a819_f148a14c3750; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_59d2711d_8e94_4916_a819_f148a14c3750 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_5e18396a_c6de_41d9_982c_f6b1fa483a56; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_5e18396a_c6de_41d9_982c_f6b1fa483a56
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_5e18396a_c6de_41d9_982c_f6b1fa483a56; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_5e18396a_c6de_41d9_982c_f6b1fa483a56 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_60a4fa02_d148_48bb_9b34_7249f6fac1aa; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_60a4fa02_d148_48bb_9b34_7249f6fac1aa
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_60a4fa02_d148_48bb_9b34_7249f6fac1aa; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_60a4fa02_d148_48bb_9b34_7249f6fac1aa OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_62d72491_9336_43cc_b30c_0437ffce7e18; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_62d72491_9336_43cc_b30c_0437ffce7e18
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_62d72491_9336_43cc_b30c_0437ffce7e18; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_62d72491_9336_43cc_b30c_0437ffce7e18 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_65b08fdc_f68d_4c8a_93b8_9b653008f5fd; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_65b08fdc_f68d_4c8a_93b8_9b653008f5fd
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_65b08fdc_f68d_4c8a_93b8_9b653008f5fd; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_65b08fdc_f68d_4c8a_93b8_9b653008f5fd OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_67744ba0_538a_46c1_ac19_fe63fc706857; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_67744ba0_538a_46c1_ac19_fe63fc706857
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_67744ba0_538a_46c1_ac19_fe63fc706857; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_67744ba0_538a_46c1_ac19_fe63fc706857 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_6cd414c8_342b_4746_98eb_712cb63c3904; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_6cd414c8_342b_4746_98eb_712cb63c3904
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_6cd414c8_342b_4746_98eb_712cb63c3904; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_6cd414c8_342b_4746_98eb_712cb63c3904 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_6eb41175_7c84_4c58_9daf_eba19e763437; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_6eb41175_7c84_4c58_9daf_eba19e763437
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_6eb41175_7c84_4c58_9daf_eba19e763437; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_6eb41175_7c84_4c58_9daf_eba19e763437 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_71ef80d5_41bc_4063_b646_fdbc60f289b1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_71ef80d5_41bc_4063_b646_fdbc60f289b1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_71ef80d5_41bc_4063_b646_fdbc60f289b1; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_71ef80d5_41bc_4063_b646_fdbc60f289b1 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_7348db10_41b0_448b_8f84_4dff2e3ef5f6; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_7348db10_41b0_448b_8f84_4dff2e3ef5f6
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_7348db10_41b0_448b_8f84_4dff2e3ef5f6; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_7348db10_41b0_448b_8f84_4dff2e3ef5f6 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_75e435b0_6ece_4408_ae03_e4e2e2638e68; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_75e435b0_6ece_4408_ae03_e4e2e2638e68
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_75e435b0_6ece_4408_ae03_e4e2e2638e68; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_75e435b0_6ece_4408_ae03_e4e2e2638e68 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_7624580c_4c78_465a_9d35_9d270636139d; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_7624580c_4c78_465a_9d35_9d270636139d
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_7624580c_4c78_465a_9d35_9d270636139d; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_7624580c_4c78_465a_9d35_9d270636139d OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_76920326_3350_451f_8fa8_ec15bfa53dd6; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_76920326_3350_451f_8fa8_ec15bfa53dd6
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_76920326_3350_451f_8fa8_ec15bfa53dd6; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_76920326_3350_451f_8fa8_ec15bfa53dd6 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_79fb99a6_0aab_4145_b770_5b636064fe70; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_79fb99a6_0aab_4145_b770_5b636064fe70
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_79fb99a6_0aab_4145_b770_5b636064fe70; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_79fb99a6_0aab_4145_b770_5b636064fe70 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_83eca9d7_574a_4a91_a84e_69c61d89c7b7; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_83eca9d7_574a_4a91_a84e_69c61d89c7b7
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_83eca9d7_574a_4a91_a84e_69c61d89c7b7; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_83eca9d7_574a_4a91_a84e_69c61d89c7b7 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_84517f16_fbdd_4ea1_9a7a_1aab35680385; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_84517f16_fbdd_4ea1_9a7a_1aab35680385
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_84517f16_fbdd_4ea1_9a7a_1aab35680385; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_84517f16_fbdd_4ea1_9a7a_1aab35680385 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_9244085f_3c3d_49db_94b5_a14d5a3a6dd9; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_9244085f_3c3d_49db_94b5_a14d5a3a6dd9
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_9244085f_3c3d_49db_94b5_a14d5a3a6dd9; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_9244085f_3c3d_49db_94b5_a14d5a3a6dd9 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_977e5315_35b6_48eb_8400_a7205c4b6160; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_977e5315_35b6_48eb_8400_a7205c4b6160
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_977e5315_35b6_48eb_8400_a7205c4b6160; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_977e5315_35b6_48eb_8400_a7205c4b6160 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_a3309f91_9669_45f1_b92d_2d54f51b3f52; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_a3309f91_9669_45f1_b92d_2d54f51b3f52
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_a3309f91_9669_45f1_b92d_2d54f51b3f52; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_a3309f91_9669_45f1_b92d_2d54f51b3f52 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_a57c1a2a_6f72_4701_a69f_b963e25cdd75; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_a57c1a2a_6f72_4701_a69f_b963e25cdd75
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_a57c1a2a_6f72_4701_a69f_b963e25cdd75; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_a57c1a2a_6f72_4701_a69f_b963e25cdd75 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_a61d88ef_4fe8_418e_a475_ded2769b1779; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_a61d88ef_4fe8_418e_a475_ded2769b1779
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_a61d88ef_4fe8_418e_a475_ded2769b1779; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_a61d88ef_4fe8_418e_a475_ded2769b1779 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_a65a70f8_7dee_40f0_8ba0_2812f3a56ebc; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_a65a70f8_7dee_40f0_8ba0_2812f3a56ebc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_a65a70f8_7dee_40f0_8ba0_2812f3a56ebc; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_a65a70f8_7dee_40f0_8ba0_2812f3a56ebc OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_a7828352_ba1d_4475_8763_d92303422dd6; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_a7828352_ba1d_4475_8763_d92303422dd6
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_a7828352_ba1d_4475_8763_d92303422dd6; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_a7828352_ba1d_4475_8763_d92303422dd6 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_ac2d9bf4_2c24_4c3b_9eed_571e9f04c0b5; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_ac2d9bf4_2c24_4c3b_9eed_571e9f04c0b5
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_ac2d9bf4_2c24_4c3b_9eed_571e9f04c0b5; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_ac2d9bf4_2c24_4c3b_9eed_571e9f04c0b5 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_af2227b0_b356_40b0_9af4_6b8d4d281dcf; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_af2227b0_b356_40b0_9af4_6b8d4d281dcf
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_af2227b0_b356_40b0_9af4_6b8d4d281dcf; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_af2227b0_b356_40b0_9af4_6b8d4d281dcf OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_bccd32f2_a3c4_4d33_847a_ff462013bf84; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_bccd32f2_a3c4_4d33_847a_ff462013bf84
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_bccd32f2_a3c4_4d33_847a_ff462013bf84; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_bccd32f2_a3c4_4d33_847a_ff462013bf84 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_c329a322_e9dd_4f7f_b525_54b028e0c440; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_c329a322_e9dd_4f7f_b525_54b028e0c440
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_c329a322_e9dd_4f7f_b525_54b028e0c440; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_c329a322_e9dd_4f7f_b525_54b028e0c440 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_c8605916_d3d8_4ba4_aaeb_76a6fc5a453d; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_c8605916_d3d8_4ba4_aaeb_76a6fc5a453d
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_c8605916_d3d8_4ba4_aaeb_76a6fc5a453d; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_c8605916_d3d8_4ba4_aaeb_76a6fc5a453d OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_d0572d85_1bcf_4b1b_854d_3b37d384ccbc; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_d0572d85_1bcf_4b1b_854d_3b37d384ccbc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_d0572d85_1bcf_4b1b_854d_3b37d384ccbc; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_d0572d85_1bcf_4b1b_854d_3b37d384ccbc OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_d23c61af_c6e2_45ce_b9fb_d11c3d9961fe; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_d23c61af_c6e2_45ce_b9fb_d11c3d9961fe
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_d23c61af_c6e2_45ce_b9fb_d11c3d9961fe; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_d23c61af_c6e2_45ce_b9fb_d11c3d9961fe OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_d37bfdac_b51c_412b_8499_7c1f128f1f9a; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_d37bfdac_b51c_412b_8499_7c1f128f1f9a
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_d37bfdac_b51c_412b_8499_7c1f128f1f9a; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_d37bfdac_b51c_412b_8499_7c1f128f1f9a OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_d9047127_cd74_4420_8559_f9317db5ffe2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_d9047127_cd74_4420_8559_f9317db5ffe2
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_d9047127_cd74_4420_8559_f9317db5ffe2; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_d9047127_cd74_4420_8559_f9317db5ffe2 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_dc31280e_35bd_4168_abad_cb69d97d3da4; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_dc31280e_35bd_4168_abad_cb69d97d3da4
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_dc31280e_35bd_4168_abad_cb69d97d3da4; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_dc31280e_35bd_4168_abad_cb69d97d3da4 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_df397f1a_a84d_4c4d_8ec5_630505fe0f95; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_df397f1a_a84d_4c4d_8ec5_630505fe0f95
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_df397f1a_a84d_4c4d_8ec5_630505fe0f95; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_df397f1a_a84d_4c4d_8ec5_630505fe0f95 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_eebd1b95_0902_4e0e_ad93_5da20411e001; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_eebd1b95_0902_4e0e_ad93_5da20411e001
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_eebd1b95_0902_4e0e_ad93_5da20411e001; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_eebd1b95_0902_4e0e_ad93_5da20411e001 OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_f8223b47_9433_478a_8a86_f96e375e46fd; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_f8223b47_9433_478a_8a86_f96e375e46fd
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_f8223b47_9433_478a_8a86_f96e375e46fd; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_f8223b47_9433_478a_8a86_f96e375e46fd OWNED BY public.scans.scan_number;


--
-- Name: build_scans_seq_f829b066_5639_479b_8472_528fcdea9b84; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.build_scans_seq_f829b066_5639_479b_8472_528fcdea9b84
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: build_scans_seq_f829b066_5639_479b_8472_528fcdea9b84; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.build_scans_seq_f829b066_5639_479b_8472_528fcdea9b84 OWNED BY public.scans.scan_number;


--
-- Name: builds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.builds (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    project_id uuid,
    s3_url text,
    agent_access_token uuid DEFAULT public.gen_random_uuid() NOT NULL,
    build_number integer,
    git_remote text,
    git_branch text,
    git_hash text,
    pull_request_id text,
    source_type public.builds_source_type NOT NULL,
    existing_github_review_id text,
    existing_github_check_id bigint
);


--
-- Name: continuity_containers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.continuity_containers (
    id uuid NOT NULL,
    identity_id uuid,
    name character varying(255) NOT NULL,
    payload jsonb,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid
);


--
-- Name: courier_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courier_messages (
    id uuid NOT NULL,
    type integer NOT NULL,
    status integer NOT NULL,
    body text NOT NULL,
    subject character varying(255) NOT NULL,
    recipient character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    template_type character varying(255) DEFAULT ''::character varying NOT NULL,
    template_data bytea,
    nid uuid
);


--
-- Name: github_repositories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.github_repositories (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    github_id integer,
    git_url text NOT NULL,
    project_id uuid NOT NULL,
    traits jsonb NOT NULL,
    github_node_id text,
    default_branch text
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    repo text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    organization_id uuid,
    settings_id uuid DEFAULT public.insert_default_settings() NOT NULL
);

--
-- Name: findings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.findings (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    vulnerability_id uuid NOT NULL,
    scan_id uuid NOT NULL,
    build_id uuid NOT NULL,
    fix_state public.fix_state_enum NOT NULL,
    fix_versions text[],
    package_name text NOT NULL,
    version text NOT NULL,
    version_matcher text NOT NULL,
    type text NOT NULL,
    locations text[] NOT NULL,
    language text NOT NULL,
    purl text NOT NULL,
    virtual_path text,
    matcher text NOT NULL,
    dedupe_slug text NOT NULL,
    severity public.severity_enum NOT NULL
);


--
-- Name: guide_related_guides; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.guide_related_guides (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    from_guide_id uuid NOT NULL,
    to_guide_unique_id text NOT NULL
);


--
-- Name: guide_vulnerabilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.guide_vulnerabilities (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    guide_id uuid NOT NULL,
    vulnerability_id uuid NOT NULL
);


--
-- Name: guides; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.guides (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    guide_unique_id text NOT NULL,
    data_source_link text NOT NULL,
    body text NOT NULL,
    severity public.severity_enum NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    tags text[] NOT NULL,
    metadata jsonb NOT NULL,
    metadata_schema_version integer NOT NULL
);


--
-- Name: identities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identities (
    id uuid NOT NULL,
    schema_id character varying(2048) NOT NULL,
    traits jsonb NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid,
    state character varying(255) DEFAULT 'active'::character varying NOT NULL,
    state_changed_at timestamp without time zone
);


--
-- Name: identity_credential_identifiers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_credential_identifiers (
    id uuid NOT NULL,
    identifier character varying(255) NOT NULL,
    identity_credential_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid,
    identity_credential_type_id uuid NOT NULL
);


--
-- Name: identity_credential_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_credential_types (
    id uuid NOT NULL,
    name character varying(32) NOT NULL
);


--
-- Name: identity_credentials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_credentials (
    id uuid NOT NULL,
    config jsonb NOT NULL,
    identity_credential_type_id uuid NOT NULL,
    identity_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid,
    version integer DEFAULT 0 NOT NULL
);


--
-- Name: identity_recovery_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_recovery_addresses (
    id uuid NOT NULL,
    via character varying(16) NOT NULL,
    value character varying(400) NOT NULL,
    identity_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid
);


--
-- Name: identity_recovery_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_recovery_tokens (
    id uuid NOT NULL,
    token character varying(64) NOT NULL,
    used boolean DEFAULT false NOT NULL,
    used_at timestamp without time zone,
    identity_recovery_address_id uuid,
    selfservice_recovery_flow_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone DEFAULT '2000-01-01 00:00:00'::timestamp without time zone NOT NULL,
    issued_at timestamp without time zone DEFAULT '2000-01-01 00:00:00'::timestamp without time zone NOT NULL,
    nid uuid,
    identity_id uuid NOT NULL
);


--
-- Name: identity_verifiable_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_verifiable_addresses (
    id uuid NOT NULL,
    status character varying(16) NOT NULL,
    via character varying(16) NOT NULL,
    verified boolean NOT NULL,
    value character varying(400) NOT NULL,
    verified_at timestamp without time zone,
    identity_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid
);


--
-- Name: identity_verification_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identity_verification_tokens (
    id uuid NOT NULL,
    token character varying(64) NOT NULL,
    used boolean DEFAULT false NOT NULL,
    used_at timestamp without time zone,
    expires_at timestamp without time zone NOT NULL,
    issued_at timestamp without time zone NOT NULL,
    identity_verifiable_address_id uuid NOT NULL,
    selfservice_verification_flow_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    nid uuid
);


--
-- Name: ignored_vulnerabilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ignored_vulnerabilities (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    vulnerability_id uuid NOT NULL,
    creator_id uuid,
    locations jsonb NOT NULL,
    note text NOT NULL
);


--
-- Name: instances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instances (
    instance_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_heartbeat timestamp without time zone DEFAULT now() NOT NULL,
    agent_access_token uuid
);


--
-- Name: manifest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manifest (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    build_id uuid NOT NULL,
    path text
);


--
-- Name: manifest_dependency; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manifest_dependency (
    manifest_id uuid NOT NULL,
    labels jsonb,
    manifest_dependency_node_id uuid NOT NULL
);

--
-- Name: manifest_dependency_node; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manifest_dependency_node (
    id uuid NOT NULL,
    range text NOT NULL,
    release_id uuid NOT NULL
);


--
-- Name: manifest_dependency_edge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manifest_dependency_edge (
    parent_id uuid NOT NULL,
    child_id uuid NOT NULL
);


--
-- Name: manifests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manifests (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    project_id uuid NOT NULL,
    s3_url text NOT NULL,
    filename text NOT NULL,
    status text,
    message text,
    s3_key text NOT NULL,
    build_id uuid
);


--
-- Name: networks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.networks (
    id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: organization_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization_user (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    role public.organization_user_role DEFAULT 'normal'::public.organization_user_role NOT NULL
);


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying(200) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    creator_id uuid,
    installation_id integer,
    github_id integer,
    github_owner_type text,
    github_node_id text,
    settings_id uuid DEFAULT public.insert_default_settings() NOT NULL
);


--
-- Name: project_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_access_tokens (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    project_uuid uuid NOT NULL,
    access_token uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text,
    created_by_user_id uuid,
    last_used timestamp without time zone
);


--
-- Name: project_builds_sequence_21db39f0_f2c4_42be_83c5_f59ce2f07cbf; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_21db39f0_f2c4_42be_83c5_f59ce2f07cbf
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_21db39f0_f2c4_42be_83c5_f59ce2f07cbf; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_21db39f0_f2c4_42be_83c5_f59ce2f07cbf OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_4337eb89_cede_4ea8_8dae_18ce39f89cb0; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_4337eb89_cede_4ea8_8dae_18ce39f89cb0
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_4337eb89_cede_4ea8_8dae_18ce39f89cb0; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_4337eb89_cede_4ea8_8dae_18ce39f89cb0 OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_4a767ab4_8d17_42ab_8773_3a8137c8da29; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_4a767ab4_8d17_42ab_8773_3a8137c8da29
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_4a767ab4_8d17_42ab_8773_3a8137c8da29; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_4a767ab4_8d17_42ab_8773_3a8137c8da29 OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_5c382487_cd46_4ae5_9b14_b305a53de4ac; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_5c382487_cd46_4ae5_9b14_b305a53de4ac
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_5c382487_cd46_4ae5_9b14_b305a53de4ac; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_5c382487_cd46_4ae5_9b14_b305a53de4ac OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_a9663a70_31ad_4a64_ac76_4f8bd394b389; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_a9663a70_31ad_4a64_ac76_4f8bd394b389
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_a9663a70_31ad_4a64_ac76_4f8bd394b389; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_a9663a70_31ad_4a64_ac76_4f8bd394b389 OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_ea6893bb_e61b_418a_a887_6ef5e2ec487c; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_ea6893bb_e61b_418a_a887_6ef5e2ec487c
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_ea6893bb_e61b_418a_a887_6ef5e2ec487c; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_ea6893bb_e61b_418a_a887_6ef5e2ec487c OWNED BY public.projects.id;


--
-- Name: project_builds_sequence_ecf9251b_a7c9_437e_98f7_0e9200f74c53; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_builds_sequence_ecf9251b_a7c9_437e_98f7_0e9200f74c53
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_builds_sequence_ecf9251b_a7c9_437e_98f7_0e9200f74c53; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_builds_sequence_ecf9251b_a7c9_437e_98f7_0e9200f74c53 OWNED BY public.projects.id;


--
-- Name: schema_migration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migration (
    version character varying(48) NOT NULL,
    version_self integer DEFAULT 0 NOT NULL
);


--
-- Name: selfservice_errors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_errors (
    id uuid NOT NULL,
    errors jsonb NOT NULL,
    seen_at timestamp without time zone,
    was_seen boolean NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    csrf_token character varying(255) DEFAULT ''::character varying NOT NULL,
    nid uuid
);


--
-- Name: selfservice_login_flows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_login_flows (
    id uuid NOT NULL,
    request_url character varying(2048) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    active_method character varying(32) NOT NULL,
    csrf_token character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    forced boolean DEFAULT false NOT NULL,
    type character varying(16) DEFAULT 'browser'::character varying NOT NULL,
    ui jsonb,
    nid uuid,
    requested_aal character varying(4) DEFAULT 'aal1'::character varying NOT NULL,
    internal_context jsonb NOT NULL
);


--
-- Name: selfservice_recovery_flows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_recovery_flows (
    id uuid NOT NULL,
    request_url character varying(2048) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    active_method character varying(32),
    csrf_token character varying(255) NOT NULL,
    state character varying(32) NOT NULL,
    recovered_identity_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying(16) DEFAULT 'browser'::character varying NOT NULL,
    ui jsonb,
    nid uuid
);


--
-- Name: selfservice_registration_flows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_registration_flows (
    id uuid NOT NULL,
    request_url character varying(2048) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    active_method character varying(32) NOT NULL,
    csrf_token character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying(16) DEFAULT 'browser'::character varying NOT NULL,
    ui jsonb,
    nid uuid,
    internal_context jsonb NOT NULL
);


--
-- Name: selfservice_settings_flows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_settings_flows (
    id uuid NOT NULL,
    request_url character varying(2048) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    identity_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    active_method character varying(32),
    state character varying(255) DEFAULT 'show_form'::character varying NOT NULL,
    type character varying(16) DEFAULT 'browser'::character varying NOT NULL,
    ui jsonb,
    nid uuid,
    internal_context jsonb NOT NULL
);


--
-- Name: selfservice_verification_flows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.selfservice_verification_flows (
    id uuid NOT NULL,
    request_url character varying(2048) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    csrf_token character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying(16) DEFAULT 'browser'::character varying NOT NULL,
    state character varying(255) DEFAULT 'show_form'::character varying NOT NULL,
    active_method character varying(32),
    ui jsonb,
    nid uuid
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    authenticated_at timestamp without time zone NOT NULL,
    identity_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    token character varying(32),
    active boolean DEFAULT false,
    nid uuid,
    logout_token character varying(32),
    aal character varying(4) DEFAULT 'aal1'::character varying NOT NULL,
    authentication_methods jsonb NOT NULL
);


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.settings (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_org_settings boolean,
    pr_feedback_disabled boolean,
    pr_check_enabled boolean DEFAULT true
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    github_id text,
    github_node_id text,
    kratos_id uuid,
    role public.user_role DEFAULT 'organization_user'::public.user_role NOT NULL
);


--
-- Name: webhook_cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.webhook_cache (
    delivery_id uuid NOT NULL,
    event_type text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    signature_256 text NOT NULL,
    installation_id integer,
    data jsonb NOT NULL,
    sqs_message_id text
);


--
-- Name: affected; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.affected (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    vulnerability_id uuid NOT NULL,
    package_id uuid NOT NULL,
    ecosystem_specific jsonb,
    database_specific jsonb
);


--
-- Name: affected_range_event; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.affected_range_event (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    affected_id uuid,
    type public.affected_range_type NOT NULL,
    event text NOT NULL,
    version text NOT NULL,
    database_specific jsonb
);


--
-- Name: affected_version; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.affected_version (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    affected_id uuid,
    version text NOT NULL,
    database_specific jsonb
);


--
-- Name: credit; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.credit (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    vulnerability_id uuid,
    name text NOT NULL,
    contact text[]
);


--
-- Name: equivalent; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.equivalent (
    a uuid NOT NULL,
    b uuid NOT NULL
);


--
-- Name: range; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.range (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    introduced text,
    fixed text,
    affected_id uuid NOT NULL
);


--
-- Name: reference; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.reference (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    vulnerability_id uuid,
    type public.reference_type NOT NULL,
    url text NOT NULL
);


--
-- Name: severity; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.severity (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    vulnerability_id uuid,
    source text NOT NULL,
    type text NOT NULL,
    score text NOT NULL
);


--
-- Name: vulnerability; Type: TABLE; Schema: vulnerability; Owner: -
--

CREATE TABLE vulnerability.vulnerability (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    source text NOT NULL,
    source_id text NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    published timestamp with time zone,
    withdrawn timestamp with time zone,
    summary text,
    details text,
    database_specific jsonb,
    upstream_data jsonb,
    cvss_score real,
    reviewed_by_source boolean
);




--
-- Name: license license_name_idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.license
    ADD CONSTRAINT license_name_idx UNIQUE (name);


--
-- Name: license license_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.license
    ADD CONSTRAINT license_pkey PRIMARY KEY (id);


--
-- Name: maintainer maintainer_package_manager_email_idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.maintainer
    ADD CONSTRAINT maintainer_package_manager_email_idx UNIQUE (package_manager, email);


--
-- Name: maintainer maintainer_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.maintainer
    ADD CONSTRAINT maintainer_pkey PRIMARY KEY (id);


--
-- Name: package_maintainer package_maintainer_package_id_maintainer_id_idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.package_maintainer
    ADD CONSTRAINT package_maintainer_package_id_maintainer_id_idx UNIQUE (package_id, maintainer_id);


--
-- Name: package package_package_manager_custom_registry_name_idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.package
    ADD CONSTRAINT package_package_manager_custom_registry_name_idx UNIQUE (package_manager, custom_registry, name);


--
-- Name: package package_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.package
    ADD CONSTRAINT package_pkey PRIMARY KEY (id);


--
-- Name: release_dependency release_dependency_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_dependency
    ADD CONSTRAINT release_dependency_pkey PRIMARY KEY (id);


--
-- Name: release_dependency release_dependency_release_id_package_name_package_version__idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_dependency
    ADD CONSTRAINT release_dependency_release_id_package_name_package_version__idx UNIQUE (release_id, package_name, package_version_query);


--
-- Name: release_license release_license_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_license
    ADD CONSTRAINT release_license_pkey PRIMARY KEY (id);


--
-- Name: release release_package_id_version_idx; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release
    ADD CONSTRAINT release_package_id_version_idx UNIQUE (package_id, version);


--
-- Name: release release_pkey; Type: CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release
    ADD CONSTRAINT release_pkey PRIMARY KEY (id);


--
-- Name: build_dependency_relationship build_dependency_relationship_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.build_dependency_relationship
    ADD CONSTRAINT build_dependency_relationship_pkey PRIMARY KEY (id);


--
-- Name: builds builds_agent_access_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_agent_access_token_key UNIQUE (agent_access_token);


--
-- Name: builds builds_build_number_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_build_number_project_id_key UNIQUE (build_number, project_id);


--
-- Name: builds builds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_pkey PRIMARY KEY (id);


--
-- Name: continuity_containers continuity_containers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.continuity_containers
    ADD CONSTRAINT continuity_containers_pkey PRIMARY KEY (id);


--
-- Name: courier_messages courier_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courier_messages
    ADD CONSTRAINT courier_messages_pkey PRIMARY KEY (id);


--
-- Name: findings findings_dedupe_slug_build_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.findings
    ADD CONSTRAINT findings_dedupe_slug_build_id_key UNIQUE (dedupe_slug, build_id);


--
-- Name: findings findings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.findings
    ADD CONSTRAINT findings_pkey PRIMARY KEY (id);


--
-- Name: github_repositories github_repositories_github_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.github_repositories
    ADD CONSTRAINT github_repositories_github_id_key UNIQUE (github_id);


--
-- Name: github_repositories github_repositories_github_node_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.github_repositories
    ADD CONSTRAINT github_repositories_github_node_id_key UNIQUE (github_node_id);


--
-- Name: github_repositories github_repositories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.github_repositories
    ADD CONSTRAINT github_repositories_pkey PRIMARY KEY (id);


--
-- Name: guide_related_guides guide_related_guides_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_related_guides
    ADD CONSTRAINT guide_related_guides_pkey PRIMARY KEY (id);


--
-- Name: guide_related_guides guide_related_guides_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_related_guides
    ADD CONSTRAINT guide_related_guides_unique UNIQUE (from_guide_id, to_guide_unique_id);


--
-- Name: guide_vulnerabilities guide_vulnerabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_vulnerabilities
    ADD CONSTRAINT guide_vulnerabilities_pkey PRIMARY KEY (id);


--
-- Name: guide_vulnerabilities guide_vulnerabilities_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_vulnerabilities
    ADD CONSTRAINT guide_vulnerabilities_unique UNIQUE (guide_id, vulnerability_id);


--
-- Name: guides guides_data_source_link_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_data_source_link_key UNIQUE (data_source_link);


--
-- Name: guides guides_guide_unique_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_guide_unique_id_key UNIQUE (guide_unique_id);


--
-- Name: guides guides_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identity_credential_identifiers identity_credential_identifiers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credential_identifiers
    ADD CONSTRAINT identity_credential_identifiers_pkey PRIMARY KEY (id);


--
-- Name: identity_credential_types identity_credential_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credential_types
    ADD CONSTRAINT identity_credential_types_pkey PRIMARY KEY (id);


--
-- Name: identity_credentials identity_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credentials
    ADD CONSTRAINT identity_credentials_pkey PRIMARY KEY (id);


--
-- Name: identity_recovery_addresses identity_recovery_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_addresses
    ADD CONSTRAINT identity_recovery_addresses_pkey PRIMARY KEY (id);


--
-- Name: identity_recovery_tokens identity_recovery_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_tokens
    ADD CONSTRAINT identity_recovery_tokens_pkey PRIMARY KEY (id);


--
-- Name: identity_verifiable_addresses identity_verifiable_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verifiable_addresses
    ADD CONSTRAINT identity_verifiable_addresses_pkey PRIMARY KEY (id);


--
-- Name: identity_verification_tokens identity_verification_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verification_tokens
    ADD CONSTRAINT identity_verification_tokens_pkey PRIMARY KEY (id);


--
-- Name: ignored_vulnerabilities ignored_vulnerabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ignored_vulnerabilities
    ADD CONSTRAINT ignored_vulnerabilities_pkey PRIMARY KEY (id);


--
-- Name: ignored_vulnerabilities ignored_vulnerabilities_project_id_vulnerability_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ignored_vulnerabilities
    ADD CONSTRAINT ignored_vulnerabilities_project_id_vulnerability_id_key UNIQUE (project_id, vulnerability_id);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (instance_id);


--
-- Name: manifest_dependency_node manifest_dependency_node_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency_node
    ADD CONSTRAINT manifest_dependency_node_pkey PRIMARY KEY (id);


--
-- Name: manifest manifest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest
    ADD CONSTRAINT manifest_pkey PRIMARY KEY (id);


--
-- Name: manifests manifests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_pkey PRIMARY KEY (id);


--
-- Name: manifests manifests_s3_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_s3_url_key UNIQUE (s3_url);


--
-- Name: networks networks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.networks
    ADD CONSTRAINT networks_pkey PRIMARY KEY (id);


--
-- Name: organization_user organization_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_user
    ADD CONSTRAINT organization_user_pkey PRIMARY KEY (id);


--
-- Name: organization_user organization_user_user_id_organization_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_user
    ADD CONSTRAINT organization_user_user_id_organization_id_key UNIQUE (user_id, organization_id);


--
-- Name: organizations organizations_github_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_github_id_key UNIQUE (github_id);


--
-- Name: organizations organizations_github_node_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_github_node_id_key UNIQUE (github_node_id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: project_access_tokens project_access_tokens_access_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_access_tokens
    ADD CONSTRAINT project_access_tokens_access_token_key UNIQUE (access_token);


--
-- Name: project_access_tokens project_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_access_tokens
    ADD CONSTRAINT project_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: projects projects_name_organization_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_name_organization_id_key UNIQUE (name, organization_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);


--
-- Name: scans scans_scan_number_build_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_scan_number_build_id_key UNIQUE (scan_number, build_id);


--
-- Name: selfservice_errors selfservice_errors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_errors
    ADD CONSTRAINT selfservice_errors_pkey PRIMARY KEY (id);


--
-- Name: selfservice_login_flows selfservice_login_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_login_flows
    ADD CONSTRAINT selfservice_login_requests_pkey PRIMARY KEY (id);


--
-- Name: selfservice_settings_flows selfservice_profile_management_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_settings_flows
    ADD CONSTRAINT selfservice_profile_management_requests_pkey PRIMARY KEY (id);


--
-- Name: selfservice_recovery_flows selfservice_recovery_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_recovery_flows
    ADD CONSTRAINT selfservice_recovery_requests_pkey PRIMARY KEY (id);


--
-- Name: selfservice_registration_flows selfservice_registration_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_registration_flows
    ADD CONSTRAINT selfservice_registration_requests_pkey PRIMARY KEY (id);


--
-- Name: selfservice_verification_flows selfservice_verification_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_verification_flows
    ADD CONSTRAINT selfservice_verification_requests_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: users users_github_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_github_id_key UNIQUE (github_id);


--
-- Name: users users_github_node_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_github_node_id_key UNIQUE (github_node_id);


--
-- Name: users users_kratos_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_kratos_id_unique UNIQUE (kratos_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webhook_cache webhook_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.webhook_cache
    ADD CONSTRAINT webhook_cache_pkey PRIMARY KEY (delivery_id);


--
-- Name: affected affected_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected
    ADD CONSTRAINT affected_pkey PRIMARY KEY (id);


--
-- Name: affected_range_event affected_range_event_affected_id_type_event_version_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_range_event
    ADD CONSTRAINT affected_range_event_affected_id_type_event_version_idx UNIQUE (affected_id, type, event, version);


--
-- Name: affected_range_event affected_range_event_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_range_event
    ADD CONSTRAINT affected_range_event_pkey PRIMARY KEY (id);


--
-- Name: affected_version affected_version_affected_id_type_version; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_version
    ADD CONSTRAINT affected_version_affected_id_type_version UNIQUE (affected_id, version);


--
-- Name: affected_version affected_version_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_version
    ADD CONSTRAINT affected_version_pkey PRIMARY KEY (id);


--
-- Name: affected affected_vulnerability_id_package_id_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected
    ADD CONSTRAINT affected_vulnerability_id_package_id_idx UNIQUE (vulnerability_id, package_id);


--
-- Name: credit credit_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.credit
    ADD CONSTRAINT credit_pkey PRIMARY KEY (id);


--
-- Name: credit credit_vulnerability_id_name; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.credit
    ADD CONSTRAINT credit_vulnerability_id_name UNIQUE (vulnerability_id, name);


--
-- Name: equivalent equivalent_a_b_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.equivalent
    ADD CONSTRAINT equivalent_a_b_idx UNIQUE (a, b);


--
-- Name: range range_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.range
    ADD CONSTRAINT range_pkey PRIMARY KEY (id);


--
-- Name: range range_uniq; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.range
    ADD CONSTRAINT range_uniq UNIQUE (affected_id, introduced, fixed);


--
-- Name: reference reference_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.reference
    ADD CONSTRAINT reference_pkey PRIMARY KEY (id);


--
-- Name: reference reference_vulnerability_id_type_url_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.reference
    ADD CONSTRAINT reference_vulnerability_id_type_url_idx UNIQUE (vulnerability_id, type, url);


--
-- Name: severity severity_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.severity
    ADD CONSTRAINT severity_pkey PRIMARY KEY (id);


--
-- Name: severity severity_vulnerability_id_source_type_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.severity
    ADD CONSTRAINT severity_vulnerability_id_source_type_idx UNIQUE (vulnerability_id, source, type);


--
-- Name: vulnerability vulnerability_pkey; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.vulnerability
    ADD CONSTRAINT vulnerability_pkey PRIMARY KEY (id);


--
-- Name: vulnerability vulnerability_source_source_id_idx; Type: CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.vulnerability
    ADD CONSTRAINT vulnerability_source_source_id_idx UNIQUE (source, source_id);



--
-- Name: package_last_fetch; Type: INDEX; Schema: package; Owner: -
--

CREATE INDEX package_last_fetch ON package.package USING btree (last_successful_fetch);


--
-- Name: release_license_release_id_idx; Type: INDEX; Schema: package; Owner: -
--

CREATE INDEX release_license_release_id_idx ON package.release_license USING btree (release_id);


--
-- Name: build_branch_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_branch_index ON public.builds USING btree (git_branch);


--
-- Name: build_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_created_at_idx ON public.builds USING btree (project_id, build_number);


--
-- Name: build_dependency_relationship_build_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_dependency_relationship_build_id_idx ON public.build_dependency_relationship USING btree (build_id);


--
-- Name: build_dependency_relationship_depended_by_relationship_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_dependency_relationship_depended_by_relationship_id_idx ON public.build_dependency_relationship USING btree (depended_by_relationship_id);


--
-- Name: build_dependency_relationship_release_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_dependency_relationship_release_id_idx ON public.build_dependency_relationship USING btree (release_id);


--
-- Name: build_project_id_and_build_number_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX build_project_id_and_build_number_idx ON public.builds USING btree (project_id, build_number);


--
-- Name: continuity_containers_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX continuity_containers_nid_idx ON public.continuity_containers USING btree (id, nid);


--
-- Name: courier_messages_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX courier_messages_nid_idx ON public.courier_messages USING btree (id, nid);


--
-- Name: courier_messages_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX courier_messages_status_idx ON public.courier_messages USING btree (status);


--
-- Name: finding_build_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX finding_build_id_index ON public.findings USING btree (build_id);


--
-- Name: finding_severity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX finding_severity_index ON public.findings USING btree (build_id, severity);


--
-- Name: finding_vuln_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX finding_vuln_id_index ON public.findings USING btree (vulnerability_id);


--
-- Name: identities_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identities_nid_idx ON public.identities USING btree (id, nid);


--
-- Name: identity_credential_identifiers_identifier_nid_type_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_credential_identifiers_identifier_nid_type_uq_idx ON public.identity_credential_identifiers USING btree (nid, identity_credential_type_id, identifier);


--
-- Name: identity_credential_identifiers_nid_identity_credential_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_credential_identifiers_nid_identity_credential_id_idx ON public.identity_credential_identifiers USING btree (identity_credential_id, nid);


--
-- Name: identity_credential_identifiers_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_credential_identifiers_nid_idx ON public.identity_credential_identifiers USING btree (id, nid);


--
-- Name: identity_credential_types_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_credential_types_name_idx ON public.identity_credential_types USING btree (name);


--
-- Name: identity_credentials_nid_identity_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_credentials_nid_identity_id_idx ON public.identity_credentials USING btree (identity_id, nid);


--
-- Name: identity_credentials_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_credentials_nid_idx ON public.identity_credentials USING btree (id, nid);


--
-- Name: identity_recovery_addresses_code_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_recovery_addresses_code_idx ON public.identity_recovery_tokens USING btree (token);


--
-- Name: identity_recovery_addresses_code_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_recovery_addresses_code_uq_idx ON public.identity_recovery_tokens USING btree (token);


--
-- Name: identity_recovery_addresses_nid_identity_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_recovery_addresses_nid_identity_id_idx ON public.identity_recovery_addresses USING btree (identity_id, nid);


--
-- Name: identity_recovery_addresses_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_recovery_addresses_nid_idx ON public.identity_recovery_addresses USING btree (id, nid);


--
-- Name: identity_recovery_addresses_status_via_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_recovery_addresses_status_via_idx ON public.identity_recovery_addresses USING btree (nid, via, value);


--
-- Name: identity_recovery_addresses_status_via_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_recovery_addresses_status_via_uq_idx ON public.identity_recovery_addresses USING btree (nid, via, value);


--
-- Name: identity_recovery_tokens_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_recovery_tokens_nid_idx ON public.identity_recovery_tokens USING btree (id, nid);


--
-- Name: identity_verifiable_addresses_nid_identity_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verifiable_addresses_nid_identity_id_idx ON public.identity_verifiable_addresses USING btree (identity_id, nid);


--
-- Name: identity_verifiable_addresses_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verifiable_addresses_nid_idx ON public.identity_verifiable_addresses USING btree (id, nid);


--
-- Name: identity_verifiable_addresses_status_via_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verifiable_addresses_status_via_idx ON public.identity_verifiable_addresses USING btree (nid, via, value);


--
-- Name: identity_verifiable_addresses_status_via_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_verifiable_addresses_status_via_uq_idx ON public.identity_verifiable_addresses USING btree (nid, via, value);


--
-- Name: identity_verification_tokens_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verification_tokens_nid_idx ON public.identity_verification_tokens USING btree (id, nid);


--
-- Name: identity_verification_tokens_token_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verification_tokens_token_idx ON public.identity_verification_tokens USING btree (token);


--
-- Name: identity_verification_tokens_token_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX identity_verification_tokens_token_uq_idx ON public.identity_verification_tokens USING btree (token);


--
-- Name: identity_verification_tokens_verifiable_address_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verification_tokens_verifiable_address_id_idx ON public.identity_verification_tokens USING btree (identity_verifiable_address_id);


--
-- Name: identity_verification_tokens_verification_flow_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX identity_verification_tokens_verification_flow_id_idx ON public.identity_verification_tokens USING btree (selfservice_verification_flow_id);


--
-- Name: manifest_build_id_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX manifest_build_id_path_idx ON public.manifest USING btree (build_id, path);


--
-- Name: manifest_dependency_edge_parent_id_child_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX manifest_dependency_edge_parent_id_child_id_idx ON public.manifest_dependency_edge USING btree (parent_id, child_id);


--
-- Name: manifest_dependency_edge_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX manifest_dependency_edge_parent_id_idx ON public.manifest_dependency_edge USING btree (parent_id);


--
-- Name: manifest_dependency_manifest_id_manifest_dependency_node_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX manifest_dependency_manifest_id_manifest_dependency_node_id_idx ON public.manifest_dependency USING btree (manifest_id, manifest_dependency_node_id);


--
-- Name: manifest_s3_key_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX manifest_s3_key_index ON public.manifests USING btree (s3_key);


--
-- Name: schema_migration_version_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX schema_migration_version_idx ON public.schema_migration USING btree (version);


--
-- Name: schema_migration_version_self_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX schema_migration_version_self_idx ON public.schema_migration USING btree (version_self);


--
-- Name: selfservice_errors_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_errors_nid_idx ON public.selfservice_errors USING btree (id, nid);


--
-- Name: selfservice_login_flows_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_login_flows_nid_idx ON public.selfservice_login_flows USING btree (id, nid);


--
-- Name: selfservice_recovery_flows_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_recovery_flows_nid_idx ON public.selfservice_recovery_flows USING btree (id, nid);


--
-- Name: selfservice_registration_flows_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_registration_flows_nid_idx ON public.selfservice_registration_flows USING btree (id, nid);


--
-- Name: selfservice_settings_flows_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_settings_flows_nid_idx ON public.selfservice_settings_flows USING btree (id, nid);


--
-- Name: selfservice_verification_flows_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX selfservice_verification_flows_nid_idx ON public.selfservice_verification_flows USING btree (id, nid);


--
-- Name: sessions_logout_token_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_logout_token_idx ON public.sessions USING btree (logout_token);


--
-- Name: sessions_logout_token_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX sessions_logout_token_uq_idx ON public.sessions USING btree (logout_token);


--
-- Name: sessions_nid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_nid_idx ON public.sessions USING btree (id, nid);


--
-- Name: sessions_token_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_token_idx ON public.sessions USING btree (token);


--
-- Name: sessions_token_uq_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX sessions_token_uq_idx ON public.sessions USING btree (token);


--
-- Name: webhook_cache_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX webhook_cache_created_at_idx ON public.webhook_cache USING btree (created_at);


--
-- Name: webhook_cache_event_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX webhook_cache_event_type_idx ON public.webhook_cache USING btree (event_type);


--
-- Name: webhook_cache_sqs_message_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX webhook_cache_sqs_message_id_idx ON public.webhook_cache USING btree (sqs_message_id);


--
-- Name: range_affected_idx; Type: INDEX; Schema: vulnerability; Owner: -
--

CREATE INDEX range_affected_idx ON vulnerability.range USING btree (affected_id);




--
-- Name: package_maintainer package_maintainer_maintainer_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.package_maintainer
    ADD CONSTRAINT package_maintainer_maintainer_id_fkey FOREIGN KEY (maintainer_id) REFERENCES package.maintainer(id);


--
-- Name: package_maintainer package_maintainer_package_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.package_maintainer
    ADD CONSTRAINT package_maintainer_package_id_fkey FOREIGN KEY (package_id) REFERENCES package.package(id);


--
-- Name: release_dependency release_dependency_dependency_package_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_dependency
    ADD CONSTRAINT release_dependency_dependency_package_id_fkey FOREIGN KEY (dependency_package_id) REFERENCES package.package(id);


--
-- Name: release_dependency release_dependency_dependency_release_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_dependency
    ADD CONSTRAINT release_dependency_dependency_release_id_fkey FOREIGN KEY (dependency_release_id) REFERENCES package.release(id);


--
-- Name: release_dependency release_dependency_release_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_dependency
    ADD CONSTRAINT release_dependency_release_id_fkey FOREIGN KEY (release_id) REFERENCES package.release(id);


--
-- Name: release_license release_license_license_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_license
    ADD CONSTRAINT release_license_license_id_fkey FOREIGN KEY (license_id) REFERENCES package.license(id);


--
-- Name: release_license release_license_release_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release_license
    ADD CONSTRAINT release_license_release_id_fkey FOREIGN KEY (release_id) REFERENCES package.release(id);


--
-- Name: release release_package_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release
    ADD CONSTRAINT release_package_id_fkey FOREIGN KEY (package_id) REFERENCES package.package(id);


--
-- Name: release release_publishing_maintainer_id_fkey; Type: FK CONSTRAINT; Schema: package; Owner: -
--

ALTER TABLE ONLY package.release
    ADD CONSTRAINT release_publishing_maintainer_id_fkey FOREIGN KEY (publishing_maintainer_id) REFERENCES package.maintainer(id);


--
-- Name: build_dependency_relationship build_dependency_relationship_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.build_dependency_relationship
    ADD CONSTRAINT build_dependency_relationship_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.builds(id) ON DELETE CASCADE;


--
-- Name: build_dependency_relationship build_dependency_relationship_depended_by_relationship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.build_dependency_relationship
    ADD CONSTRAINT build_dependency_relationship_depended_by_relationship_id_fkey FOREIGN KEY (depended_by_relationship_id) REFERENCES public.build_dependency_relationship(id) ON DELETE CASCADE;


--
-- Name: build_dependency_relationship build_dependency_relationship_release_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.build_dependency_relationship
    ADD CONSTRAINT build_dependency_relationship_release_id_fkey FOREIGN KEY (release_id) REFERENCES package.release(id) ON DELETE CASCADE;


--
-- Name: builds builds_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: continuity_containers continuity_containers_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.continuity_containers
    ADD CONSTRAINT continuity_containers_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: continuity_containers continuity_containers_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.continuity_containers
    ADD CONSTRAINT continuity_containers_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: courier_messages courier_messages_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courier_messages
    ADD CONSTRAINT courier_messages_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: findings findings_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.findings
    ADD CONSTRAINT findings_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.builds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: findings findings_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.findings
    ADD CONSTRAINT findings_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: findings findings_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.findings
    ADD CONSTRAINT findings_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id);


--
-- Name: github_repositories github_repositories_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.github_repositories
    ADD CONSTRAINT github_repositories_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: guide_related_guides guide_related_guides_from_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_related_guides
    ADD CONSTRAINT guide_related_guides_from_guide_id_fkey FOREIGN KEY (from_guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_related_guides guide_related_guides_to_guide_unique_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_related_guides
    ADD CONSTRAINT guide_related_guides_to_guide_unique_id_fkey FOREIGN KEY (to_guide_unique_id) REFERENCES public.guides(guide_unique_id) ON DELETE CASCADE;


--
-- Name: guide_vulnerabilities guide_vulnerabilities_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_vulnerabilities
    ADD CONSTRAINT guide_vulnerabilities_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_vulnerabilities guide_vulnerabilities_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guide_vulnerabilities
    ADD CONSTRAINT guide_vulnerabilities_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id);


--
-- Name: identities identities_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identities
    ADD CONSTRAINT identities_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_credential_identifiers identity_credential_identifiers_identity_credential_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credential_identifiers
    ADD CONSTRAINT identity_credential_identifiers_identity_credential_id_fkey FOREIGN KEY (identity_credential_id) REFERENCES public.identity_credentials(id) ON DELETE CASCADE;


--
-- Name: identity_credential_identifiers identity_credential_identifiers_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credential_identifiers
    ADD CONSTRAINT identity_credential_identifiers_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_credential_identifiers identity_credential_identifiers_type_id_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credential_identifiers
    ADD CONSTRAINT identity_credential_identifiers_type_id_fk_idx FOREIGN KEY (identity_credential_type_id) REFERENCES public.identity_credential_types(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_credentials identity_credentials_identity_credential_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credentials
    ADD CONSTRAINT identity_credentials_identity_credential_type_id_fkey FOREIGN KEY (identity_credential_type_id) REFERENCES public.identity_credential_types(id) ON DELETE CASCADE;


--
-- Name: identity_credentials identity_credentials_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credentials
    ADD CONSTRAINT identity_credentials_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: identity_credentials identity_credentials_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_credentials
    ADD CONSTRAINT identity_credentials_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_recovery_addresses identity_recovery_addresses_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_addresses
    ADD CONSTRAINT identity_recovery_addresses_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: identity_recovery_addresses identity_recovery_addresses_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_addresses
    ADD CONSTRAINT identity_recovery_addresses_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_recovery_tokens identity_recovery_tokens_identity_id_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_tokens
    ADD CONSTRAINT identity_recovery_tokens_identity_id_fk_idx FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_recovery_tokens identity_recovery_tokens_identity_recovery_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_tokens
    ADD CONSTRAINT identity_recovery_tokens_identity_recovery_address_id_fkey FOREIGN KEY (identity_recovery_address_id) REFERENCES public.identity_recovery_addresses(id) ON DELETE CASCADE;


--
-- Name: identity_recovery_tokens identity_recovery_tokens_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_tokens
    ADD CONSTRAINT identity_recovery_tokens_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_recovery_tokens identity_recovery_tokens_selfservice_recovery_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_recovery_tokens
    ADD CONSTRAINT identity_recovery_tokens_selfservice_recovery_request_id_fkey FOREIGN KEY (selfservice_recovery_flow_id) REFERENCES public.selfservice_recovery_flows(id) ON DELETE CASCADE;


--
-- Name: identity_verifiable_addresses identity_verifiable_addresses_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verifiable_addresses
    ADD CONSTRAINT identity_verifiable_addresses_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: identity_verifiable_addresses identity_verifiable_addresses_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verifiable_addresses
    ADD CONSTRAINT identity_verifiable_addresses_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_verification_tokens identity_verification_tokens_identity_verifiable_address_i_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verification_tokens
    ADD CONSTRAINT identity_verification_tokens_identity_verifiable_address_i_fkey FOREIGN KEY (identity_verifiable_address_id) REFERENCES public.identity_verifiable_addresses(id) ON DELETE CASCADE;


--
-- Name: identity_verification_tokens identity_verification_tokens_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verification_tokens
    ADD CONSTRAINT identity_verification_tokens_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: identity_verification_tokens identity_verification_tokens_selfservice_verification_flow_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identity_verification_tokens
    ADD CONSTRAINT identity_verification_tokens_selfservice_verification_flow_fkey FOREIGN KEY (selfservice_verification_flow_id) REFERENCES public.selfservice_verification_flows(id) ON DELETE CASCADE;


--
-- Name: ignored_vulnerabilities ignored_vulnerabilities_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ignored_vulnerabilities
    ADD CONSTRAINT ignored_vulnerabilities_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.identities(id) ON DELETE SET NULL;


--
-- Name: ignored_vulnerabilities ignored_vulnerabilities_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ignored_vulnerabilities
    ADD CONSTRAINT ignored_vulnerabilities_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: ignored_vulnerabilities ignored_vulnerabilities_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ignored_vulnerabilities
    ADD CONSTRAINT ignored_vulnerabilities_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: instances instances_agent_access_token_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instances
    ADD CONSTRAINT instances_agent_access_token_fkey FOREIGN KEY (agent_access_token) REFERENCES public.builds(agent_access_token) ON DELETE CASCADE;


--
-- Name: manifest manifest_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest
    ADD CONSTRAINT manifest_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.builds(id);


--
-- Name: manifest_dependency_edge manifest_dependency_edge_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency_edge
    ADD CONSTRAINT manifest_dependency_edge_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.manifest_dependency_node(id);


--
-- Name: manifest_dependency_edge manifest_dependency_edge_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency_edge
    ADD CONSTRAINT manifest_dependency_edge_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.manifest_dependency_node(id);


--
-- Name: manifest_dependency manifest_dependency_manifest_dependency_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency
    ADD CONSTRAINT manifest_dependency_manifest_dependency_node_id_fkey FOREIGN KEY (manifest_dependency_node_id) REFERENCES public.manifest_dependency_node(id);


--
-- Name: manifest_dependency manifest_dependency_manifest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency
    ADD CONSTRAINT manifest_dependency_manifest_id_fkey FOREIGN KEY (manifest_id) REFERENCES public.manifest(id);


--
-- Name: manifest_dependency_node manifest_dependency_node_release_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifest_dependency_node
    ADD CONSTRAINT manifest_dependency_node_release_id_fkey FOREIGN KEY (release_id) REFERENCES package.release(id);


--
-- Name: manifests manifests_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.builds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: manifests manifests_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization_user organization_user_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_user
    ADD CONSTRAINT organization_user_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization_user organization_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_user
    ADD CONSTRAINT organization_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organizations organizations_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: organizations organizations_settings_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_settings_id_fkey FOREIGN KEY (settings_id) REFERENCES public.settings(id);


--
-- Name: project_access_tokens project_access_tokens_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_access_tokens
    ADD CONSTRAINT project_access_tokens_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public.identities(id) ON DELETE SET NULL;


--
-- Name: project_access_tokens project_access_tokens_project_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_access_tokens
    ADD CONSTRAINT project_access_tokens_project_uuid_fkey FOREIGN KEY (project_uuid) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: projects projects_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: projects projects_settings_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_settings_id_fkey FOREIGN KEY (settings_id) REFERENCES public.settings(id);


--
-- Name: scans scans_build_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_build_id_fkey FOREIGN KEY (build_id) REFERENCES public.builds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: selfservice_errors selfservice_errors_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_errors
    ADD CONSTRAINT selfservice_errors_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: selfservice_login_flows selfservice_login_flows_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_login_flows
    ADD CONSTRAINT selfservice_login_flows_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: selfservice_settings_flows selfservice_profile_management_requests_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_settings_flows
    ADD CONSTRAINT selfservice_profile_management_requests_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: selfservice_recovery_flows selfservice_recovery_flows_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_recovery_flows
    ADD CONSTRAINT selfservice_recovery_flows_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: selfservice_recovery_flows selfservice_recovery_requests_recovered_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_recovery_flows
    ADD CONSTRAINT selfservice_recovery_requests_recovered_identity_id_fkey FOREIGN KEY (recovered_identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: selfservice_registration_flows selfservice_registration_flows_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_registration_flows
    ADD CONSTRAINT selfservice_registration_flows_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: selfservice_settings_flows selfservice_settings_flows_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_settings_flows
    ADD CONSTRAINT selfservice_settings_flows_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: selfservice_verification_flows selfservice_verification_flows_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.selfservice_verification_flows
    ADD CONSTRAINT selfservice_verification_flows_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: sessions sessions_identity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_identity_id_fkey FOREIGN KEY (identity_id) REFERENCES public.identities(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_nid_fk_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_nid_fk_idx FOREIGN KEY (nid) REFERENCES public.networks(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: users users_kratos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_kratos_id_fkey FOREIGN KEY (kratos_id) REFERENCES public.identities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: affected affected_package_id_fk; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected
    ADD CONSTRAINT affected_package_id_fk FOREIGN KEY (package_id) REFERENCES package.package(id);


--
-- Name: affected_range_event affected_range_event_affected_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_range_event
    ADD CONSTRAINT affected_range_event_affected_id_fkey FOREIGN KEY (affected_id) REFERENCES vulnerability.affected(id) ON DELETE CASCADE;


--
-- Name: affected_version affected_version_affected_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected_version
    ADD CONSTRAINT affected_version_affected_id_fkey FOREIGN KEY (affected_id) REFERENCES vulnerability.affected(id) ON DELETE CASCADE;


--
-- Name: affected affected_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.affected
    ADD CONSTRAINT affected_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: credit credit_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.credit
    ADD CONSTRAINT credit_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: equivalent equivalent_a_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.equivalent
    ADD CONSTRAINT equivalent_a_fkey FOREIGN KEY (a) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: equivalent equivalent_b_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.equivalent
    ADD CONSTRAINT equivalent_b_fkey FOREIGN KEY (b) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: range range_affected_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.range
    ADD CONSTRAINT range_affected_id_fkey FOREIGN KEY (affected_id) REFERENCES vulnerability.affected(id) ON DELETE CASCADE;


--
-- Name: reference reference_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.reference
    ADD CONSTRAINT reference_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- Name: severity severity_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: vulnerability; Owner: -
--

ALTER TABLE ONLY vulnerability.severity
    ADD CONSTRAINT severity_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES vulnerability.vulnerability(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

