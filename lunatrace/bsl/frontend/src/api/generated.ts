import { api } from './baseApi';
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
  _text: string;
  affected_range_type: 'git'|'semver'|'ecosystem';
  bigint: number;
  builds_source_type: 'cli'|'gui'|'pr';
  date: string;
  fix_state_enum: 'fixed'|'not-fixed'|'unknown';
  jsonb: Record<any, any> | any[];
  organization_user_role: string;
  package_manager: string;
  reference_type: 'advisory'|'article'|'fix'|'git'|'package'|'report'|'web';
  severity_enum: string;
  timestamp: string;
  timestamptz: string;
  user_role: 'organization_user'|'lunatrace_admin';
  uuid: string;
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

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _nin?: InputMaybe<Array<Scalars['Float']>>;
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

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** DEPRECATED: old dependency tree */
export type Build_Dependency_Relationship = {
  __typename?: 'build_dependency_relationship';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  /** An object relationship */
  depended_by_relationship?: Maybe<Build_Dependency_Relationship>;
  depended_by_relationship_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  labels: Scalars['jsonb'];
  project_path: Scalars['String'];
  range: Scalars['String'];
  /** An object relationship */
  release: Package_Release;
  release_id: Scalars['uuid'];
};


/** DEPRECATED: old dependency tree */
export type Build_Dependency_RelationshipLabelsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Build_Dependency_Relationship_Max_Order_By>;
  min?: InputMaybe<Build_Dependency_Relationship_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "build_dependency_relationship". All fields are combined with a logical 'AND'. */
export type Build_Dependency_Relationship_Bool_Exp = {
  _and?: InputMaybe<Array<Build_Dependency_Relationship_Bool_Exp>>;
  _not?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
  _or?: InputMaybe<Array<Build_Dependency_Relationship_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  depended_by_relationship?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
  depended_by_relationship_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  labels?: InputMaybe<Jsonb_Comparison_Exp>;
  project_path?: InputMaybe<String_Comparison_Exp>;
  range?: InputMaybe<String_Comparison_Exp>;
  release?: InputMaybe<Package_Release_Bool_Exp>;
  release_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  depended_by_relationship_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_path?: InputMaybe<Order_By>;
  range?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  depended_by_relationship_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_path?: InputMaybe<Order_By>;
  range?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "build_dependency_relationship". */
export type Build_Dependency_Relationship_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  depended_by_relationship?: InputMaybe<Build_Dependency_Relationship_Order_By>;
  depended_by_relationship_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  labels?: InputMaybe<Order_By>;
  project_path?: InputMaybe<Order_By>;
  range?: InputMaybe<Order_By>;
  release?: InputMaybe<Package_Release_Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** select columns of table "build_dependency_relationship" */
export enum Build_Dependency_Relationship_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  DependedByRelationshipId = 'depended_by_relationship_id',
  /** column name */
  Id = 'id',
  /** column name */
  Labels = 'labels',
  /** column name */
  ProjectPath = 'project_path',
  /** column name */
  Range = 'range',
  /** column name */
  ReleaseId = 'release_id'
}

/** columns and relationships of "builds" */
export type Builds = {
  __typename?: 'builds';
  /** An array relationship */
  build_dependency_relationships: Array<Build_Dependency_Relationship>;
  build_number?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamp'];
  existing_github_check_id?: Maybe<Scalars['bigint']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
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
  /** An array relationship */
  resolved_manifests: Array<Resolved_Manifest>;
  s3_url?: Maybe<Scalars['String']>;
  s3_url_signed?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
  source_type: Scalars['builds_source_type'];
};


/** columns and relationships of "builds" */
export type BuildsBuild_Dependency_RelationshipsArgs = {
  distinct_on?: InputMaybe<Array<Build_Dependency_Relationship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Dependency_Relationship_Order_By>>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
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
export type BuildsManifestsArgs = {
  distinct_on?: InputMaybe<Array<Manifests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifests_Order_By>>;
  where?: InputMaybe<Manifests_Bool_Exp>;
};


/** columns and relationships of "builds" */
export type BuildsResolved_ManifestsArgs = {
  distinct_on?: InputMaybe<Array<Resolved_Manifest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resolved_Manifest_Order_By>>;
  where?: InputMaybe<Resolved_Manifest_Bool_Exp>;
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
  build_dependency_relationships?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_check_id?: InputMaybe<Bigint_Comparison_Exp>;
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
  resolved_manifests?: InputMaybe<Resolved_Manifest_Bool_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  scans?: InputMaybe<Scans_Bool_Exp>;
  source_type?: InputMaybe<Builds_Source_Type_Comparison_Exp>;
};

/** aggregate max on columns */
export type Builds_Max_Fields = {
  __typename?: 'builds_max_fields';
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_check_id?: Maybe<Scalars['bigint']>;
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

/** order by max() on columns of table "builds" */
export type Builds_Max_Order_By = {
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
  source_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Builds_Min_Fields = {
  __typename?: 'builds_min_fields';
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_check_id?: Maybe<Scalars['bigint']>;
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

/** order by min() on columns of table "builds" */
export type Builds_Min_Order_By = {
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
  source_type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "builds" */
export type Builds_Mutation_Response = {
  __typename?: 'builds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Builds>;
};

/** Ordering options when selecting data from "builds". */
export type Builds_Order_By = {
  build_dependency_relationships_aggregate?: InputMaybe<Build_Dependency_Relationship_Aggregate_Order_By>;
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
  resolved_manifests_aggregate?: InputMaybe<Resolved_Manifest_Aggregate_Order_By>;
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
  existing_github_check_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "builds" */
export type Builds_Sum_Order_By = {
  build_number?: InputMaybe<Order_By>;
  existing_github_check_id?: InputMaybe<Order_By>;
};

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
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
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
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
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
export type Default_Branch_BuildsFindings_AggregateArgs = {
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


/** columns and relationships of "default_branch_builds" */
export type Default_Branch_BuildsScans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Scans_Order_By>>;
  where?: InputMaybe<Scans_Bool_Exp>;
};

/** aggregated selection of "default_branch_builds" */
export type Default_Branch_Builds_Aggregate = {
  __typename?: 'default_branch_builds_aggregate';
  aggregate?: Maybe<Default_Branch_Builds_Aggregate_Fields>;
  nodes: Array<Default_Branch_Builds>;
};

/** aggregate fields of "default_branch_builds" */
export type Default_Branch_Builds_Aggregate_Fields = {
  __typename?: 'default_branch_builds_aggregate_fields';
  avg?: Maybe<Default_Branch_Builds_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Default_Branch_Builds_Max_Fields>;
  min?: Maybe<Default_Branch_Builds_Min_Fields>;
  stddev?: Maybe<Default_Branch_Builds_Stddev_Fields>;
  stddev_pop?: Maybe<Default_Branch_Builds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Default_Branch_Builds_Stddev_Samp_Fields>;
  sum?: Maybe<Default_Branch_Builds_Sum_Fields>;
  var_pop?: Maybe<Default_Branch_Builds_Var_Pop_Fields>;
  var_samp?: Maybe<Default_Branch_Builds_Var_Samp_Fields>;
  variance?: Maybe<Default_Branch_Builds_Variance_Fields>;
};


/** aggregate fields of "default_branch_builds" */
export type Default_Branch_Builds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Default_Branch_Builds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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

/** aggregate avg on columns */
export type Default_Branch_Builds_Avg_Fields = {
  __typename?: 'default_branch_builds_avg_fields';
  build_number?: Maybe<Scalars['Float']>;
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

/** aggregate max on columns */
export type Default_Branch_Builds_Max_Fields = {
  __typename?: 'default_branch_builds_max_fields';
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
  source_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Default_Branch_Builds_Min_Fields = {
  __typename?: 'default_branch_builds_min_fields';
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
  source_type?: InputMaybe<Order_By>;
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

/** aggregate stddev on columns */
export type Default_Branch_Builds_Stddev_Fields = {
  __typename?: 'default_branch_builds_stddev_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Default_Branch_Builds_Stddev_Pop_Fields = {
  __typename?: 'default_branch_builds_stddev_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Default_Branch_Builds_Stddev_Samp_Fields = {
  __typename?: 'default_branch_builds_stddev_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Stddev_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Default_Branch_Builds_Sum_Fields = {
  __typename?: 'default_branch_builds_sum_fields';
  build_number?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Sum_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Default_Branch_Builds_Var_Pop_Fields = {
  __typename?: 'default_branch_builds_var_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Var_Pop_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Default_Branch_Builds_Var_Samp_Fields = {
  __typename?: 'default_branch_builds_var_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "default_branch_builds" */
export type Default_Branch_Builds_Var_Samp_Order_By = {
  build_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Default_Branch_Builds_Variance_Fields = {
  __typename?: 'default_branch_builds_variance_fields';
  build_number?: Maybe<Scalars['Float']>;
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
  /** An object relationship */
  latest_default_build?: Maybe<Latest_Default_Builds>;
  locations: Scalars['_text'];
  matcher: Scalars['String'];
  package_name: Scalars['String'];
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
  vulnerability: Vulnerability;
  vulnerability_id: Scalars['uuid'];
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
  latest_default_build?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
  locations?: InputMaybe<_Text_Comparison_Exp>;
  matcher?: InputMaybe<String_Comparison_Exp>;
  package_name?: InputMaybe<String_Comparison_Exp>;
  purl?: InputMaybe<String_Comparison_Exp>;
  scan?: InputMaybe<Scans_Bool_Exp>;
  scan_id?: InputMaybe<Uuid_Comparison_Exp>;
  severity?: InputMaybe<Severity_Enum_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
  version_matcher?: InputMaybe<String_Comparison_Exp>;
  virtual_path?: InputMaybe<String_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Findings_Max_Fields = {
  __typename?: 'findings_max_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  dedupe_slug?: Maybe<Scalars['String']>;
  fix_state?: Maybe<Scalars['fix_state_enum']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  matcher?: Maybe<Scalars['String']>;
  package_name?: Maybe<Scalars['String']>;
  purl?: Maybe<Scalars['String']>;
  scan_id?: Maybe<Scalars['uuid']>;
  severity?: Maybe<Scalars['severity_enum']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
  version_matcher?: Maybe<Scalars['String']>;
  virtual_path?: Maybe<Scalars['String']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "findings" */
export type Findings_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dedupe_slug?: InputMaybe<Order_By>;
  fix_state?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan_id?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Findings_Min_Fields = {
  __typename?: 'findings_min_fields';
  build_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamp']>;
  dedupe_slug?: Maybe<Scalars['String']>;
  fix_state?: Maybe<Scalars['fix_state_enum']>;
  id?: Maybe<Scalars['uuid']>;
  language?: Maybe<Scalars['String']>;
  matcher?: Maybe<Scalars['String']>;
  package_name?: Maybe<Scalars['String']>;
  purl?: Maybe<Scalars['String']>;
  scan_id?: Maybe<Scalars['uuid']>;
  severity?: Maybe<Scalars['severity_enum']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
  version_matcher?: Maybe<Scalars['String']>;
  virtual_path?: Maybe<Scalars['String']>;
  vulnerability_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "findings" */
export type Findings_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dedupe_slug?: InputMaybe<Order_By>;
  fix_state?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan_id?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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
  latest_default_build?: InputMaybe<Latest_Default_Builds_Order_By>;
  locations?: InputMaybe<Order_By>;
  matcher?: InputMaybe<Order_By>;
  package_name?: InputMaybe<Order_By>;
  purl?: InputMaybe<Order_By>;
  scan?: InputMaybe<Scans_Order_By>;
  scan_id?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  version_matcher?: InputMaybe<Order_By>;
  virtual_path?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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
  VulnerabilityId = 'vulnerability_id'
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
  /** An object relationship */
  guide: Guides;
  id: Scalars['uuid'];
  /** An object relationship */
  parent_guide: Guides;
  to_guide_unique_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** order by aggregate values of table "guide_related_guides" */
export type Guide_Related_Guides_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guide_Related_Guides_Max_Order_By>;
  min?: InputMaybe<Guide_Related_Guides_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "guide_related_guides". All fields are combined with a logical 'AND'. */
export type Guide_Related_Guides_Bool_Exp = {
  _and?: InputMaybe<Array<Guide_Related_Guides_Bool_Exp>>;
  _not?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
  _or?: InputMaybe<Array<Guide_Related_Guides_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from_guide_id?: InputMaybe<Uuid_Comparison_Exp>;
  guide?: InputMaybe<Guides_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  parent_guide?: InputMaybe<Guides_Bool_Exp>;
  to_guide_unique_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "guide_related_guides" */
export type Guide_Related_Guides_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to_guide_unique_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "guide_related_guides" */
export type Guide_Related_Guides_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to_guide_unique_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "guide_related_guides". */
export type Guide_Related_Guides_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_guide_id?: InputMaybe<Order_By>;
  guide?: InputMaybe<Guides_Order_By>;
  id?: InputMaybe<Order_By>;
  parent_guide?: InputMaybe<Guides_Order_By>;
  to_guide_unique_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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

/** columns and relationships of "guide_vulnerabilities" */
export type Guide_Vulnerabilities = {
  __typename?: 'guide_vulnerabilities';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  guide: Guides;
  guide_id: Scalars['uuid'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vulnerability: Vulnerability;
  vulnerability_id: Scalars['uuid'];
};

/** order by aggregate values of table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guide_Vulnerabilities_Max_Order_By>;
  min?: InputMaybe<Guide_Vulnerabilities_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "guide_vulnerabilities". All fields are combined with a logical 'AND'. */
export type Guide_Vulnerabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Guide_Vulnerabilities_Bool_Exp>>;
  _not?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Guide_Vulnerabilities_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  guide?: InputMaybe<Guides_Bool_Exp>;
  guide_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
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

/** Ordering options when selecting data from "guide_vulnerabilities". */
export type Guide_Vulnerabilities_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guide?: InputMaybe<Guides_Order_By>;
  guide_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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

/** columns and relationships of "guides" */
export type Guides = {
  __typename?: 'guides';
  body: Scalars['String'];
  created_at: Scalars['timestamptz'];
  data_source_link: Scalars['String'];
  guide_unique_id: Scalars['String'];
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  metadata_schema_version: Scalars['Int'];
  /** An array relationship */
  related_guides: Array<Guide_Related_Guides>;
  severity: Scalars['severity_enum'];
  summary: Scalars['String'];
  tags: Scalars['_text'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "guides" */
export type GuidesGuide_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "guides" */
export type GuidesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "guides" */
export type GuidesRelated_GuidesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Related_Guides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Related_Guides_Order_By>>;
  where?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "guides". All fields are combined with a logical 'AND'. */
export type Guides_Bool_Exp = {
  _and?: InputMaybe<Array<Guides_Bool_Exp>>;
  _not?: InputMaybe<Guides_Bool_Exp>;
  _or?: InputMaybe<Array<Guides_Bool_Exp>>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data_source_link?: InputMaybe<String_Comparison_Exp>;
  guide_unique_id?: InputMaybe<String_Comparison_Exp>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  metadata_schema_version?: InputMaybe<Int_Comparison_Exp>;
  related_guides?: InputMaybe<Guide_Related_Guides_Bool_Exp>;
  severity?: InputMaybe<Severity_Enum_Comparison_Exp>;
  summary?: InputMaybe<String_Comparison_Exp>;
  tags?: InputMaybe<_Text_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "guides". */
export type Guides_Order_By = {
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  data_source_link?: InputMaybe<Order_By>;
  guide_unique_id?: InputMaybe<Order_By>;
  guide_vulnerabilities_aggregate?: InputMaybe<Guide_Vulnerabilities_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_schema_version?: InputMaybe<Order_By>;
  related_guides_aggregate?: InputMaybe<Guide_Related_Guides_Aggregate_Order_By>;
  severity?: InputMaybe<Order_By>;
  summary?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "guides" */
export enum Guides_Select_Column {
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
  vulnerability: Vulnerability;
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
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ignored_vulnerabilities" */
export enum Ignored_Vulnerabilities_Constraint {
  /** unique or primary key constraint on columns "id" */
  IgnoredVulnerabilitiesPkey = 'ignored_vulnerabilities_pkey',
  /** unique or primary key constraint on columns "project_id", "vulnerability_id" */
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
  locations?: InputMaybe<Scalars['jsonb']>;
  note?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
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
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
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

/** columns and relationships of "latest_default_builds" */
export type Latest_Default_Builds = {
  __typename?: 'latest_default_builds';
  build_number?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamp']>;
  existing_github_review_id?: Maybe<Scalars['String']>;
  git_branch?: Maybe<Scalars['String']>;
  git_hash?: Maybe<Scalars['String']>;
  git_remote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  pull_request_id?: Maybe<Scalars['String']>;
  s3_url?: Maybe<Scalars['String']>;
  source_type?: Maybe<Scalars['builds_source_type']>;
};

/** aggregated selection of "latest_default_builds" */
export type Latest_Default_Builds_Aggregate = {
  __typename?: 'latest_default_builds_aggregate';
  aggregate?: Maybe<Latest_Default_Builds_Aggregate_Fields>;
  nodes: Array<Latest_Default_Builds>;
};

/** aggregate fields of "latest_default_builds" */
export type Latest_Default_Builds_Aggregate_Fields = {
  __typename?: 'latest_default_builds_aggregate_fields';
  avg?: Maybe<Latest_Default_Builds_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Latest_Default_Builds_Max_Fields>;
  min?: Maybe<Latest_Default_Builds_Min_Fields>;
  stddev?: Maybe<Latest_Default_Builds_Stddev_Fields>;
  stddev_pop?: Maybe<Latest_Default_Builds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Latest_Default_Builds_Stddev_Samp_Fields>;
  sum?: Maybe<Latest_Default_Builds_Sum_Fields>;
  var_pop?: Maybe<Latest_Default_Builds_Var_Pop_Fields>;
  var_samp?: Maybe<Latest_Default_Builds_Var_Samp_Fields>;
  variance?: Maybe<Latest_Default_Builds_Variance_Fields>;
};


/** aggregate fields of "latest_default_builds" */
export type Latest_Default_Builds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Latest_Default_Builds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Latest_Default_Builds_Avg_Fields = {
  __typename?: 'latest_default_builds_avg_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "latest_default_builds". All fields are combined with a logical 'AND'. */
export type Latest_Default_Builds_Bool_Exp = {
  _and?: InputMaybe<Array<Latest_Default_Builds_Bool_Exp>>;
  _not?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
  _or?: InputMaybe<Array<Latest_Default_Builds_Bool_Exp>>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  existing_github_review_id?: InputMaybe<String_Comparison_Exp>;
  git_branch?: InputMaybe<String_Comparison_Exp>;
  git_hash?: InputMaybe<String_Comparison_Exp>;
  git_remote?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  pull_request_id?: InputMaybe<String_Comparison_Exp>;
  s3_url?: InputMaybe<String_Comparison_Exp>;
  source_type?: InputMaybe<Builds_Source_Type_Comparison_Exp>;
};

/** aggregate max on columns */
export type Latest_Default_Builds_Max_Fields = {
  __typename?: 'latest_default_builds_max_fields';
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

/** aggregate min on columns */
export type Latest_Default_Builds_Min_Fields = {
  __typename?: 'latest_default_builds_min_fields';
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

/** Ordering options when selecting data from "latest_default_builds". */
export type Latest_Default_Builds_Order_By = {
  build_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  existing_github_review_id?: InputMaybe<Order_By>;
  git_branch?: InputMaybe<Order_By>;
  git_hash?: InputMaybe<Order_By>;
  git_remote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  s3_url?: InputMaybe<Order_By>;
  source_type?: InputMaybe<Order_By>;
};

/** select columns of table "latest_default_builds" */
export enum Latest_Default_Builds_Select_Column {
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

/** aggregate stddev on columns */
export type Latest_Default_Builds_Stddev_Fields = {
  __typename?: 'latest_default_builds_stddev_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Latest_Default_Builds_Stddev_Pop_Fields = {
  __typename?: 'latest_default_builds_stddev_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Latest_Default_Builds_Stddev_Samp_Fields = {
  __typename?: 'latest_default_builds_stddev_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Latest_Default_Builds_Sum_Fields = {
  __typename?: 'latest_default_builds_sum_fields';
  build_number?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Latest_Default_Builds_Var_Pop_Fields = {
  __typename?: 'latest_default_builds_var_pop_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Latest_Default_Builds_Var_Samp_Fields = {
  __typename?: 'latest_default_builds_var_samp_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Latest_Default_Builds_Variance_Fields = {
  __typename?: 'latest_default_builds_variance_fields';
  build_number?: Maybe<Scalars['Float']>;
};

/** direct dependencies of builds with pointers to their location in the merkel tree table */
export type Manifest_Dependency = {
  __typename?: 'manifest_dependency';
  /** A computed field, executes function "manifest_dependency_child_edges_recursive" */
  child_edges_recursive?: Maybe<Array<Manifest_Dependency_Edge>>;
  /** An object relationship */
  manifest_dependency_node: Manifest_Dependency_Node;
  /** entrypoint to dep tree */
  manifest_dependency_node_id: Scalars['uuid'];
  manifest_id: Scalars['uuid'];
  /** An object relationship */
  resolved_manifest: Resolved_Manifest;
};


/** direct dependencies of builds with pointers to their location in the merkel tree table */
export type Manifest_DependencyChild_Edges_RecursiveArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};

/** order by aggregate values of table "manifest_dependency" */
export type Manifest_Dependency_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Manifest_Dependency_Max_Order_By>;
  min?: InputMaybe<Manifest_Dependency_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "manifest_dependency". All fields are combined with a logical 'AND'. */
export type Manifest_Dependency_Bool_Exp = {
  _and?: InputMaybe<Array<Manifest_Dependency_Bool_Exp>>;
  _not?: InputMaybe<Manifest_Dependency_Bool_Exp>;
  _or?: InputMaybe<Array<Manifest_Dependency_Bool_Exp>>;
  child_edges_recursive?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  manifest_dependency_node_id?: InputMaybe<Uuid_Comparison_Exp>;
  manifest_id?: InputMaybe<Uuid_Comparison_Exp>;
  resolved_manifest?: InputMaybe<Resolved_Manifest_Bool_Exp>;
};

/** columns and relationships of "manifest_dependency_edge" */
export type Manifest_Dependency_Edge = {
  __typename?: 'manifest_dependency_edge';
  /** An object relationship */
  child: Manifest_Dependency_Node;
  child_id: Scalars['uuid'];
  /** An object relationship */
  parent: Manifest_Dependency_Node;
  parent_id: Scalars['uuid'];
};

/** order by aggregate values of table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Manifest_Dependency_Edge_Max_Order_By>;
  min?: InputMaybe<Manifest_Dependency_Edge_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "manifest_dependency_edge". All fields are combined with a logical 'AND'. */
export type Manifest_Dependency_Edge_Bool_Exp = {
  _and?: InputMaybe<Array<Manifest_Dependency_Edge_Bool_Exp>>;
  _not?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  _or?: InputMaybe<Array<Manifest_Dependency_Edge_Bool_Exp>>;
  child?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  child_id?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Max_Order_By = {
  child_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Min_Order_By = {
  child_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "manifest_dependency_edge". */
export type Manifest_Dependency_Edge_Order_By = {
  child?: InputMaybe<Manifest_Dependency_Node_Order_By>;
  child_id?: InputMaybe<Order_By>;
  parent?: InputMaybe<Manifest_Dependency_Node_Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** select columns of table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Select_Column {
  /** column name */
  ChildId = 'child_id',
  /** column name */
  ParentId = 'parent_id'
}

/** order by max() on columns of table "manifest_dependency" */
export type Manifest_Dependency_Max_Order_By = {
  /** entrypoint to dep tree */
  manifest_dependency_node_id?: InputMaybe<Order_By>;
  manifest_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "manifest_dependency" */
export type Manifest_Dependency_Min_Order_By = {
  /** entrypoint to dep tree */
  manifest_dependency_node_id?: InputMaybe<Order_By>;
  manifest_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "manifest_dependency_node" */
export type Manifest_Dependency_Node = {
  __typename?: 'manifest_dependency_node';
  /** An array relationship */
  child_edges: Array<Manifest_Dependency_Edge>;
  /** A computed field, executes function "manifest_dependency_node_child_edges_recursive" */
  child_edges_recursive?: Maybe<Array<Manifest_Dependency_Edge>>;
  /** merkle tree hash of dependency relationship and its transitive dependencies. not a random UUID. */
  id: Scalars['uuid'];
  labels?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  parent_edges: Array<Manifest_Dependency_Edge>;
  range: Scalars['String'];
  /** An object relationship */
  release: Package_Release;
  release_id: Scalars['uuid'];
};


/** columns and relationships of "manifest_dependency_node" */
export type Manifest_Dependency_NodeChild_EdgesArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};


/** columns and relationships of "manifest_dependency_node" */
export type Manifest_Dependency_NodeChild_Edges_RecursiveArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};


/** columns and relationships of "manifest_dependency_node" */
export type Manifest_Dependency_NodeLabelsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "manifest_dependency_node" */
export type Manifest_Dependency_NodeParent_EdgesArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "manifest_dependency_node". All fields are combined with a logical 'AND'. */
export type Manifest_Dependency_Node_Bool_Exp = {
  _and?: InputMaybe<Array<Manifest_Dependency_Node_Bool_Exp>>;
  _not?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  _or?: InputMaybe<Array<Manifest_Dependency_Node_Bool_Exp>>;
  child_edges?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  child_edges_recursive?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  labels?: InputMaybe<Jsonb_Comparison_Exp>;
  parent_edges?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  range?: InputMaybe<String_Comparison_Exp>;
  release?: InputMaybe<Package_Release_Bool_Exp>;
  release_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "manifest_dependency_node". */
export type Manifest_Dependency_Node_Order_By = {
  child_edges_aggregate?: InputMaybe<Manifest_Dependency_Edge_Aggregate_Order_By>;
  child_edges_recursive_aggregate?: InputMaybe<Manifest_Dependency_Edge_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  labels?: InputMaybe<Order_By>;
  parent_edges_aggregate?: InputMaybe<Manifest_Dependency_Edge_Aggregate_Order_By>;
  range?: InputMaybe<Order_By>;
  release?: InputMaybe<Package_Release_Order_By>;
  release_id?: InputMaybe<Order_By>;
};

/** select columns of table "manifest_dependency_node" */
export enum Manifest_Dependency_Node_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Labels = 'labels',
  /** column name */
  Range = 'range',
  /** column name */
  ReleaseId = 'release_id'
}

/** Ordering options when selecting data from "manifest_dependency". */
export type Manifest_Dependency_Order_By = {
  child_edges_recursive_aggregate?: InputMaybe<Manifest_Dependency_Edge_Aggregate_Order_By>;
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Order_By>;
  manifest_dependency_node_id?: InputMaybe<Order_By>;
  manifest_id?: InputMaybe<Order_By>;
  resolved_manifest?: InputMaybe<Resolved_Manifest_Order_By>;
};

/** select columns of table "manifest_dependency" */
export enum Manifest_Dependency_Select_Column {
  /** column name */
  ManifestDependencyNodeId = 'manifest_dependency_node_id',
  /** column name */
  ManifestId = 'manifest_id'
}

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
  /** unique or primary key constraint on columns "id" */
  ManifestsPkey = 'manifests_pkey',
  /** unique or primary key constraint on columns "s3_url" */
  ManifestsS3UrlKey = 'manifests_s3_url_key'
}

/** input type for inserting data into table "manifests" */
export type Manifests_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  filename?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  s3_key?: InputMaybe<Scalars['String']>;
  s3_url?: InputMaybe<Scalars['String']>;
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

/** placeholder for update columns of table "manifests" (current role has no relevant permissions) */
export enum Manifests_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "builds" */
  delete_builds?: Maybe<Builds_Mutation_Response>;
  /** delete single row from the table: "builds" */
  delete_builds_by_pk?: Maybe<Builds>;
  /** delete data from the table: "ignored_vulnerabilities" */
  delete_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** delete single row from the table: "ignored_vulnerabilities" */
  delete_ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** delete data from the table: "project_access_tokens" */
  delete_project_access_tokens?: Maybe<Project_Access_Tokens_Mutation_Response>;
  /** delete single row from the table: "project_access_tokens" */
  delete_project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** insert data into the table: "ignored_vulnerabilities" */
  insert_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** insert a single row into the table: "ignored_vulnerabilities" */
  insert_ignored_vulnerabilities_one?: Maybe<Ignored_Vulnerabilities>;
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
  /** insert data into the table: "project_access_tokens" */
  insert_project_access_tokens?: Maybe<Project_Access_Tokens_Mutation_Response>;
  /** insert a single row into the table: "project_access_tokens" */
  insert_project_access_tokens_one?: Maybe<Project_Access_Tokens>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
  /** update data of the table: "builds" */
  update_builds?: Maybe<Builds_Mutation_Response>;
  /** update single row of the table: "builds" */
  update_builds_by_pk?: Maybe<Builds>;
  /** update data of the table: "ignored_vulnerabilities" */
  update_ignored_vulnerabilities?: Maybe<Ignored_Vulnerabilities_Mutation_Response>;
  /** update single row of the table: "ignored_vulnerabilities" */
  update_ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** update data of the table: "organization_user" */
  update_organization_user?: Maybe<Organization_User_Mutation_Response>;
  /** update single row of the table: "organization_user" */
  update_organization_user_by_pk?: Maybe<Organization_User>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "settings" */
  update_settings?: Maybe<Settings_Mutation_Response>;
  /** update single row of the table: "settings" */
  update_settings_by_pk?: Maybe<Settings>;
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
export type Mutation_RootDelete_Ignored_VulnerabilitiesArgs = {
  where: Ignored_Vulnerabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ignored_Vulnerabilities_By_PkArgs = {
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
export type Mutation_RootPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
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
export type Mutation_RootUpdate_SettingsArgs = {
  _set?: InputMaybe<Settings_Set_Input>;
  where: Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Settings_By_PkArgs = {
  _set?: InputMaybe<Settings_Set_Input>;
  pk_columns: Settings_Pk_Columns_Input;
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
  /** unique or primary key constraint on columns "id" */
  OrganizationUserPkey = 'organization_user_pkey',
  /** unique or primary key constraint on columns "user_id", "organization_id" */
  OrganizationUserUserIdOrganizationIdKey = 'organization_user_user_id_organization_id_key'
}

/** input type for inserting data into table "organization_user" */
export type Organization_User_Insert_Input = {
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['organization_user_role']>;
};

/** order by max() on columns of table "organization_user" */
export type Organization_User_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "organization_user" */
export type Organization_User_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
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
  role?: InputMaybe<Scalars['organization_user_role']>;
};

/** update columns of table "organization_user" */
export enum Organization_User_Update_Column {
  /** column name */
  Role = 'role'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  createdAt: Scalars['timestamp'];
  /** An object relationship */
  creator?: Maybe<Users>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  organization_users: Array<Organization_User>;
  /** An array relationship */
  projects: Array<Projects>;
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

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  creator?: InputMaybe<Users_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_users?: InputMaybe<Organization_User_Bool_Exp>;
  projects?: InputMaybe<Projects_Bool_Exp>;
  settings?: InputMaybe<Settings_Bool_Exp>;
  settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint on columns "github_id" */
  OrganizationsGithubIdKey = 'organizations_github_id_key',
  /** unique or primary key constraint on columns "github_node_id" */
  OrganizationsGithubNodeIdKey = 'organizations_github_node_id_key',
  /** unique or primary key constraint on columns "id" */
  OrganizationsPkey = 'organizations_pkey'
}

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  name?: InputMaybe<Scalars['String']>;
  organization_users?: InputMaybe<Organization_User_Arr_Rel_Insert_Input>;
  projects?: InputMaybe<Projects_Arr_Rel_Insert_Input>;
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
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_users_aggregate?: InputMaybe<Organization_User_Aggregate_Order_By>;
  projects_aggregate?: InputMaybe<Projects_Aggregate_Order_By>;
  settings?: InputMaybe<Settings_Order_By>;
  settings_id?: InputMaybe<Order_By>;
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

/** placeholder for update columns of table "organizations" (current role has no relevant permissions) */
export enum Organizations_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** columns and relationships of "package.package" */
export type Package = {
  __typename?: 'package';
  /** An array relationship */
  affected_by_vulnerability: Array<Vulnerability_Affected>;
  custom_registry: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  last_failed_fetch?: Maybe<Scalars['timestamptz']>;
  last_successful_fetch?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  package_manager: Scalars['package_manager'];
  /** An array relationship */
  releases: Array<Package_Release>;
  /** An aggregate relationship */
  releases_aggregate: Package_Release_Aggregate;
  upstream_data?: Maybe<Scalars['jsonb']>;
};


/** columns and relationships of "package.package" */
export type PackageAffected_By_VulnerabilityArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Affected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Affected_Order_By>>;
  where?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
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
export type PackageReleases_AggregateArgs = {
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

/** Boolean expression to filter rows from the table "package.package". All fields are combined with a logical 'AND'. */
export type Package_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Bool_Exp>>;
  _not?: InputMaybe<Package_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Bool_Exp>>;
  affected_by_vulnerability?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  custom_registry?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_failed_fetch?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_successful_fetch?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  package_manager?: InputMaybe<Package_Manager_Comparison_Exp>;
  releases?: InputMaybe<Package_Release_Bool_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
};

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

/** Ordering options when selecting data from "package.package". */
export type Package_Order_By = {
  affected_by_vulnerability_aggregate?: InputMaybe<Vulnerability_Affected_Aggregate_Order_By>;
  custom_registry?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_failed_fetch?: InputMaybe<Order_By>;
  last_successful_fetch?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  package_manager?: InputMaybe<Order_By>;
  releases_aggregate?: InputMaybe<Package_Release_Aggregate_Order_By>;
  upstream_data?: InputMaybe<Order_By>;
};

/** columns and relationships of "package.release" */
export type Package_Release = {
  __typename?: 'package_release';
  /** An array relationship */
  build_dependency_relationships: Array<Build_Dependency_Relationship>;
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  observed_time: Scalars['timestamptz'];
  /** An object relationship */
  package: Package;
  package_id: Scalars['uuid'];
  publishing_maintainer_id?: Maybe<Scalars['uuid']>;
  release_time?: Maybe<Scalars['timestamptz']>;
  upstream_data?: Maybe<Scalars['jsonb']>;
  version: Scalars['String'];
};


/** columns and relationships of "package.release" */
export type Package_ReleaseBuild_Dependency_RelationshipsArgs = {
  distinct_on?: InputMaybe<Array<Build_Dependency_Relationship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Dependency_Relationship_Order_By>>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
};


/** columns and relationships of "package.release" */
export type Package_ReleaseUpstream_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "package.release" */
export type Package_Release_Aggregate = {
  __typename?: 'package_release_aggregate';
  aggregate?: Maybe<Package_Release_Aggregate_Fields>;
  nodes: Array<Package_Release>;
};

/** aggregate fields of "package.release" */
export type Package_Release_Aggregate_Fields = {
  __typename?: 'package_release_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Package_Release_Max_Fields>;
  min?: Maybe<Package_Release_Min_Fields>;
};


/** aggregate fields of "package.release" */
export type Package_Release_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Release_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "package.release" */
export type Package_Release_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Package_Release_Max_Order_By>;
  min?: InputMaybe<Package_Release_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "package.release". All fields are combined with a logical 'AND'. */
export type Package_Release_Bool_Exp = {
  _and?: InputMaybe<Array<Package_Release_Bool_Exp>>;
  _not?: InputMaybe<Package_Release_Bool_Exp>;
  _or?: InputMaybe<Array<Package_Release_Bool_Exp>>;
  build_dependency_relationships?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
  fetched_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  observed_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  package?: InputMaybe<Package_Bool_Exp>;
  package_id?: InputMaybe<Uuid_Comparison_Exp>;
  publishing_maintainer_id?: InputMaybe<Uuid_Comparison_Exp>;
  release_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Package_Release_Max_Fields = {
  __typename?: 'package_release_max_fields';
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  observed_time?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['uuid']>;
  publishing_maintainer_id?: Maybe<Scalars['uuid']>;
  release_time?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "package.release" */
export type Package_Release_Max_Order_By = {
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_time?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Package_Release_Min_Fields = {
  __typename?: 'package_release_min_fields';
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  observed_time?: Maybe<Scalars['timestamptz']>;
  package_id?: Maybe<Scalars['uuid']>;
  publishing_maintainer_id?: Maybe<Scalars['uuid']>;
  release_time?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "package.release" */
export type Package_Release_Min_Order_By = {
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_time?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "package.release". */
export type Package_Release_Order_By = {
  build_dependency_relationships_aggregate?: InputMaybe<Build_Dependency_Relationship_Aggregate_Order_By>;
  fetched_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  observed_time?: InputMaybe<Order_By>;
  package?: InputMaybe<Package_Order_By>;
  package_id?: InputMaybe<Order_By>;
  publishing_maintainer_id?: InputMaybe<Order_By>;
  release_time?: InputMaybe<Order_By>;
  upstream_data?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "package.release" */
export enum Package_Release_Select_Column {
  /** column name */
  FetchedTime = 'fetched_time',
  /** column name */
  Id = 'id',
  /** column name */
  ObservedTime = 'observed_time',
  /** column name */
  PackageId = 'package_id',
  /** column name */
  PublishingMaintainerId = 'publishing_maintainer_id',
  /** column name */
  ReleaseTime = 'release_time',
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
  Id = 'id',
  /** column name */
  LastFailedFetch = 'last_failed_fetch',
  /** column name */
  LastSuccessfulFetch = 'last_successful_fetch',
  /** column name */
  Name = 'name',
  /** column name */
  PackageManager = 'package_manager',
  /** column name */
  UpstreamData = 'upstream_data'
}

/** columns and relationships of "project_access_tokens" */
export type Project_Access_Tokens = {
  __typename?: 'project_access_tokens';
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
  /** unique or primary key constraint on columns "access_token" */
  ProjectAccessTokensAccessTokenKey = 'project_access_tokens_access_token_key',
  /** unique or primary key constraint on columns "id" */
  ProjectAccessTokensPkey = 'project_access_tokens_pkey'
}

/** input type for inserting data into table "project_access_tokens" */
export type Project_Access_Tokens_Insert_Input = {
  access_token?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_uuid?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  created_by_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_access_tokens" */
export type Project_Access_Tokens_Min_Order_By = {
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
  created_at?: InputMaybe<Order_By>;
  created_by_user?: InputMaybe<Identities_Order_By>;
  created_by_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_uuid?: InputMaybe<Order_By>;
};

/** select columns of table "project_access_tokens" */
export enum Project_Access_Tokens_Select_Column {
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

/** placeholder for update columns of table "project_access_tokens" (current role has no relevant permissions) */
export enum Project_Access_Tokens_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
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
  /** An aggregate relationship */
  default_branch_builds_aggregate: Default_Branch_Builds_Aggregate;
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
export type ProjectsDefault_Branch_Builds_AggregateArgs = {
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
  /** unique or primary key constraint on columns "name", "organization_id" */
  ProjectsNameOrganizationIdKey = 'projects_name_organization_id_key',
  /** unique or primary key constraint on columns "id" */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Arr_Rel_Insert_Input>;
  manifests?: InputMaybe<Manifests_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  project_access_tokens?: InputMaybe<Project_Access_Tokens_Arr_Rel_Insert_Input>;
  repo?: InputMaybe<Scalars['String']>;
  reports?: InputMaybe<Project_Access_Tokens_Arr_Rel_Insert_Input>;
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
  name?: InputMaybe<Scalars['String']>;
  repo?: InputMaybe<Scalars['String']>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  Name = 'name',
  /** column name */
  Repo = 'repo'
}

export type Query_Root = {
  __typename?: 'query_root';
  authenticatedRepoCloneUrl?: Maybe<AuthenticatedRepoCloneUrlOutput>;
  /** fetch data from the table: "build_dependency_relationship" */
  build_dependency_relationship: Array<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_dependency_relationship" using primary key columns */
  build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  /** An aggregate relationship */
  default_branch_builds_aggregate: Default_Branch_Builds_Aggregate;
  fakeQueryToHackHasuraBeingABuggyMess?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
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
  /** fetch data from the table: "guides" */
  guides: Array<Guides>;
  /** fetch data from the table: "guides" using primary key columns */
  guides_by_pk?: Maybe<Guides>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** fetch data from the table: "latest_default_builds" */
  latest_default_builds: Array<Latest_Default_Builds>;
  /** fetch aggregated fields from the table: "latest_default_builds" */
  latest_default_builds_aggregate: Latest_Default_Builds_Aggregate;
  /** fetch data from the table: "manifest_dependency" */
  manifest_dependency: Array<Manifest_Dependency>;
  /** fetch data from the table: "manifest_dependency_edge" */
  manifest_dependency_edge: Array<Manifest_Dependency_Edge>;
  /** fetch data from the table: "manifest_dependency_node" */
  manifest_dependency_node: Array<Manifest_Dependency_Node>;
  /** fetch data from the table: "manifest_dependency_node" using primary key columns */
  manifest_dependency_node_by_pk?: Maybe<Manifest_Dependency_Node>;
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
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch data from the table: "package.package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package.release" */
  package_release: Array<Package_Release>;
  /** fetch aggregated fields from the table: "package.release" */
  package_release_aggregate: Package_Release_Aggregate;
  /** fetch data from the table: "package.release" using primary key columns */
  package_release_by_pk?: Maybe<Package_Release>;
  /**  get s3 presigned url for manifest upload, used by the CLI  */
  presignSbomUpload?: Maybe<SbomUploadUrlOutput>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "resolved_manifest" */
  resolved_manifest: Array<Resolved_Manifest>;
  /** fetch data from the table: "resolved_manifest" using primary key columns */
  resolved_manifest_by_pk?: Maybe<Resolved_Manifest>;
  sbomUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
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
  /** fetch data from the table: "vulnerability.range" */
  vulnerability_range: Array<Vulnerability_Range>;
  /** fetch data from the table: "vulnerability.range" using primary key columns */
  vulnerability_range_by_pk?: Maybe<Vulnerability_Range>;
  /** fetch data from the table: "vulnerability.reference" */
  vulnerability_reference: Array<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.reference" using primary key columns */
  vulnerability_reference_by_pk?: Maybe<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.severity" */
  vulnerability_severity: Array<Vulnerability_Severity>;
  /** fetch data from the table: "vulnerability.severity" using primary key columns */
  vulnerability_severity_by_pk?: Maybe<Vulnerability_Severity>;
};


export type Query_RootAuthenticatedRepoCloneUrlArgs = {
  repoGithubId: Scalars['Int'];
};


export type Query_RootBuild_Dependency_RelationshipArgs = {
  distinct_on?: InputMaybe<Array<Build_Dependency_Relationship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Dependency_Relationship_Order_By>>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
};


export type Query_RootBuild_Dependency_Relationship_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Query_RootDefault_Branch_Builds_AggregateArgs = {
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


export type Query_RootGuidesArgs = {
  distinct_on?: InputMaybe<Array<Guides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guides_Order_By>>;
  where?: InputMaybe<Guides_Bool_Exp>;
};


export type Query_RootGuides_By_PkArgs = {
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


export type Query_RootLatest_Default_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Latest_Default_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Default_Builds_Order_By>>;
  where?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
};


export type Query_RootLatest_Default_Builds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Latest_Default_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Default_Builds_Order_By>>;
  where?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
};


export type Query_RootManifest_DependencyArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Bool_Exp>;
};


export type Query_RootManifest_Dependency_EdgeArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};


export type Query_RootManifest_Dependency_NodeArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Node_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
};


export type Query_RootManifest_Dependency_Node_By_PkArgs = {
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


export type Query_RootPackage_ReleaseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Query_RootPackage_Release_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Query_RootPackage_Release_By_PkArgs = {
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


export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootResolved_ManifestArgs = {
  distinct_on?: InputMaybe<Array<Resolved_Manifest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resolved_Manifest_Order_By>>;
  where?: InputMaybe<Resolved_Manifest_Bool_Exp>;
};


export type Query_RootResolved_Manifest_By_PkArgs = {
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


export type Query_RootVulnerability_RangeArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Range_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Range_Order_By>>;
  where?: InputMaybe<Vulnerability_Range_Bool_Exp>;
};


export type Query_RootVulnerability_Range_By_PkArgs = {
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

/** columns and relationships of "resolved_manifest" */
export type Resolved_Manifest = {
  __typename?: 'resolved_manifest';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  /** A computed field, executes function "resolved_manifest_child_edges_recursive" */
  child_edges_recursive?: Maybe<Array<Manifest_Dependency_Edge>>;
  id: Scalars['uuid'];
  /** An array relationship */
  manifest_dependencies: Array<Manifest_Dependency>;
  /** path in repo of manifest file. empty string if the ecosystem does not have a manifest file. */
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "resolved_manifest" */
export type Resolved_ManifestChild_Edges_RecursiveArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};


/** columns and relationships of "resolved_manifest" */
export type Resolved_ManifestManifest_DependenciesArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Bool_Exp>;
};

/** order by aggregate values of table "resolved_manifest" */
export type Resolved_Manifest_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Resolved_Manifest_Max_Order_By>;
  min?: InputMaybe<Resolved_Manifest_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "resolved_manifest". All fields are combined with a logical 'AND'. */
export type Resolved_Manifest_Bool_Exp = {
  _and?: InputMaybe<Array<Resolved_Manifest_Bool_Exp>>;
  _not?: InputMaybe<Resolved_Manifest_Bool_Exp>;
  _or?: InputMaybe<Array<Resolved_Manifest_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  child_edges_recursive?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manifest_dependencies?: InputMaybe<Manifest_Dependency_Bool_Exp>;
  path?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "resolved_manifest" */
export type Resolved_Manifest_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** path in repo of manifest file. empty string if the ecosystem does not have a manifest file. */
  path?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "resolved_manifest" */
export type Resolved_Manifest_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** path in repo of manifest file. empty string if the ecosystem does not have a manifest file. */
  path?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "resolved_manifest". */
export type Resolved_Manifest_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  child_edges_recursive_aggregate?: InputMaybe<Manifest_Dependency_Edge_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependencies_aggregate?: InputMaybe<Manifest_Dependency_Aggregate_Order_By>;
  path?: InputMaybe<Order_By>;
};

/** select columns of table "resolved_manifest" */
export enum Resolved_Manifest_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  Id = 'id',
  /** column name */
  Path = 'path'
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
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
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


/** An individual time a scan was run on a build */
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

/** response of any mutation on the table "settings" */
export type Settings_Mutation_Response = {
  __typename?: 'settings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Settings>;
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
  PrCheckEnabled = 'pr_check_enabled',
  /** column name */
  PrFeedbackDisabled = 'pr_feedback_disabled'
}

/** input type for updating data in table "settings" */
export type Settings_Set_Input = {
  pr_check_enabled?: InputMaybe<Scalars['Boolean']>;
  pr_feedback_disabled?: InputMaybe<Scalars['Boolean']>;
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
  /** fetch data from the table: "build_dependency_relationship" */
  build_dependency_relationship: Array<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_dependency_relationship" using primary key columns */
  build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  /** An aggregate relationship */
  default_branch_builds_aggregate: Default_Branch_Builds_Aggregate;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
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
  /** fetch data from the table: "guides" */
  guides: Array<Guides>;
  /** fetch data from the table: "guides" using primary key columns */
  guides_by_pk?: Maybe<Guides>;
  /** fetch data from the table: "identities" */
  identities: Array<Identities>;
  /** fetch data from the table: "identities" using primary key columns */
  identities_by_pk?: Maybe<Identities>;
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  /** fetch data from the table: "ignored_vulnerabilities" using primary key columns */
  ignored_vulnerabilities_by_pk?: Maybe<Ignored_Vulnerabilities>;
  /** fetch data from the table: "latest_default_builds" */
  latest_default_builds: Array<Latest_Default_Builds>;
  /** fetch aggregated fields from the table: "latest_default_builds" */
  latest_default_builds_aggregate: Latest_Default_Builds_Aggregate;
  /** fetch data from the table: "manifest_dependency" */
  manifest_dependency: Array<Manifest_Dependency>;
  /** fetch data from the table: "manifest_dependency_edge" */
  manifest_dependency_edge: Array<Manifest_Dependency_Edge>;
  /** fetch data from the table: "manifest_dependency_node" */
  manifest_dependency_node: Array<Manifest_Dependency_Node>;
  /** fetch data from the table: "manifest_dependency_node" using primary key columns */
  manifest_dependency_node_by_pk?: Maybe<Manifest_Dependency_Node>;
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
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch data from the table: "package.package" using primary key columns */
  package_by_pk?: Maybe<Package>;
  /** fetch data from the table: "package.release" */
  package_release: Array<Package_Release>;
  /** fetch aggregated fields from the table: "package.release" */
  package_release_aggregate: Package_Release_Aggregate;
  /** fetch data from the table: "package.release" using primary key columns */
  package_release_by_pk?: Maybe<Package_Release>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "resolved_manifest" */
  resolved_manifest: Array<Resolved_Manifest>;
  /** fetch data from the table: "resolved_manifest" using primary key columns */
  resolved_manifest_by_pk?: Maybe<Resolved_Manifest>;
  /** An array relationship */
  scans: Array<Scans>;
  /** An aggregate relationship */
  scans_aggregate: Scans_Aggregate;
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
  /** fetch data from the table: "vulnerability.range" */
  vulnerability_range: Array<Vulnerability_Range>;
  /** fetch data from the table: "vulnerability.range" using primary key columns */
  vulnerability_range_by_pk?: Maybe<Vulnerability_Range>;
  /** fetch data from the table: "vulnerability.reference" */
  vulnerability_reference: Array<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.reference" using primary key columns */
  vulnerability_reference_by_pk?: Maybe<Vulnerability_Reference>;
  /** fetch data from the table: "vulnerability.severity" */
  vulnerability_severity: Array<Vulnerability_Severity>;
  /** fetch data from the table: "vulnerability.severity" using primary key columns */
  vulnerability_severity_by_pk?: Maybe<Vulnerability_Severity>;
};


export type Subscription_RootBuild_Dependency_RelationshipArgs = {
  distinct_on?: InputMaybe<Array<Build_Dependency_Relationship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Dependency_Relationship_Order_By>>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
};


export type Subscription_RootBuild_Dependency_Relationship_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Subscription_RootDefault_Branch_Builds_AggregateArgs = {
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


export type Subscription_RootGuidesArgs = {
  distinct_on?: InputMaybe<Array<Guides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guides_Order_By>>;
  where?: InputMaybe<Guides_Bool_Exp>;
};


export type Subscription_RootGuides_By_PkArgs = {
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


export type Subscription_RootLatest_Default_BuildsArgs = {
  distinct_on?: InputMaybe<Array<Latest_Default_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Default_Builds_Order_By>>;
  where?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
};


export type Subscription_RootLatest_Default_Builds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Latest_Default_Builds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Latest_Default_Builds_Order_By>>;
  where?: InputMaybe<Latest_Default_Builds_Bool_Exp>;
};


export type Subscription_RootManifest_DependencyArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Bool_Exp>;
};


export type Subscription_RootManifest_Dependency_EdgeArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Edge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Edge_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};


export type Subscription_RootManifest_Dependency_NodeArgs = {
  distinct_on?: InputMaybe<Array<Manifest_Dependency_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Manifest_Dependency_Node_Order_By>>;
  where?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
};


export type Subscription_RootManifest_Dependency_Node_By_PkArgs = {
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


export type Subscription_RootPackage_ReleaseArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Subscription_RootPackage_Release_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Package_Release_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Package_Release_Order_By>>;
  where?: InputMaybe<Package_Release_Bool_Exp>;
};


export type Subscription_RootPackage_Release_By_PkArgs = {
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


export type Subscription_RootResolved_ManifestArgs = {
  distinct_on?: InputMaybe<Array<Resolved_Manifest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resolved_Manifest_Order_By>>;
  where?: InputMaybe<Resolved_Manifest_Bool_Exp>;
};


export type Subscription_RootResolved_Manifest_By_PkArgs = {
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


export type Subscription_RootVulnerability_RangeArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Range_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Range_Order_By>>;
  where?: InputMaybe<Vulnerability_Range_Bool_Exp>;
};


export type Subscription_RootVulnerability_Range_By_PkArgs = {
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
  github_node_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kratos_id?: InputMaybe<Uuid_Comparison_Exp>;
  kratos_identity?: InputMaybe<Identities_Bool_Exp>;
  role?: InputMaybe<User_Role_Comparison_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  github_node_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kratos_id?: InputMaybe<Order_By>;
  kratos_identity?: InputMaybe<Identities_Order_By>;
  role?: InputMaybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  GithubNodeId = 'github_node_id',
  /** column name */
  Id = 'id',
  /** column name */
  KratosId = 'kratos_id',
  /** column name */
  Role = 'role'
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

/** columns and relationships of "vulnerability.vulnerability" */
export type Vulnerability = {
  __typename?: 'vulnerability';
  /** An array relationship */
  affected: Array<Vulnerability_Affected>;
  /** An array relationship */
  credits: Array<Vulnerability_Credit>;
  cvss_score?: Maybe<Scalars['Float']>;
  database_specific?: Maybe<Scalars['jsonb']>;
  details?: Maybe<Scalars['String']>;
  /** An array relationship */
  equivalents: Array<Vulnerability_Equivalent>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An aggregate relationship */
  findings_aggregate: Findings_Aggregate;
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
  id: Scalars['uuid'];
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  modified: Scalars['timestamptz'];
  published?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  references: Array<Vulnerability_Reference>;
  reviewed_by_source?: Maybe<Scalars['Boolean']>;
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
export type VulnerabilityFindingsArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityFindings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Findings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Findings_Order_By>>;
  where?: InputMaybe<Findings_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityGuide_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Guide_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guide_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
};


/** columns and relationships of "vulnerability.vulnerability" */
export type VulnerabilityIgnored_VulnerabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Ignored_Vulnerabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ignored_Vulnerabilities_Order_By>>;
  where?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
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
  package: Package;
  package_id: Scalars['uuid'];
  /** An array relationship */
  ranges: Array<Vulnerability_Range>;
  /** An object relationship */
  vulnerability: Vulnerability;
  vulnerability_id: Scalars['uuid'];
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


/** columns and relationships of "vulnerability.affected" */
export type Vulnerability_AffectedRangesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Range_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Range_Order_By>>;
  where?: InputMaybe<Vulnerability_Range_Bool_Exp>;
};

/** order by aggregate values of table "vulnerability.affected" */
export type Vulnerability_Affected_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Affected_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Affected_Min_Order_By>;
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
  ranges?: InputMaybe<Vulnerability_Range_Bool_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
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

/** Ordering options when selecting data from "vulnerability.affected". */
export type Vulnerability_Affected_Order_By = {
  affected_range_events_aggregate?: InputMaybe<Vulnerability_Affected_Range_Event_Aggregate_Order_By>;
  affected_versions_aggregate?: InputMaybe<Vulnerability_Affected_Version_Aggregate_Order_By>;
  database_specific?: InputMaybe<Order_By>;
  ecosystem_specific?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  package?: InputMaybe<Package_Order_By>;
  package_id?: InputMaybe<Order_By>;
  ranges_aggregate?: InputMaybe<Vulnerability_Range_Aggregate_Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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

/** order by max() on columns of table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Max_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.affected_range_event" */
export type Vulnerability_Affected_Range_Event_Min_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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

/** Ordering options when selecting data from "vulnerability.affected_version". */
export type Vulnerability_Affected_Version_Order_By = {
  affected?: InputMaybe<Vulnerability_Affected_Order_By>;
  affected_id?: InputMaybe<Order_By>;
  database_specific?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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

/** Boolean expression to filter rows from the table "vulnerability.vulnerability". All fields are combined with a logical 'AND'. */
export type Vulnerability_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Bool_Exp>>;
  affected?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  credits?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
  cvss_score?: InputMaybe<Float_Comparison_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  modified?: InputMaybe<Timestamptz_Comparison_Exp>;
  published?: InputMaybe<Timestamptz_Comparison_Exp>;
  references?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
  reviewed_by_source?: InputMaybe<Boolean_Comparison_Exp>;
  severities?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
  source_id?: InputMaybe<String_Comparison_Exp>;
  summary?: InputMaybe<String_Comparison_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
  withdrawn?: InputMaybe<Timestamptz_Comparison_Exp>;
};

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

/** Ordering options when selecting data from "vulnerability.credit". */
export type Vulnerability_Credit_Order_By = {
  contact?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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

/** columns and relationships of "vulnerability.equivalent" */
export type Vulnerability_Equivalent = {
  __typename?: 'vulnerability_equivalent';
  a: Scalars['uuid'];
  b: Scalars['uuid'];
  /** An object relationship */
  equivalent_vulnerability: Vulnerability;
  /** An object relationship */
  vulnerability: Vulnerability;
};

/** order by aggregate values of table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Equivalent_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Equivalent_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "vulnerability.equivalent". All fields are combined with a logical 'AND'. */
export type Vulnerability_Equivalent_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Equivalent_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Equivalent_Bool_Exp>>;
  a?: InputMaybe<Uuid_Comparison_Exp>;
  b?: InputMaybe<Uuid_Comparison_Exp>;
  equivalent_vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
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

/** Ordering options when selecting data from "vulnerability.equivalent". */
export type Vulnerability_Equivalent_Order_By = {
  a?: InputMaybe<Order_By>;
  b?: InputMaybe<Order_By>;
  equivalent_vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
};

/** select columns of table "vulnerability.equivalent" */
export enum Vulnerability_Equivalent_Select_Column {
  /** column name */
  A = 'a',
  /** column name */
  B = 'b'
}

/** Ordering options when selecting data from "vulnerability.vulnerability". */
export type Vulnerability_Order_By = {
  affected_aggregate?: InputMaybe<Vulnerability_Affected_Aggregate_Order_By>;
  credits_aggregate?: InputMaybe<Vulnerability_Credit_Aggregate_Order_By>;
  cvss_score?: InputMaybe<Order_By>;
  database_specific?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  equivalents_aggregate?: InputMaybe<Vulnerability_Equivalent_Aggregate_Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  guide_vulnerabilities_aggregate?: InputMaybe<Guide_Vulnerabilities_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  ignored_vulnerabilities_aggregate?: InputMaybe<Ignored_Vulnerabilities_Aggregate_Order_By>;
  modified?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  references_aggregate?: InputMaybe<Vulnerability_Reference_Aggregate_Order_By>;
  reviewed_by_source?: InputMaybe<Order_By>;
  severities_aggregate?: InputMaybe<Vulnerability_Severity_Aggregate_Order_By>;
  source?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  summary?: InputMaybe<Order_By>;
  upstream_data?: InputMaybe<Order_By>;
  withdrawn?: InputMaybe<Order_By>;
};

/** columns and relationships of "vulnerability.range" */
export type Vulnerability_Range = {
  __typename?: 'vulnerability_range';
  /** An object relationship */
  affected: Vulnerability_Affected;
  affected_id: Scalars['uuid'];
  fixed?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  introduced?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "vulnerability.range" */
export type Vulnerability_Range_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Range_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Range_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "vulnerability.range". All fields are combined with a logical 'AND'. */
export type Vulnerability_Range_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Range_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Range_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Range_Bool_Exp>>;
  affected?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  affected_id?: InputMaybe<Uuid_Comparison_Exp>;
  fixed?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  introduced?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "vulnerability.range" */
export type Vulnerability_Range_Max_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  fixed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  introduced?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.range" */
export type Vulnerability_Range_Min_Order_By = {
  affected_id?: InputMaybe<Order_By>;
  fixed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  introduced?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "vulnerability.range". */
export type Vulnerability_Range_Order_By = {
  affected?: InputMaybe<Vulnerability_Affected_Order_By>;
  affected_id?: InputMaybe<Order_By>;
  fixed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  introduced?: InputMaybe<Order_By>;
};

/** select columns of table "vulnerability.range" */
export enum Vulnerability_Range_Select_Column {
  /** column name */
  AffectedId = 'affected_id',
  /** column name */
  Fixed = 'fixed',
  /** column name */
  Id = 'id',
  /** column name */
  Introduced = 'introduced'
}

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

/** order by max() on columns of table "vulnerability.reference" */
export type Vulnerability_Reference_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.reference" */
export type Vulnerability_Reference_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "vulnerability.reference". */
export type Vulnerability_Reference_Order_By = {
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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

/** select columns of table "vulnerability.vulnerability" */
export enum Vulnerability_Select_Column {
  /** column name */
  CvssScore = 'cvss_score',
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
  ReviewedBySource = 'reviewed_by_source',
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

/** Ordering options when selecting data from "vulnerability.severity". */
export type Vulnerability_Severity_Order_By = {
  id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
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

export type DeleteProjectAccessTokenMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteProjectAccessTokenMutation = { __typename?: 'mutation_root', delete_project_access_tokens_by_pk?: { __typename?: 'project_access_tokens', id: any } | null };

export type GetAllGuidesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGuidesQuery = { __typename?: 'query_root', guides: Array<{ __typename?: 'guides', created_at: any, id: any, metadata: any, metadata_schema_version: number, severity: any, summary: string, tags: any, title: string, guide_unique_id: string, updated_at: any }> };

export type GetBuildDetailsQueryVariables = Exact<{
  build_id: Scalars['uuid'];
  project_id: Scalars['uuid'];
}>;


export type GetBuildDetailsQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', build_number?: number | null, created_at: any, git_branch?: string | null, git_hash?: string | null, git_remote?: string | null, id: any, source_type: any, project_id?: any | null, resolved_manifests: Array<{ __typename?: 'resolved_manifest', id: any, path?: string | null, child_edges_recursive?: Array<{ __typename?: 'manifest_dependency_edge', parent_id: any, child_id: any, child: { __typename?: 'manifest_dependency_node', id: any, range: string, labels?: any | null, release_id: any, release: { __typename?: 'package_release', id: any, fetched_time?: any | null, version: string, package: { __typename?: 'package', name: string, last_successful_fetch?: any | null, package_manager: any, affected_by_vulnerability: Array<{ __typename?: 'vulnerability_affected', vulnerability: { __typename?: 'vulnerability', id: any, source_id: string, source: string }, ranges: Array<{ __typename?: 'vulnerability_range', introduced?: string | null, fixed?: string | null }> }> } } } }> | null }>, project?: { __typename?: 'projects', name: string, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', id: any, creator_id?: any | null, locations: any, note: string, project_id: any, vulnerability_id: any }> } | null, scans: Array<{ __typename?: 'scans', created_at: any, db_date: any, distro_name: string, distro_version: string, grype_version: string, id: any, scan_number?: number | null, source_type: string, target: string }>, scans_aggregate: { __typename?: 'scans_aggregate', aggregate?: { __typename?: 'scans_aggregate_fields', count: number } | null }, findings: Array<{ __typename?: 'findings', fix_state: any, fix_versions?: any | null, package_name: string, created_at: any, id: any, language: string, locations: any, matcher: string, purl: string, severity: any, type: string, version: string, updated_at: any, version_matcher: string, virtual_path?: string | null, vulnerability_id: any, vulnerability: { __typename?: 'vulnerability', id: any, summary?: string | null, source: string, source_id: string, cvss_score?: number | null, severities: Array<{ __typename?: 'vulnerability_severity', id: any, source: string, type: string, score: string }>, affected: Array<{ __typename?: 'vulnerability_affected', package: { __typename?: 'package', name: string, package_manager: any }, affected_range_events: Array<{ __typename?: 'vulnerability_affected_range_event', type: any, event: string, version: string }> }>, guide_vulnerabilities: Array<{ __typename?: 'guide_vulnerabilities', guide: { __typename?: 'guides', id: any, body: string, metadata: any, title: string, severity: any, summary: string, created_at: any, metadata_schema_version: number, related_guides: Array<{ __typename?: 'guide_related_guides', guide: { __typename?: 'guides', title: string, summary: string, id: any } }> } }>, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', creator_id?: any | null, id: any, locations: any, note: string, project_id: any, vulnerability_id: any }> } }> } | null };

export type GetCurrentUserInfoQueryVariables = Exact<{
  kratos_id: Scalars['uuid'];
}>;


export type GetCurrentUserInfoQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', role: any }> };

export type GetGuideDetailsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetGuideDetailsQuery = { __typename?: 'query_root', guides_by_pk?: { __typename?: 'guides', id: any, body: string, metadata: any, severity: any, title: string, summary: string, created_at: any, metadata_schema_version: number, guide_vulnerabilities: Array<{ __typename?: 'guide_vulnerabilities', vulnerability: { __typename?: 'vulnerability', id: any, source: string, source_id: string } }>, related_guides: Array<{ __typename?: 'guide_related_guides', guide: { __typename?: 'guides', title: string, summary: string, id: any } }> } | null };

export type GetLunaTraceOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLunaTraceOrganizationsQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any, name: string }> };

export type GetLunaTraceUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLunaTraceUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, kratos_id?: any | null, kratos_identity?: { __typename?: 'identities', traits: any } | null }> };

export type GetManifestQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetManifestQuery = { __typename?: 'query_root', manifests_by_pk?: { __typename?: 'manifests', build_id?: any | null, project_id: any, status?: string | null, message?: string | null } | null };

export type GetProjectQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  build_limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetProjectQuery = { __typename?: 'query_root', projects_by_pk?: { __typename?: 'projects', created_at: any, id: any, name: string, organization_id?: any | null, repo?: string | null, settings_id: any, settings: { __typename?: 'settings', id: any, pr_feedback_disabled?: boolean | null, pr_check_enabled?: boolean | null }, organization?: { __typename?: 'organizations', name: string } | null, github_repository?: { __typename?: 'github_repositories', git_url: string, github_id?: number | null, default_branch?: string | null, traits: any } | null, project_access_tokens: Array<{ __typename?: 'project_access_tokens', id: any, project_uuid: any, name?: string | null, created_at: any, last_used?: any | null, created_by_user?: { __typename?: 'identities', traits: any } | null }>, builds: Array<{ __typename?: 'builds', id: any, created_at: any, build_number?: number | null, project_id?: any | null, source_type: any, git_branch?: string | null, git_hash?: string | null, git_remote?: string | null, findings: Array<{ __typename?: 'findings', language: string, purl: string, severity: any, locations: any, vulnerability: { __typename?: 'vulnerability', severities: Array<{ __typename?: 'vulnerability_severity', id: any, source: string, type: string, score: string }>, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', locations: any }> } }>, scans_aggregate: { __typename?: 'scans_aggregate', aggregate?: { __typename?: 'scans_aggregate_fields', count: number } | null }, scans: Array<{ __typename?: 'scans', created_at: any, scan_number?: number | null }> }>, builds_aggregate: { __typename?: 'builds_aggregate', aggregate?: { __typename?: 'builds_aggregate_fields', count: number } | null }, default_branch_builds: Array<{ __typename?: 'default_branch_builds', build_number?: number | null, created_at?: any | null, git_branch?: string | null, git_hash?: string | null, git_remote?: string | null, id?: any | null, source_type?: any | null, project_id?: any | null, scans: Array<{ __typename?: 'scans', created_at: any, scan_number?: number | null }>, project?: { __typename?: 'projects', name: string, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', id: any, creator_id?: any | null, locations: any, note: string, project_id: any, vulnerability_id: any }> } | null, findings: Array<{ __typename?: 'findings', fix_state: any, fix_versions?: any | null, package_name: string, created_at: any, id: any, language: string, locations: any, matcher: string, purl: string, severity: any, type: string, version: string, updated_at: any, version_matcher: string, virtual_path?: string | null, vulnerability_id: any, vulnerability: { __typename?: 'vulnerability', id: any, summary?: string | null, source: string, source_id: string, severities: Array<{ __typename?: 'vulnerability_severity', id: any, source: string, type: string, score: string }>, guide_vulnerabilities: Array<{ __typename?: 'guide_vulnerabilities', guide: { __typename?: 'guides', id: any, body: string, metadata: any, title: string, severity: any, summary: string, created_at: any, metadata_schema_version: number, related_guides: Array<{ __typename?: 'guide_related_guides', guide: { __typename?: 'guides', title: string, summary: string, id: any } }> } }>, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', creator_id?: any | null, id: any, locations: any, note: string, project_id: any, vulnerability_id: any }> } }> }> } | null };

export type GetProjectCloneUrlQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type GetProjectCloneUrlQuery = { __typename?: 'query_root', projects_by_pk?: { __typename?: 'projects', github_repository?: { __typename?: 'github_repositories', authenticated_clone_url?: { __typename?: 'AuthenticatedRepoCloneUrlOutput', url?: string | null } | null } | null } | null };

export type GetSbomUrlQueryVariables = Exact<{
  build_id: Scalars['uuid'];
}>;


export type GetSbomUrlQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', s3_url_signed?: string | null } | null };

export type GetSidebarInfoQueryVariables = Exact<{
  kratos_id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetSidebarInfoQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', name: string, id: any, created_at: any, builds: Array<{ __typename?: 'builds', id: any, build_number?: number | null }> }>, organizations: Array<{ __typename?: 'organizations', name: string, id: any, createdAt: any, projects: Array<{ __typename?: 'projects', name: string, id: any, created_at: any, github_repository?: { __typename?: 'github_repositories', id: any } | null, builds: Array<{ __typename?: 'builds', id: any, build_number?: number | null }> }> }> };

export type SearchVulnerabilitiesQueryVariables = Exact<{
  search: Scalars['String'];
  source?: InputMaybe<String_Comparison_Exp>;
  order_by?: InputMaybe<Array<Vulnerability_Order_By> | Vulnerability_Order_By>;
  limit: Scalars['Int'];
}>;


export type SearchVulnerabilitiesQuery = { __typename?: 'query_root', vulnerability: Array<{ __typename?: 'vulnerability', database_specific?: any | null, details?: string | null, source: string, source_id: string, summary?: string | null, withdrawn?: any | null, published?: any | null, modified: any, id: any, affected: Array<{ __typename?: 'vulnerability_affected', database_specific?: any | null, ecosystem_specific?: any | null, id: any, package: { __typename?: 'package', name: string, id: any }, affected_range_events: Array<{ __typename?: 'vulnerability_affected_range_event', database_specific?: any | null, event: string, id: any, type: any, version: string }> }>, severities: Array<{ __typename?: 'vulnerability_severity', id: any, score: string, source: string, type: string }> }> };

export type GetVulnerabilityDetailsQueryVariables = Exact<{
  vulnerability_id: Scalars['uuid'];
}>;


export type GetVulnerabilityDetailsQuery = { __typename?: 'query_root', vulnerability_by_pk?: { __typename?: 'vulnerability', database_specific?: any | null, details?: string | null, source: string, source_id: string, summary?: string | null, withdrawn?: any | null, published?: any | null, modified: any, id: any, affected: Array<{ __typename?: 'vulnerability_affected', database_specific?: any | null, ecosystem_specific?: any | null, id: any, package: { __typename?: 'package', name: string, package_manager: any, id: any }, affected_range_events: Array<{ __typename?: 'vulnerability_affected_range_event', database_specific?: any | null, event: string, id: any, type: any, version: string }>, affected_versions: Array<{ __typename?: 'vulnerability_affected_version', database_specific?: any | null, id: any, version: string }> }>, equivalents: Array<{ __typename?: 'vulnerability_equivalent', equivalent_vulnerability: { __typename?: 'vulnerability', id: any, source: string, source_id: string, summary?: string | null, severities: Array<{ __typename?: 'vulnerability_severity', id: any, type: string, score: string, source: string }> } }>, findings: Array<{ __typename?: 'findings', id: any, build_id: any, default_branch_build?: { __typename?: 'default_branch_builds', id?: any | null, build_number?: number | null, created_at?: any | null, project_id?: any | null, project?: { __typename?: 'projects', name: string, id: any } | null } | null }>, references: Array<{ __typename?: 'vulnerability_reference', id: any, type: any, url: string }>, severities: Array<{ __typename?: 'vulnerability_severity', id: any, score: string, source: string, type: string }> } | null };

export type InsertNewOrgUserMutationVariables = Exact<{
  organization_id: Scalars['uuid'];
}>;


export type InsertNewOrgUserMutation = { __typename?: 'mutation_root', insert_organization_user_one?: { __typename?: 'organization_user', id: any } | null };

export type InsertPersonalProjectAndOrgMutationVariables = Exact<{ [key: string]: never; }>;


export type InsertPersonalProjectAndOrgMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any, projects: Array<{ __typename?: 'projects', id: any }> } | null };

export type InsertProjectAccessTokenMutationVariables = Exact<{
  access_token: Scalars['uuid'];
  name: Scalars['String'];
  project_uuid: Scalars['uuid'];
}>;


export type InsertProjectAccessTokenMutation = { __typename?: 'mutation_root', insert_project_access_tokens_one?: { __typename?: 'project_access_tokens', id: any } | null };

export type InsertIgnoredVulnerabilitiesMutationVariables = Exact<{
  objects: Array<Ignored_Vulnerabilities_Insert_Input> | Ignored_Vulnerabilities_Insert_Input;
}>;


export type InsertIgnoredVulnerabilitiesMutation = { __typename?: 'mutation_root', insert_ignored_vulnerabilities?: { __typename?: 'ignored_vulnerabilities_mutation_response', affected_rows: number } | null };

export type InsertManifestMutationVariables = Exact<{
  s3_url: Scalars['String'];
  project_id: Scalars['uuid'];
  filename: Scalars['String'];
  key: Scalars['String'];
}>;


export type InsertManifestMutation = { __typename?: 'mutation_root', insert_manifests_one?: { __typename?: 'manifests', id: any } | null };

export type InsertProjectMutationVariables = Exact<{
  name: Scalars['String'];
  organization_id: Scalars['uuid'];
}>;


export type InsertProjectMutation = { __typename?: 'mutation_root', insert_projects_one?: { __typename?: 'projects', id: any } | null };

export type PresignManifestUrlMutationVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type PresignManifestUrlMutation = { __typename?: 'mutation_root', presignManifestUpload?: { __typename?: 'PresignedUrlResponse', url: string, headers: any, key: string, bucket: string } | null };

export type UpdateSettingsMutationVariables = Exact<{
  id: Scalars['uuid'];
  settings: Settings_Set_Input;
}>;


export type UpdateSettingsMutation = { __typename?: 'mutation_root', update_settings_by_pk?: { __typename?: 'settings', id: any } | null };


export const DeleteProjectAccessTokenDocument = `
    mutation DeleteProjectAccessToken($id: uuid!) {
  delete_project_access_tokens_by_pk(id: $id) {
    id
  }
}
    `;
export const GetAllGuidesDocument = `
    query GetAllGuides {
  guides(order_by: {created_at: desc}) {
    created_at
    id
    metadata
    metadata_schema_version
    severity
    summary
    tags
    title
    guide_unique_id
    updated_at
  }
}
    `;
export const GetBuildDetailsDocument = `
    query GetBuildDetails($build_id: uuid!, $project_id: uuid!) {
  builds_by_pk(id: $build_id) {
    build_number
    created_at
    git_branch
    git_hash
    git_remote
    id
    source_type
    project_id
    resolved_manifests {
      id
      path
      child_edges_recursive {
        parent_id
        child_id
        child {
          id
          range
          labels
          release_id
          release {
            id
            fetched_time
            version
            package {
              name
              last_successful_fetch
              package_manager
              affected_by_vulnerability {
                vulnerability {
                  id
                  source_id
                  source
                }
                ranges {
                  introduced
                  fixed
                }
              }
            }
          }
        }
      }
    }
    project {
      name
      ignored_vulnerabilities {
        id
        creator_id
        locations
        note
        project_id
        vulnerability_id
      }
    }
    scans(order_by: {created_at: asc}) {
      created_at
      db_date
      distro_name
      distro_version
      grype_version
      id
      scan_number
      source_type
      target
    }
    scans_aggregate {
      aggregate {
        count
      }
    }
    findings {
      fix_state
      fix_versions
      package_name
      created_at
      id
      language
      locations
      matcher
      purl
      severity
      type
      version
      updated_at
      version_matcher
      virtual_path
      vulnerability_id
      vulnerability {
        id
        summary
        source
        source_id
        cvss_score
        severities {
          id
          source
          type
          score
        }
        affected {
          package {
            name
            package_manager
          }
          affected_range_events {
            type
            event
            version
          }
        }
        guide_vulnerabilities {
          guide {
            id
            body
            metadata
            title
            severity
            summary
            created_at
            metadata_schema_version
            related_guides {
              guide {
                title
                summary
                id
              }
            }
          }
        }
        ignored_vulnerabilities(where: {project_id: {_eq: $project_id}}) {
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
export const GetCurrentUserInfoDocument = `
    query GetCurrentUserInfo($kratos_id: uuid!) {
  users(where: {kratos_id: {_eq: $kratos_id}}) {
    role
  }
}
    `;
export const GetGuideDetailsDocument = `
    query GetGuideDetails($id: uuid!) {
  guides_by_pk(id: $id) {
    id
    body
    metadata
    severity
    title
    summary
    created_at
    metadata_schema_version
    guide_vulnerabilities {
      vulnerability {
        id
        source
        source_id
      }
    }
    related_guides {
      guide {
        title
        summary
        id
      }
    }
  }
}
    `;
export const GetLunaTraceOrganizationsDocument = `
    query GetLunaTraceOrganizations {
  organizations {
    id
    name
  }
}
    `;
export const GetLunaTraceUsersDocument = `
    query GetLunaTraceUsers {
  users {
    id
    kratos_id
    kratos_identity {
      traits
    }
  }
}
    `;
export const GetManifestDocument = `
    query GetManifest($id: uuid = "") {
  manifests_by_pk(id: $id) {
    build_id
    project_id
    status
    message
  }
}
    `;
export const GetProjectDocument = `
    query GetProject($project_id: uuid!, $build_limit: Int = 10) {
  projects_by_pk(id: $project_id) {
    created_at
    id
    name
    organization_id
    repo
    settings_id
    settings {
      id
      pr_feedback_disabled
      pr_check_enabled
    }
    organization {
      name
    }
    github_repository {
      git_url
      github_id
      default_branch
      traits
    }
    project_access_tokens {
      id
      project_uuid
      name
      created_at
      last_used
      created_by_user {
        traits
      }
    }
    builds(order_by: {created_at: desc}, limit: $build_limit) {
      id
      created_at
      build_number
      project_id
      source_type
      findings {
        language
        purl
        severity
        locations
        vulnerability {
          severities {
            id
            source
            type
            score
          }
          ignored_vulnerabilities(where: {project_id: {_eq: $project_id}}) {
            locations
          }
        }
      }
      scans_aggregate {
        aggregate {
          count
        }
      }
      scans(limit: 1, order_by: {created_at: desc}) {
        created_at
        scan_number
      }
      git_branch
      git_hash
      git_remote
    }
    builds_aggregate {
      aggregate {
        count
      }
    }
    default_branch_builds(limit: 1, order_by: {build_number: desc}) {
      build_number
      created_at
      git_branch
      git_hash
      git_remote
      id
      source_type
      project_id
      scans(limit: 1, order_by: {created_at: desc}) {
        created_at
        scan_number
      }
      project {
        name
        ignored_vulnerabilities {
          id
          creator_id
          locations
          note
          project_id
          vulnerability_id
        }
      }
      findings {
        fix_state
        fix_versions
        package_name
        created_at
        id
        language
        locations
        matcher
        purl
        severity
        type
        version
        updated_at
        version_matcher
        virtual_path
        vulnerability_id
        vulnerability {
          id
          summary
          source
          source_id
          severities {
            id
            source
            type
            score
          }
          guide_vulnerabilities {
            guide {
              id
              body
              metadata
              title
              severity
              summary
              created_at
              metadata_schema_version
              related_guides {
                guide {
                  title
                  summary
                  id
                }
              }
            }
          }
          ignored_vulnerabilities(where: {project_id: {_eq: $project_id}}) {
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
}
    `;
export const GetProjectCloneUrlDocument = `
    query GetProjectCloneUrl($project_id: uuid!) {
  projects_by_pk(id: $project_id) {
    github_repository {
      authenticated_clone_url {
        url
      }
    }
  }
}
    `;
export const GetSbomUrlDocument = `
    query GetSbomUrl($build_id: uuid!) {
  builds_by_pk(id: $build_id) {
    s3_url_signed
  }
}
    `;
export const GetSidebarInfoDocument = `
    query GetSidebarInfo($kratos_id: uuid) {
  projects(order_by: {name: asc}) {
    name
    id
    created_at
    builds {
      id
      build_number
    }
  }
  organizations(
    order_by: {projects_aggregate: {count: asc}}
    where: {organization_users: {user: {kratos_id: {_eq: $kratos_id}}}}
  ) {
    name
    id
    createdAt
    projects(order_by: {name: asc}) {
      name
      id
      created_at
      github_repository {
        id
      }
      builds {
        id
        build_number
      }
    }
  }
}
    `;
export const SearchVulnerabilitiesDocument = `
    query SearchVulnerabilities($search: String!, $source: String_comparison_exp = {_ilike: ""}, $order_by: [vulnerability_order_by!] = {}, $limit: Int!) {
  vulnerability(
    where: {_and: [{severities: {id: {_is_null: false}}}, {affected: {id: {_is_null: false}}}, {source: $source}, {_or: [{source_id: {_ilike: $search}}, {summary: {_ilike: $search}}, {affected: {package: {name: {_ilike: $search}}}}]}]}
    limit: $limit
    order_by: $order_by
  ) {
    affected {
      database_specific
      ecosystem_specific
      id
      package {
        name
        id
      }
      affected_range_events {
        database_specific
        event
        id
        type
        version
      }
    }
    database_specific
    details
    severities {
      id
      score
      source
      type
    }
    source
    source_id
    summary
    withdrawn
    published
    modified
    id
  }
}
    `;
export const GetVulnerabilityDetailsDocument = `
    query GetVulnerabilityDetails($vulnerability_id: uuid!) {
  vulnerability_by_pk(id: $vulnerability_id) {
    affected {
      database_specific
      ecosystem_specific
      id
      package {
        name
        package_manager
        id
      }
      affected_range_events {
        database_specific
        event
        id
        type
        version
      }
      affected_versions {
        database_specific
        id
        version
      }
    }
    database_specific
    details
    equivalents {
      equivalent_vulnerability {
        id
        source
        source_id
        summary
        severities {
          id
          type
          score
          source
        }
      }
    }
    findings(where: {latest_default_build: {}}) {
      id
      build_id
      default_branch_build {
        id
        project {
          name
          id
        }
        build_number
        created_at
        project_id
      }
    }
    references {
      id
      type
      url
    }
    severities {
      id
      score
      source
      type
    }
    source
    source_id
    summary
    withdrawn
    published
    modified
    id
  }
}
    `;
export const InsertNewOrgUserDocument = `
    mutation InsertNewOrgUser($organization_id: uuid!) {
  insert_organization_user_one(object: {organization_id: $organization_id}) {
    id
  }
}
    `;
export const InsertPersonalProjectAndOrgDocument = `
    mutation InsertPersonalProjectAndOrg {
  insert_organizations_one(
    object: {name: "Personal", projects: {data: {name: "Personal Project"}}, organization_users: {data: {}}}
  ) {
    id
    projects {
      id
    }
  }
}
    `;
export const InsertProjectAccessTokenDocument = `
    mutation InsertProjectAccessToken($access_token: uuid!, $name: String!, $project_uuid: uuid!) {
  insert_project_access_tokens_one(
    object: {access_token: $access_token, name: $name, project_uuid: $project_uuid}
  ) {
    id
  }
}
    `;
export const InsertIgnoredVulnerabilitiesDocument = `
    mutation InsertIgnoredVulnerabilities($objects: [ignored_vulnerabilities_insert_input!]!) {
  insert_ignored_vulnerabilities(
    objects: $objects
    on_conflict: {constraint: ignored_vulnerabilities_project_id_vulnerability_id_key, update_columns: locations}
  ) {
    affected_rows
  }
}
    `;
export const InsertManifestDocument = `
    mutation insertManifest($s3_url: String!, $project_id: uuid!, $filename: String!, $key: String!) {
  insert_manifests_one(
    object: {filename: $filename, s3_url: $s3_url, project_id: $project_id, s3_key: $key}
  ) {
    id
  }
}
    `;
export const InsertProjectDocument = `
    mutation InsertProject($name: String!, $organization_id: uuid!) {
  insert_projects_one(object: {name: $name, organization_id: $organization_id}) {
    id
  }
}
    `;
export const PresignManifestUrlDocument = `
    mutation presignManifestUrl($project_id: uuid!) {
  presignManifestUpload(project_id: $project_id) {
    url
    headers
    key
    bucket
  }
}
    `;
export const UpdateSettingsDocument = `
    mutation UpdateSettings($id: uuid!, $settings: settings_set_input!) {
  update_settings_by_pk(pk_columns: {id: $id}, _set: $settings) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteProjectAccessToken: build.mutation<DeleteProjectAccessTokenMutation, DeleteProjectAccessTokenMutationVariables>({
      query: (variables) => ({ document: DeleteProjectAccessTokenDocument, variables })
    }),
    GetAllGuides: build.query<GetAllGuidesQuery, GetAllGuidesQueryVariables | void>({
      query: (variables) => ({ document: GetAllGuidesDocument, variables })
    }),
    GetBuildDetails: build.query<GetBuildDetailsQuery, GetBuildDetailsQueryVariables>({
      query: (variables) => ({ document: GetBuildDetailsDocument, variables })
    }),
    GetCurrentUserInfo: build.query<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>({
      query: (variables) => ({ document: GetCurrentUserInfoDocument, variables })
    }),
    GetGuideDetails: build.query<GetGuideDetailsQuery, GetGuideDetailsQueryVariables>({
      query: (variables) => ({ document: GetGuideDetailsDocument, variables })
    }),
    GetLunaTraceOrganizations: build.query<GetLunaTraceOrganizationsQuery, GetLunaTraceOrganizationsQueryVariables | void>({
      query: (variables) => ({ document: GetLunaTraceOrganizationsDocument, variables })
    }),
    GetLunaTraceUsers: build.query<GetLunaTraceUsersQuery, GetLunaTraceUsersQueryVariables | void>({
      query: (variables) => ({ document: GetLunaTraceUsersDocument, variables })
    }),
    GetManifest: build.query<GetManifestQuery, GetManifestQueryVariables | void>({
      query: (variables) => ({ document: GetManifestDocument, variables })
    }),
    GetProject: build.query<GetProjectQuery, GetProjectQueryVariables>({
      query: (variables) => ({ document: GetProjectDocument, variables })
    }),
    GetProjectCloneUrl: build.query<GetProjectCloneUrlQuery, GetProjectCloneUrlQueryVariables>({
      query: (variables) => ({ document: GetProjectCloneUrlDocument, variables })
    }),
    GetSbomUrl: build.query<GetSbomUrlQuery, GetSbomUrlQueryVariables>({
      query: (variables) => ({ document: GetSbomUrlDocument, variables })
    }),
    GetSidebarInfo: build.query<GetSidebarInfoQuery, GetSidebarInfoQueryVariables | void>({
      query: (variables) => ({ document: GetSidebarInfoDocument, variables })
    }),
    SearchVulnerabilities: build.query<SearchVulnerabilitiesQuery, SearchVulnerabilitiesQueryVariables>({
      query: (variables) => ({ document: SearchVulnerabilitiesDocument, variables })
    }),
    GetVulnerabilityDetails: build.query<GetVulnerabilityDetailsQuery, GetVulnerabilityDetailsQueryVariables>({
      query: (variables) => ({ document: GetVulnerabilityDetailsDocument, variables })
    }),
    InsertNewOrgUser: build.mutation<InsertNewOrgUserMutation, InsertNewOrgUserMutationVariables>({
      query: (variables) => ({ document: InsertNewOrgUserDocument, variables })
    }),
    InsertPersonalProjectAndOrg: build.mutation<InsertPersonalProjectAndOrgMutation, InsertPersonalProjectAndOrgMutationVariables | void>({
      query: (variables) => ({ document: InsertPersonalProjectAndOrgDocument, variables })
    }),
    InsertProjectAccessToken: build.mutation<InsertProjectAccessTokenMutation, InsertProjectAccessTokenMutationVariables>({
      query: (variables) => ({ document: InsertProjectAccessTokenDocument, variables })
    }),
    InsertIgnoredVulnerabilities: build.mutation<InsertIgnoredVulnerabilitiesMutation, InsertIgnoredVulnerabilitiesMutationVariables>({
      query: (variables) => ({ document: InsertIgnoredVulnerabilitiesDocument, variables })
    }),
    insertManifest: build.mutation<InsertManifestMutation, InsertManifestMutationVariables>({
      query: (variables) => ({ document: InsertManifestDocument, variables })
    }),
    InsertProject: build.mutation<InsertProjectMutation, InsertProjectMutationVariables>({
      query: (variables) => ({ document: InsertProjectDocument, variables })
    }),
    presignManifestUrl: build.mutation<PresignManifestUrlMutation, PresignManifestUrlMutationVariables>({
      query: (variables) => ({ document: PresignManifestUrlDocument, variables })
    }),
    UpdateSettings: build.mutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>({
      query: (variables) => ({ document: UpdateSettingsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


