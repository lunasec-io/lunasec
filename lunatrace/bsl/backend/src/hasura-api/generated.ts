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
  _text: string;
  affected_range_type: any;
  bigint: number;
  builds_source_type: 'cli'|'gui'|'pr'|'default_branch';
  cvss_complexity: any;
  cvss_interaction: any;
  cvss_low_medium_high: any;
  cvss_none_low_high: any;
  cvss_scope: any;
  cvss_vector: any;
  date: Date;
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

export type BuildData_AffectedByVulnerability = {
  __typename?: 'BuildData_AffectedByVulnerability';
  beneath_minimum_severity: Scalars['Boolean'];
  fix_versions: Array<Scalars['String']>;
  ignored: Scalars['Boolean'];
  ignored_vulnerability?: Maybe<BuildData_IgnoredVulnerability>;
  path: Scalars['String'];
  ranges: Array<BuildData_Range>;
  trivially_updatable_to?: Maybe<Scalars['String']>;
  vulnerability: BuildData_Vulnerability;
};

export type BuildData_Cwe = {
  __typename?: 'BuildData_Cwe';
  common_name?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type BuildData_DependencyNode = {
  __typename?: 'BuildData_DependencyNode';
  id: Scalars['String'];
  locations: Array<BuildData_Location>;
  range: Scalars['String'];
  reachable: Scalars['String'];
  release: BuildData_Release;
  release_id: Scalars['String'];
};

export type BuildData_Guide = {
  __typename?: 'BuildData_Guide';
  id: Scalars['String'];
  summary: Scalars['String'];
  title: Scalars['String'];
};

export type BuildData_Guide_Vulnerability = {
  __typename?: 'BuildData_Guide_Vulnerability';
  guide?: Maybe<BuildData_Guide>;
};

export type BuildData_IgnoredVulnerability = {
  __typename?: 'BuildData_IgnoredVulnerability';
  locations: Array<Scalars['String']>;
  note: Scalars['String'];
};

export type BuildData_Location = {
  __typename?: 'BuildData_Location';
  end_column: Scalars['Int'];
  end_row: Scalars['Int'];
  id: Scalars['String'];
  path: Scalars['String'];
  start_column: Scalars['Int'];
  start_row: Scalars['Int'];
};

export type BuildData_Package = {
  __typename?: 'BuildData_Package';
  name: Scalars['String'];
  package_manager: Scalars['String'];
};

export type BuildData_Range = {
  __typename?: 'BuildData_Range';
  fixed?: Maybe<Scalars['String']>;
  introduced?: Maybe<Scalars['String']>;
};

export type BuildData_Release = {
  __typename?: 'BuildData_Release';
  id: Scalars['String'];
  package: BuildData_Package;
  version: Scalars['String'];
};

export type BuildData_Vulnerability = {
  __typename?: 'BuildData_Vulnerability';
  cvss_score?: Maybe<Scalars['Float']>;
  cwes: Array<BuildData_VulnerabilityCwe>;
  guide_vulnerabilities: Array<BuildData_Guide_Vulnerability>;
  id: Scalars['String'];
  severity_name?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  source_id: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
};

export type BuildData_VulnerabilityCwe = {
  __typename?: 'BuildData_VulnerabilityCwe';
  cwe: BuildData_Cwe;
  id: Scalars['String'];
};

export type BuildData_VulnerableRelease = {
  __typename?: 'BuildData_VulnerableRelease';
  affected_by: Array<BuildData_AffectedByVulnerability>;
  beneath_minimum_severity: Scalars['Boolean'];
  chains: Array<Array<BuildData_DependencyNode>>;
  cvss?: Maybe<Scalars['Float']>;
  dev_only: Scalars['Boolean'];
  fix_versions: Array<Scalars['String']>;
  guides: Array<BuildData_Guide>;
  paths: Array<Scalars['String']>;
  release: BuildData_Release;
  severity: Scalars['String'];
  trivially_updatable: Scalars['String'];
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

export enum Analysis_Finding_Source_Enum {
  SemgrepImportedCalled = 'semgrep_imported_called'
}

/** Boolean expression to compare columns of type "analysis_finding_source_enum". All fields are combined with logical 'AND'. */
export type Analysis_Finding_Source_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Analysis_Finding_Source_Enum>;
  _in?: InputMaybe<Array<Analysis_Finding_Source_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Analysis_Finding_Source_Enum>;
  _nin?: InputMaybe<Array<Analysis_Finding_Source_Enum>>;
};

export enum Analysis_Finding_Type_Enum {
  Error = 'error',
  NotVulnerable = 'not_vulnerable',
  Unknown = 'unknown',
  Vulnerable = 'vulnerable'
}

/** Boolean expression to compare columns of type "analysis_finding_type_enum". All fields are combined with logical 'AND'. */
export type Analysis_Finding_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Analysis_Finding_Type_Enum>;
  _in?: InputMaybe<Array<Analysis_Finding_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Analysis_Finding_Type_Enum>;
  _nin?: InputMaybe<Array<Analysis_Finding_Type_Enum>>;
};

/** columns and relationships of "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result = {
  __typename?: 'analysis_manifest_dependency_edge_result';
  created_at: Scalars['timestamptz'];
  finding_source: Analysis_Finding_Source_Enum;
  finding_source_version: Scalars['Int'];
  finding_type: Analysis_Finding_Type_Enum;
  id: Scalars['uuid'];
  /** An array relationship */
  locations: Array<Analysis_Manifest_Dependency_Edge_Result_Location>;
  /** An object relationship */
  manifest_dependency_edge: Manifest_Dependency_Edge;
  manifest_dependency_edge_id: Scalars['uuid'];
  output?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  vulnerability: Vulnerability;
  vulnerability_id: Scalars['uuid'];
};


/** columns and relationships of "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_ResultLocationsArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
};


/** columns and relationships of "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_ResultOutputArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Aggregate_Order_By = {
  avg?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Max_Order_By>;
  min?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Min_Order_By>;
  stddev?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Sum_Order_By>;
  var_pop?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Var_Samp_Order_By>;
  variance?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Analysis_Manifest_Dependency_Edge_Result_Append_Input = {
  output?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Arr_Rel_Insert_Input = {
  data: Array<Analysis_Manifest_Dependency_Edge_Result_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_On_Conflict>;
};

/** order by avg() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Avg_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "analysis.manifest_dependency_edge_result". All fields are combined with a logical 'AND'. */
export type Analysis_Manifest_Dependency_Edge_Result_Bool_Exp = {
  _and?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>>;
  _not?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
  _or?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  finding_source?: InputMaybe<Analysis_Finding_Source_Enum_Comparison_Exp>;
  finding_source_version?: InputMaybe<Int_Comparison_Exp>;
  finding_type?: InputMaybe<Analysis_Finding_Type_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  locations?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
  manifest_dependency_edge?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
  manifest_dependency_edge_id?: InputMaybe<Uuid_Comparison_Exp>;
  output?: InputMaybe<Jsonb_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "analysis.manifest_dependency_edge_result" */
export enum Analysis_Manifest_Dependency_Edge_Result_Constraint {
  /** unique or primary key constraint on columns "manifest_dependency_edge_id", "vulnerability_id", "finding_source_version", "finding_source" */
  ManifestDependencyEdgeResultManifestDependencyEdgeIdVul = 'manifest_dependency_edge_result_manifest_dependency_edge_id_vul',
  /** unique or primary key constraint on columns "id" */
  ManifestDependencyEdgeResultPkey = 'manifest_dependency_edge_result_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Analysis_Manifest_Dependency_Edge_Result_Delete_At_Path_Input = {
  output?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Analysis_Manifest_Dependency_Edge_Result_Delete_Elem_Input = {
  output?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Analysis_Manifest_Dependency_Edge_Result_Delete_Key_Input = {
  output?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Inc_Input = {
  finding_source_version?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  finding_source?: InputMaybe<Analysis_Finding_Source_Enum>;
  finding_source_version?: InputMaybe<Scalars['Int']>;
  finding_type?: InputMaybe<Analysis_Finding_Type_Enum>;
  id?: InputMaybe<Scalars['uuid']>;
  locations?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Arr_Rel_Insert_Input>;
  manifest_dependency_edge?: InputMaybe<Manifest_Dependency_Edge_Obj_Rel_Insert_Input>;
  manifest_dependency_edge_id?: InputMaybe<Scalars['uuid']>;
  output?: InputMaybe<Scalars['jsonb']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** Callsite of a child dependency being imported and used inside of a parent manifest dependency. */
export type Analysis_Manifest_Dependency_Edge_Result_Location = {
  __typename?: 'analysis_manifest_dependency_edge_result_location';
  end_column: Scalars['Int'];
  end_row: Scalars['Int'];
  id: Scalars['uuid'];
  manifest_dependency_edge_result_id: Scalars['uuid'];
  path: Scalars['String'];
  start_column: Scalars['Int'];
  start_row: Scalars['Int'];
};

/** order by aggregate values of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Aggregate_Order_By = {
  avg?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Max_Order_By>;
  min?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Min_Order_By>;
  stddev?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Sum_Order_By>;
  var_pop?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Var_Samp_Order_By>;
  variance?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Arr_Rel_Insert_Input = {
  data: Array<Analysis_Manifest_Dependency_Edge_Result_Location_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_On_Conflict>;
};

/** order by avg() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Avg_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "analysis.manifest_dependency_edge_result_location". All fields are combined with a logical 'AND'. */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp = {
  _and?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>>;
  _not?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
  _or?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>>;
  end_column?: InputMaybe<Int_Comparison_Exp>;
  end_row?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manifest_dependency_edge_result_id?: InputMaybe<Uuid_Comparison_Exp>;
  path?: InputMaybe<String_Comparison_Exp>;
  start_column?: InputMaybe<Int_Comparison_Exp>;
  start_row?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "analysis.manifest_dependency_edge_result_location" */
export enum Analysis_Manifest_Dependency_Edge_Result_Location_Constraint {
  /** unique or primary key constraint on columns "id" */
  ManifestDependencyEdgeResultCallsitePkey = 'manifest_dependency_edge_result_callsite_pkey'
}

/** input type for incrementing numeric columns in table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Inc_Input = {
  end_column?: InputMaybe<Scalars['Int']>;
  end_row?: InputMaybe<Scalars['Int']>;
  start_column?: InputMaybe<Scalars['Int']>;
  start_row?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Insert_Input = {
  end_column?: InputMaybe<Scalars['Int']>;
  end_row?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  manifest_dependency_edge_result_id?: InputMaybe<Scalars['uuid']>;
  path?: InputMaybe<Scalars['String']>;
  start_column?: InputMaybe<Scalars['Int']>;
  start_row?: InputMaybe<Scalars['Int']>;
};

/** order by max() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Max_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependency_edge_result_id?: InputMaybe<Order_By>;
  path?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Min_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependency_edge_result_id?: InputMaybe<Order_By>;
  path?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Mutation_Response = {
  __typename?: 'analysis_manifest_dependency_edge_result_location_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Analysis_Manifest_Dependency_Edge_Result_Location>;
};

/** on_conflict condition type for table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_On_Conflict = {
  constraint: Analysis_Manifest_Dependency_Edge_Result_Location_Constraint;
  update_columns?: Array<Analysis_Manifest_Dependency_Edge_Result_Location_Update_Column>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
};

/** Ordering options when selecting data from "analysis.manifest_dependency_edge_result_location". */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependency_edge_result_id?: InputMaybe<Order_By>;
  path?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** primary key columns input for table: analysis_manifest_dependency_edge_result_location */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "analysis.manifest_dependency_edge_result_location" */
export enum Analysis_Manifest_Dependency_Edge_Result_Location_Select_Column {
  /** column name */
  EndColumn = 'end_column',
  /** column name */
  EndRow = 'end_row',
  /** column name */
  Id = 'id',
  /** column name */
  ManifestDependencyEdgeResultId = 'manifest_dependency_edge_result_id',
  /** column name */
  Path = 'path',
  /** column name */
  StartColumn = 'start_column',
  /** column name */
  StartRow = 'start_row'
}

/** input type for updating data in table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Set_Input = {
  end_column?: InputMaybe<Scalars['Int']>;
  end_row?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  manifest_dependency_edge_result_id?: InputMaybe<Scalars['uuid']>;
  path?: InputMaybe<Scalars['String']>;
  start_column?: InputMaybe<Scalars['Int']>;
  start_row?: InputMaybe<Scalars['Int']>;
};

/** order by stddev() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Pop_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Stddev_Samp_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Sum_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** update columns of table "analysis.manifest_dependency_edge_result_location" */
export enum Analysis_Manifest_Dependency_Edge_Result_Location_Update_Column {
  /** column name */
  EndColumn = 'end_column',
  /** column name */
  EndRow = 'end_row',
  /** column name */
  Id = 'id',
  /** column name */
  ManifestDependencyEdgeResultId = 'manifest_dependency_edge_result_id',
  /** column name */
  Path = 'path',
  /** column name */
  StartColumn = 'start_column',
  /** column name */
  StartRow = 'start_row'
}

/** order by var_pop() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Var_Pop_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Var_Samp_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "analysis.manifest_dependency_edge_result_location" */
export type Analysis_Manifest_Dependency_Edge_Result_Location_Variance_Order_By = {
  end_column?: InputMaybe<Order_By>;
  end_row?: InputMaybe<Order_By>;
  start_column?: InputMaybe<Order_By>;
  start_row?: InputMaybe<Order_By>;
};

/** order by max() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finding_source_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependency_edge_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finding_source_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manifest_dependency_edge_id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Mutation_Response = {
  __typename?: 'analysis_manifest_dependency_edge_result_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Analysis_Manifest_Dependency_Edge_Result>;
};

/** on_conflict condition type for table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_On_Conflict = {
  constraint: Analysis_Manifest_Dependency_Edge_Result_Constraint;
  update_columns?: Array<Analysis_Manifest_Dependency_Edge_Result_Update_Column>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
};

/** Ordering options when selecting data from "analysis.manifest_dependency_edge_result". */
export type Analysis_Manifest_Dependency_Edge_Result_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finding_source?: InputMaybe<Order_By>;
  finding_source_version?: InputMaybe<Order_By>;
  finding_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  locations_aggregate?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Aggregate_Order_By>;
  manifest_dependency_edge?: InputMaybe<Manifest_Dependency_Edge_Order_By>;
  manifest_dependency_edge_id?: InputMaybe<Order_By>;
  output?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: analysis_manifest_dependency_edge_result */
export type Analysis_Manifest_Dependency_Edge_Result_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Analysis_Manifest_Dependency_Edge_Result_Prepend_Input = {
  output?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "analysis.manifest_dependency_edge_result" */
export enum Analysis_Manifest_Dependency_Edge_Result_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FindingSource = 'finding_source',
  /** column name */
  FindingSourceVersion = 'finding_source_version',
  /** column name */
  FindingType = 'finding_type',
  /** column name */
  Id = 'id',
  /** column name */
  ManifestDependencyEdgeId = 'manifest_dependency_edge_id',
  /** column name */
  Output = 'output',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  finding_source?: InputMaybe<Analysis_Finding_Source_Enum>;
  finding_source_version?: InputMaybe<Scalars['Int']>;
  finding_type?: InputMaybe<Analysis_Finding_Type_Enum>;
  id?: InputMaybe<Scalars['uuid']>;
  manifest_dependency_edge_id?: InputMaybe<Scalars['uuid']>;
  output?: InputMaybe<Scalars['jsonb']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Stddev_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Stddev_Pop_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Stddev_Samp_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Sum_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** update columns of table "analysis.manifest_dependency_edge_result" */
export enum Analysis_Manifest_Dependency_Edge_Result_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FindingSource = 'finding_source',
  /** column name */
  FindingSourceVersion = 'finding_source_version',
  /** column name */
  FindingType = 'finding_type',
  /** column name */
  Id = 'id',
  /** column name */
  ManifestDependencyEdgeId = 'manifest_dependency_edge_id',
  /** column name */
  Output = 'output',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** order by var_pop() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Var_Pop_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Var_Samp_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "analysis.manifest_dependency_edge_result" */
export type Analysis_Manifest_Dependency_Edge_Result_Variance_Order_By = {
  finding_source_version?: InputMaybe<Order_By>;
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

/** columns and relationships of "build_log" */
export type Build_Log = {
  __typename?: 'build_log';
  /** An object relationship */
  build: Builds;
  build_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  message?: Maybe<Scalars['String']>;
  state: Build_State_Enum;
};

/** order by aggregate values of table "build_log" */
export type Build_Log_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Build_Log_Max_Order_By>;
  min?: InputMaybe<Build_Log_Min_Order_By>;
};

/** input type for inserting array relation for remote table "build_log" */
export type Build_Log_Arr_Rel_Insert_Input = {
  data: Array<Build_Log_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Build_Log_On_Conflict>;
};

/** Boolean expression to filter rows from the table "build_log". All fields are combined with a logical 'AND'. */
export type Build_Log_Bool_Exp = {
  _and?: InputMaybe<Array<Build_Log_Bool_Exp>>;
  _not?: InputMaybe<Build_Log_Bool_Exp>;
  _or?: InputMaybe<Array<Build_Log_Bool_Exp>>;
  build?: InputMaybe<Builds_Bool_Exp>;
  build_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  state?: InputMaybe<Build_State_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "build_log" */
export enum Build_Log_Constraint {
  /** unique or primary key constraint on columns "id" */
  BuildLogPkey = 'build_log_pkey'
}

/** input type for inserting data into table "build_log" */
export type Build_Log_Insert_Input = {
  build?: InputMaybe<Builds_Obj_Rel_Insert_Input>;
  build_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Build_State_Enum>;
};

/** order by max() on columns of table "build_log" */
export type Build_Log_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "build_log" */
export type Build_Log_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "build_log" */
export type Build_Log_Mutation_Response = {
  __typename?: 'build_log_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Build_Log>;
};

/** on_conflict condition type for table "build_log" */
export type Build_Log_On_Conflict = {
  constraint: Build_Log_Constraint;
  update_columns?: Array<Build_Log_Update_Column>;
  where?: InputMaybe<Build_Log_Bool_Exp>;
};

/** Ordering options when selecting data from "build_log". */
export type Build_Log_Order_By = {
  build?: InputMaybe<Builds_Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
};

/** select columns of table "build_log" */
export enum Build_Log_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  State = 'state'
}

/** placeholder for update columns of table "build_log" (current role has no relevant permissions) */
export enum Build_Log_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

export enum Build_State_Enum {
  SnapshotCompleted = 'snapshot_completed',
  SnapshotFailed = 'snapshot_failed',
  SnapshotQueued = 'snapshot_queued',
  SnapshotScanCompleted = 'snapshot_scan_completed',
  SnapshotScanFailed = 'snapshot_scan_failed',
  SnapshotScanQueued = 'snapshot_scan_queued',
  SnapshotScanStarted = 'snapshot_scan_started',
  SnapshotStarted = 'snapshot_started'
}

/** Boolean expression to compare columns of type "build_state_enum". All fields are combined with logical 'AND'. */
export type Build_State_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Build_State_Enum>;
  _in?: InputMaybe<Array<Build_State_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Build_State_Enum>;
  _nin?: InputMaybe<Array<Build_State_Enum>>;
};

/** columns and relationships of "builds" */
export type Builds = {
  __typename?: 'builds';
  agent_access_token: Scalars['uuid'];
  /** An array relationship */
  build_dependency_relationships: Array<Build_Dependency_Relationship>;
  /** An array relationship */
  build_logs: Array<Build_Log>;
  build_number?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
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
  project: Projects;
  project_id: Scalars['uuid'];
  pull_request_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  resolved_manifests: Array<Resolved_Manifest>;
  s3_url?: Maybe<Scalars['String']>;
  s3_url_signed?: Maybe<Scalars['String']>;
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
export type BuildsBuild_LogsArgs = {
  distinct_on?: InputMaybe<Array<Build_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Log_Order_By>>;
  where?: InputMaybe<Build_Log_Bool_Exp>;
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
  build_logs?: InputMaybe<Build_Log_Bool_Exp>;
  build_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  build_logs?: InputMaybe<Build_Log_Arr_Rel_Insert_Input>;
  build_number?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  build_logs_aggregate?: InputMaybe<Build_Log_Aggregate_Order_By>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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

/** Boolean expression to compare columns of type "cvss_complexity". All fields are combined with logical 'AND'. */
export type Cvss_Complexity_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_complexity']>;
  _gt?: InputMaybe<Scalars['cvss_complexity']>;
  _gte?: InputMaybe<Scalars['cvss_complexity']>;
  _in?: InputMaybe<Array<Scalars['cvss_complexity']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_complexity']>;
  _lte?: InputMaybe<Scalars['cvss_complexity']>;
  _neq?: InputMaybe<Scalars['cvss_complexity']>;
  _nin?: InputMaybe<Array<Scalars['cvss_complexity']>>;
};

/** columns and relationships of "cvss_environmental_adjustment" */
export type Cvss_Environmental_Adjustment = {
  __typename?: 'cvss_environmental_adjustment';
  attack_complexity: Scalars['cvss_complexity'];
  attack_vector: Scalars['cvss_vector'];
  availability_impact: Scalars['cvss_none_low_high'];
  availability_requirement: Scalars['cvss_low_medium_high'];
  confidentiality_impact: Scalars['cvss_none_low_high'];
  confidentiality_requirement: Scalars['cvss_low_medium_high'];
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  folder_environmental_adjustments: Array<Folder_Environmental_Adjustment>;
  group_name: Scalars['String'];
  id: Scalars['uuid'];
  integrity_impact: Scalars['cvss_none_low_high'];
  integrity_requirement: Scalars['cvss_low_medium_high'];
  name: Scalars['String'];
  privileges_required: Scalars['cvss_none_low_high'];
  scope: Scalars['cvss_scope'];
  user_interaction: Scalars['cvss_interaction'];
};


/** columns and relationships of "cvss_environmental_adjustment" */
export type Cvss_Environmental_AdjustmentFolder_Environmental_AdjustmentsArgs = {
  distinct_on?: InputMaybe<Array<Folder_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Folder_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "cvss_environmental_adjustment". All fields are combined with a logical 'AND'. */
export type Cvss_Environmental_Adjustment_Bool_Exp = {
  _and?: InputMaybe<Array<Cvss_Environmental_Adjustment_Bool_Exp>>;
  _not?: InputMaybe<Cvss_Environmental_Adjustment_Bool_Exp>;
  _or?: InputMaybe<Array<Cvss_Environmental_Adjustment_Bool_Exp>>;
  attack_complexity?: InputMaybe<Cvss_Complexity_Comparison_Exp>;
  attack_vector?: InputMaybe<Cvss_Vector_Comparison_Exp>;
  availability_impact?: InputMaybe<Cvss_None_Low_High_Comparison_Exp>;
  availability_requirement?: InputMaybe<Cvss_Low_Medium_High_Comparison_Exp>;
  confidentiality_impact?: InputMaybe<Cvss_None_Low_High_Comparison_Exp>;
  confidentiality_requirement?: InputMaybe<Cvss_Low_Medium_High_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  folder_environmental_adjustments?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
  group_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  integrity_impact?: InputMaybe<Cvss_None_Low_High_Comparison_Exp>;
  integrity_requirement?: InputMaybe<Cvss_Low_Medium_High_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  privileges_required?: InputMaybe<Cvss_None_Low_High_Comparison_Exp>;
  scope?: InputMaybe<Cvss_Scope_Comparison_Exp>;
  user_interaction?: InputMaybe<Cvss_Interaction_Comparison_Exp>;
};

/** Ordering options when selecting data from "cvss_environmental_adjustment". */
export type Cvss_Environmental_Adjustment_Order_By = {
  attack_complexity?: InputMaybe<Order_By>;
  attack_vector?: InputMaybe<Order_By>;
  availability_impact?: InputMaybe<Order_By>;
  availability_requirement?: InputMaybe<Order_By>;
  confidentiality_impact?: InputMaybe<Order_By>;
  confidentiality_requirement?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  folder_environmental_adjustments_aggregate?: InputMaybe<Folder_Environmental_Adjustment_Aggregate_Order_By>;
  group_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  integrity_impact?: InputMaybe<Order_By>;
  integrity_requirement?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  privileges_required?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  user_interaction?: InputMaybe<Order_By>;
};

/** select columns of table "cvss_environmental_adjustment" */
export enum Cvss_Environmental_Adjustment_Select_Column {
  /** column name */
  AttackComplexity = 'attack_complexity',
  /** column name */
  AttackVector = 'attack_vector',
  /** column name */
  AvailabilityImpact = 'availability_impact',
  /** column name */
  AvailabilityRequirement = 'availability_requirement',
  /** column name */
  ConfidentialityImpact = 'confidentiality_impact',
  /** column name */
  ConfidentialityRequirement = 'confidentiality_requirement',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GroupName = 'group_name',
  /** column name */
  Id = 'id',
  /** column name */
  IntegrityImpact = 'integrity_impact',
  /** column name */
  IntegrityRequirement = 'integrity_requirement',
  /** column name */
  Name = 'name',
  /** column name */
  PrivilegesRequired = 'privileges_required',
  /** column name */
  Scope = 'scope',
  /** column name */
  UserInteraction = 'user_interaction'
}

/** Boolean expression to compare columns of type "cvss_interaction". All fields are combined with logical 'AND'. */
export type Cvss_Interaction_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_interaction']>;
  _gt?: InputMaybe<Scalars['cvss_interaction']>;
  _gte?: InputMaybe<Scalars['cvss_interaction']>;
  _in?: InputMaybe<Array<Scalars['cvss_interaction']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_interaction']>;
  _lte?: InputMaybe<Scalars['cvss_interaction']>;
  _neq?: InputMaybe<Scalars['cvss_interaction']>;
  _nin?: InputMaybe<Array<Scalars['cvss_interaction']>>;
};

/** Boolean expression to compare columns of type "cvss_low_medium_high". All fields are combined with logical 'AND'. */
export type Cvss_Low_Medium_High_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _gt?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _gte?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _in?: InputMaybe<Array<Scalars['cvss_low_medium_high']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _lte?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _neq?: InputMaybe<Scalars['cvss_low_medium_high']>;
  _nin?: InputMaybe<Array<Scalars['cvss_low_medium_high']>>;
};

/** Boolean expression to compare columns of type "cvss_none_low_high". All fields are combined with logical 'AND'. */
export type Cvss_None_Low_High_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_none_low_high']>;
  _gt?: InputMaybe<Scalars['cvss_none_low_high']>;
  _gte?: InputMaybe<Scalars['cvss_none_low_high']>;
  _in?: InputMaybe<Array<Scalars['cvss_none_low_high']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_none_low_high']>;
  _lte?: InputMaybe<Scalars['cvss_none_low_high']>;
  _neq?: InputMaybe<Scalars['cvss_none_low_high']>;
  _nin?: InputMaybe<Array<Scalars['cvss_none_low_high']>>;
};

/** Boolean expression to compare columns of type "cvss_scope". All fields are combined with logical 'AND'. */
export type Cvss_Scope_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_scope']>;
  _gt?: InputMaybe<Scalars['cvss_scope']>;
  _gte?: InputMaybe<Scalars['cvss_scope']>;
  _in?: InputMaybe<Array<Scalars['cvss_scope']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_scope']>;
  _lte?: InputMaybe<Scalars['cvss_scope']>;
  _neq?: InputMaybe<Scalars['cvss_scope']>;
  _nin?: InputMaybe<Array<Scalars['cvss_scope']>>;
};

/** Boolean expression to compare columns of type "cvss_vector". All fields are combined with logical 'AND'. */
export type Cvss_Vector_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['cvss_vector']>;
  _gt?: InputMaybe<Scalars['cvss_vector']>;
  _gte?: InputMaybe<Scalars['cvss_vector']>;
  _in?: InputMaybe<Array<Scalars['cvss_vector']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['cvss_vector']>;
  _lte?: InputMaybe<Scalars['cvss_vector']>;
  _neq?: InputMaybe<Scalars['cvss_vector']>;
  _nin?: InputMaybe<Array<Scalars['cvss_vector']>>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at: Scalars['timestamptz'];
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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

/** columns and relationships of "folder_environmental_adjustment" */
export type Folder_Environmental_Adjustment = {
  __typename?: 'folder_environmental_adjustment';
  /** An object relationship */
  cvss_environmental_adjustment: Cvss_Environmental_Adjustment;
  cvss_environmental_adjustment_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  project_folder_setting: Project_Folder_Settings;
  project_folder_settings_id: Scalars['uuid'];
};

/** order by aggregate values of table "folder_environmental_adjustment" */
export type Folder_Environmental_Adjustment_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Folder_Environmental_Adjustment_Max_Order_By>;
  min?: InputMaybe<Folder_Environmental_Adjustment_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "folder_environmental_adjustment". All fields are combined with a logical 'AND'. */
export type Folder_Environmental_Adjustment_Bool_Exp = {
  _and?: InputMaybe<Array<Folder_Environmental_Adjustment_Bool_Exp>>;
  _not?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
  _or?: InputMaybe<Array<Folder_Environmental_Adjustment_Bool_Exp>>;
  cvss_environmental_adjustment?: InputMaybe<Cvss_Environmental_Adjustment_Bool_Exp>;
  cvss_environmental_adjustment_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project_folder_setting?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
  project_folder_settings_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "folder_environmental_adjustment" */
export type Folder_Environmental_Adjustment_Max_Order_By = {
  cvss_environmental_adjustment_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_folder_settings_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "folder_environmental_adjustment" */
export type Folder_Environmental_Adjustment_Min_Order_By = {
  cvss_environmental_adjustment_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_folder_settings_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "folder_environmental_adjustment". */
export type Folder_Environmental_Adjustment_Order_By = {
  cvss_environmental_adjustment?: InputMaybe<Cvss_Environmental_Adjustment_Order_By>;
  cvss_environmental_adjustment_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_folder_setting?: InputMaybe<Project_Folder_Settings_Order_By>;
  project_folder_settings_id?: InputMaybe<Order_By>;
};

/** select columns of table "folder_environmental_adjustment" */
export enum Folder_Environmental_Adjustment_Select_Column {
  /** column name */
  CvssEnvironmentalAdjustmentId = 'cvss_environmental_adjustment_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectFolderSettingsId = 'project_folder_settings_id'
}

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
  guide?: InputMaybe<Guides_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  parent_guide?: InputMaybe<Guides_Bool_Exp>;
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
  guide?: InputMaybe<Guides_Order_By>;
  id?: InputMaybe<Order_By>;
  parent_guide?: InputMaybe<Guides_Order_By>;
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
  guide?: InputMaybe<Guides_Bool_Exp>;
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
  guide?: InputMaybe<Guides_Order_By>;
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

/** append existing jsonb value of filtered columns with new jsonb value */
export type Guides_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  /** data from the rows affected by the mutation */
  returning: Array<Guides>;
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

/** primary key columns input for table: guides */
export type Guides_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Guides_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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

/**
 * DEPRECATED:
 * direct dependencies are now regular items in the merkel tree
 *
 * direct dependencies of builds with pointers to their location in the merkel tree table
 */
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


/**
 * DEPRECATED:
 * direct dependencies are now regular items in the merkel tree
 *
 * direct dependencies of builds with pointers to their location in the merkel tree table
 */
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
  /** An array relationship */
  analysis_results: Array<Analysis_Manifest_Dependency_Edge_Result>;
  /** An object relationship */
  child: Manifest_Dependency_Node;
  child_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  parent: Manifest_Dependency_Node;
  parent_id: Scalars['uuid'];
};


/** columns and relationships of "manifest_dependency_edge" */
export type Manifest_Dependency_EdgeAnalysis_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
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
  analysis_results?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
  child?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  child_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Constraint {
  /** unique or primary key constraint on columns "child_id", "parent_id" */
  ManifestDependencyEdgeParentIdChildIdIdx = 'manifest_dependency_edge_parent_id_child_id_idx',
  /** unique or primary key constraint on columns "id" */
  ManifestDependencyEdgePkey = 'manifest_dependency_edge_pkey'
}

/** input type for inserting data into table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Insert_Input = {
  analysis_results?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Arr_Rel_Insert_Input>;
  child?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
  child_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  parent?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Max_Order_By = {
  child_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Min_Order_By = {
  child_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
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

/** input type for inserting object relation for remote table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Obj_Rel_Insert_Input = {
  data: Manifest_Dependency_Edge_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Manifest_Dependency_Edge_On_Conflict>;
};

/** on_conflict condition type for table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_On_Conflict = {
  constraint: Manifest_Dependency_Edge_Constraint;
  update_columns?: Array<Manifest_Dependency_Edge_Update_Column>;
  where?: InputMaybe<Manifest_Dependency_Edge_Bool_Exp>;
};

/** Ordering options when selecting data from "manifest_dependency_edge". */
export type Manifest_Dependency_Edge_Order_By = {
  analysis_results_aggregate?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Aggregate_Order_By>;
  child?: InputMaybe<Manifest_Dependency_Node_Order_By>;
  child_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent?: InputMaybe<Manifest_Dependency_Node_Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: manifest_dependency_edge */
export type Manifest_Dependency_Edge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Select_Column {
  /** column name */
  ChildId = 'child_id',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parent_id'
}

/** input type for updating data in table "manifest_dependency_edge" */
export type Manifest_Dependency_Edge_Set_Input = {
  child_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  parent_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "manifest_dependency_edge" */
export enum Manifest_Dependency_Edge_Update_Column {
  /** column name */
  ChildId = 'child_id',
  /** column name */
  Id = 'id',
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

/** DEPRECATED. Use public.resolved_manifest */
export type Manifests = {
  __typename?: 'manifests';
  /** An object relationship */
  build?: Maybe<Builds>;
  build_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamptz'];
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  /** insert data into the table: "analysis.manifest_dependency_edge_result" */
  insert_analysis_manifest_dependency_edge_result?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Mutation_Response>;
  /** insert data into the table: "analysis.manifest_dependency_edge_result_location" */
  insert_analysis_manifest_dependency_edge_result_location?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location_Mutation_Response>;
  /** insert a single row into the table: "analysis.manifest_dependency_edge_result_location" */
  insert_analysis_manifest_dependency_edge_result_location_one?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location>;
  /** insert a single row into the table: "analysis.manifest_dependency_edge_result" */
  insert_analysis_manifest_dependency_edge_result_one?: Maybe<Analysis_Manifest_Dependency_Edge_Result>;
  /** insert data into the table: "build_dependency_relationship" */
  insert_build_dependency_relationship?: Maybe<Build_Dependency_Relationship_Mutation_Response>;
  /** insert a single row into the table: "build_dependency_relationship" */
  insert_build_dependency_relationship_one?: Maybe<Build_Dependency_Relationship>;
  /** insert data into the table: "build_log" */
  insert_build_log?: Maybe<Build_Log_Mutation_Response>;
  /** insert a single row into the table: "build_log" */
  insert_build_log_one?: Maybe<Build_Log>;
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
  /** insert a single row into the table: "guides" */
  insert_guides_one?: Maybe<Guides>;
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
  /** insert data into the table: "vulnerability.cwe" */
  insert_vulnerability_cwe?: Maybe<Vulnerability_Cwe_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.cwe" */
  insert_vulnerability_cwe_one?: Maybe<Vulnerability_Cwe>;
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
  /** insert data into the table: "vulnerability.vulnerability_cwe" */
  insert_vulnerability_vulnerability_cwe?: Maybe<Vulnerability_Vulnerability_Cwe_Mutation_Response>;
  /** insert a single row into the table: "vulnerability.vulnerability_cwe" */
  insert_vulnerability_vulnerability_cwe_one?: Maybe<Vulnerability_Vulnerability_Cwe>;
  /** insert data into the table: "webhook_cache" */
  insert_webhook_cache?: Maybe<Webhook_Cache_Mutation_Response>;
  /** insert a single row into the table: "webhook_cache" */
  insert_webhook_cache_one?: Maybe<Webhook_Cache>;
  installSelectedRepos?: Maybe<InstallSelectedReposResponse>;
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
  /** update data of the table: "analysis.manifest_dependency_edge_result" */
  update_analysis_manifest_dependency_edge_result?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Mutation_Response>;
  /** update single row of the table: "analysis.manifest_dependency_edge_result" */
  update_analysis_manifest_dependency_edge_result_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result>;
  /** update data of the table: "analysis.manifest_dependency_edge_result_location" */
  update_analysis_manifest_dependency_edge_result_location?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location_Mutation_Response>;
  /** update single row of the table: "analysis.manifest_dependency_edge_result_location" */
  update_analysis_manifest_dependency_edge_result_location_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location>;
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
  /** update single row of the table: "guides" */
  update_guides_by_pk?: Maybe<Guides>;
  /** update data of the table: "manifest_dependency" */
  update_manifest_dependency?: Maybe<Manifest_Dependency_Mutation_Response>;
  /** update data of the table: "manifest_dependency_edge" */
  update_manifest_dependency_edge?: Maybe<Manifest_Dependency_Edge_Mutation_Response>;
  /** update single row of the table: "manifest_dependency_edge" */
  update_manifest_dependency_edge_by_pk?: Maybe<Manifest_Dependency_Edge>;
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
  /** update data of the table: "vulnerability.cwe" */
  update_vulnerability_cwe?: Maybe<Vulnerability_Cwe_Mutation_Response>;
  /** update single row of the table: "vulnerability.cwe" */
  update_vulnerability_cwe_by_pk?: Maybe<Vulnerability_Cwe>;
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
  /** update data of the table: "vulnerability.vulnerability_cwe" */
  update_vulnerability_vulnerability_cwe?: Maybe<Vulnerability_Vulnerability_Cwe_Mutation_Response>;
  /** update single row of the table: "vulnerability.vulnerability_cwe" */
  update_vulnerability_vulnerability_cwe_by_pk?: Maybe<Vulnerability_Vulnerability_Cwe>;
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
export type Mutation_RootInsert_Analysis_Manifest_Dependency_Edge_ResultArgs = {
  objects: Array<Analysis_Manifest_Dependency_Edge_Result_Insert_Input>;
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Analysis_Manifest_Dependency_Edge_Result_LocationArgs = {
  objects: Array<Analysis_Manifest_Dependency_Edge_Result_Location_Insert_Input>;
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Analysis_Manifest_Dependency_Edge_Result_Location_OneArgs = {
  object: Analysis_Manifest_Dependency_Edge_Result_Location_Insert_Input;
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Analysis_Manifest_Dependency_Edge_Result_OneArgs = {
  object: Analysis_Manifest_Dependency_Edge_Result_Insert_Input;
  on_conflict?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_On_Conflict>;
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
export type Mutation_RootInsert_Build_LogArgs = {
  objects: Array<Build_Log_Insert_Input>;
  on_conflict?: InputMaybe<Build_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Build_Log_OneArgs = {
  object: Build_Log_Insert_Input;
  on_conflict?: InputMaybe<Build_Log_On_Conflict>;
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
export type Mutation_RootInsert_Guides_OneArgs = {
  object: Guides_Insert_Input;
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
export type Mutation_RootInsert_Vulnerability_CweArgs = {
  objects: Array<Vulnerability_Cwe_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Cwe_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Cwe_OneArgs = {
  object: Vulnerability_Cwe_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Cwe_On_Conflict>;
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
export type Mutation_RootInsert_Vulnerability_Vulnerability_CweArgs = {
  objects: Array<Vulnerability_Vulnerability_Cwe_Insert_Input>;
  on_conflict?: InputMaybe<Vulnerability_Vulnerability_Cwe_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vulnerability_Vulnerability_Cwe_OneArgs = {
  object: Vulnerability_Vulnerability_Cwe_Insert_Input;
  on_conflict?: InputMaybe<Vulnerability_Vulnerability_Cwe_On_Conflict>;
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
export type Mutation_RootInstallSelectedReposArgs = {
  orgs: Array<OrgsWithReposInput>;
};


/** mutation root */
export type Mutation_RootPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootUpdate_Analysis_Manifest_Dependency_Edge_ResultArgs = {
  _append?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Append_Input>;
  _delete_at_path?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_Key_Input>;
  _inc?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Inc_Input>;
  _prepend?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Prepend_Input>;
  _set?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Set_Input>;
  where: Analysis_Manifest_Dependency_Edge_Result_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Analysis_Manifest_Dependency_Edge_Result_By_PkArgs = {
  _append?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Append_Input>;
  _delete_at_path?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Delete_Key_Input>;
  _inc?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Inc_Input>;
  _prepend?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Prepend_Input>;
  _set?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Set_Input>;
  pk_columns: Analysis_Manifest_Dependency_Edge_Result_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Analysis_Manifest_Dependency_Edge_Result_LocationArgs = {
  _inc?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Inc_Input>;
  _set?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Set_Input>;
  where: Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Analysis_Manifest_Dependency_Edge_Result_Location_By_PkArgs = {
  _inc?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Inc_Input>;
  _set?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Set_Input>;
  pk_columns: Analysis_Manifest_Dependency_Edge_Result_Location_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Guides_By_PkArgs = {
  _append?: InputMaybe<Guides_Append_Input>;
  _delete_at_path?: InputMaybe<Guides_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Guides_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Guides_Delete_Key_Input>;
  _inc?: InputMaybe<Guides_Inc_Input>;
  _prepend?: InputMaybe<Guides_Prepend_Input>;
  _set?: InputMaybe<Guides_Set_Input>;
  pk_columns: Guides_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Manifest_Dependency_Edge_By_PkArgs = {
  _set?: InputMaybe<Manifest_Dependency_Edge_Set_Input>;
  pk_columns: Manifest_Dependency_Edge_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Vulnerability_CweArgs = {
  _inc?: InputMaybe<Vulnerability_Cwe_Inc_Input>;
  _set?: InputMaybe<Vulnerability_Cwe_Set_Input>;
  where: Vulnerability_Cwe_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Cwe_By_PkArgs = {
  _inc?: InputMaybe<Vulnerability_Cwe_Inc_Input>;
  _set?: InputMaybe<Vulnerability_Cwe_Set_Input>;
  pk_columns: Vulnerability_Cwe_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Vulnerability_Vulnerability_CweArgs = {
  _inc?: InputMaybe<Vulnerability_Vulnerability_Cwe_Inc_Input>;
  _set?: InputMaybe<Vulnerability_Vulnerability_Cwe_Set_Input>;
  where: Vulnerability_Vulnerability_Cwe_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vulnerability_Vulnerability_Cwe_By_PkArgs = {
  _inc?: InputMaybe<Vulnerability_Vulnerability_Cwe_Inc_Input>;
  _set?: InputMaybe<Vulnerability_Vulnerability_Cwe_Set_Input>;
  pk_columns: Vulnerability_Vulnerability_Cwe_Pk_Columns_Input;
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
  createdAt: Scalars['timestamptz'];
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
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  createdAt?: InputMaybe<Scalars['timestamptz']>;
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
  createdAt?: Maybe<Scalars['timestamptz']>;
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
  createdAt?: Maybe<Scalars['timestamptz']>;
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
  createdAt?: InputMaybe<Scalars['timestamptz']>;
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
  dependency_release_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  is_dev: Scalars['Boolean'];
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
  dependency_release_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_dev?: InputMaybe<Boolean_Comparison_Exp>;
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
  dependency_release_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_dev?: InputMaybe<Scalars['Boolean']>;
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
  dependency_release_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_dev?: InputMaybe<Order_By>;
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
  IsDev = 'is_dev',
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
  is_dev?: InputMaybe<Scalars['Boolean']>;
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
  IsDev = 'is_dev',
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

/** columns and relationships of "project_folder_settings" */
export type Project_Folder_Settings = {
  __typename?: 'project_folder_settings';
  /** An array relationship */
  folder_environmental_adjustments: Array<Folder_Environmental_Adjustment>;
  id: Scalars['uuid'];
  ignore?: Maybe<Scalars['Boolean']>;
  path_glob: Scalars['String'];
  /** Lower values have a higher precedence, one being the highest */
  precedence?: Maybe<Scalars['Int']>;
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  root: Scalars['Boolean'];
};


/** columns and relationships of "project_folder_settings" */
export type Project_Folder_SettingsFolder_Environmental_AdjustmentsArgs = {
  distinct_on?: InputMaybe<Array<Folder_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Folder_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
};

/** order by aggregate values of table "project_folder_settings" */
export type Project_Folder_Settings_Aggregate_Order_By = {
  avg?: InputMaybe<Project_Folder_Settings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Folder_Settings_Max_Order_By>;
  min?: InputMaybe<Project_Folder_Settings_Min_Order_By>;
  stddev?: InputMaybe<Project_Folder_Settings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Project_Folder_Settings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Project_Folder_Settings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Project_Folder_Settings_Sum_Order_By>;
  var_pop?: InputMaybe<Project_Folder_Settings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Project_Folder_Settings_Var_Samp_Order_By>;
  variance?: InputMaybe<Project_Folder_Settings_Variance_Order_By>;
};

/** order by avg() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Avg_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "project_folder_settings". All fields are combined with a logical 'AND'. */
export type Project_Folder_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Folder_Settings_Bool_Exp>>;
  _not?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Folder_Settings_Bool_Exp>>;
  folder_environmental_adjustments?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ignore?: InputMaybe<Boolean_Comparison_Exp>;
  path_glob?: InputMaybe<String_Comparison_Exp>;
  precedence?: InputMaybe<Int_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  root?: InputMaybe<Boolean_Comparison_Exp>;
};

/** order by max() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  path_glob?: InputMaybe<Order_By>;
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  path_glob?: InputMaybe<Order_By>;
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "project_folder_settings". */
export type Project_Folder_Settings_Order_By = {
  folder_environmental_adjustments_aggregate?: InputMaybe<Folder_Environmental_Adjustment_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  ignore?: InputMaybe<Order_By>;
  path_glob?: InputMaybe<Order_By>;
  precedence?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
};

/** select columns of table "project_folder_settings" */
export enum Project_Folder_Settings_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Ignore = 'ignore',
  /** column name */
  PathGlob = 'path_glob',
  /** column name */
  Precedence = 'precedence',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Root = 'root'
}

/** order by stddev() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Stddev_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Stddev_Pop_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Stddev_Samp_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Sum_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Var_Pop_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Var_Samp_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "project_folder_settings" */
export type Project_Folder_Settings_Variance_Order_By = {
  /** Lower values have a higher precedence, one being the highest */
  precedence?: InputMaybe<Order_By>;
};

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  created_at: Scalars['timestamptz'];
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
  /** An array relationship */
  project_folder_settings: Array<Project_Folder_Settings>;
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
export type ProjectsProject_Folder_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Project_Folder_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Folder_Settings_Order_By>>;
  where?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  project_folder_settings?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  created_at?: Maybe<Scalars['timestamptz']>;
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
  project_folder_settings_aggregate?: InputMaybe<Project_Folder_Settings_Aggregate_Order_By>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  /** fetch data from the table: "analysis.manifest_dependency_edge_result" */
  analysis_manifest_dependency_edge_result: Array<Analysis_Manifest_Dependency_Edge_Result>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result" using primary key columns */
  analysis_manifest_dependency_edge_result_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result_location" */
  analysis_manifest_dependency_edge_result_location: Array<Analysis_Manifest_Dependency_Edge_Result_Location>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result_location" using primary key columns */
  analysis_manifest_dependency_edge_result_location_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location>;
  authenticatedRepoCloneUrl?: Maybe<AuthenticatedRepoCloneUrlOutput>;
  availableOrgsWithRepos?: Maybe<Array<OrgWithRepos>>;
  /** fetch data from the table: "build_dependency_relationship" */
  build_dependency_relationship: Array<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_dependency_relationship" using primary key columns */
  build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_log" */
  build_log: Array<Build_Log>;
  /** fetch data from the table: "build_log" using primary key columns */
  build_log_by_pk?: Maybe<Build_Log>;
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** fetch data from the table: "cvss_environmental_adjustment" */
  cvss_environmental_adjustment: Array<Cvss_Environmental_Adjustment>;
  /** fetch data from the table: "cvss_environmental_adjustment" using primary key columns */
  cvss_environmental_adjustment_by_pk?: Maybe<Cvss_Environmental_Adjustment>;
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  fakeQueryToHackHasuraBeingABuggyMess?: Maybe<Scalars['String']>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "folder_environmental_adjustment" */
  folder_environmental_adjustment: Array<Folder_Environmental_Adjustment>;
  /** fetch data from the table: "folder_environmental_adjustment" using primary key columns */
  folder_environmental_adjustment_by_pk?: Maybe<Folder_Environmental_Adjustment>;
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
  /** fetch data from the table: "manifest_dependency_edge" using primary key columns */
  manifest_dependency_edge_by_pk?: Maybe<Manifest_Dependency_Edge>;
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
  /**  get s3 presigned url for manifest upload, used by the CLI  */
  presignSbomUpload?: Maybe<SbomUploadUrlOutput>;
  /** An array relationship */
  project_access_tokens: Array<Project_Access_Tokens>;
  /** fetch data from the table: "project_access_tokens" using primary key columns */
  project_access_tokens_by_pk?: Maybe<Project_Access_Tokens>;
  /** An array relationship */
  project_folder_settings: Array<Project_Folder_Settings>;
  /** fetch data from the table: "project_folder_settings" using primary key columns */
  project_folder_settings_by_pk?: Maybe<Project_Folder_Settings>;
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
  /** fetch data from the table: "vulnerability.cwe" */
  vulnerability_cwe: Array<Vulnerability_Cwe>;
  /** fetch data from the table: "vulnerability.cwe" using primary key columns */
  vulnerability_cwe_by_pk?: Maybe<Vulnerability_Cwe>;
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
  /** fetch data from the table: "vulnerability.vulnerability_cwe" */
  vulnerability_vulnerability_cwe: Array<Vulnerability_Vulnerability_Cwe>;
  /** fetch data from the table: "vulnerability.vulnerability_cwe" using primary key columns */
  vulnerability_vulnerability_cwe_by_pk?: Maybe<Vulnerability_Vulnerability_Cwe>;
  vulnerableReleasesFromBuild?: Maybe<Array<BuildData_VulnerableRelease>>;
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
};


export type Query_RootAnalysis_Manifest_Dependency_Edge_ResultArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
};


export type Query_RootAnalysis_Manifest_Dependency_Edge_Result_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAnalysis_Manifest_Dependency_Edge_Result_LocationArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
};


export type Query_RootAnalysis_Manifest_Dependency_Edge_Result_Location_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Query_RootBuild_LogArgs = {
  distinct_on?: InputMaybe<Array<Build_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Log_Order_By>>;
  where?: InputMaybe<Build_Log_Bool_Exp>;
};


export type Query_RootBuild_Log_By_PkArgs = {
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


export type Query_RootCvss_Environmental_AdjustmentArgs = {
  distinct_on?: InputMaybe<Array<Cvss_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cvss_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Cvss_Environmental_Adjustment_Bool_Exp>;
};


export type Query_RootCvss_Environmental_Adjustment_By_PkArgs = {
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


export type Query_RootFolder_Environmental_AdjustmentArgs = {
  distinct_on?: InputMaybe<Array<Folder_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Folder_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
};


export type Query_RootFolder_Environmental_Adjustment_By_PkArgs = {
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


export type Query_RootManifest_Dependency_Edge_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Query_RootProject_Folder_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Project_Folder_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Folder_Settings_Order_By>>;
  where?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
};


export type Query_RootProject_Folder_Settings_By_PkArgs = {
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


export type Query_RootVulnerability_CweArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Cwe_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Cwe_Order_By>>;
  where?: InputMaybe<Vulnerability_Cwe_Bool_Exp>;
};


export type Query_RootVulnerability_Cwe_By_PkArgs = {
  id: Scalars['Int'];
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


export type Query_RootVulnerability_Vulnerability_CweArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Order_By>>;
  where?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
};


export type Query_RootVulnerability_Vulnerability_Cwe_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVulnerableReleasesFromBuildArgs = {
  buildId: Scalars['uuid'];
  minimumSeverity?: InputMaybe<Scalars['String']>;
  previewChains?: InputMaybe<Scalars['Boolean']>;
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
  /** An object relationship */
  manifest_dependency_node?: Maybe<Manifest_Dependency_Node>;
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
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Bool_Exp>;
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
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Obj_Rel_Insert_Input>;
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
  manifest_dependency_node?: InputMaybe<Manifest_Dependency_Node_Order_By>;
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
  created_at: Scalars['timestamptz'];
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  created_at: Scalars['timestamptz'];
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  /** fetch data from the table: "analysis.manifest_dependency_edge_result" */
  analysis_manifest_dependency_edge_result: Array<Analysis_Manifest_Dependency_Edge_Result>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result" using primary key columns */
  analysis_manifest_dependency_edge_result_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result_location" */
  analysis_manifest_dependency_edge_result_location: Array<Analysis_Manifest_Dependency_Edge_Result_Location>;
  /** fetch data from the table: "analysis.manifest_dependency_edge_result_location" using primary key columns */
  analysis_manifest_dependency_edge_result_location_by_pk?: Maybe<Analysis_Manifest_Dependency_Edge_Result_Location>;
  /** fetch data from the table: "build_dependency_relationship" */
  build_dependency_relationship: Array<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_dependency_relationship" using primary key columns */
  build_dependency_relationship_by_pk?: Maybe<Build_Dependency_Relationship>;
  /** fetch data from the table: "build_log" */
  build_log: Array<Build_Log>;
  /** fetch data from the table: "build_log" using primary key columns */
  build_log_by_pk?: Maybe<Build_Log>;
  /** An array relationship */
  builds: Array<Builds>;
  /** An aggregate relationship */
  builds_aggregate: Builds_Aggregate;
  /** fetch data from the table: "builds" using primary key columns */
  builds_by_pk?: Maybe<Builds>;
  /** fetch data from the table: "cvss_environmental_adjustment" */
  cvss_environmental_adjustment: Array<Cvss_Environmental_Adjustment>;
  /** fetch data from the table: "cvss_environmental_adjustment" using primary key columns */
  cvss_environmental_adjustment_by_pk?: Maybe<Cvss_Environmental_Adjustment>;
  /** An array relationship */
  default_branch_builds: Array<Default_Branch_Builds>;
  /** An array relationship */
  findings: Array<Findings>;
  /** fetch data from the table: "findings" using primary key columns */
  findings_by_pk?: Maybe<Findings>;
  /** fetch data from the table: "folder_environmental_adjustment" */
  folder_environmental_adjustment: Array<Folder_Environmental_Adjustment>;
  /** fetch data from the table: "folder_environmental_adjustment" using primary key columns */
  folder_environmental_adjustment_by_pk?: Maybe<Folder_Environmental_Adjustment>;
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
  /** fetch data from the table: "manifest_dependency_edge" using primary key columns */
  manifest_dependency_edge_by_pk?: Maybe<Manifest_Dependency_Edge>;
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
  project_folder_settings: Array<Project_Folder_Settings>;
  /** fetch data from the table: "project_folder_settings" using primary key columns */
  project_folder_settings_by_pk?: Maybe<Project_Folder_Settings>;
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
  /** fetch data from the table: "vulnerability.cwe" */
  vulnerability_cwe: Array<Vulnerability_Cwe>;
  /** fetch data from the table: "vulnerability.cwe" using primary key columns */
  vulnerability_cwe_by_pk?: Maybe<Vulnerability_Cwe>;
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
  /** fetch data from the table: "vulnerability.vulnerability_cwe" */
  vulnerability_vulnerability_cwe: Array<Vulnerability_Vulnerability_Cwe>;
  /** fetch data from the table: "vulnerability.vulnerability_cwe" using primary key columns */
  vulnerability_vulnerability_cwe_by_pk?: Maybe<Vulnerability_Vulnerability_Cwe>;
  /** fetch data from the table: "webhook_cache" */
  webhook_cache: Array<Webhook_Cache>;
  /** fetch data from the table: "webhook_cache" using primary key columns */
  webhook_cache_by_pk?: Maybe<Webhook_Cache>;
};


export type Subscription_RootAnalysis_Manifest_Dependency_Edge_ResultArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
};


export type Subscription_RootAnalysis_Manifest_Dependency_Edge_Result_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAnalysis_Manifest_Dependency_Edge_Result_LocationArgs = {
  distinct_on?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Analysis_Manifest_Dependency_Edge_Result_Location_Order_By>>;
  where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Location_Bool_Exp>;
};


export type Subscription_RootAnalysis_Manifest_Dependency_Edge_Result_Location_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Subscription_RootBuild_LogArgs = {
  distinct_on?: InputMaybe<Array<Build_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Build_Log_Order_By>>;
  where?: InputMaybe<Build_Log_Bool_Exp>;
};


export type Subscription_RootBuild_Log_By_PkArgs = {
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


export type Subscription_RootCvss_Environmental_AdjustmentArgs = {
  distinct_on?: InputMaybe<Array<Cvss_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cvss_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Cvss_Environmental_Adjustment_Bool_Exp>;
};


export type Subscription_RootCvss_Environmental_Adjustment_By_PkArgs = {
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


export type Subscription_RootFolder_Environmental_AdjustmentArgs = {
  distinct_on?: InputMaybe<Array<Folder_Environmental_Adjustment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Folder_Environmental_Adjustment_Order_By>>;
  where?: InputMaybe<Folder_Environmental_Adjustment_Bool_Exp>;
};


export type Subscription_RootFolder_Environmental_Adjustment_By_PkArgs = {
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


export type Subscription_RootManifest_Dependency_Edge_By_PkArgs = {
  id: Scalars['uuid'];
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


export type Subscription_RootProject_Folder_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Project_Folder_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Folder_Settings_Order_By>>;
  where?: InputMaybe<Project_Folder_Settings_Bool_Exp>;
};


export type Subscription_RootProject_Folder_Settings_By_PkArgs = {
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


export type Subscription_RootVulnerability_CweArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Cwe_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Cwe_Order_By>>;
  where?: InputMaybe<Vulnerability_Cwe_Bool_Exp>;
};


export type Subscription_RootVulnerability_Cwe_By_PkArgs = {
  id: Scalars['Int'];
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


export type Subscription_RootVulnerability_Vulnerability_CweArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Order_By>>;
  where?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
};


export type Subscription_RootVulnerability_Vulnerability_Cwe_By_PkArgs = {
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
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  credits: Array<Vulnerability_Credit>;
  cvss_score?: Maybe<Scalars['Float']>;
  /** An array relationship */
  cwes: Array<Vulnerability_Vulnerability_Cwe>;
  database_specific?: Maybe<Scalars['jsonb']>;
  details?: Maybe<Scalars['String']>;
  epss_percentile?: Maybe<Scalars['Float']>;
  epss_score?: Maybe<Scalars['Float']>;
  /** An array relationship */
  equivalents: Array<Vulnerability_Equivalent>;
  /** An array relationship */
  findings: Array<Findings>;
  /** An array relationship */
  guide_vulnerabilities: Array<Guide_Vulnerabilities>;
  id: Scalars['uuid'];
  /** An array relationship */
  ignored_vulnerabilities: Array<Ignored_Vulnerabilities>;
  last_fetched?: Maybe<Scalars['timestamptz']>;
  modified: Scalars['timestamptz'];
  published?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  references: Array<Vulnerability_Reference>;
  reviewed_by_source?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  severities: Array<Vulnerability_Severity>;
  severity_name?: Maybe<Scalars['severity_enum']>;
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
export type VulnerabilityCwesArgs = {
  distinct_on?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Order_By>>;
  where?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  credits?: InputMaybe<Vulnerability_Credit_Bool_Exp>;
  cvss_score?: InputMaybe<Float_Comparison_Exp>;
  cwes?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
  database_specific?: InputMaybe<Jsonb_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  epss_percentile?: InputMaybe<Float_Comparison_Exp>;
  epss_score?: InputMaybe<Float_Comparison_Exp>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Bool_Exp>;
  findings?: InputMaybe<Findings_Bool_Exp>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ignored_vulnerabilities?: InputMaybe<Ignored_Vulnerabilities_Bool_Exp>;
  last_fetched?: InputMaybe<Timestamptz_Comparison_Exp>;
  modified?: InputMaybe<Timestamptz_Comparison_Exp>;
  published?: InputMaybe<Timestamptz_Comparison_Exp>;
  references?: InputMaybe<Vulnerability_Reference_Bool_Exp>;
  reviewed_by_source?: InputMaybe<Boolean_Comparison_Exp>;
  severities?: InputMaybe<Vulnerability_Severity_Bool_Exp>;
  severity_name?: InputMaybe<Severity_Enum_Comparison_Exp>;
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

/** Common Weakness Enumeration's as defined by Mitre (https://cwe.mitre.org/data/definitions/699.html) */
export type Vulnerability_Cwe = {
  __typename?: 'vulnerability_cwe';
  common_name?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  extended_description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "vulnerability.cwe". All fields are combined with a logical 'AND'. */
export type Vulnerability_Cwe_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Cwe_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Cwe_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Cwe_Bool_Exp>>;
  common_name?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  extended_description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.cwe" */
export enum Vulnerability_Cwe_Constraint {
  /** unique or primary key constraint on columns "id" */
  CwePkey = 'cwe_pkey'
}

/** input type for incrementing numeric columns in table "vulnerability.cwe" */
export type Vulnerability_Cwe_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "vulnerability.cwe" */
export type Vulnerability_Cwe_Insert_Input = {
  common_name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extended_description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "vulnerability.cwe" */
export type Vulnerability_Cwe_Mutation_Response = {
  __typename?: 'vulnerability_cwe_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Cwe>;
};

/** input type for inserting object relation for remote table "vulnerability.cwe" */
export type Vulnerability_Cwe_Obj_Rel_Insert_Input = {
  data: Vulnerability_Cwe_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Cwe_On_Conflict>;
};

/** on_conflict condition type for table "vulnerability.cwe" */
export type Vulnerability_Cwe_On_Conflict = {
  constraint: Vulnerability_Cwe_Constraint;
  update_columns?: Array<Vulnerability_Cwe_Update_Column>;
  where?: InputMaybe<Vulnerability_Cwe_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.cwe". */
export type Vulnerability_Cwe_Order_By = {
  common_name?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  extended_description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_cwe */
export type Vulnerability_Cwe_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "vulnerability.cwe" */
export enum Vulnerability_Cwe_Select_Column {
  /** column name */
  CommonName = 'common_name',
  /** column name */
  Description = 'description',
  /** column name */
  ExtendedDescription = 'extended_description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "vulnerability.cwe" */
export type Vulnerability_Cwe_Set_Input = {
  common_name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extended_description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "vulnerability.cwe" */
export enum Vulnerability_Cwe_Update_Column {
  /** column name */
  CommonName = 'common_name',
  /** column name */
  Description = 'description',
  /** column name */
  ExtendedDescription = 'extended_description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
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
  epss_percentile?: InputMaybe<Scalars['Float']>;
  epss_score?: InputMaybe<Scalars['Float']>;
};

/** input type for inserting data into table "vulnerability.vulnerability" */
export type Vulnerability_Insert_Input = {
  affected?: InputMaybe<Vulnerability_Affected_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  credits?: InputMaybe<Vulnerability_Credit_Arr_Rel_Insert_Input>;
  cvss_score?: InputMaybe<Scalars['Float']>;
  cwes?: InputMaybe<Vulnerability_Vulnerability_Cwe_Arr_Rel_Insert_Input>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  epss_percentile?: InputMaybe<Scalars['Float']>;
  epss_score?: InputMaybe<Scalars['Float']>;
  equivalents?: InputMaybe<Vulnerability_Equivalent_Arr_Rel_Insert_Input>;
  findings?: InputMaybe<Findings_Arr_Rel_Insert_Input>;
  guide_vulnerabilities?: InputMaybe<Guide_Vulnerabilities_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  last_fetched?: InputMaybe<Scalars['timestamptz']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  references?: InputMaybe<Vulnerability_Reference_Arr_Rel_Insert_Input>;
  reviewed_by_source?: InputMaybe<Scalars['Boolean']>;
  severities?: InputMaybe<Vulnerability_Severity_Arr_Rel_Insert_Input>;
  severity_name?: InputMaybe<Scalars['severity_enum']>;
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
  created_at?: InputMaybe<Order_By>;
  credits_aggregate?: InputMaybe<Vulnerability_Credit_Aggregate_Order_By>;
  cvss_score?: InputMaybe<Order_By>;
  cwes_aggregate?: InputMaybe<Vulnerability_Vulnerability_Cwe_Aggregate_Order_By>;
  database_specific?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  epss_percentile?: InputMaybe<Order_By>;
  epss_score?: InputMaybe<Order_By>;
  equivalents_aggregate?: InputMaybe<Vulnerability_Equivalent_Aggregate_Order_By>;
  findings_aggregate?: InputMaybe<Findings_Aggregate_Order_By>;
  guide_vulnerabilities_aggregate?: InputMaybe<Guide_Vulnerabilities_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  ignored_vulnerabilities_aggregate?: InputMaybe<Ignored_Vulnerabilities_Aggregate_Order_By>;
  last_fetched?: InputMaybe<Order_By>;
  modified?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  references_aggregate?: InputMaybe<Vulnerability_Reference_Aggregate_Order_By>;
  reviewed_by_source?: InputMaybe<Order_By>;
  severities_aggregate?: InputMaybe<Vulnerability_Severity_Aggregate_Order_By>;
  severity_name?: InputMaybe<Order_By>;
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
  CreatedAt = 'created_at',
  /** column name */
  CvssScore = 'cvss_score',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Details = 'details',
  /** column name */
  EpssPercentile = 'epss_percentile',
  /** column name */
  EpssScore = 'epss_score',
  /** column name */
  Id = 'id',
  /** column name */
  LastFetched = 'last_fetched',
  /** column name */
  Modified = 'modified',
  /** column name */
  Published = 'published',
  /** column name */
  ReviewedBySource = 'reviewed_by_source',
  /** column name */
  SeverityName = 'severity_name',
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
  cvss_score?: InputMaybe<Scalars['Float']>;
  database_specific?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['String']>;
  epss_percentile?: InputMaybe<Scalars['Float']>;
  epss_score?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_fetched?: InputMaybe<Scalars['timestamptz']>;
  modified?: InputMaybe<Scalars['timestamptz']>;
  published?: InputMaybe<Scalars['timestamptz']>;
  reviewed_by_source?: InputMaybe<Scalars['Boolean']>;
  severity_name?: InputMaybe<Scalars['severity_enum']>;
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
  CreatedAt = 'created_at',
  /** column name */
  CvssScore = 'cvss_score',
  /** column name */
  DatabaseSpecific = 'database_specific',
  /** column name */
  Details = 'details',
  /** column name */
  EpssPercentile = 'epss_percentile',
  /** column name */
  EpssScore = 'epss_score',
  /** column name */
  Id = 'id',
  /** column name */
  LastFetched = 'last_fetched',
  /** column name */
  Modified = 'modified',
  /** column name */
  Published = 'published',
  /** column name */
  ReviewedBySource = 'reviewed_by_source',
  /** column name */
  SeverityName = 'severity_name',
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

/** CWEs that are defined for a vulnerability */
export type Vulnerability_Vulnerability_Cwe = {
  __typename?: 'vulnerability_vulnerability_cwe';
  /** An object relationship */
  cwe: Vulnerability_Cwe;
  cwe_id: Scalars['Int'];
  id: Scalars['uuid'];
  /** An object relationship */
  vulnerability: Vulnerability;
  vulnerability_id: Scalars['uuid'];
};

/** order by aggregate values of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Aggregate_Order_By = {
  avg?: InputMaybe<Vulnerability_Vulnerability_Cwe_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vulnerability_Vulnerability_Cwe_Max_Order_By>;
  min?: InputMaybe<Vulnerability_Vulnerability_Cwe_Min_Order_By>;
  stddev?: InputMaybe<Vulnerability_Vulnerability_Cwe_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Vulnerability_Vulnerability_Cwe_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Vulnerability_Vulnerability_Cwe_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Vulnerability_Vulnerability_Cwe_Sum_Order_By>;
  var_pop?: InputMaybe<Vulnerability_Vulnerability_Cwe_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Vulnerability_Vulnerability_Cwe_Var_Samp_Order_By>;
  variance?: InputMaybe<Vulnerability_Vulnerability_Cwe_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Arr_Rel_Insert_Input = {
  data: Array<Vulnerability_Vulnerability_Cwe_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vulnerability_Vulnerability_Cwe_On_Conflict>;
};

/** order by avg() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Avg_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "vulnerability.vulnerability_cwe". All fields are combined with a logical 'AND'. */
export type Vulnerability_Vulnerability_Cwe_Bool_Exp = {
  _and?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Bool_Exp>>;
  _not?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
  _or?: InputMaybe<Array<Vulnerability_Vulnerability_Cwe_Bool_Exp>>;
  cwe?: InputMaybe<Vulnerability_Cwe_Bool_Exp>;
  cwe_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  vulnerability?: InputMaybe<Vulnerability_Bool_Exp>;
  vulnerability_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vulnerability.vulnerability_cwe" */
export enum Vulnerability_Vulnerability_Cwe_Constraint {
  /** unique or primary key constraint on columns "cwe_id", "vulnerability_id" */
  UniqueVulnerabilityCweVulnerabilityIdCweIdKey = 'unique_vulnerability_cwe_vulnerability_id_cwe_id_key',
  /** unique or primary key constraint on columns "id" */
  VulnerabilityCwePkey = 'vulnerability_cwe_pkey'
}

/** input type for incrementing numeric columns in table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Inc_Input = {
  cwe_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Insert_Input = {
  cwe?: InputMaybe<Vulnerability_Cwe_Obj_Rel_Insert_Input>;
  cwe_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  vulnerability?: InputMaybe<Vulnerability_Obj_Rel_Insert_Input>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Max_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Min_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Mutation_Response = {
  __typename?: 'vulnerability_vulnerability_cwe_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vulnerability_Vulnerability_Cwe>;
};

/** on_conflict condition type for table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_On_Conflict = {
  constraint: Vulnerability_Vulnerability_Cwe_Constraint;
  update_columns?: Array<Vulnerability_Vulnerability_Cwe_Update_Column>;
  where?: InputMaybe<Vulnerability_Vulnerability_Cwe_Bool_Exp>;
};

/** Ordering options when selecting data from "vulnerability.vulnerability_cwe". */
export type Vulnerability_Vulnerability_Cwe_Order_By = {
  cwe?: InputMaybe<Vulnerability_Cwe_Order_By>;
  cwe_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vulnerability?: InputMaybe<Vulnerability_Order_By>;
  vulnerability_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vulnerability_vulnerability_cwe */
export type Vulnerability_Vulnerability_Cwe_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vulnerability.vulnerability_cwe" */
export enum Vulnerability_Vulnerability_Cwe_Select_Column {
  /** column name */
  CweId = 'cwe_id',
  /** column name */
  Id = 'id',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** input type for updating data in table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Set_Input = {
  cwe_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  vulnerability_id?: InputMaybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Stddev_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Stddev_Pop_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Stddev_Samp_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Sum_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** update columns of table "vulnerability.vulnerability_cwe" */
export enum Vulnerability_Vulnerability_Cwe_Update_Column {
  /** column name */
  CweId = 'cwe_id',
  /** column name */
  Id = 'id',
  /** column name */
  VulnerabilityId = 'vulnerability_id'
}

/** order by var_pop() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Var_Pop_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Var_Samp_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "vulnerability.vulnerability_cwe" */
export type Vulnerability_Vulnerability_Cwe_Variance_Order_By = {
  cwe_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "webhook_cache" */
export type Webhook_Cache = {
  __typename?: 'webhook_cache';
  created_at: Scalars['timestamptz'];
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
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


export type GetBuildQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', pull_request_id?: string | null, existing_github_review_id?: string | null, existing_github_check_id?: any | null, s3_url?: string | null, git_hash?: string | null, project: { __typename?: 'projects', id: any, name: string, organization?: { __typename?: 'organizations', installation_id?: number | null, name: string } | null, settings: { __typename?: 'settings', pr_feedback_disabled?: boolean | null, pr_check_enabled?: boolean | null } } } | null };

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


export type GetGithubRepositoriesByIdsQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', github_id?: number | null, project: { __typename?: 'projects', id: any } }> };

export type GetLatestBuildsForRescanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestBuildsForRescanQuery = { __typename?: 'query_root', latest_builds: Array<{ __typename?: 'latest_builds', s3_url?: string | null }> };

export type GetManifestDependencyEdgeAnalysisResultQueryVariables = Exact<{
  vulnerability_id: Scalars['uuid'];
  manifest_dependency_edge_id: Scalars['uuid'];
  finding_source_version: Scalars['Int'];
}>;


export type GetManifestDependencyEdgeAnalysisResultQuery = { __typename?: 'query_root', analysis_manifest_dependency_edge_result: Array<{ __typename?: 'analysis_manifest_dependency_edge_result', id: any, finding_type: Analysis_Finding_Type_Enum }> };

export type GetManifestDependencyEdgeChildrenQueryVariables = Exact<{
  ids: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type GetManifestDependencyEdgeChildrenQuery = { __typename?: 'query_root', manifest_dependency_node: Array<{ __typename?: 'manifest_dependency_node', id: any, range: string, labels?: any | null, release_id: any, release: { __typename?: 'package_release', id: any, fetched_time?: any | null, version: string, package: { __typename?: 'package', name: string, last_successful_fetch?: any | null, package_manager: any, affected_by_vulnerability: Array<{ __typename?: 'vulnerability_affected', vulnerability: { __typename?: 'vulnerability', id: any, source_id: string, source: string, severity_name?: any | null, cvss_score?: number | null, summary?: string | null, guide_vulnerabilities: Array<{ __typename?: 'guide_vulnerabilities', guide_id: any, guide: { __typename?: 'guides', summary: string, id: any, title: string } }>, cwes: Array<{ __typename?: 'vulnerability_vulnerability_cwe', id: any, cwe: { __typename?: 'vulnerability_cwe', id: number, name: string, description: string, common_name?: string | null } }> }, ranges: Array<{ __typename?: 'vulnerability_range', introduced?: string | null, fixed?: string | null }> }> } } }> };

export type GetOrganizationFromInstallationIdQueryVariables = Exact<{
  installation_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetOrganizationFromInstallationIdQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any }> };

export type GetOrganizationsFromUserQueryQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetOrganizationsFromUserQueryQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any, installation_id?: number | null, name: string }> };

export type GetPreviousBuildForPrQueryVariables = Exact<{
  pull_request_id: Scalars['String'];
}>;


export type GetPreviousBuildForPrQuery = { __typename?: 'query_root', builds: Array<{ __typename?: 'builds', existing_github_review_id?: string | null }> };

export type GetProjectFromRepoIdQueryVariables = Exact<{
  repo_github_id: Scalars['Int'];
}>;


export type GetProjectFromRepoIdQuery = { __typename?: 'query_root', github_repositories: Array<{ __typename?: 'github_repositories', project: { __typename?: 'projects', id: any } }> };

export type ManifestDependencyEdgeFragment = { __typename?: 'manifest_dependency_edge', id: any, parent_id: any, child_id: any, analysis_results: Array<{ __typename?: 'analysis_manifest_dependency_edge_result', id: any, finding_source_version: number, finding_source: Analysis_Finding_Source_Enum, finding_type: Analysis_Finding_Type_Enum, locations: Array<{ __typename?: 'analysis_manifest_dependency_edge_result_location', id: any, path: string, start_row: number, start_column: number, end_row: number, end_column: number }> }> };

export type GetTreeFromBuildQueryVariables = Exact<{
  build_id: Scalars['uuid'];
  analysis_results_where?: InputMaybe<Analysis_Manifest_Dependency_Edge_Result_Bool_Exp>;
}>;


export type GetTreeFromBuildQuery = { __typename?: 'query_root', builds_by_pk?: { __typename?: 'builds', resolved_manifests: Array<{ __typename?: 'resolved_manifest', id: any, path?: string | null, manifest_dependency_node?: { __typename?: 'manifest_dependency_node', id: any } | null, child_edges_recursive?: Array<{ __typename?: 'manifest_dependency_edge', id: any, parent_id: any, child_id: any, analysis_results: Array<{ __typename?: 'analysis_manifest_dependency_edge_result', id: any, finding_source_version: number, finding_source: Analysis_Finding_Source_Enum, finding_type: Analysis_Finding_Type_Enum, locations: Array<{ __typename?: 'analysis_manifest_dependency_edge_result_location', id: any, path: string, start_row: number, start_column: number, end_row: number, end_column: number }> }> }> | null }>, project: { __typename?: 'projects', name: string, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', id: any, creator_id?: any | null, locations: any, note: string, project_id: any, vulnerability_id: any }> } } | null };

export type GetUserGitHubDataQueryVariables = Exact<{
  kratos_id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetUserGitHubDataQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', github_id?: string | null, github_node_id?: string | null, kratos_id?: any | null, id: any }> };

export type GetUserRoleQueryVariables = Exact<{
  kratos_id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetUserRoleQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', role: any, id: any }> };

export type GetUsersBuildsQueryVariables = Exact<{
  build_ids: Array<Scalars['uuid']> | Scalars['uuid'];
  user_id: Scalars['uuid'];
}>;


export type GetUsersBuildsQuery = { __typename?: 'query_root', builds: Array<{ __typename?: 'builds', id: any }> };

export type GetUsersProjectsQueryVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type GetUsersProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', id: any }> };

export type GetVulnerabilitiesByCveQueryVariables = Exact<{
  cves?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetVulnerabilitiesByCveQuery = { __typename?: 'query_root', vulnerability: Array<{ __typename?: 'vulnerability', id: any }> };

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

export type InsertBuildLogMutationVariables = Exact<{
  build_log: Build_Log_Insert_Input;
}>;


export type InsertBuildLogMutation = { __typename?: 'mutation_root', insert_build_log_one?: { __typename?: 'build_log', id: any, state: Build_State_Enum } | null };

export type InsertBuildMutationVariables = Exact<{
  build: Builds_Insert_Input;
}>;


export type InsertBuildMutation = { __typename?: 'mutation_root', insert_builds_one?: { __typename?: 'builds', id: any } | null };

export type InsertPersonalProjectAndOrgMutationVariables = Exact<{
  user_id: Scalars['uuid'];
}>;


export type InsertPersonalProjectAndOrgMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any } | null };

export type InsertProjectsMutationVariables = Exact<{
  projects: Array<Projects_Insert_Input> | Projects_Insert_Input;
  on_conflict: Projects_On_Conflict;
}>;


export type InsertProjectsMutation = { __typename?: 'mutation_root', insert_projects?: { __typename?: 'projects_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'projects', id: any, name: string }> } | null };

export type InsertScanMutationVariables = Exact<{
  scan: Scans_Insert_Input;
  build_id: Scalars['uuid'];
}>;


export type InsertScanMutation = { __typename?: 'mutation_root', insert_scans_one?: { __typename?: 'scans', id: any, build_id: any, findings: Array<{ __typename?: 'findings', fix_state: any, fix_versions?: any | null, package_name: string, created_at: any, id: any, language: string, locations: any, matcher: string, purl: string, severity: any, type: string, version: string, updated_at: any, version_matcher: string, virtual_path?: string | null, vulnerability_id: any, vulnerability: { __typename?: 'vulnerability', id: any, source: string, ignored_vulnerabilities: Array<{ __typename?: 'ignored_vulnerabilities', creator_id?: any | null, id: any, locations: any, note: string, project_id: any, vulnerability_id: any }> } }> } | null };

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
  existing_github_check_id: Scalars['bigint'];
}>;


export type UpdateBuildExistingCheckIdMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

export type UpdateBuildExistingReviewIdMutationVariables = Exact<{
  id: Scalars['uuid'];
  existing_github_review_id: Scalars['String'];
}>;


export type UpdateBuildExistingReviewIdMutation = { __typename?: 'mutation_root', update_builds_by_pk?: { __typename?: 'builds', id: any } | null };

export type UpdateRepoIfExistsMutationVariables = Exact<{
  repo_body: Github_Repositories_Set_Input;
  github_id: Scalars['Int'];
}>;


export type UpdateRepoIfExistsMutation = { __typename?: 'mutation_root', update_github_repositories?: { __typename?: 'github_repositories_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'github_repositories', project: { __typename?: 'projects', id: any, name: string } }> } | null };

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

export type UpdateProjectNameMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type UpdateProjectNameMutation = { __typename?: 'mutation_root', update_projects_by_pk?: { __typename?: 'projects', id: any } | null };

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

export type UpsertOrganizationMutationVariables = Exact<{
  object: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
}>;


export type UpsertOrganizationMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any, github_node_id?: string | null, name: string } | null };

export type UpsertOrganizationsMutationVariables = Exact<{
  object: Array<Organizations_Insert_Input> | Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
}>;


export type UpsertOrganizationsMutation = { __typename?: 'mutation_root', insert_organizations?: { __typename?: 'organizations_mutation_response', returning: Array<{ __typename?: 'organizations', id: any, github_node_id?: string | null, name: string }> } | null };

export type UpsertUserFromIdMutationVariables = Exact<{
  user: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
}>;


export type UpsertUserFromIdMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', id: any } | null };

export const ManifestDependencyEdgeFragmentDoc = gql`
    fragment ManifestDependencyEdge on manifest_dependency_edge {
  id
  parent_id
  child_id
  analysis_results(
    where: $analysis_results_where
    order_by: {finding_source_version: desc}
  ) {
    id
    finding_source_version
    finding_source
    finding_type
    locations(limit: 5) {
      id
      path
      start_row
      start_column
      end_row
      end_column
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
      name
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
    project {
      id
    }
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
export const GetManifestDependencyEdgeAnalysisResultDocument = gql`
    query GetManifestDependencyEdgeAnalysisResult($vulnerability_id: uuid!, $manifest_dependency_edge_id: uuid!, $finding_source_version: Int!) {
  analysis_manifest_dependency_edge_result(
    where: {vulnerability_id: {_eq: $vulnerability_id}, manifest_dependency_edge_id: {_eq: $manifest_dependency_edge_id}, finding_source_version: {_eq: $finding_source_version}, finding_type: {_neq: error}}
  ) {
    id
    finding_type
  }
}
    `;
export const GetManifestDependencyEdgeChildrenDocument = gql`
    query GetManifestDependencyEdgeChildren($ids: [uuid!]!) {
  manifest_dependency_node(where: {id: {_in: $ids}}) {
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
            severity_name
            cvss_score
            summary
            guide_vulnerabilities {
              guide_id
              guide {
                summary
                id
                title
              }
            }
            cwes {
              id
              cwe {
                id
                name
                description
                common_name
              }
            }
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
    `;
export const GetOrganizationFromInstallationIdDocument = gql`
    query GetOrganizationFromInstallationId($installation_id: Int) {
  organizations(where: {installation_id: {_eq: $installation_id}}) {
    id
  }
}
    `;
export const GetOrganizationsFromUserQueryDocument = gql`
    query GetOrganizationsFromUserQuery($user_id: uuid!) {
  organizations(where: {organization_users: {user_id: {_eq: $user_id}}}) {
    id
    installation_id
    name
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
export const GetProjectFromRepoIdDocument = gql`
    query GetProjectFromRepoId($repo_github_id: Int!) {
  github_repositories(where: {github_id: {_eq: $repo_github_id}}) {
    project {
      id
    }
  }
}
    `;
export const GetTreeFromBuildDocument = gql`
    query GetTreeFromBuild($build_id: uuid!, $analysis_results_where: analysis_manifest_dependency_edge_result_bool_exp = {}) {
  builds_by_pk(id: $build_id) {
    resolved_manifests {
      id
      path
      manifest_dependency_node {
        id
      }
      child_edges_recursive {
        ...ManifestDependencyEdge
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
  }
}
    ${ManifestDependencyEdgeFragmentDoc}`;
export const GetUserGitHubDataDocument = gql`
    query GetUserGitHubData($kratos_id: uuid) {
  users(where: {kratos_id: {_eq: $kratos_id}}) {
    github_id
    github_node_id
    kratos_id
    id
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
export const GetUsersBuildsDocument = gql`
    query GetUsersBuilds($build_ids: [uuid!]!, $user_id: uuid!) {
  builds(
    where: {_and: {id: {_in: $build_ids}, project: {organization: {organization_users: {user_id: {_eq: $user_id}}}}}}
  ) {
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
  vulnerability(where: {source_id: {_in: $cves}}) {
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
export const InsertBuildLogDocument = gql`
    mutation InsertBuildLog($build_log: build_log_insert_input!) {
  insert_build_log_one(object: $build_log) {
    id
    state
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
export const InsertProjectsDocument = gql`
    mutation InsertProjects($projects: [projects_insert_input!]!, $on_conflict: projects_on_conflict!) {
  insert_projects(objects: $projects, on_conflict: $on_conflict) {
    affected_rows
    returning {
      id
      name
    }
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
        source
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
    mutation UpdateBuildExistingCheckId($id: uuid!, $existing_github_check_id: bigint!) {
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
export const UpdateRepoIfExistsDocument = gql`
    mutation UpdateRepoIfExists($repo_body: github_repositories_set_input!, $github_id: Int!) {
  update_github_repositories(
    _set: $repo_body
    where: {github_id: {_eq: $github_id}}
  ) {
    affected_rows
    returning {
      project {
        id
        name
      }
    }
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
export const UpdateProjectNameDocument = gql`
    mutation UpdateProjectName($id: uuid!, $name: String!) {
  update_projects_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
    id
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
export const UpsertOrganizationDocument = gql`
    mutation UpsertOrganization($object: organizations_insert_input!, $on_conflict: organizations_on_conflict) {
  insert_organizations_one(object: $object, on_conflict: $on_conflict) {
    id
    github_node_id
    name
  }
}
    `;
export const UpsertOrganizationsDocument = gql`
    mutation UpsertOrganizations($object: [organizations_insert_input!]!, $on_conflict: organizations_on_conflict) {
  insert_organizations(objects: $object, on_conflict: $on_conflict) {
    returning {
      id
      github_node_id
      name
    }
  }
}
    `;
export const UpsertUserFromIdDocument = gql`
    mutation UpsertUserFromId($user: users_insert_input!, $on_conflict: users_on_conflict) {
  insert_users_one(object: $user, on_conflict: $on_conflict) {
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
    GetManifestDependencyEdgeAnalysisResult(variables: GetManifestDependencyEdgeAnalysisResultQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetManifestDependencyEdgeAnalysisResultQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetManifestDependencyEdgeAnalysisResultQuery>(GetManifestDependencyEdgeAnalysisResultDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetManifestDependencyEdgeAnalysisResult', 'query');
    },
    GetManifestDependencyEdgeChildren(variables: GetManifestDependencyEdgeChildrenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetManifestDependencyEdgeChildrenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetManifestDependencyEdgeChildrenQuery>(GetManifestDependencyEdgeChildrenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetManifestDependencyEdgeChildren', 'query');
    },
    GetOrganizationFromInstallationId(variables?: GetOrganizationFromInstallationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationFromInstallationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationFromInstallationIdQuery>(GetOrganizationFromInstallationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationFromInstallationId', 'query');
    },
    GetOrganizationsFromUserQuery(variables: GetOrganizationsFromUserQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationsFromUserQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationsFromUserQueryQuery>(GetOrganizationsFromUserQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationsFromUserQuery', 'query');
    },
    GetPreviousBuildForPr(variables: GetPreviousBuildForPrQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPreviousBuildForPrQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPreviousBuildForPrQuery>(GetPreviousBuildForPrDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPreviousBuildForPr', 'query');
    },
    GetProjectFromRepoId(variables: GetProjectFromRepoIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProjectFromRepoIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectFromRepoIdQuery>(GetProjectFromRepoIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProjectFromRepoId', 'query');
    },
    GetTreeFromBuild(variables: GetTreeFromBuildQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTreeFromBuildQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTreeFromBuildQuery>(GetTreeFromBuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTreeFromBuild', 'query');
    },
    GetUserGitHubData(variables?: GetUserGitHubDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserGitHubDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserGitHubDataQuery>(GetUserGitHubDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserGitHubData', 'query');
    },
    GetUserRole(variables?: GetUserRoleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserRoleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserRoleQuery>(GetUserRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserRole', 'query');
    },
    GetUsersBuilds(variables: GetUsersBuildsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersBuildsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersBuildsQuery>(GetUsersBuildsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsersBuilds', 'query');
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
    InsertBuildLog(variables: InsertBuildLogMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertBuildLogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertBuildLogMutation>(InsertBuildLogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertBuildLog', 'mutation');
    },
    InsertBuild(variables: InsertBuildMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertBuildMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertBuildMutation>(InsertBuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertBuild', 'mutation');
    },
    InsertPersonalProjectAndOrg(variables: InsertPersonalProjectAndOrgMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertPersonalProjectAndOrgMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertPersonalProjectAndOrgMutation>(InsertPersonalProjectAndOrgDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertPersonalProjectAndOrg', 'mutation');
    },
    InsertProjects(variables: InsertProjectsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertProjectsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertProjectsMutation>(InsertProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertProjects', 'mutation');
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
    UpdateRepoIfExists(variables: UpdateRepoIfExistsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateRepoIfExistsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateRepoIfExistsMutation>(UpdateRepoIfExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateRepoIfExists', 'mutation');
    },
    UpdateManifestStatusIfExists(variables: UpdateManifestStatusIfExistsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestStatusIfExistsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestStatusIfExistsMutation>(UpdateManifestStatusIfExistsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifestStatusIfExists', 'mutation');
    },
    UpdateManifest(variables: UpdateManifestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateManifestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateManifestMutation>(UpdateManifestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateManifest', 'mutation');
    },
    UpdateProjectName(variables: UpdateProjectNameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProjectNameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProjectNameMutation>(UpdateProjectNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateProjectName', 'mutation');
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
    UpsertOrganization(variables: UpsertOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationMutation>(UpsertOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganization', 'mutation');
    },
    UpsertOrganizations(variables: UpsertOrganizationsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOrganizationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOrganizationsMutation>(UpsertOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertOrganizations', 'mutation');
    },
    UpsertUserFromId(variables: UpsertUserFromIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertUserFromIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUserFromIdMutation>(UpsertUserFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertUserFromId', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;