import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: string;
  affected_range_type: any;
  bigint: any;
  builds_source_type: 'cli'|'gui'|'pr'|'default_branch';
  date: string;
  fix_state_enum: 'fixed'|'not-fixed'|'unknown';
  jsonb: Record<any, any> | any[];
  license_source: any;
  organization_user_role: string;
  package_manager: any;
  reference_type: any;
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

export type GithubRepository = {
  __typename?: 'GithubRepository';
  cloneUrl: Scalars['String'];
  defaultBranch: Scalars['String'];
  gitUrl: Scalars['String'];
  orgId: Scalars['Int'];
  orgName: Scalars['String'];
  orgNodeId: Scalars['String'];
  ownerType: Scalars['String'];
  repoId: Scalars['Int'];
  repoName: Scalars['String'];
  repoNodeId: Scalars['String'];
};

export type InstallSelectedReposResponse = {
  __typename?: 'InstallSelectedReposResponse';
  success?: Maybe<Scalars['Boolean']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  installSelectedRepos?: Maybe<InstallSelectedReposResponse>;
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
};


export type MutationInstallSelectedReposArgs = {
  orgs: Array<OrgsWithReposInput>;
};


export type MutationPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
};

export type OrgWithRepos = {
  __typename?: 'OrgWithRepos';
  id: Scalars['String'];
  organizationName: Scalars['String'];
  repos: Array<GithubRepository>;
};

export type OrgsWithReposInput = {
  id: Scalars['String'];
  repos: Array<Scalars['Int']>;
};

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse';
  bucket: Scalars['String'];
  headers: Scalars['jsonb'];
  key: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedRepoCloneUrl?: Maybe<AuthenticatedRepoCloneUrlOutput>;
  availableOrgsWithRepos?: Maybe<Array<OrgWithRepos>>;
  fakeQueryToHackHasuraBeingABuggyMess?: Maybe<Scalars['String']>;
  /**  get s3 presigned url for manifest upload, used by the CLI  */
  presignSbomUpload?: Maybe<SbomUploadUrlOutput>;
  sbomUrl?: Maybe<Scalars['String']>;
};


export type QueryAuthenticatedRepoCloneUrlArgs = {
  repoGithubId: Scalars['Int'];
};


export type QueryPresignSbomUploadArgs = {
  buildId: Scalars['uuid'];
  orgId: Scalars['uuid'];
};


export type QuerySbomUrlArgs = {
  buildId: Scalars['uuid'];
};

export type SbomUploadUrlInput = {
  orgId: Scalars['uuid'];
  projectId: Scalars['uuid'];
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

export type VulnerabilityData = {
  __typename?: 'VulnerabilityData';
  devOnly: Scalars['Boolean'];
  vulnerability: Vulnerability;
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

/** append existing jsonb value of filtered columns with new jsonb value */
export type Build_Dependency_Relationship_Append_Input = {
  labels?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Arr_Rel_Insert_Input = {
  data: Array<Build_Dependency_Relationship_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Build_Dependency_Relationship_On_Conflict>;
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

/** unique or primary key constraints on table "build_dependency_relationship" */
export enum Build_Dependency_Relationship_Constraint {
  /** unique or primary key constraint on columns "id" */
  BuildDependencyRelationshipPkey = 'build_dependency_relationship_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Build_Dependency_Relationship_Delete_At_Path_Input = {
  labels?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Build_Dependency_Relationship_Delete_Elem_Input = {
  labels?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Build_Dependency_Relationship_Delete_Key_Input = {
  labels?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  depended_by_relationship?: InputMaybe<Build_Dependency_Relationship_Obj_Rel_Insert_Input>;
  depended_by_relationship_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  labels?: InputMaybe<Scalars['jsonb']>;
  project_path?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Scalars['String']>;
  release?: InputMaybe<Package_Release_Obj_Rel_Insert_Input>;
  release_id?: InputMaybe<Scalars['uuid']>;
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

/** response of any mutation on the table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Mutation_Response = {
  __typename?: 'build_dependency_relationship_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Build_Dependency_Relationship>;
};

/** input type for inserting object relation for remote table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Obj_Rel_Insert_Input = {
  data: Build_Dependency_Relationship_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Build_Dependency_Relationship_On_Conflict>;
};

/** on_conflict condition type for table "build_dependency_relationship" */
export type Build_Dependency_Relationship_On_Conflict = {
  constraint: Build_Dependency_Relationship_Constraint;
  update_columns?: Array<Build_Dependency_Relationship_Update_Column>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
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

/** primary key columns input for table: build_dependency_relationship */
export type Build_Dependency_Relationship_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Build_Dependency_Relationship_Prepend_Input = {
  labels?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "build_dependency_relationship" */
export type Build_Dependency_Relationship_Set_Input = {
  build_id?: InputMaybe<Scalars['uuid']>;
  depended_by_relationship_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  labels?: InputMaybe<Scalars['jsonb']>;
  project_path?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Scalars['String']>;
  release_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "build_dependency_relationship" */
export enum Build_Dependency_Relationship_Update_Column {
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
  agent_access_token: Scalars['uuid'];
  /** An array relationship */
  build_dependency_relationships: Array<Build_Dependency_Relationship>;
  build_number?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamp'];
  existing_github_check_id?: Maybe<Scalars['bigint']>;
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
  /** An array relationship */
  resolved_manifests: Array<Resolved_Manifest>;
  s3_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  scans: Array<Scans>;
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

/** unique or primary key constraints on table "builds" */
export enum Builds_Constraint {
  /** unique or primary key constraint on columns "agent_access_token" */
  BuildsAgentAccessTokenKey = 'builds_agent_access_token_key',
  /** unique or primary key constraint on columns "project_id", "build_number" */
  BuildsBuildNumberProjectIdKey = 'builds_build_number_project_id_key',
  /** unique or primary key constraint on columns "id" */
  BuildsPkey = 'builds_pkey'
}

/** input type for incrementing numeric columns in table "builds" */
export type Builds_Inc_Input = {
  build_number?: InputMaybe<Scalars['Int']>;
  existing_github_check_id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "builds" */
export type Builds_Insert_Input = {
  agent_access_token?: InputMaybe<Scalars['uuid']>;
  build_dependency_relationships?: InputMaybe<Build_Dependency_Relationship_Arr_Rel_Insert_Input>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  existing_github_check_id?: InputMaybe<Scalars['bigint']>;
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
  resolved_manifests?: InputMaybe<Resolved_Manifest_Arr_Rel_Insert_Input>;
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
  source_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Builds_Min_Fields = {
  __typename?: 'builds_min_fields';
  agent_access_token?: Maybe<Scalars['uuid']>;
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
  existing_github_check_id?: InputMaybe<Scalars['bigint']>;
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
  existing_github_check_id?: Maybe<Scalars['bigint']>;
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
  source_type?: InputMaybe<Order_By>;
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

/** unique or primary key constraints on table "findings" */
export enum Findings_Constraint {
  /** unique or primary key constraint on columns "dedupe_slug", "build_id" */
  FindingsDedupeSlugBuildIdKey = 'findings_dedupe_slug_build_id_key',
  /** unique or primary key constraint on columns "id" */
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
  purl?: InputMaybe<Scalars['String']>;
  scan?: InputMaybe<Scans_Obj_Rel_Insert_Input>;
  scan_id?: InputMaybe<Scalars['uuid']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
  version_matcher?: InputMaybe<Scalars['String']>;
  virtual_path?: InputMaybe<Scalars['String']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
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
  purl?: InputMaybe<Scalars['String']>;
  scan_id?: InputMaybe<Scalars['uuid']>;
  severity?: InputMaybe<Scalars['severity_enum']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['String']>;
  version_matcher?: InputMaybe<Scalars['String']>;
  virtual_path?: InputMaybe<Scalars['String']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
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
  /** unique or primary key constraint on columns "github_id" */
  GithubRepositoriesGithubIdKey = 'github_repositories_github_id_key',
  /** unique or primary key constraint on columns "github_node_id" */
  GithubRepositoriesGithubNodeIdKey = 'github_repositories_github_node_id_key',
  /** unique or primary key constraint on columns "id" */
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
  /** unique or primary key constraint on columns "id" */
  GuideRelatedGuidesPkey = 'guide_related_guides_pkey',
  /** unique or primary key constraint on columns "to_guide_unique_id", "from_guide_id" */
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
  vulnerability: Vulnerability;
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
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "guide_vulnerabilities" */
export enum Guide_Vulnerabilities_Constraint {
  /** unique or primary key constraint on columns "id" */
  GuideVulnerabilitiesPkey = 'guide_vulnerabilities_pkey',
  /** unique or primary key constraint on columns "vulnerability_id", "guide_id" */
  GuideVulnerabilitiesUnique = 'guide_vulnerabilities_unique'
}

/** input type for inserting data into table "guide_vulnerabilities" */
export type Guide_Vulnerabilities_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  guide?: InputMaybe<Guides_Obj_Rel_Insert_Input>;
  guide_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
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
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
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
  /** unique or primary key constraint on columns "data_source_link" */
  GuidesDataSourceLinkKey = 'guides_data_source_link_key',
  /** unique or primary key constraint on columns "guide_unique_id" */
  GuidesGuideUniqueIdKey = 'guides_guide_unique_id_key',
  /** unique or primary key constraint on columns "id" */
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
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
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

/** input type for inserting array relation for remote table "manifest_dependency" */
export type Manifest_Dependency_Arr_Rel_Insert_Input = {
  data: Array<Manifest_Dependency_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Manifest_Dependency_On_Conflict>;
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

/** unique or primary key constraints on table "manifest_dependency" */
export enum Manifest_Dependency_Constraint {
  /** unique or primary key constraint on columns "manifest_dependency_node_id", "manifest_id" */
  ManifestDependencyManifestIdManifestDependencyNodeIdIdx = 'manifest_dependency_manifest_id_manifest_dependency_node_id_idx'
}

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

/** input type for inserting array relation for remote table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Arr_Rel_Insert_Input = {
  data: Array<Manifest_Dependency_Edge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Manifest_Dependency_Edge_On_Conflict>;
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

/** unique or primary key constraints on table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Constraint {
  /** unique or primary key constraint on columns "child_id", "parent_id" */
  ManifestDependencyEdgeParentIdChildIdIdx = 'manifest_dependency_edge_parent_id_child_id_idx'
}

/** input type for inserting data into table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Insert_Input = {
  child?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
  child_id?: InputMaybe<Scalars['uuid']>;
  parent?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['uuid']>;
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

/** response of any mutation on the table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Mutation_Response = {
  __typename?: 'manifest_dependency_edge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manifest_Dependency_Edge>;
};

/** on_conflict condition type for table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_On_Conflict = {
  constraint: Manifest_Dependency_Edge_Constraint;
  update_columns?: Array<Manifest_Dependency_Edge_Update_Column>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
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

/** input type for updating data in table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Set_Input = {
  child_id?: InputMaybe<Scalars['uuid']>;
  parent_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Update_Column {
  /** column name */
  ChildId = 'child_id',
  /** column name */
  ParentId = 'parent_id'
}

/** input type for inserting data into table "manifest_dependency" */
export type Manifest_Dependency_Insert_Input = {
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
  /** entrypoint to dep tree */
  manifest_dependency_node_id?: InputMaybe<Scalars['uuid']>;
  manifest_id?: InputMaybe<Scalars['uuid']>;
  resolved_manifest?: InputMaybe<Resolved_Manifest_Obj_Rel_Insert_Input>;
};

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

/** response of any mutation on the table "manifest_dependency" */
export type Manifest_Dependency_Mutation_Response = {
  __typename?: 'manifest_dependency_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manifest_Dependency>;
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

/** append existing jsonb value of filtered columns with new jsonb value */
export type Manifest_Dependency_Node_Append_Input = {
  labels?: InputMaybe<Scalars['jsonb']>;
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

/** unique or primary key constraints on table "manifest_dependency_node" */
export enum Manifest_Dependency_Node_Constraint {
  /** unique or primary key constraint on columns "id" */
  ManifestDependencyNodePkey = 'manifest_dependency_node_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Manifest_Dependency_Node_Delete_At_Path_Input = {
  labels?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Manifest_Dependency_Node_Delete_Elem_Input = {
  labels?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Manifest_Dependency_Node_Delete_Key_Input = {
  labels?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "manifest_dependency_node" */
export type Manifest_Dependency_Node_Insert_Input = {
  child_edges?: InputMaybe<Manifest_Dependency_Edge_Arr_Rel_Insert_Input>;
  /** merkle tree hash of dependency relationship and its transitive dependencies. not a random UUID. */
  id?: InputMaybe<Scalars['uuid']>;
  labels?: InputMaybe<Scalars['jsonb']>;
  parent_edges?: InputMaybe<Manifest_Dependency_Edge_Arr_Rel_Insert_Input>;
  range?: InputMaybe<Scalars['String']>;
  release?: InputMaybe<Package_Release_Obj_Rel_Insert_Input>;
  release_id?: InputMaybe<Scalars['uuid']>;
};

/** response of any mutation on the table "manifest_dependency_node" */
export type Manifest_Dependency_Node_Mutation_Response = {
  __typename?: 'manifest_dependency_node_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manifest_Dependency_Node>;
};

/** input type for inserting object relation for remote table "manifest_dependency_node" */
export type Manifest_Dependency_Node_Obj_Rel_Insert_Input = {
  data: Manifest_Dependency_Node_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Manifest_Dependency_Node_On_Conflict>;
};

/** on_conflict condition type for table "manifest_dependency_node" */
export type Manifest_Dependency_Node_On_Conflict = {
  constraint: Manifest_Dependency_Node_Constraint;
  update_columns?: Array<Manifest_Dependency_Node_Update_Column>;
  where?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
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

/** primary key columns input for table: manifest_dependency_node */
export type Manifest_Dependency_Node_Pk_Columns_Input = {
  /** merkle tree hash of dependency relationship and its transitive dependencies. not a random UUID. */
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Manifest_Dependency_Node_Prepend_Input = {
  labels?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "manifest_dependency_node" */
export type Manifest_Dependency_Node_Set_Input = {
  /** merkle tree hash of dependency relationship and its transitive dependencies. not a random UUID. */
  id?: InputMaybe<Scalars['uuid']>;
  labels?: InputMaybe<Scalars['jsonb']>;
  range?: InputMaybe<Scalars['String']>;
  release_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "manifest_dependency_node" */
export enum Manifest_Dependency_Node_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Labels = 'labels',
  /** column name */
  Range = 'range',
  /** column name */
  ReleaseId = 'release_id'
}

/** on_conflict condition type for table "manifest_dependency" */
export type Manifest_Dependency_On_Conflict = {
  constraint: Manifest_Dependency_Constraint;
  update_columns?: Array<Manifest_Dependency_Update_Column>;
  where?: InputMaybe<Manifest_Dependency_Bool_Exp>;
};

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

/** input type for updating data in table "manifest_dependency" */
export type Manifest_Dependency_Set_Input = {
  /** entrypoint to dep tree */
  manifest_dependency_node_id?: InputMaybe<Scalars['uuid']>;
  manifest_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "manifest_dependency" */
export enum Manifest_Dependency_Update_Column {
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
  /** delete data from the table: "build_dependency_relationship" */
  delete_build_dependency_relationship?: Maybe<Build_Dependency_Relationship_Mutation_Response>;
  /** delete single row from the table: "build_dependency_relationship" */
  delete_build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
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
  /** delete data from the table: "package.package" */
  delete_package?: Maybe<Package_Mutation_Response>;
  /** delete single row from the table: "package.package" */
  delete_package_by_pk?: Maybe<Package>;
  /** delete data from the table: "vulnerability.range" */
  delete_vulnerability_range?: Maybe<Vulnerability_Range_Mutation_Response>;
  /** delete single row from the table: "vulnerability.range" */
  delete_vulnerability_range_by_pk?: Maybe<Vulnerability_Range>;
  /** insert data into the table: "build_dependency_relationship" */
  insert_build_dependency_relationship?: Maybe<Build_Dependency_Relationship_Mutation_Response>;
  /** insert a single row into the table: "build_dependency_relationship" */
  insert_build_dependency_relationship_one?: Maybe<Build_Dependency_Relationship>;
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
  /** insert data into the table: "manifest_dependency" */
  insert_manifest_dependency?: Maybe<Manifest_Dependency_Mutation_Response>;
  /** insert data into the table: "manifest_dependency_edge" */
  insert_manifest_dependency_edge?: Maybe<Manifest_Dependency_Edge_Mutation_Response>;
  /** insert a single row into the table: "manifest_dependency_edge" */
  insert_manifest_dependency_edge_one?: Maybe<Manifest_Dependency_Edge>;
  /** insert data into the table: "manifest_dependency_node" */
  insert_manifest_dependency_node?: Maybe<Manifest_Dependency_Node_Mutation_Response>;
  /** insert a single row into the table: "manifest_dependency_node" */
  insert_manifest_dependency_node_one?: Maybe<Manifest_Dependency_Node>;
  /** insert a single row into the table: "manifest_dependency" */
  insert_manifest_dependency_one?: Maybe<Manifest_Dependency>;
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
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "resolved_manifest" */
  insert_resolved_manifest?: Maybe<Resolved_Manifest_Mutation_Response>;
  /** insert a single row into the table: "resolved_manifest" */
  insert_resolved_manifest_one?: Maybe<Resolved_Manifest>;
  /** insert data into the table: "scans" */
  insert_scans?: Maybe<Scans_Mutation_Response>;
  /** insert a single row into the table: "scans" */
  insert_scans_one?: Maybe<Scans>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
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
  /** insert data into the table: "vulnerability.range" */
  insert_vulnerability_range?: Maybe<Vulnerability_Range_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.range" */
  insert_vulnerability_range_one?: Maybe<Vulnerability_Range>;
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
  /** update data of the table: "build_dependency_relationship" */
  update_build_dependency_relationship?: Maybe<Build_Dependency_Relationship_Mutation_Response>;
  /** update single row of the table: "build_dependency_relationship" */
  update_build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
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
  /** update data of the table: "manifest_dependency" */
  update_manifest_dependency?: Maybe<Manifest_Dependency_Mutation_Response>;
  /** update data of the table: "manifest_dependency_edge" */
  update_manifest_dependency_edge?: Maybe<Manifest_Dependency_Edge_Mutation_Response>;
  /** update data of the table: "manifest_dependency_node" */
  update_manifest_dependency_node?: Maybe<Manifest_Dependency_Node_Mutation_Response>;
  /** update single row of the table: "manifest_dependency_node" */
  update_manifest_dependency_node_by_pk?: Maybe<Manifest_Dependency_Node>;
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
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "resolved_manifest" */
  update_resolved_manifest?: Maybe<Resolved_Manifest_Mutation_Response>;
  /** update single row of the table: "resolved_manifest" */
  update_resolved_manifest_by_pk?: Maybe<Resolved_Manifest>;
  /** update data of the table: "scans" */
  update_scans?: Maybe<Scans_Mutation_Response>;
  /** update single row of the table: "scans" */
  update_scans_by_pk?: Maybe<Scans>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
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
  /** update data of the table: "vulnerability.range" */
  update_vulnerability_range?: Maybe<Vulnerability_Range_Mutation_Response>;
  /** update single row of the table: "vulnerability.range" */
  update_vulnerability_range_by_pk?: Maybe<Vulnerability_Range>;
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
export type Mutation_RootDelete_Build_Dependency_RelationshipArgs = {
  where: Build_Dependency_Relationship_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Build_Dependency_Relationship_By_PkArgs = {
  id: Scalars['uuid'];
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
export type Mutation_RootDelete_PackageArgs = {
  where: Package_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Package_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Vulnerability_RangeArgs = {
  where: Vulnerability_Range_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vulnerability_Range_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_Build_Dependency_RelationshipArgs = {
  objects: Array<Build_Dependency_Relationship_Insert_Input>;
  on_conflict?: InputMaybe<Build_Dependency_Relationship_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Build_Dependency_Relationship_OneArgs = {
  object: Build_Dependency_Relationship_Insert_Input;
  on_conflict?: InputMaybe<Build_Dependency_Relationship_On_Conflict>;
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
export type Mutation_RootInsert_Manifest_DependencyArgs = {
  objects: Array<Manifest_Dependency_Insert_Input>;
  on_conflict?: InputMaybe<Manifest_Dependency_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifest_Dependency_EdgeArgs = {
  objects: Array<Manifest_Dependency_Edge_Insert_Input>;
  on_conflict?: InputMaybe<Manifest_Dependency_Edge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifest_Dependency_Edge_OneArgs = {
  object: Manifest_Dependency_Edge_Insert_Input;
  on_conflict?: InputMaybe<Manifest_Dependency_Edge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifest_Dependency_NodeArgs = {
  objects: Array<Manifest_Dependency_Node_Insert_Input>;
  on_conflict?: InputMaybe<Manifest_Dependency_Node_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifest_Dependency_Node_OneArgs = {
  object: Manifest_Dependency_Node_Insert_Input;
  on_conflict?: InputMaybe<Manifest_Dependency_Node_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manifest_Dependency_OneArgs = {
  object: Manifest_Dependency_Insert_Input;
  on_conflict?: InputMaybe<Manifest_Dependency_On_Conflict>;
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
export type Mutation_RootInsert_Resolved_ManifestArgs = {
  objects: Array<Resolved_Manifest_Insert_Input>;
  on_conflict?: InputMaybe<Resolved_Manifest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resolved_Manifest_OneArgs = {
  object: Resolved_Manifest_Insert_Input;
  on_conflict?: InputMaybe<Resolved_Manifest_On_Conflict>;
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
export type Mutation_RootInsert_Vulnerability_RangeArgs = {
  objects: Array<Vulnerability_Range_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Range_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Range_OneArgs = {
  object: Vulnerability_Range_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Range_On_Conflict>;
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
export type Mutation_RootUpdate_Build_Dependency_RelationshipArgs = {
  _append?: InputMaybe<Build_Dependency_Relationship_Append_Input>;
  _delete_at_path?: InputMaybe<Build_Dependency_Relationship_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Build_Dependency_Relationship_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Build_Dependency_Relationship_Delete_Key_Input>;
  _prepend?: InputMaybe<Build_Dependency_Relationship_Prepend_Input>;
  _set?: InputMaybe<Build_Dependency_Relationship_Set_Input>;
  where: Build_Dependency_Relationship_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Build_Dependency_Relationship_By_PkArgs = {
  _append?: InputMaybe<Build_Dependency_Relationship_Append_Input>;
  _delete_at_path?: InputMaybe<Build_Dependency_Relationship_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Build_Dependency_Relationship_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Build_Dependency_Relationship_Delete_Key_Input>;
  _prepend?: InputMaybe<Build_Dependency_Relationship_Prepend_Input>;
  _set?: InputMaybe<Build_Dependency_Relationship_Set_Input>;
  pk_columns: Build_Dependency_Relationship_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Manifest_DependencyArgs = {
  _set?: InputMaybe<Manifest_Dependency_Set_Input>;
  where: Manifest_Dependency_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manifest_Dependency_EdgeArgs = {
  _set?: InputMaybe<Manifest_Dependency_Edge_Set_Input>;
  where: Manifest_Dependency_Edge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manifest_Dependency_NodeArgs = {
  _append?: InputMaybe<Manifest_Dependency_Node_Append_Input>;
  _delete_at_path?: InputMaybe<Manifest_Dependency_Node_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Manifest_Dependency_Node_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Manifest_Dependency_Node_Delete_Key_Input>;
  _prepend?: InputMaybe<Manifest_Dependency_Node_Prepend_Input>;
  _set?: InputMaybe<Manifest_Dependency_Node_Set_Input>;
  where: Manifest_Dependency_Node_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manifest_Dependency_Node_By_PkArgs = {
  _append?: InputMaybe<Manifest_Dependency_Node_Append_Input>;
  _delete_at_path?: InputMaybe<Manifest_Dependency_Node_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Manifest_Dependency_Node_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Manifest_Dependency_Node_Delete_Key_Input>;
  _prepend?: InputMaybe<Manifest_Dependency_Node_Prepend_Input>;
  _set?: InputMaybe<Manifest_Dependency_Node_Set_Input>;
  pk_columns: Manifest_Dependency_Node_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Resolved_ManifestArgs = {
  _set?: InputMaybe<Resolved_Manifest_Set_Input>;
  where: Resolved_Manifest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resolved_Manifest_By_PkArgs = {
  _set?: InputMaybe<Resolved_Manifest_Set_Input>;
  pk_columns: Resolved_Manifest_Pk_Columns_Input;
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
export type Mutation_RootUpdate_VulnerabilityArgs = {
  _append?: InputMaybe<Vulnerability_Append_Input>;
  _delete_at_path?: InputMaybe<Vulnerability_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Vulnerability_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Vulnerability_Delete_Key_Input>;
  _inc?: InputMaybe<Vulnerability_Inc_Input>;
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
  _inc?: InputMaybe<Vulnerability_Inc_Input>;
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
export type Mutation_RootUpdate_Vulnerability_RangeArgs = {
  _set?: InputMaybe<Vulnerability_Range_Set_Input>;
  where: Vulnerability_Range_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Range_By_PkArgs = {
  _set?: InputMaybe<Vulnerability_Range_Set_Input>;
  pk_columns: Vulnerability_Range_Pk_Columns_Input;
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
  /** unique or primary key constraint on columns "installation_id" */
  InstallationIdUnique = 'installation_id_unique',
  /** unique or primary key constraint on columns "github_id" */
  OrganizationsGithubIdKey = 'organizations_github_id_key',
  /** unique or primary key constraint on columns "github_node_id" */
  OrganizationsGithubNodeIdKey = 'organizations_github_node_id_key',
  /** unique or primary key constraint on columns "id" */
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
  /** An array relationship */
  affected_by_vulnerability: Array<Vulnerability_Affected>;
  custom_registry: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  last_failed_fetch?: Maybe<Scalars['timestamptz']>;
  last_successful_fetch?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  /** An array relationship */
  package_maintainers: Array<Package_Package_Maintainer>;
  package_manager: Scalars['package_manager'];
  /** An array relationship */
  releases: Array<Package_Release>;
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

/** aggregated selection of "package.package" */
export type Package_Aggregate = {
  __typename?: 'package_aggregate';
  aggregate?: Maybe<Package_Aggregate_Fields>;
  nodes: Array<Package>;
};

/** aggregate fields of "package.package" */
export type Package_Aggregate_Fields = {
  __typename?: 'package_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Package_Max_Fields>;
  min?: Maybe<Package_Min_Fields>;
};


/** aggregate fields of "package.package" */
export type Package_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Package_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
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
  affected_by_vulnerability?: InputMaybe<Vulnerability_Affected_Bool_Exp>;
  custom_registry?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_failed_fetch?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_successful_fetch?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Bool_Exp>;
  package_manager?: InputMaybe<Package_Manager_Comparison_Exp>;
  releases?: InputMaybe<Package_Release_Bool_Exp>;
  upstream_data?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "package.package" */
export enum Package_Constraint {
  /** unique or primary key constraint on columns "name", "package_manager", "custom_registry" */
  PackagePackageManagerCustomRegistryNameIdx = 'package_package_manager_custom_registry_name_idx',
  /** unique or primary key constraint on columns "id" */
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
  affected_by_vulnerability?: InputMaybe<Vulnerability_Affected_Arr_Rel_Insert_Input>;
  custom_registry?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_failed_fetch?: InputMaybe<Scalars['timestamptz']>;
  last_successful_fetch?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  package_maintainers?: InputMaybe<Package_Package_Maintainer_Arr_Rel_Insert_Input>;
  package_manager?: InputMaybe<Scalars['package_manager']>;
  releases?: InputMaybe<Package_Release_Arr_Rel_Insert_Input>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
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
  /** unique or primary key constraint on columns "name" */
  LicenseNameIdx = 'license_name_idx',
  /** unique or primary key constraint on columns "id" */
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
  /** unique or primary key constraint on columns "email", "package_manager" */
  MaintainerPackageManagerEmailIdx = 'maintainer_package_manager_email_idx',
  /** unique or primary key constraint on columns "id" */
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

/** aggregate max on columns */
export type Package_Max_Fields = {
  __typename?: 'package_max_fields';
  custom_registry?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_failed_fetch?: Maybe<Scalars['timestamptz']>;
  last_successful_fetch?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  package_manager?: Maybe<Scalars['package_manager']>;
};

/** aggregate min on columns */
export type Package_Min_Fields = {
  __typename?: 'package_min_fields';
  custom_registry?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_failed_fetch?: Maybe<Scalars['timestamptz']>;
  last_successful_fetch?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  package_manager?: Maybe<Scalars['package_manager']>;
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
  affected_by_vulnerability_aggregate?: InputMaybe<Vulnerability_Affected_Aggregate_Order_By>;
  custom_registry?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_failed_fetch?: InputMaybe<Order_By>;
  last_successful_fetch?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  package_maintainers_aggregate?: InputMaybe<Package_Package_Maintainer_Aggregate_Order_By>;
  package_manager?: InputMaybe<Order_By>;
  releases_aggregate?: InputMaybe<Package_Release_Aggregate_Order_By>;
  upstream_data?: InputMaybe<Order_By>;
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
  /** unique or primary key constraint on columns "maintainer_id", "package_id" */
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
  /** An array relationship */
  build_dependency_relationships: Array<Build_Dependency_Relationship>;
  fetched_time?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  mirrored_blob_url?: Maybe<Scalars['String']>;
  observed_time: Scalars['timestamptz'];
  /** An object relationship */
  package: Package;
  package_id: Scalars['uuid'];
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
export type Package_ReleaseBuild_Dependency_RelationshipsArgs = {
  distinct_on?: InputMaybe<Array<Build_Dependency_Relationship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Dependency_Relationship_Order_By>>;
  where?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
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
  build_dependency_relationships?: InputMaybe<Build_Dependency_Relationship_Bool_Exp>;
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
  /** unique or primary key constraint on columns "package_id", "version" */
  ReleasePackageIdVersionIdx = 'release_package_id_version_idx',
  /** unique or primary key constraint on columns "id" */
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
  /** unique or primary key constraint on columns "id" */
  ReleaseDependencyPkey = 'release_dependency_pkey',
  /** unique or primary key constraint on columns "package_version_query", "package_name", "release_id" */
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
  build_dependency_relationships?: InputMaybe<Build_Dependency_Relationship_Arr_Rel_Insert_Input>;
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
  /** unique or primary key constraint on columns "id" */
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
  source?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "package.release_license" */
export type Package_Release_License_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  license_id?: InputMaybe<Order_By>;
  release_id?: InputMaybe<Order_By>;
  scan_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
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
  build_dependency_relationships_aggregate?: InputMaybe<Build_Dependency_Relationship_Aggregate_Order_By>;
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

/** input type for updating data in table "package.package" */
export type Package_Set_Input = {
  custom_registry?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_failed_fetch?: InputMaybe<Scalars['timestamptz']>;
  last_successful_fetch?: InputMaybe<Scalars['timestamptz']>;
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
  /** unique or primary key constraint on columns "name", "organization_id" */
  ProjectsNameOrganizationIdKey = 'projects_name_organization_id_key',
  /** unique or primary key constraint on columns "id" */
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
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch aggregated fields from the table: "package.package" */
  package_aggregate: Package_Aggregate;
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
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "resolved_manifest" */
  resolved_manifest: Array<Resolved_Manifest>;
  /** fetch data from the table: "resolved_manifest" using primary key columns */
  resolved_manifest_by_pk?: Maybe<Resolved_Manifest>;
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
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
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


export type Query_RootPackage_AggregateArgs = {
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

/** input type for inserting array relation for remote table "resolved_manifest" */
export type Resolved_Manifest_Arr_Rel_Insert_Input = {
  data: Array<Resolved_Manifest_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Resolved_Manifest_On_Conflict>;
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

/** unique or primary key constraints on table "resolved_manifest" */
export enum Resolved_Manifest_Constraint {
  /** unique or primary key constraint on columns "build_id", "path" */
  ManifestBuildIdPathIdx = 'manifest_build_id_path_idx',
  /** unique or primary key constraint on columns "id" */
  ManifestPkey = 'manifest_pkey'
}

/** input type for inserting data into table "resolved_manifest" */
export type Resolved_Manifest_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  manifest_dependencies?: InputMaybe<Manifest_Dependency_Arr_Rel_Insert_Input>;
  /** path in repo of manifest file. empty string if the ecosystem does not have a manifest file. */
  path?: InputMaybe<Scalars['String']>;
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

/** response of any mutation on the table "resolved_manifest" */
export type Resolved_Manifest_Mutation_Response = {
  __typename?: 'resolved_manifest_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resolved_Manifest>;
};

/** input type for inserting object relation for remote table "resolved_manifest" */
export type Resolved_Manifest_Obj_Rel_Insert_Input = {
  data: Resolved_Manifest_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Resolved_Manifest_On_Conflict>;
};

/** on_conflict condition type for table "resolved_manifest" */
export type Resolved_Manifest_On_Conflict = {
  constraint: Resolved_Manifest_Constraint;
  update_columns?: Array<Resolved_Manifest_Update_Column>;
  where?: InputMaybe<Resolved_Manifest_Bool_Exp>;
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

/** primary key columns input for table: resolved_manifest */
export type Resolved_Manifest_Pk_Columns_Input = {
  id: Scalars['uuid'];
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

/** input type for updating data in table "resolved_manifest" */
export type Resolved_Manifest_Set_Input = {
  build_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  /** path in repo of manifest file. empty string if the ecosystem does not have a manifest file. */
  path?: InputMaybe<Scalars['String']>;
};

/** update columns of table "resolved_manifest" */
export enum Resolved_Manifest_Update_Column {
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
  /** unique or primary key constraint on columns "id" */
  ScansPkey = 'scans_pkey',
  /** unique or primary key constraint on columns "scan_number", "build_id" */
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
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "package.package" */
  package: Array<Package>;
  /** fetch aggregated fields from the table: "package.package" */
  package_aggregate: Package_Aggregate;
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
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "resolved_manifest" */
  resolved_manifest: Array<Resolved_Manifest>;
  /** fetch data from the table: "resolved_manifest" using primary key columns */
  resolved_manifest_by_pk?: Maybe<Resolved_Manifest>;
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
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
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


export type Subscription_RootPackage_AggregateArgs = {
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
  /** unique or primary key constraint on columns "github_id" */
  UsersGithubIdKey = 'users_github_id_key',
  /** unique or primary key constraint on columns "github_node_id" */
  UsersGithubNodeIdKey = 'users_github_node_id_key',
  /** unique or primary key constraint on columns "kratos_id" */
  UsersKratosIdUnique = 'users_kratos_id_unique',
  /** unique or primary key constraint on columns "id" */
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
  ranges?: InputMaybe<Vulnerability_Range_Bool_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.affected" */
export enum Vulnerability_Affected_Constraint {
  /** unique or primary key constraint on columns "id" */
  AffectedPkey = 'affected_pkey',
  /** unique or primary key constraint on columns "vulnerability_id", "package_id" */
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
  ranges?: InputMaybe<Vulnerability_Range_Arr_Rel_Insert_Input>;
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
  ranges_aggregate?: InputMaybe<Vulnerability_Range_Aggregate_Order_By>;
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
  /** unique or primary key constraint on columns "type", "affected_id", "event", "version" */
  AffectedRangeEventAffectedIdTypeEventVersionIdx = 'affected_range_event_affected_id_type_event_version_idx',
  /** unique or primary key constraint on columns "id" */
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
  /** unique or primary key constraint on columns "affected_id", "version" */
  AffectedVersionAffectedIdTypeVersion = 'affected_version_affected_id_type_version',
  /** unique or primary key constraint on columns "id" */
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

/** unique or primary key constraints on table "vulnerability.vulnerability" */
export enum Vulnerability_Constraint {
  /** unique or primary key constraint on columns "id" */
  VulnerabilityPkey = 'vulnerability_pkey',
  /** unique or primary key constraint on columns "source", "source_id" */
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
  /** unique or primary key constraint on columns "id" */
  CreditPkey = 'credit_pkey',
  /** unique or primary key constraint on columns "name", "vulnerability_id" */
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
  equivalent_vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
};

/** unique or primary key constraints on table "vulnerability.equivalent" */
export enum Vulnerability_Equivalent_Constraint {
  /** unique or primary key constraint on columns "a", "b" */
  EquivalentABIdx = 'equivalent_a_b_idx'
}

/** input type for inserting data into table "vulnerability.equivalent" */
export type Vulnerability_Equivalent_Insert_Input = {
  a?: InputMaybe<Scalars['uuid']>;
  b?: InputMaybe<Scalars['uuid']>;
  equivalent_vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
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

/** input type for incrementing numeric columns in table "vulnerability.vulnerability" */
export type Vulnerability_Inc_Input = {
  cvss_score?: InputMaybe<Scalars['Float']>;
};

/** input type for inserting data into table "vulnerability.vulnerability" */
export type Vulnerability_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Arr_Rel_Insert_Input>;
  credits?: InputMaybe<Vulnerability_Credit_Arr_Rel_Insert_Input>;
  cvss_score?: InputMaybe<Scalars['Float']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Arr_Rel_Insert_Input>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  references?: InputMaybe<Vulnerability_Reference_Arr_Rel_Insert_Input>;
  reviewed_by_source?: InputMaybe<Scalars['Boolean']>;
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

/** primary key columns input for table: vulnerability */
export type Vulnerability_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vulnerability_Prepend_Input = {
  database_specific?: InputMaybe<Scalars['jsonb']>;
  upstream_data?: InputMaybe<Scalars['jsonb']>;
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

/** input type for inserting array relation for remote table "vulnerability.range" */
export type Vulnerability_Range_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Range_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Range_On_Conflict>;
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

/** unique or primary key constraints on table "vulnerability.range" */
export enum Vulnerability_Range_Constraint {
  /** unique or primary key constraint on columns "id" */
  RangePkey = 'range_pkey',
  /** unique or primary key constraint on columns "affected_id", "fixed", "introduced" */
  RangeUniq = 'range_uniq'
}

/** input type for inserting data into table "vulnerability.range" */
export type Vulnerability_Range_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Obj_Rel_Insert_Input>;
  affected_id?: InputMaybe<Scalars['uuid']>;
  fixed?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  introduced?: InputMaybe<Scalars['String']>;
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

/** response of any mutation on the table "vulnerability.range" */
export type Vulnerability_Range_Mutation_Response = {
  __typename?: 'vulnerability_range_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Range>;
};

/** on_conflict condition type for table "vulnerability.range" */
export type Vulnerability_Range_On_Conflict = {
  constraint: Vulnerability_Range_Constraint;
  update_columns?: Array<Vulnerability_Range_Update_Column>;
  where?: InputMaybe<Vulnerability_Range_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.range". */
export type Vulnerability_Range_Order_By = {
  affected?: InputMaybe<Vulnerability_Affected_Order_By>;
  affected_id?: InputMaybe<Order_By>;
  fixed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  introduced?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_range */
export type Vulnerability_Range_Pk_Columns_Input = {
  id: Scalars['uuid'];
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

/** input type for updating data in table "vulnerability.range" */
export type Vulnerability_Range_Set_Input = {
  affected_id?: InputMaybe<Scalars['uuid']>;
  fixed?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  introduced?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability.range" */
export enum Vulnerability_Range_Update_Column {
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
  /** unique or primary key constraint on columns "id" */
  ReferencePkey = 'reference_pkey',
  /** unique or primary key constraint on columns "type", "vulnerability_id", "url" */
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

/** input type for updating data in table "vulnerability.vulnerability" */
export type Vulnerability_Set_Input = {
  cvss_score?: InputMaybe<Scalars['Float']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  reviewed_by_source?: InputMaybe<Scalars['Boolean']>;
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
  /** unique or primary key constraint on columns "id" */
  SeverityPkey = 'severity_pkey',
  /** unique or primary key constraint on columns "source", "type", "vulnerability_id" */
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
  /** unique or primary key constraint on columns "delivery_id" */
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticatedRepoCloneUrlOutput: ResolverTypeWrapper<AuthenticatedRepoCloneUrlOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Float_comparison_exp: Float_Comparison_Exp;
  GithubRepository: ResolverTypeWrapper<GithubRepository>;
  InstallSelectedReposResponse: ResolverTypeWrapper<InstallSelectedReposResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int_comparison_exp: Int_Comparison_Exp;
  Mutation: ResolverTypeWrapper<Mutation>;
  OrgWithRepos: ResolverTypeWrapper<OrgWithRepos>;
  OrgsWithReposInput: OrgsWithReposInput;
  PresignedUrlResponse: ResolverTypeWrapper<PresignedUrlResponse>;
  Query: ResolverTypeWrapper<Query>;
  SbomUploadUrlInput: SbomUploadUrlInput;
  SbomUploadUrlOutput: ResolverTypeWrapper<SbomUploadUrlOutput>;
  String: ResolverTypeWrapper<Scalars['String']>;
  String_comparison_exp: String_Comparison_Exp;
  UploadUrl: ResolverTypeWrapper<UploadUrl>;
  VulnerabilityData: ResolverTypeWrapper<VulnerabilityData>;
  _text: ResolverTypeWrapper<Scalars['_text']>;
  _text_comparison_exp: _Text_Comparison_Exp;
  affected_range_type: ResolverTypeWrapper<Scalars['affected_range_type']>;
  affected_range_type_comparison_exp: Affected_Range_Type_Comparison_Exp;
  bigint: ResolverTypeWrapper<Scalars['bigint']>;
  bigint_comparison_exp: Bigint_Comparison_Exp;
  build_dependency_relationship: ResolverTypeWrapper<Build_Dependency_Relationship>;
  build_dependency_relationship_aggregate_order_by: Build_Dependency_Relationship_Aggregate_Order_By;
  build_dependency_relationship_append_input: Build_Dependency_Relationship_Append_Input;
  build_dependency_relationship_arr_rel_insert_input: Build_Dependency_Relationship_Arr_Rel_Insert_Input;
  build_dependency_relationship_bool_exp: Build_Dependency_Relationship_Bool_Exp;
  build_dependency_relationship_constraint: Build_Dependency_Relationship_Constraint;
  build_dependency_relationship_delete_at_path_input: Build_Dependency_Relationship_Delete_At_Path_Input;
  build_dependency_relationship_delete_elem_input: Build_Dependency_Relationship_Delete_Elem_Input;
  build_dependency_relationship_delete_key_input: Build_Dependency_Relationship_Delete_Key_Input;
  build_dependency_relationship_insert_input: Build_Dependency_Relationship_Insert_Input;
  build_dependency_relationship_max_order_by: Build_Dependency_Relationship_Max_Order_By;
  build_dependency_relationship_min_order_by: Build_Dependency_Relationship_Min_Order_By;
  build_dependency_relationship_mutation_response: ResolverTypeWrapper<Build_Dependency_Relationship_Mutation_Response>;
  build_dependency_relationship_obj_rel_insert_input: Build_Dependency_Relationship_Obj_Rel_Insert_Input;
  build_dependency_relationship_on_conflict: Build_Dependency_Relationship_On_Conflict;
  build_dependency_relationship_order_by: Build_Dependency_Relationship_Order_By;
  build_dependency_relationship_pk_columns_input: Build_Dependency_Relationship_Pk_Columns_Input;
  build_dependency_relationship_prepend_input: Build_Dependency_Relationship_Prepend_Input;
  build_dependency_relationship_select_column: Build_Dependency_Relationship_Select_Column;
  build_dependency_relationship_set_input: Build_Dependency_Relationship_Set_Input;
  build_dependency_relationship_update_column: Build_Dependency_Relationship_Update_Column;
  builds: ResolverTypeWrapper<Builds>;
  builds_aggregate: ResolverTypeWrapper<Builds_Aggregate>;
  builds_aggregate_fields: ResolverTypeWrapper<Builds_Aggregate_Fields>;
  builds_aggregate_order_by: Builds_Aggregate_Order_By;
  builds_arr_rel_insert_input: Builds_Arr_Rel_Insert_Input;
  builds_avg_fields: ResolverTypeWrapper<Builds_Avg_Fields>;
  builds_avg_order_by: Builds_Avg_Order_By;
  builds_bool_exp: Builds_Bool_Exp;
  builds_constraint: Builds_Constraint;
  builds_inc_input: Builds_Inc_Input;
  builds_insert_input: Builds_Insert_Input;
  builds_max_fields: ResolverTypeWrapper<Builds_Max_Fields>;
  builds_max_order_by: Builds_Max_Order_By;
  builds_min_fields: ResolverTypeWrapper<Builds_Min_Fields>;
  builds_min_order_by: Builds_Min_Order_By;
  builds_mutation_response: ResolverTypeWrapper<Builds_Mutation_Response>;
  builds_obj_rel_insert_input: Builds_Obj_Rel_Insert_Input;
  builds_on_conflict: Builds_On_Conflict;
  builds_order_by: Builds_Order_By;
  builds_pk_columns_input: Builds_Pk_Columns_Input;
  builds_select_column: Builds_Select_Column;
  builds_set_input: Builds_Set_Input;
  builds_source_type: ResolverTypeWrapper<Scalars['builds_source_type']>;
  builds_source_type_comparison_exp: Builds_Source_Type_Comparison_Exp;
  builds_stddev_fields: ResolverTypeWrapper<Builds_Stddev_Fields>;
  builds_stddev_order_by: Builds_Stddev_Order_By;
  builds_stddev_pop_fields: ResolverTypeWrapper<Builds_Stddev_Pop_Fields>;
  builds_stddev_pop_order_by: Builds_Stddev_Pop_Order_By;
  builds_stddev_samp_fields: ResolverTypeWrapper<Builds_Stddev_Samp_Fields>;
  builds_stddev_samp_order_by: Builds_Stddev_Samp_Order_By;
  builds_sum_fields: ResolverTypeWrapper<Builds_Sum_Fields>;
  builds_sum_order_by: Builds_Sum_Order_By;
  builds_update_column: Builds_Update_Column;
  builds_var_pop_fields: ResolverTypeWrapper<Builds_Var_Pop_Fields>;
  builds_var_pop_order_by: Builds_Var_Pop_Order_By;
  builds_var_samp_fields: ResolverTypeWrapper<Builds_Var_Samp_Fields>;
  builds_var_samp_order_by: Builds_Var_Samp_Order_By;
  builds_variance_fields: ResolverTypeWrapper<Builds_Variance_Fields>;
  builds_variance_order_by: Builds_Variance_Order_By;
  date: ResolverTypeWrapper<Scalars['date']>;
  date_comparison_exp: Date_Comparison_Exp;
  default_branch_builds: ResolverTypeWrapper<Default_Branch_Builds>;
  default_branch_builds_aggregate_order_by: Default_Branch_Builds_Aggregate_Order_By;
  default_branch_builds_arr_rel_insert_input: Default_Branch_Builds_Arr_Rel_Insert_Input;
  default_branch_builds_avg_order_by: Default_Branch_Builds_Avg_Order_By;
  default_branch_builds_bool_exp: Default_Branch_Builds_Bool_Exp;
  default_branch_builds_insert_input: Default_Branch_Builds_Insert_Input;
  default_branch_builds_max_order_by: Default_Branch_Builds_Max_Order_By;
  default_branch_builds_min_order_by: Default_Branch_Builds_Min_Order_By;
  default_branch_builds_obj_rel_insert_input: Default_Branch_Builds_Obj_Rel_Insert_Input;
  default_branch_builds_order_by: Default_Branch_Builds_Order_By;
  default_branch_builds_select_column: Default_Branch_Builds_Select_Column;
  default_branch_builds_stddev_order_by: Default_Branch_Builds_Stddev_Order_By;
  default_branch_builds_stddev_pop_order_by: Default_Branch_Builds_Stddev_Pop_Order_By;
  default_branch_builds_stddev_samp_order_by: Default_Branch_Builds_Stddev_Samp_Order_By;
  default_branch_builds_sum_order_by: Default_Branch_Builds_Sum_Order_By;
  default_branch_builds_var_pop_order_by: Default_Branch_Builds_Var_Pop_Order_By;
  default_branch_builds_var_samp_order_by: Default_Branch_Builds_Var_Samp_Order_By;
  default_branch_builds_variance_order_by: Default_Branch_Builds_Variance_Order_By;
  findings: ResolverTypeWrapper<Findings>;
  findings_aggregate_order_by: Findings_Aggregate_Order_By;
  findings_arr_rel_insert_input: Findings_Arr_Rel_Insert_Input;
  findings_bool_exp: Findings_Bool_Exp;
  findings_constraint: Findings_Constraint;
  findings_insert_input: Findings_Insert_Input;
  findings_max_order_by: Findings_Max_Order_By;
  findings_min_order_by: Findings_Min_Order_By;
  findings_mutation_response: ResolverTypeWrapper<Findings_Mutation_Response>;
  findings_on_conflict: Findings_On_Conflict;
  findings_order_by: Findings_Order_By;
  findings_pk_columns_input: Findings_Pk_Columns_Input;
  findings_select_column: Findings_Select_Column;
  findings_set_input: Findings_Set_Input;
  findings_update_column: Findings_Update_Column;
  fix_state_enum: ResolverTypeWrapper<Scalars['fix_state_enum']>;
  fix_state_enum_comparison_exp: Fix_State_Enum_Comparison_Exp;
  github_repositories: ResolverTypeWrapper<Github_Repositories>;
  github_repositories_aggregate_order_by: Github_Repositories_Aggregate_Order_By;
  github_repositories_append_input: Github_Repositories_Append_Input;
  github_repositories_arr_rel_insert_input: Github_Repositories_Arr_Rel_Insert_Input;
  github_repositories_avg_order_by: Github_Repositories_Avg_Order_By;
  github_repositories_bool_exp: Github_Repositories_Bool_Exp;
  github_repositories_constraint: Github_Repositories_Constraint;
  github_repositories_delete_at_path_input: Github_Repositories_Delete_At_Path_Input;
  github_repositories_delete_elem_input: Github_Repositories_Delete_Elem_Input;
  github_repositories_delete_key_input: Github_Repositories_Delete_Key_Input;
  github_repositories_inc_input: Github_Repositories_Inc_Input;
  github_repositories_insert_input: Github_Repositories_Insert_Input;
  github_repositories_max_order_by: Github_Repositories_Max_Order_By;
  github_repositories_min_order_by: Github_Repositories_Min_Order_By;
  github_repositories_mutation_response: ResolverTypeWrapper<Github_Repositories_Mutation_Response>;
  github_repositories_obj_rel_insert_input: Github_Repositories_Obj_Rel_Insert_Input;
  github_repositories_on_conflict: Github_Repositories_On_Conflict;
  github_repositories_order_by: Github_Repositories_Order_By;
  github_repositories_pk_columns_input: Github_Repositories_Pk_Columns_Input;
  github_repositories_prepend_input: Github_Repositories_Prepend_Input;
  github_repositories_select_column: Github_Repositories_Select_Column;
  github_repositories_set_input: Github_Repositories_Set_Input;
  github_repositories_stddev_order_by: Github_Repositories_Stddev_Order_By;
  github_repositories_stddev_pop_order_by: Github_Repositories_Stddev_Pop_Order_By;
  github_repositories_stddev_samp_order_by: Github_Repositories_Stddev_Samp_Order_By;
  github_repositories_sum_order_by: Github_Repositories_Sum_Order_By;
  github_repositories_update_column: Github_Repositories_Update_Column;
  github_repositories_var_pop_order_by: Github_Repositories_Var_Pop_Order_By;
  github_repositories_var_samp_order_by: Github_Repositories_Var_Samp_Order_By;
  github_repositories_variance_order_by: Github_Repositories_Variance_Order_By;
  guide_related_guides: ResolverTypeWrapper<Guide_Related_Guides>;
  guide_related_guides_arr_rel_insert_input: Guide_Related_Guides_Arr_Rel_Insert_Input;
  guide_related_guides_bool_exp: Guide_Related_Guides_Bool_Exp;
  guide_related_guides_constraint: Guide_Related_Guides_Constraint;
  guide_related_guides_insert_input: Guide_Related_Guides_Insert_Input;
  guide_related_guides_mutation_response: ResolverTypeWrapper<Guide_Related_Guides_Mutation_Response>;
  guide_related_guides_on_conflict: Guide_Related_Guides_On_Conflict;
  guide_related_guides_order_by: Guide_Related_Guides_Order_By;
  guide_related_guides_pk_columns_input: Guide_Related_Guides_Pk_Columns_Input;
  guide_related_guides_select_column: Guide_Related_Guides_Select_Column;
  guide_related_guides_set_input: Guide_Related_Guides_Set_Input;
  guide_related_guides_update_column: Guide_Related_Guides_Update_Column;
  guide_vulnerabilities: ResolverTypeWrapper<Guide_Vulnerabilities>;
  guide_vulnerabilities_aggregate_order_by: Guide_Vulnerabilities_Aggregate_Order_By;
  guide_vulnerabilities_arr_rel_insert_input: Guide_Vulnerabilities_Arr_Rel_Insert_Input;
  guide_vulnerabilities_bool_exp: Guide_Vulnerabilities_Bool_Exp;
  guide_vulnerabilities_constraint: Guide_Vulnerabilities_Constraint;
  guide_vulnerabilities_insert_input: Guide_Vulnerabilities_Insert_Input;
  guide_vulnerabilities_max_order_by: Guide_Vulnerabilities_Max_Order_By;
  guide_vulnerabilities_min_order_by: Guide_Vulnerabilities_Min_Order_By;
  guide_vulnerabilities_mutation_response: ResolverTypeWrapper<Guide_Vulnerabilities_Mutation_Response>;
  guide_vulnerabilities_on_conflict: Guide_Vulnerabilities_On_Conflict;
  guide_vulnerabilities_order_by: Guide_Vulnerabilities_Order_By;
  guide_vulnerabilities_pk_columns_input: Guide_Vulnerabilities_Pk_Columns_Input;
  guide_vulnerabilities_select_column: Guide_Vulnerabilities_Select_Column;
  guide_vulnerabilities_set_input: Guide_Vulnerabilities_Set_Input;
  guide_vulnerabilities_update_column: Guide_Vulnerabilities_Update_Column;
  guides_append_input: Guides_Append_Input;
  guides_bool_exp: Guides_Bool_Exp;
  guides_constraint: Guides_Constraint;
  guides_delete_at_path_input: Guides_Delete_At_Path_Input;
  guides_delete_elem_input: Guides_Delete_Elem_Input;
  guides_delete_key_input: Guides_Delete_Key_Input;
  guides_inc_input: Guides_Inc_Input;
  guides_insert_input: Guides_Insert_Input;
  guides_mutation_response: ResolverTypeWrapper<Guides_Mutation_Response>;
  guides_obj_rel_insert_input: Guides_Obj_Rel_Insert_Input;
  guides_on_conflict: Guides_On_Conflict;
  guides_prepend_input: Guides_Prepend_Input;
  guides_set_input: Guides_Set_Input;
  guides_update_column: Guides_Update_Column;
  identities: ResolverTypeWrapper<Identities>;
  identities_bool_exp: Identities_Bool_Exp;
  identities_order_by: Identities_Order_By;
  identities_select_column: Identities_Select_Column;
  identity_verifiable_addresses: ResolverTypeWrapper<Identity_Verifiable_Addresses>;
  identity_verifiable_addresses_aggregate_order_by: Identity_Verifiable_Addresses_Aggregate_Order_By;
  identity_verifiable_addresses_bool_exp: Identity_Verifiable_Addresses_Bool_Exp;
  identity_verifiable_addresses_max_order_by: Identity_Verifiable_Addresses_Max_Order_By;
  identity_verifiable_addresses_min_order_by: Identity_Verifiable_Addresses_Min_Order_By;
  identity_verifiable_addresses_order_by: Identity_Verifiable_Addresses_Order_By;
  identity_verifiable_addresses_select_column: Identity_Verifiable_Addresses_Select_Column;
  ignored_vulnerabilities: ResolverTypeWrapper<Ignored_Vulnerabilities>;
  ignored_vulnerabilities_aggregate_order_by: Ignored_Vulnerabilities_Aggregate_Order_By;
  ignored_vulnerabilities_bool_exp: Ignored_Vulnerabilities_Bool_Exp;
  ignored_vulnerabilities_max_order_by: Ignored_Vulnerabilities_Max_Order_By;
  ignored_vulnerabilities_min_order_by: Ignored_Vulnerabilities_Min_Order_By;
  ignored_vulnerabilities_order_by: Ignored_Vulnerabilities_Order_By;
  ignored_vulnerabilities_select_column: Ignored_Vulnerabilities_Select_Column;
  jsonb: ResolverTypeWrapper<Scalars['jsonb']>;
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  latest_builds: ResolverTypeWrapper<Latest_Builds>;
  latest_builds_bool_exp: Latest_Builds_Bool_Exp;
  latest_builds_order_by: Latest_Builds_Order_By;
  latest_builds_select_column: Latest_Builds_Select_Column;
  license_source: ResolverTypeWrapper<Scalars['license_source']>;
  license_source_comparison_exp: License_Source_Comparison_Exp;
  manifest_dependency: ResolverTypeWrapper<Manifest_Dependency>;
  manifest_dependency_aggregate_order_by: Manifest_Dependency_Aggregate_Order_By;
  manifest_dependency_arr_rel_insert_input: Manifest_Dependency_Arr_Rel_Insert_Input;
  manifest_dependency_bool_exp: Manifest_Dependency_Bool_Exp;
  manifest_dependency_constraint: Manifest_Dependency_Constraint;
  manifest_dependency_edge: ResolverTypeWrapper<Manifest_Dependency_Edge>;
  manifest_dependency_edge_aggregate_order_by: Manifest_Dependency_Edge_Aggregate_Order_By;
  manifest_dependency_edge_arr_rel_insert_input: Manifest_Dependency_Edge_Arr_Rel_Insert_Input;
  manifest_dependency_edge_bool_exp: Manifest_Dependency_Edge_Bool_Exp;
  manifest_dependency_edge_constraint: Manifest_Dependency_Edge_Constraint;
  manifest_dependency_edge_insert_input: Manifest_Dependency_Edge_Insert_Input;
  manifest_dependency_edge_max_order_by: Manifest_Dependency_Edge_Max_Order_By;
  manifest_dependency_edge_min_order_by: Manifest_Dependency_Edge_Min_Order_By;
  manifest_dependency_edge_mutation_response: ResolverTypeWrapper<Manifest_Dependency_Edge_Mutation_Response>;
  manifest_dependency_edge_on_conflict: Manifest_Dependency_Edge_On_Conflict;
  manifest_dependency_edge_order_by: Manifest_Dependency_Edge_Order_By;
  manifest_dependency_edge_select_column: Manifest_Dependency_Edge_Select_Column;
  manifest_dependency_edge_set_input: Manifest_Dependency_Edge_Set_Input;
  manifest_dependency_edge_update_column: Manifest_Dependency_Edge_Update_Column;
  manifest_dependency_insert_input: Manifest_Dependency_Insert_Input;
  manifest_dependency_max_order_by: Manifest_Dependency_Max_Order_By;
  manifest_dependency_min_order_by: Manifest_Dependency_Min_Order_By;
  manifest_dependency_mutation_response: ResolverTypeWrapper<Manifest_Dependency_Mutation_Response>;
  manifest_dependency_node: ResolverTypeWrapper<Manifest_Dependency_Node>;
  manifest_dependency_node_append_input: Manifest_Dependency_Node_Append_Input;
  manifest_dependency_node_bool_exp: Manifest_Dependency_Node_Bool_Exp;
  manifest_dependency_node_constraint: Manifest_Dependency_Node_Constraint;
  manifest_dependency_node_delete_at_path_input: Manifest_Dependency_Node_Delete_At_Path_Input;
  manifest_dependency_node_delete_elem_input: Manifest_Dependency_Node_Delete_Elem_Input;
  manifest_dependency_node_delete_key_input: Manifest_Dependency_Node_Delete_Key_Input;
  manifest_dependency_node_insert_input: Manifest_Dependency_Node_Insert_Input;
  manifest_dependency_node_mutation_response: ResolverTypeWrapper<Manifest_Dependency_Node_Mutation_Response>;
  manifest_dependency_node_obj_rel_insert_input: Manifest_Dependency_Node_Obj_Rel_Insert_Input;
  manifest_dependency_node_on_conflict: Manifest_Dependency_Node_On_Conflict;
  manifest_dependency_node_order_by: Manifest_Dependency_Node_Order_By;
  manifest_dependency_node_pk_columns_input: Manifest_Dependency_Node_Pk_Columns_Input;
  manifest_dependency_node_prepend_input: Manifest_Dependency_Node_Prepend_Input;
  manifest_dependency_node_select_column: Manifest_Dependency_Node_Select_Column;
  manifest_dependency_node_set_input: Manifest_Dependency_Node_Set_Input;
  manifest_dependency_node_update_column: Manifest_Dependency_Node_Update_Column;
  manifest_dependency_on_conflict: Manifest_Dependency_On_Conflict;
  manifest_dependency_order_by: Manifest_Dependency_Order_By;
  manifest_dependency_select_column: Manifest_Dependency_Select_Column;
  manifest_dependency_set_input: Manifest_Dependency_Set_Input;
  manifest_dependency_update_column: Manifest_Dependency_Update_Column;
  manifests: ResolverTypeWrapper<Manifests>;
  manifests_aggregate_order_by: Manifests_Aggregate_Order_By;
  manifests_arr_rel_insert_input: Manifests_Arr_Rel_Insert_Input;
  manifests_bool_exp: Manifests_Bool_Exp;
  manifests_constraint: Manifests_Constraint;
  manifests_insert_input: Manifests_Insert_Input;
  manifests_max_order_by: Manifests_Max_Order_By;
  manifests_min_order_by: Manifests_Min_Order_By;
  manifests_mutation_response: ResolverTypeWrapper<Manifests_Mutation_Response>;
  manifests_on_conflict: Manifests_On_Conflict;
  manifests_order_by: Manifests_Order_By;
  manifests_pk_columns_input: Manifests_Pk_Columns_Input;
  manifests_select_column: Manifests_Select_Column;
  manifests_set_input: Manifests_Set_Input;
  manifests_update_column: Manifests_Update_Column;
  mutation_root: ResolverTypeWrapper<{}>;
  order_by: Order_By;
  organization_user: ResolverTypeWrapper<Organization_User>;
  organization_user_aggregate_order_by: Organization_User_Aggregate_Order_By;
  organization_user_arr_rel_insert_input: Organization_User_Arr_Rel_Insert_Input;
  organization_user_bool_exp: Organization_User_Bool_Exp;
  organization_user_constraint: Organization_User_Constraint;
  organization_user_insert_input: Organization_User_Insert_Input;
  organization_user_max_order_by: Organization_User_Max_Order_By;
  organization_user_min_order_by: Organization_User_Min_Order_By;
  organization_user_mutation_response: ResolverTypeWrapper<Organization_User_Mutation_Response>;
  organization_user_on_conflict: Organization_User_On_Conflict;
  organization_user_order_by: Organization_User_Order_By;
  organization_user_pk_columns_input: Organization_User_Pk_Columns_Input;
  organization_user_role: ResolverTypeWrapper<Scalars['organization_user_role']>;
  organization_user_role_comparison_exp: Organization_User_Role_Comparison_Exp;
  organization_user_select_column: Organization_User_Select_Column;
  organization_user_set_input: Organization_User_Set_Input;
  organization_user_update_column: Organization_User_Update_Column;
  organizations: ResolverTypeWrapper<Organizations>;
  organizations_aggregate: ResolverTypeWrapper<Organizations_Aggregate>;
  organizations_aggregate_fields: ResolverTypeWrapper<Organizations_Aggregate_Fields>;
  organizations_avg_fields: ResolverTypeWrapper<Organizations_Avg_Fields>;
  organizations_bool_exp: Organizations_Bool_Exp;
  organizations_constraint: Organizations_Constraint;
  organizations_inc_input: Organizations_Inc_Input;
  organizations_insert_input: Organizations_Insert_Input;
  organizations_max_fields: ResolverTypeWrapper<Organizations_Max_Fields>;
  organizations_min_fields: ResolverTypeWrapper<Organizations_Min_Fields>;
  organizations_mutation_response: ResolverTypeWrapper<Organizations_Mutation_Response>;
  organizations_obj_rel_insert_input: Organizations_Obj_Rel_Insert_Input;
  organizations_on_conflict: Organizations_On_Conflict;
  organizations_order_by: Organizations_Order_By;
  organizations_pk_columns_input: Organizations_Pk_Columns_Input;
  organizations_select_column: Organizations_Select_Column;
  organizations_set_input: Organizations_Set_Input;
  organizations_stddev_fields: ResolverTypeWrapper<Organizations_Stddev_Fields>;
  organizations_stddev_pop_fields: ResolverTypeWrapper<Organizations_Stddev_Pop_Fields>;
  organizations_stddev_samp_fields: ResolverTypeWrapper<Organizations_Stddev_Samp_Fields>;
  organizations_sum_fields: ResolverTypeWrapper<Organizations_Sum_Fields>;
  organizations_update_column: Organizations_Update_Column;
  organizations_var_pop_fields: ResolverTypeWrapper<Organizations_Var_Pop_Fields>;
  organizations_var_samp_fields: ResolverTypeWrapper<Organizations_Var_Samp_Fields>;
  organizations_variance_fields: ResolverTypeWrapper<Organizations_Variance_Fields>;
  package: ResolverTypeWrapper<Package>;
  package_aggregate: ResolverTypeWrapper<Package_Aggregate>;
  package_aggregate_fields: ResolverTypeWrapper<Package_Aggregate_Fields>;
  package_append_input: Package_Append_Input;
  package_bool_exp: Package_Bool_Exp;
  package_constraint: Package_Constraint;
  package_delete_at_path_input: Package_Delete_At_Path_Input;
  package_delete_elem_input: Package_Delete_Elem_Input;
  package_delete_key_input: Package_Delete_Key_Input;
  package_insert_input: Package_Insert_Input;
  package_license: ResolverTypeWrapper<Package_License>;
  package_license_bool_exp: Package_License_Bool_Exp;
  package_license_constraint: Package_License_Constraint;
  package_license_insert_input: Package_License_Insert_Input;
  package_license_mutation_response: ResolverTypeWrapper<Package_License_Mutation_Response>;
  package_license_obj_rel_insert_input: Package_License_Obj_Rel_Insert_Input;
  package_license_on_conflict: Package_License_On_Conflict;
  package_license_order_by: Package_License_Order_By;
  package_license_pk_columns_input: Package_License_Pk_Columns_Input;
  package_license_select_column: Package_License_Select_Column;
  package_license_set_input: Package_License_Set_Input;
  package_license_update_column: Package_License_Update_Column;
  package_maintainer: ResolverTypeWrapper<Package_Maintainer>;
  package_maintainer_bool_exp: Package_Maintainer_Bool_Exp;
  package_maintainer_constraint: Package_Maintainer_Constraint;
  package_maintainer_insert_input: Package_Maintainer_Insert_Input;
  package_maintainer_mutation_response: ResolverTypeWrapper<Package_Maintainer_Mutation_Response>;
  package_maintainer_obj_rel_insert_input: Package_Maintainer_Obj_Rel_Insert_Input;
  package_maintainer_on_conflict: Package_Maintainer_On_Conflict;
  package_maintainer_order_by: Package_Maintainer_Order_By;
  package_maintainer_pk_columns_input: Package_Maintainer_Pk_Columns_Input;
  package_maintainer_select_column: Package_Maintainer_Select_Column;
  package_maintainer_set_input: Package_Maintainer_Set_Input;
  package_maintainer_update_column: Package_Maintainer_Update_Column;
  package_manager: ResolverTypeWrapper<Scalars['package_manager']>;
  package_manager_comparison_exp: Package_Manager_Comparison_Exp;
  package_max_fields: ResolverTypeWrapper<Package_Max_Fields>;
  package_min_fields: ResolverTypeWrapper<Package_Min_Fields>;
  package_mutation_response: ResolverTypeWrapper<Package_Mutation_Response>;
  package_obj_rel_insert_input: Package_Obj_Rel_Insert_Input;
  package_on_conflict: Package_On_Conflict;
  package_order_by: Package_Order_By;
  package_package_maintainer: ResolverTypeWrapper<Package_Package_Maintainer>;
  package_package_maintainer_aggregate_order_by: Package_Package_Maintainer_Aggregate_Order_By;
  package_package_maintainer_arr_rel_insert_input: Package_Package_Maintainer_Arr_Rel_Insert_Input;
  package_package_maintainer_bool_exp: Package_Package_Maintainer_Bool_Exp;
  package_package_maintainer_constraint: Package_Package_Maintainer_Constraint;
  package_package_maintainer_insert_input: Package_Package_Maintainer_Insert_Input;
  package_package_maintainer_max_order_by: Package_Package_Maintainer_Max_Order_By;
  package_package_maintainer_min_order_by: Package_Package_Maintainer_Min_Order_By;
  package_package_maintainer_mutation_response: ResolverTypeWrapper<Package_Package_Maintainer_Mutation_Response>;
  package_package_maintainer_on_conflict: Package_Package_Maintainer_On_Conflict;
  package_package_maintainer_order_by: Package_Package_Maintainer_Order_By;
  package_package_maintainer_select_column: Package_Package_Maintainer_Select_Column;
  package_package_maintainer_set_input: Package_Package_Maintainer_Set_Input;
  package_package_maintainer_update_column: Package_Package_Maintainer_Update_Column;
  package_pk_columns_input: Package_Pk_Columns_Input;
  package_prepend_input: Package_Prepend_Input;
  package_release: ResolverTypeWrapper<Package_Release>;
  package_release_aggregate_order_by: Package_Release_Aggregate_Order_By;
  package_release_append_input: Package_Release_Append_Input;
  package_release_arr_rel_insert_input: Package_Release_Arr_Rel_Insert_Input;
  package_release_bool_exp: Package_Release_Bool_Exp;
  package_release_constraint: Package_Release_Constraint;
  package_release_delete_at_path_input: Package_Release_Delete_At_Path_Input;
  package_release_delete_elem_input: Package_Release_Delete_Elem_Input;
  package_release_delete_key_input: Package_Release_Delete_Key_Input;
  package_release_dependency: ResolverTypeWrapper<Package_Release_Dependency>;
  package_release_dependency_aggregate_order_by: Package_Release_Dependency_Aggregate_Order_By;
  package_release_dependency_arr_rel_insert_input: Package_Release_Dependency_Arr_Rel_Insert_Input;
  package_release_dependency_bool_exp: Package_Release_Dependency_Bool_Exp;
  package_release_dependency_constraint: Package_Release_Dependency_Constraint;
  package_release_dependency_insert_input: Package_Release_Dependency_Insert_Input;
  package_release_dependency_max_order_by: Package_Release_Dependency_Max_Order_By;
  package_release_dependency_min_order_by: Package_Release_Dependency_Min_Order_By;
  package_release_dependency_mutation_response: ResolverTypeWrapper<Package_Release_Dependency_Mutation_Response>;
  package_release_dependency_on_conflict: Package_Release_Dependency_On_Conflict;
  package_release_dependency_order_by: Package_Release_Dependency_Order_By;
  package_release_dependency_pk_columns_input: Package_Release_Dependency_Pk_Columns_Input;
  package_release_dependency_select_column: Package_Release_Dependency_Select_Column;
  package_release_dependency_set_input: Package_Release_Dependency_Set_Input;
  package_release_dependency_update_column: Package_Release_Dependency_Update_Column;
  package_release_insert_input: Package_Release_Insert_Input;
  package_release_license: ResolverTypeWrapper<Package_Release_License>;
  package_release_license_aggregate_order_by: Package_Release_License_Aggregate_Order_By;
  package_release_license_append_input: Package_Release_License_Append_Input;
  package_release_license_arr_rel_insert_input: Package_Release_License_Arr_Rel_Insert_Input;
  package_release_license_bool_exp: Package_Release_License_Bool_Exp;
  package_release_license_constraint: Package_Release_License_Constraint;
  package_release_license_delete_at_path_input: Package_Release_License_Delete_At_Path_Input;
  package_release_license_delete_elem_input: Package_Release_License_Delete_Elem_Input;
  package_release_license_delete_key_input: Package_Release_License_Delete_Key_Input;
  package_release_license_insert_input: Package_Release_License_Insert_Input;
  package_release_license_max_order_by: Package_Release_License_Max_Order_By;
  package_release_license_min_order_by: Package_Release_License_Min_Order_By;
  package_release_license_mutation_response: ResolverTypeWrapper<Package_Release_License_Mutation_Response>;
  package_release_license_on_conflict: Package_Release_License_On_Conflict;
  package_release_license_order_by: Package_Release_License_Order_By;
  package_release_license_pk_columns_input: Package_Release_License_Pk_Columns_Input;
  package_release_license_prepend_input: Package_Release_License_Prepend_Input;
  package_release_license_select_column: Package_Release_License_Select_Column;
  package_release_license_set_input: Package_Release_License_Set_Input;
  package_release_license_update_column: Package_Release_License_Update_Column;
  package_release_max_order_by: Package_Release_Max_Order_By;
  package_release_min_order_by: Package_Release_Min_Order_By;
  package_release_mutation_response: ResolverTypeWrapper<Package_Release_Mutation_Response>;
  package_release_obj_rel_insert_input: Package_Release_Obj_Rel_Insert_Input;
  package_release_on_conflict: Package_Release_On_Conflict;
  package_release_order_by: Package_Release_Order_By;
  package_release_pk_columns_input: Package_Release_Pk_Columns_Input;
  package_release_prepend_input: Package_Release_Prepend_Input;
  package_release_select_column: Package_Release_Select_Column;
  package_release_set_input: Package_Release_Set_Input;
  package_release_update_column: Package_Release_Update_Column;
  package_select_column: Package_Select_Column;
  package_set_input: Package_Set_Input;
  package_update_column: Package_Update_Column;
  project_access_tokens: ResolverTypeWrapper<Project_Access_Tokens>;
  project_access_tokens_aggregate_order_by: Project_Access_Tokens_Aggregate_Order_By;
  project_access_tokens_bool_exp: Project_Access_Tokens_Bool_Exp;
  project_access_tokens_max_order_by: Project_Access_Tokens_Max_Order_By;
  project_access_tokens_min_order_by: Project_Access_Tokens_Min_Order_By;
  project_access_tokens_order_by: Project_Access_Tokens_Order_By;
  project_access_tokens_select_column: Project_Access_Tokens_Select_Column;
  projects: ResolverTypeWrapper<Projects>;
  projects_aggregate: ResolverTypeWrapper<Projects_Aggregate>;
  projects_aggregate_fields: ResolverTypeWrapper<Projects_Aggregate_Fields>;
  projects_aggregate_order_by: Projects_Aggregate_Order_By;
  projects_arr_rel_insert_input: Projects_Arr_Rel_Insert_Input;
  projects_bool_exp: Projects_Bool_Exp;
  projects_constraint: Projects_Constraint;
  projects_insert_input: Projects_Insert_Input;
  projects_max_fields: ResolverTypeWrapper<Projects_Max_Fields>;
  projects_max_order_by: Projects_Max_Order_By;
  projects_min_fields: ResolverTypeWrapper<Projects_Min_Fields>;
  projects_min_order_by: Projects_Min_Order_By;
  projects_mutation_response: ResolverTypeWrapper<Projects_Mutation_Response>;
  projects_obj_rel_insert_input: Projects_Obj_Rel_Insert_Input;
  projects_on_conflict: Projects_On_Conflict;
  projects_order_by: Projects_Order_By;
  projects_pk_columns_input: Projects_Pk_Columns_Input;
  projects_select_column: Projects_Select_Column;
  projects_set_input: Projects_Set_Input;
  projects_update_column: Projects_Update_Column;
  query_root: ResolverTypeWrapper<{}>;
  reference_type: ResolverTypeWrapper<Scalars['reference_type']>;
  reference_type_comparison_exp: Reference_Type_Comparison_Exp;
  resolved_manifest: ResolverTypeWrapper<Resolved_Manifest>;
  resolved_manifest_aggregate_order_by: Resolved_Manifest_Aggregate_Order_By;
  resolved_manifest_arr_rel_insert_input: Resolved_Manifest_Arr_Rel_Insert_Input;
  resolved_manifest_bool_exp: Resolved_Manifest_Bool_Exp;
  resolved_manifest_constraint: Resolved_Manifest_Constraint;
  resolved_manifest_insert_input: Resolved_Manifest_Insert_Input;
  resolved_manifest_max_order_by: Resolved_Manifest_Max_Order_By;
  resolved_manifest_min_order_by: Resolved_Manifest_Min_Order_By;
  resolved_manifest_mutation_response: ResolverTypeWrapper<Resolved_Manifest_Mutation_Response>;
  resolved_manifest_obj_rel_insert_input: Resolved_Manifest_Obj_Rel_Insert_Input;
  resolved_manifest_on_conflict: Resolved_Manifest_On_Conflict;
  resolved_manifest_order_by: Resolved_Manifest_Order_By;
  resolved_manifest_pk_columns_input: Resolved_Manifest_Pk_Columns_Input;
  resolved_manifest_select_column: Resolved_Manifest_Select_Column;
  resolved_manifest_set_input: Resolved_Manifest_Set_Input;
  resolved_manifest_update_column: Resolved_Manifest_Update_Column;
  scans: ResolverTypeWrapper<Scans>;
  scans_aggregate_order_by: Scans_Aggregate_Order_By;
  scans_arr_rel_insert_input: Scans_Arr_Rel_Insert_Input;
  scans_avg_order_by: Scans_Avg_Order_By;
  scans_bool_exp: Scans_Bool_Exp;
  scans_constraint: Scans_Constraint;
  scans_inc_input: Scans_Inc_Input;
  scans_insert_input: Scans_Insert_Input;
  scans_max_order_by: Scans_Max_Order_By;
  scans_min_order_by: Scans_Min_Order_By;
  scans_mutation_response: ResolverTypeWrapper<Scans_Mutation_Response>;
  scans_obj_rel_insert_input: Scans_Obj_Rel_Insert_Input;
  scans_on_conflict: Scans_On_Conflict;
  scans_order_by: Scans_Order_By;
  scans_pk_columns_input: Scans_Pk_Columns_Input;
  scans_select_column: Scans_Select_Column;
  scans_set_input: Scans_Set_Input;
  scans_stddev_order_by: Scans_Stddev_Order_By;
  scans_stddev_pop_order_by: Scans_Stddev_Pop_Order_By;
  scans_stddev_samp_order_by: Scans_Stddev_Samp_Order_By;
  scans_sum_order_by: Scans_Sum_Order_By;
  scans_update_column: Scans_Update_Column;
  scans_var_pop_order_by: Scans_Var_Pop_Order_By;
  scans_var_samp_order_by: Scans_Var_Samp_Order_By;
  scans_variance_order_by: Scans_Variance_Order_By;
  settings: ResolverTypeWrapper<Settings>;
  settings_bool_exp: Settings_Bool_Exp;
  settings_order_by: Settings_Order_By;
  settings_select_column: Settings_Select_Column;
  severity_enum: ResolverTypeWrapper<Scalars['severity_enum']>;
  severity_enum_comparison_exp: Severity_Enum_Comparison_Exp;
  subscription_root: ResolverTypeWrapper<{}>;
  timestamp: ResolverTypeWrapper<Scalars['timestamp']>;
  timestamp_comparison_exp: Timestamp_Comparison_Exp;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']>;
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  user_role: ResolverTypeWrapper<Scalars['user_role']>;
  user_role_comparison_exp: User_Role_Comparison_Exp;
  users: ResolverTypeWrapper<Users>;
  users_bool_exp: Users_Bool_Exp;
  users_constraint: Users_Constraint;
  users_insert_input: Users_Insert_Input;
  users_mutation_response: ResolverTypeWrapper<Users_Mutation_Response>;
  users_obj_rel_insert_input: Users_Obj_Rel_Insert_Input;
  users_on_conflict: Users_On_Conflict;
  users_order_by: Users_Order_By;
  users_pk_columns_input: Users_Pk_Columns_Input;
  users_select_column: Users_Select_Column;
  users_set_input: Users_Set_Input;
  users_update_column: Users_Update_Column;
  uuid: ResolverTypeWrapper<Scalars['uuid']>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
  vulnerability: ResolverTypeWrapper<Vulnerability>;
  vulnerability_affected: ResolverTypeWrapper<Vulnerability_Affected>;
  vulnerability_affected_aggregate_order_by: Vulnerability_Affected_Aggregate_Order_By;
  vulnerability_affected_append_input: Vulnerability_Affected_Append_Input;
  vulnerability_affected_arr_rel_insert_input: Vulnerability_Affected_Arr_Rel_Insert_Input;
  vulnerability_affected_bool_exp: Vulnerability_Affected_Bool_Exp;
  vulnerability_affected_constraint: Vulnerability_Affected_Constraint;
  vulnerability_affected_delete_at_path_input: Vulnerability_Affected_Delete_At_Path_Input;
  vulnerability_affected_delete_elem_input: Vulnerability_Affected_Delete_Elem_Input;
  vulnerability_affected_delete_key_input: Vulnerability_Affected_Delete_Key_Input;
  vulnerability_affected_insert_input: Vulnerability_Affected_Insert_Input;
  vulnerability_affected_max_order_by: Vulnerability_Affected_Max_Order_By;
  vulnerability_affected_min_order_by: Vulnerability_Affected_Min_Order_By;
  vulnerability_affected_mutation_response: ResolverTypeWrapper<Vulnerability_Affected_Mutation_Response>;
  vulnerability_affected_obj_rel_insert_input: Vulnerability_Affected_Obj_Rel_Insert_Input;
  vulnerability_affected_on_conflict: Vulnerability_Affected_On_Conflict;
  vulnerability_affected_order_by: Vulnerability_Affected_Order_By;
  vulnerability_affected_pk_columns_input: Vulnerability_Affected_Pk_Columns_Input;
  vulnerability_affected_prepend_input: Vulnerability_Affected_Prepend_Input;
  vulnerability_affected_range_event: ResolverTypeWrapper<Vulnerability_Affected_Range_Event>;
  vulnerability_affected_range_event_aggregate_order_by: Vulnerability_Affected_Range_Event_Aggregate_Order_By;
  vulnerability_affected_range_event_append_input: Vulnerability_Affected_Range_Event_Append_Input;
  vulnerability_affected_range_event_arr_rel_insert_input: Vulnerability_Affected_Range_Event_Arr_Rel_Insert_Input;
  vulnerability_affected_range_event_bool_exp: Vulnerability_Affected_Range_Event_Bool_Exp;
  vulnerability_affected_range_event_constraint: Vulnerability_Affected_Range_Event_Constraint;
  vulnerability_affected_range_event_delete_at_path_input: Vulnerability_Affected_Range_Event_Delete_At_Path_Input;
  vulnerability_affected_range_event_delete_elem_input: Vulnerability_Affected_Range_Event_Delete_Elem_Input;
  vulnerability_affected_range_event_delete_key_input: Vulnerability_Affected_Range_Event_Delete_Key_Input;
  vulnerability_affected_range_event_insert_input: Vulnerability_Affected_Range_Event_Insert_Input;
  vulnerability_affected_range_event_max_order_by: Vulnerability_Affected_Range_Event_Max_Order_By;
  vulnerability_affected_range_event_min_order_by: Vulnerability_Affected_Range_Event_Min_Order_By;
  vulnerability_affected_range_event_mutation_response: ResolverTypeWrapper<Vulnerability_Affected_Range_Event_Mutation_Response>;
  vulnerability_affected_range_event_on_conflict: Vulnerability_Affected_Range_Event_On_Conflict;
  vulnerability_affected_range_event_order_by: Vulnerability_Affected_Range_Event_Order_By;
  vulnerability_affected_range_event_pk_columns_input: Vulnerability_Affected_Range_Event_Pk_Columns_Input;
  vulnerability_affected_range_event_prepend_input: Vulnerability_Affected_Range_Event_Prepend_Input;
  vulnerability_affected_range_event_select_column: Vulnerability_Affected_Range_Event_Select_Column;
  vulnerability_affected_range_event_set_input: Vulnerability_Affected_Range_Event_Set_Input;
  vulnerability_affected_range_event_update_column: Vulnerability_Affected_Range_Event_Update_Column;
  vulnerability_affected_select_column: Vulnerability_Affected_Select_Column;
  vulnerability_affected_set_input: Vulnerability_Affected_Set_Input;
  vulnerability_affected_update_column: Vulnerability_Affected_Update_Column;
  vulnerability_affected_version: ResolverTypeWrapper<Vulnerability_Affected_Version>;
  vulnerability_affected_version_aggregate_order_by: Vulnerability_Affected_Version_Aggregate_Order_By;
  vulnerability_affected_version_append_input: Vulnerability_Affected_Version_Append_Input;
  vulnerability_affected_version_arr_rel_insert_input: Vulnerability_Affected_Version_Arr_Rel_Insert_Input;
  vulnerability_affected_version_bool_exp: Vulnerability_Affected_Version_Bool_Exp;
  vulnerability_affected_version_constraint: Vulnerability_Affected_Version_Constraint;
  vulnerability_affected_version_delete_at_path_input: Vulnerability_Affected_Version_Delete_At_Path_Input;
  vulnerability_affected_version_delete_elem_input: Vulnerability_Affected_Version_Delete_Elem_Input;
  vulnerability_affected_version_delete_key_input: Vulnerability_Affected_Version_Delete_Key_Input;
  vulnerability_affected_version_insert_input: Vulnerability_Affected_Version_Insert_Input;
  vulnerability_affected_version_max_order_by: Vulnerability_Affected_Version_Max_Order_By;
  vulnerability_affected_version_min_order_by: Vulnerability_Affected_Version_Min_Order_By;
  vulnerability_affected_version_mutation_response: ResolverTypeWrapper<Vulnerability_Affected_Version_Mutation_Response>;
  vulnerability_affected_version_on_conflict: Vulnerability_Affected_Version_On_Conflict;
  vulnerability_affected_version_order_by: Vulnerability_Affected_Version_Order_By;
  vulnerability_affected_version_pk_columns_input: Vulnerability_Affected_Version_Pk_Columns_Input;
  vulnerability_affected_version_prepend_input: Vulnerability_Affected_Version_Prepend_Input;
  vulnerability_affected_version_select_column: Vulnerability_Affected_Version_Select_Column;
  vulnerability_affected_version_set_input: Vulnerability_Affected_Version_Set_Input;
  vulnerability_affected_version_update_column: Vulnerability_Affected_Version_Update_Column;
  vulnerability_append_input: Vulnerability_Append_Input;
  vulnerability_bool_exp: Vulnerability_Bool_Exp;
  vulnerability_constraint: Vulnerability_Constraint;
  vulnerability_credit: ResolverTypeWrapper<Vulnerability_Credit>;
  vulnerability_credit_aggregate_order_by: Vulnerability_Credit_Aggregate_Order_By;
  vulnerability_credit_arr_rel_insert_input: Vulnerability_Credit_Arr_Rel_Insert_Input;
  vulnerability_credit_bool_exp: Vulnerability_Credit_Bool_Exp;
  vulnerability_credit_constraint: Vulnerability_Credit_Constraint;
  vulnerability_credit_insert_input: Vulnerability_Credit_Insert_Input;
  vulnerability_credit_max_order_by: Vulnerability_Credit_Max_Order_By;
  vulnerability_credit_min_order_by: Vulnerability_Credit_Min_Order_By;
  vulnerability_credit_mutation_response: ResolverTypeWrapper<Vulnerability_Credit_Mutation_Response>;
  vulnerability_credit_on_conflict: Vulnerability_Credit_On_Conflict;
  vulnerability_credit_order_by: Vulnerability_Credit_Order_By;
  vulnerability_credit_pk_columns_input: Vulnerability_Credit_Pk_Columns_Input;
  vulnerability_credit_select_column: Vulnerability_Credit_Select_Column;
  vulnerability_credit_set_input: Vulnerability_Credit_Set_Input;
  vulnerability_credit_update_column: Vulnerability_Credit_Update_Column;
  vulnerability_delete_at_path_input: Vulnerability_Delete_At_Path_Input;
  vulnerability_delete_elem_input: Vulnerability_Delete_Elem_Input;
  vulnerability_delete_key_input: Vulnerability_Delete_Key_Input;
  vulnerability_equivalent: ResolverTypeWrapper<Vulnerability_Equivalent>;
  vulnerability_equivalent_aggregate_order_by: Vulnerability_Equivalent_Aggregate_Order_By;
  vulnerability_equivalent_arr_rel_insert_input: Vulnerability_Equivalent_Arr_Rel_Insert_Input;
  vulnerability_equivalent_bool_exp: Vulnerability_Equivalent_Bool_Exp;
  vulnerability_equivalent_constraint: Vulnerability_Equivalent_Constraint;
  vulnerability_equivalent_insert_input: Vulnerability_Equivalent_Insert_Input;
  vulnerability_equivalent_max_order_by: Vulnerability_Equivalent_Max_Order_By;
  vulnerability_equivalent_min_order_by: Vulnerability_Equivalent_Min_Order_By;
  vulnerability_equivalent_mutation_response: ResolverTypeWrapper<Vulnerability_Equivalent_Mutation_Response>;
  vulnerability_equivalent_on_conflict: Vulnerability_Equivalent_On_Conflict;
  vulnerability_equivalent_order_by: Vulnerability_Equivalent_Order_By;
  vulnerability_equivalent_select_column: Vulnerability_Equivalent_Select_Column;
  vulnerability_equivalent_set_input: Vulnerability_Equivalent_Set_Input;
  vulnerability_equivalent_update_column: Vulnerability_Equivalent_Update_Column;
  vulnerability_inc_input: Vulnerability_Inc_Input;
  vulnerability_insert_input: Vulnerability_Insert_Input;
  vulnerability_mutation_response: ResolverTypeWrapper<Vulnerability_Mutation_Response>;
  vulnerability_obj_rel_insert_input: Vulnerability_Obj_Rel_Insert_Input;
  vulnerability_on_conflict: Vulnerability_On_Conflict;
  vulnerability_order_by: Vulnerability_Order_By;
  vulnerability_pk_columns_input: Vulnerability_Pk_Columns_Input;
  vulnerability_prepend_input: Vulnerability_Prepend_Input;
  vulnerability_range: ResolverTypeWrapper<Vulnerability_Range>;
  vulnerability_range_aggregate_order_by: Vulnerability_Range_Aggregate_Order_By;
  vulnerability_range_arr_rel_insert_input: Vulnerability_Range_Arr_Rel_Insert_Input;
  vulnerability_range_bool_exp: Vulnerability_Range_Bool_Exp;
  vulnerability_range_constraint: Vulnerability_Range_Constraint;
  vulnerability_range_insert_input: Vulnerability_Range_Insert_Input;
  vulnerability_range_max_order_by: Vulnerability_Range_Max_Order_By;
  vulnerability_range_min_order_by: Vulnerability_Range_Min_Order_By;
  vulnerability_range_mutation_response: ResolverTypeWrapper<Vulnerability_Range_Mutation_Response>;
  vulnerability_range_on_conflict: Vulnerability_Range_On_Conflict;
  vulnerability_range_order_by: Vulnerability_Range_Order_By;
  vulnerability_range_pk_columns_input: Vulnerability_Range_Pk_Columns_Input;
  vulnerability_range_select_column: Vulnerability_Range_Select_Column;
  vulnerability_range_set_input: Vulnerability_Range_Set_Input;
  vulnerability_range_update_column: Vulnerability_Range_Update_Column;
  vulnerability_reference: ResolverTypeWrapper<Vulnerability_Reference>;
  vulnerability_reference_aggregate_order_by: Vulnerability_Reference_Aggregate_Order_By;
  vulnerability_reference_arr_rel_insert_input: Vulnerability_Reference_Arr_Rel_Insert_Input;
  vulnerability_reference_bool_exp: Vulnerability_Reference_Bool_Exp;
  vulnerability_reference_constraint: Vulnerability_Reference_Constraint;
  vulnerability_reference_insert_input: Vulnerability_Reference_Insert_Input;
  vulnerability_reference_max_order_by: Vulnerability_Reference_Max_Order_By;
  vulnerability_reference_min_order_by: Vulnerability_Reference_Min_Order_By;
  vulnerability_reference_mutation_response: ResolverTypeWrapper<Vulnerability_Reference_Mutation_Response>;
  vulnerability_reference_on_conflict: Vulnerability_Reference_On_Conflict;
  vulnerability_reference_order_by: Vulnerability_Reference_Order_By;
  vulnerability_reference_pk_columns_input: Vulnerability_Reference_Pk_Columns_Input;
  vulnerability_reference_select_column: Vulnerability_Reference_Select_Column;
  vulnerability_reference_set_input: Vulnerability_Reference_Set_Input;
  vulnerability_reference_update_column: Vulnerability_Reference_Update_Column;
  vulnerability_select_column: Vulnerability_Select_Column;
  vulnerability_set_input: Vulnerability_Set_Input;
  vulnerability_severity: ResolverTypeWrapper<Vulnerability_Severity>;
  vulnerability_severity_aggregate_order_by: Vulnerability_Severity_Aggregate_Order_By;
  vulnerability_severity_arr_rel_insert_input: Vulnerability_Severity_Arr_Rel_Insert_Input;
  vulnerability_severity_bool_exp: Vulnerability_Severity_Bool_Exp;
  vulnerability_severity_constraint: Vulnerability_Severity_Constraint;
  vulnerability_severity_insert_input: Vulnerability_Severity_Insert_Input;
  vulnerability_severity_max_order_by: Vulnerability_Severity_Max_Order_By;
  vulnerability_severity_min_order_by: Vulnerability_Severity_Min_Order_By;
  vulnerability_severity_mutation_response: ResolverTypeWrapper<Vulnerability_Severity_Mutation_Response>;
  vulnerability_severity_on_conflict: Vulnerability_Severity_On_Conflict;
  vulnerability_severity_order_by: Vulnerability_Severity_Order_By;
  vulnerability_severity_pk_columns_input: Vulnerability_Severity_Pk_Columns_Input;
  vulnerability_severity_select_column: Vulnerability_Severity_Select_Column;
  vulnerability_severity_set_input: Vulnerability_Severity_Set_Input;
  vulnerability_severity_update_column: Vulnerability_Severity_Update_Column;
  vulnerability_update_column: Vulnerability_Update_Column;
  webhook_cache: ResolverTypeWrapper<Webhook_Cache>;
  webhook_cache_bool_exp: Webhook_Cache_Bool_Exp;
  webhook_cache_constraint: Webhook_Cache_Constraint;
  webhook_cache_insert_input: Webhook_Cache_Insert_Input;
  webhook_cache_mutation_response: ResolverTypeWrapper<Webhook_Cache_Mutation_Response>;
  webhook_cache_on_conflict: Webhook_Cache_On_Conflict;
  webhook_cache_order_by: Webhook_Cache_Order_By;
  webhook_cache_pk_columns_input: Webhook_Cache_Pk_Columns_Input;
  webhook_cache_select_column: Webhook_Cache_Select_Column;
  webhook_cache_set_input: Webhook_Cache_Set_Input;
  webhook_cache_update_column: Webhook_Cache_Update_Column;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticatedRepoCloneUrlOutput: AuthenticatedRepoCloneUrlOutput;
  Boolean: Scalars['Boolean'];
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: Scalars['Float'];
  Float_comparison_exp: Float_Comparison_Exp;
  GithubRepository: GithubRepository;
  InstallSelectedReposResponse: InstallSelectedReposResponse;
  Int: Scalars['Int'];
  Int_comparison_exp: Int_Comparison_Exp;
  Mutation: Mutation;
  OrgWithRepos: OrgWithRepos;
  OrgsWithReposInput: OrgsWithReposInput;
  PresignedUrlResponse: PresignedUrlResponse;
  Query: Query;
  SbomUploadUrlInput: SbomUploadUrlInput;
  SbomUploadUrlOutput: SbomUploadUrlOutput;
  String: Scalars['String'];
  String_comparison_exp: String_Comparison_Exp;
  UploadUrl: UploadUrl;
  VulnerabilityData: VulnerabilityData;
  _text: Scalars['_text'];
  _text_comparison_exp: _Text_Comparison_Exp;
  affected_range_type: Scalars['affected_range_type'];
  affected_range_type_comparison_exp: Affected_Range_Type_Comparison_Exp;
  bigint: Scalars['bigint'];
  bigint_comparison_exp: Bigint_Comparison_Exp;
  build_dependency_relationship: Build_Dependency_Relationship;
  build_dependency_relationship_aggregate_order_by: Build_Dependency_Relationship_Aggregate_Order_By;
  build_dependency_relationship_append_input: Build_Dependency_Relationship_Append_Input;
  build_dependency_relationship_arr_rel_insert_input: Build_Dependency_Relationship_Arr_Rel_Insert_Input;
  build_dependency_relationship_bool_exp: Build_Dependency_Relationship_Bool_Exp;
  build_dependency_relationship_delete_at_path_input: Build_Dependency_Relationship_Delete_At_Path_Input;
  build_dependency_relationship_delete_elem_input: Build_Dependency_Relationship_Delete_Elem_Input;
  build_dependency_relationship_delete_key_input: Build_Dependency_Relationship_Delete_Key_Input;
  build_dependency_relationship_insert_input: Build_Dependency_Relationship_Insert_Input;
  build_dependency_relationship_max_order_by: Build_Dependency_Relationship_Max_Order_By;
  build_dependency_relationship_min_order_by: Build_Dependency_Relationship_Min_Order_By;
  build_dependency_relationship_mutation_response: Build_Dependency_Relationship_Mutation_Response;
  build_dependency_relationship_obj_rel_insert_input: Build_Dependency_Relationship_Obj_Rel_Insert_Input;
  build_dependency_relationship_on_conflict: Build_Dependency_Relationship_On_Conflict;
  build_dependency_relationship_order_by: Build_Dependency_Relationship_Order_By;
  build_dependency_relationship_pk_columns_input: Build_Dependency_Relationship_Pk_Columns_Input;
  build_dependency_relationship_prepend_input: Build_Dependency_Relationship_Prepend_Input;
  build_dependency_relationship_set_input: Build_Dependency_Relationship_Set_Input;
  builds: Builds;
  builds_aggregate: Builds_Aggregate;
  builds_aggregate_fields: Builds_Aggregate_Fields;
  builds_aggregate_order_by: Builds_Aggregate_Order_By;
  builds_arr_rel_insert_input: Builds_Arr_Rel_Insert_Input;
  builds_avg_fields: Builds_Avg_Fields;
  builds_avg_order_by: Builds_Avg_Order_By;
  builds_bool_exp: Builds_Bool_Exp;
  builds_inc_input: Builds_Inc_Input;
  builds_insert_input: Builds_Insert_Input;
  builds_max_fields: Builds_Max_Fields;
  builds_max_order_by: Builds_Max_Order_By;
  builds_min_fields: Builds_Min_Fields;
  builds_min_order_by: Builds_Min_Order_By;
  builds_mutation_response: Builds_Mutation_Response;
  builds_obj_rel_insert_input: Builds_Obj_Rel_Insert_Input;
  builds_on_conflict: Builds_On_Conflict;
  builds_order_by: Builds_Order_By;
  builds_pk_columns_input: Builds_Pk_Columns_Input;
  builds_set_input: Builds_Set_Input;
  builds_source_type: Scalars['builds_source_type'];
  builds_source_type_comparison_exp: Builds_Source_Type_Comparison_Exp;
  builds_stddev_fields: Builds_Stddev_Fields;
  builds_stddev_order_by: Builds_Stddev_Order_By;
  builds_stddev_pop_fields: Builds_Stddev_Pop_Fields;
  builds_stddev_pop_order_by: Builds_Stddev_Pop_Order_By;
  builds_stddev_samp_fields: Builds_Stddev_Samp_Fields;
  builds_stddev_samp_order_by: Builds_Stddev_Samp_Order_By;
  builds_sum_fields: Builds_Sum_Fields;
  builds_sum_order_by: Builds_Sum_Order_By;
  builds_var_pop_fields: Builds_Var_Pop_Fields;
  builds_var_pop_order_by: Builds_Var_Pop_Order_By;
  builds_var_samp_fields: Builds_Var_Samp_Fields;
  builds_var_samp_order_by: Builds_Var_Samp_Order_By;
  builds_variance_fields: Builds_Variance_Fields;
  builds_variance_order_by: Builds_Variance_Order_By;
  date: Scalars['date'];
  date_comparison_exp: Date_Comparison_Exp;
  default_branch_builds: Default_Branch_Builds;
  default_branch_builds_aggregate_order_by: Default_Branch_Builds_Aggregate_Order_By;
  default_branch_builds_arr_rel_insert_input: Default_Branch_Builds_Arr_Rel_Insert_Input;
  default_branch_builds_avg_order_by: Default_Branch_Builds_Avg_Order_By;
  default_branch_builds_bool_exp: Default_Branch_Builds_Bool_Exp;
  default_branch_builds_insert_input: Default_Branch_Builds_Insert_Input;
  default_branch_builds_max_order_by: Default_Branch_Builds_Max_Order_By;
  default_branch_builds_min_order_by: Default_Branch_Builds_Min_Order_By;
  default_branch_builds_obj_rel_insert_input: Default_Branch_Builds_Obj_Rel_Insert_Input;
  default_branch_builds_order_by: Default_Branch_Builds_Order_By;
  default_branch_builds_stddev_order_by: Default_Branch_Builds_Stddev_Order_By;
  default_branch_builds_stddev_pop_order_by: Default_Branch_Builds_Stddev_Pop_Order_By;
  default_branch_builds_stddev_samp_order_by: Default_Branch_Builds_Stddev_Samp_Order_By;
  default_branch_builds_sum_order_by: Default_Branch_Builds_Sum_Order_By;
  default_branch_builds_var_pop_order_by: Default_Branch_Builds_Var_Pop_Order_By;
  default_branch_builds_var_samp_order_by: Default_Branch_Builds_Var_Samp_Order_By;
  default_branch_builds_variance_order_by: Default_Branch_Builds_Variance_Order_By;
  findings: Findings;
  findings_aggregate_order_by: Findings_Aggregate_Order_By;
  findings_arr_rel_insert_input: Findings_Arr_Rel_Insert_Input;
  findings_bool_exp: Findings_Bool_Exp;
  findings_insert_input: Findings_Insert_Input;
  findings_max_order_by: Findings_Max_Order_By;
  findings_min_order_by: Findings_Min_Order_By;
  findings_mutation_response: Findings_Mutation_Response;
  findings_on_conflict: Findings_On_Conflict;
  findings_order_by: Findings_Order_By;
  findings_pk_columns_input: Findings_Pk_Columns_Input;
  findings_set_input: Findings_Set_Input;
  fix_state_enum: Scalars['fix_state_enum'];
  fix_state_enum_comparison_exp: Fix_State_Enum_Comparison_Exp;
  github_repositories: Github_Repositories;
  github_repositories_aggregate_order_by: Github_Repositories_Aggregate_Order_By;
  github_repositories_append_input: Github_Repositories_Append_Input;
  github_repositories_arr_rel_insert_input: Github_Repositories_Arr_Rel_Insert_Input;
  github_repositories_avg_order_by: Github_Repositories_Avg_Order_By;
  github_repositories_bool_exp: Github_Repositories_Bool_Exp;
  github_repositories_delete_at_path_input: Github_Repositories_Delete_At_Path_Input;
  github_repositories_delete_elem_input: Github_Repositories_Delete_Elem_Input;
  github_repositories_delete_key_input: Github_Repositories_Delete_Key_Input;
  github_repositories_inc_input: Github_Repositories_Inc_Input;
  github_repositories_insert_input: Github_Repositories_Insert_Input;
  github_repositories_max_order_by: Github_Repositories_Max_Order_By;
  github_repositories_min_order_by: Github_Repositories_Min_Order_By;
  github_repositories_mutation_response: Github_Repositories_Mutation_Response;
  github_repositories_obj_rel_insert_input: Github_Repositories_Obj_Rel_Insert_Input;
  github_repositories_on_conflict: Github_Repositories_On_Conflict;
  github_repositories_order_by: Github_Repositories_Order_By;
  github_repositories_pk_columns_input: Github_Repositories_Pk_Columns_Input;
  github_repositories_prepend_input: Github_Repositories_Prepend_Input;
  github_repositories_set_input: Github_Repositories_Set_Input;
  github_repositories_stddev_order_by: Github_Repositories_Stddev_Order_By;
  github_repositories_stddev_pop_order_by: Github_Repositories_Stddev_Pop_Order_By;
  github_repositories_stddev_samp_order_by: Github_Repositories_Stddev_Samp_Order_By;
  github_repositories_sum_order_by: Github_Repositories_Sum_Order_By;
  github_repositories_var_pop_order_by: Github_Repositories_Var_Pop_Order_By;
  github_repositories_var_samp_order_by: Github_Repositories_Var_Samp_Order_By;
  github_repositories_variance_order_by: Github_Repositories_Variance_Order_By;
  guide_related_guides: Guide_Related_Guides;
  guide_related_guides_arr_rel_insert_input: Guide_Related_Guides_Arr_Rel_Insert_Input;
  guide_related_guides_bool_exp: Guide_Related_Guides_Bool_Exp;
  guide_related_guides_insert_input: Guide_Related_Guides_Insert_Input;
  guide_related_guides_mutation_response: Guide_Related_Guides_Mutation_Response;
  guide_related_guides_on_conflict: Guide_Related_Guides_On_Conflict;
  guide_related_guides_order_by: Guide_Related_Guides_Order_By;
  guide_related_guides_pk_columns_input: Guide_Related_Guides_Pk_Columns_Input;
  guide_related_guides_set_input: Guide_Related_Guides_Set_Input;
  guide_vulnerabilities: Guide_Vulnerabilities;
  guide_vulnerabilities_aggregate_order_by: Guide_Vulnerabilities_Aggregate_Order_By;
  guide_vulnerabilities_arr_rel_insert_input: Guide_Vulnerabilities_Arr_Rel_Insert_Input;
  guide_vulnerabilities_bool_exp: Guide_Vulnerabilities_Bool_Exp;
  guide_vulnerabilities_insert_input: Guide_Vulnerabilities_Insert_Input;
  guide_vulnerabilities_max_order_by: Guide_Vulnerabilities_Max_Order_By;
  guide_vulnerabilities_min_order_by: Guide_Vulnerabilities_Min_Order_By;
  guide_vulnerabilities_mutation_response: Guide_Vulnerabilities_Mutation_Response;
  guide_vulnerabilities_on_conflict: Guide_Vulnerabilities_On_Conflict;
  guide_vulnerabilities_order_by: Guide_Vulnerabilities_Order_By;
  guide_vulnerabilities_pk_columns_input: Guide_Vulnerabilities_Pk_Columns_Input;
  guide_vulnerabilities_set_input: Guide_Vulnerabilities_Set_Input;
  guides_append_input: Guides_Append_Input;
  guides_bool_exp: Guides_Bool_Exp;
  guides_delete_at_path_input: Guides_Delete_At_Path_Input;
  guides_delete_elem_input: Guides_Delete_Elem_Input;
  guides_delete_key_input: Guides_Delete_Key_Input;
  guides_inc_input: Guides_Inc_Input;
  guides_insert_input: Guides_Insert_Input;
  guides_mutation_response: Guides_Mutation_Response;
  guides_obj_rel_insert_input: Guides_Obj_Rel_Insert_Input;
  guides_on_conflict: Guides_On_Conflict;
  guides_prepend_input: Guides_Prepend_Input;
  guides_set_input: Guides_Set_Input;
  identities: Identities;
  identities_bool_exp: Identities_Bool_Exp;
  identities_order_by: Identities_Order_By;
  identity_verifiable_addresses: Identity_Verifiable_Addresses;
  identity_verifiable_addresses_aggregate_order_by: Identity_Verifiable_Addresses_Aggregate_Order_By;
  identity_verifiable_addresses_bool_exp: Identity_Verifiable_Addresses_Bool_Exp;
  identity_verifiable_addresses_max_order_by: Identity_Verifiable_Addresses_Max_Order_By;
  identity_verifiable_addresses_min_order_by: Identity_Verifiable_Addresses_Min_Order_By;
  identity_verifiable_addresses_order_by: Identity_Verifiable_Addresses_Order_By;
  ignored_vulnerabilities: Ignored_Vulnerabilities;
  ignored_vulnerabilities_aggregate_order_by: Ignored_Vulnerabilities_Aggregate_Order_By;
  ignored_vulnerabilities_bool_exp: Ignored_Vulnerabilities_Bool_Exp;
  ignored_vulnerabilities_max_order_by: Ignored_Vulnerabilities_Max_Order_By;
  ignored_vulnerabilities_min_order_by: Ignored_Vulnerabilities_Min_Order_By;
  ignored_vulnerabilities_order_by: Ignored_Vulnerabilities_Order_By;
  jsonb: Scalars['jsonb'];
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  latest_builds: Latest_Builds;
  latest_builds_bool_exp: Latest_Builds_Bool_Exp;
  latest_builds_order_by: Latest_Builds_Order_By;
  license_source: Scalars['license_source'];
  license_source_comparison_exp: License_Source_Comparison_Exp;
  manifest_dependency: Manifest_Dependency;
  manifest_dependency_aggregate_order_by: Manifest_Dependency_Aggregate_Order_By;
  manifest_dependency_arr_rel_insert_input: Manifest_Dependency_Arr_Rel_Insert_Input;
  manifest_dependency_bool_exp: Manifest_Dependency_Bool_Exp;
  manifest_dependency_edge: Manifest_Dependency_Edge;
  manifest_dependency_edge_aggregate_order_by: Manifest_Dependency_Edge_Aggregate_Order_By;
  manifest_dependency_edge_arr_rel_insert_input: Manifest_Dependency_Edge_Arr_Rel_Insert_Input;
  manifest_dependency_edge_bool_exp: Manifest_Dependency_Edge_Bool_Exp;
  manifest_dependency_edge_insert_input: Manifest_Dependency_Edge_Insert_Input;
  manifest_dependency_edge_max_order_by: Manifest_Dependency_Edge_Max_Order_By;
  manifest_dependency_edge_min_order_by: Manifest_Dependency_Edge_Min_Order_By;
  manifest_dependency_edge_mutation_response: Manifest_Dependency_Edge_Mutation_Response;
  manifest_dependency_edge_on_conflict: Manifest_Dependency_Edge_On_Conflict;
  manifest_dependency_edge_order_by: Manifest_Dependency_Edge_Order_By;
  manifest_dependency_edge_set_input: Manifest_Dependency_Edge_Set_Input;
  manifest_dependency_insert_input: Manifest_Dependency_Insert_Input;
  manifest_dependency_max_order_by: Manifest_Dependency_Max_Order_By;
  manifest_dependency_min_order_by: Manifest_Dependency_Min_Order_By;
  manifest_dependency_mutation_response: Manifest_Dependency_Mutation_Response;
  manifest_dependency_node: Manifest_Dependency_Node;
  manifest_dependency_node_append_input: Manifest_Dependency_Node_Append_Input;
  manifest_dependency_node_bool_exp: Manifest_Dependency_Node_Bool_Exp;
  manifest_dependency_node_delete_at_path_input: Manifest_Dependency_Node_Delete_At_Path_Input;
  manifest_dependency_node_delete_elem_input: Manifest_Dependency_Node_Delete_Elem_Input;
  manifest_dependency_node_delete_key_input: Manifest_Dependency_Node_Delete_Key_Input;
  manifest_dependency_node_insert_input: Manifest_Dependency_Node_Insert_Input;
  manifest_dependency_node_mutation_response: Manifest_Dependency_Node_Mutation_Response;
  manifest_dependency_node_obj_rel_insert_input: Manifest_Dependency_Node_Obj_Rel_Insert_Input;
  manifest_dependency_node_on_conflict: Manifest_Dependency_Node_On_Conflict;
  manifest_dependency_node_order_by: Manifest_Dependency_Node_Order_By;
  manifest_dependency_node_pk_columns_input: Manifest_Dependency_Node_Pk_Columns_Input;
  manifest_dependency_node_prepend_input: Manifest_Dependency_Node_Prepend_Input;
  manifest_dependency_node_set_input: Manifest_Dependency_Node_Set_Input;
  manifest_dependency_on_conflict: Manifest_Dependency_On_Conflict;
  manifest_dependency_order_by: Manifest_Dependency_Order_By;
  manifest_dependency_set_input: Manifest_Dependency_Set_Input;
  manifests: Manifests;
  manifests_aggregate_order_by: Manifests_Aggregate_Order_By;
  manifests_arr_rel_insert_input: Manifests_Arr_Rel_Insert_Input;
  manifests_bool_exp: Manifests_Bool_Exp;
  manifests_insert_input: Manifests_Insert_Input;
  manifests_max_order_by: Manifests_Max_Order_By;
  manifests_min_order_by: Manifests_Min_Order_By;
  manifests_mutation_response: Manifests_Mutation_Response;
  manifests_on_conflict: Manifests_On_Conflict;
  manifests_order_by: Manifests_Order_By;
  manifests_pk_columns_input: Manifests_Pk_Columns_Input;
  manifests_set_input: Manifests_Set_Input;
  mutation_root: {};
  organization_user: Organization_User;
  organization_user_aggregate_order_by: Organization_User_Aggregate_Order_By;
  organization_user_arr_rel_insert_input: Organization_User_Arr_Rel_Insert_Input;
  organization_user_bool_exp: Organization_User_Bool_Exp;
  organization_user_insert_input: Organization_User_Insert_Input;
  organization_user_max_order_by: Organization_User_Max_Order_By;
  organization_user_min_order_by: Organization_User_Min_Order_By;
  organization_user_mutation_response: Organization_User_Mutation_Response;
  organization_user_on_conflict: Organization_User_On_Conflict;
  organization_user_order_by: Organization_User_Order_By;
  organization_user_pk_columns_input: Organization_User_Pk_Columns_Input;
  organization_user_role: Scalars['organization_user_role'];
  organization_user_role_comparison_exp: Organization_User_Role_Comparison_Exp;
  organization_user_set_input: Organization_User_Set_Input;
  organizations: Organizations;
  organizations_aggregate: Organizations_Aggregate;
  organizations_aggregate_fields: Organizations_Aggregate_Fields;
  organizations_avg_fields: Organizations_Avg_Fields;
  organizations_bool_exp: Organizations_Bool_Exp;
  organizations_inc_input: Organizations_Inc_Input;
  organizations_insert_input: Organizations_Insert_Input;
  organizations_max_fields: Organizations_Max_Fields;
  organizations_min_fields: Organizations_Min_Fields;
  organizations_mutation_response: Organizations_Mutation_Response;
  organizations_obj_rel_insert_input: Organizations_Obj_Rel_Insert_Input;
  organizations_on_conflict: Organizations_On_Conflict;
  organizations_order_by: Organizations_Order_By;
  organizations_pk_columns_input: Organizations_Pk_Columns_Input;
  organizations_set_input: Organizations_Set_Input;
  organizations_stddev_fields: Organizations_Stddev_Fields;
  organizations_stddev_pop_fields: Organizations_Stddev_Pop_Fields;
  organizations_stddev_samp_fields: Organizations_Stddev_Samp_Fields;
  organizations_sum_fields: Organizations_Sum_Fields;
  organizations_var_pop_fields: Organizations_Var_Pop_Fields;
  organizations_var_samp_fields: Organizations_Var_Samp_Fields;
  organizations_variance_fields: Organizations_Variance_Fields;
  package: Package;
  package_aggregate: Package_Aggregate;
  package_aggregate_fields: Package_Aggregate_Fields;
  package_append_input: Package_Append_Input;
  package_bool_exp: Package_Bool_Exp;
  package_delete_at_path_input: Package_Delete_At_Path_Input;
  package_delete_elem_input: Package_Delete_Elem_Input;
  package_delete_key_input: Package_Delete_Key_Input;
  package_insert_input: Package_Insert_Input;
  package_license: Package_License;
  package_license_bool_exp: Package_License_Bool_Exp;
  package_license_insert_input: Package_License_Insert_Input;
  package_license_mutation_response: Package_License_Mutation_Response;
  package_license_obj_rel_insert_input: Package_License_Obj_Rel_Insert_Input;
  package_license_on_conflict: Package_License_On_Conflict;
  package_license_order_by: Package_License_Order_By;
  package_license_pk_columns_input: Package_License_Pk_Columns_Input;
  package_license_set_input: Package_License_Set_Input;
  package_maintainer: Package_Maintainer;
  package_maintainer_bool_exp: Package_Maintainer_Bool_Exp;
  package_maintainer_insert_input: Package_Maintainer_Insert_Input;
  package_maintainer_mutation_response: Package_Maintainer_Mutation_Response;
  package_maintainer_obj_rel_insert_input: Package_Maintainer_Obj_Rel_Insert_Input;
  package_maintainer_on_conflict: Package_Maintainer_On_Conflict;
  package_maintainer_order_by: Package_Maintainer_Order_By;
  package_maintainer_pk_columns_input: Package_Maintainer_Pk_Columns_Input;
  package_maintainer_set_input: Package_Maintainer_Set_Input;
  package_manager: Scalars['package_manager'];
  package_manager_comparison_exp: Package_Manager_Comparison_Exp;
  package_max_fields: Package_Max_Fields;
  package_min_fields: Package_Min_Fields;
  package_mutation_response: Package_Mutation_Response;
  package_obj_rel_insert_input: Package_Obj_Rel_Insert_Input;
  package_on_conflict: Package_On_Conflict;
  package_order_by: Package_Order_By;
  package_package_maintainer: Package_Package_Maintainer;
  package_package_maintainer_aggregate_order_by: Package_Package_Maintainer_Aggregate_Order_By;
  package_package_maintainer_arr_rel_insert_input: Package_Package_Maintainer_Arr_Rel_Insert_Input;
  package_package_maintainer_bool_exp: Package_Package_Maintainer_Bool_Exp;
  package_package_maintainer_insert_input: Package_Package_Maintainer_Insert_Input;
  package_package_maintainer_max_order_by: Package_Package_Maintainer_Max_Order_By;
  package_package_maintainer_min_order_by: Package_Package_Maintainer_Min_Order_By;
  package_package_maintainer_mutation_response: Package_Package_Maintainer_Mutation_Response;
  package_package_maintainer_on_conflict: Package_Package_Maintainer_On_Conflict;
  package_package_maintainer_order_by: Package_Package_Maintainer_Order_By;
  package_package_maintainer_set_input: Package_Package_Maintainer_Set_Input;
  package_pk_columns_input: Package_Pk_Columns_Input;
  package_prepend_input: Package_Prepend_Input;
  package_release: Package_Release;
  package_release_aggregate_order_by: Package_Release_Aggregate_Order_By;
  package_release_append_input: Package_Release_Append_Input;
  package_release_arr_rel_insert_input: Package_Release_Arr_Rel_Insert_Input;
  package_release_bool_exp: Package_Release_Bool_Exp;
  package_release_delete_at_path_input: Package_Release_Delete_At_Path_Input;
  package_release_delete_elem_input: Package_Release_Delete_Elem_Input;
  package_release_delete_key_input: Package_Release_Delete_Key_Input;
  package_release_dependency: Package_Release_Dependency;
  package_release_dependency_aggregate_order_by: Package_Release_Dependency_Aggregate_Order_By;
  package_release_dependency_arr_rel_insert_input: Package_Release_Dependency_Arr_Rel_Insert_Input;
  package_release_dependency_bool_exp: Package_Release_Dependency_Bool_Exp;
  package_release_dependency_insert_input: Package_Release_Dependency_Insert_Input;
  package_release_dependency_max_order_by: Package_Release_Dependency_Max_Order_By;
  package_release_dependency_min_order_by: Package_Release_Dependency_Min_Order_By;
  package_release_dependency_mutation_response: Package_Release_Dependency_Mutation_Response;
  package_release_dependency_on_conflict: Package_Release_Dependency_On_Conflict;
  package_release_dependency_order_by: Package_Release_Dependency_Order_By;
  package_release_dependency_pk_columns_input: Package_Release_Dependency_Pk_Columns_Input;
  package_release_dependency_set_input: Package_Release_Dependency_Set_Input;
  package_release_insert_input: Package_Release_Insert_Input;
  package_release_license: Package_Release_License;
  package_release_license_aggregate_order_by: Package_Release_License_Aggregate_Order_By;
  package_release_license_append_input: Package_Release_License_Append_Input;
  package_release_license_arr_rel_insert_input: Package_Release_License_Arr_Rel_Insert_Input;
  package_release_license_bool_exp: Package_Release_License_Bool_Exp;
  package_release_license_delete_at_path_input: Package_Release_License_Delete_At_Path_Input;
  package_release_license_delete_elem_input: Package_Release_License_Delete_Elem_Input;
  package_release_license_delete_key_input: Package_Release_License_Delete_Key_Input;
  package_release_license_insert_input: Package_Release_License_Insert_Input;
  package_release_license_max_order_by: Package_Release_License_Max_Order_By;
  package_release_license_min_order_by: Package_Release_License_Min_Order_By;
  package_release_license_mutation_response: Package_Release_License_Mutation_Response;
  package_release_license_on_conflict: Package_Release_License_On_Conflict;
  package_release_license_order_by: Package_Release_License_Order_By;
  package_release_license_pk_columns_input: Package_Release_License_Pk_Columns_Input;
  package_release_license_prepend_input: Package_Release_License_Prepend_Input;
  package_release_license_set_input: Package_Release_License_Set_Input;
  package_release_max_order_by: Package_Release_Max_Order_By;
  package_release_min_order_by: Package_Release_Min_Order_By;
  package_release_mutation_response: Package_Release_Mutation_Response;
  package_release_obj_rel_insert_input: Package_Release_Obj_Rel_Insert_Input;
  package_release_on_conflict: Package_Release_On_Conflict;
  package_release_order_by: Package_Release_Order_By;
  package_release_pk_columns_input: Package_Release_Pk_Columns_Input;
  package_release_prepend_input: Package_Release_Prepend_Input;
  package_release_set_input: Package_Release_Set_Input;
  package_set_input: Package_Set_Input;
  project_access_tokens: Project_Access_Tokens;
  project_access_tokens_aggregate_order_by: Project_Access_Tokens_Aggregate_Order_By;
  project_access_tokens_bool_exp: Project_Access_Tokens_Bool_Exp;
  project_access_tokens_max_order_by: Project_Access_Tokens_Max_Order_By;
  project_access_tokens_min_order_by: Project_Access_Tokens_Min_Order_By;
  project_access_tokens_order_by: Project_Access_Tokens_Order_By;
  projects: Projects;
  projects_aggregate: Projects_Aggregate;
  projects_aggregate_fields: Projects_Aggregate_Fields;
  projects_aggregate_order_by: Projects_Aggregate_Order_By;
  projects_arr_rel_insert_input: Projects_Arr_Rel_Insert_Input;
  projects_bool_exp: Projects_Bool_Exp;
  projects_insert_input: Projects_Insert_Input;
  projects_max_fields: Projects_Max_Fields;
  projects_max_order_by: Projects_Max_Order_By;
  projects_min_fields: Projects_Min_Fields;
  projects_min_order_by: Projects_Min_Order_By;
  projects_mutation_response: Projects_Mutation_Response;
  projects_obj_rel_insert_input: Projects_Obj_Rel_Insert_Input;
  projects_on_conflict: Projects_On_Conflict;
  projects_order_by: Projects_Order_By;
  projects_pk_columns_input: Projects_Pk_Columns_Input;
  projects_set_input: Projects_Set_Input;
  query_root: {};
  reference_type: Scalars['reference_type'];
  reference_type_comparison_exp: Reference_Type_Comparison_Exp;
  resolved_manifest: Resolved_Manifest;
  resolved_manifest_aggregate_order_by: Resolved_Manifest_Aggregate_Order_By;
  resolved_manifest_arr_rel_insert_input: Resolved_Manifest_Arr_Rel_Insert_Input;
  resolved_manifest_bool_exp: Resolved_Manifest_Bool_Exp;
  resolved_manifest_insert_input: Resolved_Manifest_Insert_Input;
  resolved_manifest_max_order_by: Resolved_Manifest_Max_Order_By;
  resolved_manifest_min_order_by: Resolved_Manifest_Min_Order_By;
  resolved_manifest_mutation_response: Resolved_Manifest_Mutation_Response;
  resolved_manifest_obj_rel_insert_input: Resolved_Manifest_Obj_Rel_Insert_Input;
  resolved_manifest_on_conflict: Resolved_Manifest_On_Conflict;
  resolved_manifest_order_by: Resolved_Manifest_Order_By;
  resolved_manifest_pk_columns_input: Resolved_Manifest_Pk_Columns_Input;
  resolved_manifest_set_input: Resolved_Manifest_Set_Input;
  scans: Scans;
  scans_aggregate_order_by: Scans_Aggregate_Order_By;
  scans_arr_rel_insert_input: Scans_Arr_Rel_Insert_Input;
  scans_avg_order_by: Scans_Avg_Order_By;
  scans_bool_exp: Scans_Bool_Exp;
  scans_inc_input: Scans_Inc_Input;
  scans_insert_input: Scans_Insert_Input;
  scans_max_order_by: Scans_Max_Order_By;
  scans_min_order_by: Scans_Min_Order_By;
  scans_mutation_response: Scans_Mutation_Response;
  scans_obj_rel_insert_input: Scans_Obj_Rel_Insert_Input;
  scans_on_conflict: Scans_On_Conflict;
  scans_order_by: Scans_Order_By;
  scans_pk_columns_input: Scans_Pk_Columns_Input;
  scans_set_input: Scans_Set_Input;
  scans_stddev_order_by: Scans_Stddev_Order_By;
  scans_stddev_pop_order_by: Scans_Stddev_Pop_Order_By;
  scans_stddev_samp_order_by: Scans_Stddev_Samp_Order_By;
  scans_sum_order_by: Scans_Sum_Order_By;
  scans_var_pop_order_by: Scans_Var_Pop_Order_By;
  scans_var_samp_order_by: Scans_Var_Samp_Order_By;
  scans_variance_order_by: Scans_Variance_Order_By;
  settings: Settings;
  settings_bool_exp: Settings_Bool_Exp;
  settings_order_by: Settings_Order_By;
  severity_enum: Scalars['severity_enum'];
  severity_enum_comparison_exp: Severity_Enum_Comparison_Exp;
  subscription_root: {};
  timestamp: Scalars['timestamp'];
  timestamp_comparison_exp: Timestamp_Comparison_Exp;
  timestamptz: Scalars['timestamptz'];
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  user_role: Scalars['user_role'];
  user_role_comparison_exp: User_Role_Comparison_Exp;
  users: Users;
  users_bool_exp: Users_Bool_Exp;
  users_insert_input: Users_Insert_Input;
  users_mutation_response: Users_Mutation_Response;
  users_obj_rel_insert_input: Users_Obj_Rel_Insert_Input;
  users_on_conflict: Users_On_Conflict;
  users_order_by: Users_Order_By;
  users_pk_columns_input: Users_Pk_Columns_Input;
  users_set_input: Users_Set_Input;
  uuid: Scalars['uuid'];
  uuid_comparison_exp: Uuid_Comparison_Exp;
  vulnerability: Vulnerability;
  vulnerability_affected: Vulnerability_Affected;
  vulnerability_affected_aggregate_order_by: Vulnerability_Affected_Aggregate_Order_By;
  vulnerability_affected_append_input: Vulnerability_Affected_Append_Input;
  vulnerability_affected_arr_rel_insert_input: Vulnerability_Affected_Arr_Rel_Insert_Input;
  vulnerability_affected_bool_exp: Vulnerability_Affected_Bool_Exp;
  vulnerability_affected_delete_at_path_input: Vulnerability_Affected_Delete_At_Path_Input;
  vulnerability_affected_delete_elem_input: Vulnerability_Affected_Delete_Elem_Input;
  vulnerability_affected_delete_key_input: Vulnerability_Affected_Delete_Key_Input;
  vulnerability_affected_insert_input: Vulnerability_Affected_Insert_Input;
  vulnerability_affected_max_order_by: Vulnerability_Affected_Max_Order_By;
  vulnerability_affected_min_order_by: Vulnerability_Affected_Min_Order_By;
  vulnerability_affected_mutation_response: Vulnerability_Affected_Mutation_Response;
  vulnerability_affected_obj_rel_insert_input: Vulnerability_Affected_Obj_Rel_Insert_Input;
  vulnerability_affected_on_conflict: Vulnerability_Affected_On_Conflict;
  vulnerability_affected_order_by: Vulnerability_Affected_Order_By;
  vulnerability_affected_pk_columns_input: Vulnerability_Affected_Pk_Columns_Input;
  vulnerability_affected_prepend_input: Vulnerability_Affected_Prepend_Input;
  vulnerability_affected_range_event: Vulnerability_Affected_Range_Event;
  vulnerability_affected_range_event_aggregate_order_by: Vulnerability_Affected_Range_Event_Aggregate_Order_By;
  vulnerability_affected_range_event_append_input: Vulnerability_Affected_Range_Event_Append_Input;
  vulnerability_affected_range_event_arr_rel_insert_input: Vulnerability_Affected_Range_Event_Arr_Rel_Insert_Input;
  vulnerability_affected_range_event_bool_exp: Vulnerability_Affected_Range_Event_Bool_Exp;
  vulnerability_affected_range_event_delete_at_path_input: Vulnerability_Affected_Range_Event_Delete_At_Path_Input;
  vulnerability_affected_range_event_delete_elem_input: Vulnerability_Affected_Range_Event_Delete_Elem_Input;
  vulnerability_affected_range_event_delete_key_input: Vulnerability_Affected_Range_Event_Delete_Key_Input;
  vulnerability_affected_range_event_insert_input: Vulnerability_Affected_Range_Event_Insert_Input;
  vulnerability_affected_range_event_max_order_by: Vulnerability_Affected_Range_Event_Max_Order_By;
  vulnerability_affected_range_event_min_order_by: Vulnerability_Affected_Range_Event_Min_Order_By;
  vulnerability_affected_range_event_mutation_response: Vulnerability_Affected_Range_Event_Mutation_Response;
  vulnerability_affected_range_event_on_conflict: Vulnerability_Affected_Range_Event_On_Conflict;
  vulnerability_affected_range_event_order_by: Vulnerability_Affected_Range_Event_Order_By;
  vulnerability_affected_range_event_pk_columns_input: Vulnerability_Affected_Range_Event_Pk_Columns_Input;
  vulnerability_affected_range_event_prepend_input: Vulnerability_Affected_Range_Event_Prepend_Input;
  vulnerability_affected_range_event_set_input: Vulnerability_Affected_Range_Event_Set_Input;
  vulnerability_affected_set_input: Vulnerability_Affected_Set_Input;
  vulnerability_affected_version: Vulnerability_Affected_Version;
  vulnerability_affected_version_aggregate_order_by: Vulnerability_Affected_Version_Aggregate_Order_By;
  vulnerability_affected_version_append_input: Vulnerability_Affected_Version_Append_Input;
  vulnerability_affected_version_arr_rel_insert_input: Vulnerability_Affected_Version_Arr_Rel_Insert_Input;
  vulnerability_affected_version_bool_exp: Vulnerability_Affected_Version_Bool_Exp;
  vulnerability_affected_version_delete_at_path_input: Vulnerability_Affected_Version_Delete_At_Path_Input;
  vulnerability_affected_version_delete_elem_input: Vulnerability_Affected_Version_Delete_Elem_Input;
  vulnerability_affected_version_delete_key_input: Vulnerability_Affected_Version_Delete_Key_Input;
  vulnerability_affected_version_insert_input: Vulnerability_Affected_Version_Insert_Input;
  vulnerability_affected_version_max_order_by: Vulnerability_Affected_Version_Max_Order_By;
  vulnerability_affected_version_min_order_by: Vulnerability_Affected_Version_Min_Order_By;
  vulnerability_affected_version_mutation_response: Vulnerability_Affected_Version_Mutation_Response;
  vulnerability_affected_version_on_conflict: Vulnerability_Affected_Version_On_Conflict;
  vulnerability_affected_version_order_by: Vulnerability_Affected_Version_Order_By;
  vulnerability_affected_version_pk_columns_input: Vulnerability_Affected_Version_Pk_Columns_Input;
  vulnerability_affected_version_prepend_input: Vulnerability_Affected_Version_Prepend_Input;
  vulnerability_affected_version_set_input: Vulnerability_Affected_Version_Set_Input;
  vulnerability_append_input: Vulnerability_Append_Input;
  vulnerability_bool_exp: Vulnerability_Bool_Exp;
  vulnerability_credit: Vulnerability_Credit;
  vulnerability_credit_aggregate_order_by: Vulnerability_Credit_Aggregate_Order_By;
  vulnerability_credit_arr_rel_insert_input: Vulnerability_Credit_Arr_Rel_Insert_Input;
  vulnerability_credit_bool_exp: Vulnerability_Credit_Bool_Exp;
  vulnerability_credit_insert_input: Vulnerability_Credit_Insert_Input;
  vulnerability_credit_max_order_by: Vulnerability_Credit_Max_Order_By;
  vulnerability_credit_min_order_by: Vulnerability_Credit_Min_Order_By;
  vulnerability_credit_mutation_response: Vulnerability_Credit_Mutation_Response;
  vulnerability_credit_on_conflict: Vulnerability_Credit_On_Conflict;
  vulnerability_credit_order_by: Vulnerability_Credit_Order_By;
  vulnerability_credit_pk_columns_input: Vulnerability_Credit_Pk_Columns_Input;
  vulnerability_credit_set_input: Vulnerability_Credit_Set_Input;
  vulnerability_delete_at_path_input: Vulnerability_Delete_At_Path_Input;
  vulnerability_delete_elem_input: Vulnerability_Delete_Elem_Input;
  vulnerability_delete_key_input: Vulnerability_Delete_Key_Input;
  vulnerability_equivalent: Vulnerability_Equivalent;
  vulnerability_equivalent_aggregate_order_by: Vulnerability_Equivalent_Aggregate_Order_By;
  vulnerability_equivalent_arr_rel_insert_input: Vulnerability_Equivalent_Arr_Rel_Insert_Input;
  vulnerability_equivalent_bool_exp: Vulnerability_Equivalent_Bool_Exp;
  vulnerability_equivalent_insert_input: Vulnerability_Equivalent_Insert_Input;
  vulnerability_equivalent_max_order_by: Vulnerability_Equivalent_Max_Order_By;
  vulnerability_equivalent_min_order_by: Vulnerability_Equivalent_Min_Order_By;
  vulnerability_equivalent_mutation_response: Vulnerability_Equivalent_Mutation_Response;
  vulnerability_equivalent_on_conflict: Vulnerability_Equivalent_On_Conflict;
  vulnerability_equivalent_order_by: Vulnerability_Equivalent_Order_By;
  vulnerability_equivalent_set_input: Vulnerability_Equivalent_Set_Input;
  vulnerability_inc_input: Vulnerability_Inc_Input;
  vulnerability_insert_input: Vulnerability_Insert_Input;
  vulnerability_mutation_response: Vulnerability_Mutation_Response;
  vulnerability_obj_rel_insert_input: Vulnerability_Obj_Rel_Insert_Input;
  vulnerability_on_conflict: Vulnerability_On_Conflict;
  vulnerability_order_by: Vulnerability_Order_By;
  vulnerability_pk_columns_input: Vulnerability_Pk_Columns_Input;
  vulnerability_prepend_input: Vulnerability_Prepend_Input;
  vulnerability_range: Vulnerability_Range;
  vulnerability_range_aggregate_order_by: Vulnerability_Range_Aggregate_Order_By;
  vulnerability_range_arr_rel_insert_input: Vulnerability_Range_Arr_Rel_Insert_Input;
  vulnerability_range_bool_exp: Vulnerability_Range_Bool_Exp;
  vulnerability_range_insert_input: Vulnerability_Range_Insert_Input;
  vulnerability_range_max_order_by: Vulnerability_Range_Max_Order_By;
  vulnerability_range_min_order_by: Vulnerability_Range_Min_Order_By;
  vulnerability_range_mutation_response: Vulnerability_Range_Mutation_Response;
  vulnerability_range_on_conflict: Vulnerability_Range_On_Conflict;
  vulnerability_range_order_by: Vulnerability_Range_Order_By;
  vulnerability_range_pk_columns_input: Vulnerability_Range_Pk_Columns_Input;
  vulnerability_range_set_input: Vulnerability_Range_Set_Input;
  vulnerability_reference: Vulnerability_Reference;
  vulnerability_reference_aggregate_order_by: Vulnerability_Reference_Aggregate_Order_By;
  vulnerability_reference_arr_rel_insert_input: Vulnerability_Reference_Arr_Rel_Insert_Input;
  vulnerability_reference_bool_exp: Vulnerability_Reference_Bool_Exp;
  vulnerability_reference_insert_input: Vulnerability_Reference_Insert_Input;
  vulnerability_reference_max_order_by: Vulnerability_Reference_Max_Order_By;
  vulnerability_reference_min_order_by: Vulnerability_Reference_Min_Order_By;
  vulnerability_reference_mutation_response: Vulnerability_Reference_Mutation_Response;
  vulnerability_reference_on_conflict: Vulnerability_Reference_On_Conflict;
  vulnerability_reference_order_by: Vulnerability_Reference_Order_By;
  vulnerability_reference_pk_columns_input: Vulnerability_Reference_Pk_Columns_Input;
  vulnerability_reference_set_input: Vulnerability_Reference_Set_Input;
  vulnerability_set_input: Vulnerability_Set_Input;
  vulnerability_severity: Vulnerability_Severity;
  vulnerability_severity_aggregate_order_by: Vulnerability_Severity_Aggregate_Order_By;
  vulnerability_severity_arr_rel_insert_input: Vulnerability_Severity_Arr_Rel_Insert_Input;
  vulnerability_severity_bool_exp: Vulnerability_Severity_Bool_Exp;
  vulnerability_severity_insert_input: Vulnerability_Severity_Insert_Input;
  vulnerability_severity_max_order_by: Vulnerability_Severity_Max_Order_By;
  vulnerability_severity_min_order_by: Vulnerability_Severity_Min_Order_By;
  vulnerability_severity_mutation_response: Vulnerability_Severity_Mutation_Response;
  vulnerability_severity_on_conflict: Vulnerability_Severity_On_Conflict;
  vulnerability_severity_order_by: Vulnerability_Severity_Order_By;
  vulnerability_severity_pk_columns_input: Vulnerability_Severity_Pk_Columns_Input;
  vulnerability_severity_set_input: Vulnerability_Severity_Set_Input;
  webhook_cache: Webhook_Cache;
  webhook_cache_bool_exp: Webhook_Cache_Bool_Exp;
  webhook_cache_insert_input: Webhook_Cache_Insert_Input;
  webhook_cache_mutation_response: Webhook_Cache_Mutation_Response;
  webhook_cache_on_conflict: Webhook_Cache_On_Conflict;
  webhook_cache_order_by: Webhook_Cache_Order_By;
  webhook_cache_pk_columns_input: Webhook_Cache_Pk_Columns_Input;
  webhook_cache_set_input: Webhook_Cache_Set_Input;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean'];
  ttl?: Scalars['Int'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = Context, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthenticatedRepoCloneUrlOutputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthenticatedRepoCloneUrlOutput'] = ResolversParentTypes['AuthenticatedRepoCloneUrlOutput']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GithubRepositoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GithubRepository'] = ResolversParentTypes['GithubRepository']> = {
  cloneUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultBranch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gitUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orgId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orgName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orgNodeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repoId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repoName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repoNodeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstallSelectedReposResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstallSelectedReposResponse'] = ResolversParentTypes['InstallSelectedReposResponse']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  installSelectedRepos?: Resolver<Maybe<ResolversTypes['InstallSelectedReposResponse']>, ParentType, ContextType, RequireFields<MutationInstallSelectedReposArgs, 'orgs'>>;
  presignManifestUpload?: Resolver<Maybe<ResolversTypes['PresignedUrlResponse']>, ParentType, ContextType, RequireFields<MutationPresignManifestUploadArgs, 'project_id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrgWithReposResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrgWithRepos'] = ResolversParentTypes['OrgWithRepos']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repos?: Resolver<Array<ResolversTypes['GithubRepository']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PresignedUrlResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PresignedUrlResponse'] = ResolversParentTypes['PresignedUrlResponse']> = {
  bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headers?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authenticatedRepoCloneUrl?: Resolver<Maybe<ResolversTypes['AuthenticatedRepoCloneUrlOutput']>, ParentType, ContextType, RequireFields<QueryAuthenticatedRepoCloneUrlArgs, 'repoGithubId'>>;
  availableOrgsWithRepos?: Resolver<Maybe<Array<ResolversTypes['OrgWithRepos']>>, ParentType, ContextType>;
  fakeQueryToHackHasuraBeingABuggyMess?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  presignSbomUpload?: Resolver<Maybe<ResolversTypes['SbomUploadUrlOutput']>, ParentType, ContextType, RequireFields<QueryPresignSbomUploadArgs, 'buildId' | 'orgId'>>;
  sbomUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QuerySbomUrlArgs, 'buildId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SbomUploadUrlOutputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SbomUploadUrlOutput'] = ResolversParentTypes['SbomUploadUrlOutput']> = {
  error?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploadUrl?: Resolver<Maybe<ResolversTypes['UploadUrl']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadUrl'] = ResolversParentTypes['UploadUrl']> = {
  headers?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VulnerabilityDataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VulnerabilityData'] = ResolversParentTypes['VulnerabilityData']> = {
  devOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface _TextScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_text'], any> {
  name: '_text';
}

export interface Affected_Range_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['affected_range_type'], any> {
  name: 'affected_range_type';
}

export interface BigintScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['bigint'], any> {
  name: 'bigint';
}

export type Build_Dependency_RelationshipResolvers<ContextType = Context, ParentType extends ResolversParentTypes['build_dependency_relationship'] = ResolversParentTypes['build_dependency_relationship']> = {
  build?: Resolver<ResolversTypes['builds'], ParentType, ContextType>;
  build_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  depended_by_relationship?: Resolver<Maybe<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType>;
  depended_by_relationship_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  labels?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Build_Dependency_RelationshipLabelsArgs>>;
  project_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['package_release'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Build_Dependency_Relationship_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['build_dependency_relationship_mutation_response'] = ResolversParentTypes['build_dependency_relationship_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds'] = ResolversParentTypes['builds']> = {
  agent_access_token?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  build_dependency_relationships?: Resolver<Array<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, Partial<BuildsBuild_Dependency_RelationshipsArgs>>;
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  existing_github_review_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  findings?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType, Partial<BuildsFindingsArgs>>;
  git_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  manifests?: Resolver<Array<ResolversTypes['manifests']>, ParentType, ContextType, Partial<BuildsManifestsArgs>>;
  project?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  pull_request_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolved_manifests?: Resolver<Array<ResolversTypes['resolved_manifest']>, ParentType, ContextType, Partial<BuildsResolved_ManifestsArgs>>;
  s3_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scans?: Resolver<Array<ResolversTypes['scans']>, ParentType, ContextType, Partial<BuildsScansArgs>>;
  source_type?: Resolver<ResolversTypes['builds_source_type'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_AggregateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_aggregate'] = ResolversParentTypes['builds_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['builds_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['builds']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Aggregate_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_aggregate_fields'] = ResolversParentTypes['builds_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['builds_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Builds_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['builds_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['builds_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['builds_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['builds_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['builds_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['builds_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['builds_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['builds_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['builds_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Avg_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_avg_fields'] = ResolversParentTypes['builds_avg_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Max_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_max_fields'] = ResolversParentTypes['builds_max_fields']> = {
  agent_access_token?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  existing_github_review_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  pull_request_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source_type?: Resolver<Maybe<ResolversTypes['builds_source_type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Min_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_min_fields'] = ResolversParentTypes['builds_min_fields']> = {
  agent_access_token?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  existing_github_review_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  pull_request_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source_type?: Resolver<Maybe<ResolversTypes['builds_source_type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_mutation_response'] = ResolversParentTypes['builds_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['builds']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Builds_Source_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['builds_source_type'], any> {
  name: 'builds_source_type';
}

export type Builds_Stddev_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_stddev_fields'] = ResolversParentTypes['builds_stddev_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Stddev_Pop_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_stddev_pop_fields'] = ResolversParentTypes['builds_stddev_pop_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Stddev_Samp_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_stddev_samp_fields'] = ResolversParentTypes['builds_stddev_samp_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Sum_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_sum_fields'] = ResolversParentTypes['builds_sum_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Var_Pop_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_var_pop_fields'] = ResolversParentTypes['builds_var_pop_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Var_Samp_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_var_samp_fields'] = ResolversParentTypes['builds_var_samp_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Builds_Variance_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['builds_variance_fields'] = ResolversParentTypes['builds_variance_fields']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  existing_github_check_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['date'], any> {
  name: 'date';
}

export type Default_Branch_BuildsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['default_branch_builds'] = ResolversParentTypes['default_branch_builds']> = {
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  existing_github_review_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  findings?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType, Partial<Default_Branch_BuildsFindingsArgs>>;
  git_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  pull_request_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scans?: Resolver<Array<ResolversTypes['scans']>, ParentType, ContextType, Partial<Default_Branch_BuildsScansArgs>>;
  source_type?: Resolver<Maybe<ResolversTypes['builds_source_type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['findings'] = ResolversParentTypes['findings']> = {
  build?: Resolver<ResolversTypes['builds'], ParentType, ContextType>;
  build_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  dedupe_slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  default_branch_build?: Resolver<Maybe<ResolversTypes['default_branch_builds']>, ParentType, ContextType>;
  fix_state?: Resolver<ResolversTypes['fix_state_enum'], ParentType, ContextType>;
  fix_versions?: Resolver<Maybe<ResolversTypes['_text']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locations?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  matcher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  package_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scan?: Resolver<ResolversTypes['scans'], ParentType, ContextType>;
  scan_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['severity_enum'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version_matcher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  virtual_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  vulnerability_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Findings_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['findings_mutation_response'] = ResolversParentTypes['findings_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Fix_State_EnumScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['fix_state_enum'], any> {
  name: 'fix_state_enum';
}

export type Github_RepositoriesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['github_repositories'] = ResolversParentTypes['github_repositories']> = {
  default_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  github_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  github_node_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  traits?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Github_RepositoriesTraitsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Github_Repositories_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['github_repositories_mutation_response'] = ResolversParentTypes['github_repositories_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['github_repositories']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Guide_Related_GuidesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['guide_related_guides'] = ResolversParentTypes['guide_related_guides']> = {
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  from_guide_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  to_guide_unique_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Guide_Related_Guides_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['guide_related_guides_mutation_response'] = ResolversParentTypes['guide_related_guides_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['guide_related_guides']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Guide_VulnerabilitiesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['guide_vulnerabilities'] = ResolversParentTypes['guide_vulnerabilities']> = {
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  guide_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  vulnerability_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Guide_Vulnerabilities_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['guide_vulnerabilities_mutation_response'] = ResolversParentTypes['guide_vulnerabilities_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Guides_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['guides_mutation_response'] = ResolversParentTypes['guides_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IdentitiesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['identities'] = ResolversParentTypes['identities']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  identity_verifiable_addresses?: Resolver<Array<ResolversTypes['identity_verifiable_addresses']>, ParentType, ContextType, Partial<IdentitiesIdentity_Verifiable_AddressesArgs>>;
  nid?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  schema_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state_changed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  traits?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<IdentitiesTraitsArgs>>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Identity_Verifiable_AddressesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['identity_verifiable_addresses'] = ResolversParentTypes['identity_verifiable_addresses']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  identity?: Resolver<ResolversTypes['identities'], ParentType, ContextType>;
  identity_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  nid?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  verified_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  via?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ignored_VulnerabilitiesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ignored_vulnerabilities'] = ResolversParentTypes['ignored_vulnerabilities']> = {
  creator?: Resolver<Maybe<ResolversTypes['identities']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  locations?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Ignored_VulnerabilitiesLocationsArgs>>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  vulnerability_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export type Latest_BuildsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['latest_builds'] = ResolversParentTypes['latest_builds']> = {
  agent_access_token?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  build_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  existing_github_review_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  git_remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  pull_request_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source_type?: Resolver<Maybe<ResolversTypes['builds_source_type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface License_SourceScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['license_source'], any> {
  name: 'license_source';
}

export type Manifest_DependencyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency'] = ResolversParentTypes['manifest_dependency']> = {
  child_edges_recursive?: Resolver<Maybe<Array<ResolversTypes['manifest_dependency_edge']>>, ParentType, ContextType, Partial<Manifest_DependencyChild_Edges_RecursiveArgs>>;
  manifest_dependency_node?: Resolver<ResolversTypes['manifest_dependency_node'], ParentType, ContextType>;
  manifest_dependency_node_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  manifest_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  resolved_manifest?: Resolver<ResolversTypes['resolved_manifest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifest_Dependency_EdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency_edge'] = ResolversParentTypes['manifest_dependency_edge']> = {
  child?: Resolver<ResolversTypes['manifest_dependency_node'], ParentType, ContextType>;
  child_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['manifest_dependency_node'], ParentType, ContextType>;
  parent_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifest_Dependency_Edge_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency_edge_mutation_response'] = ResolversParentTypes['manifest_dependency_edge_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manifest_dependency_edge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifest_Dependency_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency_mutation_response'] = ResolversParentTypes['manifest_dependency_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manifest_dependency']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifest_Dependency_NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency_node'] = ResolversParentTypes['manifest_dependency_node']> = {
  child_edges?: Resolver<Array<ResolversTypes['manifest_dependency_edge']>, ParentType, ContextType, Partial<Manifest_Dependency_NodeChild_EdgesArgs>>;
  child_edges_recursive?: Resolver<Maybe<Array<ResolversTypes['manifest_dependency_edge']>>, ParentType, ContextType, Partial<Manifest_Dependency_NodeChild_Edges_RecursiveArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  labels?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Manifest_Dependency_NodeLabelsArgs>>;
  parent_edges?: Resolver<Array<ResolversTypes['manifest_dependency_edge']>, ParentType, ContextType, Partial<Manifest_Dependency_NodeParent_EdgesArgs>>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['package_release'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifest_Dependency_Node_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifest_dependency_node_mutation_response'] = ResolversParentTypes['manifest_dependency_node_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manifest_dependency_node']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManifestsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifests'] = ResolversParentTypes['manifests']> = {
  build?: Resolver<Maybe<ResolversTypes['builds']>, ParentType, ContextType>;
  build_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  s3_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manifests_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['manifests_mutation_response'] = ResolversParentTypes['manifests_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manifests']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<ContextType = Context, ParentType extends ResolversParentTypes['mutation_root'] = ResolversParentTypes['mutation_root']> = {
  delete_build_dependency_relationship?: Resolver<Maybe<ResolversTypes['build_dependency_relationship_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Build_Dependency_RelationshipArgs, 'where'>>;
  delete_build_dependency_relationship_by_pk?: Resolver<Maybe<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Build_Dependency_Relationship_By_PkArgs, 'id'>>;
  delete_builds?: Resolver<Maybe<ResolversTypes['builds_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_BuildsArgs, 'where'>>;
  delete_builds_by_pk?: Resolver<Maybe<ResolversTypes['builds']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Builds_By_PkArgs, 'id'>>;
  delete_guide_related_guides?: Resolver<Maybe<ResolversTypes['guide_related_guides_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Guide_Related_GuidesArgs, 'where'>>;
  delete_guide_related_guides_by_pk?: Resolver<Maybe<ResolversTypes['guide_related_guides']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Guide_Related_Guides_By_PkArgs, 'id'>>;
  delete_manifests?: Resolver<Maybe<ResolversTypes['manifests_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_ManifestsArgs, 'where'>>;
  delete_manifests_by_pk?: Resolver<Maybe<ResolversTypes['manifests']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Manifests_By_PkArgs, 'id'>>;
  delete_package?: Resolver<Maybe<ResolversTypes['package_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_PackageArgs, 'where'>>;
  delete_package_by_pk?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Package_By_PkArgs, 'id'>>;
  delete_vulnerability_range?: Resolver<Maybe<ResolversTypes['vulnerability_range_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Vulnerability_RangeArgs, 'where'>>;
  delete_vulnerability_range_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_range']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Vulnerability_Range_By_PkArgs, 'id'>>;
  insert_build_dependency_relationship?: Resolver<Maybe<ResolversTypes['build_dependency_relationship_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Build_Dependency_RelationshipArgs, 'objects'>>;
  insert_build_dependency_relationship_one?: Resolver<Maybe<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Build_Dependency_Relationship_OneArgs, 'object'>>;
  insert_builds?: Resolver<Maybe<ResolversTypes['builds_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_BuildsArgs, 'objects'>>;
  insert_builds_one?: Resolver<Maybe<ResolversTypes['builds']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Builds_OneArgs, 'object'>>;
  insert_findings?: Resolver<Maybe<ResolversTypes['findings_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_FindingsArgs, 'objects'>>;
  insert_findings_one?: Resolver<Maybe<ResolversTypes['findings']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Findings_OneArgs, 'object'>>;
  insert_github_repositories?: Resolver<Maybe<ResolversTypes['github_repositories_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Github_RepositoriesArgs, 'objects'>>;
  insert_github_repositories_one?: Resolver<Maybe<ResolversTypes['github_repositories']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Github_Repositories_OneArgs, 'object'>>;
  insert_guide_related_guides?: Resolver<Maybe<ResolversTypes['guide_related_guides_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Guide_Related_GuidesArgs, 'objects'>>;
  insert_guide_related_guides_one?: Resolver<Maybe<ResolversTypes['guide_related_guides']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Guide_Related_Guides_OneArgs, 'object'>>;
  insert_guide_vulnerabilities?: Resolver<Maybe<ResolversTypes['guide_vulnerabilities_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Guide_VulnerabilitiesArgs, 'objects'>>;
  insert_guide_vulnerabilities_one?: Resolver<Maybe<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Guide_Vulnerabilities_OneArgs, 'object'>>;
  insert_guides?: Resolver<Maybe<ResolversTypes['guides_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_GuidesArgs, 'objects'>>;
  insert_manifest_dependency?: Resolver<Maybe<ResolversTypes['manifest_dependency_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_DependencyArgs, 'objects'>>;
  insert_manifest_dependency_edge?: Resolver<Maybe<ResolversTypes['manifest_dependency_edge_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_Dependency_EdgeArgs, 'objects'>>;
  insert_manifest_dependency_edge_one?: Resolver<Maybe<ResolversTypes['manifest_dependency_edge']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_Dependency_Edge_OneArgs, 'object'>>;
  insert_manifest_dependency_node?: Resolver<Maybe<ResolversTypes['manifest_dependency_node_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_Dependency_NodeArgs, 'objects'>>;
  insert_manifest_dependency_node_one?: Resolver<Maybe<ResolversTypes['manifest_dependency_node']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_Dependency_Node_OneArgs, 'object'>>;
  insert_manifest_dependency_one?: Resolver<Maybe<ResolversTypes['manifest_dependency']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifest_Dependency_OneArgs, 'object'>>;
  insert_manifests?: Resolver<Maybe<ResolversTypes['manifests_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_ManifestsArgs, 'objects'>>;
  insert_manifests_one?: Resolver<Maybe<ResolversTypes['manifests']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manifests_OneArgs, 'object'>>;
  insert_organization_user?: Resolver<Maybe<ResolversTypes['organization_user_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Organization_UserArgs, 'objects'>>;
  insert_organization_user_one?: Resolver<Maybe<ResolversTypes['organization_user']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Organization_User_OneArgs, 'object'>>;
  insert_organizations?: Resolver<Maybe<ResolversTypes['organizations_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_OrganizationsArgs, 'objects'>>;
  insert_organizations_one?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Organizations_OneArgs, 'object'>>;
  insert_package?: Resolver<Maybe<ResolversTypes['package_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_PackageArgs, 'objects'>>;
  insert_package_license?: Resolver<Maybe<ResolversTypes['package_license_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_LicenseArgs, 'objects'>>;
  insert_package_license_one?: Resolver<Maybe<ResolversTypes['package_license']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_License_OneArgs, 'object'>>;
  insert_package_maintainer?: Resolver<Maybe<ResolversTypes['package_maintainer_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_MaintainerArgs, 'objects'>>;
  insert_package_maintainer_one?: Resolver<Maybe<ResolversTypes['package_maintainer']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Maintainer_OneArgs, 'object'>>;
  insert_package_one?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_OneArgs, 'object'>>;
  insert_package_package_maintainer?: Resolver<Maybe<ResolversTypes['package_package_maintainer_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Package_MaintainerArgs, 'objects'>>;
  insert_package_package_maintainer_one?: Resolver<Maybe<ResolversTypes['package_package_maintainer']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Package_Maintainer_OneArgs, 'object'>>;
  insert_package_release?: Resolver<Maybe<ResolversTypes['package_release_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_ReleaseArgs, 'objects'>>;
  insert_package_release_dependency?: Resolver<Maybe<ResolversTypes['package_release_dependency_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Release_DependencyArgs, 'objects'>>;
  insert_package_release_dependency_one?: Resolver<Maybe<ResolversTypes['package_release_dependency']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Release_Dependency_OneArgs, 'object'>>;
  insert_package_release_license?: Resolver<Maybe<ResolversTypes['package_release_license_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Release_LicenseArgs, 'objects'>>;
  insert_package_release_license_one?: Resolver<Maybe<ResolversTypes['package_release_license']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Release_License_OneArgs, 'object'>>;
  insert_package_release_one?: Resolver<Maybe<ResolversTypes['package_release']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Package_Release_OneArgs, 'object'>>;
  insert_projects?: Resolver<Maybe<ResolversTypes['projects_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_ProjectsArgs, 'objects'>>;
  insert_projects_one?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Projects_OneArgs, 'object'>>;
  insert_resolved_manifest?: Resolver<Maybe<ResolversTypes['resolved_manifest_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Resolved_ManifestArgs, 'objects'>>;
  insert_resolved_manifest_one?: Resolver<Maybe<ResolversTypes['resolved_manifest']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Resolved_Manifest_OneArgs, 'object'>>;
  insert_scans?: Resolver<Maybe<ResolversTypes['scans_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_ScansArgs, 'objects'>>;
  insert_scans_one?: Resolver<Maybe<ResolversTypes['scans']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Scans_OneArgs, 'object'>>;
  insert_users?: Resolver<Maybe<ResolversTypes['users_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_UsersArgs, 'objects'>>;
  insert_users_one?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Users_OneArgs, 'object'>>;
  insert_vulnerability?: Resolver<Maybe<ResolversTypes['vulnerability_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_VulnerabilityArgs, 'objects'>>;
  insert_vulnerability_affected?: Resolver<Maybe<ResolversTypes['vulnerability_affected_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_AffectedArgs, 'objects'>>;
  insert_vulnerability_affected_one?: Resolver<Maybe<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Affected_OneArgs, 'object'>>;
  insert_vulnerability_affected_range_event?: Resolver<Maybe<ResolversTypes['vulnerability_affected_range_event_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Affected_Range_EventArgs, 'objects'>>;
  insert_vulnerability_affected_range_event_one?: Resolver<Maybe<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Affected_Range_Event_OneArgs, 'object'>>;
  insert_vulnerability_affected_version?: Resolver<Maybe<ResolversTypes['vulnerability_affected_version_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Affected_VersionArgs, 'objects'>>;
  insert_vulnerability_affected_version_one?: Resolver<Maybe<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Affected_Version_OneArgs, 'object'>>;
  insert_vulnerability_credit?: Resolver<Maybe<ResolversTypes['vulnerability_credit_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_CreditArgs, 'objects'>>;
  insert_vulnerability_credit_one?: Resolver<Maybe<ResolversTypes['vulnerability_credit']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Credit_OneArgs, 'object'>>;
  insert_vulnerability_equivalent?: Resolver<Maybe<ResolversTypes['vulnerability_equivalent_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_EquivalentArgs, 'objects'>>;
  insert_vulnerability_equivalent_one?: Resolver<Maybe<ResolversTypes['vulnerability_equivalent']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Equivalent_OneArgs, 'object'>>;
  insert_vulnerability_one?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_OneArgs, 'object'>>;
  insert_vulnerability_range?: Resolver<Maybe<ResolversTypes['vulnerability_range_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_RangeArgs, 'objects'>>;
  insert_vulnerability_range_one?: Resolver<Maybe<ResolversTypes['vulnerability_range']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Range_OneArgs, 'object'>>;
  insert_vulnerability_reference?: Resolver<Maybe<ResolversTypes['vulnerability_reference_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_ReferenceArgs, 'objects'>>;
  insert_vulnerability_reference_one?: Resolver<Maybe<ResolversTypes['vulnerability_reference']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Reference_OneArgs, 'object'>>;
  insert_vulnerability_severity?: Resolver<Maybe<ResolversTypes['vulnerability_severity_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_SeverityArgs, 'objects'>>;
  insert_vulnerability_severity_one?: Resolver<Maybe<ResolversTypes['vulnerability_severity']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Vulnerability_Severity_OneArgs, 'object'>>;
  insert_webhook_cache?: Resolver<Maybe<ResolversTypes['webhook_cache_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Webhook_CacheArgs, 'objects'>>;
  insert_webhook_cache_one?: Resolver<Maybe<ResolversTypes['webhook_cache']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Webhook_Cache_OneArgs, 'object'>>;
  update_build_dependency_relationship?: Resolver<Maybe<ResolversTypes['build_dependency_relationship_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Build_Dependency_RelationshipArgs, 'where'>>;
  update_build_dependency_relationship_by_pk?: Resolver<Maybe<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Build_Dependency_Relationship_By_PkArgs, 'pk_columns'>>;
  update_builds?: Resolver<Maybe<ResolversTypes['builds_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_BuildsArgs, 'where'>>;
  update_builds_by_pk?: Resolver<Maybe<ResolversTypes['builds']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Builds_By_PkArgs, 'pk_columns'>>;
  update_findings?: Resolver<Maybe<ResolversTypes['findings_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_FindingsArgs, 'where'>>;
  update_findings_by_pk?: Resolver<Maybe<ResolversTypes['findings']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Findings_By_PkArgs, 'pk_columns'>>;
  update_github_repositories?: Resolver<Maybe<ResolversTypes['github_repositories_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Github_RepositoriesArgs, 'where'>>;
  update_github_repositories_by_pk?: Resolver<Maybe<ResolversTypes['github_repositories']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Github_Repositories_By_PkArgs, 'pk_columns'>>;
  update_guide_related_guides?: Resolver<Maybe<ResolversTypes['guide_related_guides_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Guide_Related_GuidesArgs, 'where'>>;
  update_guide_related_guides_by_pk?: Resolver<Maybe<ResolversTypes['guide_related_guides']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Guide_Related_Guides_By_PkArgs, 'pk_columns'>>;
  update_guide_vulnerabilities?: Resolver<Maybe<ResolversTypes['guide_vulnerabilities_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Guide_VulnerabilitiesArgs, 'where'>>;
  update_guide_vulnerabilities_by_pk?: Resolver<Maybe<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Guide_Vulnerabilities_By_PkArgs, 'pk_columns'>>;
  update_guides?: Resolver<Maybe<ResolversTypes['guides_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_GuidesArgs, 'where'>>;
  update_manifest_dependency?: Resolver<Maybe<ResolversTypes['manifest_dependency_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manifest_DependencyArgs, 'where'>>;
  update_manifest_dependency_edge?: Resolver<Maybe<ResolversTypes['manifest_dependency_edge_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manifest_Dependency_EdgeArgs, 'where'>>;
  update_manifest_dependency_node?: Resolver<Maybe<ResolversTypes['manifest_dependency_node_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manifest_Dependency_NodeArgs, 'where'>>;
  update_manifest_dependency_node_by_pk?: Resolver<Maybe<ResolversTypes['manifest_dependency_node']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manifest_Dependency_Node_By_PkArgs, 'pk_columns'>>;
  update_manifests?: Resolver<Maybe<ResolversTypes['manifests_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_ManifestsArgs, 'where'>>;
  update_manifests_by_pk?: Resolver<Maybe<ResolversTypes['manifests']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manifests_By_PkArgs, 'pk_columns'>>;
  update_organization_user?: Resolver<Maybe<ResolversTypes['organization_user_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Organization_UserArgs, 'where'>>;
  update_organization_user_by_pk?: Resolver<Maybe<ResolversTypes['organization_user']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Organization_User_By_PkArgs, 'pk_columns'>>;
  update_organizations?: Resolver<Maybe<ResolversTypes['organizations_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_OrganizationsArgs, 'where'>>;
  update_organizations_by_pk?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Organizations_By_PkArgs, 'pk_columns'>>;
  update_package?: Resolver<Maybe<ResolversTypes['package_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_PackageArgs, 'where'>>;
  update_package_by_pk?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_By_PkArgs, 'pk_columns'>>;
  update_package_license?: Resolver<Maybe<ResolversTypes['package_license_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_LicenseArgs, 'where'>>;
  update_package_license_by_pk?: Resolver<Maybe<ResolversTypes['package_license']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_License_By_PkArgs, 'pk_columns'>>;
  update_package_maintainer?: Resolver<Maybe<ResolversTypes['package_maintainer_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_MaintainerArgs, 'where'>>;
  update_package_maintainer_by_pk?: Resolver<Maybe<ResolversTypes['package_maintainer']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Maintainer_By_PkArgs, 'pk_columns'>>;
  update_package_package_maintainer?: Resolver<Maybe<ResolversTypes['package_package_maintainer_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Package_MaintainerArgs, 'where'>>;
  update_package_release?: Resolver<Maybe<ResolversTypes['package_release_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_ReleaseArgs, 'where'>>;
  update_package_release_by_pk?: Resolver<Maybe<ResolversTypes['package_release']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Release_By_PkArgs, 'pk_columns'>>;
  update_package_release_dependency?: Resolver<Maybe<ResolversTypes['package_release_dependency_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Release_DependencyArgs, 'where'>>;
  update_package_release_dependency_by_pk?: Resolver<Maybe<ResolversTypes['package_release_dependency']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Release_Dependency_By_PkArgs, 'pk_columns'>>;
  update_package_release_license?: Resolver<Maybe<ResolversTypes['package_release_license_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Release_LicenseArgs, 'where'>>;
  update_package_release_license_by_pk?: Resolver<Maybe<ResolversTypes['package_release_license']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Package_Release_License_By_PkArgs, 'pk_columns'>>;
  update_projects?: Resolver<Maybe<ResolversTypes['projects_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_ProjectsArgs, 'where'>>;
  update_projects_by_pk?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Projects_By_PkArgs, 'pk_columns'>>;
  update_resolved_manifest?: Resolver<Maybe<ResolversTypes['resolved_manifest_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Resolved_ManifestArgs, 'where'>>;
  update_resolved_manifest_by_pk?: Resolver<Maybe<ResolversTypes['resolved_manifest']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Resolved_Manifest_By_PkArgs, 'pk_columns'>>;
  update_scans?: Resolver<Maybe<ResolversTypes['scans_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_ScansArgs, 'where'>>;
  update_scans_by_pk?: Resolver<Maybe<ResolversTypes['scans']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Scans_By_PkArgs, 'pk_columns'>>;
  update_users?: Resolver<Maybe<ResolversTypes['users_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_UsersArgs, 'where'>>;
  update_users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Users_By_PkArgs, 'pk_columns'>>;
  update_vulnerability?: Resolver<Maybe<ResolversTypes['vulnerability_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_VulnerabilityArgs, 'where'>>;
  update_vulnerability_affected?: Resolver<Maybe<ResolversTypes['vulnerability_affected_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_AffectedArgs, 'where'>>;
  update_vulnerability_affected_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Affected_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_affected_range_event?: Resolver<Maybe<ResolversTypes['vulnerability_affected_range_event_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Affected_Range_EventArgs, 'where'>>;
  update_vulnerability_affected_range_event_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Affected_Range_Event_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_affected_version?: Resolver<Maybe<ResolversTypes['vulnerability_affected_version_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Affected_VersionArgs, 'where'>>;
  update_vulnerability_affected_version_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Affected_Version_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_credit?: Resolver<Maybe<ResolversTypes['vulnerability_credit_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_CreditArgs, 'where'>>;
  update_vulnerability_credit_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_credit']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Credit_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_equivalent?: Resolver<Maybe<ResolversTypes['vulnerability_equivalent_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_EquivalentArgs, 'where'>>;
  update_vulnerability_range?: Resolver<Maybe<ResolversTypes['vulnerability_range_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_RangeArgs, 'where'>>;
  update_vulnerability_range_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_range']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Range_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_reference?: Resolver<Maybe<ResolversTypes['vulnerability_reference_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_ReferenceArgs, 'where'>>;
  update_vulnerability_reference_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_reference']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Reference_By_PkArgs, 'pk_columns'>>;
  update_vulnerability_severity?: Resolver<Maybe<ResolversTypes['vulnerability_severity_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_SeverityArgs, 'where'>>;
  update_vulnerability_severity_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_severity']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Vulnerability_Severity_By_PkArgs, 'pk_columns'>>;
  update_webhook_cache?: Resolver<Maybe<ResolversTypes['webhook_cache_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Webhook_CacheArgs, 'where'>>;
  update_webhook_cache_by_pk?: Resolver<Maybe<ResolversTypes['webhook_cache']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Webhook_Cache_By_PkArgs, 'pk_columns'>>;
};

export type Organization_UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organization_user'] = ResolversParentTypes['organization_user']> = {
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['organizations'], ParentType, ContextType>;
  organization_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['organization_user_role'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organization_User_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organization_user_mutation_response'] = ResolversParentTypes['organization_user_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['organization_user']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Organization_User_RoleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['organization_user_role'], any> {
  name: 'organization_user_role';
}

export type OrganizationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations'] = ResolversParentTypes['organizations']> = {
  createdAt?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  github_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  github_node_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization_users?: Resolver<Array<ResolversTypes['organization_user']>, ParentType, ContextType, Partial<OrganizationsOrganization_UsersArgs>>;
  projects?: Resolver<Array<ResolversTypes['projects']>, ParentType, ContextType, Partial<OrganizationsProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_aggregate'], ParentType, ContextType, Partial<OrganizationsProjects_AggregateArgs>>;
  settings?: Resolver<ResolversTypes['settings'], ParentType, ContextType>;
  settings_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_AggregateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_aggregate'] = ResolversParentTypes['organizations_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['organizations_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['organizations']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Aggregate_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_aggregate_fields'] = ResolversParentTypes['organizations_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['organizations_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Organizations_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['organizations_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['organizations_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['organizations_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['organizations_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['organizations_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['organizations_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['organizations_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['organizations_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['organizations_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Avg_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_avg_fields'] = ResolversParentTypes['organizations_avg_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Max_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_max_fields'] = ResolversParentTypes['organizations_max_fields']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  github_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  github_node_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Min_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_min_fields'] = ResolversParentTypes['organizations_min_fields']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  github_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  github_node_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_mutation_response'] = ResolversParentTypes['organizations_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['organizations']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Stddev_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_stddev_fields'] = ResolversParentTypes['organizations_stddev_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Stddev_Pop_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_stddev_pop_fields'] = ResolversParentTypes['organizations_stddev_pop_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Stddev_Samp_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_stddev_samp_fields'] = ResolversParentTypes['organizations_stddev_samp_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Sum_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_sum_fields'] = ResolversParentTypes['organizations_sum_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Var_Pop_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_var_pop_fields'] = ResolversParentTypes['organizations_var_pop_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Var_Samp_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_var_samp_fields'] = ResolversParentTypes['organizations_var_samp_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Organizations_Variance_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['organizations_variance_fields'] = ResolversParentTypes['organizations_variance_fields']> = {
  github_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PackageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package'] = ResolversParentTypes['package']> = {
  affected_by_vulnerability?: Resolver<Array<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, Partial<PackageAffected_By_VulnerabilityArgs>>;
  custom_registry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  last_failed_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  last_successful_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  package_maintainers?: Resolver<Array<ResolversTypes['package_package_maintainer']>, ParentType, ContextType, Partial<PackagePackage_MaintainersArgs>>;
  package_manager?: Resolver<ResolversTypes['package_manager'], ParentType, ContextType>;
  releases?: Resolver<Array<ResolversTypes['package_release']>, ParentType, ContextType, Partial<PackageReleasesArgs>>;
  upstream_data?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<PackageUpstream_DataArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_AggregateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_aggregate'] = ResolversParentTypes['package_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['package_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['package']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Aggregate_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_aggregate_fields'] = ResolversParentTypes['package_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Package_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['package_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['package_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_LicenseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_license'] = ResolversParentTypes['package_license']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_licenses?: Resolver<Array<ResolversTypes['package_release_license']>, ParentType, ContextType, Partial<Package_LicenseRelease_LicensesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_License_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_license_mutation_response'] = ResolversParentTypes['package_license_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_license']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_MaintainerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_maintainer'] = ResolversParentTypes['package_maintainer']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package_maintainers?: Resolver<Array<ResolversTypes['package_package_maintainer']>, ParentType, ContextType, Partial<Package_MaintainerPackage_MaintainersArgs>>;
  package_manager?: Resolver<Maybe<ResolversTypes['package_manager']>, ParentType, ContextType>;
  published_releases?: Resolver<Array<ResolversTypes['package_release']>, ParentType, ContextType, Partial<Package_MaintainerPublished_ReleasesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Maintainer_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_maintainer_mutation_response'] = ResolversParentTypes['package_maintainer_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_maintainer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Package_ManagerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['package_manager'], any> {
  name: 'package_manager';
}

export type Package_Max_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_max_fields'] = ResolversParentTypes['package_max_fields']> = {
  custom_registry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_failed_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  last_successful_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package_manager?: Resolver<Maybe<ResolversTypes['package_manager']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Min_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_min_fields'] = ResolversParentTypes['package_min_fields']> = {
  custom_registry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_failed_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  last_successful_fetch?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package_manager?: Resolver<Maybe<ResolversTypes['package_manager']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_mutation_response'] = ResolversParentTypes['package_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Package_MaintainerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_package_maintainer'] = ResolversParentTypes['package_package_maintainer']> = {
  maintainer?: Resolver<Maybe<ResolversTypes['package_maintainer']>, ParentType, ContextType>;
  maintainer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  package?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType>;
  package_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Package_Maintainer_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_package_maintainer_mutation_response'] = ResolversParentTypes['package_package_maintainer_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_package_maintainer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_ReleaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release'] = ResolversParentTypes['package_release']> = {
  blob_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  build_dependency_relationships?: Resolver<Array<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, Partial<Package_ReleaseBuild_Dependency_RelationshipsArgs>>;
  fetched_time?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  mirrored_blob_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  observed_time?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  package?: Resolver<ResolversTypes['package'], ParentType, ContextType>;
  package_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  publishing_maintainer?: Resolver<Maybe<ResolversTypes['package_maintainer']>, ParentType, ContextType>;
  publishing_maintainer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  release_dependencies?: Resolver<Array<ResolversTypes['package_release_dependency']>, ParentType, ContextType, Partial<Package_ReleaseRelease_DependenciesArgs>>;
  release_dependents?: Resolver<Array<ResolversTypes['package_release_dependency']>, ParentType, ContextType, Partial<Package_ReleaseRelease_DependentsArgs>>;
  release_licenses?: Resolver<Array<ResolversTypes['package_release_license']>, ParentType, ContextType, Partial<Package_ReleaseRelease_LicensesArgs>>;
  release_time?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  upstream_blob_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  upstream_data?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Package_ReleaseUpstream_DataArgs>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Release_DependencyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release_dependency'] = ResolversParentTypes['package_release_dependency']> = {
  dependency_package?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType>;
  dependency_package_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dependency_release?: Resolver<Maybe<ResolversTypes['package_release']>, ParentType, ContextType>;
  dependency_release_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  package_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  package_version_query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['package_release'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Release_Dependency_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release_dependency_mutation_response'] = ResolversParentTypes['package_release_dependency_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_release_dependency']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Release_LicenseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release_license'] = ResolversParentTypes['package_release_license']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['package_license'], ParentType, ContextType>;
  license_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  scan_metadata?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Package_Release_LicenseScan_MetadataArgs>>;
  scan_time?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['license_source'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Release_License_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release_license_mutation_response'] = ResolversParentTypes['package_release_license_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_release_license']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Package_Release_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['package_release_mutation_response'] = ResolversParentTypes['package_release_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['package_release']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Access_TokensResolvers<ContextType = Context, ParentType extends ResolversParentTypes['project_access_tokens'] = ResolversParentTypes['project_access_tokens']> = {
  access_token?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  created_by_user?: Resolver<Maybe<ResolversTypes['identities']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects'], ParentType, ContextType>;
  project_uuid?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects'] = ResolversParentTypes['projects']> = {
  builds?: Resolver<Array<ResolversTypes['builds']>, ParentType, ContextType, Partial<ProjectsBuildsArgs>>;
  builds_aggregate?: Resolver<ResolversTypes['builds_aggregate'], ParentType, ContextType, Partial<ProjectsBuilds_AggregateArgs>>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  default_branch_builds?: Resolver<Array<ResolversTypes['default_branch_builds']>, ParentType, ContextType, Partial<ProjectsDefault_Branch_BuildsArgs>>;
  github_repositories?: Resolver<Array<ResolversTypes['github_repositories']>, ParentType, ContextType, Partial<ProjectsGithub_RepositoriesArgs>>;
  github_repository?: Resolver<Maybe<ResolversTypes['github_repositories']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  ignored_vulnerabilities?: Resolver<Array<ResolversTypes['ignored_vulnerabilities']>, ParentType, ContextType, Partial<ProjectsIgnored_VulnerabilitiesArgs>>;
  manifests?: Resolver<Array<ResolversTypes['manifests']>, ParentType, ContextType, Partial<ProjectsManifestsArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType>;
  organization_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  project_access_tokens?: Resolver<Array<ResolversTypes['project_access_tokens']>, ParentType, ContextType, Partial<ProjectsProject_Access_TokensArgs>>;
  repo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reports?: Resolver<Array<ResolversTypes['project_access_tokens']>, ParentType, ContextType, Partial<ProjectsReportsArgs>>;
  settings?: Resolver<ResolversTypes['settings'], ParentType, ContextType>;
  settings_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_AggregateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects_aggregate'] = ResolversParentTypes['projects_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['projects_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['projects']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Aggregate_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects_aggregate_fields'] = ResolversParentTypes['projects_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Projects_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['projects_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['projects_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Max_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects_max_fields'] = ResolversParentTypes['projects_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organization_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  repo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Min_FieldsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects_min_fields'] = ResolversParentTypes['projects_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organization_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  repo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['projects_mutation_response'] = ResolversParentTypes['projects_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['projects']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Query_RootResolvers<ContextType = Context, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = {
  build_dependency_relationship?: Resolver<Array<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, Partial<Query_RootBuild_Dependency_RelationshipArgs>>;
  build_dependency_relationship_by_pk?: Resolver<Maybe<ResolversTypes['build_dependency_relationship']>, ParentType, ContextType, RequireFields<Query_RootBuild_Dependency_Relationship_By_PkArgs, 'id'>>;
  builds?: Resolver<Array<ResolversTypes['builds']>, ParentType, ContextType, Partial<Query_RootBuildsArgs>>;
  builds_aggregate?: Resolver<ResolversTypes['builds_aggregate'], ParentType, ContextType, Partial<Query_RootBuilds_AggregateArgs>>;
  builds_by_pk?: Resolver<Maybe<ResolversTypes['builds']>, ParentType, ContextType, RequireFields<Query_RootBuilds_By_PkArgs, 'id'>>;
  default_branch_builds?: Resolver<Array<ResolversTypes['default_branch_builds']>, ParentType, ContextType, Partial<Query_RootDefault_Branch_BuildsArgs>>;
  findings?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType, Partial<Query_RootFindingsArgs>>;
  findings_by_pk?: Resolver<Maybe<ResolversTypes['findings']>, ParentType, ContextType, RequireFields<Query_RootFindings_By_PkArgs, 'id'>>;
  github_repositories?: Resolver<Array<ResolversTypes['github_repositories']>, ParentType, ContextType, Partial<Query_RootGithub_RepositoriesArgs>>;
  github_repositories_by_pk?: Resolver<Maybe<ResolversTypes['github_repositories']>, ParentType, ContextType, RequireFields<Query_RootGithub_Repositories_By_PkArgs, 'id'>>;
  guide_related_guides?: Resolver<Array<ResolversTypes['guide_related_guides']>, ParentType, ContextType, Partial<Query_RootGuide_Related_GuidesArgs>>;
  guide_related_guides_by_pk?: Resolver<Maybe<ResolversTypes['guide_related_guides']>, ParentType, ContextType, RequireFields<Query_RootGuide_Related_Guides_By_PkArgs, 'id'>>;
  guide_vulnerabilities?: Resolver<Array<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType, Partial<Query_RootGuide_VulnerabilitiesArgs>>;
  guide_vulnerabilities_by_pk?: Resolver<Maybe<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType, RequireFields<Query_RootGuide_Vulnerabilities_By_PkArgs, 'id'>>;
  identities?: Resolver<Array<ResolversTypes['identities']>, ParentType, ContextType, Partial<Query_RootIdentitiesArgs>>;
  identities_by_pk?: Resolver<Maybe<ResolversTypes['identities']>, ParentType, ContextType, RequireFields<Query_RootIdentities_By_PkArgs, 'id'>>;
  identity_verifiable_addresses?: Resolver<Array<ResolversTypes['identity_verifiable_addresses']>, ParentType, ContextType, Partial<Query_RootIdentity_Verifiable_AddressesArgs>>;
  identity_verifiable_addresses_by_pk?: Resolver<Maybe<ResolversTypes['identity_verifiable_addresses']>, ParentType, ContextType, RequireFields<Query_RootIdentity_Verifiable_Addresses_By_PkArgs, 'id'>>;
  ignored_vulnerabilities?: Resolver<Array<ResolversTypes['ignored_vulnerabilities']>, ParentType, ContextType, Partial<Query_RootIgnored_VulnerabilitiesArgs>>;
  ignored_vulnerabilities_by_pk?: Resolver<Maybe<ResolversTypes['ignored_vulnerabilities']>, ParentType, ContextType, RequireFields<Query_RootIgnored_Vulnerabilities_By_PkArgs, 'id'>>;
  latest_builds?: Resolver<Array<ResolversTypes['latest_builds']>, ParentType, ContextType, Partial<Query_RootLatest_BuildsArgs>>;
  manifest_dependency?: Resolver<Array<ResolversTypes['manifest_dependency']>, ParentType, ContextType, Partial<Query_RootManifest_DependencyArgs>>;
  manifest_dependency_edge?: Resolver<Array<ResolversTypes['manifest_dependency_edge']>, ParentType, ContextType, Partial<Query_RootManifest_Dependency_EdgeArgs>>;
  manifest_dependency_node?: Resolver<Array<ResolversTypes['manifest_dependency_node']>, ParentType, ContextType, Partial<Query_RootManifest_Dependency_NodeArgs>>;
  manifest_dependency_node_by_pk?: Resolver<Maybe<ResolversTypes['manifest_dependency_node']>, ParentType, ContextType, RequireFields<Query_RootManifest_Dependency_Node_By_PkArgs, 'id'>>;
  manifests?: Resolver<Array<ResolversTypes['manifests']>, ParentType, ContextType, Partial<Query_RootManifestsArgs>>;
  manifests_by_pk?: Resolver<Maybe<ResolversTypes['manifests']>, ParentType, ContextType, RequireFields<Query_RootManifests_By_PkArgs, 'id'>>;
  organization_user?: Resolver<Array<ResolversTypes['organization_user']>, ParentType, ContextType, Partial<Query_RootOrganization_UserArgs>>;
  organization_user_by_pk?: Resolver<Maybe<ResolversTypes['organization_user']>, ParentType, ContextType, RequireFields<Query_RootOrganization_User_By_PkArgs, 'id'>>;
  organizations?: Resolver<Array<ResolversTypes['organizations']>, ParentType, ContextType, Partial<Query_RootOrganizationsArgs>>;
  organizations_aggregate?: Resolver<ResolversTypes['organizations_aggregate'], ParentType, ContextType, Partial<Query_RootOrganizations_AggregateArgs>>;
  organizations_by_pk?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType, RequireFields<Query_RootOrganizations_By_PkArgs, 'id'>>;
  package?: Resolver<Array<ResolversTypes['package']>, ParentType, ContextType, Partial<Query_RootPackageArgs>>;
  package_aggregate?: Resolver<ResolversTypes['package_aggregate'], ParentType, ContextType, Partial<Query_RootPackage_AggregateArgs>>;
  package_by_pk?: Resolver<Maybe<ResolversTypes['package']>, ParentType, ContextType, RequireFields<Query_RootPackage_By_PkArgs, 'id'>>;
  package_license?: Resolver<Array<ResolversTypes['package_license']>, ParentType, ContextType, Partial<Query_RootPackage_LicenseArgs>>;
  package_license_by_pk?: Resolver<Maybe<ResolversTypes['package_license']>, ParentType, ContextType, RequireFields<Query_RootPackage_License_By_PkArgs, 'id'>>;
  package_maintainer?: Resolver<Array<ResolversTypes['package_maintainer']>, ParentType, ContextType, Partial<Query_RootPackage_MaintainerArgs>>;
  package_maintainer_by_pk?: Resolver<Maybe<ResolversTypes['package_maintainer']>, ParentType, ContextType, RequireFields<Query_RootPackage_Maintainer_By_PkArgs, 'id'>>;
  package_package_maintainer?: Resolver<Array<ResolversTypes['package_package_maintainer']>, ParentType, ContextType, Partial<Query_RootPackage_Package_MaintainerArgs>>;
  package_release?: Resolver<Array<ResolversTypes['package_release']>, ParentType, ContextType, Partial<Query_RootPackage_ReleaseArgs>>;
  package_release_by_pk?: Resolver<Maybe<ResolversTypes['package_release']>, ParentType, ContextType, RequireFields<Query_RootPackage_Release_By_PkArgs, 'id'>>;
  package_release_dependency?: Resolver<Array<ResolversTypes['package_release_dependency']>, ParentType, ContextType, Partial<Query_RootPackage_Release_DependencyArgs>>;
  package_release_dependency_by_pk?: Resolver<Maybe<ResolversTypes['package_release_dependency']>, ParentType, ContextType, RequireFields<Query_RootPackage_Release_Dependency_By_PkArgs, 'id'>>;
  package_release_license?: Resolver<Array<ResolversTypes['package_release_license']>, ParentType, ContextType, Partial<Query_RootPackage_Release_LicenseArgs>>;
  package_release_license_by_pk?: Resolver<Maybe<ResolversTypes['package_release_license']>, ParentType, ContextType, RequireFields<Query_RootPackage_Release_License_By_PkArgs, 'id'>>;
  project_access_tokens?: Resolver<Array<ResolversTypes['project_access_tokens']>, ParentType, ContextType, Partial<Query_RootProject_Access_TokensArgs>>;
  project_access_tokens_by_pk?: Resolver<Maybe<ResolversTypes['project_access_tokens']>, ParentType, ContextType, RequireFields<Query_RootProject_Access_Tokens_By_PkArgs, 'id'>>;
  projects?: Resolver<Array<ResolversTypes['projects']>, ParentType, ContextType, Partial<Query_RootProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_aggregate'], ParentType, ContextType, Partial<Query_RootProjects_AggregateArgs>>;
  projects_by_pk?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType, RequireFields<Query_RootProjects_By_PkArgs, 'id'>>;
  resolved_manifest?: Resolver<Array<ResolversTypes['resolved_manifest']>, ParentType, ContextType, Partial<Query_RootResolved_ManifestArgs>>;
  resolved_manifest_by_pk?: Resolver<Maybe<ResolversTypes['resolved_manifest']>, ParentType, ContextType, RequireFields<Query_RootResolved_Manifest_By_PkArgs, 'id'>>;
  scans?: Resolver<Array<ResolversTypes['scans']>, ParentType, ContextType, Partial<Query_RootScansArgs>>;
  scans_by_pk?: Resolver<Maybe<ResolversTypes['scans']>, ParentType, ContextType, RequireFields<Query_RootScans_By_PkArgs, 'id'>>;
  settings?: Resolver<Array<ResolversTypes['settings']>, ParentType, ContextType, Partial<Query_RootSettingsArgs>>;
  settings_by_pk?: Resolver<Maybe<ResolversTypes['settings']>, ParentType, ContextType, RequireFields<Query_RootSettings_By_PkArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType, Partial<Query_RootUsersArgs>>;
  users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Query_RootUsers_By_PkArgs, 'id'>>;
  vulnerability?: Resolver<Array<ResolversTypes['vulnerability']>, ParentType, ContextType, Partial<Query_RootVulnerabilityArgs>>;
  vulnerability_affected?: Resolver<Array<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, Partial<Query_RootVulnerability_AffectedArgs>>;
  vulnerability_affected_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Affected_By_PkArgs, 'id'>>;
  vulnerability_affected_range_event?: Resolver<Array<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType, Partial<Query_RootVulnerability_Affected_Range_EventArgs>>;
  vulnerability_affected_range_event_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Affected_Range_Event_By_PkArgs, 'id'>>;
  vulnerability_affected_version?: Resolver<Array<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType, Partial<Query_RootVulnerability_Affected_VersionArgs>>;
  vulnerability_affected_version_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Affected_Version_By_PkArgs, 'id'>>;
  vulnerability_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_By_PkArgs, 'id'>>;
  vulnerability_credit?: Resolver<Array<ResolversTypes['vulnerability_credit']>, ParentType, ContextType, Partial<Query_RootVulnerability_CreditArgs>>;
  vulnerability_credit_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_credit']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Credit_By_PkArgs, 'id'>>;
  vulnerability_equivalent?: Resolver<Array<ResolversTypes['vulnerability_equivalent']>, ParentType, ContextType, Partial<Query_RootVulnerability_EquivalentArgs>>;
  vulnerability_range?: Resolver<Array<ResolversTypes['vulnerability_range']>, ParentType, ContextType, Partial<Query_RootVulnerability_RangeArgs>>;
  vulnerability_range_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_range']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Range_By_PkArgs, 'id'>>;
  vulnerability_reference?: Resolver<Array<ResolversTypes['vulnerability_reference']>, ParentType, ContextType, Partial<Query_RootVulnerability_ReferenceArgs>>;
  vulnerability_reference_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_reference']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Reference_By_PkArgs, 'id'>>;
  vulnerability_severity?: Resolver<Array<ResolversTypes['vulnerability_severity']>, ParentType, ContextType, Partial<Query_RootVulnerability_SeverityArgs>>;
  vulnerability_severity_by_pk?: Resolver<Maybe<ResolversTypes['vulnerability_severity']>, ParentType, ContextType, RequireFields<Query_RootVulnerability_Severity_By_PkArgs, 'id'>>;
  webhook_cache?: Resolver<Array<ResolversTypes['webhook_cache']>, ParentType, ContextType, Partial<Query_RootWebhook_CacheArgs>>;
  webhook_cache_by_pk?: Resolver<Maybe<ResolversTypes['webhook_cache']>, ParentType, ContextType, RequireFields<Query_RootWebhook_Cache_By_PkArgs, 'delivery_id'>>;
};

export interface Reference_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['reference_type'], any> {
  name: 'reference_type';
}

export type Resolved_ManifestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['resolved_manifest'] = ResolversParentTypes['resolved_manifest']> = {
  build?: Resolver<ResolversTypes['builds'], ParentType, ContextType>;
  build_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  child_edges_recursive?: Resolver<Maybe<Array<ResolversTypes['manifest_dependency_edge']>>, ParentType, ContextType, Partial<Resolved_ManifestChild_Edges_RecursiveArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  manifest_dependencies?: Resolver<Array<ResolversTypes['manifest_dependency']>, ParentType, ContextType, Partial<Resolved_ManifestManifest_DependenciesArgs>>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolved_Manifest_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['resolved_manifest_mutation_response'] = ResolversParentTypes['resolved_manifest_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['resolved_manifest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScansResolvers<ContextType = Context, ParentType extends ResolversParentTypes['scans'] = ResolversParentTypes['scans']> = {
  build?: Resolver<ResolversTypes['builds'], ParentType, ContextType>;
  build_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  db_date?: Resolver<ResolversTypes['date'], ParentType, ContextType>;
  distro_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distro_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  findings?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType, Partial<ScansFindingsArgs>>;
  grype_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  scan_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Scans_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['scans_mutation_response'] = ResolversParentTypes['scans_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['scans']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['settings'] = ResolversParentTypes['settings']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['organizations']>, ParentType, ContextType>;
  pr_check_enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pr_feedback_disabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['projects']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Severity_EnumScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['severity_enum'], any> {
  name: 'severity_enum';
}

export type Subscription_RootResolvers<ContextType = Context, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = {
  build_dependency_relationship?: SubscriptionResolver<Array<ResolversTypes['build_dependency_relationship']>, "build_dependency_relationship", ParentType, ContextType, Partial<Subscription_RootBuild_Dependency_RelationshipArgs>>;
  build_dependency_relationship_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['build_dependency_relationship']>, "build_dependency_relationship_by_pk", ParentType, ContextType, RequireFields<Subscription_RootBuild_Dependency_Relationship_By_PkArgs, 'id'>>;
  builds?: SubscriptionResolver<Array<ResolversTypes['builds']>, "builds", ParentType, ContextType, Partial<Subscription_RootBuildsArgs>>;
  builds_aggregate?: SubscriptionResolver<ResolversTypes['builds_aggregate'], "builds_aggregate", ParentType, ContextType, Partial<Subscription_RootBuilds_AggregateArgs>>;
  builds_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['builds']>, "builds_by_pk", ParentType, ContextType, RequireFields<Subscription_RootBuilds_By_PkArgs, 'id'>>;
  default_branch_builds?: SubscriptionResolver<Array<ResolversTypes['default_branch_builds']>, "default_branch_builds", ParentType, ContextType, Partial<Subscription_RootDefault_Branch_BuildsArgs>>;
  findings?: SubscriptionResolver<Array<ResolversTypes['findings']>, "findings", ParentType, ContextType, Partial<Subscription_RootFindingsArgs>>;
  findings_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['findings']>, "findings_by_pk", ParentType, ContextType, RequireFields<Subscription_RootFindings_By_PkArgs, 'id'>>;
  github_repositories?: SubscriptionResolver<Array<ResolversTypes['github_repositories']>, "github_repositories", ParentType, ContextType, Partial<Subscription_RootGithub_RepositoriesArgs>>;
  github_repositories_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['github_repositories']>, "github_repositories_by_pk", ParentType, ContextType, RequireFields<Subscription_RootGithub_Repositories_By_PkArgs, 'id'>>;
  guide_related_guides?: SubscriptionResolver<Array<ResolversTypes['guide_related_guides']>, "guide_related_guides", ParentType, ContextType, Partial<Subscription_RootGuide_Related_GuidesArgs>>;
  guide_related_guides_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['guide_related_guides']>, "guide_related_guides_by_pk", ParentType, ContextType, RequireFields<Subscription_RootGuide_Related_Guides_By_PkArgs, 'id'>>;
  guide_vulnerabilities?: SubscriptionResolver<Array<ResolversTypes['guide_vulnerabilities']>, "guide_vulnerabilities", ParentType, ContextType, Partial<Subscription_RootGuide_VulnerabilitiesArgs>>;
  guide_vulnerabilities_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['guide_vulnerabilities']>, "guide_vulnerabilities_by_pk", ParentType, ContextType, RequireFields<Subscription_RootGuide_Vulnerabilities_By_PkArgs, 'id'>>;
  identities?: SubscriptionResolver<Array<ResolversTypes['identities']>, "identities", ParentType, ContextType, Partial<Subscription_RootIdentitiesArgs>>;
  identities_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['identities']>, "identities_by_pk", ParentType, ContextType, RequireFields<Subscription_RootIdentities_By_PkArgs, 'id'>>;
  identity_verifiable_addresses?: SubscriptionResolver<Array<ResolversTypes['identity_verifiable_addresses']>, "identity_verifiable_addresses", ParentType, ContextType, Partial<Subscription_RootIdentity_Verifiable_AddressesArgs>>;
  identity_verifiable_addresses_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['identity_verifiable_addresses']>, "identity_verifiable_addresses_by_pk", ParentType, ContextType, RequireFields<Subscription_RootIdentity_Verifiable_Addresses_By_PkArgs, 'id'>>;
  ignored_vulnerabilities?: SubscriptionResolver<Array<ResolversTypes['ignored_vulnerabilities']>, "ignored_vulnerabilities", ParentType, ContextType, Partial<Subscription_RootIgnored_VulnerabilitiesArgs>>;
  ignored_vulnerabilities_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ignored_vulnerabilities']>, "ignored_vulnerabilities_by_pk", ParentType, ContextType, RequireFields<Subscription_RootIgnored_Vulnerabilities_By_PkArgs, 'id'>>;
  latest_builds?: SubscriptionResolver<Array<ResolversTypes['latest_builds']>, "latest_builds", ParentType, ContextType, Partial<Subscription_RootLatest_BuildsArgs>>;
  manifest_dependency?: SubscriptionResolver<Array<ResolversTypes['manifest_dependency']>, "manifest_dependency", ParentType, ContextType, Partial<Subscription_RootManifest_DependencyArgs>>;
  manifest_dependency_edge?: SubscriptionResolver<Array<ResolversTypes['manifest_dependency_edge']>, "manifest_dependency_edge", ParentType, ContextType, Partial<Subscription_RootManifest_Dependency_EdgeArgs>>;
  manifest_dependency_node?: SubscriptionResolver<Array<ResolversTypes['manifest_dependency_node']>, "manifest_dependency_node", ParentType, ContextType, Partial<Subscription_RootManifest_Dependency_NodeArgs>>;
  manifest_dependency_node_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['manifest_dependency_node']>, "manifest_dependency_node_by_pk", ParentType, ContextType, RequireFields<Subscription_RootManifest_Dependency_Node_By_PkArgs, 'id'>>;
  manifests?: SubscriptionResolver<Array<ResolversTypes['manifests']>, "manifests", ParentType, ContextType, Partial<Subscription_RootManifestsArgs>>;
  manifests_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['manifests']>, "manifests_by_pk", ParentType, ContextType, RequireFields<Subscription_RootManifests_By_PkArgs, 'id'>>;
  organization_user?: SubscriptionResolver<Array<ResolversTypes['organization_user']>, "organization_user", ParentType, ContextType, Partial<Subscription_RootOrganization_UserArgs>>;
  organization_user_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['organization_user']>, "organization_user_by_pk", ParentType, ContextType, RequireFields<Subscription_RootOrganization_User_By_PkArgs, 'id'>>;
  organizations?: SubscriptionResolver<Array<ResolversTypes['organizations']>, "organizations", ParentType, ContextType, Partial<Subscription_RootOrganizationsArgs>>;
  organizations_aggregate?: SubscriptionResolver<ResolversTypes['organizations_aggregate'], "organizations_aggregate", ParentType, ContextType, Partial<Subscription_RootOrganizations_AggregateArgs>>;
  organizations_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['organizations']>, "organizations_by_pk", ParentType, ContextType, RequireFields<Subscription_RootOrganizations_By_PkArgs, 'id'>>;
  package?: SubscriptionResolver<Array<ResolversTypes['package']>, "package", ParentType, ContextType, Partial<Subscription_RootPackageArgs>>;
  package_aggregate?: SubscriptionResolver<ResolversTypes['package_aggregate'], "package_aggregate", ParentType, ContextType, Partial<Subscription_RootPackage_AggregateArgs>>;
  package_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package']>, "package_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_By_PkArgs, 'id'>>;
  package_license?: SubscriptionResolver<Array<ResolversTypes['package_license']>, "package_license", ParentType, ContextType, Partial<Subscription_RootPackage_LicenseArgs>>;
  package_license_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package_license']>, "package_license_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_License_By_PkArgs, 'id'>>;
  package_maintainer?: SubscriptionResolver<Array<ResolversTypes['package_maintainer']>, "package_maintainer", ParentType, ContextType, Partial<Subscription_RootPackage_MaintainerArgs>>;
  package_maintainer_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package_maintainer']>, "package_maintainer_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_Maintainer_By_PkArgs, 'id'>>;
  package_package_maintainer?: SubscriptionResolver<Array<ResolversTypes['package_package_maintainer']>, "package_package_maintainer", ParentType, ContextType, Partial<Subscription_RootPackage_Package_MaintainerArgs>>;
  package_release?: SubscriptionResolver<Array<ResolversTypes['package_release']>, "package_release", ParentType, ContextType, Partial<Subscription_RootPackage_ReleaseArgs>>;
  package_release_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package_release']>, "package_release_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_Release_By_PkArgs, 'id'>>;
  package_release_dependency?: SubscriptionResolver<Array<ResolversTypes['package_release_dependency']>, "package_release_dependency", ParentType, ContextType, Partial<Subscription_RootPackage_Release_DependencyArgs>>;
  package_release_dependency_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package_release_dependency']>, "package_release_dependency_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_Release_Dependency_By_PkArgs, 'id'>>;
  package_release_license?: SubscriptionResolver<Array<ResolversTypes['package_release_license']>, "package_release_license", ParentType, ContextType, Partial<Subscription_RootPackage_Release_LicenseArgs>>;
  package_release_license_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['package_release_license']>, "package_release_license_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPackage_Release_License_By_PkArgs, 'id'>>;
  project_access_tokens?: SubscriptionResolver<Array<ResolversTypes['project_access_tokens']>, "project_access_tokens", ParentType, ContextType, Partial<Subscription_RootProject_Access_TokensArgs>>;
  project_access_tokens_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_access_tokens']>, "project_access_tokens_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Access_Tokens_By_PkArgs, 'id'>>;
  projects?: SubscriptionResolver<Array<ResolversTypes['projects']>, "projects", ParentType, ContextType, Partial<Subscription_RootProjectsArgs>>;
  projects_aggregate?: SubscriptionResolver<ResolversTypes['projects_aggregate'], "projects_aggregate", ParentType, ContextType, Partial<Subscription_RootProjects_AggregateArgs>>;
  projects_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['projects']>, "projects_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProjects_By_PkArgs, 'id'>>;
  resolved_manifest?: SubscriptionResolver<Array<ResolversTypes['resolved_manifest']>, "resolved_manifest", ParentType, ContextType, Partial<Subscription_RootResolved_ManifestArgs>>;
  resolved_manifest_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['resolved_manifest']>, "resolved_manifest_by_pk", ParentType, ContextType, RequireFields<Subscription_RootResolved_Manifest_By_PkArgs, 'id'>>;
  scans?: SubscriptionResolver<Array<ResolversTypes['scans']>, "scans", ParentType, ContextType, Partial<Subscription_RootScansArgs>>;
  scans_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['scans']>, "scans_by_pk", ParentType, ContextType, RequireFields<Subscription_RootScans_By_PkArgs, 'id'>>;
  settings?: SubscriptionResolver<Array<ResolversTypes['settings']>, "settings", ParentType, ContextType, Partial<Subscription_RootSettingsArgs>>;
  settings_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['settings']>, "settings_by_pk", ParentType, ContextType, RequireFields<Subscription_RootSettings_By_PkArgs, 'id'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['users']>, "users", ParentType, ContextType, Partial<Subscription_RootUsersArgs>>;
  users_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['users']>, "users_by_pk", ParentType, ContextType, RequireFields<Subscription_RootUsers_By_PkArgs, 'id'>>;
  vulnerability?: SubscriptionResolver<Array<ResolversTypes['vulnerability']>, "vulnerability", ParentType, ContextType, Partial<Subscription_RootVulnerabilityArgs>>;
  vulnerability_affected?: SubscriptionResolver<Array<ResolversTypes['vulnerability_affected']>, "vulnerability_affected", ParentType, ContextType, Partial<Subscription_RootVulnerability_AffectedArgs>>;
  vulnerability_affected_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_affected']>, "vulnerability_affected_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Affected_By_PkArgs, 'id'>>;
  vulnerability_affected_range_event?: SubscriptionResolver<Array<ResolversTypes['vulnerability_affected_range_event']>, "vulnerability_affected_range_event", ParentType, ContextType, Partial<Subscription_RootVulnerability_Affected_Range_EventArgs>>;
  vulnerability_affected_range_event_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_affected_range_event']>, "vulnerability_affected_range_event_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Affected_Range_Event_By_PkArgs, 'id'>>;
  vulnerability_affected_version?: SubscriptionResolver<Array<ResolversTypes['vulnerability_affected_version']>, "vulnerability_affected_version", ParentType, ContextType, Partial<Subscription_RootVulnerability_Affected_VersionArgs>>;
  vulnerability_affected_version_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_affected_version']>, "vulnerability_affected_version_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Affected_Version_By_PkArgs, 'id'>>;
  vulnerability_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability']>, "vulnerability_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_By_PkArgs, 'id'>>;
  vulnerability_credit?: SubscriptionResolver<Array<ResolversTypes['vulnerability_credit']>, "vulnerability_credit", ParentType, ContextType, Partial<Subscription_RootVulnerability_CreditArgs>>;
  vulnerability_credit_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_credit']>, "vulnerability_credit_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Credit_By_PkArgs, 'id'>>;
  vulnerability_equivalent?: SubscriptionResolver<Array<ResolversTypes['vulnerability_equivalent']>, "vulnerability_equivalent", ParentType, ContextType, Partial<Subscription_RootVulnerability_EquivalentArgs>>;
  vulnerability_range?: SubscriptionResolver<Array<ResolversTypes['vulnerability_range']>, "vulnerability_range", ParentType, ContextType, Partial<Subscription_RootVulnerability_RangeArgs>>;
  vulnerability_range_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_range']>, "vulnerability_range_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Range_By_PkArgs, 'id'>>;
  vulnerability_reference?: SubscriptionResolver<Array<ResolversTypes['vulnerability_reference']>, "vulnerability_reference", ParentType, ContextType, Partial<Subscription_RootVulnerability_ReferenceArgs>>;
  vulnerability_reference_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_reference']>, "vulnerability_reference_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Reference_By_PkArgs, 'id'>>;
  vulnerability_severity?: SubscriptionResolver<Array<ResolversTypes['vulnerability_severity']>, "vulnerability_severity", ParentType, ContextType, Partial<Subscription_RootVulnerability_SeverityArgs>>;
  vulnerability_severity_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vulnerability_severity']>, "vulnerability_severity_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVulnerability_Severity_By_PkArgs, 'id'>>;
  webhook_cache?: SubscriptionResolver<Array<ResolversTypes['webhook_cache']>, "webhook_cache", ParentType, ContextType, Partial<Subscription_RootWebhook_CacheArgs>>;
  webhook_cache_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['webhook_cache']>, "webhook_cache_by_pk", ParentType, ContextType, RequireFields<Subscription_RootWebhook_Cache_By_PkArgs, 'delivery_id'>>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamp'], any> {
  name: 'timestamp';
}

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export interface User_RoleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['user_role'], any> {
  name: 'user_role';
}

export type UsersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['users'] = ResolversParentTypes['users']> = {
  github_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github_node_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  kratos_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  kratos_identity?: Resolver<Maybe<ResolversTypes['identities']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['user_role'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['users_mutation_response'] = ResolversParentTypes['users_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type VulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability'] = ResolversParentTypes['vulnerability']> = {
  affected?: Resolver<Array<ResolversTypes['vulnerability_affected']>, ParentType, ContextType, Partial<VulnerabilityAffectedArgs>>;
  credits?: Resolver<Array<ResolversTypes['vulnerability_credit']>, ParentType, ContextType, Partial<VulnerabilityCreditsArgs>>;
  cvss_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  database_specific?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<VulnerabilityDatabase_SpecificArgs>>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equivalents?: Resolver<Array<ResolversTypes['vulnerability_equivalent']>, ParentType, ContextType, Partial<VulnerabilityEquivalentsArgs>>;
  findings?: Resolver<Array<ResolversTypes['findings']>, ParentType, ContextType, Partial<VulnerabilityFindingsArgs>>;
  guide_vulnerabilities?: Resolver<Array<ResolversTypes['guide_vulnerabilities']>, ParentType, ContextType, Partial<VulnerabilityGuide_VulnerabilitiesArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  ignored_vulnerabilities?: Resolver<Array<ResolversTypes['ignored_vulnerabilities']>, ParentType, ContextType, Partial<VulnerabilityIgnored_VulnerabilitiesArgs>>;
  modified?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  references?: Resolver<Array<ResolversTypes['vulnerability_reference']>, ParentType, ContextType, Partial<VulnerabilityReferencesArgs>>;
  reviewed_by_source?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  severities?: Resolver<Array<ResolversTypes['vulnerability_severity']>, ParentType, ContextType, Partial<VulnerabilitySeveritiesArgs>>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  upstream_data?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<VulnerabilityUpstream_DataArgs>>;
  withdrawn?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_AffectedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected'] = ResolversParentTypes['vulnerability_affected']> = {
  affected_range_events?: Resolver<Array<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType, Partial<Vulnerability_AffectedAffected_Range_EventsArgs>>;
  affected_versions?: Resolver<Array<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType, Partial<Vulnerability_AffectedAffected_VersionsArgs>>;
  database_specific?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Vulnerability_AffectedDatabase_SpecificArgs>>;
  ecosystem_specific?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Vulnerability_AffectedEcosystem_SpecificArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  package?: Resolver<ResolversTypes['package'], ParentType, ContextType>;
  package_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  ranges?: Resolver<Array<ResolversTypes['vulnerability_range']>, ParentType, ContextType, Partial<Vulnerability_AffectedRangesArgs>>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  vulnerability_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Affected_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected_mutation_response'] = ResolversParentTypes['vulnerability_affected_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_affected']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Affected_Range_EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected_range_event'] = ResolversParentTypes['vulnerability_affected_range_event']> = {
  affected?: Resolver<Maybe<ResolversTypes['vulnerability_affected']>, ParentType, ContextType>;
  affected_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  database_specific?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Vulnerability_Affected_Range_EventDatabase_SpecificArgs>>;
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['affected_range_type'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Affected_Range_Event_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected_range_event_mutation_response'] = ResolversParentTypes['vulnerability_affected_range_event_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_affected_range_event']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Affected_VersionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected_version'] = ResolversParentTypes['vulnerability_affected_version']> = {
  affected?: Resolver<Maybe<ResolversTypes['vulnerability_affected']>, ParentType, ContextType>;
  affected_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  database_specific?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Vulnerability_Affected_VersionDatabase_SpecificArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Affected_Version_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_affected_version_mutation_response'] = ResolversParentTypes['vulnerability_affected_version_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_affected_version']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_CreditResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_credit'] = ResolversParentTypes['vulnerability_credit']> = {
  contact?: Resolver<Maybe<ResolversTypes['_text']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vulnerability?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType>;
  vulnerability_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Credit_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_credit_mutation_response'] = ResolversParentTypes['vulnerability_credit_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_credit']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_EquivalentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_equivalent'] = ResolversParentTypes['vulnerability_equivalent']> = {
  a?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  b?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  equivalent_vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['vulnerability'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Equivalent_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_equivalent_mutation_response'] = ResolversParentTypes['vulnerability_equivalent_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_equivalent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_mutation_response'] = ResolversParentTypes['vulnerability_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_RangeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_range'] = ResolversParentTypes['vulnerability_range']> = {
  affected?: Resolver<ResolversTypes['vulnerability_affected'], ParentType, ContextType>;
  affected_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  fixed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  introduced?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Range_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_range_mutation_response'] = ResolversParentTypes['vulnerability_range_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_range']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_ReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_reference'] = ResolversParentTypes['vulnerability_reference']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['reference_type'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vulnerability?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType>;
  vulnerability_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Reference_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_reference_mutation_response'] = ResolversParentTypes['vulnerability_reference_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_reference']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_SeverityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_severity'] = ResolversParentTypes['vulnerability_severity']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vulnerability?: Resolver<Maybe<ResolversTypes['vulnerability']>, ParentType, ContextType>;
  vulnerability_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vulnerability_Severity_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['vulnerability_severity_mutation_response'] = ResolversParentTypes['vulnerability_severity_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vulnerability_severity']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Webhook_CacheResolvers<ContextType = Context, ParentType extends ResolversParentTypes['webhook_cache'] = ResolversParentTypes['webhook_cache']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Webhook_CacheDataArgs>>;
  delivery_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  event_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  installation_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  signature_256?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sqs_message_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Webhook_Cache_Mutation_ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['webhook_cache_mutation_response'] = ResolversParentTypes['webhook_cache_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['webhook_cache']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AuthenticatedRepoCloneUrlOutput?: AuthenticatedRepoCloneUrlOutputResolvers<ContextType>;
  GithubRepository?: GithubRepositoryResolvers<ContextType>;
  InstallSelectedReposResponse?: InstallSelectedReposResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrgWithRepos?: OrgWithReposResolvers<ContextType>;
  PresignedUrlResponse?: PresignedUrlResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SbomUploadUrlOutput?: SbomUploadUrlOutputResolvers<ContextType>;
  UploadUrl?: UploadUrlResolvers<ContextType>;
  VulnerabilityData?: VulnerabilityDataResolvers<ContextType>;
  _text?: GraphQLScalarType;
  affected_range_type?: GraphQLScalarType;
  bigint?: GraphQLScalarType;
  build_dependency_relationship?: Build_Dependency_RelationshipResolvers<ContextType>;
  build_dependency_relationship_mutation_response?: Build_Dependency_Relationship_Mutation_ResponseResolvers<ContextType>;
  builds?: BuildsResolvers<ContextType>;
  builds_aggregate?: Builds_AggregateResolvers<ContextType>;
  builds_aggregate_fields?: Builds_Aggregate_FieldsResolvers<ContextType>;
  builds_avg_fields?: Builds_Avg_FieldsResolvers<ContextType>;
  builds_max_fields?: Builds_Max_FieldsResolvers<ContextType>;
  builds_min_fields?: Builds_Min_FieldsResolvers<ContextType>;
  builds_mutation_response?: Builds_Mutation_ResponseResolvers<ContextType>;
  builds_source_type?: GraphQLScalarType;
  builds_stddev_fields?: Builds_Stddev_FieldsResolvers<ContextType>;
  builds_stddev_pop_fields?: Builds_Stddev_Pop_FieldsResolvers<ContextType>;
  builds_stddev_samp_fields?: Builds_Stddev_Samp_FieldsResolvers<ContextType>;
  builds_sum_fields?: Builds_Sum_FieldsResolvers<ContextType>;
  builds_var_pop_fields?: Builds_Var_Pop_FieldsResolvers<ContextType>;
  builds_var_samp_fields?: Builds_Var_Samp_FieldsResolvers<ContextType>;
  builds_variance_fields?: Builds_Variance_FieldsResolvers<ContextType>;
  date?: GraphQLScalarType;
  default_branch_builds?: Default_Branch_BuildsResolvers<ContextType>;
  findings?: FindingsResolvers<ContextType>;
  findings_mutation_response?: Findings_Mutation_ResponseResolvers<ContextType>;
  fix_state_enum?: GraphQLScalarType;
  github_repositories?: Github_RepositoriesResolvers<ContextType>;
  github_repositories_mutation_response?: Github_Repositories_Mutation_ResponseResolvers<ContextType>;
  guide_related_guides?: Guide_Related_GuidesResolvers<ContextType>;
  guide_related_guides_mutation_response?: Guide_Related_Guides_Mutation_ResponseResolvers<ContextType>;
  guide_vulnerabilities?: Guide_VulnerabilitiesResolvers<ContextType>;
  guide_vulnerabilities_mutation_response?: Guide_Vulnerabilities_Mutation_ResponseResolvers<ContextType>;
  guides_mutation_response?: Guides_Mutation_ResponseResolvers<ContextType>;
  identities?: IdentitiesResolvers<ContextType>;
  identity_verifiable_addresses?: Identity_Verifiable_AddressesResolvers<ContextType>;
  ignored_vulnerabilities?: Ignored_VulnerabilitiesResolvers<ContextType>;
  jsonb?: GraphQLScalarType;
  latest_builds?: Latest_BuildsResolvers<ContextType>;
  license_source?: GraphQLScalarType;
  manifest_dependency?: Manifest_DependencyResolvers<ContextType>;
  manifest_dependency_edge?: Manifest_Dependency_EdgeResolvers<ContextType>;
  manifest_dependency_edge_mutation_response?: Manifest_Dependency_Edge_Mutation_ResponseResolvers<ContextType>;
  manifest_dependency_mutation_response?: Manifest_Dependency_Mutation_ResponseResolvers<ContextType>;
  manifest_dependency_node?: Manifest_Dependency_NodeResolvers<ContextType>;
  manifest_dependency_node_mutation_response?: Manifest_Dependency_Node_Mutation_ResponseResolvers<ContextType>;
  manifests?: ManifestsResolvers<ContextType>;
  manifests_mutation_response?: Manifests_Mutation_ResponseResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  organization_user?: Organization_UserResolvers<ContextType>;
  organization_user_mutation_response?: Organization_User_Mutation_ResponseResolvers<ContextType>;
  organization_user_role?: GraphQLScalarType;
  organizations?: OrganizationsResolvers<ContextType>;
  organizations_aggregate?: Organizations_AggregateResolvers<ContextType>;
  organizations_aggregate_fields?: Organizations_Aggregate_FieldsResolvers<ContextType>;
  organizations_avg_fields?: Organizations_Avg_FieldsResolvers<ContextType>;
  organizations_max_fields?: Organizations_Max_FieldsResolvers<ContextType>;
  organizations_min_fields?: Organizations_Min_FieldsResolvers<ContextType>;
  organizations_mutation_response?: Organizations_Mutation_ResponseResolvers<ContextType>;
  organizations_stddev_fields?: Organizations_Stddev_FieldsResolvers<ContextType>;
  organizations_stddev_pop_fields?: Organizations_Stddev_Pop_FieldsResolvers<ContextType>;
  organizations_stddev_samp_fields?: Organizations_Stddev_Samp_FieldsResolvers<ContextType>;
  organizations_sum_fields?: Organizations_Sum_FieldsResolvers<ContextType>;
  organizations_var_pop_fields?: Organizations_Var_Pop_FieldsResolvers<ContextType>;
  organizations_var_samp_fields?: Organizations_Var_Samp_FieldsResolvers<ContextType>;
  organizations_variance_fields?: Organizations_Variance_FieldsResolvers<ContextType>;
  package?: PackageResolvers<ContextType>;
  package_aggregate?: Package_AggregateResolvers<ContextType>;
  package_aggregate_fields?: Package_Aggregate_FieldsResolvers<ContextType>;
  package_license?: Package_LicenseResolvers<ContextType>;
  package_license_mutation_response?: Package_License_Mutation_ResponseResolvers<ContextType>;
  package_maintainer?: Package_MaintainerResolvers<ContextType>;
  package_maintainer_mutation_response?: Package_Maintainer_Mutation_ResponseResolvers<ContextType>;
  package_manager?: GraphQLScalarType;
  package_max_fields?: Package_Max_FieldsResolvers<ContextType>;
  package_min_fields?: Package_Min_FieldsResolvers<ContextType>;
  package_mutation_response?: Package_Mutation_ResponseResolvers<ContextType>;
  package_package_maintainer?: Package_Package_MaintainerResolvers<ContextType>;
  package_package_maintainer_mutation_response?: Package_Package_Maintainer_Mutation_ResponseResolvers<ContextType>;
  package_release?: Package_ReleaseResolvers<ContextType>;
  package_release_dependency?: Package_Release_DependencyResolvers<ContextType>;
  package_release_dependency_mutation_response?: Package_Release_Dependency_Mutation_ResponseResolvers<ContextType>;
  package_release_license?: Package_Release_LicenseResolvers<ContextType>;
  package_release_license_mutation_response?: Package_Release_License_Mutation_ResponseResolvers<ContextType>;
  package_release_mutation_response?: Package_Release_Mutation_ResponseResolvers<ContextType>;
  project_access_tokens?: Project_Access_TokensResolvers<ContextType>;
  projects?: ProjectsResolvers<ContextType>;
  projects_aggregate?: Projects_AggregateResolvers<ContextType>;
  projects_aggregate_fields?: Projects_Aggregate_FieldsResolvers<ContextType>;
  projects_max_fields?: Projects_Max_FieldsResolvers<ContextType>;
  projects_min_fields?: Projects_Min_FieldsResolvers<ContextType>;
  projects_mutation_response?: Projects_Mutation_ResponseResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  reference_type?: GraphQLScalarType;
  resolved_manifest?: Resolved_ManifestResolvers<ContextType>;
  resolved_manifest_mutation_response?: Resolved_Manifest_Mutation_ResponseResolvers<ContextType>;
  scans?: ScansResolvers<ContextType>;
  scans_mutation_response?: Scans_Mutation_ResponseResolvers<ContextType>;
  settings?: SettingsResolvers<ContextType>;
  severity_enum?: GraphQLScalarType;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  timestamp?: GraphQLScalarType;
  timestamptz?: GraphQLScalarType;
  user_role?: GraphQLScalarType;
  users?: UsersResolvers<ContextType>;
  users_mutation_response?: Users_Mutation_ResponseResolvers<ContextType>;
  uuid?: GraphQLScalarType;
  vulnerability?: VulnerabilityResolvers<ContextType>;
  vulnerability_affected?: Vulnerability_AffectedResolvers<ContextType>;
  vulnerability_affected_mutation_response?: Vulnerability_Affected_Mutation_ResponseResolvers<ContextType>;
  vulnerability_affected_range_event?: Vulnerability_Affected_Range_EventResolvers<ContextType>;
  vulnerability_affected_range_event_mutation_response?: Vulnerability_Affected_Range_Event_Mutation_ResponseResolvers<ContextType>;
  vulnerability_affected_version?: Vulnerability_Affected_VersionResolvers<ContextType>;
  vulnerability_affected_version_mutation_response?: Vulnerability_Affected_Version_Mutation_ResponseResolvers<ContextType>;
  vulnerability_credit?: Vulnerability_CreditResolvers<ContextType>;
  vulnerability_credit_mutation_response?: Vulnerability_Credit_Mutation_ResponseResolvers<ContextType>;
  vulnerability_equivalent?: Vulnerability_EquivalentResolvers<ContextType>;
  vulnerability_equivalent_mutation_response?: Vulnerability_Equivalent_Mutation_ResponseResolvers<ContextType>;
  vulnerability_mutation_response?: Vulnerability_Mutation_ResponseResolvers<ContextType>;
  vulnerability_range?: Vulnerability_RangeResolvers<ContextType>;
  vulnerability_range_mutation_response?: Vulnerability_Range_Mutation_ResponseResolvers<ContextType>;
  vulnerability_reference?: Vulnerability_ReferenceResolvers<ContextType>;
  vulnerability_reference_mutation_response?: Vulnerability_Reference_Mutation_ResponseResolvers<ContextType>;
  vulnerability_severity?: Vulnerability_SeverityResolvers<ContextType>;
  vulnerability_severity_mutation_response?: Vulnerability_Severity_Mutation_ResponseResolvers<ContextType>;
  webhook_cache?: Webhook_CacheResolvers<ContextType>;
  webhook_cache_mutation_response?: Webhook_Cache_Mutation_ResponseResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};
