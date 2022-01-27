/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { api } from '../baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  date: any;
  numeric: any;
  severity_enum: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "builds" */
export type Builds = {
  __typename?: 'builds';
  agent_access_token: Scalars['uuid'];
  created_at: Scalars['timestamp'];
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  id: Scalars['uuid'];
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  s3_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
};


/** columns and relationships of "builds" */
export type BuildsFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "builds" */
export type BuildsFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "builds" */
export type BuildsScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


/** columns and relationships of "builds" */
export type BuildsScans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};

/** aggregated selection of "builds" */
export type Builds_Aggregate = {
  __typename?: 'builds_aggregate';
  aggregate?: Maybe<Builds_Aggregate_Fields>;
  nodes: Array<Builds>;
};

/** aggregate fields of "builds" */
export type Builds_Aggregate_Fields = {
  __typename?: 'builds_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Builds_Max_Fields>;
  min?: Maybe<Builds_Min_Fields>;
};


/** aggregate fields of "builds" */
export type Builds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Builds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "builds" */
export type Builds_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Builds_Max_Order_By>;
  min?: InputMaybe<Builds_Min_Order_By>;
};

/** input type for inserting array relation for remote table "builds" */
export type Builds_Arr_Rel_Insert_Input = {
  data: Array<Builds_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};

/** Boolean expression to filter rows from the table "builds". All fields are combined with a logical 'AND'. */
export type Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Builds_Bool_Exp>>;
  _not?: InputMaybe<Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Builds_Bool_Exp>>;
  agent_access_token?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  scans?: InputMaybe<Scans_Bool_Exp>;
};

/** unique or primary key constraints on table "builds" */
export enum Builds_Constraint {
  /** unique or primary key constraint */
  BuildsAgentAccessTokenKey = 'builds_agent_access_token_key',
  /** unique or primary key constraint */
  BuildsPkey = 'builds_pkey'
}

/** input type for inserting data into table "builds" */
export type Builds_Insert_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_url?: InputMaybe<Scalars['String']>;
  scans?: InputMaybe<Scans_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Builds_Max_Fields = {
  __typename?: 'builds_max_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  s3_url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "builds" */
export type Builds_Max_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Builds_Min_Fields = {
  __typename?: 'builds_min_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  s3_url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "builds" */
export type Builds_Min_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "builds" */
export type Builds_Mutation_Response = {
  __typename?: 'builds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Builds>;
};

/** input type for inserting object relation for remote table "builds" */
export type Builds_Obj_Rel_Insert_Input = {
  data: Builds_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};

/** on conflict condition type for table "builds" */
export type Builds_On_Conflict = {
  constraint: Builds_Constraint;
  update_columns?: Array<Builds_Update_Column>;
  where?: InputMaybe<Builds_Bool_Exp>;
};

/** Ordering options when selecting data from "builds". */
export type Builds_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  scans_aggregate?: InputMaybe<Scans_Aggregate_Order_By>;
};

/** primary key columns input for table: builds */
export type Builds_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "builds" */
export enum Builds_Select_Column {
  /** column name */
  AgentAccessToken = 'agent_access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  S3Url = 's3_url'
}

/** input type for updating data in table "builds" */
export type Builds_Set_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "builds" */
export enum Builds_Update_Column {
  /** column name */
  AgentAccessToken = 'agent_access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  S3Url = 's3_url'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** columns and relationships of "findings" */
export type Findings = {
  __typename?: 'findings';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  created_at: Scalars['timestamp'];
  dedupe_slug: Scalars['String'];
  id: Scalars['uuid'];
  language: Scalars['String'];
  locations: Scalars['_text'];
  matcher: Scalars['String'];
  package_name: Scalars['String'];
  /** An object relationship */
  package_version?: Maybe<Package_Versions>;
  package_version_id?: Maybe<Scalars['uuid']>;
  purl: Scalars['String'];
  /** An object relationship */
  scan: Scans;
  scan_id: Scalars['uuid'];
  severity?: Maybe<Scalars['severity_enum']>;
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  version: Scalars['String'];
  version_matcher: Scalars['String'];
  virtual_path?: Maybe<Scalars['String']>;
  /** An object relationship */
  vulnerability: Vulnerabilities;
  vulnerability_id: Scalars['uuid'];
  /** An object relationship */
  vulnerability_package?: Maybe<Vulnerability_Packages>;
  vulnerability_package_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "findings" */
export type Findings_Aggregate = {
  __typename?: 'findings_aggregate';
  aggregate?: Maybe<Findings_Aggregate_Fields>;
  nodes: Array<Findings>;
};

/** aggregate fields of "findings" */
export type Findings_Aggregate_Fields = {
  __typename?: 'findings_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Findings_Max_Fields>;
  min?: Maybe<Findings_Min_Fields>;
};


/** aggregate fields of "findings" */
export type Findings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Findings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "findings" */
export type Findings_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Findings_Max_Order_By>;
  min?: InputMaybe<Findings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "findings" */
export type Findings_Arr_Rel_Insert_Input = {
  data: Array<Findings_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Findings_On_Conflict>;
};

/** Boolean expression to filter rows from the table "findings". All fields are combined with a logical 'AND'. */
export type Findings_Bool_Exp = {
  _and?: InputMaybe<Array<Findings_Bool_Exp>>;
  _not?: InputMaybe<Findings_Bool_Exp>;
  _or?: InputMaybe<Array<Findings_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  dedupe_slug?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  language?: InputMaybe<String_Comparison_Exp>;
  locations?: InputMaybe<_Text_Comparison_Exp>;
  matcher?: InputMaybe<String_Comparison_Exp>;
  package_name?: InputMaybe<String_Comparison_Exp>;
  package_version?: InputMaybe<Package_Versions_Bool_Exp>;
  package_version_id?: InputMaybe<Uuid_Comparison_Exp>;
  purl?: InputMaybe<String_Comparison_Exp>;
  scan?: InputMaybe<Scans_Bool_Exp>;
  scan_id?: InputMaybe<Uuid_Comparison_Exp>;
  severity?: InputMaybe<Severity_Enum_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
  version_matcher?: InputMaybe<String_Comparison_Exp>;
  virtual_path?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
  vulnerability_package_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "findings" */
export enum Findings_Constraint {
  /** unique or primary key constraint */
  FindingsDedupeSlugKey = 'findings_dedupe_slug_key',
  /** unique or primary key constraint */
  FindingsPkey = 'findings_pkey'
}

/** input type for inserting data into table "findings" */
export type Findings_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dedupe_slug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  language?: InputMaybe<Scalars['String']>;
  locations?: InputMaybe<Scalars['_text']>;
  matcher?: InputMaybe<Scalars['String']>;
  package_name?: InputMaybe<Scalars['String']>;
  package_version?: InputMaybe<Package_Versions_Obj_Rel_Insert_Input>;
  package_version_id?: InputMaybe<Scalars['uuid']>;
  purl?: InputMaybe<Scalars['String']>;
  scan?: InputMaybe<Scans_Obj_Rel_Insert_Input>;
  scan_id?: InputMaybe<Scalars['uuid']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
  version_matcher?: InputMaybe<Scalars['String']>;
  virtual_path?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Obj_Rel_Insert_Input>;
  vulnerability_package_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Findings_Max_Fields = {
  __typename?: 'findings_max_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  dedupe_slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  matcher?: Maybe<Scalars['String']>;
  package_name?: Maybe<Scalars['String']>;
  package_version_id?: Maybe<Scalars['uuid']>;
  purl?: Maybe<Scalars['String']>;
  scan_id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
  version_matcher?: Maybe<Scalars['String']>;
  virtual_path?: Maybe<Scalars['String']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
  vulnerability_package_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "findings" */
export type Findings_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dedupe_slug?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version_id?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
  vulnerability_package_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Findings_Min_Fields = {
  __typename?: 'findings_min_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  dedupe_slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  matcher?: Maybe<Scalars['String']>;
  package_name?: Maybe<Scalars['String']>;
  package_version_id?: Maybe<Scalars['uuid']>;
  purl?: Maybe<Scalars['String']>;
  scan_id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
  version_matcher?: Maybe<Scalars['String']>;
  virtual_path?: Maybe<Scalars['String']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
  vulnerability_package_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "findings" */
export type Findings_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dedupe_slug?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version_id?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
  vulnerability_package_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "findings" */
export type Findings_Mutation_Response = {
  __typename?: 'findings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Findings>;
};

/** on conflict condition type for table "findings" */
export type Findings_On_Conflict = {
  constraint: Findings_Constraint;
  update_columns?: Array<Findings_Update_Column>;
  where?: InputMaybe<Findings_Bool_Exp>;
};

/** Ordering options when selecting data from "findings". */
export type Findings_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dedupe_slug?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  locations?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version?: InputMaybe<Package_Versions_Order_By>;
  package_version_id?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan?: InputMaybe<Scans_Order_By>;
  scan_id?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Order_By>;
  vulnerability_package_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: findings */
export type Findings_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "findings" */
export enum Findings_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DedupeSlug = 'dedupe_slug',
  /** column name */
  Id = 'id',
  /** column name */
  Language = 'language',
  /** column name */
  Locations = 'locations',
  /** column name */
  Matcher = 'matcher',
  /** column name */
  PackageName = 'package_name',
  /** column name */
  PackageVersionId = 'package_version_id',
  /** column name */
  Purl = 'purl',
  /** column name */
  ScanId = 'scan_id',
  /** column name */
  Severity = 'severity',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version',
  /** column name */
  VersionMatcher = 'version_matcher',
  /** column name */
  VirtualPath = 'virtual_path',
  /** column name */
  VulnerabilityId = 'vulnerability_id',
  /** column name */
  VulnerabilityPackageId = 'vulnerability_package_id'
}

/** input type for updating data in table "findings" */
export type Findings_Set_Input = {
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dedupe_slug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  language?: InputMaybe<Scalars['String']>;
  locations?: InputMaybe<Scalars['_text']>;
  matcher?: InputMaybe<Scalars['String']>;
  package_name?: InputMaybe<Scalars['String']>;
  package_version_id?: InputMaybe<Scalars['uuid']>;
  purl?: InputMaybe<Scalars['String']>;
  scan_id?: InputMaybe<Scalars['uuid']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
  version_matcher?: InputMaybe<Scalars['String']>;
  virtual_path?: InputMaybe<Scalars['String']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
  vulnerability_package_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "findings" */
export enum Findings_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DedupeSlug = 'dedupe_slug',
  /** column name */
  Id = 'id',
  /** column name */
  Language = 'language',
  /** column name */
  Locations = 'locations',
  /** column name */
  Matcher = 'matcher',
  /** column name */
  PackageName = 'package_name',
  /** column name */
  PackageVersionId = 'package_version_id',
  /** column name */
  Purl = 'purl',
  /** column name */
  ScanId = 'scan_id',
  /** column name */
  Severity = 'severity',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version',
  /** column name */
  VersionMatcher = 'version_matcher',
  /** column name */
  VirtualPath = 'virtual_path',
  /** column name */
  VulnerabilityId = 'vulnerability_id',
  /** column name */
  VulnerabilityPackageId = 'vulnerability_package_id'
}

/** columns and relationships of "instances" */
export type Instances = {
  __typename?: 'instances';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  last_heartbeat: Scalars['timestamp'];
};

/** aggregated selection of "instances" */
export type Instances_Aggregate = {
  __typename?: 'instances_aggregate';
  aggregate?: Maybe<Instances_Aggregate_Fields>;
  nodes: Array<Instances>;
};

/** aggregate fields of "instances" */
export type Instances_Aggregate_Fields = {
  __typename?: 'instances_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Instances_Max_Fields>;
  min?: Maybe<Instances_Min_Fields>;
};


/** aggregate fields of "instances" */
export type Instances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Instances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "instances". All fields are combined with a logical 'AND'. */
export type Instances_Bool_Exp = {
  _and?: InputMaybe<Array<Instances_Bool_Exp>>;
  _not?: InputMaybe<Instances_Bool_Exp>;
  _or?: InputMaybe<Array<Instances_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_heartbeat?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "instances" */
export enum Instances_Constraint {
  /** unique or primary key constraint */
  InstancesPkey = 'instances_pkey'
}

/** input type for inserting data into table "instances" */
export type Instances_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_heartbeat?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Instances_Max_Fields = {
  __typename?: 'instances_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  last_heartbeat?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Instances_Min_Fields = {
  __typename?: 'instances_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  last_heartbeat?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "instances" */
export type Instances_Mutation_Response = {
  __typename?: 'instances_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Instances>;
};

/** on conflict condition type for table "instances" */
export type Instances_On_Conflict = {
  constraint: Instances_Constraint;
  update_columns?: Array<Instances_Update_Column>;
  where?: InputMaybe<Instances_Bool_Exp>;
};

/** Ordering options when selecting data from "instances". */
export type Instances_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_heartbeat?: InputMaybe<Order_By>;
};

/** primary key columns input for table: instances */
export type Instances_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "instances" */
export enum Instances_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastHeartbeat = 'last_heartbeat'
}

/** input type for updating data in table "instances" */
export type Instances_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_heartbeat?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "instances" */
export enum Instances_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastHeartbeat = 'last_heartbeat'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "builds" */
  delete_builds?: Maybe<Builds_Mutation_Response>;
  /** delete single row from the table: "builds" */
  delete_builds_by_pk?: Maybe<Builds>;
  /** delete data from the table: "findings" */
  delete_findings?: Maybe<Findings_Mutation_Response>;
  /** delete single row from the table: "findings" */
  delete_findings_by_pk?: Maybe<Findings>;
  /** delete data from the table: "instances" */
  delete_instances?: Maybe<Instances_Mutation_Response>;
  /** delete single row from the table: "instances" */
  delete_instances_by_pk?: Maybe<Instances>;
  /** delete data from the table: "organization_user" */
  delete_organization_user?: Maybe<Organization_User_Mutation_Response>;
  /** delete single row from the table: "organization_user" */
  delete_organization_user_by_pk?: Maybe<Organization_User>;
  /** delete data from the table: "organizations" */
  delete_organizations?: Maybe<Organizations_Mutation_Response>;
  /** delete single row from the table: "organizations" */
  delete_organizations_by_pk?: Maybe<Organizations>;
  /** delete data from the table: "package_versions" */
  delete_package_versions?: Maybe<Package_Versions_Mutation_Response>;
  /** delete single row from the table: "package_versions" */
  delete_package_versions_by_pk?: Maybe<Package_Versions>;
  /** delete data from the table: "project_access_tokens" */
  delete_project_access_tokens?: Maybe<Project_Access_Tokens_Mutation_Response>;
  /** delete single row from the table: "project_access_tokens" */
  delete_project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "related_vulnerabilities" */
  delete_related_vulnerabilities?: Maybe<Related_Vulnerabilities_Mutation_Response>;
  /** delete single row from the table: "related_vulnerabilities" */
  delete_related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** delete data from the table: "reports" */
  delete_reports?: Maybe<Reports_Mutation_Response>;
  /** delete single row from the table: "reports" */
  delete_reports_by_pk?: Maybe<Reports>;
  /** delete data from the table: "scans" */
  delete_scans?: Maybe<Scans_Mutation_Response>;
  /** delete single row from the table: "scans" */
  delete_scans_by_pk?: Maybe<Scans>;
  /** delete data from the table: "settings" */
  delete_settings?: Maybe<Settings_Mutation_Response>;
  /** delete single row from the table: "settings" */
  delete_settings_by_pk?: Maybe<Settings>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "vulnerabilities" */
  delete_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** delete single row from the table: "vulnerabilities" */
  delete_vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** delete data from the table: "vulnerability_packages" */
  delete_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** delete single row from the table: "vulnerability_packages" */
  delete_vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** insert data into the table: "builds" */
  insert_builds?: Maybe<Builds_Mutation_Response>;
  /** insert a single row into the table: "builds" */
  insert_builds_one?: Maybe<Builds>;
  /** insert data into the table: "findings" */
  insert_findings?: Maybe<Findings_Mutation_Response>;
  /** insert a single row into the table: "findings" */
  insert_findings_one?: Maybe<Findings>;
  /** insert data into the table: "instances" */
  insert_instances?: Maybe<Instances_Mutation_Response>;
  /** insert a single row into the table: "instances" */
  insert_instances_one?: Maybe<Instances>;
  /** insert data into the table: "organization_user" */
  insert_organization_user?: Maybe<Organization_User_Mutation_Response>;
  /** insert a single row into the table: "organization_user" */
  insert_organization_user_one?: Maybe<Organization_User>;
  /** insert data into the table: "organizations" */
  insert_organizations?: Maybe<Organizations_Mutation_Response>;
  /** insert a single row into the table: "organizations" */
  insert_organizations_one?: Maybe<Organizations>;
  /** insert data into the table: "package_versions" */
  insert_package_versions?: Maybe<Package_Versions_Mutation_Response>;
  /** insert a single row into the table: "package_versions" */
  insert_package_versions_one?: Maybe<Package_Versions>;
  /** insert data into the table: "project_access_tokens" */
  insert_project_access_tokens?: Maybe<Project_Access_Tokens_Mutation_Response>;
  /** insert a single row into the table: "project_access_tokens" */
  insert_project_access_tokens_one?: Maybe<Project_Access_Tokens>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "related_vulnerabilities" */
  insert_related_vulnerabilities?: Maybe<Related_Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "related_vulnerabilities" */
  insert_related_vulnerabilities_one?: Maybe<Related_Vulnerabilities>;
  /** insert data into the table: "reports" */
  insert_reports?: Maybe<Reports_Mutation_Response>;
  /** insert a single row into the table: "reports" */
  insert_reports_one?: Maybe<Reports>;
  /** insert data into the table: "scans" */
  insert_scans?: Maybe<Scans_Mutation_Response>;
  /** insert a single row into the table: "scans" */
  insert_scans_one?: Maybe<Scans>;
  /** insert data into the table: "settings" */
  insert_settings?: Maybe<Settings_Mutation_Response>;
  /** insert a single row into the table: "settings" */
  insert_settings_one?: Maybe<Settings>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "vulnerabilities" */
  insert_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "vulnerabilities" */
  insert_vulnerabilities_one?: Maybe<Vulnerabilities>;
  /** insert data into the table: "vulnerability_packages" */
  insert_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** insert a single row into the table: "vulnerability_packages" */
  insert_vulnerability_packages_one?: Maybe<Vulnerability_Packages>;
  /** update data of the table: "builds" */
  update_builds?: Maybe<Builds_Mutation_Response>;
  /** update single row of the table: "builds" */
  update_builds_by_pk?: Maybe<Builds>;
  /** update data of the table: "findings" */
  update_findings?: Maybe<Findings_Mutation_Response>;
  /** update single row of the table: "findings" */
  update_findings_by_pk?: Maybe<Findings>;
  /** update data of the table: "instances" */
  update_instances?: Maybe<Instances_Mutation_Response>;
  /** update single row of the table: "instances" */
  update_instances_by_pk?: Maybe<Instances>;
  /** update data of the table: "organization_user" */
  update_organization_user?: Maybe<Organization_User_Mutation_Response>;
  /** update single row of the table: "organization_user" */
  update_organization_user_by_pk?: Maybe<Organization_User>;
  /** update data of the table: "organizations" */
  update_organizations?: Maybe<Organizations_Mutation_Response>;
  /** update single row of the table: "organizations" */
  update_organizations_by_pk?: Maybe<Organizations>;
  /** update data of the table: "package_versions" */
  update_package_versions?: Maybe<Package_Versions_Mutation_Response>;
  /** update single row of the table: "package_versions" */
  update_package_versions_by_pk?: Maybe<Package_Versions>;
  /** update data of the table: "project_access_tokens" */
  update_project_access_tokens?: Maybe<Project_Access_Tokens_Mutation_Response>;
  /** update single row of the table: "project_access_tokens" */
  update_project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "related_vulnerabilities" */
  update_related_vulnerabilities?: Maybe<Related_Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "related_vulnerabilities" */
  update_related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** update data of the table: "reports" */
  update_reports?: Maybe<Reports_Mutation_Response>;
  /** update single row of the table: "reports" */
  update_reports_by_pk?: Maybe<Reports>;
  /** update data of the table: "scans" */
  update_scans?: Maybe<Scans_Mutation_Response>;
  /** update single row of the table: "scans" */
  update_scans_by_pk?: Maybe<Scans>;
  /** update data of the table: "settings" */
  update_settings?: Maybe<Settings_Mutation_Response>;
  /** update single row of the table: "settings" */
  update_settings_by_pk?: Maybe<Settings>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "vulnerabilities" */
  update_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "vulnerabilities" */
  update_vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** update data of the table: "vulnerability_packages" */
  update_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** update single row of the table: "vulnerability_packages" */
  update_vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
};


/** mutation root */
export type Mutation_RootDelete_BuildsArgs = {
  where: Builds_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Builds_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_FindingsArgs = {
  where: Findings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Findings_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_InstancesArgs = {
  where: Instances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Instances_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Organization_UserArgs = {
  where: Organization_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organization_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_OrganizationsArgs = {
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organizations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Package_VersionsArgs = {
  where: Package_Versions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_Versions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Project_Access_TokensArgs = {
  where: Project_Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_Access_Tokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Related_VulnerabilitiesArgs = {
  where: Related_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Related_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ReportsArgs = {
  where: Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reports_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ScansArgs = {
  where: Scans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SettingsArgs = {
  where: Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Settings_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_VulnerabilitiesArgs = {
  where: Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Vulnerability_PackagesArgs = {
  where: Vulnerability_Packages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vulnerability_Packages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_BuildsArgs = {
  objects: Array<Builds_Insert_Input>;
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Builds_OneArgs = {
  object: Builds_Insert_Input;
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FindingsArgs = {
  objects: Array<Findings_Insert_Input>;
  on_conflict?: InputMaybe<Findings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Findings_OneArgs = {
  object: Findings_Insert_Input;
  on_conflict?: InputMaybe<Findings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InstancesArgs = {
  objects: Array<Instances_Insert_Input>;
  on_conflict?: InputMaybe<Instances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Instances_OneArgs = {
  object: Instances_Insert_Input;
  on_conflict?: InputMaybe<Instances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organization_UserArgs = {
  objects: Array<Organization_User_Insert_Input>;
  on_conflict?: InputMaybe<Organization_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organization_User_OneArgs = {
  object: Organization_User_Insert_Input;
  on_conflict?: InputMaybe<Organization_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrganizationsArgs = {
  objects: Array<Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organizations_OneArgs = {
  object: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_VersionsArgs = {
  objects: Array<Package_Versions_Insert_Input>;
  on_conflict?: InputMaybe<Package_Versions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Versions_OneArgs = {
  object: Package_Versions_Insert_Input;
  on_conflict?: InputMaybe<Package_Versions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Access_TokensArgs = {
  objects: Array<Project_Access_Tokens_Insert_Input>;
  on_conflict?: InputMaybe<Project_Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Access_Tokens_OneArgs = {
  object: Project_Access_Tokens_Insert_Input;
  on_conflict?: InputMaybe<Project_Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Related_VulnerabilitiesArgs = {
  objects: Array<Related_Vulnerabilities_Insert_Input>;
  on_conflict?: InputMaybe<Related_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Related_Vulnerabilities_OneArgs = {
  object: Related_Vulnerabilities_Insert_Input;
  on_conflict?: InputMaybe<Related_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReportsArgs = {
  objects: Array<Reports_Insert_Input>;
  on_conflict?: InputMaybe<Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reports_OneArgs = {
  object: Reports_Insert_Input;
  on_conflict?: InputMaybe<Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScansArgs = {
  objects: Array<Scans_Insert_Input>;
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scans_OneArgs = {
  object: Scans_Insert_Input;
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SettingsArgs = {
  objects: Array<Settings_Insert_Input>;
  on_conflict?: InputMaybe<Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Settings_OneArgs = {
  object: Settings_Insert_Input;
  on_conflict?: InputMaybe<Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_VulnerabilitiesArgs = {
  objects: Array<Vulnerabilities_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerabilities_OneArgs = {
  object: Vulnerabilities_Insert_Input;
  on_conflict?: InputMaybe<Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_PackagesArgs = {
  objects: Array<Vulnerability_Packages_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Packages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Packages_OneArgs = {
  object: Vulnerability_Packages_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Packages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_BuildsArgs = {
  _set?: InputMaybe<Builds_Set_Input>;
  where: Builds_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Builds_By_PkArgs = {
  _set?: InputMaybe<Builds_Set_Input>;
  pk_columns: Builds_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FindingsArgs = {
  _set?: InputMaybe<Findings_Set_Input>;
  where: Findings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Findings_By_PkArgs = {
  _set?: InputMaybe<Findings_Set_Input>;
  pk_columns: Findings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InstancesArgs = {
  _set?: InputMaybe<Instances_Set_Input>;
  where: Instances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Instances_By_PkArgs = {
  _set?: InputMaybe<Instances_Set_Input>;
  pk_columns: Instances_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Organization_UserArgs = {
  _set?: InputMaybe<Organization_User_Set_Input>;
  where: Organization_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organization_User_By_PkArgs = {
  _set?: InputMaybe<Organization_User_Set_Input>;
  pk_columns: Organization_User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrganizationsArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  pk_columns: Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_VersionsArgs = {
  _set?: InputMaybe<Package_Versions_Set_Input>;
  where: Package_Versions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Versions_By_PkArgs = {
  _set?: InputMaybe<Package_Versions_Set_Input>;
  pk_columns: Package_Versions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Access_TokensArgs = {
  _set?: InputMaybe<Project_Access_Tokens_Set_Input>;
  where: Project_Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Access_Tokens_By_PkArgs = {
  _set?: InputMaybe<Project_Access_Tokens_Set_Input>;
  pk_columns: Project_Access_Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Related_VulnerabilitiesArgs = {
  _set?: InputMaybe<Related_Vulnerabilities_Set_Input>;
  where: Related_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Related_Vulnerabilities_By_PkArgs = {
  _set?: InputMaybe<Related_Vulnerabilities_Set_Input>;
  pk_columns: Related_Vulnerabilities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ReportsArgs = {
  _set?: InputMaybe<Reports_Set_Input>;
  where: Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reports_By_PkArgs = {
  _set?: InputMaybe<Reports_Set_Input>;
  pk_columns: Reports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ScansArgs = {
  _set?: InputMaybe<Scans_Set_Input>;
  where: Scans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scans_By_PkArgs = {
  _set?: InputMaybe<Scans_Set_Input>;
  pk_columns: Scans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SettingsArgs = {
  _set?: InputMaybe<Settings_Set_Input>;
  where: Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Settings_By_PkArgs = {
  _set?: InputMaybe<Settings_Set_Input>;
  pk_columns: Settings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_VulnerabilitiesArgs = {
  _inc?: InputMaybe<Vulnerabilities_Inc_Input>;
  _set?: InputMaybe<Vulnerabilities_Set_Input>;
  where: Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerabilities_By_PkArgs = {
  _inc?: InputMaybe<Vulnerabilities_Inc_Input>;
  _set?: InputMaybe<Vulnerabilities_Set_Input>;
  pk_columns: Vulnerabilities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_PackagesArgs = {
  _set?: InputMaybe<Vulnerability_Packages_Set_Input>;
  where: Vulnerability_Packages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Packages_By_PkArgs = {
  _set?: InputMaybe<Vulnerability_Packages_Set_Input>;
  pk_columns: Vulnerability_Packages_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/**
 * join table
 *
 *
 * columns and relationships of "organization_user"
 *
 */
export type Organization_User = {
  __typename?: 'organization_user';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  organization: Organizations;
  organization_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "organization_user" */
export type Organization_User_Aggregate = {
  __typename?: 'organization_user_aggregate';
  aggregate?: Maybe<Organization_User_Aggregate_Fields>;
  nodes: Array<Organization_User>;
};

/** aggregate fields of "organization_user" */
export type Organization_User_Aggregate_Fields = {
  __typename?: 'organization_user_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Organization_User_Max_Fields>;
  min?: Maybe<Organization_User_Min_Fields>;
};


/** aggregate fields of "organization_user" */
export type Organization_User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organization_User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "organization_user" */
export type Organization_User_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Organization_User_Max_Order_By>;
  min?: InputMaybe<Organization_User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "organization_user" */
export type Organization_User_Arr_Rel_Insert_Input = {
  data: Array<Organization_User_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Organization_User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "organization_user". All fields are combined with a logical 'AND'. */
export type Organization_User_Bool_Exp = {
  _and?: InputMaybe<Array<Organization_User_Bool_Exp>>;
  _not?: InputMaybe<Organization_User_Bool_Exp>;
  _or?: InputMaybe<Array<Organization_User_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organization_user" */
export enum Organization_User_Constraint {
  /** unique or primary key constraint */
  OrganizationUserPkey = 'organization_user_pkey'
}

/** input type for inserting data into table "organization_user" */
export type Organization_User_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Organization_User_Max_Fields = {
  __typename?: 'organization_user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  organization_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "organization_user" */
export type Organization_User_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Organization_User_Min_Fields = {
  __typename?: 'organization_user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  organization_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "organization_user" */
export type Organization_User_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "organization_user" */
export type Organization_User_Mutation_Response = {
  __typename?: 'organization_user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Organization_User>;
};

/** on conflict condition type for table "organization_user" */
export type Organization_User_On_Conflict = {
  constraint: Organization_User_Constraint;
  update_columns?: Array<Organization_User_Update_Column>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};

/** Ordering options when selecting data from "organization_user". */
export type Organization_User_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: organization_user */
export type Organization_User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "organization_user" */
export enum Organization_User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "organization_user" */
export type Organization_User_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "organization_user" */
export enum Organization_User_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  createdAt: Scalars['timestamp'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  organization_users: Array<Organization_User>;
  /** An aggregate relationship */
  organization_users_aggregate: Organization_User_Aggregate;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  settings_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "organizations" */
export type OrganizationsOrganization_UsersArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsOrganization_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};

/** aggregated selection of "organizations" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate';
  aggregate?: Maybe<Organizations_Aggregate_Fields>;
  nodes: Array<Organizations>;
};

/** aggregate fields of "organizations" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Organizations_Max_Fields>;
  min?: Maybe<Organizations_Min_Fields>;
};


/** aggregate fields of "organizations" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
  projects?: InputMaybe<Projects_Bool_Exp>;
  settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint */
  OrganizationsPkey = 'organizations_pkey'
}

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  organization_users?: InputMaybe<Organization_User_Arr_Rel_Insert_Input>;
  projects?: InputMaybe<Projects_Arr_Rel_Insert_Input>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "organizations" */
export type Organizations_Mutation_Response = {
  __typename?: 'organizations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Organizations>;
};

/** input type for inserting object relation for remote table "organizations" */
export type Organizations_Obj_Rel_Insert_Input = {
  data: Organizations_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** on conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint;
  update_columns?: Array<Organizations_Update_Column>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_users_aggregate?: InputMaybe<Organization_User_Aggregate_Order_By>;
  projects_aggregate?: InputMaybe<Projects_Aggregate_Order_By>;
  settings_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: organizations */
export type Organizations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SettingsId = 'settings_id'
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SettingsId = 'settings_id'
}

/** columns and relationships of "package_versions" */
export type Package_Versions = {
  __typename?: 'package_versions';
  cpes: Scalars['_text'];
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  fix_state: Scalars['String'];
  fixed_in_versions: Scalars['_text'];
  id: Scalars['uuid'];
  pkg_slug: Scalars['String'];
  slug: Scalars['String'];
  version_constraint: Scalars['String'];
  version_format: Scalars['String'];
  /** An object relationship */
  vulnerability_package: Vulnerability_Packages;
};


/** columns and relationships of "package_versions" */
export type Package_VersionsFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "package_versions" */
export type Package_VersionsFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};

/** aggregated selection of "package_versions" */
export type Package_Versions_Aggregate = {
  __typename?: 'package_versions_aggregate';
  aggregate?: Maybe<Package_Versions_Aggregate_Fields>;
  nodes: Array<Package_Versions>;
};

/** aggregate fields of "package_versions" */
export type Package_Versions_Aggregate_Fields = {
  __typename?: 'package_versions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Package_Versions_Max_Fields>;
  min?: Maybe<Package_Versions_Min_Fields>;
};


/** aggregate fields of "package_versions" */
export type Package_Versions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Versions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package_versions" */
export type Package_Versions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Versions_Max_Order_By>;
  min?: InputMaybe<Package_Versions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package_versions" */
export type Package_Versions_Arr_Rel_Insert_Input = {
  data: Array<Package_Versions_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Package_Versions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package_versions". All fields are combined with a logical 'AND'. */
export type Package_Versions_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Versions_Bool_Exp>>;
  _not?: InputMaybe<Package_Versions_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Versions_Bool_Exp>>;
  cpes?: InputMaybe<_Text_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  fix_state?: InputMaybe<String_Comparison_Exp>;
  fixed_in_versions?: InputMaybe<_Text_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  pkg_slug?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  version_constraint?: InputMaybe<String_Comparison_Exp>;
  version_format?: InputMaybe<String_Comparison_Exp>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};

/** unique or primary key constraints on table "package_versions" */
export enum Package_Versions_Constraint {
  /** unique or primary key constraint */
  PackageVersionsPkey = 'package_versions_pkey',
  /** unique or primary key constraint */
  PackageVersionsSlugKey = 'package_versions_slug_key'
}

/** input type for inserting data into table "package_versions" */
export type Package_Versions_Insert_Input = {
  cpes?: InputMaybe<Scalars['_text']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  fix_state?: InputMaybe<Scalars['String']>;
  fixed_in_versions?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  pkg_slug?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  version_constraint?: InputMaybe<Scalars['String']>;
  version_format?: InputMaybe<Scalars['String']>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Package_Versions_Max_Fields = {
  __typename?: 'package_versions_max_fields';
  fix_state?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pkg_slug?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  version_constraint?: Maybe<Scalars['String']>;
  version_format?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package_versions" */
export type Package_Versions_Max_Order_By = {
  fix_state?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pkg_slug?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  version_constraint?: InputMaybe<Order_By>;
  version_format?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Versions_Min_Fields = {
  __typename?: 'package_versions_min_fields';
  fix_state?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pkg_slug?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  version_constraint?: Maybe<Scalars['String']>;
  version_format?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package_versions" */
export type Package_Versions_Min_Order_By = {
  fix_state?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pkg_slug?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  version_constraint?: InputMaybe<Order_By>;
  version_format?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package_versions" */
export type Package_Versions_Mutation_Response = {
  __typename?: 'package_versions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Versions>;
};

/** input type for inserting object relation for remote table "package_versions" */
export type Package_Versions_Obj_Rel_Insert_Input = {
  data: Package_Versions_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Package_Versions_On_Conflict>;
};

/** on conflict condition type for table "package_versions" */
export type Package_Versions_On_Conflict = {
  constraint: Package_Versions_Constraint;
  update_columns?: Array<Package_Versions_Update_Column>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};

/** Ordering options when selecting data from "package_versions". */
export type Package_Versions_Order_By = {
  cpes?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  fix_state?: InputMaybe<Order_By>;
  fixed_in_versions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pkg_slug?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  version_constraint?: InputMaybe<Order_By>;
  version_format?: InputMaybe<Order_By>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Order_By>;
};

/** primary key columns input for table: package_versions */
export type Package_Versions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "package_versions" */
export enum Package_Versions_Select_Column {
  /** column name */
  Cpes = 'cpes',
  /** column name */
  FixState = 'fix_state',
  /** column name */
  FixedInVersions = 'fixed_in_versions',
  /** column name */
  Id = 'id',
  /** column name */
  PkgSlug = 'pkg_slug',
  /** column name */
  Slug = 'slug',
  /** column name */
  VersionConstraint = 'version_constraint',
  /** column name */
  VersionFormat = 'version_format'
}

/** input type for updating data in table "package_versions" */
export type Package_Versions_Set_Input = {
  cpes?: InputMaybe<Scalars['_text']>;
  fix_state?: InputMaybe<Scalars['String']>;
  fixed_in_versions?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  pkg_slug?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  version_constraint?: InputMaybe<Scalars['String']>;
  version_format?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package_versions" */
export enum Package_Versions_Update_Column {
  /** column name */
  Cpes = 'cpes',
  /** column name */
  FixState = 'fix_state',
  /** column name */
  FixedInVersions = 'fixed_in_versions',
  /** column name */
  Id = 'id',
  /** column name */
  PkgSlug = 'pkg_slug',
  /** column name */
  Slug = 'slug',
  /** column name */
  VersionConstraint = 'version_constraint',
  /** column name */
  VersionFormat = 'version_format'
}

/** columns and relationships of "project_access_tokens" */
export type Project_Access_Tokens = {
  __typename?: 'project_access_tokens';
  access_token: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_uuid: Scalars['uuid'];
};

/** aggregated selection of "project_access_tokens" */
export type Project_Access_Tokens_Aggregate = {
  __typename?: 'project_access_tokens_aggregate';
  aggregate?: Maybe<Project_Access_Tokens_Aggregate_Fields>;
  nodes: Array<Project_Access_Tokens>;
};

/** aggregate fields of "project_access_tokens" */
export type Project_Access_Tokens_Aggregate_Fields = {
  __typename?: 'project_access_tokens_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Project_Access_Tokens_Max_Fields>;
  min?: Maybe<Project_Access_Tokens_Min_Fields>;
};


/** aggregate fields of "project_access_tokens" */
export type Project_Access_Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_access_tokens" */
export type Project_Access_Tokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Access_Tokens_Max_Order_By>;
  min?: InputMaybe<Project_Access_Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "project_access_tokens" */
export type Project_Access_Tokens_Arr_Rel_Insert_Input = {
  data: Array<Project_Access_Tokens_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Project_Access_Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_access_tokens". All fields are combined with a logical 'AND'. */
export type Project_Access_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  _not?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  access_token?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "project_access_tokens" */
export enum Project_Access_Tokens_Constraint {
  /** unique or primary key constraint */
  ProjectAccessTokensAccessTokenKey = 'project_access_tokens_access_token_key',
  /** unique or primary key constraint */
  ProjectAccessTokensPkey = 'project_access_tokens_pkey'
}

/** input type for inserting data into table "project_access_tokens" */
export type Project_Access_Tokens_Insert_Input = {
  access_token?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_uuid?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Project_Access_Tokens_Max_Fields = {
  __typename?: 'project_access_tokens_max_fields';
  access_token?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  project_uuid?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Max_Order_By = {
  access_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Access_Tokens_Min_Fields = {
  __typename?: 'project_access_tokens_min_fields';
  access_token?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  project_uuid?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Min_Order_By = {
  access_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "project_access_tokens" */
export type Project_Access_Tokens_Mutation_Response = {
  __typename?: 'project_access_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Project_Access_Tokens>;
};

/** on conflict condition type for table "project_access_tokens" */
export type Project_Access_Tokens_On_Conflict = {
  constraint: Project_Access_Tokens_Constraint;
  update_columns?: Array<Project_Access_Tokens_Update_Column>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "project_access_tokens". */
export type Project_Access_Tokens_Order_By = {
  access_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: project_access_tokens */
export type Project_Access_Tokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "project_access_tokens" */
export enum Project_Access_Tokens_Select_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectUuid = 'project_uuid'
}

/** input type for updating data in table "project_access_tokens" */
export type Project_Access_Tokens_Set_Input = {
  access_token?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_uuid?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "project_access_tokens" */
export enum Project_Access_Tokens_Update_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectUuid = 'project_uuid'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** An aggregate relationship */
  project_access_tokens_aggregate: Project_Access_Tokens_Aggregate;
  repo?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "projects" */
export type ProjectsBuildsArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsBuilds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_Access_TokensArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_Access_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};

/** aggregated selection of "projects" */
export type Projects_Aggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<Projects_Aggregate_Fields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type Projects_Aggregate_Fields = {
  __typename?: 'projects_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Projects_Max_Fields>;
  min?: Maybe<Projects_Min_Fields>;
};


/** aggregate fields of "projects" */
export type Projects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Projects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects" */
export type Projects_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Projects_Max_Order_By>;
  min?: InputMaybe<Projects_Min_Order_By>;
};

/** input type for inserting array relation for remote table "projects" */
export type Projects_Arr_Rel_Insert_Input = {
  data: Array<Projects_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Bool_Exp>>;
  _not?: InputMaybe<Projects_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Bool_Exp>>;
  builds?: InputMaybe<Builds_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  project_access_tokens?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  repo?: InputMaybe<String_Comparison_Exp>;
  settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  builds?: InputMaybe<Builds_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  project_access_tokens?: InputMaybe<Project_Access_Tokens_Arr_Rel_Insert_Input>;
  repo?: InputMaybe<Scalars['String']>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Projects_Max_Fields = {
  __typename?: 'projects_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['uuid']>;
  repo?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "projects" */
export type Projects_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  repo?: InputMaybe<Order_By>;
  settings_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Min_Fields = {
  __typename?: 'projects_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['uuid']>;
  repo?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "projects" */
export type Projects_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  repo?: InputMaybe<Order_By>;
  settings_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** on conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns?: Array<Projects_Update_Column>;
  where?: InputMaybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "projects". */
export type Projects_Order_By = {
  builds_aggregate?: InputMaybe<Builds_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  project_access_tokens_aggregate?: InputMaybe<Project_Access_Tokens_Aggregate_Order_By>;
  repo?: InputMaybe<Order_By>;
  settings_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: projects */
export type Projects_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Repo = 'repo',
  /** column name */
  SettingsId = 'settings_id'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  repo?: InputMaybe<Scalars['String']>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Repo = 'repo',
  /** column name */
  SettingsId = 'settings_id'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "instances" */
  instances: Array<Instances>;
  /** fetch aggregated fields from the table: "instances" */
  instances_aggregate: Instances_Aggregate;
  /** fetch data from the table: "instances" using primary key columns */
  instances_by_pk?: Maybe<Instances>;
  /** fetch data from the table: "organization_user" */
  organization_user: Array<Organization_User>;
  /** fetch aggregated fields from the table: "organization_user" */
  organization_user_aggregate: Organization_User_Aggregate;
  /** fetch data from the table: "organization_user" using primary key columns */
  organization_user_by_pk?: Maybe<Organization_User>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  package_versions: Array<Package_Versions>;
  /** An aggregate relationship */
  package_versions_aggregate: Package_Versions_Aggregate;
  /** fetch data from the table: "package_versions" using primary key columns */
  package_versions_by_pk?: Maybe<Package_Versions>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** An aggregate relationship */
  project_access_tokens_aggregate: Project_Access_Tokens_Aggregate;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  related_vulnerabilities_aggregate: Related_Vulnerabilities_Aggregate;
  /** fetch data from the table: "related_vulnerabilities" using primary key columns */
  related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** fetch data from the table: "reports" */
  reports: Array<Reports>;
  /** fetch aggregated fields from the table: "reports" */
  reports_aggregate: Reports_Aggregate;
  /** fetch data from the table: "reports" using primary key columns */
  reports_by_pk?: Maybe<Reports>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
  /** fetch data from the table: "scans" using primary key columns */
  scans_by_pk?: Maybe<Scans>;
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch aggregated fields from the table: "settings" */
  settings_aggregate: Settings_Aggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** fetch data from the table: "vulnerability_packages" */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** An aggregate relationship */
  vulnerability_packages_aggregate: Vulnerability_Packages_Aggregate;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
};


export type Query_RootBuildsArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


export type Query_RootBuilds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


export type Query_RootBuilds_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


export type Query_RootFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


export type Query_RootFindings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootInstancesArgs = {
  distinct_on?: InputMaybe<Array<Instances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Instances_Order_By>>;
  where?: InputMaybe<Instances_Bool_Exp>;
};


export type Query_RootInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Instances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Instances_Order_By>>;
  where?: InputMaybe<Instances_Bool_Exp>;
};


export type Query_RootInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrganization_UserArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


export type Query_RootOrganization_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


export type Query_RootOrganization_User_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};


export type Query_RootPackage_Versions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};


export type Query_RootPackage_Versions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProject_Access_TokensArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};


export type Query_RootProject_Access_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};


export type Query_RootProject_Access_Tokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRelated_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


export type Query_RootRelated_Vulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


export type Query_RootRelated_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootReportsArgs = {
  distinct_on?: InputMaybe<Array<Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reports_Order_By>>;
  where?: InputMaybe<Reports_Bool_Exp>;
};


export type Query_RootReports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reports_Order_By>>;
  where?: InputMaybe<Reports_Bool_Exp>;
};


export type Query_RootReports_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Query_RootScans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Query_RootScans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSettingsArgs = {
  distinct_on?: InputMaybe<Array<Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Settings_Order_By>>;
  where?: InputMaybe<Settings_Bool_Exp>;
};


export type Query_RootSettings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Settings_Order_By>>;
  where?: InputMaybe<Settings_Bool_Exp>;
};


export type Query_RootSettings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerabilities_Order_By>>;
  where?: InputMaybe<Vulnerabilities_Bool_Exp>;
};


export type Query_RootVulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerabilities_Order_By>>;
  where?: InputMaybe<Vulnerabilities_Bool_Exp>;
};


export type Query_RootVulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};


export type Query_RootVulnerability_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};


export type Query_RootVulnerability_Packages_By_PkArgs = {
  id: Scalars['uuid'];
};

/**
 * join table for adding holding additional vulns on a finding
 *
 *
 * columns and relationships of "related_vulnerabilities"
 *
 */
export type Related_Vulnerabilities = {
  __typename?: 'related_vulnerabilities';
  id: Scalars['uuid'];
  related_vulnerability_slug: Scalars['String'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
  /** An object relationship */
  vulnerabilityByVulnerabilitySlug: Vulnerabilities;
  vulnerability_slug: Scalars['String'];
};

/** aggregated selection of "related_vulnerabilities" */
export type Related_Vulnerabilities_Aggregate = {
  __typename?: 'related_vulnerabilities_aggregate';
  aggregate?: Maybe<Related_Vulnerabilities_Aggregate_Fields>;
  nodes: Array<Related_Vulnerabilities>;
};

/** aggregate fields of "related_vulnerabilities" */
export type Related_Vulnerabilities_Aggregate_Fields = {
  __typename?: 'related_vulnerabilities_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Related_Vulnerabilities_Max_Fields>;
  min?: Maybe<Related_Vulnerabilities_Min_Fields>;
};


/** aggregate fields of "related_vulnerabilities" */
export type Related_Vulnerabilities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Related_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Related_Vulnerabilities_Min_Order_By>;
};

/** input type for inserting array relation for remote table "related_vulnerabilities" */
export type Related_Vulnerabilities_Arr_Rel_Insert_Input = {
  data: Array<Related_Vulnerabilities_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Related_Vulnerabilities_On_Conflict>;
};

/** Boolean expression to filter rows from the table "related_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Related_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Related_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Related_Vulnerabilities_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  related_vulnerability_slug?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerabilityByVulnerabilitySlug?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_slug?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "related_vulnerabilities" */
export enum Related_Vulnerabilities_Constraint {
  /** unique or primary key constraint */
  RelatedVulnerabilitiesPkey = 'related_vulnerabilities_pkey',
  /** unique or primary key constraint */
  RelatedVulnerabilitiesVulnerabilitySlugRelatedVulnerabKey = 'related_vulnerabilities_vulnerability_slug_related_vulnerab_key'
}

/** input type for inserting data into table "related_vulnerabilities" */
export type Related_Vulnerabilities_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  related_vulnerability_slug?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerabilityByVulnerabilitySlug?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerability_slug?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Related_Vulnerabilities_Max_Fields = {
  __typename?: 'related_vulnerabilities_max_fields';
  id?: Maybe<Scalars['uuid']>;
  related_vulnerability_slug?: Maybe<Scalars['String']>;
  vulnerability_slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Related_Vulnerabilities_Min_Fields = {
  __typename?: 'related_vulnerabilities_min_fields';
  id?: Maybe<Scalars['uuid']>;
  related_vulnerability_slug?: Maybe<Scalars['String']>;
  vulnerability_slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "related_vulnerabilities" */
export type Related_Vulnerabilities_Mutation_Response = {
  __typename?: 'related_vulnerabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Related_Vulnerabilities>;
};

/** on conflict condition type for table "related_vulnerabilities" */
export type Related_Vulnerabilities_On_Conflict = {
  constraint: Related_Vulnerabilities_Constraint;
  update_columns?: Array<Related_Vulnerabilities_Update_Column>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};

/** Ordering options when selecting data from "related_vulnerabilities". */
export type Related_Vulnerabilities_Order_By = {
  id?: InputMaybe<Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerabilityByVulnerabilitySlug?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
};

/** primary key columns input for table: related_vulnerabilities */
export type Related_Vulnerabilities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "related_vulnerabilities" */
export enum Related_Vulnerabilities_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RelatedVulnerabilitySlug = 'related_vulnerability_slug',
  /** column name */
  VulnerabilitySlug = 'vulnerability_slug'
}

/** input type for updating data in table "related_vulnerabilities" */
export type Related_Vulnerabilities_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  related_vulnerability_slug?: InputMaybe<Scalars['String']>;
  vulnerability_slug?: InputMaybe<Scalars['String']>;
};

/** update columns of table "related_vulnerabilities" */
export enum Related_Vulnerabilities_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RelatedVulnerabilitySlug = 'related_vulnerability_slug',
  /** column name */
  VulnerabilitySlug = 'vulnerability_slug'
}

/**
 * scan reports
 *
 *
 * columns and relationships of "reports"
 *
 */
export type Reports = {
  __typename?: 'reports';
  db_date: Scalars['date'];
  distro_name: Scalars['String'];
  distro_version: Scalars['String'];
  grype_version: Scalars['String'];
  id: Scalars['uuid'];
  project_id: Scalars['uuid'];
  source_type: Scalars['String'];
  target: Scalars['String'];
};

/** aggregated selection of "reports" */
export type Reports_Aggregate = {
  __typename?: 'reports_aggregate';
  aggregate?: Maybe<Reports_Aggregate_Fields>;
  nodes: Array<Reports>;
};

/** aggregate fields of "reports" */
export type Reports_Aggregate_Fields = {
  __typename?: 'reports_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Reports_Max_Fields>;
  min?: Maybe<Reports_Min_Fields>;
};


/** aggregate fields of "reports" */
export type Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "reports". All fields are combined with a logical 'AND'. */
export type Reports_Bool_Exp = {
  _and?: InputMaybe<Array<Reports_Bool_Exp>>;
  _not?: InputMaybe<Reports_Bool_Exp>;
  _or?: InputMaybe<Array<Reports_Bool_Exp>>;
  db_date?: InputMaybe<Date_Comparison_Exp>;
  distro_name?: InputMaybe<String_Comparison_Exp>;
  distro_version?: InputMaybe<String_Comparison_Exp>;
  grype_version?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  source_type?: InputMaybe<String_Comparison_Exp>;
  target?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "reports" */
export enum Reports_Constraint {
  /** unique or primary key constraint */
  ReportsPkey = 'reports_pkey'
}

/** input type for inserting data into table "reports" */
export type Reports_Insert_Input = {
  db_date?: InputMaybe<Scalars['date']>;
  distro_name?: InputMaybe<Scalars['String']>;
  distro_version?: InputMaybe<Scalars['String']>;
  grype_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Reports_Max_Fields = {
  __typename?: 'reports_max_fields';
  db_date?: Maybe<Scalars['date']>;
  distro_name?: Maybe<Scalars['String']>;
  distro_version?: Maybe<Scalars['String']>;
  grype_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  source_type?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Reports_Min_Fields = {
  __typename?: 'reports_min_fields';
  db_date?: Maybe<Scalars['date']>;
  distro_name?: Maybe<Scalars['String']>;
  distro_version?: Maybe<Scalars['String']>;
  grype_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  source_type?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "reports" */
export type Reports_Mutation_Response = {
  __typename?: 'reports_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Reports>;
};

/** on conflict condition type for table "reports" */
export type Reports_On_Conflict = {
  constraint: Reports_Constraint;
  update_columns?: Array<Reports_Update_Column>;
  where?: InputMaybe<Reports_Bool_Exp>;
};

/** Ordering options when selecting data from "reports". */
export type Reports_Order_By = {
  db_date?: InputMaybe<Order_By>;
  distro_name?: InputMaybe<Order_By>;
  distro_version?: InputMaybe<Order_By>;
  grype_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reports */
export type Reports_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "reports" */
export enum Reports_Select_Column {
  /** column name */
  DbDate = 'db_date',
  /** column name */
  DistroName = 'distro_name',
  /** column name */
  DistroVersion = 'distro_version',
  /** column name */
  GrypeVersion = 'grype_version',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  SourceType = 'source_type',
  /** column name */
  Target = 'target'
}

/** input type for updating data in table "reports" */
export type Reports_Set_Input = {
  db_date?: InputMaybe<Scalars['date']>;
  distro_name?: InputMaybe<Scalars['String']>;
  distro_version?: InputMaybe<Scalars['String']>;
  grype_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

/** update columns of table "reports" */
export enum Reports_Update_Column {
  /** column name */
  DbDate = 'db_date',
  /** column name */
  DistroName = 'distro_name',
  /** column name */
  DistroVersion = 'distro_version',
  /** column name */
  GrypeVersion = 'grype_version',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  SourceType = 'source_type',
  /** column name */
  Target = 'target'
}

/**
 * An individual time a scan was run on a build
 *
 *
 * columns and relationships of "scans"
 *
 */
export type Scans = {
  __typename?: 'scans';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  created_at: Scalars['timestamp'];
  db_date: Scalars['date'];
  distro_name: Scalars['String'];
  distro_version: Scalars['String'];
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  grype_version: Scalars['String'];
  id: Scalars['uuid'];
  source_type: Scalars['String'];
  target: Scalars['String'];
};


/**
 * An individual time a scan was run on a build
 *
 *
 * columns and relationships of "scans"
 *
 */
export type ScansFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/**
 * An individual time a scan was run on a build
 *
 *
 * columns and relationships of "scans"
 *
 */
export type ScansFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};

/** aggregated selection of "scans" */
export type Scans_Aggregate = {
  __typename?: 'scans_aggregate';
  aggregate?: Maybe<Scans_Aggregate_Fields>;
  nodes: Array<Scans>;
};

/** aggregate fields of "scans" */
export type Scans_Aggregate_Fields = {
  __typename?: 'scans_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Scans_Max_Fields>;
  min?: Maybe<Scans_Min_Fields>;
};


/** aggregate fields of "scans" */
export type Scans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "scans" */
export type Scans_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Scans_Max_Order_By>;
  min?: InputMaybe<Scans_Min_Order_By>;
};

/** input type for inserting array relation for remote table "scans" */
export type Scans_Arr_Rel_Insert_Input = {
  data: Array<Scans_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scans". All fields are combined with a logical 'AND'. */
export type Scans_Bool_Exp = {
  _and?: InputMaybe<Array<Scans_Bool_Exp>>;
  _not?: InputMaybe<Scans_Bool_Exp>;
  _or?: InputMaybe<Array<Scans_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  db_date?: InputMaybe<Date_Comparison_Exp>;
  distro_name?: InputMaybe<String_Comparison_Exp>;
  distro_version?: InputMaybe<String_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  grype_version?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  source_type?: InputMaybe<String_Comparison_Exp>;
  target?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "scans" */
export enum Scans_Constraint {
  /** unique or primary key constraint */
  ScansPkey = 'scans_pkey'
}

/** input type for inserting data into table "scans" */
export type Scans_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  db_date?: InputMaybe<Scalars['date']>;
  distro_name?: InputMaybe<Scalars['String']>;
  distro_version?: InputMaybe<Scalars['String']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  grype_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Scans_Max_Fields = {
  __typename?: 'scans_max_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  db_date?: Maybe<Scalars['date']>;
  distro_name?: Maybe<Scalars['String']>;
  distro_version?: Maybe<Scalars['String']>;
  grype_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  source_type?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "scans" */
export type Scans_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  db_date?: InputMaybe<Order_By>;
  distro_name?: InputMaybe<Order_By>;
  distro_version?: InputMaybe<Order_By>;
  grype_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Scans_Min_Fields = {
  __typename?: 'scans_min_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  db_date?: Maybe<Scalars['date']>;
  distro_name?: Maybe<Scalars['String']>;
  distro_version?: Maybe<Scalars['String']>;
  grype_version?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  source_type?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "scans" */
export type Scans_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  db_date?: InputMaybe<Order_By>;
  distro_name?: InputMaybe<Order_By>;
  distro_version?: InputMaybe<Order_By>;
  grype_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scans" */
export type Scans_Mutation_Response = {
  __typename?: 'scans_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Scans>;
};

/** input type for inserting object relation for remote table "scans" */
export type Scans_Obj_Rel_Insert_Input = {
  data: Scans_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};

/** on conflict condition type for table "scans" */
export type Scans_On_Conflict = {
  constraint: Scans_Constraint;
  update_columns?: Array<Scans_Update_Column>;
  where?: InputMaybe<Scans_Bool_Exp>;
};

/** Ordering options when selecting data from "scans". */
export type Scans_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  db_date?: InputMaybe<Order_By>;
  distro_name?: InputMaybe<Order_By>;
  distro_version?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  grype_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scans */
export type Scans_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "scans" */
export enum Scans_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DbDate = 'db_date',
  /** column name */
  DistroName = 'distro_name',
  /** column name */
  DistroVersion = 'distro_version',
  /** column name */
  GrypeVersion = 'grype_version',
  /** column name */
  Id = 'id',
  /** column name */
  SourceType = 'source_type',
  /** column name */
  Target = 'target'
}

/** input type for updating data in table "scans" */
export type Scans_Set_Input = {
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  db_date?: InputMaybe<Scalars['date']>;
  distro_name?: InputMaybe<Scalars['String']>;
  distro_version?: InputMaybe<Scalars['String']>;
  grype_version?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

/** update columns of table "scans" */
export enum Scans_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DbDate = 'db_date',
  /** column name */
  DistroName = 'distro_name',
  /** column name */
  DistroVersion = 'distro_version',
  /** column name */
  GrypeVersion = 'grype_version',
  /** column name */
  Id = 'id',
  /** column name */
  SourceType = 'source_type',
  /** column name */
  Target = 'target'
}

/** columns and relationships of "settings" */
export type Settings = {
  __typename?: 'settings';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  is_org_settings?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "settings" */
export type Settings_Aggregate = {
  __typename?: 'settings_aggregate';
  aggregate?: Maybe<Settings_Aggregate_Fields>;
  nodes: Array<Settings>;
};

/** aggregate fields of "settings" */
export type Settings_Aggregate_Fields = {
  __typename?: 'settings_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Settings_Max_Fields>;
  min?: Maybe<Settings_Min_Fields>;
};


/** aggregate fields of "settings" */
export type Settings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Settings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "settings". All fields are combined with a logical 'AND'. */
export type Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Settings_Bool_Exp>>;
  _not?: InputMaybe<Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Settings_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_org_settings?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "settings" */
export enum Settings_Constraint {
  /** unique or primary key constraint */
  SettingsPkey = 'settings_pkey'
}

/** input type for inserting data into table "settings" */
export type Settings_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_org_settings?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Settings_Max_Fields = {
  __typename?: 'settings_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Settings_Min_Fields = {
  __typename?: 'settings_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "settings" */
export type Settings_Mutation_Response = {
  __typename?: 'settings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Settings>;
};

/** on conflict condition type for table "settings" */
export type Settings_On_Conflict = {
  constraint: Settings_Constraint;
  update_columns?: Array<Settings_Update_Column>;
  where?: InputMaybe<Settings_Bool_Exp>;
};

/** Ordering options when selecting data from "settings". */
export type Settings_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_org_settings?: InputMaybe<Order_By>;
};

/** primary key columns input for table: settings */
export type Settings_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "settings" */
export enum Settings_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsOrgSettings = 'is_org_settings'
}

/** input type for updating data in table "settings" */
export type Settings_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_org_settings?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "settings" */
export enum Settings_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsOrgSettings = 'is_org_settings'
}

/** Boolean expression to compare columns of type "severity_enum". All fields are combined with logical 'AND'. */
export type Severity_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['severity_enum']>;
  _gt?: InputMaybe<Scalars['severity_enum']>;
  _gte?: InputMaybe<Scalars['severity_enum']>;
  _in?: InputMaybe<Array<Scalars['severity_enum']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['severity_enum']>;
  _lte?: InputMaybe<Scalars['severity_enum']>;
  _neq?: InputMaybe<Scalars['severity_enum']>;
  _nin?: InputMaybe<Array<Scalars['severity_enum']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "instances" */
  instances: Array<Instances>;
  /** fetch aggregated fields from the table: "instances" */
  instances_aggregate: Instances_Aggregate;
  /** fetch data from the table: "instances" using primary key columns */
  instances_by_pk?: Maybe<Instances>;
  /** fetch data from the table: "organization_user" */
  organization_user: Array<Organization_User>;
  /** fetch aggregated fields from the table: "organization_user" */
  organization_user_aggregate: Organization_User_Aggregate;
  /** fetch data from the table: "organization_user" using primary key columns */
  organization_user_by_pk?: Maybe<Organization_User>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  package_versions: Array<Package_Versions>;
  /** An aggregate relationship */
  package_versions_aggregate: Package_Versions_Aggregate;
  /** fetch data from the table: "package_versions" using primary key columns */
  package_versions_by_pk?: Maybe<Package_Versions>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** An aggregate relationship */
  project_access_tokens_aggregate: Project_Access_Tokens_Aggregate;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  related_vulnerabilities_aggregate: Related_Vulnerabilities_Aggregate;
  /** fetch data from the table: "related_vulnerabilities" using primary key columns */
  related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** fetch data from the table: "reports" */
  reports: Array<Reports>;
  /** fetch aggregated fields from the table: "reports" */
  reports_aggregate: Reports_Aggregate;
  /** fetch data from the table: "reports" using primary key columns */
  reports_by_pk?: Maybe<Reports>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
  /** fetch data from the table: "scans" using primary key columns */
  scans_by_pk?: Maybe<Scans>;
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch aggregated fields from the table: "settings" */
  settings_aggregate: Settings_Aggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** fetch data from the table: "vulnerability_packages" */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** An aggregate relationship */
  vulnerability_packages_aggregate: Vulnerability_Packages_Aggregate;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
};


export type Subscription_RootBuildsArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


export type Subscription_RootBuilds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Builds_Order_By>>;
  where?: InputMaybe<Builds_Bool_Exp>;
};


export type Subscription_RootBuilds_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


export type Subscription_RootFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


export type Subscription_RootFindings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootInstancesArgs = {
  distinct_on?: InputMaybe<Array<Instances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Instances_Order_By>>;
  where?: InputMaybe<Instances_Bool_Exp>;
};


export type Subscription_RootInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Instances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Instances_Order_By>>;
  where?: InputMaybe<Instances_Bool_Exp>;
};


export type Subscription_RootInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrganization_UserArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


export type Subscription_RootOrganization_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


export type Subscription_RootOrganization_User_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};


export type Subscription_RootPackage_Versions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};


export type Subscription_RootPackage_Versions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProject_Access_TokensArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};


export type Subscription_RootProject_Access_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};


export type Subscription_RootProject_Access_Tokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootRelated_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootRelated_Vulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootRelated_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootReportsArgs = {
  distinct_on?: InputMaybe<Array<Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reports_Order_By>>;
  where?: InputMaybe<Reports_Bool_Exp>;
};


export type Subscription_RootReports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reports_Order_By>>;
  where?: InputMaybe<Reports_Bool_Exp>;
};


export type Subscription_RootReports_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Subscription_RootScans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Subscription_RootScans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSettingsArgs = {
  distinct_on?: InputMaybe<Array<Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Settings_Order_By>>;
  where?: InputMaybe<Settings_Bool_Exp>;
};


export type Subscription_RootSettings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Settings_Order_By>>;
  where?: InputMaybe<Settings_Bool_Exp>;
};


export type Subscription_RootSettings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerabilities_Order_By>>;
  where?: InputMaybe<Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootVulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerabilities_Order_By>>;
  where?: InputMaybe<Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootVulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};


export type Subscription_RootVulnerability_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};


export type Subscription_RootVulnerability_Packages_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamp'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  organization_users: Array<Organization_User>;
  /** An aggregate relationship */
  organization_users_aggregate: Organization_User_Aggregate;
};


/** columns and relationships of "users" */
export type UsersOrganization_UsersArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrganization_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  organization_users?: InputMaybe<Organization_User_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_users_aggregate?: InputMaybe<Organization_User_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "vulnerabilities" */
export type Vulnerabilities = {
  __typename?: 'vulnerabilities';
  created_at: Scalars['timestamp'];
  cvss_exploitability_score?: Maybe<Scalars['numeric']>;
  cvss_impact_score?: Maybe<Scalars['numeric']>;
  cvss_inferred?: Maybe<Scalars['Boolean']>;
  cvss_score?: Maybe<Scalars['numeric']>;
  cvss_version?: Maybe<Scalars['String']>;
  data_source: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  id: Scalars['uuid'];
  name: Scalars['String'];
  namespace: Scalars['String'];
  record_source?: Maybe<Scalars['String']>;
  /** An array relationship */
  relatedVulnerabilitiesByVulnerabilitySlug: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  relatedVulnerabilitiesByVulnerabilitySlug_aggregate: Related_Vulnerabilities_Aggregate;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  related_vulnerabilities_aggregate: Related_Vulnerabilities_Aggregate;
  severity: Scalars['severity_enum'];
  slug: Scalars['String'];
  topic_id?: Maybe<Scalars['uuid']>;
  urls?: Maybe<Scalars['_text']>;
  /** fetch data from the table: "vulnerability_packages" */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** An aggregate relationship */
  vulnerability_packages_aggregate: Vulnerability_Packages_Aggregate;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesRelatedVulnerabilitiesByVulnerabilitySlugArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesRelatedVulnerabilitiesByVulnerabilitySlug_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesRelated_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesRelated_Vulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesVulnerability_PackagesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesVulnerability_Packages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Packages_Order_By>>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};

/** aggregated selection of "vulnerabilities" */
export type Vulnerabilities_Aggregate = {
  __typename?: 'vulnerabilities_aggregate';
  aggregate?: Maybe<Vulnerabilities_Aggregate_Fields>;
  nodes: Array<Vulnerabilities>;
};

/** aggregate fields of "vulnerabilities" */
export type Vulnerabilities_Aggregate_Fields = {
  __typename?: 'vulnerabilities_aggregate_fields';
  avg?: Maybe<Vulnerabilities_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Vulnerabilities_Max_Fields>;
  min?: Maybe<Vulnerabilities_Min_Fields>;
  stddev?: Maybe<Vulnerabilities_Stddev_Fields>;
  stddev_pop?: Maybe<Vulnerabilities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vulnerabilities_Stddev_Samp_Fields>;
  sum?: Maybe<Vulnerabilities_Sum_Fields>;
  var_pop?: Maybe<Vulnerabilities_Var_Pop_Fields>;
  var_samp?: Maybe<Vulnerabilities_Var_Samp_Fields>;
  variance?: Maybe<Vulnerabilities_Variance_Fields>;
};


/** aggregate fields of "vulnerabilities" */
export type Vulnerabilities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vulnerabilities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Vulnerabilities_Avg_Fields = {
  __typename?: 'vulnerabilities_avg_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "vulnerabilities". All fields are combined with a logical 'AND'. */
export type Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerabilities_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  cvss_exploitability_score?: InputMaybe<Numeric_Comparison_Exp>;
  cvss_impact_score?: InputMaybe<Numeric_Comparison_Exp>;
  cvss_inferred?: InputMaybe<Boolean_Comparison_Exp>;
  cvss_score?: InputMaybe<Numeric_Comparison_Exp>;
  cvss_version?: InputMaybe<String_Comparison_Exp>;
  data_source?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  namespace?: InputMaybe<String_Comparison_Exp>;
  record_source?: InputMaybe<String_Comparison_Exp>;
  relatedVulnerabilitiesByVulnerabilitySlug?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  severity?: InputMaybe<Severity_Enum_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<Uuid_Comparison_Exp>;
  urls?: InputMaybe<_Text_Comparison_Exp>;
  vulnerability_packages?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};

/** unique or primary key constraints on table "vulnerabilities" */
export enum Vulnerabilities_Constraint {
  /** unique or primary key constraint */
  VulnerabilitiesPkey = 'vulnerabilities_pkey',
  /** unique or primary key constraint */
  VulnerabilitiesSlugKey = 'vulnerabilities_slug_key'
}

/** input type for incrementing numeric columns in table "vulnerabilities" */
export type Vulnerabilities_Inc_Input = {
  cvss_exploitability_score?: InputMaybe<Scalars['numeric']>;
  cvss_impact_score?: InputMaybe<Scalars['numeric']>;
  cvss_score?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "vulnerabilities" */
export type Vulnerabilities_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  cvss_exploitability_score?: InputMaybe<Scalars['numeric']>;
  cvss_impact_score?: InputMaybe<Scalars['numeric']>;
  cvss_inferred?: InputMaybe<Scalars['Boolean']>;
  cvss_score?: InputMaybe<Scalars['numeric']>;
  cvss_version?: InputMaybe<Scalars['String']>;
  data_source?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  record_source?: InputMaybe<Scalars['String']>;
  relatedVulnerabilitiesByVulnerabilitySlug?: InputMaybe<Related_Vulnerabilities_Arr_Rel_Insert_Input>;
  related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Arr_Rel_Insert_Input>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  slug?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['uuid']>;
  urls?: InputMaybe<Scalars['_text']>;
  vulnerability_packages?: InputMaybe<Vulnerability_Packages_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Vulnerabilities_Max_Fields = {
  __typename?: 'vulnerabilities_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  cvss_exploitability_score?: Maybe<Scalars['numeric']>;
  cvss_impact_score?: Maybe<Scalars['numeric']>;
  cvss_score?: Maybe<Scalars['numeric']>;
  cvss_version?: Maybe<Scalars['String']>;
  data_source?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  record_source?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Vulnerabilities_Min_Fields = {
  __typename?: 'vulnerabilities_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  cvss_exploitability_score?: Maybe<Scalars['numeric']>;
  cvss_impact_score?: Maybe<Scalars['numeric']>;
  cvss_score?: Maybe<Scalars['numeric']>;
  cvss_version?: Maybe<Scalars['String']>;
  data_source?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  record_source?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  topic_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "vulnerabilities" */
export type Vulnerabilities_Mutation_Response = {
  __typename?: 'vulnerabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerabilities>;
};

/** input type for inserting object relation for remote table "vulnerabilities" */
export type Vulnerabilities_Obj_Rel_Insert_Input = {
  data: Vulnerabilities_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Vulnerabilities_On_Conflict>;
};

/** on conflict condition type for table "vulnerabilities" */
export type Vulnerabilities_On_Conflict = {
  constraint: Vulnerabilities_Constraint;
  update_columns?: Array<Vulnerabilities_Update_Column>;
  where?: InputMaybe<Vulnerabilities_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerabilities". */
export type Vulnerabilities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  cvss_exploitability_score?: InputMaybe<Order_By>;
  cvss_impact_score?: InputMaybe<Order_By>;
  cvss_inferred?: InputMaybe<Order_By>;
  cvss_score?: InputMaybe<Order_By>;
  cvss_version?: InputMaybe<Order_By>;
  data_source?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  namespace?: InputMaybe<Order_By>;
  record_source?: InputMaybe<Order_By>;
  relatedVulnerabilitiesByVulnerabilitySlug_aggregate?: InputMaybe<Related_Vulnerabilities_Aggregate_Order_By>;
  related_vulnerabilities_aggregate?: InputMaybe<Related_Vulnerabilities_Aggregate_Order_By>;
  severity?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  urls?: InputMaybe<Order_By>;
  vulnerability_packages_aggregate?: InputMaybe<Vulnerability_Packages_Aggregate_Order_By>;
};

/** primary key columns input for table: vulnerabilities */
export type Vulnerabilities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerabilities" */
export enum Vulnerabilities_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CvssExploitabilityScore = 'cvss_exploitability_score',
  /** column name */
  CvssImpactScore = 'cvss_impact_score',
  /** column name */
  CvssInferred = 'cvss_inferred',
  /** column name */
  CvssScore = 'cvss_score',
  /** column name */
  CvssVersion = 'cvss_version',
  /** column name */
  DataSource = 'data_source',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Namespace = 'namespace',
  /** column name */
  RecordSource = 'record_source',
  /** column name */
  Severity = 'severity',
  /** column name */
  Slug = 'slug',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  Urls = 'urls'
}

/** input type for updating data in table "vulnerabilities" */
export type Vulnerabilities_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  cvss_exploitability_score?: InputMaybe<Scalars['numeric']>;
  cvss_impact_score?: InputMaybe<Scalars['numeric']>;
  cvss_inferred?: InputMaybe<Scalars['Boolean']>;
  cvss_score?: InputMaybe<Scalars['numeric']>;
  cvss_version?: InputMaybe<Scalars['String']>;
  data_source?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  record_source?: InputMaybe<Scalars['String']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  slug?: InputMaybe<Scalars['String']>;
  topic_id?: InputMaybe<Scalars['uuid']>;
  urls?: InputMaybe<Scalars['_text']>;
};

/** aggregate stddev on columns */
export type Vulnerabilities_Stddev_Fields = {
  __typename?: 'vulnerabilities_stddev_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Vulnerabilities_Stddev_Pop_Fields = {
  __typename?: 'vulnerabilities_stddev_pop_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Vulnerabilities_Stddev_Samp_Fields = {
  __typename?: 'vulnerabilities_stddev_samp_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Vulnerabilities_Sum_Fields = {
  __typename?: 'vulnerabilities_sum_fields';
  cvss_exploitability_score?: Maybe<Scalars['numeric']>;
  cvss_impact_score?: Maybe<Scalars['numeric']>;
  cvss_score?: Maybe<Scalars['numeric']>;
};

/** update columns of table "vulnerabilities" */
export enum Vulnerabilities_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CvssExploitabilityScore = 'cvss_exploitability_score',
  /** column name */
  CvssImpactScore = 'cvss_impact_score',
  /** column name */
  CvssInferred = 'cvss_inferred',
  /** column name */
  CvssScore = 'cvss_score',
  /** column name */
  CvssVersion = 'cvss_version',
  /** column name */
  DataSource = 'data_source',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Namespace = 'namespace',
  /** column name */
  RecordSource = 'record_source',
  /** column name */
  Severity = 'severity',
  /** column name */
  Slug = 'slug',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  Urls = 'urls'
}

/** aggregate var_pop on columns */
export type Vulnerabilities_Var_Pop_Fields = {
  __typename?: 'vulnerabilities_var_pop_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Vulnerabilities_Var_Samp_Fields = {
  __typename?: 'vulnerabilities_var_samp_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Vulnerabilities_Variance_Fields = {
  __typename?: 'vulnerabilities_variance_fields';
  cvss_exploitability_score?: Maybe<Scalars['Float']>;
  cvss_impact_score?: Maybe<Scalars['Float']>;
  cvss_score?: Maybe<Scalars['Float']>;
};

/**
 * All of the package vulnerabilities belonging to a given vulnerability
 *
 *
 * columns and relationships of "vulnerability_packages"
 *
 */
export type Vulnerability_Packages = {
  __typename?: 'vulnerability_packages';
  advisories: Scalars['String'];
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  package_versions: Array<Package_Versions>;
  /** An aggregate relationship */
  package_versions_aggregate: Package_Versions_Aggregate;
  slug: Scalars['String'];
  vuln_slug: Scalars['String'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
};


/**
 * All of the package vulnerabilities belonging to a given vulnerability
 *
 *
 * columns and relationships of "vulnerability_packages"
 *
 */
export type Vulnerability_PackagesFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/**
 * All of the package vulnerabilities belonging to a given vulnerability
 *
 *
 * columns and relationships of "vulnerability_packages"
 *
 */
export type Vulnerability_PackagesFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/**
 * All of the package vulnerabilities belonging to a given vulnerability
 *
 *
 * columns and relationships of "vulnerability_packages"
 *
 */
export type Vulnerability_PackagesPackage_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};


/**
 * All of the package vulnerabilities belonging to a given vulnerability
 *
 *
 * columns and relationships of "vulnerability_packages"
 *
 */
export type Vulnerability_PackagesPackage_Versions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
};

/** aggregated selection of "vulnerability_packages" */
export type Vulnerability_Packages_Aggregate = {
  __typename?: 'vulnerability_packages_aggregate';
  aggregate?: Maybe<Vulnerability_Packages_Aggregate_Fields>;
  nodes: Array<Vulnerability_Packages>;
};

/** aggregate fields of "vulnerability_packages" */
export type Vulnerability_Packages_Aggregate_Fields = {
  __typename?: 'vulnerability_packages_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Vulnerability_Packages_Max_Fields>;
  min?: Maybe<Vulnerability_Packages_Min_Fields>;
};


/** aggregate fields of "vulnerability_packages" */
export type Vulnerability_Packages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vulnerability_Packages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "vulnerability_packages" */
export type Vulnerability_Packages_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Packages_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Packages_Min_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability_packages" */
export type Vulnerability_Packages_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Packages_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Vulnerability_Packages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability_packages". All fields are combined with a logical 'AND'. */
export type Vulnerability_Packages_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Packages_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Packages_Bool_Exp>>;
  advisories?: InputMaybe<String_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  package_versions?: InputMaybe<Package_Versions_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  vuln_slug?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
};

/** unique or primary key constraints on table "vulnerability_packages" */
export enum Vulnerability_Packages_Constraint {
  /** unique or primary key constraint */
  VulnerabilityPackagesPkey = 'vulnerability_packages_pkey',
  /** unique or primary key constraint */
  VulnerabilityPackagesSlugKey = 'vulnerability_packages_slug_key'
}

/** input type for inserting data into table "vulnerability_packages" */
export type Vulnerability_Packages_Insert_Input = {
  advisories?: InputMaybe<Scalars['String']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  package_versions?: InputMaybe<Package_Versions_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
  vuln_slug?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Vulnerability_Packages_Max_Fields = {
  __typename?: 'vulnerability_packages_max_fields';
  advisories?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  vuln_slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "vulnerability_packages" */
export type Vulnerability_Packages_Max_Order_By = {
  advisories?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  vuln_slug?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Vulnerability_Packages_Min_Fields = {
  __typename?: 'vulnerability_packages_min_fields';
  advisories?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  vuln_slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "vulnerability_packages" */
export type Vulnerability_Packages_Min_Order_By = {
  advisories?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  vuln_slug?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability_packages" */
export type Vulnerability_Packages_Mutation_Response = {
  __typename?: 'vulnerability_packages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Packages>;
};

/** input type for inserting object relation for remote table "vulnerability_packages" */
export type Vulnerability_Packages_Obj_Rel_Insert_Input = {
  data: Vulnerability_Packages_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Vulnerability_Packages_On_Conflict>;
};

/** on conflict condition type for table "vulnerability_packages" */
export type Vulnerability_Packages_On_Conflict = {
  constraint: Vulnerability_Packages_Constraint;
  update_columns?: Array<Vulnerability_Packages_Update_Column>;
  where?: InputMaybe<Vulnerability_Packages_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability_packages". */
export type Vulnerability_Packages_Order_By = {
  advisories?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  package_versions_aggregate?: InputMaybe<Package_Versions_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  vuln_slug?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
};

/** primary key columns input for table: vulnerability_packages */
export type Vulnerability_Packages_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerability_packages" */
export enum Vulnerability_Packages_Select_Column {
  /** column name */
  Advisories = 'advisories',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  VulnSlug = 'vuln_slug'
}

/** input type for updating data in table "vulnerability_packages" */
export type Vulnerability_Packages_Set_Input = {
  advisories?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  vuln_slug?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability_packages" */
export enum Vulnerability_Packages_Update_Column {
  /** column name */
  Advisories = 'advisories',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  VulnSlug = 'vuln_slug'
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', created_at: any, email: string, id: any, name: string }> };

export type GetProjectQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type GetProjectQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', created_at: any, id: any, name: string, organization_id?: any | null | undefined, repo?: string | null | undefined, settings_id?: any | null | undefined, organization?: { __typename?: 'organizations', name: string } | null | undefined, builds: Array<{ __typename?: 'builds', id: any, findings_aggregate: { __typename?: 'findings_aggregate', aggregate?: { __typename?: 'findings_aggregate_fields', count: number } | null | undefined }, scans_aggregate: { __typename?: 'scans_aggregate', aggregate?: { __typename?: 'scans_aggregate_fields', count: number } | null | undefined }, scans: Array<{ __typename?: 'scans', created_at: any }> }> }> };

export type SampleVulnerabilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type SampleVulnerabilitiesQuery = { __typename?: 'query_root', vulnerabilities: Array<{ __typename?: 'vulnerabilities', id: any, name: string, namespace: string, record_source?: string | null | undefined, severity: any, cvss_score?: any | null | undefined, cvss_inferred?: boolean | null | undefined, created_at: any, description?: string | null | undefined, slug: string, data_source: string, vulnerability_packages: Array<{ __typename?: 'vulnerability_packages', name?: string | null | undefined, id: any, slug: string }> }> };

export type SearchVulnerabilitiesQueryVariables = Exact<{
  search: Scalars['String'];
  namespace?: InputMaybe<String_Comparison_Exp>;
  order_by?: InputMaybe<Array<Vulnerabilities_Order_By> | Vulnerabilities_Order_By>;
}>;


export type SearchVulnerabilitiesQuery = { __typename?: 'query_root', vulnerabilities: Array<{ __typename?: 'vulnerabilities', id: any, namespace: string, name: string, created_at: any, cvss_exploitability_score?: any | null | undefined, cvss_impact_score?: any | null | undefined, cvss_inferred?: boolean | null | undefined, cvss_score?: any | null | undefined, cvss_version?: string | null | undefined, data_source: string, description?: string | null | undefined, record_source?: string | null | undefined, severity: any, slug: string, topic_id?: any | null | undefined, urls?: any | null | undefined, related_vulnerabilities: Array<{ __typename?: 'related_vulnerabilities', vulnerability: { __typename?: 'vulnerabilities', id: any, name: string, namespace: string } }>, vulnerability_packages: Array<{ __typename?: 'vulnerability_packages', name?: string | null | undefined, id: any, slug: string }> }> };


export const GetCurrentUserDocument = `
    query GetCurrentUser {
  users {
    created_at
    email
    id
    name
  }
}
    `;
export const GetProjectDocument = `
    query GetProject($project_id: uuid!) {
  projects(where: {id: {_eq: $project_id}}) {
    created_at
    id
    name
    organization_id
    repo
    settings_id
    organization {
      name
    }
    builds(order_by: {created_at: desc}) {
      id
      findings_aggregate(
        distinct_on: package_name
        where: {severity: {_eq: "Critical"}}
      ) {
        aggregate {
          count(distinct: true, columns: package_name)
        }
      }
      scans_aggregate {
        aggregate {
          count
        }
      }
      scans(limit: 1, order_by: {created_at: desc}) {
        created_at
      }
    }
  }
}
    `;
export const SampleVulnerabilitiesDocument = `
    query SampleVulnerabilities {
  vulnerabilities(limit: 15) {
    id
    name
    namespace
    record_source
    severity
    cvss_score
    cvss_inferred
    created_at
    description
    slug
    data_source
    vulnerability_packages {
      name
      id
      slug
    }
  }
}
    `;
export const SearchVulnerabilitiesDocument = `
    query SearchVulnerabilities($search: String!, $namespace: String_comparison_exp = {_ilike: ""}, $order_by: [vulnerabilities_order_by!] = {}) {
  vulnerabilities(
    where: {_or: [{name: {_ilike: $search}}, {description: {_ilike: $search}}, {vulnerability_packages: {name: {_ilike: $search}}}], namespace: $namespace}
    order_by: $order_by
    limit: 30
  ) {
    id
    namespace
    name
    created_at
    cvss_exploitability_score
    cvss_impact_score
    cvss_inferred
    cvss_score
    cvss_version
    data_source
    description
    record_source
    severity
    slug
    topic_id
    urls
    related_vulnerabilities {
      vulnerability {
        id
        name
        namespace
      }
    }
    vulnerability_packages {
      name
      id
      slug
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetCurrentUser: build.query<GetCurrentUserQuery, GetCurrentUserQueryVariables | void>({
      query: (variables) => ({ document: GetCurrentUserDocument, variables })
    }),
    GetProject: build.query<GetProjectQuery, GetProjectQueryVariables>({
      query: (variables) => ({ document: GetProjectDocument, variables })
    }),
    SampleVulnerabilities: build.query<SampleVulnerabilitiesQuery, SampleVulnerabilitiesQueryVariables | void>({
      query: (variables) => ({ document: SampleVulnerabilitiesDocument, variables })
    }),
    SearchVulnerabilities: build.query<SearchVulnerabilitiesQuery, SearchVulnerabilitiesQueryVariables>({
      query: (variables) => ({ document: SearchVulnerabilitiesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useGetProjectQuery, useLazyGetProjectQuery, useSampleVulnerabilitiesQuery, useLazySampleVulnerabilitiesQuery, useSearchVulnerabilitiesQuery, useLazySearchVulnerabilitiesQuery } = injectedRtkApi;

