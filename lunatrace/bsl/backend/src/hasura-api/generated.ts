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
  affected_range_type: any;
  builds_source_type: any;
  date: any;
  fix_state_enum: any;
  jsonb: any;
  license_source: any;
  numeric: any;
  organization_user_role: any;
  package_manager: any;
  reference_type: any;
  severity_enum: any;
  timestamp: any;
  timestamptz: any;
  user_role: 'organization_user'|'lunatrace_admin';
  uuid: any;
};

export type AuthenticatedRepoCloneUrlOutput = {
  __typename?: 'AuthenticatedRepoCloneUrlOutput';
  url?: Maybe<Scalars['String']>;
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
  headers: Scalars['jsonb'];
  key: Scalars['String'];
  url: Scalars['String'];
};

export type SbomUploadUrlOutput = {
  __typename?: 'SbomUploadUrlOutput';
  error: Scalars['Boolean'];
  uploadUrl?: Maybe<UploadUrl>;
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
  headers: Scalars['jsonb'];
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

/** Boolean expression to compare columns of type "affected_range_type". All fields are combined with logical 'AND'. */
export type Affected_Range_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['affected_range_type']>;
  _gt?: InputMaybe<Scalars['affected_range_type']>;
  _gte?: InputMaybe<Scalars['affected_range_type']>;
  _in?: InputMaybe<Array<Scalars['affected_range_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['affected_range_type']>;
  _lte?: InputMaybe<Scalars['affected_range_type']>;
  _neq?: InputMaybe<Scalars['affected_range_type']>;
  _nin?: InputMaybe<Array<Scalars['affected_range_type']>>;
};

/** columns and relationships of "builds" */
export type Builds = {
  __typename?: 'builds';
  agent_access_token: Scalars['uuid'];
  build_number?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamp'];
  existing_github_check_id?: Maybe<Scalars['Int']>;
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
  s3_url_signed?: Maybe<Scalars['String']>;
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
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "builds" */
export type Builds_Avg_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "builds". All fields are combined with a logical 'AND'. */
export type Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Builds_Bool_Exp>>;
  _not?: InputMaybe<Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Builds_Bool_Exp>>;
  agent_access_token?: InputMaybe<Uuid_Comparison_Exp>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_check_id?: InputMaybe<Int_Comparison_Exp>;
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
  existing_github_check_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "builds" */
export type Builds_Insert_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_check_id?: InputMaybe<Scalars['Int']>;
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

/** aggregate max on columns */
export type Builds_Max_Fields = {
  __typename?: 'builds_max_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_check_id?: Maybe<Scalars['Int']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
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
  existing_github_check_id?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
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
  existing_github_check_id?: Maybe<Scalars['Int']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
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
  existing_github_check_id?: InputMaybe<Order_By>;
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
  existing_github_check_id?: InputMaybe<Order_By>;
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
  ExistingGithubCheckId = 'existing_github_check_id',
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
  existing_github_check_id?: InputMaybe<Scalars['Int']>;
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

/** aggregate stddev on columns */
export type Builds_Stddev_Fields = {
  __typename?: 'builds_stddev_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "builds" */
export type Builds_Stddev_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Builds_Stddev_Pop_Fields = {
  __typename?: 'builds_stddev_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "builds" */
export type Builds_Stddev_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Builds_Stddev_Samp_Fields = {
  __typename?: 'builds_stddev_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "builds" */
export type Builds_Stddev_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Builds_Sum_Fields = {
  __typename?: 'builds_sum_fields';
  build_number?: Maybe<Scalars['Int']>;
  existing_github_check_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "builds" */
export type Builds_Sum_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
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
  ExistingGithubCheckId = 'existing_github_check_id',
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

/** aggregate var_pop on columns */
export type Builds_Var_Pop_Fields = {
  __typename?: 'builds_var_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "builds" */
export type Builds_Var_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Builds_Var_Samp_Fields = {
  __typename?: 'builds_var_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "builds" */
export type Builds_Var_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Builds_Variance_Fields = {
  __typename?: 'builds_variance_fields';
  build_number?: Maybe<Scalars['Float']>;
  existing_github_check_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "builds" */
export type Builds_Variance_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
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

/** columns and relationships of "default_branch_builds" */
export type Default_Branch_Builds = {
  __typename?: 'default_branch_builds';
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  source_type?: Maybe<Scalars['builds_source_type']>;
};


/** columns and relationships of "default_branch_builds" */
export type Default_Branch_BuildsFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "default_branch_builds" */
export type Default_Branch_BuildsScansArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};

/** order by aggregate values of table "default_branch_builds" */
export type Default_Branch_Builds_Aggregate_Order_By = {
  avg?: InputMaybe<Default_Branch_Builds_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Default_Branch_Builds_Max_Order_By>;
  min?: InputMaybe<Default_Branch_Builds_Min_Order_By>;
  stddev?: InputMaybe<Default_Branch_Builds_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Default_Branch_Builds_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Default_Branch_Builds_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Default_Branch_Builds_Sum_Order_By>;
  var_pop?: InputMaybe<Default_Branch_Builds_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Default_Branch_Builds_Var_Samp_Order_By>;
  variance?: InputMaybe<Default_Branch_Builds_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "default_branch_builds" */
export type Default_Branch_Builds_Arr_Rel_Insert_Input = {
  data: Array<Default_Branch_Builds_Insert_Input>;
};

/** order by avg() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Avg_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "default_branch_builds". All fields are combined with a logical 'AND'. */
export type Default_Branch_Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Default_Branch_Builds_Bool_Exp>>;
  _not?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Default_Branch_Builds_Bool_Exp>>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_review_id?: InputMaybe<String_Comparison_Exp>;
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
  source_type?: InputMaybe<Builds_Source_Type_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "default_branch_builds" */
export type Default_Branch_Builds_Inc_Input = {
  build_number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "default_branch_builds" */
export type Default_Branch_Builds_Insert_Input = {
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_review_id?: InputMaybe<Scalars['String']>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  scans?: InputMaybe<Scans_Arr_Rel_Insert_Input>;
  source_type?: InputMaybe<Scalars['builds_source_type']>;
};

/** order by max() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Max_Order_By = {
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

/** order by min() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Min_Order_By = {
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

/** response of any mutation on the table "default_branch_builds" */
export type Default_Branch_Builds_Mutation_Response = {
  __typename?: 'default_branch_builds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Default_Branch_Builds>;
};

/** input type for inserting object relation for remote table "default_branch_builds" */
export type Default_Branch_Builds_Obj_Rel_Insert_Input = {
  data: Default_Branch_Builds_Insert_Input;
};

/** Ordering options when selecting data from "default_branch_builds". */
export type Default_Branch_Builds_Order_By = {
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
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
  source_type?: InputMaybe<Order_By>;
};

/** select columns of table "default_branch_builds" */
export enum Default_Branch_Builds_Select_Column {
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

/** input type for updating data in table "default_branch_builds" */
export type Default_Branch_Builds_Set_Input = {
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_review_id?: InputMaybe<Scalars['String']>;
  git_branch?: InputMaybe<Scalars['String']>;
  git_hash?: InputMaybe<Scalars['String']>;
  git_remote?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['uuid']>;
  pull_request_id?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
  source_type?: InputMaybe<Scalars['builds_source_type']>;
};

/** order by stddev() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Sum_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Var_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Var_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Variance_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** columns and relationships of "findings" */
export type Findings = {
  __typename?: 'findings';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  created_at: Scalars['timestamp'];
  dedupe_slug: Scalars['String'];
  /** An object relationship */
  default_branch_build?: Maybe<Default_Branch_Builds>;
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
  default_branch_build?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
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
  default_branch_build?: InputMaybe<Default_Branch_Builds_Obj_Rel_Insert_Input>;
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
  default_branch_build?: InputMaybe<Default_Branch_Builds_Order_By>;
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

/** Metadata about a github repository and where to find it. */
export type Github_Repositories = {
  __typename?: 'github_repositories';
  authenticated_clone_url?: Maybe<AuthenticatedRepoCloneUrlOutput>;
  default_branch?: Maybe<Scalars['String']>;
  git_url: Scalars['String'];
  github_id?: Maybe<Scalars['Int']>;
  github_node_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  traits: Scalars['jsonb'];
};


/** Metadata about a github repository and where to find it. */
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
  default_branch?: InputMaybe<String_Comparison_Exp>;
  git_url?: InputMaybe<String_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
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
  default_branch?: InputMaybe<Scalars['String']>;
  git_url?: InputMaybe<Scalars['String']>;
  github_id?: InputMaybe<Scalars['Int']>;
  github_node_id?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** order by max() on columns of table "github_repositories" */
export type Github_Repositories_Max_Order_By = {
  default_branch?: InputMaybe<Order_By>;
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "github_repositories" */
export type Github_Repositories_Min_Order_By = {
  default_branch?: InputMaybe<Order_By>;
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
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
  default_branch?: InputMaybe<Order_By>;
  git_url?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  github_node_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  traits?: InputMaybe<Order_By>;
};

/** primary key columns input for table: github_repositories */
export type Github_Repositories_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Github_Repositories_Prepend_Input = {
  traits?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_repositories" */
export enum Github_Repositories_Select_Column {
  /** column name */
  DefaultBranch = 'default_branch',
  /** column name */
  GitUrl = 'git_url',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Traits = 'traits'
}

/** input type for updating data in table "github_repositories" */
export type Github_Repositories_Set_Input = {
  default_branch?: InputMaybe<Scalars['String']>;
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
  DefaultBranch = 'default_branch',
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

/** columns and relationships of "guide_related_guides" */
export type Guide_Related_Guides = {
  __typename?: 'guide_related_guides';
  created_at: Scalars['timestamptz'];
  from_guide_id: Scalars['uuid'];
  id: Scalars['uuid'];
  to_guide_unique_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** input type for inserting array relation for remote table "guide_related_guides" */
export type Guide_Related_Guides_Arr_Rel_Insert_Input = {
  data: Array<Guide_Related_Guides_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Guide_Related_Guides_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guide_related_guides". All fields are combined with a logical 'AND'. */
export type Guide_Related_Guides_Bool_Exp = {
  _and?: InputMaybe<Array<Guide_Related_Guides_Bool_Exp>>;
  _not?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
  _or?: InputMaybe<Array<Guide_Related_Guides_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from_guide_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  to_guide_unique_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "guide_related_guides" */
export enum Guide_Related_Guides_Constraint {
  /** unique or primary key constraint */
  GuideRelatedGuidesPkey = 'guide_related_guides_pkey',
  /** unique or primary key constraint */
  GuideRelatedGuidesUnique = 'guide_related_guides_unique'
}

/** input type for inserting data into table "guide_related_guides" */
export type Guide_Related_Guides_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_guide_id?: InputMaybe<Scalars['uuid']>;
  guide?: InputMaybe<Guides_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  parent_guide?: InputMaybe<Guides_Obj_Rel_Insert_Input>;
  to_guide_unique_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "guide_related_guides" */
export type Guide_Related_Guides_Mutation_Response = {
  __typename?: 'guide_related_guides_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Guide_Related_Guides>;
};

/** on_conflict condition type for table "guide_related_guides" */
export type Guide_Related_Guides_On_Conflict = {
  constraint: Guide_Related_Guides_Constraint;
  update_columns?: Array<Guide_Related_Guides_Update_Column>;
  where?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
};

/** Ordering options when selecting data from "guide_related_guides". */
export type Guide_Related_Guides_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to_guide_unique_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: guide_related_guides */
export type Guide_Related_Guides_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "guide_related_guides" */
export enum Guide_Related_Guides_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromGuideId = 'from_guide_id',
  /** column name */
  Id = 'id',
  /** column name */
  ToGuideUniqueId = 'to_guide_unique_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "guide_related_guides" */
export type Guide_Related_Guides_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_guide_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  to_guide_unique_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "guide_related_guides" */
export enum Guide_Related_Guides_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromGuideId = 'from_guide_id',
  /** column name */
  Id = 'id',
  /** column name */
  ToGuideUniqueId = 'to_guide_unique_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "guide_vulnerabilities" */
export type Guide_Vulnerabilities = {
  __typename?: 'guide_vulnerabilities';
  created_at: Scalars['timestamptz'];
  guide_id: Scalars['uuid'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vulnerability: Vulnerabilities;
  vulnerability_id: Scalars['uuid'];
};

/** order by aggregate values of table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guide_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Guide_Vulnerabilities_Min_Order_By>;
};

/** input type for inserting array relation for remote table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Arr_Rel_Insert_Input = {
  data: Array<Guide_Vulnerabilities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Guide_Vulnerabilities_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guide_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Guide_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Guide_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Guide_Vulnerabilities_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  guide_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerabilities_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "guide_vulnerabilities" */
export enum Guide_Vulnerabilities_Constraint {
  /** unique or primary key constraint */
  GuideVulnerabilitiesPkey = 'guide_vulnerabilities_pkey',
  /** unique or primary key constraint */
  GuideVulnerabilitiesUnique = 'guide_vulnerabilities_unique'
}

/** input type for inserting data into table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  guide?: InputMaybe<Guides_Obj_Rel_Insert_Input>;
  guide_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vulnerability?: InputMaybe<Vulnerabilities_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Mutation_Response = {
  __typename?: 'guide_vulnerabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Guide_Vulnerabilities>;
};

/** on_conflict condition type for table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_On_Conflict = {
  constraint: Guide_Vulnerabilities_Constraint;
  update_columns?: Array<Guide_Vulnerabilities_Update_Column>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
};

/** Ordering options when selecting data from "guide_vulnerabilities". */
export type Guide_Vulnerabilities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerabilities_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: guide_vulnerabilities */
export type Guide_Vulnerabilities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "guide_vulnerabilities" */
export enum Guide_Vulnerabilities_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GuideId = 'guide_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  guide_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "guide_vulnerabilities" */
export enum Guide_Vulnerabilities_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GuideId = 'guide_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Guides_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "guides". All fields are combined with a logical 'AND'. */
export type Guides_Bool_Exp = {
  _and?: InputMaybe<Array<Guides_Bool_Exp>>;
  _not?: InputMaybe<Guides_Bool_Exp>;
  _or?: InputMaybe<Array<Guides_Bool_Exp>>;
};

/** unique or primary key constraints on table "guides" */
export enum Guides_Constraint {
  /** unique or primary key constraint */
  GuidesDataSourceLinkKey = 'guides_data_source_link_key',
  /** unique or primary key constraint */
  GuidesGuideUniqueIdKey = 'guides_guide_unique_id_key',
  /** unique or primary key constraint */
  GuidesPkey = 'guides_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Guides_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Guides_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Guides_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "guides" */
export type Guides_Inc_Input = {
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "guides" */
export type Guides_Insert_Input = {
  body?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data_source_link?: InputMaybe<Scalars['String']>;
  guide_unique_id?: InputMaybe<Scalars['String']>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
  related_guides?: InputMaybe<Guide_Related_Guides_Arr_Rel_Insert_Input>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  summary?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['_text']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "guides" */
export type Guides_Mutation_Response = {
  __typename?: 'guides_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
};

/** input type for inserting object relation for remote table "guides" */
export type Guides_Obj_Rel_Insert_Input = {
  data: Guides_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Guides_On_Conflict>;
};

/** on_conflict condition type for table "guides" */
export type Guides_On_Conflict = {
  constraint: Guides_Constraint;
  update_columns?: Array<Guides_Update_Column>;
  where?: InputMaybe<Guides_Bool_Exp>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Guides_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for updating data in table "guides" */
export type Guides_Set_Input = {
  body?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data_source_link?: InputMaybe<Scalars['String']>;
  guide_unique_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  metadata_schema_version?: InputMaybe<Scalars['Int']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  summary?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['_text']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "guides" */
export enum Guides_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DataSourceLink = 'data_source_link',
  /** column name */
  GuideUniqueId = 'guide_unique_id',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataSchemaVersion = 'metadata_schema_version',
  /** column name */
  Severity = 'severity',
  /** column name */
  Summary = 'summary',
  /** column name */
  Tags = 'tags',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

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

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
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

/** columns and relationships of "latest_builds" */
export type Latest_Builds = {
  __typename?: 'latest_builds';
  agent_access_token?: Maybe<Scalars['uuid']>;
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  source_type?: Maybe<Scalars['builds_source_type']>;
};

/** Boolean expression to filter rows from the table "latest_builds". All fields are combined with a logical 'AND'. */
export type Latest_Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Latest_Builds_Bool_Exp>>;
  _not?: InputMaybe<Latest_Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Latest_Builds_Bool_Exp>>;
  agent_access_token?: InputMaybe<Uuid_Comparison_Exp>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_review_id?: InputMaybe<String_Comparison_Exp>;
  git_branch?: InputMaybe<String_Comparison_Exp>;
  git_hash?: InputMaybe<String_Comparison_Exp>;
  git_remote?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  pull_request_id?: InputMaybe<String_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  source_type?: InputMaybe<Builds_Source_Type_Comparison_Exp>;
};

/** Ordering options when selecting data from "latest_builds". */
export type Latest_Builds_Order_By = {
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
  source_type?: InputMaybe<Order_By>;
};

/** select columns of table "latest_builds" */
export enum Latest_Builds_Select_Column {
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

/** Boolean expression to compare columns of type "license_source". All fields are combined with logical 'AND'. */
export type License_Source_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['license_source']>;
  _gt?: InputMaybe<Scalars['license_source']>;
  _gte?: InputMaybe<Scalars['license_source']>;
  _in?: InputMaybe<Array<Scalars['license_source']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['license_source']>;
  _lte?: InputMaybe<Scalars['license_source']>;
  _neq?: InputMaybe<Scalars['license_source']>;
  _nin?: InputMaybe<Array<Scalars['license_source']>>;
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
  /** delete data from the table: "guide_related_guides" */
  delete_guide_related_guides?: Maybe<Guide_Related_Guides_Mutation_Response>;
  /** delete single row from the table: "guide_related_guides" */
  delete_guide_related_guides_by_pk?: Maybe<Guide_Related_Guides>;
  /** delete data from the table: "manifests" */
  delete_manifests?: Maybe<Manifests_Mutation_Response>;
  /** delete single row from the table: "manifests" */
  delete_manifests_by_pk?: Maybe<Manifests>;
  /** insert data into the table: "builds" */
  insert_builds?: Maybe<Builds_Mutation_Response>;
  /** insert a single row into the table: "builds" */
  insert_builds_one?: Maybe<Builds>;
  /** insert data into the table: "default_branch_builds" */
  insert_default_branch_builds?: Maybe<Default_Branch_Builds_Mutation_Response>;
  /** insert a single row into the table: "default_branch_builds" */
  insert_default_branch_builds_one?: Maybe<Default_Branch_Builds>;
  /** insert data into the table: "findings" */
  insert_findings?: Maybe<Findings_Mutation_Response>;
  /** insert a single row into the table: "findings" */
  insert_findings_one?: Maybe<Findings>;
  /** insert data into the table: "github_repositories" */
  insert_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** insert a single row into the table: "github_repositories" */
  insert_github_repositories_one?: Maybe<Github_Repositories>;
  /** insert data into the table: "guide_related_guides" */
  insert_guide_related_guides?: Maybe<Guide_Related_Guides_Mutation_Response>;
  /** insert a single row into the table: "guide_related_guides" */
  insert_guide_related_guides_one?: Maybe<Guide_Related_Guides>;
  /** insert data into the table: "guide_vulnerabilities" */
  insert_guide_vulnerabilities?: Maybe<Guide_Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "guide_vulnerabilities" */
  insert_guide_vulnerabilities_one?: Maybe<Guide_Vulnerabilities>;
  /** insert data into the table: "guides" */
  insert_guides?: Maybe<Guides_Mutation_Response>;
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
  /** insert data into the table: "package.package" */
  insert_package?: Maybe<Package_Mutation_Response>;
  /** insert data into the table: "package.license" */
  insert_package_license?: Maybe<Package_License_Mutation_Response>;
  /** insert a single row into the table: "package.license" */
  insert_package_license_one?: Maybe<Package_License>;
  /** insert data into the table: "package.maintainer" */
  insert_package_maintainer?: Maybe<Package_Maintainer_Mutation_Response>;
  /** insert a single row into the table: "package.maintainer" */
  insert_package_maintainer_one?: Maybe<Package_Maintainer>;
  /** insert a single row into the table: "package.package" */
  insert_package_one?: Maybe<Package>;
  /** insert data into the table: "package.package_maintainer" */
  insert_package_package_maintainer?: Maybe<Package_Package_Maintainer_Mutation_Response>;
  /** insert a single row into the table: "package.package_maintainer" */
  insert_package_package_maintainer_one?: Maybe<Package_Package_Maintainer>;
  /** insert data into the table: "package.release" */
  insert_package_release?: Maybe<Package_Release_Mutation_Response>;
  /** insert data into the table: "package.release_dependency" */
  insert_package_release_dependency?: Maybe<Package_Release_Dependency_Mutation_Response>;
  /** insert a single row into the table: "package.release_dependency" */
  insert_package_release_dependency_one?: Maybe<Package_Release_Dependency>;
  /** insert data into the table: "package.release_license" */
  insert_package_release_license?: Maybe<Package_Release_License_Mutation_Response>;
  /** insert a single row into the table: "package.release_license" */
  insert_package_release_license_one?: Maybe<Package_Release_License>;
  /** insert a single row into the table: "package.release" */
  insert_package_release_one?: Maybe<Package_Release>;
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
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "vulnerabilities" */
  insert_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "vulnerabilities" */
  insert_vulnerabilities_one?: Maybe<Vulnerabilities>;
  /** insert data into the table: "vulnerability.vulnerability" */
  insert_vulnerability?: Maybe<Vulnerability_Mutation_Response>;
  /** insert data into the table: "vulnerability.affected" */
  insert_vulnerability_affected?: Maybe<Vulnerability_Affected_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.affected" */
  insert_vulnerability_affected_one?: Maybe<Vulnerability_Affected>;
  /** insert data into the table: "vulnerability.affected_range_event" */
  insert_vulnerability_affected_range_event?: Maybe<Vulnerability_Affected_Range_Event_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.affected_range_event" */
  insert_vulnerability_affected_range_event_one?: Maybe<Vulnerability_Affected_Range_Event>;
  /** insert data into the table: "vulnerability.affected_version" */
  insert_vulnerability_affected_version?: Maybe<Vulnerability_Affected_Version_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.affected_version" */
  insert_vulnerability_affected_version_one?: Maybe<Vulnerability_Affected_Version>;
  /** insert data into the table: "vulnerability.credit" */
  insert_vulnerability_credit?: Maybe<Vulnerability_Credit_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.credit" */
  insert_vulnerability_credit_one?: Maybe<Vulnerability_Credit>;
  /** insert data into the table: "vulnerability.equivalent" */
  insert_vulnerability_equivalent?: Maybe<Vulnerability_Equivalent_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.equivalent" */
  insert_vulnerability_equivalent_one?: Maybe<Vulnerability_Equivalent>;
  /** insert a single row into the table: "vulnerability.vulnerability" */
  insert_vulnerability_one?: Maybe<Vulnerability>;
  /** insert data into the table: "vulnerability_packages" */
  insert_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** insert a single row into the table: "vulnerability_packages" */
  insert_vulnerability_packages_one?: Maybe<Vulnerability_Packages>;
  /** insert data into the table: "vulnerability.reference" */
  insert_vulnerability_reference?: Maybe<Vulnerability_Reference_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.reference" */
  insert_vulnerability_reference_one?: Maybe<Vulnerability_Reference>;
  /** insert data into the table: "vulnerability.severity" */
  insert_vulnerability_severity?: Maybe<Vulnerability_Severity_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.severity" */
  insert_vulnerability_severity_one?: Maybe<Vulnerability_Severity>;
  /** insert data into the table: "webhook_cache" */
  insert_webhook_cache?: Maybe<Webhook_Cache_Mutation_Response>;
  /** insert a single row into the table: "webhook_cache" */
  insert_webhook_cache_one?: Maybe<Webhook_Cache>;
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
  /** update data of the table: "builds" */
  update_builds?: Maybe<Builds_Mutation_Response>;
  /** update single row of the table: "builds" */
  update_builds_by_pk?: Maybe<Builds>;
  /** update data of the table: "default_branch_builds" */
  update_default_branch_builds?: Maybe<Default_Branch_Builds_Mutation_Response>;
  /** update data of the table: "findings" */
  update_findings?: Maybe<Findings_Mutation_Response>;
  /** update single row of the table: "findings" */
  update_findings_by_pk?: Maybe<Findings>;
  /** update data of the table: "github_repositories" */
  update_github_repositories?: Maybe<Github_Repositories_Mutation_Response>;
  /** update single row of the table: "github_repositories" */
  update_github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** update data of the table: "guide_related_guides" */
  update_guide_related_guides?: Maybe<Guide_Related_Guides_Mutation_Response>;
  /** update single row of the table: "guide_related_guides" */
  update_guide_related_guides_by_pk?: Maybe<Guide_Related_Guides>;
  /** update data of the table: "guide_vulnerabilities" */
  update_guide_vulnerabilities?: Maybe<Guide_Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "guide_vulnerabilities" */
  update_guide_vulnerabilities_by_pk?: Maybe<Guide_Vulnerabilities>;
  /** update data of the table: "guides" */
  update_guides?: Maybe<Guides_Mutation_Response>;
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
  /** update data of the table: "package.package" */
  update_package?: Maybe<Package_Mutation_Response>;
  /** update single row of the table: "package.package" */
  update_package_by_pk?: Maybe<Package>;
  /** update data of the table: "package.license" */
  update_package_license?: Maybe<Package_License_Mutation_Response>;
  /** update single row of the table: "package.license" */
  update_package_license_by_pk?: Maybe<Package_License>;
  /** update data of the table: "package.maintainer" */
  update_package_maintainer?: Maybe<Package_Maintainer_Mutation_Response>;
  /** update single row of the table: "package.maintainer" */
  update_package_maintainer_by_pk?: Maybe<Package_Maintainer>;
  /** update data of the table: "package.package_maintainer" */
  update_package_package_maintainer?: Maybe<Package_Package_Maintainer_Mutation_Response>;
  /** update data of the table: "package.release" */
  update_package_release?: Maybe<Package_Release_Mutation_Response>;
  /** update single row of the table: "package.release" */
  update_package_release_by_pk?: Maybe<Package_Release>;
  /** update data of the table: "package.release_dependency" */
  update_package_release_dependency?: Maybe<Package_Release_Dependency_Mutation_Response>;
  /** update single row of the table: "package.release_dependency" */
  update_package_release_dependency_by_pk?: Maybe<Package_Release_Dependency>;
  /** update data of the table: "package.release_license" */
  update_package_release_license?: Maybe<Package_Release_License_Mutation_Response>;
  /** update single row of the table: "package.release_license" */
  update_package_release_license_by_pk?: Maybe<Package_Release_License>;
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
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "vulnerabilities" */
  update_vulnerabilities?: Maybe<Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "vulnerabilities" */
  update_vulnerabilities_by_pk?: Maybe<Vulnerabilities>;
  /** update data of the table: "vulnerability.vulnerability" */
  update_vulnerability?: Maybe<Vulnerability_Mutation_Response>;
  /** update data of the table: "vulnerability.affected" */
  update_vulnerability_affected?: Maybe<Vulnerability_Affected_Mutation_Response>;
  /** update single row of the table: "vulnerability.affected" */
  update_vulnerability_affected_by_pk?: Maybe<Vulnerability_Affected>;
  /** update data of the table: "vulnerability.affected_range_event" */
  update_vulnerability_affected_range_event?: Maybe<Vulnerability_Affected_Range_Event_Mutation_Response>;
  /** update single row of the table: "vulnerability.affected_range_event" */
  update_vulnerability_affected_range_event_by_pk?: Maybe<Vulnerability_Affected_Range_Event>;
  /** update data of the table: "vulnerability.affected_version" */
  update_vulnerability_affected_version?: Maybe<Vulnerability_Affected_Version_Mutation_Response>;
  /** update single row of the table: "vulnerability.affected_version" */
  update_vulnerability_affected_version_by_pk?: Maybe<Vulnerability_Affected_Version>;
  /** update single row of the table: "vulnerability.vulnerability" */
  update_vulnerability_by_pk?: Maybe<Vulnerability>;
  /** update data of the table: "vulnerability.credit" */
  update_vulnerability_credit?: Maybe<Vulnerability_Credit_Mutation_Response>;
  /** update single row of the table: "vulnerability.credit" */
  update_vulnerability_credit_by_pk?: Maybe<Vulnerability_Credit>;
  /** update data of the table: "vulnerability.equivalent" */
  update_vulnerability_equivalent?: Maybe<Vulnerability_Equivalent_Mutation_Response>;
  /** update data of the table: "vulnerability_packages" */
  update_vulnerability_packages?: Maybe<Vulnerability_Packages_Mutation_Response>;
  /** update single row of the table: "vulnerability_packages" */
  update_vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** update data of the table: "vulnerability.reference" */
  update_vulnerability_reference?: Maybe<Vulnerability_Reference_Mutation_Response>;
  /** update single row of the table: "vulnerability.reference" */
  update_vulnerability_reference_by_pk?: Maybe<Vulnerability_Reference>;
  /** update data of the table: "vulnerability.severity" */
  update_vulnerability_severity?: Maybe<Vulnerability_Severity_Mutation_Response>;
  /** update single row of the table: "vulnerability.severity" */
  update_vulnerability_severity_by_pk?: Maybe<Vulnerability_Severity>;
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
export type Mutation_RootDelete_Guide_Related_GuidesArgs = {
  where: Guide_Related_Guides_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Guide_Related_Guides_By_PkArgs = {
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
export type Mutation_RootInsert_Default_Branch_BuildsArgs = {
  objects: Array<Default_Branch_Builds_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Default_Branch_Builds_OneArgs = {
  object: Default_Branch_Builds_Insert_Input;
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
export type Mutation_RootInsert_Guide_Related_GuidesArgs = {
  objects: Array<Guide_Related_Guides_Insert_Input>;
  on_conflict?: InputMaybe<Guide_Related_Guides_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Guide_Related_Guides_OneArgs = {
  object: Guide_Related_Guides_Insert_Input;
  on_conflict?: InputMaybe<Guide_Related_Guides_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Guide_VulnerabilitiesArgs = {
  objects: Array<Guide_Vulnerabilities_Insert_Input>;
  on_conflict?: InputMaybe<Guide_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Guide_Vulnerabilities_OneArgs = {
  object: Guide_Vulnerabilities_Insert_Input;
  on_conflict?: InputMaybe<Guide_Vulnerabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuidesArgs = {
  objects: Array<Guides_Insert_Input>;
  on_conflict?: InputMaybe<Guides_On_Conflict>;
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
export type Mutation_RootInsert_PackageArgs = {
  objects: Array<Package_Insert_Input>;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_LicenseArgs = {
  objects: Array<Package_License_Insert_Input>;
  on_conflict?: InputMaybe<Package_License_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_License_OneArgs = {
  object: Package_License_Insert_Input;
  on_conflict?: InputMaybe<Package_License_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_MaintainerArgs = {
  objects: Array<Package_Maintainer_Insert_Input>;
  on_conflict?: InputMaybe<Package_Maintainer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Maintainer_OneArgs = {
  object: Package_Maintainer_Insert_Input;
  on_conflict?: InputMaybe<Package_Maintainer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_OneArgs = {
  object: Package_Insert_Input;
  on_conflict?: InputMaybe<Package_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Package_MaintainerArgs = {
  objects: Array<Package_Package_Maintainer_Insert_Input>;
  on_conflict?: InputMaybe<Package_Package_Maintainer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Package_Maintainer_OneArgs = {
  object: Package_Package_Maintainer_Insert_Input;
  on_conflict?: InputMaybe<Package_Package_Maintainer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_ReleaseArgs = {
  objects: Array<Package_Release_Insert_Input>;
  on_conflict?: InputMaybe<Package_Release_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Release_DependencyArgs = {
  objects: Array<Package_Release_Dependency_Insert_Input>;
  on_conflict?: InputMaybe<Package_Release_Dependency_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Release_Dependency_OneArgs = {
  object: Package_Release_Dependency_Insert_Input;
  on_conflict?: InputMaybe<Package_Release_Dependency_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Release_LicenseArgs = {
  objects: Array<Package_Release_License_Insert_Input>;
  on_conflict?: InputMaybe<Package_Release_License_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Release_License_OneArgs = {
  object: Package_Release_License_Insert_Input;
  on_conflict?: InputMaybe<Package_Release_License_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Package_Release_OneArgs = {
  object: Package_Release_Insert_Input;
  on_conflict?: InputMaybe<Package_Release_On_Conflict>;
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
export type Mutation_RootInsert_VulnerabilityArgs = {
  objects: Array<Vulnerability_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_AffectedArgs = {
  objects: Array<Vulnerability_Affected_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Affected_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Affected_OneArgs = {
  object: Vulnerability_Affected_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Affected_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Affected_Range_EventArgs = {
  objects: Array<Vulnerability_Affected_Range_Event_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Affected_Range_Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Affected_Range_Event_OneArgs = {
  object: Vulnerability_Affected_Range_Event_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Affected_Range_Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Affected_VersionArgs = {
  objects: Array<Vulnerability_Affected_Version_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Affected_Version_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Affected_Version_OneArgs = {
  object: Vulnerability_Affected_Version_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Affected_Version_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_CreditArgs = {
  objects: Array<Vulnerability_Credit_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Credit_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Credit_OneArgs = {
  object: Vulnerability_Credit_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Credit_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_EquivalentArgs = {
  objects: Array<Vulnerability_Equivalent_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Equivalent_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Equivalent_OneArgs = {
  object: Vulnerability_Equivalent_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Equivalent_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_OneArgs = {
  object: Vulnerability_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_On_Conflict>;
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
export type Mutation_RootInsert_Vulnerability_ReferenceArgs = {
  objects: Array<Vulnerability_Reference_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Reference_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Reference_OneArgs = {
  object: Vulnerability_Reference_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Reference_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_SeverityArgs = {
  objects: Array<Vulnerability_Severity_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Severity_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Severity_OneArgs = {
  object: Vulnerability_Severity_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Severity_On_Conflict>;
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
export type Mutation_RootPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
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
export type Mutation_RootUpdate_Default_Branch_BuildsArgs = {
  _inc?: InputMaybe<Default_Branch_Builds_Inc_Input>;
  _set?: InputMaybe<Default_Branch_Builds_Set_Input>;
  where: Default_Branch_Builds_Bool_Exp;
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
export type Mutation_RootUpdate_Guide_Related_GuidesArgs = {
  _set?: InputMaybe<Guide_Related_Guides_Set_Input>;
  where: Guide_Related_Guides_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Guide_Related_Guides_By_PkArgs = {
  _set?: InputMaybe<Guide_Related_Guides_Set_Input>;
  pk_columns: Guide_Related_Guides_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Guide_VulnerabilitiesArgs = {
  _set?: InputMaybe<Guide_Vulnerabilities_Set_Input>;
  where: Guide_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Guide_Vulnerabilities_By_PkArgs = {
  _set?: InputMaybe<Guide_Vulnerabilities_Set_Input>;
  pk_columns: Guide_Vulnerabilities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GuidesArgs = {
  _append?: InputMaybe<Guides_Append_Input>;
  _delete_at_path?: InputMaybe<Guides_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Guides_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Guides_Delete_Key_Input>;
  _inc?: InputMaybe<Guides_Inc_Input>;
  _prepend?: InputMaybe<Guides_Prepend_Input>;
  _set?: InputMaybe<Guides_Set_Input>;
  where: Guides_Bool_Exp;
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
export type Mutation_RootUpdate_PackageArgs = {
  _append?: InputMaybe<Package_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Prepend_Input>;
  _set?: InputMaybe<Package_Set_Input>;
  where: Package_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_By_PkArgs = {
  _append?: InputMaybe<Package_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Prepend_Input>;
  _set?: InputMaybe<Package_Set_Input>;
  pk_columns: Package_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_LicenseArgs = {
  _set?: InputMaybe<Package_License_Set_Input>;
  where: Package_License_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_License_By_PkArgs = {
  _set?: InputMaybe<Package_License_Set_Input>;
  pk_columns: Package_License_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_MaintainerArgs = {
  _set?: InputMaybe<Package_Maintainer_Set_Input>;
  where: Package_Maintainer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Maintainer_By_PkArgs = {
  _set?: InputMaybe<Package_Maintainer_Set_Input>;
  pk_columns: Package_Maintainer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Package_MaintainerArgs = {
  _set?: InputMaybe<Package_Package_Maintainer_Set_Input>;
  where: Package_Package_Maintainer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_ReleaseArgs = {
  _append?: InputMaybe<Package_Release_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Release_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Release_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Release_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Release_Prepend_Input>;
  _set?: InputMaybe<Package_Release_Set_Input>;
  where: Package_Release_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Release_By_PkArgs = {
  _append?: InputMaybe<Package_Release_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Release_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Release_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Release_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Release_Prepend_Input>;
  _set?: InputMaybe<Package_Release_Set_Input>;
  pk_columns: Package_Release_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Release_DependencyArgs = {
  _set?: InputMaybe<Package_Release_Dependency_Set_Input>;
  where: Package_Release_Dependency_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Release_Dependency_By_PkArgs = {
  _set?: InputMaybe<Package_Release_Dependency_Set_Input>;
  pk_columns: Package_Release_Dependency_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Release_LicenseArgs = {
  _append?: InputMaybe<Package_Release_License_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Release_License_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Release_License_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Release_License_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Release_License_Prepend_Input>;
  _set?: InputMaybe<Package_Release_License_Set_Input>;
  where: Package_Release_License_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Package_Release_License_By_PkArgs = {
  _append?: InputMaybe<Package_Release_License_Append_Input>;
  _delete_at_path?: InputMaybe<Package_Release_License_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Package_Release_License_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Package_Release_License_Delete_Key_Input>;
  _prepend?: InputMaybe<Package_Release_License_Prepend_Input>;
  _set?: InputMaybe<Package_Release_License_Set_Input>;
  pk_columns: Package_Release_License_Pk_Columns_Input;
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
export type Mutation_RootUpdate_VulnerabilityArgs = {
  _append?: InputMaybe<Vulnerability_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Set_Input>;
  where: Vulnerability_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_AffectedArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Set_Input>;
  where: Vulnerability_Affected_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Affected_By_PkArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Set_Input>;
  pk_columns: Vulnerability_Affected_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Affected_Range_EventArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Range_Event_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Range_Event_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Range_Event_Set_Input>;
  where: Vulnerability_Affected_Range_Event_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Affected_Range_Event_By_PkArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Range_Event_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Range_Event_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Range_Event_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Range_Event_Set_Input>;
  pk_columns: Vulnerability_Affected_Range_Event_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Affected_VersionArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Version_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Version_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Version_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Version_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Version_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Version_Set_Input>;
  where: Vulnerability_Affected_Version_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Affected_Version_By_PkArgs = {
  _append?: InputMaybe<Vulnerability_Affected_Version_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Affected_Version_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Affected_Version_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Affected_Version_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Affected_Version_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Affected_Version_Set_Input>;
  pk_columns: Vulnerability_Affected_Version_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_By_PkArgs = {
  _append?: InputMaybe<Vulnerability_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Delete_Key_Input>;
  _prepend?: InputMaybe<Vulnerability_Prepend_Input>;
  _set?: InputMaybe<Vulnerability_Set_Input>;
  pk_columns: Vulnerability_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_CreditArgs = {
  _set?: InputMaybe<Vulnerability_Credit_Set_Input>;
  where: Vulnerability_Credit_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Credit_By_PkArgs = {
  _set?: InputMaybe<Vulnerability_Credit_Set_Input>;
  pk_columns: Vulnerability_Credit_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_EquivalentArgs = {
  _set?: InputMaybe<Vulnerability_Equivalent_Set_Input>;
  where: Vulnerability_Equivalent_Bool_Exp;
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
export type Mutation_RootUpdate_Vulnerability_ReferenceArgs = {
  _set?: InputMaybe<Vulnerability_Reference_Set_Input>;
  where: Vulnerability_Reference_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Reference_By_PkArgs = {
  _set?: InputMaybe<Vulnerability_Reference_Set_Input>;
  pk_columns: Vulnerability_Reference_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_SeverityArgs = {
  _set?: InputMaybe<Vulnerability_Severity_Set_Input>;
  where: Vulnerability_Severity_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Severity_By_PkArgs = {
  _set?: InputMaybe<Vulnerability_Severity_Set_Input>;
  pk_columns: Vulnerability_Severity_Pk_Columns_Input;
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

/** join table */
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
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** An object relationship */
  settings: Settings;
  settings_id: Scalars['uuid'];
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
  creator?: InputMaybe<Users_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  github_id?: InputMaybe<Int_Comparison_Exp>;
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  installation_id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
  projects?: InputMaybe<Projects_Bool_Exp>;
  settings?: InputMaybe<Settings_Bool_Exp>;
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
  settings?: InputMaybe<Settings_Order_By>;
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

/** columns and relationships of "package.package" */
export type Package = {
  __typename?: 'package';
  custom_registry: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  package_maintainers: Array<Package_Package_Maintainer>;
  package_manager: Scalars['package_manager'];
  /** An array relationship */
  releases: Array<Package_Release>;
  upstream_data?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  vulnerabilities: Array<Vulnerability_Affected>;
};


/** columns and relationships of "package.package" */
export type PackagePackage_MaintainersArgs = {
  distinct_on?: InputMaybe<Array<Package_Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
};


/** columns and relationships of "package.package" */
export type PackageReleasesArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


/** columns and relationships of "package.package" */
export type PackageUpstream_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "package.package" */
export type PackageVulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Package_Append_Input = {
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "package.package". All fields are combined with a logical 'AND'. */
export type Package_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Bool_Exp>>;
  _not?: InputMaybe<Package_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Bool_Exp>>;
  custom_registry?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  fetched_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
  package_manager?: InputMaybe<Package_Manager_Comparison_Exp>;
  releases?: InputMaybe<Package_Release_Bool_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
  vulnerabilities?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};

/** unique or primary key constraints on table "package.package" */
export enum Package_Constraint {
  /** unique or primary key constraint */
  PackagePackageManagerCustomRegistryNameIdx = 'package_package_manager_custom_registry_name_idx',
  /** unique or primary key constraint */
  PackagePkey = 'package_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Package_Delete_At_Path_Input = {
  upstream_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Package_Delete_Elem_Input = {
  upstream_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Package_Delete_Key_Input = {
  upstream_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "package.package" */
export type Package_Insert_Input = {
  custom_registry?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  fetched_time?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Arr_Rel_Insert_Input>;
  package_manager?: InputMaybe<Scalars['package_manager']>;
  releases?: InputMaybe<Package_Release_Arr_Rel_Insert_Input>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
  vulnerabilities?: InputMaybe<Vulnerability_Affected_Arr_Rel_Insert_Input>;
};

/** columns and relationships of "package.license" */
export type Package_License = {
  __typename?: 'package_license';
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  release_licenses: Array<Package_Release_License>;
};


/** columns and relationships of "package.license" */
export type Package_LicenseRelease_LicensesArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_License_Order_By>>;
  where?: InputMaybe<Package_Release_License_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "package.license". All fields are combined with a logical 'AND'. */
export type Package_License_Bool_Exp = {
  _and?: InputMaybe<Array<Package_License_Bool_Exp>>;
  _not?: InputMaybe<Package_License_Bool_Exp>;
  _or?: InputMaybe<Array<Package_License_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  release_licenses?: InputMaybe<Package_Release_License_Bool_Exp>;
};

/** unique or primary key constraints on table "package.license" */
export enum Package_License_Constraint {
  /** unique or primary key constraint */
  LicenseNameIdx = 'license_name_idx',
  /** unique or primary key constraint */
  LicensePkey = 'license_pkey'
}

/** input type for inserting data into table "package.license" */
export type Package_License_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  release_licenses?: InputMaybe<Package_Release_License_Arr_Rel_Insert_Input>;
};

/** response of any mutation on the table "package.license" */
export type Package_License_Mutation_Response = {
  __typename?: 'package_license_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_License>;
};

/** input type for inserting object relation for remote table "package.license" */
export type Package_License_Obj_Rel_Insert_Input = {
  data: Package_License_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_License_On_Conflict>;
};

/** on_conflict condition type for table "package.license" */
export type Package_License_On_Conflict = {
  constraint: Package_License_Constraint;
  update_columns?: Array<Package_License_Update_Column>;
  where?: InputMaybe<Package_License_Bool_Exp>;
};

/** Ordering options when selecting data from "package.license". */
export type Package_License_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  release_licenses_aggregate?: InputMaybe<Package_Release_License_Aggregate_Order_By>;
};

/** primary key columns input for table: package_license */
export type Package_License_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "package.license" */
export enum Package_License_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "package.license" */
export type Package_License_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package.license" */
export enum Package_License_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "package.maintainer" */
export type Package_Maintainer = {
  __typename?: 'package_maintainer';
  email: Scalars['String'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  package_maintainers: Array<Package_Package_Maintainer>;
  package_manager?: Maybe<Scalars['package_manager']>;
  /** An array relationship */
  published_releases: Array<Package_Release>;
};


/** columns and relationships of "package.maintainer" */
export type Package_MaintainerPackage_MaintainersArgs = {
  distinct_on?: InputMaybe<Array<Package_Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
};


/** columns and relationships of "package.maintainer" */
export type Package_MaintainerPublished_ReleasesArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "package.maintainer". All fields are combined with a logical 'AND'. */
export type Package_Maintainer_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Maintainer_Bool_Exp>>;
  _not?: InputMaybe<Package_Maintainer_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Maintainer_Bool_Exp>>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
  package_manager?: InputMaybe<Package_Manager_Comparison_Exp>;
  published_releases?: InputMaybe<Package_Release_Bool_Exp>;
};

/** unique or primary key constraints on table "package.maintainer" */
export enum Package_Maintainer_Constraint {
  /** unique or primary key constraint */
  MaintainerPackageManagerEmailIdx = 'maintainer_package_manager_email_idx',
  /** unique or primary key constraint */
  MaintainerPkey = 'maintainer_pkey'
}

/** input type for inserting data into table "package.maintainer" */
export type Package_Maintainer_Insert_Input = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Arr_Rel_Insert_Input>;
  package_manager?: InputMaybe<Scalars['package_manager']>;
  published_releases?: InputMaybe<Package_Release_Arr_Rel_Insert_Input>;
};

/** response of any mutation on the table "package.maintainer" */
export type Package_Maintainer_Mutation_Response = {
  __typename?: 'package_maintainer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Maintainer>;
};

/** input type for inserting object relation for remote table "package.maintainer" */
export type Package_Maintainer_Obj_Rel_Insert_Input = {
  data: Package_Maintainer_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Maintainer_On_Conflict>;
};

/** on_conflict condition type for table "package.maintainer" */
export type Package_Maintainer_On_Conflict = {
  constraint: Package_Maintainer_Constraint;
  update_columns?: Array<Package_Maintainer_Update_Column>;
  where?: InputMaybe<Package_Maintainer_Bool_Exp>;
};

/** Ordering options when selecting data from "package.maintainer". */
export type Package_Maintainer_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  package_maintainers_aggregate?: InputMaybe<Package_Package_Maintainer_Aggregate_Order_By>;
  package_manager?: InputMaybe<Order_By>;
  published_releases_aggregate?: InputMaybe<Package_Release_Aggregate_Order_By>;
};

/** primary key columns input for table: package_maintainer */
export type Package_Maintainer_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "package.maintainer" */
export enum Package_Maintainer_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PackageManager = 'package_manager'
}

/** input type for updating data in table "package.maintainer" */
export type Package_Maintainer_Set_Input = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  package_manager?: InputMaybe<Scalars['package_manager']>;
};

/** update columns of table "package.maintainer" */
export enum Package_Maintainer_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PackageManager = 'package_manager'
}

/** Boolean expression to compare columns of type "package_manager". All fields are combined with logical 'AND'. */
export type Package_Manager_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['package_manager']>;
  _gt?: InputMaybe<Scalars['package_manager']>;
  _gte?: InputMaybe<Scalars['package_manager']>;
  _in?: InputMaybe<Array<Scalars['package_manager']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['package_manager']>;
  _lte?: InputMaybe<Scalars['package_manager']>;
  _neq?: InputMaybe<Scalars['package_manager']>;
  _nin?: InputMaybe<Array<Scalars['package_manager']>>;
};

/** response of any mutation on the table "package.package" */
export type Package_Mutation_Response = {
  __typename?: 'package_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package>;
};

/** input type for inserting object relation for remote table "package.package" */
export type Package_Obj_Rel_Insert_Input = {
  data: Package_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_On_Conflict>;
};

/** on_conflict condition type for table "package.package" */
export type Package_On_Conflict = {
  constraint: Package_Constraint;
  update_columns?: Array<Package_Update_Column>;
  where?: InputMaybe<Package_Bool_Exp>;
};

/** Ordering options when selecting data from "package.package". */
export type Package_Order_By = {
  custom_registry?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  package_maintainers_aggregate?: InputMaybe<Package_Package_Maintainer_Aggregate_Order_By>;
  package_manager?: InputMaybe<Order_By>;
  releases_aggregate?: InputMaybe<Package_Release_Aggregate_Order_By>;
  upstream_data?: InputMaybe<Order_By>;
  vulnerabilities_aggregate?: InputMaybe<Vulnerability_Affected_Aggregate_Order_By>;
};

/** columns and relationships of "package.package_maintainer" */
export type Package_Package_Maintainer = {
  __typename?: 'package_package_maintainer';
  /** An object relationship */
  maintainer?: Maybe<Package_Maintainer>;
  maintainer_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  package?: Maybe<Package>;
  package_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "package.package_maintainer" */
export type Package_Package_Maintainer_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Package_Maintainer_Max_Order_By>;
  min?: InputMaybe<Package_Package_Maintainer_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package.package_maintainer" */
export type Package_Package_Maintainer_Arr_Rel_Insert_Input = {
  data: Array<Package_Package_Maintainer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Package_Maintainer_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package.package_maintainer". All fields are combined with a logical 'AND'. */
export type Package_Package_Maintainer_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Package_Maintainer_Bool_Exp>>;
  _not?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Package_Maintainer_Bool_Exp>>;
  maintainer?: InputMaybe<Package_Maintainer_Bool_Exp>;
  maintainer_id?: InputMaybe<Uuid_Comparison_Exp>;
  package?: InputMaybe<Package_Bool_Exp>;
  package_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "package.package_maintainer" */
export enum Package_Package_Maintainer_Constraint {
  /** unique or primary key constraint */
  PackageMaintainerPackageIdMaintainerIdIdx = 'package_maintainer_package_id_maintainer_id_idx'
}

/** input type for inserting data into table "package.package_maintainer" */
export type Package_Package_Maintainer_Insert_Input = {
  maintainer?: InputMaybe<Package_Maintainer_Obj_Rel_Insert_Input>;
  maintainer_id?: InputMaybe<Scalars['uuid']>;
  package?: InputMaybe<Package_Obj_Rel_Insert_Input>;
  package_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "package.package_maintainer" */
export type Package_Package_Maintainer_Max_Order_By = {
  maintainer_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "package.package_maintainer" */
export type Package_Package_Maintainer_Min_Order_By = {
  maintainer_id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package.package_maintainer" */
export type Package_Package_Maintainer_Mutation_Response = {
  __typename?: 'package_package_maintainer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Package_Maintainer>;
};

/** on_conflict condition type for table "package.package_maintainer" */
export type Package_Package_Maintainer_On_Conflict = {
  constraint: Package_Package_Maintainer_Constraint;
  update_columns?: Array<Package_Package_Maintainer_Update_Column>;
  where?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
};

/** Ordering options when selecting data from "package.package_maintainer". */
export type Package_Package_Maintainer_Order_By = {
  maintainer?: InputMaybe<Package_Maintainer_Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
  package?: InputMaybe<Package_Order_By>;
  package_id?: InputMaybe<Order_By>;
};

/** select columns of table "package.package_maintainer" */
export enum Package_Package_Maintainer_Select_Column {
  /** column name */
  MaintainerId = 'maintainer_id',
  /** column name */
  PackageId = 'package_id'
}

/** input type for updating data in table "package.package_maintainer" */
export type Package_Package_Maintainer_Set_Input = {
  maintainer_id?: InputMaybe<Scalars['uuid']>;
  package_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "package.package_maintainer" */
export enum Package_Package_Maintainer_Update_Column {
  /** column name */
  MaintainerId = 'maintainer_id',
  /** column name */
  PackageId = 'package_id'
}

/** primary key columns input for table: package */
export type Package_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Package_Prepend_Input = {
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "package.release" */
export type Package_Release = {
  __typename?: 'package_release';
  blob_hash?: Maybe<Scalars['String']>;
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  mirrored_blob_url?: Maybe<Scalars['String']>;
  observed_time: Scalars['timestamptz'];
  /** An object relationship */
  package?: Maybe<Package>;
  package_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  publishing_maintainer?: Maybe<Package_Maintainer>;
  publishing_maintainer_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  release_dependencies: Array<Package_Release_Dependency>;
  /** An array relationship */
  release_dependents: Array<Package_Release_Dependency>;
  /** An array relationship */
  release_licenses: Array<Package_Release_License>;
  release_time?: Maybe<Scalars['timestamptz']>;
  upstream_blob_url?: Maybe<Scalars['String']>;
  upstream_data?: Maybe<Scalars['jsonb']>;
  version: Scalars['String'];
};


/** columns and relationships of "package.release" */
export type Package_ReleaseRelease_DependenciesArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Dependency_Order_By>>;
  where?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
};


/** columns and relationships of "package.release" */
export type Package_ReleaseRelease_DependentsArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Dependency_Order_By>>;
  where?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
};


/** columns and relationships of "package.release" */
export type Package_ReleaseRelease_LicensesArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_License_Order_By>>;
  where?: InputMaybe<Package_Release_License_Bool_Exp>;
};


/** columns and relationships of "package.release" */
export type Package_ReleaseUpstream_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "package.release" */
export type Package_Release_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Release_Max_Order_By>;
  min?: InputMaybe<Package_Release_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Package_Release_Append_Input = {
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "package.release" */
export type Package_Release_Arr_Rel_Insert_Input = {
  data: Array<Package_Release_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Release_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package.release". All fields are combined with a logical 'AND'. */
export type Package_Release_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Release_Bool_Exp>>;
  _not?: InputMaybe<Package_Release_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Release_Bool_Exp>>;
  blob_hash?: InputMaybe<String_Comparison_Exp>;
  fetched_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mirrored_blob_url?: InputMaybe<String_Comparison_Exp>;
  observed_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  package?: InputMaybe<Package_Bool_Exp>;
  package_id?: InputMaybe<Uuid_Comparison_Exp>;
  publishing_maintainer?: InputMaybe<Package_Maintainer_Bool_Exp>;
  publishing_maintainer_id?: InputMaybe<Uuid_Comparison_Exp>;
  release_dependencies?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
  release_dependents?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
  release_licenses?: InputMaybe<Package_Release_License_Bool_Exp>;
  release_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  upstream_blob_url?: InputMaybe<String_Comparison_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "package.release" */
export enum Package_Release_Constraint {
  /** unique or primary key constraint */
  ReleasePackageIdVersionIdx = 'release_package_id_version_idx',
  /** unique or primary key constraint */
  ReleasePkey = 'release_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Package_Release_Delete_At_Path_Input = {
  upstream_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Package_Release_Delete_Elem_Input = {
  upstream_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Package_Release_Delete_Key_Input = {
  upstream_data?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "package.release_dependency" */
export type Package_Release_Dependency = {
  __typename?: 'package_release_dependency';
  /** An object relationship */
  dependency_package?: Maybe<Package>;
  dependency_package_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  dependency_release?: Maybe<Package_Release>;
  dependency_release_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  package_name: Scalars['String'];
  package_version_query: Scalars['String'];
  /** An object relationship */
  release: Package_Release;
  release_id: Scalars['uuid'];
};

/** order by aggregate values of table "package.release_dependency" */
export type Package_Release_Dependency_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Release_Dependency_Max_Order_By>;
  min?: InputMaybe<Package_Release_Dependency_Min_Order_By>;
};

/** input type for inserting array relation for remote table "package.release_dependency" */
export type Package_Release_Dependency_Arr_Rel_Insert_Input = {
  data: Array<Package_Release_Dependency_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Release_Dependency_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package.release_dependency". All fields are combined with a logical 'AND'. */
export type Package_Release_Dependency_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Release_Dependency_Bool_Exp>>;
  _not?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Release_Dependency_Bool_Exp>>;
  dependency_package?: InputMaybe<Package_Bool_Exp>;
  dependency_package_id?: InputMaybe<Uuid_Comparison_Exp>;
  dependency_release?: InputMaybe<Package_Release_Bool_Exp>;
  dependency_release_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  package_name?: InputMaybe<String_Comparison_Exp>;
  package_version_query?: InputMaybe<String_Comparison_Exp>;
  release?: InputMaybe<Package_Release_Bool_Exp>;
  release_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "package.release_dependency" */
export enum Package_Release_Dependency_Constraint {
  /** unique or primary key constraint */
  ReleaseDependencyPkey = 'release_dependency_pkey',
  /** unique or primary key constraint */
  ReleaseDependencyReleaseIdPackageNamePackageVersionIdx = 'release_dependency_release_id_package_name_package_version__idx'
}

/** input type for inserting data into table "package.release_dependency" */
export type Package_Release_Dependency_Insert_Input = {
  dependency_package?: InputMaybe<Package_Obj_Rel_Insert_Input>;
  dependency_package_id?: InputMaybe<Scalars['uuid']>;
  dependency_release?: InputMaybe<Package_Release_Obj_Rel_Insert_Input>;
  dependency_release_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  package_name?: InputMaybe<Scalars['String']>;
  package_version_query?: InputMaybe<Scalars['String']>;
  release?: InputMaybe<Package_Release_Obj_Rel_Insert_Input>;
  release_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "package.release_dependency" */
export type Package_Release_Dependency_Max_Order_By = {
  dependency_package_id?: InputMaybe<Order_By>;
  dependency_release_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version_query?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "package.release_dependency" */
export type Package_Release_Dependency_Min_Order_By = {
  dependency_package_id?: InputMaybe<Order_By>;
  dependency_release_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version_query?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package.release_dependency" */
export type Package_Release_Dependency_Mutation_Response = {
  __typename?: 'package_release_dependency_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Release_Dependency>;
};

/** on_conflict condition type for table "package.release_dependency" */
export type Package_Release_Dependency_On_Conflict = {
  constraint: Package_Release_Dependency_Constraint;
  update_columns?: Array<Package_Release_Dependency_Update_Column>;
  where?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
};

/** Ordering options when selecting data from "package.release_dependency". */
export type Package_Release_Dependency_Order_By = {
  dependency_package?: InputMaybe<Package_Order_By>;
  dependency_package_id?: InputMaybe<Order_By>;
  dependency_release?: InputMaybe<Package_Release_Order_By>;
  dependency_release_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  package_version_query?: InputMaybe<Order_By>;
  release?: InputMaybe<Package_Release_Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: package_release_dependency */
export type Package_Release_Dependency_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "package.release_dependency" */
export enum Package_Release_Dependency_Select_Column {
  /** column name */
  DependencyPackageId = 'dependency_package_id',
  /** column name */
  DependencyReleaseId = 'dependency_release_id',
  /** column name */
  Id = 'id',
  /** column name */
  PackageName = 'package_name',
  /** column name */
  PackageVersionQuery = 'package_version_query',
  /** column name */
  ReleaseId = 'release_id'
}

/** input type for updating data in table "package.release_dependency" */
export type Package_Release_Dependency_Set_Input = {
  dependency_package_id?: InputMaybe<Scalars['uuid']>;
  dependency_release_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  package_name?: InputMaybe<Scalars['String']>;
  package_version_query?: InputMaybe<Scalars['String']>;
  release_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "package.release_dependency" */
export enum Package_Release_Dependency_Update_Column {
  /** column name */
  DependencyPackageId = 'dependency_package_id',
  /** column name */
  DependencyReleaseId = 'dependency_release_id',
  /** column name */
  Id = 'id',
  /** column name */
  PackageName = 'package_name',
  /** column name */
  PackageVersionQuery = 'package_version_query',
  /** column name */
  ReleaseId = 'release_id'
}

/** input type for inserting data into table "package.release" */
export type Package_Release_Insert_Input = {
  blob_hash?: InputMaybe<Scalars['String']>;
  fetched_time?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  mirrored_blob_url?: InputMaybe<Scalars['String']>;
  observed_time?: InputMaybe<Scalars['timestamptz']>;
  package?: InputMaybe<Package_Obj_Rel_Insert_Input>;
  package_id?: InputMaybe<Scalars['uuid']>;
  publishing_maintainer?: InputMaybe<Package_Maintainer_Obj_Rel_Insert_Input>;
  publishing_maintainer_id?: InputMaybe<Scalars['uuid']>;
  release_dependencies?: InputMaybe<Package_Release_Dependency_Arr_Rel_Insert_Input>;
  release_dependents?: InputMaybe<Package_Release_Dependency_Arr_Rel_Insert_Input>;
  release_licenses?: InputMaybe<Package_Release_License_Arr_Rel_Insert_Input>;
  release_time?: InputMaybe<Scalars['timestamptz']>;
  upstream_blob_url?: InputMaybe<Scalars['String']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
  version?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "package.release_license" */
export type Package_Release_License = {
  __typename?: 'package_release_license';
  id: Scalars['uuid'];
  /** An object relationship */
  license: Package_License;
  license_id: Scalars['uuid'];
  release_id: Scalars['uuid'];
  scan_metadata?: Maybe<Scalars['jsonb']>;
  scan_time: Scalars['timestamptz'];
  source: Scalars['license_source'];
};


/** columns and relationships of "package.release_license" */
export type Package_Release_LicenseScan_MetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "package.release_license" */
export type Package_Release_License_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Release_License_Max_Order_By>;
  min?: InputMaybe<Package_Release_License_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Package_Release_License_Append_Input = {
  scan_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "package.release_license" */
export type Package_Release_License_Arr_Rel_Insert_Input = {
  data: Array<Package_Release_License_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Release_License_On_Conflict>;
};

/** Boolean expression to filter rows from the table "package.release_license". All fields are combined with a logical 'AND'. */
export type Package_Release_License_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Release_License_Bool_Exp>>;
  _not?: InputMaybe<Package_Release_License_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Release_License_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  license?: InputMaybe<Package_License_Bool_Exp>;
  license_id?: InputMaybe<Uuid_Comparison_Exp>;
  release_id?: InputMaybe<Uuid_Comparison_Exp>;
  scan_metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  scan_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  source?: InputMaybe<License_Source_Comparison_Exp>;
};

/** unique or primary key constraints on table "package.release_license" */
export enum Package_Release_License_Constraint {
  /** unique or primary key constraint */
  ReleaseLicensePkey = 'release_license_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Package_Release_License_Delete_At_Path_Input = {
  scan_metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Package_Release_License_Delete_Elem_Input = {
  scan_metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Package_Release_License_Delete_Key_Input = {
  scan_metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "package.release_license" */
export type Package_Release_License_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  license?: InputMaybe<Package_License_Obj_Rel_Insert_Input>;
  license_id?: InputMaybe<Scalars['uuid']>;
  release_id?: InputMaybe<Scalars['uuid']>;
  scan_metadata?: InputMaybe<Scalars['jsonb']>;
  scan_time?: InputMaybe<Scalars['timestamptz']>;
  source?: InputMaybe<Scalars['license_source']>;
};

/** order by max() on columns of table "package.release_license" */
export type Package_Release_License_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  license_id?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
  scan_time?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "package.release_license" */
export type Package_Release_License_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  license_id?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
  scan_time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package.release_license" */
export type Package_Release_License_Mutation_Response = {
  __typename?: 'package_release_license_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Release_License>;
};

/** on_conflict condition type for table "package.release_license" */
export type Package_Release_License_On_Conflict = {
  constraint: Package_Release_License_Constraint;
  update_columns?: Array<Package_Release_License_Update_Column>;
  where?: InputMaybe<Package_Release_License_Bool_Exp>;
};

/** Ordering options when selecting data from "package.release_license". */
export type Package_Release_License_Order_By = {
  id?: InputMaybe<Order_By>;
  license?: InputMaybe<Package_License_Order_By>;
  license_id?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
  scan_metadata?: InputMaybe<Order_By>;
  scan_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
};

/** primary key columns input for table: package_release_license */
export type Package_Release_License_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Package_Release_License_Prepend_Input = {
  scan_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "package.release_license" */
export enum Package_Release_License_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LicenseId = 'license_id',
  /** column name */
  ReleaseId = 'release_id',
  /** column name */
  ScanMetadata = 'scan_metadata',
  /** column name */
  ScanTime = 'scan_time',
  /** column name */
  Source = 'source'
}

/** input type for updating data in table "package.release_license" */
export type Package_Release_License_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  license_id?: InputMaybe<Scalars['uuid']>;
  release_id?: InputMaybe<Scalars['uuid']>;
  scan_metadata?: InputMaybe<Scalars['jsonb']>;
  scan_time?: InputMaybe<Scalars['timestamptz']>;
  source?: InputMaybe<Scalars['license_source']>;
};

/** update columns of table "package.release_license" */
export enum Package_Release_License_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LicenseId = 'license_id',
  /** column name */
  ReleaseId = 'release_id',
  /** column name */
  ScanMetadata = 'scan_metadata',
  /** column name */
  ScanTime = 'scan_time',
  /** column name */
  Source = 'source'
}

/** order by max() on columns of table "package.release" */
export type Package_Release_Max_Order_By = {
  blob_hash?: InputMaybe<Order_By>;
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mirrored_blob_url?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_time?: InputMaybe<Order_By>;
  upstream_blob_url?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "package.release" */
export type Package_Release_Min_Order_By = {
  blob_hash?: InputMaybe<Order_By>;
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mirrored_blob_url?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_time?: InputMaybe<Order_By>;
  upstream_blob_url?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "package.release" */
export type Package_Release_Mutation_Response = {
  __typename?: 'package_release_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Package_Release>;
};

/** input type for inserting object relation for remote table "package.release" */
export type Package_Release_Obj_Rel_Insert_Input = {
  data: Package_Release_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Package_Release_On_Conflict>;
};

/** on_conflict condition type for table "package.release" */
export type Package_Release_On_Conflict = {
  constraint: Package_Release_Constraint;
  update_columns?: Array<Package_Release_Update_Column>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};

/** Ordering options when selecting data from "package.release". */
export type Package_Release_Order_By = {
  blob_hash?: InputMaybe<Order_By>;
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mirrored_blob_url?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package?: InputMaybe<Package_Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer?: InputMaybe<Package_Maintainer_Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_dependencies_aggregate?: InputMaybe<Package_Release_Dependency_Aggregate_Order_By>;
  release_dependents_aggregate?: InputMaybe<Package_Release_Dependency_Aggregate_Order_By>;
  release_licenses_aggregate?: InputMaybe<Package_Release_License_Aggregate_Order_By>;
  release_time?: InputMaybe<Order_By>;
  upstream_blob_url?: InputMaybe<Order_By>;
  upstream_data?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: package_release */
export type Package_Release_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Package_Release_Prepend_Input = {
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "package.release" */
export enum Package_Release_Select_Column {
  /** column name */
  BlobHash = 'blob_hash',
  /** column name */
  FetchedTime = 'fetched_time',
  /** column name */
  Id = 'id',
  /** column name */
  MirroredBlobUrl = 'mirrored_blob_url',
  /** column name */
  ObservedTime = 'observed_time',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  PublishingMaintainerId = 'publishing_maintainer_id',
  /** column name */
  ReleaseTime = 'release_time',
  /** column name */
  UpstreamBlobUrl = 'upstream_blob_url',
  /** column name */
  UpstreamData = 'upstream_data',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "package.release" */
export type Package_Release_Set_Input = {
  blob_hash?: InputMaybe<Scalars['String']>;
  fetched_time?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  mirrored_blob_url?: InputMaybe<Scalars['String']>;
  observed_time?: InputMaybe<Scalars['timestamptz']>;
  package_id?: InputMaybe<Scalars['uuid']>;
  publishing_maintainer_id?: InputMaybe<Scalars['uuid']>;
  release_time?: InputMaybe<Scalars['timestamptz']>;
  upstream_blob_url?: InputMaybe<Scalars['String']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
  version?: InputMaybe<Scalars['String']>;
};

/** update columns of table "package.release" */
export enum Package_Release_Update_Column {
  /** column name */
  BlobHash = 'blob_hash',
  /** column name */
  FetchedTime = 'fetched_time',
  /** column name */
  Id = 'id',
  /** column name */
  MirroredBlobUrl = 'mirrored_blob_url',
  /** column name */
  ObservedTime = 'observed_time',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  PublishingMaintainerId = 'publishing_maintainer_id',
  /** column name */
  ReleaseTime = 'release_time',
  /** column name */
  UpstreamBlobUrl = 'upstream_blob_url',
  /** column name */
  UpstreamData = 'upstream_data',
  /** column name */
  Version = 'version'
}

/** select columns of table "package.package" */
export enum Package_Select_Column {
  /** column name */
  CustomRegistry = 'custom_registry',
  /** column name */
  Description = 'description',
  /** column name */
  FetchedTime = 'fetched_time',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PackageManager = 'package_manager',
  /** column name */
  UpstreamData = 'upstream_data'
}

/** input type for updating data in table "package.package" */
export type Package_Set_Input = {
  custom_registry?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  fetched_time?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  package_manager?: InputMaybe<Scalars['package_manager']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "package.package" */
export enum Package_Update_Column {
  /** column name */
  CustomRegistry = 'custom_registry',
  /** column name */
  Description = 'description',
  /** column name */
  FetchedTime = 'fetched_time',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PackageManager = 'package_manager',
  /** column name */
  UpstreamData = 'upstream_data'
}

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
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  created_at: Scalars['timestamp'];
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  /** An array relationship */
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
  /** An object relationship */
  settings: Settings;
  settings_id: Scalars['uuid'];
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
export type ProjectsDefault_Branch_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Default_Branch_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Default_Branch_Builds_Order_By>>;
  where?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
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
  default_branch_builds?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
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
  settings?: InputMaybe<Settings_Bool_Exp>;
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
  default_branch_builds?: InputMaybe<Default_Branch_Builds_Arr_Rel_Insert_Input>;
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
  default_branch_builds_aggregate?: InputMaybe<Default_Branch_Builds_Aggregate_Order_By>;
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
  settings?: InputMaybe<Settings_Order_By>;
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
  authenticatedRepoCloneUrl?: Maybe<AuthenticatedRepoCloneUrlOutput>;
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  fakeQueryToHackHasuraBeingABuggyMess?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** An array relationship */
  github_repositories: Array<Github_Repositories>;
  /** fetch data from the table: "github_repositories" using primary key columns */
  github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** fetch data from the table: "guide_related_guides" */
  guide_related_guides: Array<Guide_Related_Guides>;
  /** fetch data from the table: "guide_related_guides" using primary key columns */
  guide_related_guides_by_pk?: Maybe<Guide_Related_Guides>;
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
  /** fetch data from the table: "guide_vulnerabilities" using primary key columns */
  guide_vulnerabilities_by_pk?: Maybe<Guide_Vulnerabilities>;
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
  /** fetch data from the table: "latest_builds" */
  latest_builds: Array<Latest_Builds>;
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
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch data from the table: "package.package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package.license" */
  package_license: Array<Package_License>;
  /** fetch data from the table: "package.license" using primary key columns */
  package_license_by_pk?: Maybe<Package_License>;
  /** fetch data from the table: "package.maintainer" */
  package_maintainer: Array<Package_Maintainer>;
  /** fetch data from the table: "package.maintainer" using primary key columns */
  package_maintainer_by_pk?: Maybe<Package_Maintainer>;
  /** fetch data from the table: "package.package_maintainer" */
  package_package_maintainer: Array<Package_Package_Maintainer>;
  /** fetch data from the table: "package.release" */
  package_release: Array<Package_Release>;
  /** fetch data from the table: "package.release" using primary key columns */
  package_release_by_pk?: Maybe<Package_Release>;
  /** fetch data from the table: "package.release_dependency" */
  package_release_dependency: Array<Package_Release_Dependency>;
  /** fetch data from the table: "package.release_dependency" using primary key columns */
  package_release_dependency_by_pk?: Maybe<Package_Release_Dependency>;
  /** fetch data from the table: "package.release_license" */
  package_release_license: Array<Package_Release_License>;
  /** fetch data from the table: "package.release_license" using primary key columns */
  package_release_license_by_pk?: Maybe<Package_Release_License>;
  /** An array relationship */
  package_versions: Array<Package_Versions>;
  /** fetch data from the table: "package_versions" using primary key columns */
  package_versions_by_pk?: Maybe<Package_Versions>;
  /**  get s3 presigned url for manifest upload, used by the CLI  */
  presignSbomUpload?: Maybe<SbomUploadUrlOutput>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
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
  /** fetch data from the table: "related_vulnerabilities" using primary key columns */
  related_vulnerabilities_by_pk?: Maybe<Related_Vulnerabilities>;
  sbomUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  /** fetch data from the table: "scans" using primary key columns */
  scans_by_pk?: Maybe<Scans>;
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
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
  /** fetch data from the table: "vulnerability.vulnerability" */
  vulnerability: Array<Vulnerability>;
  /** fetch data from the table: "vulnerability.affected" */
  vulnerability_affected: Array<Vulnerability_Affected>;
  /** fetch data from the table: "vulnerability.affected" using primary key columns */
  vulnerability_affected_by_pk?: Maybe<Vulnerability_Affected>;
  /** fetch data from the table: "vulnerability.affected_range_event" */
  vulnerability_affected_range_event: Array<Vulnerability_Affected_Range_Event>;
  /** fetch data from the table: "vulnerability.affected_range_event" using primary key columns */
  vulnerability_affected_range_event_by_pk?: Maybe<Vulnerability_Affected_Range_Event>;
  /** fetch data from the table: "vulnerability.affected_version" */
  vulnerability_affected_version: Array<Vulnerability_Affected_Version>;
  /** fetch data from the table: "vulnerability.affected_version" using primary key columns */
  vulnerability_affected_version_by_pk?: Maybe<Vulnerability_Affected_Version>;
  /** fetch data from the table: "vulnerability.vulnerability" using primary key columns */
  vulnerability_by_pk?: Maybe<Vulnerability>;
  /** fetch data from the table: "vulnerability.credit" */
  vulnerability_credit: Array<Vulnerability_Credit>;
  /** fetch data from the table: "vulnerability.credit" using primary key columns */
  vulnerability_credit_by_pk?: Maybe<Vulnerability_Credit>;
  /** fetch data from the table: "vulnerability.equivalent" */
  vulnerability_equivalent: Array<Vulnerability_Equivalent>;
  /** An array relationship */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability.reference" */
  vulnerability_reference: Array<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.reference" using primary key columns */
  vulnerability_reference_by_pk?: Maybe<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.severity" */
  vulnerability_severity: Array<Vulnerability_Severity>;
  /** fetch data from the table: "vulnerability.severity" using primary key columns */
  vulnerability_severity_by_pk?: Maybe<Vulnerability_Severity>;
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
};


export type Query_RootAuthenticatedRepoCloneUrlArgs = {
  repoGithubId: Scalars['Int'];
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


export type Query_RootDefault_Branch_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Default_Branch_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Default_Branch_Builds_Order_By>>;
  where?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
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


export type Query_RootGithub_Repositories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGuide_Related_GuidesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Related_Guides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Related_Guides_Order_By>>;
  where?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
};


export type Query_RootGuide_Related_Guides_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGuide_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
};


export type Query_RootGuide_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Query_RootLatest_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Latest_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Builds_Order_By>>;
  where?: InputMaybe<Latest_Builds_Bool_Exp>;
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


export type Query_RootPackageArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


export type Query_RootPackage_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_LicenseArgs = {
  distinct_on?: InputMaybe<Array<Package_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_License_Order_By>>;
  where?: InputMaybe<Package_License_Bool_Exp>;
};


export type Query_RootPackage_License_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_MaintainerArgs = {
  distinct_on?: InputMaybe<Array<Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Maintainer_Bool_Exp>;
};


export type Query_RootPackage_Maintainer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_Package_MaintainerArgs = {
  distinct_on?: InputMaybe<Array<Package_Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
};


export type Query_RootPackage_ReleaseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Query_RootPackage_Release_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_Release_DependencyArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Dependency_Order_By>>;
  where?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
};


export type Query_RootPackage_Release_Dependency_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPackage_Release_LicenseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_License_Order_By>>;
  where?: InputMaybe<Package_Release_License_Bool_Exp>;
};


export type Query_RootPackage_Release_License_By_PkArgs = {
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


export type Query_RootRelated_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSbomUrlArgs = {
  buildId: Scalars['uuid'];
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


export type Query_RootSettingsArgs = {
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


export type Query_RootVulnerabilityArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Order_By>>;
  where?: InputMaybe<Vulnerability_Bool_Exp>;
};


export type Query_RootVulnerability_AffectedArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};


export type Query_RootVulnerability_Affected_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_Affected_Range_EventArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
};


export type Query_RootVulnerability_Affected_Range_Event_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_Affected_VersionArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Version_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Version_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
};


export type Query_RootVulnerability_Affected_Version_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_CreditArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Credit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Credit_Order_By>>;
  where?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
};


export type Query_RootVulnerability_Credit_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_EquivalentArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Equivalent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Equivalent_Order_By>>;
  where?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
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


export type Query_RootVulnerability_ReferenceArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Reference_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Reference_Order_By>>;
  where?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
};


export type Query_RootVulnerability_Reference_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerability_SeverityArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Severity_Order_By>>;
  where?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
};


export type Query_RootVulnerability_Severity_By_PkArgs = {
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

/** Boolean expression to compare columns of type "reference_type". All fields are combined with logical 'AND'. */
export type Reference_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['reference_type']>;
  _gt?: InputMaybe<Scalars['reference_type']>;
  _gte?: InputMaybe<Scalars['reference_type']>;
  _in?: InputMaybe<Array<Scalars['reference_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['reference_type']>;
  _lte?: InputMaybe<Scalars['reference_type']>;
  _neq?: InputMaybe<Scalars['reference_type']>;
  _nin?: InputMaybe<Array<Scalars['reference_type']>>;
};

/** join table for adding holding additional vulns on a finding */
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

/** An individual time a scan was run on a build */
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


/** An individual time a scan was run on a build */
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

/** columns and relationships of "settings" */
export type Settings = {
  __typename?: 'settings';
  created_at: Scalars['timestamp'];
  id: Scalars['uuid'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  pr_check_enabled?: Maybe<Scalars['Boolean']>;
  pr_feedback_disabled?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  project?: Maybe<Projects>;
};

/** Boolean expression to filter rows from the table "settings". All fields are combined with a logical 'AND'. */
export type Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Settings_Bool_Exp>>;
  _not?: InputMaybe<Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Settings_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  pr_check_enabled?: InputMaybe<Boolean_Comparison_Exp>;
  pr_feedback_disabled?: InputMaybe<Boolean_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "settings". */
export type Settings_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  pr_check_enabled?: InputMaybe<Order_By>;
  pr_feedback_disabled?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
};

/** select columns of table "settings" */
export enum Settings_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PrCheckEnabled = 'pr_check_enabled',
  /** column name */
  PrFeedbackDisabled = 'pr_feedback_disabled'
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
  default_branch_builds: Array<Default_Branch_Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** An array relationship */
  github_repositories: Array<Github_Repositories>;
  /** fetch data from the table: "github_repositories" using primary key columns */
  github_repositories_by_pk?: Maybe<Github_Repositories>;
  /** fetch data from the table: "guide_related_guides" */
  guide_related_guides: Array<Guide_Related_Guides>;
  /** fetch data from the table: "guide_related_guides" using primary key columns */
  guide_related_guides_by_pk?: Maybe<Guide_Related_Guides>;
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
  /** fetch data from the table: "guide_vulnerabilities" using primary key columns */
  guide_vulnerabilities_by_pk?: Maybe<Guide_Vulnerabilities>;
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
  /** fetch data from the table: "latest_builds" */
  latest_builds: Array<Latest_Builds>;
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
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch data from the table: "package.package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package.license" */
  package_license: Array<Package_License>;
  /** fetch data from the table: "package.license" using primary key columns */
  package_license_by_pk?: Maybe<Package_License>;
  /** fetch data from the table: "package.maintainer" */
  package_maintainer: Array<Package_Maintainer>;
  /** fetch data from the table: "package.maintainer" using primary key columns */
  package_maintainer_by_pk?: Maybe<Package_Maintainer>;
  /** fetch data from the table: "package.package_maintainer" */
  package_package_maintainer: Array<Package_Package_Maintainer>;
  /** fetch data from the table: "package.release" */
  package_release: Array<Package_Release>;
  /** fetch data from the table: "package.release" using primary key columns */
  package_release_by_pk?: Maybe<Package_Release>;
  /** fetch data from the table: "package.release_dependency" */
  package_release_dependency: Array<Package_Release_Dependency>;
  /** fetch data from the table: "package.release_dependency" using primary key columns */
  package_release_dependency_by_pk?: Maybe<Package_Release_Dependency>;
  /** fetch data from the table: "package.release_license" */
  package_release_license: Array<Package_Release_License>;
  /** fetch data from the table: "package.release_license" using primary key columns */
  package_release_license_by_pk?: Maybe<Package_Release_License>;
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
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
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
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
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
  /** fetch data from the table: "vulnerability.vulnerability" */
  vulnerability: Array<Vulnerability>;
  /** fetch data from the table: "vulnerability.affected" */
  vulnerability_affected: Array<Vulnerability_Affected>;
  /** fetch data from the table: "vulnerability.affected" using primary key columns */
  vulnerability_affected_by_pk?: Maybe<Vulnerability_Affected>;
  /** fetch data from the table: "vulnerability.affected_range_event" */
  vulnerability_affected_range_event: Array<Vulnerability_Affected_Range_Event>;
  /** fetch data from the table: "vulnerability.affected_range_event" using primary key columns */
  vulnerability_affected_range_event_by_pk?: Maybe<Vulnerability_Affected_Range_Event>;
  /** fetch data from the table: "vulnerability.affected_version" */
  vulnerability_affected_version: Array<Vulnerability_Affected_Version>;
  /** fetch data from the table: "vulnerability.affected_version" using primary key columns */
  vulnerability_affected_version_by_pk?: Maybe<Vulnerability_Affected_Version>;
  /** fetch data from the table: "vulnerability.vulnerability" using primary key columns */
  vulnerability_by_pk?: Maybe<Vulnerability>;
  /** fetch data from the table: "vulnerability.credit" */
  vulnerability_credit: Array<Vulnerability_Credit>;
  /** fetch data from the table: "vulnerability.credit" using primary key columns */
  vulnerability_credit_by_pk?: Maybe<Vulnerability_Credit>;
  /** fetch data from the table: "vulnerability.equivalent" */
  vulnerability_equivalent: Array<Vulnerability_Equivalent>;
  /** An array relationship */
  vulnerability_packages: Array<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability_packages" using primary key columns */
  vulnerability_packages_by_pk?: Maybe<Vulnerability_Packages>;
  /** fetch data from the table: "vulnerability.reference" */
  vulnerability_reference: Array<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.reference" using primary key columns */
  vulnerability_reference_by_pk?: Maybe<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.severity" */
  vulnerability_severity: Array<Vulnerability_Severity>;
  /** fetch data from the table: "vulnerability.severity" using primary key columns */
  vulnerability_severity_by_pk?: Maybe<Vulnerability_Severity>;
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


export type Subscription_RootDefault_Branch_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Default_Branch_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Default_Branch_Builds_Order_By>>;
  where?: InputMaybe<Default_Branch_Builds_Bool_Exp>;
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


export type Subscription_RootGithub_Repositories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGuide_Related_GuidesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Related_Guides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Related_Guides_Order_By>>;
  where?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
};


export type Subscription_RootGuide_Related_Guides_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGuide_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
};


export type Subscription_RootGuide_Vulnerabilities_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Subscription_RootLatest_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Latest_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Builds_Order_By>>;
  where?: InputMaybe<Latest_Builds_Bool_Exp>;
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


export type Subscription_RootPackageArgs = {
  distinct_on?: InputMaybe<Array<Package_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Order_By>>;
  where?: InputMaybe<Package_Bool_Exp>;
};


export type Subscription_RootPackage_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_LicenseArgs = {
  distinct_on?: InputMaybe<Array<Package_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_License_Order_By>>;
  where?: InputMaybe<Package_License_Bool_Exp>;
};


export type Subscription_RootPackage_License_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_MaintainerArgs = {
  distinct_on?: InputMaybe<Array<Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Maintainer_Bool_Exp>;
};


export type Subscription_RootPackage_Maintainer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_Package_MaintainerArgs = {
  distinct_on?: InputMaybe<Array<Package_Package_Maintainer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Package_Maintainer_Order_By>>;
  where?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
};


export type Subscription_RootPackage_ReleaseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Subscription_RootPackage_Release_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_Release_DependencyArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Dependency_Order_By>>;
  where?: InputMaybe<Package_Release_Dependency_Bool_Exp>;
};


export type Subscription_RootPackage_Release_Dependency_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPackage_Release_LicenseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_License_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_License_Order_By>>;
  where?: InputMaybe<Package_Release_License_Bool_Exp>;
};


export type Subscription_RootPackage_Release_License_By_PkArgs = {
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


export type Subscription_RootSettingsArgs = {
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


export type Subscription_RootVulnerabilityArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Order_By>>;
  where?: InputMaybe<Vulnerability_Bool_Exp>;
};


export type Subscription_RootVulnerability_AffectedArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};


export type Subscription_RootVulnerability_Affected_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_Affected_Range_EventArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
};


export type Subscription_RootVulnerability_Affected_Range_Event_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_Affected_VersionArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Version_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Version_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
};


export type Subscription_RootVulnerability_Affected_Version_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_CreditArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Credit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Credit_Order_By>>;
  where?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
};


export type Subscription_RootVulnerability_Credit_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_EquivalentArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Equivalent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Equivalent_Order_By>>;
  where?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
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


export type Subscription_RootVulnerability_ReferenceArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Reference_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Reference_Order_By>>;
  where?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
};


export type Subscription_RootVulnerability_Reference_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVulnerability_SeverityArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Severity_Order_By>>;
  where?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
};


export type Subscription_RootVulnerability_Severity_By_PkArgs = {
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

/** LunaTrace users, identified by their various auth identifiers (ex. github, kratos, etc.) */
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
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
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
export type VulnerabilitiesGuide_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
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
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
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

/** input type for inserting data into table "vulnerabilities" */
export type Vulnerabilities_Insert_Input = {
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
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
  guide_vulnerabilities_aggregate?: InputMaybe<Guide_Vulnerabilities_Aggregate_Order_By>;
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

/** columns and relationships of "vulnerability.vulnerability" */
export type Vulnerability = {
  __typename?: 'vulnerability';
  /** An array relationship */
  affected: Array<Vulnerability_Affected>;
  /** An array relationship */
  credits: Array<Vulnerability_Credit>;
  database_specific?: Maybe<Scalars['jsonb']>;
  details?: Maybe<Scalars['String']>;
  /** An array relationship */
  equivalents: Array<Vulnerability_Equivalent>;
  id: Scalars['uuid'];
  modified: Scalars['timestamptz'];
  published?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  references: Array<Vulnerability_Reference>;
  /** An array relationship */
  severities: Array<Vulnerability_Severity>;
  source: Scalars['String'];
  source_id: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  upstream_data?: Maybe<Scalars['jsonb']>;
  withdrawn?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityAffectedArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityCreditsArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Credit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Credit_Order_By>>;
  where?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityDatabase_SpecificArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityEquivalentsArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Equivalent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Equivalent_Order_By>>;
  where?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityReferencesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Reference_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Reference_Order_By>>;
  where?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilitySeveritiesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Severity_Order_By>>;
  where?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityUpstream_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_Affected = {
  __typename?: 'vulnerability_affected';
  /** An array relationship */
  affected_range_events: Array<Vulnerability_Affected_Range_Event>;
  /** An array relationship */
  affected_versions: Array<Vulnerability_Affected_Version>;
  database_specific?: Maybe<Scalars['jsonb']>;
  ecosystem_specific?: Maybe<Scalars['jsonb']>;
  id: Scalars['uuid'];
  /** An object relationship */
  package?: Maybe<Package>;
  package_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  vulnerability?: Maybe<Vulnerability>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_AffectedAffected_Range_EventsArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
};


/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_AffectedAffected_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Version_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Version_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
};


/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_AffectedDatabase_SpecificArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_AffectedEcosystem_SpecificArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "vulnerability.affected" */
export type Vulnerability_Affected_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Affected_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Affected_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Append_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  ecosystem_specific?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "vulnerability.affected" */
export type Vulnerability_Affected_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Affected_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Affected_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.affected". All fields are combined with a logical 'AND'. */
export type Vulnerability_Affected_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Affected_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Affected_Bool_Exp>>;
  affected_range_events?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
  affected_versions?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  ecosystem_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  package?: InputMaybe<Package_Bool_Exp>;
  package_id?: InputMaybe<Uuid_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.affected" */
export enum Vulnerability_Affected_Constraint {
  /** unique or primary key constraint */
  AffectedPkey = 'affected_pkey',
  /** unique or primary key constraint */
  AffectedVulnerabilityIdPackageIdIdx = 'affected_vulnerability_id_package_id_idx'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vulnerability_Affected_Delete_At_Path_Input = {
  database_specific?: InputMaybe<Array<Scalars['String']>>;
  ecosystem_specific?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vulnerability_Affected_Delete_Elem_Input = {
  database_specific?: InputMaybe<Scalars['Int']>;
  ecosystem_specific?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vulnerability_Affected_Delete_Key_Input = {
  database_specific?: InputMaybe<Scalars['String']>;
  ecosystem_specific?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "vulnerability.affected" */
export type Vulnerability_Affected_Insert_Input = {
  affected_range_events?: InputMaybe<Vulnerability_Affected_Range_Event_Arr_Rel_Insert_Input>;
  affected_versions?: InputMaybe<Vulnerability_Affected_Version_Arr_Rel_Insert_Input>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  ecosystem_specific?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  package?: InputMaybe<Package_Obj_Rel_Insert_Input>;
  package_id?: InputMaybe<Scalars['uuid']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vulnerability.affected" */
export type Vulnerability_Affected_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.affected" */
export type Vulnerability_Affected_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.affected" */
export type Vulnerability_Affected_Mutation_Response = {
  __typename?: 'vulnerability_affected_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Affected>;
};

/** input type for inserting object relation for remote table "vulnerability.affected" */
export type Vulnerability_Affected_Obj_Rel_Insert_Input = {
  data: Vulnerability_Affected_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Affected_On_Conflict>;
};

/** on_conflict condition type for table "vulnerability.affected" */
export type Vulnerability_Affected_On_Conflict = {
  constraint: Vulnerability_Affected_Constraint;
  update_columns?: Array<Vulnerability_Affected_Update_Column>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.affected". */
export type Vulnerability_Affected_Order_By = {
  affected_range_events_aggregate?: InputMaybe<Vulnerability_Affected_Range_Event_Aggregate_Order_By>;
  affected_versions_aggregate?: InputMaybe<Vulnerability_Affected_Version_Aggregate_Order_By>;
  database_specific?: InputMaybe<Order_By>;
  ecosystem_specific?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  package?: InputMaybe<Package_Order_By>;
  package_id?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_affected */
export type Vulnerability_Affected_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Prepend_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  ecosystem_specific?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event = {
  __typename?: 'vulnerability_affected_range_event';
  /** An object relationship */
  affected?: Maybe<Vulnerability_Affected>;
  affected_id?: Maybe<Scalars['uuid']>;
  database_specific?: Maybe<Scalars['jsonb']>;
  event: Scalars['String'];
  id: Scalars['uuid'];
  type: Scalars['affected_range_type'];
  version: Scalars['String'];
};


/** columns and relationships of "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_EventDatabase_SpecificArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Affected_Range_Event_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Affected_Range_Event_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Range_Event_Append_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Affected_Range_Event_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Affected_Range_Event_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.affected_range_event". All fields are combined with a logical 'AND'. */
export type Vulnerability_Affected_Range_Event_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Affected_Range_Event_Bool_Exp>>;
  affected?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  affected_id?: InputMaybe<Uuid_Comparison_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  event?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Affected_Range_Type_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.affected_range_event" */
export enum Vulnerability_Affected_Range_Event_Constraint {
  /** unique or primary key constraint */
  AffectedRangeEventAffectedIdTypeEventVersionIdx = 'affected_range_event_affected_id_type_event_version_idx',
  /** unique or primary key constraint */
  AffectedRangeEventPkey = 'affected_range_event_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vulnerability_Affected_Range_Event_Delete_At_Path_Input = {
  database_specific?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vulnerability_Affected_Range_Event_Delete_Elem_Input = {
  database_specific?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vulnerability_Affected_Range_Event_Delete_Key_Input = {
  database_specific?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Obj_Rel_Insert_Input>;
  affected_id?: InputMaybe<Scalars['uuid']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  event?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['affected_range_type']>;
  version?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Max_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Min_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Mutation_Response = {
  __typename?: 'vulnerability_affected_range_event_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Affected_Range_Event>;
};

/** on_conflict condition type for table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_On_Conflict = {
  constraint: Vulnerability_Affected_Range_Event_Constraint;
  update_columns?: Array<Vulnerability_Affected_Range_Event_Update_Column>;
  where?: InputMaybe<Vulnerability_Affected_Range_Event_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.affected_range_event". */
export type Vulnerability_Affected_Range_Event_Order_By = {
  affected?: InputMaybe<Vulnerability_Affected_Order_By>;
  affected_id?: InputMaybe<Order_By>;
  database_specific?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_affected_range_event */
export type Vulnerability_Affected_Range_Event_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Range_Event_Prepend_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "vulnerability.affected_range_event" */
export enum Vulnerability_Affected_Range_Event_Select_Column {
  /** column name */
  AffectedId = 'affected_id',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Event = 'event',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Set_Input = {
  affected_id?: InputMaybe<Scalars['uuid']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  event?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['affected_range_type']>;
  version?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability.affected_range_event" */
export enum Vulnerability_Affected_Range_Event_Update_Column {
  /** column name */
  AffectedId = 'affected_id',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Event = 'event',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Version = 'version'
}

/** select columns of table "vulnerability.affected" */
export enum Vulnerability_Affected_Select_Column {
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  EcosystemSpecific = 'ecosystem_specific',
  /** column name */
  Id = 'id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "vulnerability.affected" */
export type Vulnerability_Affected_Set_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  ecosystem_specific?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  package_id?: InputMaybe<Scalars['uuid']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "vulnerability.affected" */
export enum Vulnerability_Affected_Update_Column {
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  EcosystemSpecific = 'ecosystem_specific',
  /** column name */
  Id = 'id',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** columns and relationships of "vulnerability.affected_version" */
export type Vulnerability_Affected_Version = {
  __typename?: 'vulnerability_affected_version';
  /** An object relationship */
  affected?: Maybe<Vulnerability_Affected>;
  affected_id?: Maybe<Scalars['uuid']>;
  database_specific?: Maybe<Scalars['jsonb']>;
  id: Scalars['uuid'];
  version: Scalars['String'];
};


/** columns and relationships of "vulnerability.affected_version" */
export type Vulnerability_Affected_VersionDatabase_SpecificArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Affected_Version_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Affected_Version_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Version_Append_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Affected_Version_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Affected_Version_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.affected_version". All fields are combined with a logical 'AND'. */
export type Vulnerability_Affected_Version_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Affected_Version_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Affected_Version_Bool_Exp>>;
  affected?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  affected_id?: InputMaybe<Uuid_Comparison_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.affected_version" */
export enum Vulnerability_Affected_Version_Constraint {
  /** unique or primary key constraint */
  AffectedVersionAffectedIdTypeVersion = 'affected_version_affected_id_type_version',
  /** unique or primary key constraint */
  AffectedVersionPkey = 'affected_version_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vulnerability_Affected_Version_Delete_At_Path_Input = {
  database_specific?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vulnerability_Affected_Version_Delete_Elem_Input = {
  database_specific?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vulnerability_Affected_Version_Delete_Key_Input = {
  database_specific?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Obj_Rel_Insert_Input>;
  affected_id?: InputMaybe<Scalars['uuid']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  version?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Max_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Min_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Mutation_Response = {
  __typename?: 'vulnerability_affected_version_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Affected_Version>;
};

/** on_conflict condition type for table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_On_Conflict = {
  constraint: Vulnerability_Affected_Version_Constraint;
  update_columns?: Array<Vulnerability_Affected_Version_Update_Column>;
  where?: InputMaybe<Vulnerability_Affected_Version_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.affected_version". */
export type Vulnerability_Affected_Version_Order_By = {
  affected?: InputMaybe<Vulnerability_Affected_Order_By>;
  affected_id?: InputMaybe<Order_By>;
  database_specific?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_affected_version */
export type Vulnerability_Affected_Version_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Affected_Version_Prepend_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "vulnerability.affected_version" */
export enum Vulnerability_Affected_Version_Select_Column {
  /** column name */
  AffectedId = 'affected_id',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Id = 'id',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "vulnerability.affected_version" */
export type Vulnerability_Affected_Version_Set_Input = {
  affected_id?: InputMaybe<Scalars['uuid']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  version?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability.affected_version" */
export enum Vulnerability_Affected_Version_Update_Column {
  /** column name */
  AffectedId = 'affected_id',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Id = 'id',
  /** column name */
  Version = 'version'
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Append_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "vulnerability.vulnerability". All fields are combined with a logical 'AND'. */
export type Vulnerability_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Bool_Exp>>;
  affected?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  credits?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  modified?: InputMaybe<Timestamptz_Comparison_Exp>;
  published?: InputMaybe<Timestamptz_Comparison_Exp>;
  references?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
  severities?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
  source_id?: InputMaybe<String_Comparison_Exp>;
  summary?: InputMaybe<String_Comparison_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
  withdrawn?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.vulnerability" */
export enum Vulnerability_Constraint {
  /** unique or primary key constraint */
  VulnerabilityPkey = 'vulnerability_pkey',
  /** unique or primary key constraint */
  VulnerabilitySourceSourceIdIdx = 'vulnerability_source_source_id_idx'
}

/** columns and relationships of "vulnerability.credit" */
export type Vulnerability_Credit = {
  __typename?: 'vulnerability_credit';
  contact?: Maybe<Scalars['_text']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  vulnerability?: Maybe<Vulnerability>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "vulnerability.credit" */
export type Vulnerability_Credit_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Credit_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Credit_Min_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability.credit" */
export type Vulnerability_Credit_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Credit_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Credit_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.credit". All fields are combined with a logical 'AND'. */
export type Vulnerability_Credit_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Credit_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Credit_Bool_Exp>>;
  contact?: InputMaybe<_Text_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.credit" */
export enum Vulnerability_Credit_Constraint {
  /** unique or primary key constraint */
  CreditPkey = 'credit_pkey',
  /** unique or primary key constraint */
  CreditVulnerabilityIdName = 'credit_vulnerability_id_name'
}

/** input type for inserting data into table "vulnerability.credit" */
export type Vulnerability_Credit_Insert_Input = {
  contact?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vulnerability.credit" */
export type Vulnerability_Credit_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.credit" */
export type Vulnerability_Credit_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.credit" */
export type Vulnerability_Credit_Mutation_Response = {
  __typename?: 'vulnerability_credit_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Credit>;
};

/** on_conflict condition type for table "vulnerability.credit" */
export type Vulnerability_Credit_On_Conflict = {
  constraint: Vulnerability_Credit_Constraint;
  update_columns?: Array<Vulnerability_Credit_Update_Column>;
  where?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.credit". */
export type Vulnerability_Credit_Order_By = {
  contact?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_credit */
export type Vulnerability_Credit_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerability.credit" */
export enum Vulnerability_Credit_Select_Column {
  /** column name */
  Contact = 'contact',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "vulnerability.credit" */
export type Vulnerability_Credit_Set_Input = {
  contact?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "vulnerability.credit" */
export enum Vulnerability_Credit_Update_Column {
  /** column name */
  Contact = 'contact',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vulnerability_Delete_At_Path_Input = {
  database_specific?: InputMaybe<Array<Scalars['String']>>;
  upstream_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vulnerability_Delete_Elem_Input = {
  database_specific?: InputMaybe<Scalars['Int']>;
  upstream_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vulnerability_Delete_Key_Input = {
  database_specific?: InputMaybe<Scalars['String']>;
  upstream_data?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "vulnerability.equivalent" */
export type Vulnerability_Equivalent = {
  __typename?: 'vulnerability_equivalent';
  a?: Maybe<Scalars['uuid']>;
  b?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  vulnerability?: Maybe<Vulnerability>;
  /** An object relationship */
  vulnerabilityByB?: Maybe<Vulnerability>;
};

/** order by aggregate values of table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Equivalent_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Equivalent_Min_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Equivalent_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Equivalent_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.equivalent". All fields are combined with a logical 'AND'. */
export type Vulnerability_Equivalent_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Equivalent_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Equivalent_Bool_Exp>>;
  a?: InputMaybe<Uuid_Comparison_Exp>;
  b?: InputMaybe<Uuid_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerabilityByB?: InputMaybe<Vulnerability_Bool_Exp>;
};

/** unique or primary key constraints on table "vulnerability.equivalent" */
export enum Vulnerability_Equivalent_Constraint {
  /** unique or primary key constraint */
  EquivalentABIdx = 'equivalent_a_b_idx'
}

/** input type for inserting data into table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Insert_Input = {
  a?: InputMaybe<Scalars['uuid']>;
  b?: InputMaybe<Scalars['uuid']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerabilityByB?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
};

/** order by max() on columns of table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Max_Order_By = {
  a?: InputMaybe<Order_By>;
  b?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Min_Order_By = {
  a?: InputMaybe<Order_By>;
  b?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Mutation_Response = {
  __typename?: 'vulnerability_equivalent_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Equivalent>;
};

/** on_conflict condition type for table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_On_Conflict = {
  constraint: Vulnerability_Equivalent_Constraint;
  update_columns?: Array<Vulnerability_Equivalent_Update_Column>;
  where?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.equivalent". */
export type Vulnerability_Equivalent_Order_By = {
  a?: InputMaybe<Order_By>;
  b?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerabilityByB?: InputMaybe<Vulnerability_Order_By>;
};

/** select columns of table "vulnerability.equivalent" */
export enum Vulnerability_Equivalent_Select_Column {
  /** column name */
  A = 'a',
  /** column name */
  B = 'b'
}

/** input type for updating data in table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Set_Input = {
  a?: InputMaybe<Scalars['uuid']>;
  b?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "vulnerability.equivalent" */
export enum Vulnerability_Equivalent_Update_Column {
  /** column name */
  A = 'a',
  /** column name */
  B = 'b'
}

/** input type for inserting data into table "vulnerability.vulnerability" */
export type Vulnerability_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Arr_Rel_Insert_Input>;
  credits?: InputMaybe<Vulnerability_Credit_Arr_Rel_Insert_Input>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  references?: InputMaybe<Vulnerability_Reference_Arr_Rel_Insert_Input>;
  severities?: InputMaybe<Vulnerability_Severity_Arr_Rel_Insert_Input>;
  source?: InputMaybe<Scalars['String']>;
  source_id?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
  withdrawn?: InputMaybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "vulnerability.vulnerability" */
export type Vulnerability_Mutation_Response = {
  __typename?: 'vulnerability_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability>;
};

/** input type for inserting object relation for remote table "vulnerability.vulnerability" */
export type Vulnerability_Obj_Rel_Insert_Input = {
  data: Vulnerability_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_On_Conflict>;
};

/** on_conflict condition type for table "vulnerability.vulnerability" */
export type Vulnerability_On_Conflict = {
  constraint: Vulnerability_Constraint;
  update_columns?: Array<Vulnerability_Update_Column>;
  where?: InputMaybe<Vulnerability_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.vulnerability". */
export type Vulnerability_Order_By = {
  affected_aggregate?: InputMaybe<Vulnerability_Affected_Aggregate_Order_By>;
  credits_aggregate?: InputMaybe<Vulnerability_Credit_Aggregate_Order_By>;
  database_specific?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  equivalents_aggregate?: InputMaybe<Vulnerability_Equivalent_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  modified?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  references_aggregate?: InputMaybe<Vulnerability_Reference_Aggregate_Order_By>;
  severities_aggregate?: InputMaybe<Vulnerability_Severity_Aggregate_Order_By>;
  source?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  summary?: InputMaybe<Order_By>;
  upstream_data?: InputMaybe<Order_By>;
  withdrawn?: InputMaybe<Order_By>;
};

/** All of the package vulnerabilities belonging to a given vulnerability */
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


/** All of the package vulnerabilities belonging to a given vulnerability */
export type Vulnerability_PackagesFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** All of the package vulnerabilities belonging to a given vulnerability */
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

/** primary key columns input for table: vulnerability */
export type Vulnerability_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Prepend_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "vulnerability.reference" */
export type Vulnerability_Reference = {
  __typename?: 'vulnerability_reference';
  id: Scalars['uuid'];
  type: Scalars['reference_type'];
  url: Scalars['String'];
  /** An object relationship */
  vulnerability?: Maybe<Vulnerability>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "vulnerability.reference" */
export type Vulnerability_Reference_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Reference_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Reference_Min_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability.reference" */
export type Vulnerability_Reference_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Reference_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Reference_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.reference". All fields are combined with a logical 'AND'. */
export type Vulnerability_Reference_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Reference_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Reference_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Reference_Type_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.reference" */
export enum Vulnerability_Reference_Constraint {
  /** unique or primary key constraint */
  ReferencePkey = 'reference_pkey',
  /** unique or primary key constraint */
  ReferenceVulnerabilityIdTypeUrlIdx = 'reference_vulnerability_id_type_url_idx'
}

/** input type for inserting data into table "vulnerability.reference" */
export type Vulnerability_Reference_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['reference_type']>;
  url?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vulnerability.reference" */
export type Vulnerability_Reference_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.reference" */
export type Vulnerability_Reference_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.reference" */
export type Vulnerability_Reference_Mutation_Response = {
  __typename?: 'vulnerability_reference_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Reference>;
};

/** on_conflict condition type for table "vulnerability.reference" */
export type Vulnerability_Reference_On_Conflict = {
  constraint: Vulnerability_Reference_Constraint;
  update_columns?: Array<Vulnerability_Reference_Update_Column>;
  where?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.reference". */
export type Vulnerability_Reference_Order_By = {
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_reference */
export type Vulnerability_Reference_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerability.reference" */
export enum Vulnerability_Reference_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Url = 'url',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "vulnerability.reference" */
export type Vulnerability_Reference_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['reference_type']>;
  url?: InputMaybe<Scalars['String']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "vulnerability.reference" */
export enum Vulnerability_Reference_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Url = 'url',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** select columns of table "vulnerability.vulnerability" */
export enum Vulnerability_Select_Column {
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Modified = 'modified',
  /** column name */
  Published = 'published',
  /** column name */
  Source = 'source',
  /** column name */
  SourceId = 'source_id',
  /** column name */
  Summary = 'summary',
  /** column name */
  UpstreamData = 'upstream_data',
  /** column name */
  Withdrawn = 'withdrawn'
}

/** input type for updating data in table "vulnerability.vulnerability" */
export type Vulnerability_Set_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  source?: InputMaybe<Scalars['String']>;
  source_id?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
  withdrawn?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "vulnerability.severity" */
export type Vulnerability_Severity = {
  __typename?: 'vulnerability_severity';
  id: Scalars['uuid'];
  score: Scalars['String'];
  source: Scalars['String'];
  type: Scalars['String'];
  /** An object relationship */
  vulnerability?: Maybe<Vulnerability>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "vulnerability.severity" */
export type Vulnerability_Severity_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Severity_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Severity_Min_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability.severity" */
export type Vulnerability_Severity_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Severity_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Severity_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vulnerability.severity". All fields are combined with a logical 'AND'. */
export type Vulnerability_Severity_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Severity_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Severity_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  score?: InputMaybe<String_Comparison_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.severity" */
export enum Vulnerability_Severity_Constraint {
  /** unique or primary key constraint */
  SeverityPkey = 'severity_pkey',
  /** unique or primary key constraint */
  SeverityVulnerabilityIdSourceTypeIdx = 'severity_vulnerability_id_source_type_idx'
}

/** input type for inserting data into table "vulnerability.severity" */
export type Vulnerability_Severity_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  score?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vulnerability.severity" */
export type Vulnerability_Severity_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.severity" */
export type Vulnerability_Severity_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.severity" */
export type Vulnerability_Severity_Mutation_Response = {
  __typename?: 'vulnerability_severity_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Severity>;
};

/** on_conflict condition type for table "vulnerability.severity" */
export type Vulnerability_Severity_On_Conflict = {
  constraint: Vulnerability_Severity_Constraint;
  update_columns?: Array<Vulnerability_Severity_Update_Column>;
  where?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.severity". */
export type Vulnerability_Severity_Order_By = {
  id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_severity */
export type Vulnerability_Severity_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerability.severity" */
export enum Vulnerability_Severity_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Score = 'score',
  /** column name */
  Source = 'source',
  /** column name */
  Type = 'type',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "vulnerability.severity" */
export type Vulnerability_Severity_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  score?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "vulnerability.severity" */
export enum Vulnerability_Severity_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Score = 'score',
  /** column name */
  Source = 'source',
  /** column name */
  Type = 'type',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** update columns of table "vulnerability.vulnerability" */
export enum Vulnerability_Update_Column {
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Modified = 'modified',
  /** column name */
  Published = 'published',
  /** column name */
  Source = 'source',
  /** column name */
  SourceId = 'source_id',
  /** column name */
  Summary = 'summary',
  /** column name */
  UpstreamData = 'upstream_data',
  /** column name */
  Withdrawn = 'withdrawn'
}

/** columns and relationships of "webhook_cache" */
export type Webhook_Cache = {
  __typename?: 'webhook_cache';
  created_at: Scalars['timestamp'];
  data: Scalars['jsonb'];
  delivery_id: Scalars['uuid'];
  event_type: Scalars['String'];
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
  event_type?: InputMaybe<String_Comparison_Exp>;
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
  event_type?: InputMaybe<Scalars['String']>;
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

export type GetBuildsCountFromGithubIdQueryVariables = Exact<{
  github_id: Scalars['Int'];
}>;


export type GetBuildsCountFromGithubIdQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', project: { __typename?: 'projects', builds_aggregate: { __typename?: 'builds_aggregate', aggregate?: { __typename?: 'builds_aggregate_fields', count: number } | null } } }> };

export type GetBuildQueryVariables = Exact<{
  build_id: Scalars['uuid'];
}>;


export type GetBuildQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', pull_request_id?: string | null, existing_github_review_id?: string | null, existing_github_check_id?: number | null, s3_url?: string | null, git_hash?: string | null, project?: { __typename?: 'projects', id: any, repo?: string | null, organization?: { __typename?: 'organizations', installation_id?: number | null, name: string } | null, settings: { __typename?: 'settings', pr_feedback_disabled?: boolean | null, pr_check_enabled?: boolean | null } } | null } | null };

export type GetCloneRepoInfoFromRepoIdQueryVariables = Exact<{
  repo_github_id: Scalars['Int'];
}>;


export type GetCloneRepoInfoFromRepoIdQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', git_url: string, project: { __typename?: 'projects', id: any, organization?: { __typename?: 'organizations', installation_id?: number | null } | null } }> };

export type GetCountOfPersonalOrgQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetCountOfPersonalOrgQuery = { __typename?: 'query_root', organizations_aggregate: { __typename?: 'organizations_aggregate', aggregate?: { __typename?: 'organizations_aggregate_fields', count: number } | null } };

export type GetGithubRepositoriesByIdsQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetGithubRepositoriesByIdsQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', github_id?: number | null }> };

export type GetLatestBuildsForRescanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestBuildsForRescanQuery = { __typename?: 'query_root', latest_builds: Array<{ __typename?: 'latest_builds', s3_url?: string | null }> };

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


export type GetWebhookCacheByDeliveryIdQuery = { __typename?: 'query_root', webhook_cache: Array<{ __typename?: 'webhook_cache', data: any, delivery_id: any, signature_256: string, event_type: string, installation_id?: number | null, created_at: any }> };

export type GetWebhookCacheJobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetWebhookCacheJobsQuery = { __typename?: 'query_root', webhook_cache: Array<{ __typename?: 'webhook_cache', data: any, delivery_id: any, signature_256: string, event_type: string, created_at: any }> };

export type GetUserFromIdentityQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserFromIdentityQuery = { __typename?: 'query_root', identities_by_pk?: { __typename?: 'identities', user?: { __typename?: 'users', id: any } | null } | null };

export type InsertBuildMutationVariables = Exact<{
  build: Builds_Insert_Input;
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
  event_type: Scalars['String'];
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

export type UpdateBuildExistingCheckIdMutationVariables = Exact<{
  id: Scalars['uuid'];
  existing_github_check_id: Scalars['Int'];
}>;


export type UpdateBuildExistingCheckIdMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

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

export type UpsertGuidesMutationVariables = Exact<{
  objects: Array<Guides_Insert_Input> | Guides_Insert_Input;
}>;


export type UpsertGuidesMutation = { __typename?: 'mutation_root', insert_guides?: { __typename?: 'guides_mutation_response', affected_rows: number } | null };

export type UpsertOrganizationUsersMutationVariables = Exact<{
  organizationUsers: Array<Organization_User_Insert_Input> | Organization_User_Insert_Input;
}>;


export type UpsertOrganizationUsersMutation = { __typename?: 'mutation_root', insert_organization_user?: { __typename?: 'organization_user_mutation_response', affected_rows: number } | null };

export type UpsertOrganizationsMutationVariables = Exact<{
  objects?: InputMaybe<Array<Organizations_Insert_Input> | Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
}>;


export type UpsertOrganizationsMutation = { __typename?: 'mutation_root', insert_organizations?: { __typename?: 'organizations_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'organizations', id: any, github_node_id?: string | null, name: string }> } | null };

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
export const GetBuildsCountFromGithubIdDocument = gql`
    query GetBuildsCountFromGithubId($github_id: Int!) {
  github_repositories(where: {github_id: {_eq: $github_id}}) {
    project {
      builds_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
    `;
export const GetBuildDocument = gql`
    query GetBuild($build_id: uuid!) {
  builds_by_pk(id: $build_id) {
    project {
      id
      repo
      organization {
        installation_id
        name
      }
      settings {
        pr_feedback_disabled
        pr_check_enabled
      }
    }
    pull_request_id
    existing_github_review_id
    existing_github_check_id
    s3_url
    git_hash
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
export const GetGithubRepositoriesByIdsDocument = gql`
    query GetGithubRepositoriesByIds($ids: [Int!]!) {
  github_repositories(where: {github_id: {_in: $ids}}) {
    github_id
  }
}
    `;
export const GetLatestBuildsForRescanDocument = gql`
    query GetLatestBuildsForRescan {
  latest_builds(where: {s3_url: {_is_null: false}}) {
    s3_url
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
    mutation InsertBuild($build: builds_insert_input!) {
  insert_builds_one(object: $build) {
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
    mutation InsertWebhookToCache($delivery_id: uuid!, $event_type: String!, $signature_256: String!, $installation_id: Int, $data: jsonb!) {
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
export const UpdateBuildExistingCheckIdDocument = gql`
    mutation UpdateBuildExistingCheckId($id: uuid!, $existing_github_check_id: Int!) {
  update_builds_by_pk(
    pk_columns: {id: $id}
    _set: {existing_github_check_id: $existing_github_check_id}
  ) {
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
export const UpsertGuidesDocument = gql`
    mutation UpsertGuides($objects: [guides_insert_input!]!) {
  insert_guides(
    on_conflict: {constraint: guides_guide_unique_id_key, update_columns: [tags, body, data_source_link, metadata, metadata_schema_version, title, updated_at, summary, severity]}
    objects: $objects
  ) {
    affected_rows
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
    GetBuildsCountFromGithubId(variables: GetBuildsCountFromGithubIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBuildsCountFromGithubIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBuildsCountFromGithubIdQuery>(GetBuildsCountFromGithubIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetBuildsCountFromGithubId', 'query');
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
    GetGithubRepositoriesByIds(variables: GetGithubRepositoriesByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGithubRepositoriesByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGithubRepositoriesByIdsQuery>(GetGithubRepositoriesByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGithubRepositoriesByIds', 'query');
    },
    GetLatestBuildsForRescan(variables?: GetLatestBuildsForRescanQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLatestBuildsForRescanQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLatestBuildsForRescanQuery>(GetLatestBuildsForRescanDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetLatestBuildsForRescan', 'query');
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
    UpdateBuildExistingCheckId(variables: UpdateBuildExistingCheckIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateBuildExistingCheckIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBuildExistingCheckIdMutation>(UpdateBuildExistingCheckIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateBuildExistingCheckId', 'mutation');
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
    UpsertGuides(variables: UpsertGuidesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertGuidesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertGuidesMutation>(UpsertGuidesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertGuides', 'mutation');
    },
    UpsertOrganizationUsers(variables: UpsertOrganizationUsersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationUsersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationUsersMutation>(UpsertOrganizationUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganizationUsers', 'mutation');
    },
    UpsertOrganizations(variables?: UpsertOrganizationsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationsMutation>(UpsertOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganizations', 'mutation');
    },
    UpsertUserFromId(variables: UpsertUserFromIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertUserFromIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUserFromIdMutation>(UpsertUserFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertUserFromId', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;