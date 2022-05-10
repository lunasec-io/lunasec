/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1 
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
  builds_source_type: any;
  date: any;
  fix_state_enum: any;
  github_webhook_event: any;
  jsonb: any;
  numeric: any;
  organization_user_role: any;
  severity_enum: any;
  timestamp: any;
  timestamptz: any;
  user_role: 'organization_user'|'lunatrace_admin';
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

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
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
  build_number?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamp'];
  existing_github_review_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  manifests: Array<Manifests>;
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  source_type: Scalars['builds_source_type'];
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
export type BuildsManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


/** columns and relationships of "builds" */
export type BuildsScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};

/** order by aggregate values of table "builds" */
export type Builds_Aggregate_Order_By = {
  avg?: InputMaybe<Builds_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Builds_Max_Order_By>;
  min?: InputMaybe<Builds_Min_Order_By>;
  stddev?: InputMaybe<Builds_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Builds_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Builds_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Builds_Sum_Order_By>;
  var_pop?: InputMaybe<Builds_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Builds_Var_Samp_Order_By>;
  variance?: InputMaybe<Builds_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "builds" */
export type Builds_Arr_Rel_Insert_Input = {
  data: Array<Builds_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};

/** order by avg() on columns of table "builds" */
export type Builds_Avg_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "builds". All fields are combined with a logical 'AND'. */
export type Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Builds_Bool_Exp>>;
  _not?: InputMaybe<Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Builds_Bool_Exp>>;
  agent_access_token?: InputMaybe<Uuid_Comparison_Exp>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_review_id?: InputMaybe<String_Comparison_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  git_branch?: InputMaybe<String_Comparison_Exp>;
  git_hash?: InputMaybe<String_Comparison_Exp>;
  git_remote?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manifests?: InputMaybe<Manifests_Bool_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  pull_request_id?: InputMaybe<String_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  scans?: InputMaybe<Scans_Bool_Exp>;
  source_type?: InputMaybe<Builds_Source_Type_Comparison_Exp>;
};

/** unique or primary key constraints on table "builds" */
export enum Builds_Constraint {
  /** unique or primary key constraint */
  BuildsAgentAccessTokenKey = 'builds_agent_access_token_key',
  /** unique or primary key constraint */
  BuildsBuildNumberProjectIdKey = 'builds_build_number_project_id_key',
  /** unique or primary key constraint */
  BuildsPkey = 'builds_pkey'
}

/** input type for incrementing numeric columns in table "builds" */
export type Builds_Inc_Input = {
  build_number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "builds" */
export type Builds_Insert_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_review_id?: InputMaybe<Scalars['String']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  manifests?: InputMaybe<Manifests_Arr_Rel_Insert_Input>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  scans?: InputMaybe<Scans_Arr_Rel_Insert_Input>;
  source_type?: InputMaybe<Scalars['builds_source_type']>;
};

/** order by max() on columns of table "builds" */
export type Builds_Max_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "builds" */
export type Builds_Min_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Builds_On_Conflict>;
};

/** on_conflict condition type for table "builds" */
export type Builds_On_Conflict = {
  constraint: Builds_Constraint;
  update_columns?: Array<Builds_Update_Column>;
  where?: InputMaybe<Builds_Bool_Exp>;
};

/** Ordering options when selecting data from "builds". */
export type Builds_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifests_aggregate?: InputMaybe<Manifests_Aggregate_Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  scans_aggregate?: InputMaybe<Scans_Aggregate_Order_By>;
  source_type?: InputMaybe<Order_By>;
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
  BuildNumber = 'build_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExistingGithubReviewId = 'existing_github_review_id',
  /** column name */
  GitBranch = 'git_branch',
  /** column name */
  GitHash = 'git_hash',
  /** column name */
  GitRemote = 'git_remote',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  PullRequestId = 'pull_request_id',
  /** column name */
  S3Url = 's3_url',
  /** column name */
  SourceType = 'source_type'
}

/** input type for updating data in table "builds" */
export type Builds_Set_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_review_id?: InputMaybe<Scalars['String']>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_url?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "builds_source_type". All fields are combined with logical 'AND'. */
export type Builds_Source_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['builds_source_type']>;
  _gt?: InputMaybe<Scalars['builds_source_type']>;
  _gte?: InputMaybe<Scalars['builds_source_type']>;
  _in?: InputMaybe<Array<Scalars['builds_source_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['builds_source_type']>;
  _lte?: InputMaybe<Scalars['builds_source_type']>;
  _neq?: InputMaybe<Scalars['builds_source_type']>;
  _nin?: InputMaybe<Array<Scalars['builds_source_type']>>;
};

/** order by stddev() on columns of table "builds" */
export type Builds_Stddev_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "builds" */
export type Builds_Stddev_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "builds" */
export type Builds_Stddev_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "builds" */
export type Builds_Sum_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** update columns of table "builds" */
export enum Builds_Update_Column {
  /** column name */
  AgentAccessToken = 'agent_access_token',
  /** column name */
  BuildNumber = 'build_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExistingGithubReviewId = 'existing_github_review_id',
  /** column name */
  GitBranch = 'git_branch',
  /** column name */
  GitHash = 'git_hash',
  /** column name */
  GitRemote = 'git_remote',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  S3Url = 's3_url'
}

/** order by var_pop() on columns of table "builds" */
export type Builds_Var_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "builds" */
export type Builds_Var_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "builds" */
export type Builds_Variance_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

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
  fix_state: Scalars['fix_state_enum'];
  fix_versions?: Maybe<Scalars['_text']>;
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
  severity: Scalars['severity_enum'];
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

/** order by aggregate values of table "findings" */
export type Findings_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Findings_Max_Order_By>;
  min?: InputMaybe<Findings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "findings" */
export type Findings_Arr_Rel_Insert_Input = {
  data: Array<Findings_Insert_Input>;
  /** upsert condition */
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
  fix_state?: InputMaybe<Fix_State_Enum_Comparison_Exp>;
  fix_versions?: InputMaybe<_Text_Comparison_Exp>;
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
  FindingsDedupeSlugBuildIdKey = 'findings_dedupe_slug_build_id_key',
  /** unique or primary key constraint */
  FindingsPkey = 'findings_pkey'
}

/** input type for inserting data into table "findings" */
export type Findings_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dedupe_slug?: InputMaybe<Scalars['String']>;
  fix_state?: InputMaybe<Scalars['fix_state_enum']>;
  fix_versions?: InputMaybe<Scalars['_text']>;
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

/** on_conflict condition type for table "findings" */
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
  fix_state?: InputMaybe<Order_By>;
  fix_versions?: InputMaybe<Order_By>;
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
  FixState = 'fix_state',
  /** column name */
  FixVersions = 'fix_versions',
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
  fix_state?: InputMaybe<Scalars['fix_state_enum']>;
  fix_versions?: InputMaybe<Scalars['_text']>;
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
  FixState = 'fix_state',
  /** column name */
  FixVersions = 'fix_versions',
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

/** Boolean expression to compare columns of type "fix_state_enum". All fields are combined with logical 'AND'. */
export type Fix_State_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['fix_state_enum']>;
  _gt?: InputMaybe<Scalars['fix_state_enum']>;
  _gte?: InputMaybe<Scalars['fix_state_enum']>;
  _in?: InputMaybe<Array<Scalars['fix_state_enum']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['fix_state_enum']>;
  _lte?: InputMaybe<Scalars['fix_state_enum']>;
  _neq?: InputMaybe<Scalars['fix_state_enum']>;
  _nin?: InputMaybe<Array<Scalars['fix_state_enum']>>;
};

/**
 * Metadata about a github repository and where to find it.
 *
 *
 * columns and relationships of "github_repositories"
 *
 */
export type Github_Repositories = {
  __typename?: 'github_repositories';
  git_url: Scalars['String'];
  github_id?: Maybe<Scalars['Int']>;
  github_node_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  traits: Scalars['jsonb'];
};


/**
 * Metadata about a github repository and where to find it.
 *
 *
 * columns and relationships of "github_repositories"
 *
 */
export type Github_RepositoriesTraitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "github_repositories" */
export type Github_Repositories_Aggregate_Order_By = {
  avg?: InputMaybe<Github_Repositories_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Github_Repositories_Max_Order_By>;
  min?: InputMaybe<Github_Repositories_Min_Order_By>;
  stddev?: InputMaybe<Github_Repositories_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Github_Repositories_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Github_Repositories_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Github_Repositories_Sum_Order_By>;
  var_pop?: InputMaybe<Github_Repositories_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Github_Repositories_Var_Samp_Order_By>;
  variance?: InputMaybe<Github_Repositories_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Github_Repositories_Append_Input = {
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "github_repositories" */
export type Github_Repositories_Arr_Rel_Insert_Input = {
  data: Array<Github_Repositories_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Github_Repositories_On_Conflict>;
};

/** order by avg() on columns of table "github_repositories" */
export type Github_Repositories_Avg_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "github_repositories". All fields are combined with a logical 'AND'. */
export type Github_Repositories_Bool_Exp = {
  _and?: InputMaybe<Array<Github_Repositories_Bool_Exp>>;
  _not?: InputMaybe<Github_Repositories_Bool_Exp>;
  _or?: InputMaybe<Array<Github_Repositories_Bool_Exp>>;
  git_url?: InputMaybe<String_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  traits?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "github_repositories" */
export enum Github_Repositories_Constraint {
  /** unique or primary key constraint */
  GithubRepositoriesGithubIdKey = 'github_repositories_github_id_key',
  /** unique or primary key constraint */
  GithubRepositoriesGithubNodeIdKey = 'github_repositories_github_node_id_key',
  /** unique or primary key constraint */
  GithubRepositoriesPkey = 'github_repositories_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Github_Repositories_Delete_At_Path_Input = {
  traits?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Github_Repositories_Delete_Elem_Input = {
  traits?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Github_Repositories_Delete_Key_Input = {
  traits?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "github_repositories" */
export type Github_Repositories_Inc_Input = {
  github_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "github_repositories" */
export type Github_Repositories_Insert_Input = {
  git_url?: InputMaybe<Scalars['String']>;
  github_id?: InputMaybe<Scalars['Int']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** order by max() on columns of table "github_repositories" */
export type Github_Repositories_Max_Order_By = {
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "github_repositories" */
export type Github_Repositories_Min_Order_By = {
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "github_repositories" */
export type Github_Repositories_Mutation_Response = {
  __typename?: 'github_repositories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Github_Repositories>;
};

/** input type for inserting object relation for remote table "github_repositories" */
export type Github_Repositories_Obj_Rel_Insert_Input = {
  data: Github_Repositories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Github_Repositories_On_Conflict>;
};

/** on_conflict condition type for table "github_repositories" */
export type Github_Repositories_On_Conflict = {
  constraint: Github_Repositories_Constraint;
  update_columns?: Array<Github_Repositories_Update_Column>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};

/** Ordering options when selecting data from "github_repositories". */
export type Github_Repositories_Order_By = {
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  traits?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Github_Repositories_Prepend_Input = {
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_repositories" */
export enum Github_Repositories_Select_Column {
  /** column name */
  GitUrl = 'git_url',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Traits = 'traits'
}

/** input type for updating data in table "github_repositories" */
export type Github_Repositories_Set_Input = {
  git_url?: InputMaybe<Scalars['String']>;
  github_id?: InputMaybe<Scalars['Int']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** order by stddev() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Pop_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Samp_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "github_repositories" */
export type Github_Repositories_Sum_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** update columns of table "github_repositories" */
export enum Github_Repositories_Update_Column {
  /** column name */
  GitUrl = 'git_url',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Traits = 'traits'
}

/** order by var_pop() on columns of table "github_repositories" */
export type Github_Repositories_Var_Pop_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "github_repositories" */
export type Github_Repositories_Var_Samp_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "github_repositories" */
export type Github_Repositories_Variance_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "github_webhook_event". All fields are combined with logical 'AND'. */
export type Github_Webhook_Event_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['github_webhook_event']>;
  _gt?: InputMaybe<Scalars['github_webhook_event']>;
  _gte?: InputMaybe<Scalars['github_webhook_event']>;
  _in?: InputMaybe<Array<Scalars['github_webhook_event']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['github_webhook_event']>;
  _lte?: InputMaybe<Scalars['github_webhook_event']>;
  _neq?: InputMaybe<Scalars['github_webhook_event']>;
  _nin?: InputMaybe<Array<Scalars['github_webhook_event']>>;
};

/** columns and relationships of "identities" */
export type Identities = {
  __typename?: 'identities';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  nid?: Maybe<Scalars['uuid']>;
  schema_id: Scalars['String'];
  state: Scalars['String'];
  state_changed_at?: Maybe<Scalars['timestamp']>;
  traits: Scalars['jsonb'];
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user?: Maybe<Users>;
};


/** columns and relationships of "identities" */
export type IdentitiesIdentity_Verifiable_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Identity_Verifiable_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identity_Verifiable_Addresses_Order_By>>;
  where?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
};


/** columns and relationships of "identities" */
export type IdentitiesTraitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "identities". All fields are combined with a logical 'AND'. */
export type Identities_Bool_Exp = {
  _and?: InputMaybe<Array<Identities_Bool_Exp>>;
  _not?: InputMaybe<Identities_Bool_Exp>;
  _or?: InputMaybe<Array<Identities_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identity_verifiable_addresses?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
  nid?: InputMaybe<Uuid_Comparison_Exp>;
  schema_id?: InputMaybe<String_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  state_changed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  traits?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "identities". */
export type Identities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_verifiable_addresses_aggregate?: InputMaybe<Identity_Verifiable_Addresses_Aggregate_Order_By>;
  nid?: InputMaybe<Order_By>;
  schema_id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  state_changed_at?: InputMaybe<Order_By>;
  traits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** select columns of table "identities" */
export enum Identities_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Nid = 'nid',
  /** column name */
  SchemaId = 'schema_id',
  /** column name */
  State = 'state',
  /** column name */
  StateChangedAt = 'state_changed_at',
  /** column name */
  Traits = 'traits',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses = {
  __typename?: 'identity_verifiable_addresses';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  /** An object relationship */
  identity: Identities;
  identity_id: Scalars['uuid'];
  nid?: Maybe<Scalars['uuid']>;
  status: Scalars['String'];
  updated_at: Scalars['timestamp'];
  value: Scalars['String'];
  verified: Scalars['Boolean'];
  verified_at?: Maybe<Scalars['timestamp']>;
  via: Scalars['String'];
};

/** order by aggregate values of table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Identity_Verifiable_Addresses_Max_Order_By>;
  min?: InputMaybe<Identity_Verifiable_Addresses_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "identity_verifiable_addresses". All fields are combined with a logical 'AND'. */
export type Identity_Verifiable_Addresses_Bool_Exp = {
  _and?: InputMaybe<Array<Identity_Verifiable_Addresses_Bool_Exp>>;
  _not?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
  _or?: InputMaybe<Array<Identity_Verifiable_Addresses_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identity?: InputMaybe<Identities_Bool_Exp>;
  identity_id?: InputMaybe<Uuid_Comparison_Exp>;
  nid?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
  verified?: InputMaybe<Boolean_Comparison_Exp>;
  verified_at?: InputMaybe<Timestamp_Comparison_Exp>;
  via?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_id?: InputMaybe<Order_By>;
  nid?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
  verified_at?: InputMaybe<Order_By>;
  via?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_id?: InputMaybe<Order_By>;
  nid?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
  verified_at?: InputMaybe<Order_By>;
  via?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "identity_verifiable_addresses". */
export type Identity_Verifiable_Addresses_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity?: InputMaybe<Identities_Order_By>;
  identity_id?: InputMaybe<Order_By>;
  nid?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
  verified?: InputMaybe<Order_By>;
  verified_at?: InputMaybe<Order_By>;
  via?: InputMaybe<Order_By>;
};

/** select columns of table "identity_verifiable_addresses" */
export enum Identity_Verifiable_Addresses_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityId = 'identity_id',
  /** column name */
  Nid = 'nid',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value',
  /** column name */
  Verified = 'verified',
  /** column name */
  VerifiedAt = 'verified_at',
  /** column name */
  Via = 'via'
}

/** columns and relationships of "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities = {
  __typename?: 'ignored_vulnerabilities';
  /** An object relationship */
  creator?: Maybe<Identities>;
  creator_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  locations: Scalars['jsonb'];
  note: Scalars['String'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
  vulnerability_id: Scalars['uuid'];
};


/** columns and relationships of "ignored_vulnerabilities" */
export type Ignored_VulnerabilitiesLocationsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ignored_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Ignored_Vulnerabilities_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "ignored_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Ignored_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Ignored_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Ignored_Vulnerabilities_Bool_Exp>>;
  creator?: InputMaybe<Identities_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  locations?: InputMaybe<Jsonb_Comparison_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Max_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Min_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "ignored_vulnerabilities". */
export type Ignored_Vulnerabilities_Order_By = {
  creator?: InputMaybe<Identities_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  locations?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** select columns of table "ignored_vulnerabilities" */
export enum Ignored_Vulnerabilities_Select_Column {
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  Id = 'id',
  /** column name */
  Locations = 'locations',
  /** column name */
  Note = 'note',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "manifests" */
export type Manifests = {
  __typename?: 'manifests';
  /** An object relationship */
  build?: Maybe<Builds>;
  build_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamp'];
  filename: Scalars['String'];
  id: Scalars['uuid'];
  message?: Maybe<Scalars['String']>;
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  s3_key: Scalars['String'];
  s3_url: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "manifests" */
export type Manifests_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Manifests_Max_Order_By>;
  min?: InputMaybe<Manifests_Min_Order_By>;
};

/** input type for inserting array relation for remote table "manifests" */
export type Manifests_Arr_Rel_Insert_Input = {
  data: Array<Manifests_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Manifests_On_Conflict>;
};

/** Boolean expression to filter rows from the table "manifests". All fields are combined with a logical 'AND'. */
export type Manifests_Bool_Exp = {
  _and?: InputMaybe<Array<Manifests_Bool_Exp>>;
  _not?: InputMaybe<Manifests_Bool_Exp>;
  _or?: InputMaybe<Array<Manifests_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  s3_key?: InputMaybe<String_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "manifests" */
export enum Manifests_Constraint {
  /** unique or primary key constraint */
  ManifestsPkey = 'manifests_pkey',
  /** unique or primary key constraint */
  ManifestsS3UrlKey = 'manifests_s3_url_key'
}

/** input type for inserting data into table "manifests" */
export type Manifests_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_key?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "manifests" */
export type Manifests_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_key?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "manifests" */
export type Manifests_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_key?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "manifests" */
export type Manifests_Mutation_Response = {
  __typename?: 'manifests_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manifests>;
};

/** on_conflict condition type for table "manifests" */
export type Manifests_On_Conflict = {
  constraint: Manifests_Constraint;
  update_columns?: Array<Manifests_Update_Column>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};

/** Ordering options when selecting data from "manifests". */
export type Manifests_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  s3_key?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: manifests */
export type Manifests_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "manifests" */
export enum Manifests_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  S3Key = 's3_key',
  /** column name */
  S3Url = 's3_url',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "manifests" */
export type Manifests_Set_Input = {
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_key?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "manifests" */
export enum Manifests_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  S3Key = 's3_key',
  /** column name */
  S3Url = 's3_url',
  /** column name */
  Status = 'status'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "builds" */
  delete_builds?: Maybe<Builds_Mutation_Response>;
  /** delete single row from the table: "builds" */
  delete_builds_by_pk?: Maybe<Builds>;
  /** delete data from the table: "manifests" */
  delete_manifests?: Maybe<Manifests_Mutation_Response>;
  /** delete single row from the table: "manifests" */
  delete_manifests_by_pk?: Maybe<Manifests>;
  /** delete data from the table: "topic_related_topics" */
  delete_topic_related_topics?: Maybe<Topic_Related_Topics_Mutation_Response>;
  /** delete single row from the table: "topic_related_topics" */
  delete_topic_related_topics_by_pk?: Maybe<Topic_Related_Topics>;
  /** insert data into the table: "builds" */
  insert_builds?: Maybe<Builds_Mutation_Response>;
  /** insert a single row into the table: "builds" */
  insert_builds_one?: Maybe<Builds>;
  /** insert data into the table: "findings" */
  insert_findings?: Maybe<Findings_Mutation_Response>;
  /** insert a single row into the table: "findings" */
  insert_findings_one?: Maybe<Findings>;
  /** insert data into the table: "github_repositories" */
  insert_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** insert a single row into the table: "github_repositories" */
  insert_github_repositories_one?: Maybe<Github_Repositories>;
  /** insert data into the table: "manifests" */
  insert_manifests?: Maybe<Manifests_Mutation_Response>;
  /** insert a single row into the table: "manifests" */
  insert_manifests_one?: Maybe<Manifests>;
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
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "scans" */
  insert_scans?: Maybe<Scans_Mutation_Response>;
  /** insert a single row into the table: "scans" */
  insert_scans_one?: Maybe<Scans>;
  /** insert data into the table: "topic_related_topics" */
  insert_topic_related_topics?: Maybe<Topic_Related_Topics_Mutation_Response>;
  /** insert a single row into the table: "topic_related_topics" */
  insert_topic_related_topics_one?: Maybe<Topic_Related_Topics>;
  /** insert data into the table: "topic_vulnerabilities" */
  insert_topic_vulnerabilities?: Maybe<Topic_Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "topic_vulnerabilities" */
  insert_topic_vulnerabilities_one?: Maybe<Topic_Vulnerabilities>;
  /** insert data into the table: "topics" */
  insert_topics?: Maybe<Topics_Mutation_Response>;
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
  /** insert data into the table: "webhook_cache" */
  insert_webhook_cache?: Maybe<Webhook_Cache_Mutation_Response>;
  /** insert a single row into the table: "webhook_cache" */
  insert_webhook_cache_one?: Maybe<Webhook_Cache>;
  /** update data of the table: "builds" */
  update_builds?: Maybe<Builds_Mutation_Response>;
  /** update single row of the table: "builds" */
  update_builds_by_pk?: Maybe<Builds>;
  /** update data of the table: "findings" */
  update_findings?: Maybe<Findings_Mutation_Response>;
  /** update single row of the table: "findings" */
  update_findings_by_pk?: Maybe<Findings>;
  /** update data of the table: "github_repositories" */
  update_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** update data of the table: "manifests" */
  update_manifests?: Maybe<Manifests_Mutation_Response>;
  /** update single row of the table: "manifests" */
  update_manifests_by_pk?: Maybe<Manifests>;
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
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "scans" */
  update_scans?: Maybe<Scans_Mutation_Response>;
  /** update single row of the table: "scans" */
  update_scans_by_pk?: Maybe<Scans>;
  /** update data of the table: "topic_related_topics" */
  update_topic_related_topics?: Maybe<Topic_Related_Topics_Mutation_Response>;
  /** update single row of the table: "topic_related_topics" */
  update_topic_related_topics_by_pk?: Maybe<Topic_Related_Topics>;
  /** update data of the table: "topic_vulnerabilities" */
  update_topic_vulnerabilities?: Maybe<Topic_Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "topic_vulnerabilities" */
  update_topic_vulnerabilities_by_pk?: Maybe<Topic_Vulnerabilities>;
  /** update data of the table: "topics" */
  update_topics?: Maybe<Topics_Mutation_Response>;
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
  /** update data of the table: "webhook_cache" */
  update_webhook_cache?: Maybe<Webhook_Cache_Mutation_Response>;
  /** update single row of the table: "webhook_cache" */
  update_webhook_cache_by_pk?: Maybe<Webhook_Cache>;
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
export type Mutation_RootDelete_ManifestsArgs = {
  where: Manifests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Manifests_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Topic_Related_TopicsArgs = {
  where: Topic_Related_Topics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Topic_Related_Topics_By_PkArgs = {
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
export type Mutation_RootInsert_Github_RepositoriesArgs = {
  objects: Array<Github_Repositories_Insert_Input>;
  on_conflict?: InputMaybe<Github_Repositories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Github_Repositories_OneArgs = {
  object: Github_Repositories_Insert_Input;
  on_conflict?: InputMaybe<Github_Repositories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ManifestsArgs = {
  objects: Array<Manifests_Insert_Input>;
  on_conflict?: InputMaybe<Manifests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifests_OneArgs = {
  object: Manifests_Insert_Input;
  on_conflict?: InputMaybe<Manifests_On_Conflict>;
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
export type Mutation_RootInsert_Topic_Related_TopicsArgs = {
  objects: Array<Topic_Related_Topics_Insert_Input>;
  on_conflict?: InputMaybe<Topic_Related_Topics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topic_Related_Topics_OneArgs = {
  object: Topic_Related_Topics_Insert_Input;
  on_conflict?: InputMaybe<Topic_Related_Topics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topic_VulnerabilitiesArgs = {
  objects: Array<Topic_Vulnerabilities_Insert_Input>;
  on_conflict?: InputMaybe<Topic_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Topic_Vulnerabilities_OneArgs = {
  object: Topic_Vulnerabilities_Insert_Input;
  on_conflict?: InputMaybe<Topic_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TopicsArgs = {
  objects: Array<Topics_Insert_Input>;
  on_conflict?: InputMaybe<Topics_On_Conflict>;
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
export type Mutation_RootInsert_Webhook_CacheArgs = {
  objects: Array<Webhook_Cache_Insert_Input>;
  on_conflict?: InputMaybe<Webhook_Cache_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Webhook_Cache_OneArgs = {
  object: Webhook_Cache_Insert_Input;
  on_conflict?: InputMaybe<Webhook_Cache_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_BuildsArgs = {
  _inc?: InputMaybe<Builds_Inc_Input>;
  _set?: InputMaybe<Builds_Set_Input>;
  where: Builds_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Builds_By_PkArgs = {
  _inc?: InputMaybe<Builds_Inc_Input>;
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
export type Mutation_RootUpdate_Github_RepositoriesArgs = {
  _append?: InputMaybe<Github_Repositories_Append_Input>;
  _delete_at_path?: InputMaybe<Github_Repositories_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Github_Repositories_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Github_Repositories_Delete_Key_Input>;
  _inc?: InputMaybe<Github_Repositories_Inc_Input>;
  _prepend?: InputMaybe<Github_Repositories_Prepend_Input>;
  _set?: InputMaybe<Github_Repositories_Set_Input>;
  where: Github_Repositories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ManifestsArgs = {
  _set?: InputMaybe<Manifests_Set_Input>;
  where: Manifests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manifests_By_PkArgs = {
  _set?: InputMaybe<Manifests_Set_Input>;
  pk_columns: Manifests_Pk_Columns_Input;
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
  _inc?: InputMaybe<Organizations_Inc_Input>;
  _set?: InputMaybe<Organizations_Set_Input>;
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _inc?: InputMaybe<Organizations_Inc_Input>;
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
export type Mutation_RootUpdate_ScansArgs = {
  _inc?: InputMaybe<Scans_Inc_Input>;
  _set?: InputMaybe<Scans_Set_Input>;
  where: Scans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scans_By_PkArgs = {
  _inc?: InputMaybe<Scans_Inc_Input>;
  _set?: InputMaybe<Scans_Set_Input>;
  pk_columns: Scans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Topic_Related_TopicsArgs = {
  _set?: InputMaybe<Topic_Related_Topics_Set_Input>;
  where: Topic_Related_Topics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Topic_Related_Topics_By_PkArgs = {
  _set?: InputMaybe<Topic_Related_Topics_Set_Input>;
  pk_columns: Topic_Related_Topics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Topic_VulnerabilitiesArgs = {
  _set?: InputMaybe<Topic_Vulnerabilities_Set_Input>;
  where: Topic_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Topic_Vulnerabilities_By_PkArgs = {
  _set?: InputMaybe<Topic_Vulnerabilities_Set_Input>;
  pk_columns: Topic_Vulnerabilities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TopicsArgs = {
  _append?: InputMaybe<Topics_Append_Input>;
  _delete_at_path?: InputMaybe<Topics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Topics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Topics_Delete_Key_Input>;
  _inc?: InputMaybe<Topics_Inc_Input>;
  _prepend?: InputMaybe<Topics_Prepend_Input>;
  _set?: InputMaybe<Topics_Set_Input>;
  where: Topics_Bool_Exp;
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
  _set?: InputMaybe<Vulnerabilities_Set_Input>;
  where: Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerabilities_By_PkArgs = {
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


/** mutation root */
export type Mutation_RootUpdate_Webhook_CacheArgs = {
  _set?: InputMaybe<Webhook_Cache_Set_Input>;
  where: Webhook_Cache_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Webhook_Cache_By_PkArgs = {
  _set?: InputMaybe<Webhook_Cache_Set_Input>;
  pk_columns: Webhook_Cache_Pk_Columns_Input;
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
  role: Scalars['organization_user_role'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
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
  /** upsert condition */
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
  role?: InputMaybe<Organization_User_Role_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organization_user" */
export enum Organization_User_Constraint {
  /** unique or primary key constraint */
  OrganizationUserPkey = 'organization_user_pkey',
  /** unique or primary key constraint */
  OrganizationUserUserIdOrganizationIdKey = 'organization_user_user_id_organization_id_key'
}

/** input type for inserting data into table "organization_user" */
export type Organization_User_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['organization_user_role']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "organization_user" */
export type Organization_User_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
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

/** on_conflict condition type for table "organization_user" */
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
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: organization_user */
export type Organization_User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "organization_user_role". All fields are combined with logical 'AND'. */
export type Organization_User_Role_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['organization_user_role']>;
  _gt?: InputMaybe<Scalars['organization_user_role']>;
  _gte?: InputMaybe<Scalars['organization_user_role']>;
  _in?: InputMaybe<Array<Scalars['organization_user_role']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['organization_user_role']>;
  _lte?: InputMaybe<Scalars['organization_user_role']>;
  _neq?: InputMaybe<Scalars['organization_user_role']>;
  _nin?: InputMaybe<Array<Scalars['organization_user_role']>>;
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
  Role = 'role',
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
  role?: InputMaybe<Scalars['organization_user_role']>;
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
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  createdAt: Scalars['timestamp'];
  /** An object relationship */
  creator?: Maybe<Users>;
  creator_id?: Maybe<Scalars['uuid']>;
  github_id?: Maybe<Scalars['Int']>;
  github_node_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  installation_id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  /** An array relationship */
  organization_users: Array<Organization_User>;
  /** An array relationship */
  projects: Array<Projects>;
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
export type OrganizationsProjectsArgs = {
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
  avg?: Maybe<Organizations_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Organizations_Max_Fields>;
  min?: Maybe<Organizations_Min_Fields>;
  stddev?: Maybe<Organizations_Stddev_Fields>;
  stddev_pop?: Maybe<Organizations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Organizations_Stddev_Samp_Fields>;
  sum?: Maybe<Organizations_Sum_Fields>;
  var_pop?: Maybe<Organizations_Var_Pop_Fields>;
  var_samp?: Maybe<Organizations_Var_Samp_Fields>;
  variance?: Maybe<Organizations_Variance_Fields>;
};


/** aggregate fields of "organizations" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Organizations_Avg_Fields = {
  __typename?: 'organizations_avg_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  creator?: InputMaybe<Users_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  installation_id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
  projects?: InputMaybe<Projects_Bool_Exp>;
  settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint */
  OrganizationsGithubIdKey = 'organizations_github_id_key',
  /** unique or primary key constraint */
  OrganizationsGithubNodeIdKey = 'organizations_github_node_id_key',
  /** unique or primary key constraint */
  OrganizationsPkey = 'organizations_pkey'
}

/** input type for incrementing numeric columns in table "organizations" */
export type Organizations_Inc_Input = {
  github_id?: InputMaybe<Scalars['Int']>;
  installation_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']>;
  creator?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  github_id?: InputMaybe<Scalars['Int']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  github_owner_type?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  installation_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  organization_users?: InputMaybe<Organization_User_Arr_Rel_Insert_Input>;
  projects?: InputMaybe<Projects_Arr_Rel_Insert_Input>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  creator_id?: Maybe<Scalars['uuid']>;
  github_id?: Maybe<Scalars['Int']>;
  github_node_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  installation_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  settings_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  creator_id?: Maybe<Scalars['uuid']>;
  github_id?: Maybe<Scalars['Int']>;
  github_node_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  installation_id?: Maybe<Scalars['Int']>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** on_conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint;
  update_columns?: Array<Organizations_Update_Column>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  creator?: InputMaybe<Users_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  installation_id?: InputMaybe<Order_By>;
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
  CreatorId = 'creator_id',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  Id = 'id',
  /** column name */
  InstallationId = 'installation_id',
  /** column name */
  Name = 'name',
  /** column name */
  SettingsId = 'settings_id'
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  github_id?: InputMaybe<Scalars['Int']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  github_owner_type?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  installation_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  settings_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Organizations_Stddev_Fields = {
  __typename?: 'organizations_stddev_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Organizations_Stddev_Pop_Fields = {
  __typename?: 'organizations_stddev_pop_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Organizations_Stddev_Samp_Fields = {
  __typename?: 'organizations_stddev_samp_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Organizations_Sum_Fields = {
  __typename?: 'organizations_sum_fields';
  github_id?: Maybe<Scalars['Int']>;
  installation_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  GithubOwnerType = 'github_owner_type',
  /** column name */
  Id = 'id',
  /** column name */
  InstallationId = 'installation_id',
  /** column name */
  Name = 'name',
  /** column name */
  SettingsId = 'settings_id'
}

/** aggregate var_pop on columns */
export type Organizations_Var_Pop_Fields = {
  __typename?: 'organizations_var_pop_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Organizations_Var_Samp_Fields = {
  __typename?: 'organizations_var_samp_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Organizations_Variance_Fields = {
  __typename?: 'organizations_variance_fields';
  github_id?: Maybe<Scalars['Float']>;
  installation_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "package_versions" */
export type Package_Versions = {
  __typename?: 'package_versions';
  cpes: Scalars['_text'];
  /** An array relationship */
  findings: Array<Findings>;
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

/** order by aggregate values of table "package_versions" */
export type Package_Versions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Versions_Max_Order_By>;
  min?: InputMaybe<Package_Versions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package_versions" */
export type Package_Versions_Arr_Rel_Insert_Input = {
  data: Array<Package_Versions_Insert_Input>;
  /** upsert condition */
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
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
  vulnerability_package?: InputMaybe<Vulnerability_Packages_Obj_Rel_Insert_Input>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Versions_On_Conflict>;
};

/** on_conflict condition type for table "package_versions" */
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
  slug?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package_versions" */
export enum Package_Versions_Update_Column {
  /** column name */
  Slug = 'slug'
}

/** columns and relationships of "project_access_tokens" */
export type Project_Access_Tokens = {
  __typename?: 'project_access_tokens';
  access_token: Scalars['uuid'];
  /** An object relationship */
  created_by_user?: Maybe<Identities>;
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_uuid: Scalars['uuid'];
};

/** order by aggregate values of table "project_access_tokens" */
export type Project_Access_Tokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Access_Tokens_Max_Order_By>;
  min?: InputMaybe<Project_Access_Tokens_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "project_access_tokens". All fields are combined with a logical 'AND'. */
export type Project_Access_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  _not?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  access_token?: InputMaybe<Uuid_Comparison_Exp>;
  created_by_user?: InputMaybe<Identities_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Max_Order_By = {
  access_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Min_Order_By = {
  access_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "project_access_tokens". */
export type Project_Access_Tokens_Order_By = {
  access_token?: InputMaybe<Order_By>;
  created_by_user?: InputMaybe<Identities_Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_uuid?: InputMaybe<Order_By>;
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

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  /** An array relationship */
  builds: Array<Builds>;
  created_at: Scalars['timestamp'];
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** An object relationship */
  github_repository?: Maybe<Github_Repositories>;
  id: Scalars['uuid'];
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** An array relationship */
  manifests: Array<Manifests>;
  name: Scalars['String'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  repo?: Maybe<Scalars['String']>;
  /** An array relationship */
  reports: Array<Project_Access_Tokens>;
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
export type ProjectsGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
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
export type ProjectsReportsArgs = {
  distinct_on?: InputMaybe<Array<Project_Access_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Access_Tokens_Order_By>>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Bool_Exp>>;
  _not?: InputMaybe<Projects_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Bool_Exp>>;
  builds?: InputMaybe<Builds_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  github_repositories?: InputMaybe<Github_Repositories_Bool_Exp>;
  github_repository?: InputMaybe<Github_Repositories_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  manifests?: InputMaybe<Manifests_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  project_access_tokens?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  repo?: InputMaybe<String_Comparison_Exp>;
  reports?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  ProjectsNameOrganizationIdKey = 'projects_name_organization_id_key',
  /** unique or primary key constraint */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  builds?: InputMaybe<Builds_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  github_repositories?: InputMaybe<Github_Repositories_Arr_Rel_Insert_Input>;
  github_repository?: InputMaybe<Github_Repositories_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  manifests?: InputMaybe<Manifests_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  repo?: InputMaybe<Scalars['String']>;
  settings_id?: InputMaybe<Scalars['uuid']>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** on_conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns?: Array<Projects_Update_Column>;
  where?: InputMaybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "projects". */
export type Projects_Order_By = {
  builds_aggregate?: InputMaybe<Builds_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  github_repositories_aggregate?: InputMaybe<Github_Repositories_Aggregate_Order_By>;
  github_repository?: InputMaybe<Github_Repositories_Order_By>;
  id?: InputMaybe<Order_By>;
  ignored_vulnerabilities_aggregate?: InputMaybe<Ignored_Vulnerabilities_Aggregate_Order_By>;
  manifests_aggregate?: InputMaybe<Manifests_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  project_access_tokens_aggregate?: InputMaybe<Project_Access_Tokens_Aggregate_Order_By>;
  repo?: InputMaybe<Order_By>;
  reports_aggregate?: InputMaybe<Project_Access_Tokens_Aggregate_Order_By>;
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
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  /** fetch data from the table: "identity_verifiable_addresses" using primary key columns */
  identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** An array relationship */
  manifests: Array<Manifests>;
  /** fetch data from the table: "manifests" using primary key columns */
  manifests_by_pk?: Maybe<Manifests>;
  /** fetch data from the table: "organization_user" */
  organization_user: Array<Organization_User>;
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
  /** fetch data from the table: "package_versions" using primary key columns */
  package_versions_by_pk?: Maybe<Package_Versions>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** fetch data from the table: "related_vulnerabilities" using primary key columns */
  related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** An array relationship */
  scans: Array<Scans>;
  /** fetch data from the table: "scans" using primary key columns */
  scans_by_pk?: Maybe<Scans>;
  /** fetch data from the table: "topic_related_topics" */
  topic_related_topics: Array<Topic_Related_Topics>;
  /** fetch data from the table: "topic_related_topics" using primary key columns */
  topic_related_topics_by_pk?: Maybe<Topic_Related_Topics>;
  /** An array relationship */
  topic_vulnerabilities: Array<Topic_Vulnerabilities>;
  /** fetch data from the table: "topic_vulnerabilities" using primary key columns */
  topic_vulnerabilities_by_pk?: Maybe<Topic_Vulnerabilities>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** An array relationship */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
};


export type Query_RootBuildsArgs = {
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


export type Query_RootFindings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Query_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Query_RootIdentities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIdentity_Verifiable_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Identity_Verifiable_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identity_Verifiable_Addresses_Order_By>>;
  where?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
};


export type Query_RootIdentity_Verifiable_Addresses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


export type Query_RootIgnored_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


export type Query_RootManifests_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrganization_UserArgs = {
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


export type Query_RootRelated_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Query_RootScans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTopic_Related_TopicsArgs = {
  distinct_on?: InputMaybe<Array<Topic_Related_Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topic_Related_Topics_Order_By>>;
  where?: InputMaybe<Topic_Related_Topics_Bool_Exp>;
};


export type Query_RootTopic_Related_Topics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTopic_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Topic_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topic_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
};


export type Query_RootTopic_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
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


export type Query_RootVulnerability_Packages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWebhook_CacheArgs = {
  distinct_on?: InputMaybe<Array<Webhook_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webhook_Cache_Order_By>>;
  where?: InputMaybe<Webhook_Cache_Bool_Exp>;
};


export type Query_RootWebhook_Cache_By_PkArgs = {
  delivery_id: Scalars['uuid'];
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
  /** An object relationship */
  parent: Vulnerabilities;
  related_vulnerability_slug: Scalars['String'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
  /** An object relationship */
  vulnerabilityByVulnerabilitySlug: Vulnerabilities;
  vulnerability_slug: Scalars['String'];
};

/** order by aggregate values of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Related_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Related_Vulnerabilities_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "related_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Related_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Related_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Related_Vulnerabilities_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Vulnerabilities_Bool_Exp>;
  related_vulnerability_slug?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerabilityByVulnerabilitySlug?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_slug?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "related_vulnerabilities" */
export type Related_Vulnerabilities_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "related_vulnerabilities". */
export type Related_Vulnerabilities_Order_By = {
  id?: InputMaybe<Order_By>;
  parent?: InputMaybe<Vulnerabilities_Order_By>;
  related_vulnerability_slug?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerabilityByVulnerabilitySlug?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_slug?: InputMaybe<Order_By>;
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
  grype_version: Scalars['String'];
  id: Scalars['uuid'];
  scan_number?: Maybe<Scalars['Int']>;
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

/** order by aggregate values of table "scans" */
export type Scans_Aggregate_Order_By = {
  avg?: InputMaybe<Scans_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Scans_Max_Order_By>;
  min?: InputMaybe<Scans_Min_Order_By>;
  stddev?: InputMaybe<Scans_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Scans_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Scans_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Scans_Sum_Order_By>;
  var_pop?: InputMaybe<Scans_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Scans_Var_Samp_Order_By>;
  variance?: InputMaybe<Scans_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "scans" */
export type Scans_Arr_Rel_Insert_Input = {
  data: Array<Scans_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};

/** order by avg() on columns of table "scans" */
export type Scans_Avg_Order_By = {
  scan_number?: InputMaybe<Order_By>;
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
  scan_number?: InputMaybe<Int_Comparison_Exp>;
  source_type?: InputMaybe<String_Comparison_Exp>;
  target?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "scans" */
export enum Scans_Constraint {
  /** unique or primary key constraint */
  ScansPkey = 'scans_pkey',
  /** unique or primary key constraint */
  ScansScanNumberBuildIdKey = 'scans_scan_number_build_id_key'
}

/** input type for incrementing numeric columns in table "scans" */
export type Scans_Inc_Input = {
  scan_number?: InputMaybe<Scalars['Int']>;
};

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
  scan_number?: InputMaybe<Scalars['Int']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
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
  scan_number?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
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
  scan_number?: InputMaybe<Order_By>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Scans_On_Conflict>;
};

/** on_conflict condition type for table "scans" */
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
  scan_number?: InputMaybe<Order_By>;
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
  ScanNumber = 'scan_number',
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
  scan_number?: InputMaybe<Scalars['Int']>;
  source_type?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

/** order by stddev() on columns of table "scans" */
export type Scans_Stddev_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "scans" */
export type Scans_Stddev_Pop_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "scans" */
export type Scans_Stddev_Samp_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "scans" */
export type Scans_Sum_Order_By = {
  scan_number?: InputMaybe<Order_By>;
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
  ScanNumber = 'scan_number',
  /** column name */
  SourceType = 'source_type',
  /** column name */
  Target = 'target'
}

/** order by var_pop() on columns of table "scans" */
export type Scans_Var_Pop_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "scans" */
export type Scans_Var_Samp_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "scans" */
export type Scans_Variance_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

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
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  /** fetch data from the table: "identity_verifiable_addresses" using primary key columns */
  identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** An array relationship */
  manifests: Array<Manifests>;
  /** fetch data from the table: "manifests" using primary key columns */
  manifests_by_pk?: Maybe<Manifests>;
  /** fetch data from the table: "organization_user" */
  organization_user: Array<Organization_User>;
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
  /** fetch data from the table: "package_versions" using primary key columns */
  package_versions_by_pk?: Maybe<Package_Versions>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** fetch data from the table: "related_vulnerabilities" using primary key columns */
  related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  /** An array relationship */
  scans: Array<Scans>;
  /** fetch data from the table: "scans" using primary key columns */
  scans_by_pk?: Maybe<Scans>;
  /** fetch data from the table: "topic_related_topics" */
  topic_related_topics: Array<Topic_Related_Topics>;
  /** fetch data from the table: "topic_related_topics" using primary key columns */
  topic_related_topics_by_pk?: Maybe<Topic_Related_Topics>;
  /** An array relationship */
  topic_vulnerabilities: Array<Topic_Vulnerabilities>;
  /** fetch data from the table: "topic_vulnerabilities" using primary key columns */
  topic_vulnerabilities_by_pk?: Maybe<Topic_Vulnerabilities>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** An array relationship */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
};


export type Subscription_RootBuildsArgs = {
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


export type Subscription_RootFindings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Subscription_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Subscription_RootIdentities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIdentity_Verifiable_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Identity_Verifiable_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identity_Verifiable_Addresses_Order_By>>;
  where?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
};


export type Subscription_RootIdentity_Verifiable_Addresses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootIgnored_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


export type Subscription_RootManifests_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrganization_UserArgs = {
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


export type Subscription_RootRelated_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};


export type Subscription_RootScans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTopic_Related_TopicsArgs = {
  distinct_on?: InputMaybe<Array<Topic_Related_Topics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topic_Related_Topics_Order_By>>;
  where?: InputMaybe<Topic_Related_Topics_Bool_Exp>;
};


export type Subscription_RootTopic_Related_Topics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTopic_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Topic_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topic_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootTopic_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
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


export type Subscription_RootVulnerability_Packages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWebhook_CacheArgs = {
  distinct_on?: InputMaybe<Array<Webhook_Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webhook_Cache_Order_By>>;
  where?: InputMaybe<Webhook_Cache_Bool_Exp>;
};


export type Subscription_RootWebhook_Cache_By_PkArgs = {
  delivery_id: Scalars['uuid'];
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

/** columns and relationships of "topic_related_topics" */
export type Topic_Related_Topics = {
  __typename?: 'topic_related_topics';
  created_at: Scalars['timestamptz'];
  from_topic_id: Scalars['uuid'];
  id: Scalars['uuid'];
  to_topic_unique_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** input type for inserting array relation for remote table "topic_related_topics" */
export type Topic_Related_Topics_Arr_Rel_Insert_Input = {
  data: Array<Topic_Related_Topics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Topic_Related_Topics_On_Conflict>;
};

/** Boolean expression to filter rows from the table "topic_related_topics". All fields are combined with a logical 'AND'. */
export type Topic_Related_Topics_Bool_Exp = {
  _and?: InputMaybe<Array<Topic_Related_Topics_Bool_Exp>>;
  _not?: InputMaybe<Topic_Related_Topics_Bool_Exp>;
  _or?: InputMaybe<Array<Topic_Related_Topics_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from_topic_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  to_topic_unique_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "topic_related_topics" */
export enum Topic_Related_Topics_Constraint {
  /** unique or primary key constraint */
  TopicRelatedTopicsPkey = 'topic_related_topics_pkey',
  /** unique or primary key constraint */
  TopicRelatedTopicsUnique = 'topic_related_topics_unique'
}

/** input type for inserting data into table "topic_related_topics" */
export type Topic_Related_Topics_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_topic_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  parent_topic?: InputMaybe<Topics_Obj_Rel_Insert_Input>;
  to_topic_unique_id?: InputMaybe<Scalars['String']>;
  topic?: InputMaybe<Topics_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "topic_related_topics" */
export type Topic_Related_Topics_Mutation_Response = {
  __typename?: 'topic_related_topics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Topic_Related_Topics>;
};

/** on_conflict condition type for table "topic_related_topics" */
export type Topic_Related_Topics_On_Conflict = {
  constraint: Topic_Related_Topics_Constraint;
  update_columns?: Array<Topic_Related_Topics_Update_Column>;
  where?: InputMaybe<Topic_Related_Topics_Bool_Exp>;
};

/** Ordering options when selecting data from "topic_related_topics". */
export type Topic_Related_Topics_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_topic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to_topic_unique_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: topic_related_topics */
export type Topic_Related_Topics_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "topic_related_topics" */
export enum Topic_Related_Topics_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromTopicId = 'from_topic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ToTopicUniqueId = 'to_topic_unique_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "topic_related_topics" */
export type Topic_Related_Topics_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_topic_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  to_topic_unique_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "topic_related_topics" */
export enum Topic_Related_Topics_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromTopicId = 'from_topic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ToTopicUniqueId = 'to_topic_unique_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "topic_vulnerabilities" */
export type Topic_Vulnerabilities = {
  __typename?: 'topic_vulnerabilities';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  topic_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
  vulnerability_id: Scalars['uuid'];
};

/** order by aggregate values of table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Topic_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Topic_Vulnerabilities_Min_Order_By>;
};

/** input type for inserting array relation for remote table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Arr_Rel_Insert_Input = {
  data: Array<Topic_Vulnerabilities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Topic_Vulnerabilities_On_Conflict>;
};

/** Boolean expression to filter rows from the table "topic_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Topic_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Topic_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Topic_Vulnerabilities_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  topic_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "topic_vulnerabilities" */
export enum Topic_Vulnerabilities_Constraint {
  /** unique or primary key constraint */
  TopicVulnerabilitiesPkey = 'topic_vulnerabilities_pkey',
  /** unique or primary key constraint */
  TopicVulnerabilitiesUnique = 'topic_vulnerabilities_unique'
}

/** input type for inserting data into table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  topic?: InputMaybe<Topics_Obj_Rel_Insert_Input>;
  topic_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Mutation_Response = {
  __typename?: 'topic_vulnerabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Topic_Vulnerabilities>;
};

/** on_conflict condition type for table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_On_Conflict = {
  constraint: Topic_Vulnerabilities_Constraint;
  update_columns?: Array<Topic_Vulnerabilities_Update_Column>;
  where?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
};

/** Ordering options when selecting data from "topic_vulnerabilities". */
export type Topic_Vulnerabilities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: topic_vulnerabilities */
export type Topic_Vulnerabilities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "topic_vulnerabilities" */
export enum Topic_Vulnerabilities_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "topic_vulnerabilities" */
export type Topic_Vulnerabilities_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  topic_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "topic_vulnerabilities" */
export enum Topic_Vulnerabilities_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  TopicId = 'topic_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Topics_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "topics". All fields are combined with a logical 'AND'. */
export type Topics_Bool_Exp = {
  _and?: InputMaybe<Array<Topics_Bool_Exp>>;
  _not?: InputMaybe<Topics_Bool_Exp>;
  _or?: InputMaybe<Array<Topics_Bool_Exp>>;
};

/** unique or primary key constraints on table "topics" */
export enum Topics_Constraint {
  /** unique or primary key constraint */
  TopicsDataSourceLinkKey = 'topics_data_source_link_key',
  /** unique or primary key constraint */
  TopicsPkey = 'topics_pkey',
  /** unique or primary key constraint */
  TopicsTopicUniqueIdKey = 'topics_topic_unique_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Topics_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Topics_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Topics_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "topics" */
export type Topics_Inc_Input = {
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "topics" */
export type Topics_Insert_Input = {
  body?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data_source_link?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
  related_topics?: InputMaybe<Topic_Related_Topics_Arr_Rel_Insert_Input>;
  summary?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['_text']>;
  title?: InputMaybe<Scalars['String']>;
  topic_unique_id?: InputMaybe<Scalars['String']>;
  topic_vulnerabilities?: InputMaybe<Topic_Vulnerabilities_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "topics" */
export type Topics_Mutation_Response = {
  __typename?: 'topics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** input type for inserting object relation for remote table "topics" */
export type Topics_Obj_Rel_Insert_Input = {
  data: Topics_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Topics_On_Conflict>;
};

/** on_conflict condition type for table "topics" */
export type Topics_On_Conflict = {
  constraint: Topics_Constraint;
  update_columns?: Array<Topics_Update_Column>;
  where?: InputMaybe<Topics_Bool_Exp>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Topics_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for updating data in table "topics" */
export type Topics_Set_Input = {
  body?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data_source_link?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['_text']>;
  title?: InputMaybe<Scalars['String']>;
  topic_unique_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "topics" */
export enum Topics_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DataSourceLink = 'data_source_link',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataSchemaVersion = 'metadata_schema_version',
  /** column name */
  Summary = 'summary',
  /** column name */
  Tags = 'tags',
  /** column name */
  Title = 'title',
  /** column name */
  TopicUniqueId = 'topic_unique_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "user_role". All fields are combined with logical 'AND'. */
export type User_Role_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['user_role']>;
  _gt?: InputMaybe<Scalars['user_role']>;
  _gte?: InputMaybe<Scalars['user_role']>;
  _in?: InputMaybe<Array<Scalars['user_role']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['user_role']>;
  _lte?: InputMaybe<Scalars['user_role']>;
  _neq?: InputMaybe<Scalars['user_role']>;
  _nin?: InputMaybe<Array<Scalars['user_role']>>;
};

/**
 * LunaTrace users, identified by their various auth identifiers (ex. github, kratos, etc.)
 *
 *
 * columns and relationships of "users"
 *
 */
export type Users = {
  __typename?: 'users';
  github_id?: Maybe<Scalars['String']>;
  github_node_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  kratos_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  kratos_identity?: Maybe<Identities>;
  role: Scalars['user_role'];
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  github_id?: InputMaybe<String_Comparison_Exp>;
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kratos_id?: InputMaybe<Uuid_Comparison_Exp>;
  kratos_identity?: InputMaybe<Identities_Bool_Exp>;
  role?: InputMaybe<User_Role_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersGithubIdKey = 'users_github_id_key',
  /** unique or primary key constraint */
  UsersGithubNodeIdKey = 'users_github_node_id_key',
  /** unique or primary key constraint */
  UsersKratosIdUnique = 'users_kratos_id_unique',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  github_id?: InputMaybe<Scalars['String']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  kratos_id?: InputMaybe<Scalars['uuid']>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kratos_id?: InputMaybe<Order_By>;
  kratos_identity?: InputMaybe<Identities_Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  Id = 'id',
  /** column name */
  KratosId = 'kratos_id',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  github_id?: InputMaybe<Scalars['String']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  kratos_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  Id = 'id',
  /** column name */
  KratosId = 'kratos_id'
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
  id: Scalars['uuid'];
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  name: Scalars['String'];
  namespace: Scalars['String'];
  record_source?: Maybe<Scalars['String']>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An array relationship */
  reverse_related_vulnerabilities: Array<Related_Vulnerabilities>;
  severity: Scalars['severity_enum'];
  slug: Scalars['String'];
  topic_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  topic_vulnerabilities: Array<Topic_Vulnerabilities>;
  urls?: Maybe<Scalars['_text']>;
  /** An array relationship */
  vulnerability_packages: Array<Vulnerability_Packages>;
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
export type VulnerabilitiesIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
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
export type VulnerabilitiesReverse_Related_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Related_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Related_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesTopic_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Topic_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Topic_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesVulnerability_PackagesArgs = {
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
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  namespace?: InputMaybe<String_Comparison_Exp>;
  record_source?: InputMaybe<String_Comparison_Exp>;
  related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  reverse_related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  severity?: InputMaybe<Severity_Enum_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  topic_id?: InputMaybe<Uuid_Comparison_Exp>;
  topic_vulnerabilities?: InputMaybe<Topic_Vulnerabilities_Bool_Exp>;
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

/** input type for inserting data into table "vulnerabilities" */
export type Vulnerabilities_Insert_Input = {
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
  topic_vulnerabilities?: InputMaybe<Topic_Vulnerabilities_Arr_Rel_Insert_Input>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerabilities_On_Conflict>;
};

/** on_conflict condition type for table "vulnerabilities" */
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
  ignored_vulnerabilities_aggregate?: InputMaybe<Ignored_Vulnerabilities_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  namespace?: InputMaybe<Order_By>;
  record_source?: InputMaybe<Order_By>;
  related_vulnerabilities_aggregate?: InputMaybe<Related_Vulnerabilities_Aggregate_Order_By>;
  reverse_related_vulnerabilities_aggregate?: InputMaybe<Related_Vulnerabilities_Aggregate_Order_By>;
  severity?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  topic_id?: InputMaybe<Order_By>;
  topic_vulnerabilities_aggregate?: InputMaybe<Topic_Vulnerabilities_Aggregate_Order_By>;
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
  slug?: InputMaybe<Scalars['String']>;
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
  Slug = 'slug'
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
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  package_versions: Array<Package_Versions>;
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
export type Vulnerability_PackagesPackage_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Package_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Versions_Order_By>>;
  where?: InputMaybe<Package_Versions_Bool_Exp>;
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
  /** upsert condition */
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
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  package_versions?: InputMaybe<Package_Versions_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
};

/** order by max() on columns of table "vulnerability_packages" */
export type Vulnerability_Packages_Max_Order_By = {
  advisories?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  vuln_slug?: InputMaybe<Order_By>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Packages_On_Conflict>;
};

/** on_conflict condition type for table "vulnerability_packages" */
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
  slug?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability_packages" */
export enum Vulnerability_Packages_Update_Column {
  /** column name */
  Slug = 'slug'
}

/** columns and relationships of "webhook_cache" */
export type Webhook_Cache = {
  __typename?: 'webhook_cache';
  created_at: Scalars['timestamp'];
  data: Scalars['jsonb'];
  delivery_id: Scalars['uuid'];
  event_type: Scalars['github_webhook_event'];
  installation_id?: Maybe<Scalars['Int']>;
  signature_256: Scalars['String'];
  sqs_message_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "webhook_cache" */
export type Webhook_CacheDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "webhook_cache". All fields are combined with a logical 'AND'. */
export type Webhook_Cache_Bool_Exp = {
  _and?: InputMaybe<Array<Webhook_Cache_Bool_Exp>>;
  _not?: InputMaybe<Webhook_Cache_Bool_Exp>;
  _or?: InputMaybe<Array<Webhook_Cache_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  delivery_id?: InputMaybe<Uuid_Comparison_Exp>;
  event_type?: InputMaybe<Github_Webhook_Event_Comparison_Exp>;
  installation_id?: InputMaybe<Int_Comparison_Exp>;
  signature_256?: InputMaybe<String_Comparison_Exp>;
  sqs_message_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "webhook_cache" */
export enum Webhook_Cache_Constraint {
  /** unique or primary key constraint */
  WebhookCachePkey = 'webhook_cache_pkey'
}

/** input type for inserting data into table "webhook_cache" */
export type Webhook_Cache_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  data?: InputMaybe<Scalars['jsonb']>;
  delivery_id?: InputMaybe<Scalars['uuid']>;
  event_type?: InputMaybe<Scalars['github_webhook_event']>;
  installation_id?: InputMaybe<Scalars['Int']>;
  signature_256?: InputMaybe<Scalars['String']>;
  sqs_message_id?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "webhook_cache" */
export type Webhook_Cache_Mutation_Response = {
  __typename?: 'webhook_cache_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Webhook_Cache>;
};

/** on_conflict condition type for table "webhook_cache" */
export type Webhook_Cache_On_Conflict = {
  constraint: Webhook_Cache_Constraint;
  update_columns?: Array<Webhook_Cache_Update_Column>;
  where?: InputMaybe<Webhook_Cache_Bool_Exp>;
};

/** Ordering options when selecting data from "webhook_cache". */
export type Webhook_Cache_Order_By = {
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  delivery_id?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  installation_id?: InputMaybe<Order_By>;
  signature_256?: InputMaybe<Order_By>;
  sqs_message_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: webhook_cache */
export type Webhook_Cache_Pk_Columns_Input = {
  delivery_id: Scalars['uuid'];
};

/** select columns of table "webhook_cache" */
export enum Webhook_Cache_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  DeliveryId = 'delivery_id',
  /** column name */
  EventType = 'event_type',
  /** column name */
  InstallationId = 'installation_id',
  /** column name */
  Signature_256 = 'signature_256',
  /** column name */
  SqsMessageId = 'sqs_message_id'
}

/** input type for updating data in table "webhook_cache" */
export type Webhook_Cache_Set_Input = {
  sqs_message_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "webhook_cache" */
export enum Webhook_Cache_Update_Column {
  /** column name */
  SqsMessageId = 'sqs_message_id'
}

export type GetAuthDataFromProjectTokenQueryVariables = Exact<{
  access_token: Scalars['uuid'];
}>;


export type GetAuthDataFromProjectTokenQuery = { __typename?: 'query_root', project_access_tokens: Array<{ __typename?: 'project_access_tokens', project: { __typename?: 'projects', id: any, builds: Array<{ __typename?: 'builds', id: any }> } }> };

export type GetAuthorizedUserOrganizationsQueryVariables = Exact<{
  github_org_ids?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetAuthorizedUserOrganizationsQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any, github_node_id?: string | null }> };

export type GetBuildQueryVariables = Exact<{
  build_id: Scalars['uuid'];
}>;


export type GetBuildQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', pull_request_id?: string | null, existing_github_review_id?: string | null, project?: { __typename?: 'projects', id: any, organization?: { __typename?: 'organizations', installation_id?: number | null } | null } | null } | null };

export type GetCloneRepoInfoFromRepoIdQueryVariables = Exact<{
  repo_github_id: Scalars['Int'];
}>;


export type GetCloneRepoInfoFromRepoIdQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', git_url: string, project: { __typename?: 'projects', id: any, organization?: { __typename?: 'organizations', installation_id?: number | null } | null } }> };

export type GetCountOfPersonalOrgQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetCountOfPersonalOrgQuery = { __typename?: 'query_root', organizations_aggregate: { __typename?: 'organizations_aggregate', aggregate?: { __typename?: 'organizations_aggregate_fields', count: number } | null } };

export type GetOrganizationFromInstallationIdQueryVariables = Exact<{
  installation_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetOrganizationFromInstallationIdQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any }> };

export type GetPackageAndVulnFromSlugsQueryVariables = Exact<{
  vuln_slug?: InputMaybe<Scalars['String']>;
  pkg_slug?: InputMaybe<Scalars['String']>;
  version_slug?: InputMaybe<Scalars['String']>;
}>;


export type GetPackageAndVulnFromSlugsQuery = { __typename?: 'query_root', vulnerabilities: Array<{ __typename?: 'vulnerabilities', id: any }>, vulnerability_packages: Array<{ __typename?: 'vulnerability_packages', id: any }>, package_versions: Array<{ __typename?: 'package_versions', id: any }> };

export type GetPreviousBuildForPrQueryVariables = Exact<{
  pull_request_id: Scalars['String'];
}>;


export type GetPreviousBuildForPrQuery = { __typename?: 'query_root', builds: Array<{ __typename?: 'builds', existing_github_review_id?: string | null }> };

export type GetUserRoleQueryVariables = Exact<{
  kratos_id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetUserRoleQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', role: any, id: any }> };

export type GetUsersProjectsQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetUsersProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', id: any }> };

export type GetVulnerabilitiesByCveQueryVariables = Exact<{
  cves?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetVulnerabilitiesByCveQuery = { __typename?: 'query_root', vulnerabilities: Array<{ __typename?: 'vulnerabilities', id: any }> };

export type GetWebhookCacheByDeliveryIdQueryVariables = Exact<{
  delivery_id: Scalars['uuid'];
}>;


export type GetWebhookCacheByDeliveryIdQuery = { __typename?: 'query_root', webhook_cache: Array<{ __typename?: 'webhook_cache', data: any, delivery_id: any, signature_256: string, event_type: any, installation_id?: number | null, created_at: any }> };

export type GetWebhookCacheJobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetWebhookCacheJobsQuery = { __typename?: 'query_root', webhook_cache: Array<{ __typename?: 'webhook_cache', data: any, delivery_id: any, signature_256: string, event_type: any, created_at: any }> };

export type GetUserFromIdentityQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserFromIdentityQuery = { __typename?: 'query_root', identities_by_pk?: { __typename?: 'identities', user?: { __typename?: 'users', id: any } | null } | null };

export type InsertBuildMutationVariables = Exact<{
  project_id: Scalars['uuid'];
  s3_url?: InputMaybe<Scalars['String']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  source_type: Scalars['builds_source_type'];
}>;


export type InsertBuildMutation = { __typename?: 'mutation_root', insert_builds_one?: { __typename?: 'builds', id: any } | null };

export type InsertPersonalProjectAndOrgMutationVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type InsertPersonalProjectAndOrgMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any } | null };

export type InsertScanMutationVariables = Exact<{
  scan: Scans_Insert_Input;
  build_id: Scalars['uuid'];
}>;


export type InsertScanMutation = { __typename?: 'mutation_root', insert_scans_one?: { __typename?: 'scans', id: any, build_id: any, findings: Array<{ __typename?: 'findings', fix_state: any, fix_versions?: any | null, package_name: string, created_at: any, id: any, language: string, locations: any, matcher: string, package_version_id?: any | null, purl: string, severity: any, type: string, version: string, updated_at: any, version_matcher: string, virtual_path?: string | null, vulnerability_id: any, vulnerability_package_id?: any | null, vulnerability: { __typename?: 'vulnerabilities', id: any, slug: string, description?: string | null, cvss_score?: any | null, cvss_inferred?: boolean | null, name: string, namespace: string, data_source: string, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', creator_id?: any | null, id: any, locations: any, note: string, project_id: any, vulnerability_id: any }> } }> } | null };

export type InsertWebhookToCacheMutationVariables = Exact<{
  delivery_id: Scalars['uuid'];
  event_type: Scalars['github_webhook_event'];
  signature_256: Scalars['String'];
  installation_id?: InputMaybe<Scalars['Int']>;
  data: Scalars['jsonb'];
}>;


export type InsertWebhookToCacheMutation = { __typename?: 'mutation_root', insert_webhook_cache_one?: { __typename?: 'webhook_cache', delivery_id: any } | null };

export type SetBuildS3UrlMutationVariables = Exact<{
  id: Scalars['uuid'];
  s3_url: Scalars['String'];
}>;


export type SetBuildS3UrlMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

export type UpdateBuildExistingReviewIdMutationVariables = Exact<{
  id: Scalars['uuid'];
  existing_github_review_id: Scalars['String'];
}>;


export type UpdateBuildExistingReviewIdMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

export type UpdateManifestStatusIfExistsMutationVariables = Exact<{
  buildId: Scalars['uuid'];
  message?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
}>;


export type UpdateManifestStatusIfExistsMutation = { __typename?: 'mutation_root', update_manifests?: { __typename?: 'manifests_mutation_response', affected_rows: number } | null };

export type UpdateManifestMutationVariables = Exact<{
  key_eq: Scalars['String'];
  set_status: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  build_id?: InputMaybe<Scalars['uuid']>;
}>;


export type UpdateManifestMutation = { __typename?: 'mutation_root', update_manifests?: { __typename?: 'manifests_mutation_response', returning: Array<{ __typename?: 'manifests', filename: string, project_id: any, project: { __typename?: 'projects', organization_id?: any | null } }> } | null };

export type UpdateOrganizationsForUserMutationVariables = Exact<{
  organizations_for_user: Array<Organization_User_Insert_Input> | Organization_User_Insert_Input;
  on_conflict?: InputMaybe<Organization_User_On_Conflict>;
}>;


export type UpdateOrganizationsForUserMutation = { __typename?: 'mutation_root', insert_organization_user?: { __typename?: 'organization_user_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'organization_user', id: any }> } | null };

export type UpsertOrganizationUsersMutationVariables = Exact<{
  organizationUsers: Array<Organization_User_Insert_Input> | Organization_User_Insert_Input;
}>;


export type UpsertOrganizationUsersMutation = { __typename?: 'mutation_root', insert_organization_user?: { __typename?: 'organization_user_mutation_response', affected_rows: number } | null };

export type UpsertOrganizationsMutationVariables = Exact<{
  objects?: InputMaybe<Array<Organizations_Insert_Input> | Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
}>;


export type UpsertOrganizationsMutation = { __typename?: 'mutation_root', insert_organizations?: { __typename?: 'organizations_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'organizations', id: any, github_node_id?: string | null, name: string }> } | null };

export type UpsertTopicsMutationVariables = Exact<{
  objects: Array<Topics_Insert_Input> | Topics_Insert_Input;
}>;


export type UpsertTopicsMutation = { __typename?: 'mutation_root', insert_topics?: { __typename?: 'topics_mutation_response', affected_rows: number } | null };

export type UpsertUserFromIdMutationVariables = Exact<{
  user: Users_Insert_Input;
}>;


export type UpsertUserFromIdMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', id: any } | null };


export const GetAuthDataFromProjectTokenDocument = gql`
    query GetAuthDataFromProjectToken($access_token: uuid!) {
  project_access_tokens(where: {access_token: {_eq: $access_token}}) {
    project {
      id
      builds {
        id
      }
    }
  }
}
    `;
export const GetAuthorizedUserOrganizationsDocument = gql`
    query GetAuthorizedUserOrganizations($github_org_ids: [String!]) {
  organizations(where: {github_node_id: {_in: $github_org_ids}}) {
    id
    github_node_id
  }
}
    `;
export const GetBuildDocument = gql`
    query GetBuild($build_id: uuid!) {
  builds_by_pk(id: $build_id) {
    project {
      id
      organization {
        installation_id
      }
    }
    pull_request_id
    existing_github_review_id
  }
}
    `;
export const GetCloneRepoInfoFromRepoIdDocument = gql`
    query GetCloneRepoInfoFromRepoId($repo_github_id: Int!) {
  github_repositories(where: {github_id: {_eq: $repo_github_id}}) {
    git_url
    project {
      id
      organization {
        installation_id
      }
    }
  }
}
    `;
export const GetCountOfPersonalOrgDocument = gql`
    query GetCountOfPersonalOrg($user_id: uuid!) {
  organizations_aggregate(
    where: {_and: {organization_users: {user_id: {_eq: $user_id}}, name: {_eq: "Personal"}}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const GetOrganizationFromInstallationIdDocument = gql`
    query GetOrganizationFromInstallationId($installation_id: Int) {
  organizations(where: {installation_id: {_eq: $installation_id}}) {
    id
  }
}
    `;
export const GetPackageAndVulnFromSlugsDocument = gql`
    query GetPackageAndVulnFromSlugs($vuln_slug: String, $pkg_slug: String, $version_slug: String) {
  vulnerabilities(where: {slug: {_eq: $vuln_slug}}) {
    id
  }
  vulnerability_packages(where: {slug: {_eq: $pkg_slug}}) {
    id
  }
  package_versions(where: {slug: {_eq: $version_slug}}) {
    id
  }
}
    `;
export const GetPreviousBuildForPrDocument = gql`
    query GetPreviousBuildForPr($pull_request_id: String!) {
  builds(
    where: {_and: {existing_github_review_id: {_is_null: false}, pull_request_id: {_eq: $pull_request_id}}}
    order_by: {created_at: desc}
  ) {
    existing_github_review_id
  }
}
    `;
export const GetUserRoleDocument = gql`
    query GetUserRole($kratos_id: uuid) {
  users(where: {kratos_id: {_eq: $kratos_id}}) {
    role
    id
  }
}
    `;
export const GetUsersProjectsDocument = gql`
    query GetUsersProjects($user_id: uuid!) {
  projects(
    where: {organization: {organization_users: {user: {kratos_id: {_eq: $user_id}}}}}
  ) {
    id
  }
}
    `;
export const GetVulnerabilitiesByCveDocument = gql`
    query GetVulnerabilitiesByCve($cves: [String!]) {
  vulnerabilities(where: {name: {_in: $cves}}) {
    id
  }
}
    `;
export const GetWebhookCacheByDeliveryIdDocument = gql`
    query GetWebhookCacheByDeliveryId($delivery_id: uuid!) {
  webhook_cache(where: {delivery_id: {_eq: $delivery_id}}) {
    data
    delivery_id
    signature_256
    event_type
    installation_id
    created_at
  }
}
    `;
export const GetWebhookCacheJobsDocument = gql`
    query GetWebhookCacheJobs($limit: Int = 10, $offset: Int = 0) {
  webhook_cache(
    where: {sqs_message_id: {_is_null: false}}
    limit: $limit
    offset: $offset
  ) {
    data
    delivery_id
    signature_256
    event_type
    created_at
  }
}
    `;
export const GetUserFromIdentityDocument = gql`
    query GetUserFromIdentity($id: uuid!) {
  identities_by_pk(id: $id) {
    user {
      id
    }
  }
}
    `;
export const InsertBuildDocument = gql`
    mutation InsertBuild($project_id: uuid!, $s3_url: String, $pull_request_id: String, $source_type: builds_source_type!) {
  insert_builds_one(
    object: {project_id: $project_id, s3_url: $s3_url, pull_request_id: $pull_request_id, source_type: $source_type}
  ) {
    id
  }
}
    `;
export const InsertPersonalProjectAndOrgDocument = gql`
    mutation InsertPersonalProjectAndOrg($user_id: uuid!) {
  insert_organizations_one(
    object: {name: "Personal", projects: {data: {name: "Personal Project"}}, organization_users: {data: {user_id: $user_id}}}
  ) {
    id
  }
}
    `;
export const InsertScanDocument = gql`
    mutation InsertScan($scan: scans_insert_input!, $build_id: uuid!) {
  insert_scans_one(object: $scan) {
    id
    build_id
    findings {
      fix_state
      fix_versions
      package_name
      created_at
      id
      language
      locations
      matcher
      package_version_id
      purl
      severity
      type
      version
      updated_at
      version_matcher
      virtual_path
      vulnerability_id
      vulnerability_package_id
      vulnerability {
        id
        slug
        description
        cvss_score
        cvss_inferred
        name
        namespace
        data_source
        ignored_vulnerabilities(where: {project: {builds: {id: {_eq: $build_id}}}}) {
          creator_id
          id
          locations
          note
          project_id
          vulnerability_id
        }
      }
    }
  }
}
    `;
export const InsertWebhookToCacheDocument = gql`
    mutation InsertWebhookToCache($delivery_id: uuid!, $event_type: github_webhook_event!, $signature_256: String!, $installation_id: Int, $data: jsonb!) {
  insert_webhook_cache_one(
    object: {delivery_id: $delivery_id, event_type: $event_type, signature_256: $signature_256, installation_id: $installation_id, data: $data}
  ) {
    delivery_id
  }
}
    `;
export const SetBuildS3UrlDocument = gql`
    mutation SetBuildS3Url($id: uuid!, $s3_url: String!) {
  update_builds_by_pk(pk_columns: {id: $id}, _set: {s3_url: $s3_url}) {
    id
  }
}
    `;
export const UpdateBuildExistingReviewIdDocument = gql`
    mutation UpdateBuildExistingReviewId($id: uuid!, $existing_github_review_id: String!) {
  update_builds_by_pk(
    pk_columns: {id: $id}
    _set: {existing_github_review_id: $existing_github_review_id}
  ) {
    id
  }
}
    `;
export const UpdateManifestStatusIfExistsDocument = gql`
    mutation UpdateManifestStatusIfExists($buildId: uuid!, $message: String, $status: String!) {
  update_manifests(
    where: {build_id: {_eq: $buildId}}
    _set: {status: $status, message: $message}
  ) {
    affected_rows
  }
}
    `;
export const UpdateManifestDocument = gql`
    mutation UpdateManifest($key_eq: String!, $set_status: String!, $message: String, $build_id: uuid) {
  update_manifests(
    where: {s3_key: {_eq: $key_eq}}
    _set: {status: $set_status, message: $message, build_id: $build_id}
  ) {
    returning {
      filename
      project_id
      project {
        organization_id
      }
    }
  }
}
    `;
export const UpdateOrganizationsForUserDocument = gql`
    mutation UpdateOrganizationsForUser($organizations_for_user: [organization_user_insert_input!]!, $on_conflict: organization_user_on_conflict) {
  insert_organization_user(
    objects: $organizations_for_user
    on_conflict: $on_conflict
  ) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export const UpsertOrganizationUsersDocument = gql`
    mutation UpsertOrganizationUsers($organizationUsers: [organization_user_insert_input!]!) {
  insert_organization_user(
    objects: $organizationUsers
    on_conflict: {constraint: organization_user_user_id_organization_id_key}
  ) {
    affected_rows
  }
}
    `;
export const UpsertOrganizationsDocument = gql`
    mutation UpsertOrganizations($objects: [organizations_insert_input!] = {}, $on_conflict: organizations_on_conflict) {
  insert_organizations(objects: $objects, on_conflict: $on_conflict) {
    affected_rows
    returning {
      id
      github_node_id
      name
    }
  }
}
    `;
export const UpsertTopicsDocument = gql`
    mutation UpsertTopics($objects: [topics_insert_input!]!) {
  insert_topics(
    on_conflict: {constraint: topics_topic_unique_id_key, update_columns: [tags, body, data_source_link, metadata, metadata_schema_version, title, updated_at, summary]}
    objects: $objects
  ) {
    affected_rows
  }
}
    `;
export const UpsertUserFromIdDocument = gql`
    mutation UpsertUserFromId($user: users_insert_input!) {
  insert_users_one(
    object: $user
    on_conflict: {constraint: users_github_id_key, update_columns: github_node_id}
  ) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetAuthDataFromProjectToken(variables: GetAuthDataFromProjectTokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthDataFromProjectTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthDataFromProjectTokenQuery>(GetAuthDataFromProjectTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAuthDataFromProjectToken', 'query');
    },
    GetAuthorizedUserOrganizations(variables?: GetAuthorizedUserOrganizationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthorizedUserOrganizationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthorizedUserOrganizationsQuery>(GetAuthorizedUserOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAuthorizedUserOrganizations', 'query');
    },
    GetBuild(variables: GetBuildQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBuildQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBuildQuery>(GetBuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetBuild', 'query');
    },
    GetCloneRepoInfoFromRepoId(variables: GetCloneRepoInfoFromRepoIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCloneRepoInfoFromRepoIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCloneRepoInfoFromRepoIdQuery>(GetCloneRepoInfoFromRepoIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCloneRepoInfoFromRepoId', 'query');
    },
    GetCountOfPersonalOrg(variables: GetCountOfPersonalOrgQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCountOfPersonalOrgQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCountOfPersonalOrgQuery>(GetCountOfPersonalOrgDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCountOfPersonalOrg', 'query');
    },
    GetOrganizationFromInstallationId(variables?: GetOrganizationFromInstallationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationFromInstallationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationFromInstallationIdQuery>(GetOrganizationFromInstallationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationFromInstallationId', 'query');
    },
    GetPackageAndVulnFromSlugs(variables?: GetPackageAndVulnFromSlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPackageAndVulnFromSlugsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPackageAndVulnFromSlugsQuery>(GetPackageAndVulnFromSlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPackageAndVulnFromSlugs', 'query');
    },
    GetPreviousBuildForPr(variables: GetPreviousBuildForPrQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPreviousBuildForPrQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPreviousBuildForPrQuery>(GetPreviousBuildForPrDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPreviousBuildForPr', 'query');
    },
    GetUserRole(variables?: GetUserRoleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserRoleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserRoleQuery>(GetUserRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserRole', 'query');
    },
    GetUsersProjects(variables: GetUsersProjectsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersProjectsQuery>(GetUsersProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsersProjects', 'query');
    },
    GetVulnerabilitiesByCve(variables?: GetVulnerabilitiesByCveQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVulnerabilitiesByCveQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVulnerabilitiesByCveQuery>(GetVulnerabilitiesByCveDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetVulnerabilitiesByCve', 'query');
    },
    GetWebhookCacheByDeliveryId(variables: GetWebhookCacheByDeliveryIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWebhookCacheByDeliveryIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWebhookCacheByDeliveryIdQuery>(GetWebhookCacheByDeliveryIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWebhookCacheByDeliveryId', 'query');
    },
    GetWebhookCacheJobs(variables?: GetWebhookCacheJobsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWebhookCacheJobsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWebhookCacheJobsQuery>(GetWebhookCacheJobsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWebhookCacheJobs', 'query');
    },
    GetUserFromIdentity(variables: GetUserFromIdentityQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserFromIdentityQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserFromIdentityQuery>(GetUserFromIdentityDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserFromIdentity', 'query');
    },
    InsertBuild(variables: InsertBuildMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertBuildMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertBuildMutation>(InsertBuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertBuild', 'mutation');
    },
    InsertPersonalProjectAndOrg(variables: InsertPersonalProjectAndOrgMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertPersonalProjectAndOrgMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertPersonalProjectAndOrgMutation>(InsertPersonalProjectAndOrgDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertPersonalProjectAndOrg', 'mutation');
    },
    InsertScan(variables: InsertScanMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertScanMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertScanMutation>(InsertScanDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertScan', 'mutation');
    },
    InsertWebhookToCache(variables: InsertWebhookToCacheMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertWebhookToCacheMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertWebhookToCacheMutation>(InsertWebhookToCacheDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertWebhookToCache', 'mutation');
    },
    SetBuildS3Url(variables: SetBuildS3UrlMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetBuildS3UrlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetBuildS3UrlMutation>(SetBuildS3UrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetBuildS3Url', 'mutation');
    },
    UpdateBuildExistingReviewId(variables: UpdateBuildExistingReviewIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateBuildExistingReviewIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBuildExistingReviewIdMutation>(UpdateBuildExistingReviewIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateBuildExistingReviewId', 'mutation');
    },
    UpdateManifestStatusIfExists(variables: UpdateManifestStatusIfExistsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestStatusIfExistsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestStatusIfExistsMutation>(UpdateManifestStatusIfExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifestStatusIfExists', 'mutation');
    },
    UpdateManifest(variables: UpdateManifestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestMutation>(UpdateManifestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifest', 'mutation');
    },
    UpdateOrganizationsForUser(variables: UpdateOrganizationsForUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrganizationsForUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrganizationsForUserMutation>(UpdateOrganizationsForUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateOrganizationsForUser', 'mutation');
    },
    UpsertOrganizationUsers(variables: UpsertOrganizationUsersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationUsersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationUsersMutation>(UpsertOrganizationUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganizationUsers', 'mutation');
    },
    UpsertOrganizations(variables?: UpsertOrganizationsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationsMutation>(UpsertOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganizations', 'mutation');
    },
    UpsertTopics(variables: UpsertTopicsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertTopicsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertTopicsMutation>(UpsertTopicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertTopics', 'mutation');
    },
    UpsertUserFromId(variables: UpsertUserFromIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertUserFromIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUserFromIdMutation>(UpsertUserFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertUserFromId', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;