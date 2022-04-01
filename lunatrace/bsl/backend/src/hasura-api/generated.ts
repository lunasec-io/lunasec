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
  date: any;
  fix_state_enum: any;
  jsonb: any;
  numeric: any;
  organization_user_role: any;
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

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse';
  bucket: Scalars['String'];
  error: Scalars['Boolean'];
  error_message?: Maybe<Scalars['String']>;
  headers: Scalars['String'];
  key: Scalars['String'];
  url: Scalars['String'];
};

export type SbomUploadUrlOutput = {
  __typename?: 'SbomUploadUrlOutput';
  error: Scalars['Boolean'];
  uploadUrl?: Maybe<UploadUrl>;
};

export type ScanManifestOutput = {
  __typename?: 'ScanManifestOutput';
  build_id: Scalars['String'];
  error: Scalars['Boolean'];
  error_message?: Maybe<Scalars['String']>;
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

export type UploadUrl = {
  __typename?: 'UploadUrl';
  headers: Scalars['String'];
  url: Scalars['String'];
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
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
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
  avg?: Maybe<Builds_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Builds_Max_Fields>;
  min?: Maybe<Builds_Min_Fields>;
  stddev?: Maybe<Builds_Stddev_Fields>;
  stddev_pop?: Maybe<Builds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Builds_Stddev_Samp_Fields>;
  sum?: Maybe<Builds_Sum_Fields>;
  var_pop?: Maybe<Builds_Var_Pop_Fields>;
  var_samp?: Maybe<Builds_Var_Samp_Fields>;
  variance?: Maybe<Builds_Variance_Fields>;
};


/** aggregate fields of "builds" */
export type Builds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Builds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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

/** aggregate avg on columns */
export type Builds_Avg_Fields = {
  __typename?: 'builds_avg_fields';
  build_number?: Maybe<Scalars['Float']>;
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
  findings?: InputMaybe<Findings_Bool_Exp>;
  git_branch?: InputMaybe<String_Comparison_Exp>;
  git_hash?: InputMaybe<String_Comparison_Exp>;
  git_remote?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  pull_request_id?: InputMaybe<String_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  scans?: InputMaybe<Scans_Bool_Exp>;
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
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  scans?: InputMaybe<Scans_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Builds_Max_Fields = {
  __typename?: 'builds_max_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "builds" */
export type Builds_Max_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Builds_Min_Fields = {
  __typename?: 'builds_min_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "builds" */
export type Builds_Min_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
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
  BuildNumber = 'build_number',
  /** column name */
  CreatedAt = 'created_at',
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
  S3Url = 's3_url'
}

/** input type for updating data in table "builds" */
export type Builds_Set_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Builds_Stddev_Fields = {
  __typename?: 'builds_stddev_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "builds" */
export type Builds_Stddev_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Builds_Stddev_Pop_Fields = {
  __typename?: 'builds_stddev_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "builds" */
export type Builds_Stddev_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Builds_Stddev_Samp_Fields = {
  __typename?: 'builds_stddev_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "builds" */
export type Builds_Stddev_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Builds_Sum_Fields = {
  __typename?: 'builds_sum_fields';
  build_number?: Maybe<Scalars['Int']>;
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
  S3Url = 's3_url'
}

/** aggregate var_pop on columns */
export type Builds_Var_Pop_Fields = {
  __typename?: 'builds_var_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "builds" */
export type Builds_Var_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Builds_Var_Samp_Fields = {
  __typename?: 'builds_var_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "builds" */
export type Builds_Var_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Builds_Variance_Fields = {
  __typename?: 'builds_variance_fields';
  build_number?: Maybe<Scalars['Float']>;
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
  api_response: Scalars['jsonb'];
  git_url: Scalars['String'];
  github_id: Scalars['Int'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
};


/**
 * Metadata about a github repository and where to find it.
 *
 *
 * columns and relationships of "github_repositories"
 *
 */
export type Github_RepositoriesApi_ResponseArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "github_repositories" */
export type Github_Repositories_Aggregate = {
  __typename?: 'github_repositories_aggregate';
  aggregate?: Maybe<Github_Repositories_Aggregate_Fields>;
  nodes: Array<Github_Repositories>;
};

/** aggregate fields of "github_repositories" */
export type Github_Repositories_Aggregate_Fields = {
  __typename?: 'github_repositories_aggregate_fields';
  avg?: Maybe<Github_Repositories_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Github_Repositories_Max_Fields>;
  min?: Maybe<Github_Repositories_Min_Fields>;
  stddev?: Maybe<Github_Repositories_Stddev_Fields>;
  stddev_pop?: Maybe<Github_Repositories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Github_Repositories_Stddev_Samp_Fields>;
  sum?: Maybe<Github_Repositories_Sum_Fields>;
  var_pop?: Maybe<Github_Repositories_Var_Pop_Fields>;
  var_samp?: Maybe<Github_Repositories_Var_Samp_Fields>;
  variance?: Maybe<Github_Repositories_Variance_Fields>;
};


/** aggregate fields of "github_repositories" */
export type Github_Repositories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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
  api_response?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "github_repositories" */
export type Github_Repositories_Arr_Rel_Insert_Input = {
  data: Array<Github_Repositories_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Github_Repositories_On_Conflict>;
};

/** aggregate avg on columns */
export type Github_Repositories_Avg_Fields = {
  __typename?: 'github_repositories_avg_fields';
  github_id?: Maybe<Scalars['Float']>;
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
  api_response?: InputMaybe<Jsonb_Comparison_Exp>;
  git_url?: InputMaybe<String_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "github_repositories" */
export enum Github_Repositories_Constraint {
  /** unique or primary key constraint */
  GithubRepositoriesGithubIdKey = 'github_repositories_github_id_key',
  /** unique or primary key constraint */
  GithubRepositoriesPkey = 'github_repositories_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Github_Repositories_Delete_At_Path_Input = {
  api_response?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Github_Repositories_Delete_Elem_Input = {
  api_response?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Github_Repositories_Delete_Key_Input = {
  api_response?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "github_repositories" */
export type Github_Repositories_Inc_Input = {
  github_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "github_repositories" */
export type Github_Repositories_Insert_Input = {
  api_response?: InputMaybe<Scalars['jsonb']>;
  git_url?: InputMaybe<Scalars['String']>;
  github_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Github_Repositories_Max_Fields = {
  __typename?: 'github_repositories_max_fields';
  git_url?: Maybe<Scalars['String']>;
  github_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "github_repositories" */
export type Github_Repositories_Max_Order_By = {
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Github_Repositories_Min_Fields = {
  __typename?: 'github_repositories_min_fields';
  git_url?: Maybe<Scalars['String']>;
  github_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "github_repositories" */
export type Github_Repositories_Min_Order_By = {
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
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

/** on_conflict condition type for table "github_repositories" */
export type Github_Repositories_On_Conflict = {
  constraint: Github_Repositories_Constraint;
  update_columns?: Array<Github_Repositories_Update_Column>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};

/** Ordering options when selecting data from "github_repositories". */
export type Github_Repositories_Order_By = {
  api_response?: InputMaybe<Order_By>;
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: github_repositories */
export type Github_Repositories_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Github_Repositories_Prepend_Input = {
  api_response?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_repositories" */
export enum Github_Repositories_Select_Column {
  /** column name */
  ApiResponse = 'api_response',
  /** column name */
  GitUrl = 'git_url',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id'
}

/** input type for updating data in table "github_repositories" */
export type Github_Repositories_Set_Input = {
  api_response?: InputMaybe<Scalars['jsonb']>;
  git_url?: InputMaybe<Scalars['String']>;
  github_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  project_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Github_Repositories_Stddev_Fields = {
  __typename?: 'github_repositories_stddev_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Github_Repositories_Stddev_Pop_Fields = {
  __typename?: 'github_repositories_stddev_pop_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Pop_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Github_Repositories_Stddev_Samp_Fields = {
  __typename?: 'github_repositories_stddev_samp_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "github_repositories" */
export type Github_Repositories_Stddev_Samp_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Github_Repositories_Sum_Fields = {
  __typename?: 'github_repositories_sum_fields';
  github_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "github_repositories" */
export type Github_Repositories_Sum_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** update columns of table "github_repositories" */
export enum Github_Repositories_Update_Column {
  /** column name */
  ApiResponse = 'api_response',
  /** column name */
  GitUrl = 'git_url',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id'
}

/** aggregate var_pop on columns */
export type Github_Repositories_Var_Pop_Fields = {
  __typename?: 'github_repositories_var_pop_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "github_repositories" */
export type Github_Repositories_Var_Pop_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Github_Repositories_Var_Samp_Fields = {
  __typename?: 'github_repositories_var_samp_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "github_repositories" */
export type Github_Repositories_Var_Samp_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Github_Repositories_Variance_Fields = {
  __typename?: 'github_repositories_variance_fields';
  github_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "github_repositories" */
export type Github_Repositories_Variance_Order_By = {
  github_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "identities" */
export type Identities = {
  __typename?: 'identities';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  /** An aggregate relationship */
  identity_verifiable_addresses_aggregate: Identity_Verifiable_Addresses_Aggregate;
  nid?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  organization_users: Array<Organization_User>;
  /** An aggregate relationship */
  organization_users_aggregate: Organization_User_Aggregate;
  schema_id: Scalars['String'];
  state: Scalars['String'];
  state_changed_at?: Maybe<Scalars['timestamp']>;
  traits: Scalars['jsonb'];
  updated_at: Scalars['timestamp'];
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
export type IdentitiesIdentity_Verifiable_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Identity_Verifiable_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identity_Verifiable_Addresses_Order_By>>;
  where?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
};


/** columns and relationships of "identities" */
export type IdentitiesOrganization_UsersArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


/** columns and relationships of "identities" */
export type IdentitiesOrganization_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organization_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organization_User_Order_By>>;
  where?: InputMaybe<Organization_User_Bool_Exp>;
};


/** columns and relationships of "identities" */
export type IdentitiesTraitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "identities" */
export type Identities_Aggregate = {
  __typename?: 'identities_aggregate';
  aggregate?: Maybe<Identities_Aggregate_Fields>;
  nodes: Array<Identities>;
};

/** aggregate fields of "identities" */
export type Identities_Aggregate_Fields = {
  __typename?: 'identities_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Identities_Max_Fields>;
  min?: Maybe<Identities_Min_Fields>;
};


/** aggregate fields of "identities" */
export type Identities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Identities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Identities_Append_Input = {
  traits?: InputMaybe<Scalars['jsonb']>;
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
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
  schema_id?: InputMaybe<String_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  state_changed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  traits?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "identities" */
export enum Identities_Constraint {
  /** unique or primary key constraint */
  IdentitiesPkey = 'identities_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Identities_Delete_At_Path_Input = {
  traits?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Identities_Delete_Elem_Input = {
  traits?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Identities_Delete_Key_Input = {
  traits?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "identities" */
export type Identities_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  identity_verifiable_addresses?: InputMaybe<Identity_Verifiable_Addresses_Arr_Rel_Insert_Input>;
  nid?: InputMaybe<Scalars['uuid']>;
  organization_users?: InputMaybe<Organization_User_Arr_Rel_Insert_Input>;
  schema_id?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  state_changed_at?: InputMaybe<Scalars['timestamp']>;
  traits?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Identities_Max_Fields = {
  __typename?: 'identities_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  nid?: Maybe<Scalars['uuid']>;
  schema_id?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  state_changed_at?: Maybe<Scalars['timestamp']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Identities_Min_Fields = {
  __typename?: 'identities_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  nid?: Maybe<Scalars['uuid']>;
  schema_id?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  state_changed_at?: Maybe<Scalars['timestamp']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "identities" */
export type Identities_Mutation_Response = {
  __typename?: 'identities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Identities>;
};

/** input type for inserting object relation for remote table "identities" */
export type Identities_Obj_Rel_Insert_Input = {
  data: Identities_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};

/** on_conflict condition type for table "identities" */
export type Identities_On_Conflict = {
  constraint: Identities_Constraint;
  update_columns?: Array<Identities_Update_Column>;
  where?: InputMaybe<Identities_Bool_Exp>;
};

/** Ordering options when selecting data from "identities". */
export type Identities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_verifiable_addresses_aggregate?: InputMaybe<Identity_Verifiable_Addresses_Aggregate_Order_By>;
  nid?: InputMaybe<Order_By>;
  organization_users_aggregate?: InputMaybe<Organization_User_Aggregate_Order_By>;
  schema_id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  state_changed_at?: InputMaybe<Order_By>;
  traits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: identities */
export type Identities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Identities_Prepend_Input = {
  traits?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "identities" */
export type Identities_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  nid?: InputMaybe<Scalars['uuid']>;
  schema_id?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  state_changed_at?: InputMaybe<Scalars['timestamp']>;
  traits?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "identities" */
export enum Identities_Update_Column {
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

/** aggregated selection of "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Aggregate = {
  __typename?: 'identity_verifiable_addresses_aggregate';
  aggregate?: Maybe<Identity_Verifiable_Addresses_Aggregate_Fields>;
  nodes: Array<Identity_Verifiable_Addresses>;
};

/** aggregate fields of "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Aggregate_Fields = {
  __typename?: 'identity_verifiable_addresses_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Identity_Verifiable_Addresses_Max_Fields>;
  min?: Maybe<Identity_Verifiable_Addresses_Min_Fields>;
};


/** aggregate fields of "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Identity_Verifiable_Addresses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Identity_Verifiable_Addresses_Max_Order_By>;
  min?: InputMaybe<Identity_Verifiable_Addresses_Min_Order_By>;
};

/** input type for inserting array relation for remote table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Arr_Rel_Insert_Input = {
  data: Array<Identity_Verifiable_Addresses_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Identity_Verifiable_Addresses_On_Conflict>;
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

/** unique or primary key constraints on table "identity_verifiable_addresses" */
export enum Identity_Verifiable_Addresses_Constraint {
  /** unique or primary key constraint */
  IdentityVerifiableAddressesPkey = 'identity_verifiable_addresses_pkey',
  /** unique or primary key constraint */
  IdentityVerifiableAddressesStatusViaUqIdx = 'identity_verifiable_addresses_status_via_uq_idx'
}

/** input type for inserting data into table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  identity?: InputMaybe<Identities_Obj_Rel_Insert_Input>;
  identity_id?: InputMaybe<Scalars['uuid']>;
  nid?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  value?: InputMaybe<Scalars['String']>;
  verified?: InputMaybe<Scalars['Boolean']>;
  verified_at?: InputMaybe<Scalars['timestamp']>;
  via?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Identity_Verifiable_Addresses_Max_Fields = {
  __typename?: 'identity_verifiable_addresses_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  identity_id?: Maybe<Scalars['uuid']>;
  nid?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  value?: Maybe<Scalars['String']>;
  verified_at?: Maybe<Scalars['timestamp']>;
  via?: Maybe<Scalars['String']>;
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

/** aggregate min on columns */
export type Identity_Verifiable_Addresses_Min_Fields = {
  __typename?: 'identity_verifiable_addresses_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  identity_id?: Maybe<Scalars['uuid']>;
  nid?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  value?: Maybe<Scalars['String']>;
  verified_at?: Maybe<Scalars['timestamp']>;
  via?: Maybe<Scalars['String']>;
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

/** response of any mutation on the table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Mutation_Response = {
  __typename?: 'identity_verifiable_addresses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Identity_Verifiable_Addresses>;
};

/** on_conflict condition type for table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_On_Conflict = {
  constraint: Identity_Verifiable_Addresses_Constraint;
  update_columns?: Array<Identity_Verifiable_Addresses_Update_Column>;
  where?: InputMaybe<Identity_Verifiable_Addresses_Bool_Exp>;
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

/** primary key columns input for table: identity_verifiable_addresses */
export type Identity_Verifiable_Addresses_Pk_Columns_Input = {
  id: Scalars['uuid'];
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

/** input type for updating data in table "identity_verifiable_addresses" */
export type Identity_Verifiable_Addresses_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  identity_id?: InputMaybe<Scalars['uuid']>;
  nid?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  value?: InputMaybe<Scalars['String']>;
  verified?: InputMaybe<Scalars['Boolean']>;
  verified_at?: InputMaybe<Scalars['timestamp']>;
  via?: InputMaybe<Scalars['String']>;
};

/** update columns of table "identity_verifiable_addresses" */
export enum Identity_Verifiable_Addresses_Update_Column {
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

/** aggregated selection of "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Aggregate = {
  __typename?: 'ignored_vulnerabilities_aggregate';
  aggregate?: Maybe<Ignored_Vulnerabilities_Aggregate_Fields>;
  nodes: Array<Ignored_Vulnerabilities>;
};

/** aggregate fields of "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Aggregate_Fields = {
  __typename?: 'ignored_vulnerabilities_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Ignored_Vulnerabilities_Max_Fields>;
  min?: Maybe<Ignored_Vulnerabilities_Min_Fields>;
};


/** aggregate fields of "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ignored_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Ignored_Vulnerabilities_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Ignored_Vulnerabilities_Append_Input = {
  locations?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Arr_Rel_Insert_Input = {
  data: Array<Ignored_Vulnerabilities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ignored_Vulnerabilities_On_Conflict>;
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

/** unique or primary key constraints on table "ignored_vulnerabilities" */
export enum Ignored_Vulnerabilities_Constraint {
  /** unique or primary key constraint */
  IgnoredVulnerabilitiesPkey = 'ignored_vulnerabilities_pkey',
  /** unique or primary key constraint */
  IgnoredVulnerabilitiesProjectIdVulnerabilityIdKey = 'ignored_vulnerabilities_project_id_vulnerability_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Ignored_Vulnerabilities_Delete_At_Path_Input = {
  locations?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Ignored_Vulnerabilities_Delete_Elem_Input = {
  locations?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Ignored_Vulnerabilities_Delete_Key_Input = {
  locations?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Insert_Input = {
  creator?: InputMaybe<Identities_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  locations?: InputMaybe<Scalars['jsonb']>;
  note?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Ignored_Vulnerabilities_Max_Fields = {
  __typename?: 'ignored_vulnerabilities_max_fields';
  creator_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Max_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ignored_Vulnerabilities_Min_Fields = {
  __typename?: 'ignored_vulnerabilities_min_fields';
  creator_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Min_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Mutation_Response = {
  __typename?: 'ignored_vulnerabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ignored_Vulnerabilities>;
};

/** on_conflict condition type for table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_On_Conflict = {
  constraint: Ignored_Vulnerabilities_Constraint;
  update_columns?: Array<Ignored_Vulnerabilities_Update_Column>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
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

/** primary key columns input for table: ignored_vulnerabilities */
export type Ignored_Vulnerabilities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Ignored_Vulnerabilities_Prepend_Input = {
  locations?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "ignored_vulnerabilities" */
export type Ignored_Vulnerabilities_Set_Input = {
  creator_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  locations?: InputMaybe<Scalars['jsonb']>;
  note?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "ignored_vulnerabilities" */
export enum Ignored_Vulnerabilities_Update_Column {
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

/** columns and relationships of "instances" */
export type Instances = {
  __typename?: 'instances';
  agent_access_token?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  build?: Maybe<Builds>;
  created_at: Scalars['timestamp'];
  instance_id: Scalars['uuid'];
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
  agent_access_token?: InputMaybe<Uuid_Comparison_Exp>;
  build?: InputMaybe<Builds_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  instance_id?: InputMaybe<Uuid_Comparison_Exp>;
  last_heartbeat?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "instances" */
export enum Instances_Constraint {
  /** unique or primary key constraint */
  InstancesPkey = 'instances_pkey'
}

/** input type for inserting data into table "instances" */
export type Instances_Insert_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  instance_id?: InputMaybe<Scalars['uuid']>;
  last_heartbeat?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Instances_Max_Fields = {
  __typename?: 'instances_max_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  instance_id?: Maybe<Scalars['uuid']>;
  last_heartbeat?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Instances_Min_Fields = {
  __typename?: 'instances_min_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  instance_id?: Maybe<Scalars['uuid']>;
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

/** on_conflict condition type for table "instances" */
export type Instances_On_Conflict = {
  constraint: Instances_Constraint;
  update_columns?: Array<Instances_Update_Column>;
  where?: InputMaybe<Instances_Bool_Exp>;
};

/** Ordering options when selecting data from "instances". */
export type Instances_Order_By = {
  agent_access_token?: InputMaybe<Order_By>;
  build?: InputMaybe<Builds_Order_By>;
  created_at?: InputMaybe<Order_By>;
  instance_id?: InputMaybe<Order_By>;
  last_heartbeat?: InputMaybe<Order_By>;
};

/** primary key columns input for table: instances */
export type Instances_Pk_Columns_Input = {
  instance_id: Scalars['uuid'];
};

/** select columns of table "instances" */
export enum Instances_Select_Column {
  /** column name */
  AgentAccessToken = 'agent_access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InstanceId = 'instance_id',
  /** column name */
  LastHeartbeat = 'last_heartbeat'
}

/** input type for updating data in table "instances" */
export type Instances_Set_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  instance_id?: InputMaybe<Scalars['uuid']>;
  last_heartbeat?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "instances" */
export enum Instances_Update_Column {
  /** column name */
  AgentAccessToken = 'agent_access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InstanceId = 'instance_id',
  /** column name */
  LastHeartbeat = 'last_heartbeat'
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

/** aggregated selection of "manifests" */
export type Manifests_Aggregate = {
  __typename?: 'manifests_aggregate';
  aggregate?: Maybe<Manifests_Aggregate_Fields>;
  nodes: Array<Manifests>;
};

/** aggregate fields of "manifests" */
export type Manifests_Aggregate_Fields = {
  __typename?: 'manifests_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Manifests_Max_Fields>;
  min?: Maybe<Manifests_Min_Fields>;
};


/** aggregate fields of "manifests" */
export type Manifests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Manifests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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

/** aggregate max on columns */
export type Manifests_Max_Fields = {
  __typename?: 'manifests_max_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  s3_key?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
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

/** aggregate min on columns */
export type Manifests_Min_Fields = {
  __typename?: 'manifests_min_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  s3_key?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
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
  /** delete data from the table: "findings" */
  delete_findings?: Maybe<Findings_Mutation_Response>;
  /** delete single row from the table: "findings" */
  delete_findings_by_pk?: Maybe<Findings>;
  /** delete data from the table: "github_repositories" */
  delete_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** delete single row from the table: "github_repositories" */
  delete_github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** delete data from the table: "identities" */
  delete_identities?: Maybe<Identities_Mutation_Response>;
  /** delete single row from the table: "identities" */
  delete_identities_by_pk?: Maybe<Identities>;
  /** delete data from the table: "identity_verifiable_addresses" */
  delete_identity_verifiable_addresses?: Maybe<Identity_Verifiable_Addresses_Mutation_Response>;
  /** delete single row from the table: "identity_verifiable_addresses" */
  delete_identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** delete data from the table: "ignored_vulnerabilities" */
  delete_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** delete single row from the table: "ignored_vulnerabilities" */
  delete_ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** delete data from the table: "instances" */
  delete_instances?: Maybe<Instances_Mutation_Response>;
  /** delete single row from the table: "instances" */
  delete_instances_by_pk?: Maybe<Instances>;
  /** delete data from the table: "manifests" */
  delete_manifests?: Maybe<Manifests_Mutation_Response>;
  /** delete single row from the table: "manifests" */
  delete_manifests_by_pk?: Maybe<Manifests>;
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
  /** delete data from the table: "scans" */
  delete_scans?: Maybe<Scans_Mutation_Response>;
  /** delete single row from the table: "scans" */
  delete_scans_by_pk?: Maybe<Scans>;
  /** delete data from the table: "settings" */
  delete_settings?: Maybe<Settings_Mutation_Response>;
  /** delete single row from the table: "settings" */
  delete_settings_by_pk?: Maybe<Settings>;
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
  /** insert data into the table: "github_repositories" */
  insert_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** insert a single row into the table: "github_repositories" */
  insert_github_repositories_one?: Maybe<Github_Repositories>;
  /** insert data into the table: "identities" */
  insert_identities?: Maybe<Identities_Mutation_Response>;
  /** insert a single row into the table: "identities" */
  insert_identities_one?: Maybe<Identities>;
  /** insert data into the table: "identity_verifiable_addresses" */
  insert_identity_verifiable_addresses?: Maybe<Identity_Verifiable_Addresses_Mutation_Response>;
  /** insert a single row into the table: "identity_verifiable_addresses" */
  insert_identity_verifiable_addresses_one?: Maybe<Identity_Verifiable_Addresses>;
  /** insert data into the table: "ignored_vulnerabilities" */
  insert_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "ignored_vulnerabilities" */
  insert_ignored_vulnerabilities_one?: Maybe<Ignored_Vulnerabilities>;
  /** insert data into the table: "instances" */
  insert_instances?: Maybe<Instances_Mutation_Response>;
  /** insert a single row into the table: "instances" */
  insert_instances_one?: Maybe<Instances>;
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
  /** insert data into the table: "scans" */
  insert_scans?: Maybe<Scans_Mutation_Response>;
  /** insert a single row into the table: "scans" */
  insert_scans_one?: Maybe<Scans>;
  /** insert data into the table: "settings" */
  insert_settings?: Maybe<Settings_Mutation_Response>;
  /** insert a single row into the table: "settings" */
  insert_settings_one?: Maybe<Settings>;
  /** insert data into the table: "vulnerabilities" */
  insert_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "vulnerabilities" */
  insert_vulnerabilities_one?: Maybe<Vulnerabilities>;
  /** insert data into the table: "vulnerability_packages" */
  insert_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** insert a single row into the table: "vulnerability_packages" */
  insert_vulnerability_packages_one?: Maybe<Vulnerability_Packages>;
  /** get s3 presigned url for manifest upload, used only by the frontend */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
  /** This performs the manifest sbom generation and creates the first build from the manifest */
  scanManifest?: Maybe<ScanManifestOutput>;
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
  /** update single row of the table: "github_repositories" */
  update_github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** update data of the table: "identities" */
  update_identities?: Maybe<Identities_Mutation_Response>;
  /** update single row of the table: "identities" */
  update_identities_by_pk?: Maybe<Identities>;
  /** update data of the table: "identity_verifiable_addresses" */
  update_identity_verifiable_addresses?: Maybe<Identity_Verifiable_Addresses_Mutation_Response>;
  /** update single row of the table: "identity_verifiable_addresses" */
  update_identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** update data of the table: "ignored_vulnerabilities" */
  update_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "ignored_vulnerabilities" */
  update_ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** update data of the table: "instances" */
  update_instances?: Maybe<Instances_Mutation_Response>;
  /** update single row of the table: "instances" */
  update_instances_by_pk?: Maybe<Instances>;
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
  /** update data of the table: "scans" */
  update_scans?: Maybe<Scans_Mutation_Response>;
  /** update single row of the table: "scans" */
  update_scans_by_pk?: Maybe<Scans>;
  /** update data of the table: "settings" */
  update_settings?: Maybe<Settings_Mutation_Response>;
  /** update single row of the table: "settings" */
  update_settings_by_pk?: Maybe<Settings>;
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
export type Mutation_RootDelete_Github_RepositoriesArgs = {
  where: Github_Repositories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Github_Repositories_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_IdentitiesArgs = {
  where: Identities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Identities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Identity_Verifiable_AddressesArgs = {
  where: Identity_Verifiable_Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Identity_Verifiable_Addresses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Ignored_VulnerabilitiesArgs = {
  where: Ignored_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ignored_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_InstancesArgs = {
  where: Instances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Instances_By_PkArgs = {
  instance_id: Scalars['uuid'];
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
export type Mutation_RootInsert_IdentitiesArgs = {
  objects: Array<Identities_Insert_Input>;
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Identities_OneArgs = {
  object: Identities_Insert_Input;
  on_conflict?: InputMaybe<Identities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Identity_Verifiable_AddressesArgs = {
  objects: Array<Identity_Verifiable_Addresses_Insert_Input>;
  on_conflict?: InputMaybe<Identity_Verifiable_Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Identity_Verifiable_Addresses_OneArgs = {
  object: Identity_Verifiable_Addresses_Insert_Input;
  on_conflict?: InputMaybe<Identity_Verifiable_Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ignored_VulnerabilitiesArgs = {
  objects: Array<Ignored_Vulnerabilities_Insert_Input>;
  on_conflict?: InputMaybe<Ignored_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ignored_Vulnerabilities_OneArgs = {
  object: Ignored_Vulnerabilities_Insert_Input;
  on_conflict?: InputMaybe<Ignored_Vulnerabilities_On_Conflict>;
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
export type Mutation_RootPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootScanManifestArgs = {
  bucket: Scalars['String'];
  key: Scalars['String'];
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
export type Mutation_RootUpdate_Github_Repositories_By_PkArgs = {
  _append?: InputMaybe<Github_Repositories_Append_Input>;
  _delete_at_path?: InputMaybe<Github_Repositories_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Github_Repositories_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Github_Repositories_Delete_Key_Input>;
  _inc?: InputMaybe<Github_Repositories_Inc_Input>;
  _prepend?: InputMaybe<Github_Repositories_Prepend_Input>;
  _set?: InputMaybe<Github_Repositories_Set_Input>;
  pk_columns: Github_Repositories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_IdentitiesArgs = {
  _append?: InputMaybe<Identities_Append_Input>;
  _delete_at_path?: InputMaybe<Identities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Identities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Identities_Delete_Key_Input>;
  _prepend?: InputMaybe<Identities_Prepend_Input>;
  _set?: InputMaybe<Identities_Set_Input>;
  where: Identities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Identities_By_PkArgs = {
  _append?: InputMaybe<Identities_Append_Input>;
  _delete_at_path?: InputMaybe<Identities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Identities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Identities_Delete_Key_Input>;
  _prepend?: InputMaybe<Identities_Prepend_Input>;
  _set?: InputMaybe<Identities_Set_Input>;
  pk_columns: Identities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Identity_Verifiable_AddressesArgs = {
  _set?: InputMaybe<Identity_Verifiable_Addresses_Set_Input>;
  where: Identity_Verifiable_Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Identity_Verifiable_Addresses_By_PkArgs = {
  _set?: InputMaybe<Identity_Verifiable_Addresses_Set_Input>;
  pk_columns: Identity_Verifiable_Addresses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ignored_VulnerabilitiesArgs = {
  _append?: InputMaybe<Ignored_Vulnerabilities_Append_Input>;
  _delete_at_path?: InputMaybe<Ignored_Vulnerabilities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Ignored_Vulnerabilities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Ignored_Vulnerabilities_Delete_Key_Input>;
  _prepend?: InputMaybe<Ignored_Vulnerabilities_Prepend_Input>;
  _set?: InputMaybe<Ignored_Vulnerabilities_Set_Input>;
  where: Ignored_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ignored_Vulnerabilities_By_PkArgs = {
  _append?: InputMaybe<Ignored_Vulnerabilities_Append_Input>;
  _delete_at_path?: InputMaybe<Ignored_Vulnerabilities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Ignored_Vulnerabilities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Ignored_Vulnerabilities_Delete_Key_Input>;
  _prepend?: InputMaybe<Ignored_Vulnerabilities_Prepend_Input>;
  _set?: InputMaybe<Ignored_Vulnerabilities_Set_Input>;
  pk_columns: Ignored_Vulnerabilities_Pk_Columns_Input;
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
  role: Scalars['organization_user_role'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Identities;
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
  user?: InputMaybe<Identities_Bool_Exp>;
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
  user?: InputMaybe<Identities_Obj_Rel_Insert_Input>;
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
  user?: InputMaybe<Identities_Order_By>;
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
  creator_id?: Maybe<Scalars['uuid']>;
  github_id?: Maybe<Scalars['Int']>;
  github_owner_type?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  installation_id?: Maybe<Scalars['Int']>;
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
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  github_owner_type?: InputMaybe<String_Comparison_Exp>;
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
  creator_id?: InputMaybe<Scalars['uuid']>;
  github_id?: InputMaybe<Scalars['Int']>;
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
  github_owner_type?: Maybe<Scalars['String']>;
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
  github_owner_type?: Maybe<Scalars['String']>;
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
  creator_id?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_owner_type?: InputMaybe<Order_By>;
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

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  github_id?: InputMaybe<Scalars['Int']>;
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
  created_at: Scalars['timestamp'];
  /** An object relationship */
  created_by_user?: Maybe<Identities>;
  created_by_user_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  last_used?: Maybe<Scalars['timestamp']>;
  name?: Maybe<Scalars['String']>;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Project_Access_Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_access_tokens". All fields are combined with a logical 'AND'. */
export type Project_Access_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  _not?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Access_Tokens_Bool_Exp>>;
  access_token?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_user?: InputMaybe<Identities_Bool_Exp>;
  created_by_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_used?: InputMaybe<Timestamp_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_user?: InputMaybe<Identities_Obj_Rel_Insert_Input>;
  created_by_user_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_used?: InputMaybe<Scalars['timestamp']>;
  name?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_uuid?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Project_Access_Tokens_Max_Fields = {
  __typename?: 'project_access_tokens_max_fields';
  access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_user_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  last_used?: Maybe<Scalars['timestamp']>;
  name?: Maybe<Scalars['String']>;
  project_uuid?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Max_Order_By = {
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Access_Tokens_Min_Fields = {
  __typename?: 'project_access_tokens_min_fields';
  access_token?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_user_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  last_used?: Maybe<Scalars['timestamp']>;
  name?: Maybe<Scalars['String']>;
  project_uuid?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Min_Order_By = {
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
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

/** on_conflict condition type for table "project_access_tokens" */
export type Project_Access_Tokens_On_Conflict = {
  constraint: Project_Access_Tokens_Constraint;
  update_columns?: Array<Project_Access_Tokens_Update_Column>;
  where?: InputMaybe<Project_Access_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "project_access_tokens". */
export type Project_Access_Tokens_Order_By = {
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_user?: InputMaybe<Identities_Order_By>;
  created_by_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
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
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastUsed = 'last_used',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectUuid = 'project_uuid'
}

/** input type for updating data in table "project_access_tokens" */
export type Project_Access_Tokens_Set_Input = {
  access_token?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_user_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_used?: InputMaybe<Scalars['timestamp']>;
  name?: InputMaybe<Scalars['String']>;
  project_uuid?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "project_access_tokens" */
export enum Project_Access_Tokens_Update_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastUsed = 'last_used',
  /** column name */
  Name = 'name',
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
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** An aggregate relationship */
  github_repositories_aggregate: Github_Repositories_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** An aggregate relationship */
  ignored_vulnerabilities_aggregate: Ignored_Vulnerabilities_Aggregate;
  /** An array relationship */
  manifests: Array<Manifests>;
  /** An aggregate relationship */
  manifests_aggregate: Manifests_Aggregate;
  name: Scalars['String'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** An aggregate relationship */
  project_access_tokens_aggregate: Project_Access_Tokens_Aggregate;
  repo?: Maybe<Scalars['String']>;
  /** An array relationship */
  reports: Array<Project_Access_Tokens>;
  /** An aggregate relationship */
  reports_aggregate: Project_Access_Tokens_Aggregate;
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
export type ProjectsGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsGithub_Repositories_AggregateArgs = {
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
export type ProjectsIgnored_Vulnerabilities_AggregateArgs = {
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
export type ProjectsManifests_AggregateArgs = {
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
export type ProjectsProject_Access_Tokens_AggregateArgs = {
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


/** columns and relationships of "projects" */
export type ProjectsReports_AggregateArgs = {
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
  id?: InputMaybe<Scalars['uuid']>;
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Arr_Rel_Insert_Input>;
  manifests?: InputMaybe<Manifests_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  project_access_tokens?: InputMaybe<Project_Access_Tokens_Arr_Rel_Insert_Input>;
  repo?: InputMaybe<Scalars['String']>;
  reports?: InputMaybe<Project_Access_Tokens_Arr_Rel_Insert_Input>;
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
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** An aggregate relationship */
  github_repositories_aggregate: Github_Repositories_Aggregate;
  /** fetch data from the table: "github_repositories" using primary key columns */
  github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch aggregated fields from the table: "identities" */
  identities_aggregate: Identities_Aggregate;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  /** An aggregate relationship */
  identity_verifiable_addresses_aggregate: Identity_Verifiable_Addresses_Aggregate;
  /** fetch data from the table: "identity_verifiable_addresses" using primary key columns */
  identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** An aggregate relationship */
  ignored_vulnerabilities_aggregate: Ignored_Vulnerabilities_Aggregate;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** fetch data from the table: "instances" */
  instances: Array<Instances>;
  /** fetch aggregated fields from the table: "instances" */
  instances_aggregate: Instances_Aggregate;
  /** fetch data from the table: "instances" using primary key columns */
  instances_by_pk?: Maybe<Instances>;
  /** An array relationship */
  manifests: Array<Manifests>;
  /** An aggregate relationship */
  manifests_aggregate: Manifests_Aggregate;
  /** fetch data from the table: "manifests" using primary key columns */
  manifests_by_pk?: Maybe<Manifests>;
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
  /** get s3 presigned url for manifest upload, used by the CLI */
  presignSbomUpload?: Maybe<SbomUploadUrlOutput>;
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
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** An array relationship */
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


export type Query_RootGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Query_RootGithub_Repositories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Query_RootGithub_Repositories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Query_RootIdentities_AggregateArgs = {
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


export type Query_RootIdentity_Verifiable_Addresses_AggregateArgs = {
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


export type Query_RootIgnored_Vulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


export type Query_RootIgnored_Vulnerabilities_By_PkArgs = {
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
  instance_id: Scalars['uuid'];
};


export type Query_RootManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


export type Query_RootManifests_AggregateArgs = {
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


export type Query_RootPresignSbomUploadArgs = {
  buildId: Scalars['uuid'];
  orgId: Scalars['uuid'];
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
  /** An object relationship */
  parent: Vulnerabilities;
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
  /** upsert condition */
  on_conflict?: InputMaybe<Related_Vulnerabilities_On_Conflict>;
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
  parent?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
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

/** on_conflict condition type for table "related_vulnerabilities" */
export type Related_Vulnerabilities_On_Conflict = {
  constraint: Related_Vulnerabilities_Constraint;
  update_columns?: Array<Related_Vulnerabilities_Update_Column>;
  where?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
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
  avg?: Maybe<Scans_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Scans_Max_Fields>;
  min?: Maybe<Scans_Min_Fields>;
  stddev?: Maybe<Scans_Stddev_Fields>;
  stddev_pop?: Maybe<Scans_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Scans_Stddev_Samp_Fields>;
  sum?: Maybe<Scans_Sum_Fields>;
  var_pop?: Maybe<Scans_Var_Pop_Fields>;
  var_samp?: Maybe<Scans_Var_Samp_Fields>;
  variance?: Maybe<Scans_Variance_Fields>;
};


/** aggregate fields of "scans" */
export type Scans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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

/** aggregate avg on columns */
export type Scans_Avg_Fields = {
  __typename?: 'scans_avg_fields';
  scan_number?: Maybe<Scalars['Float']>;
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
  scan_number?: Maybe<Scalars['Int']>;
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
  scan_number?: InputMaybe<Order_By>;
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
  scan_number?: Maybe<Scalars['Int']>;
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

/** aggregate stddev on columns */
export type Scans_Stddev_Fields = {
  __typename?: 'scans_stddev_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "scans" */
export type Scans_Stddev_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Scans_Stddev_Pop_Fields = {
  __typename?: 'scans_stddev_pop_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "scans" */
export type Scans_Stddev_Pop_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Scans_Stddev_Samp_Fields = {
  __typename?: 'scans_stddev_samp_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "scans" */
export type Scans_Stddev_Samp_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Scans_Sum_Fields = {
  __typename?: 'scans_sum_fields';
  scan_number?: Maybe<Scalars['Int']>;
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

/** aggregate var_pop on columns */
export type Scans_Var_Pop_Fields = {
  __typename?: 'scans_var_pop_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "scans" */
export type Scans_Var_Pop_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Scans_Var_Samp_Fields = {
  __typename?: 'scans_var_samp_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "scans" */
export type Scans_Var_Samp_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Scans_Variance_Fields = {
  __typename?: 'scans_variance_fields';
  scan_number?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "scans" */
export type Scans_Variance_Order_By = {
  scan_number?: InputMaybe<Order_By>;
};

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

/** on_conflict condition type for table "settings" */
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
  /** fetch data from the table: "github_repositories" */
  github_repositories: Array<Github_Repositories>;
  /** An aggregate relationship */
  github_repositories_aggregate: Github_Repositories_Aggregate;
  /** fetch data from the table: "github_repositories" using primary key columns */
  github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch aggregated fields from the table: "identities" */
  identities_aggregate: Identities_Aggregate;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  identity_verifiable_addresses: Array<Identity_Verifiable_Addresses>;
  /** An aggregate relationship */
  identity_verifiable_addresses_aggregate: Identity_Verifiable_Addresses_Aggregate;
  /** fetch data from the table: "identity_verifiable_addresses" using primary key columns */
  identity_verifiable_addresses_by_pk?: Maybe<Identity_Verifiable_Addresses>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** An aggregate relationship */
  ignored_vulnerabilities_aggregate: Ignored_Vulnerabilities_Aggregate;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** fetch data from the table: "instances" */
  instances: Array<Instances>;
  /** fetch aggregated fields from the table: "instances" */
  instances_aggregate: Instances_Aggregate;
  /** fetch data from the table: "instances" using primary key columns */
  instances_by_pk?: Maybe<Instances>;
  /** An array relationship */
  manifests: Array<Manifests>;
  /** An aggregate relationship */
  manifests_aggregate: Manifests_Aggregate;
  /** fetch data from the table: "manifests" using primary key columns */
  manifests_by_pk?: Maybe<Manifests>;
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
  /** fetch data from the table: "vulnerabilities" */
  vulnerabilities: Array<Vulnerabilities>;
  /** fetch aggregated fields from the table: "vulnerabilities" */
  vulnerabilities_aggregate: Vulnerabilities_Aggregate;
  /** fetch data from the table: "vulnerabilities" using primary key columns */
  vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** An array relationship */
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


export type Subscription_RootGithub_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Subscription_RootGithub_Repositories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Github_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Github_Repositories_Order_By>>;
  where?: InputMaybe<Github_Repositories_Bool_Exp>;
};


export type Subscription_RootGithub_Repositories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<Identities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Identities_Order_By>>;
  where?: InputMaybe<Identities_Bool_Exp>;
};


export type Subscription_RootIdentities_AggregateArgs = {
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


export type Subscription_RootIdentity_Verifiable_Addresses_AggregateArgs = {
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


export type Subscription_RootIgnored_Vulnerabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootIgnored_Vulnerabilities_By_PkArgs = {
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
  instance_id: Scalars['uuid'];
};


export type Subscription_RootManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


export type Subscription_RootManifests_AggregateArgs = {
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
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** An aggregate relationship */
  ignored_vulnerabilities_aggregate: Ignored_Vulnerabilities_Aggregate;
  name: Scalars['String'];
  namespace: Scalars['String'];
  record_source?: Maybe<Scalars['String']>;
  /** An array relationship */
  related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  related_vulnerabilities_aggregate: Related_Vulnerabilities_Aggregate;
  /** An array relationship */
  reverse_related_vulnerabilities: Array<Related_Vulnerabilities>;
  /** An aggregate relationship */
  reverse_related_vulnerabilities_aggregate: Related_Vulnerabilities_Aggregate;
  severity: Scalars['severity_enum'];
  slug: Scalars['String'];
  topic_id?: Maybe<Scalars['uuid']>;
  urls?: Maybe<Scalars['_text']>;
  /** An array relationship */
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
export type VulnerabilitiesIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerabilities" */
export type VulnerabilitiesIgnored_Vulnerabilities_AggregateArgs = {
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
export type VulnerabilitiesRelated_Vulnerabilities_AggregateArgs = {
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
export type VulnerabilitiesReverse_Related_Vulnerabilities_AggregateArgs = {
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
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  namespace?: InputMaybe<String_Comparison_Exp>;
  record_source?: InputMaybe<String_Comparison_Exp>;
  related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
  reverse_related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Bool_Exp>;
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
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  record_source?: InputMaybe<Scalars['String']>;
  related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Arr_Rel_Insert_Input>;
  reverse_related_vulnerabilities?: InputMaybe<Related_Vulnerabilities_Arr_Rel_Insert_Input>;
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

export type AuthorizedUserOrganizationsQueryVariables = Exact<{
  github_org_ids?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type AuthorizedUserOrganizationsQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any, github_id?: number | null }> };

export type CreateOrganizationsMutationVariables = Exact<{
  objects?: InputMaybe<Array<Organizations_Insert_Input> | Organizations_Insert_Input>;
}>;


export type CreateOrganizationsMutation = { __typename?: 'mutation_root', insert_organizations?: { __typename?: 'organizations_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'organizations', id: any }> } | null };

export type GetAuthDataFromProjectTokenQueryVariables = Exact<{
  access_token: Scalars['uuid'];
}>;


export type GetAuthDataFromProjectTokenQuery = { __typename?: 'query_root', project_access_tokens: Array<{ __typename?: 'project_access_tokens', project: { __typename?: 'projects', id: any, builds: Array<{ __typename?: 'builds', id: any }> } }> };

export type GetCountOfPersonalOrgQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetCountOfPersonalOrgQuery = { __typename?: 'query_root', organizations_aggregate: { __typename?: 'organizations_aggregate', aggregate?: { __typename?: 'organizations_aggregate_fields', count: number } | null } };

export type GetScanReportNotifyInfoForBuildQueryVariables = Exact<{
  build_id: Scalars['uuid'];
}>;


export type GetScanReportNotifyInfoForBuildQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', pull_request_id?: string | null, project?: { __typename?: 'projects', id: any, organization?: { __typename?: 'organizations', installation_id?: number | null } | null } | null } | null };

export type InsertBuildMutationVariables = Exact<{
  project_id: Scalars['uuid'];
  s3_url?: InputMaybe<Scalars['String']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
}>;


export type InsertBuildMutation = { __typename?: 'mutation_root', insert_builds_one?: { __typename?: 'builds', id: any } | null };

export type InsertPersonalProjectAndOrgMutationVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type InsertPersonalProjectAndOrgMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any } | null };

export type InsertScanMutationVariables = Exact<{
  scan: Scans_Insert_Input;
}>;


export type InsertScanMutation = { __typename?: 'mutation_root', insert_scans_one?: { __typename?: 'scans', id: any, build_id: any } | null };

export type GetProjectIdFromGitUrlQueryVariables = Exact<{
  git_url?: InputMaybe<Scalars['String']>;
}>;


export type GetProjectIdFromGitUrlQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', project: { __typename?: 'projects', id: any } }> };

export type SetBuildS3UrlMutationVariables = Exact<{
  id: Scalars['uuid'];
  s3_url: Scalars['String'];
}>;


export type SetBuildS3UrlMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

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
}>;


export type UpdateOrganizationsForUserMutation = { __typename?: 'mutation_root', insert_organization_user?: { __typename?: 'organization_user_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'organization_user', id: any }> } | null };


export const AuthorizedUserOrganizationsDocument = gql`
    query AuthorizedUserOrganizations($github_org_ids: [Int!]) {
  organizations(where: {github_id: {_in: $github_org_ids}}) {
    id
    github_id
  }
}
    `;
export const CreateOrganizationsDocument = gql`
    mutation CreateOrganizations($objects: [organizations_insert_input!] = {}) {
  insert_organizations(
    objects: $objects
    on_conflict: {constraint: organizations_github_id_key, update_columns: installation_id}
  ) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
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
export const GetScanReportNotifyInfoForBuildDocument = gql`
    query GetScanReportNotifyInfoForBuild($build_id: uuid!) {
  builds_by_pk(id: $build_id) {
    project {
      id
      organization {
        installation_id
      }
    }
    pull_request_id
  }
}
    `;
export const InsertBuildDocument = gql`
    mutation InsertBuild($project_id: uuid!, $s3_url: String, $pull_request_id: String) {
  insert_builds_one(
    object: {project_id: $project_id, s3_url: $s3_url, pull_request_id: $pull_request_id}
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
    mutation InsertScan($scan: scans_insert_input!) {
  insert_scans_one(object: $scan) {
    id
    build_id
  }
}
    `;
export const GetProjectIdFromGitUrlDocument = gql`
    query GetProjectIdFromGitUrl($git_url: String) {
  github_repositories(where: {git_url: {_eq: $git_url}}) {
    project {
      id
    }
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
    mutation UpdateOrganizationsForUser($organizations_for_user: [organization_user_insert_input!]!) {
  insert_organization_user(
    objects: $organizations_for_user
    on_conflict: {constraint: organization_user_user_id_organization_id_key, update_columns: user_id}
  ) {
    affected_rows
    returning {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AuthorizedUserOrganizations(variables?: AuthorizedUserOrganizationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthorizedUserOrganizationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthorizedUserOrganizationsQuery>(AuthorizedUserOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AuthorizedUserOrganizations', 'query');
    },
    CreateOrganizations(variables?: CreateOrganizationsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrganizationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationsMutation>(CreateOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrganizations', 'mutation');
    },
    GetAuthDataFromProjectToken(variables: GetAuthDataFromProjectTokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthDataFromProjectTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthDataFromProjectTokenQuery>(GetAuthDataFromProjectTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAuthDataFromProjectToken', 'query');
    },
    GetCountOfPersonalOrg(variables: GetCountOfPersonalOrgQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCountOfPersonalOrgQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCountOfPersonalOrgQuery>(GetCountOfPersonalOrgDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCountOfPersonalOrg', 'query');
    },
    GetScanReportNotifyInfoForBuild(variables: GetScanReportNotifyInfoForBuildQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetScanReportNotifyInfoForBuildQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetScanReportNotifyInfoForBuildQuery>(GetScanReportNotifyInfoForBuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetScanReportNotifyInfoForBuild', 'query');
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
    GetProjectIdFromGitUrl(variables?: GetProjectIdFromGitUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProjectIdFromGitUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectIdFromGitUrlQuery>(GetProjectIdFromGitUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProjectIdFromGitUrl', 'query');
    },
    SetBuildS3Url(variables: SetBuildS3UrlMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetBuildS3UrlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetBuildS3UrlMutation>(SetBuildS3UrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetBuildS3Url', 'mutation');
    },
    UpdateManifestStatusIfExists(variables: UpdateManifestStatusIfExistsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestStatusIfExistsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestStatusIfExistsMutation>(UpdateManifestStatusIfExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifestStatusIfExists', 'mutation');
    },
    UpdateManifest(variables: UpdateManifestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestMutation>(UpdateManifestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifest', 'mutation');
    },
    UpdateOrganizationsForUser(variables: UpdateOrganizationsForUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrganizationsForUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrganizationsForUserMutation>(UpdateOrganizationsForUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateOrganizationsForUser', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;