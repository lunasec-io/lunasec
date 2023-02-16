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
  jsonb: Record<any, any> | any[];
  uuid: string;
};

export type AuthenticatedRepoCloneUrlOutput = {
  __typename?: 'AuthenticatedRepoCloneUrlOutput';
  url?: Maybe<Scalars['String']>;
};

export type BuildData_Adjustment = {
  __typename?: 'BuildData_Adjustment';
  adjusted_from_cvss_score?: Maybe<Scalars['Float']>;
  adjusted_from_severity_name?: Maybe<Scalars['String']>;
  adjustments_applied: Array<Scalars['String']>;
  path_matched: Scalars['String'];
};

export type BuildData_AffectedByVulnerability = {
  __typename?: 'BuildData_AffectedByVulnerability';
  adjustment?: Maybe<BuildData_Adjustment>;
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
  adjustment?: Maybe<BuildData_Adjustment>;
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

export type CreatePullRequestForVulnerabilityResponse = {
  __typename?: 'CreatePullRequestForVulnerabilityResponse';
  pullRequestUrl: Scalars['String'];
  success?: Maybe<Scalars['Boolean']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createPullRequestForVulnerability?: Maybe<CreatePullRequestForVulnerabilityResponse>;
  installSelectedRepos?: Maybe<InstallSelectedReposResponse>;
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
};


export type MutationCreatePullRequestForVulnerabilityArgs = {
  new_package_slug: Scalars['String'];
  old_package_slug: Scalars['String'];
  package_manifest_path: Scalars['String'];
  project_id: Scalars['uuid'];
  vulnerability_id: Scalars['uuid'];
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
  vulnerableReleasesFromBuild?: Maybe<Array<BuildData_VulnerableRelease>>;
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


export type QueryVulnerableReleasesFromBuildArgs = {
  buildId: Scalars['uuid'];
  minimumSeverity?: InputMaybe<Scalars['String']>;
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

export type UploadUrl = {
  __typename?: 'UploadUrl';
  headers: Scalars['jsonb'];
  url: Scalars['String'];
};



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
  BuildData_Adjustment: ResolverTypeWrapper<BuildData_Adjustment>;
  BuildData_AffectedByVulnerability: ResolverTypeWrapper<BuildData_AffectedByVulnerability>;
  BuildData_Cwe: ResolverTypeWrapper<BuildData_Cwe>;
  BuildData_DependencyNode: ResolverTypeWrapper<BuildData_DependencyNode>;
  BuildData_Guide: ResolverTypeWrapper<BuildData_Guide>;
  BuildData_Guide_Vulnerability: ResolverTypeWrapper<BuildData_Guide_Vulnerability>;
  BuildData_IgnoredVulnerability: ResolverTypeWrapper<BuildData_IgnoredVulnerability>;
  BuildData_Location: ResolverTypeWrapper<BuildData_Location>;
  BuildData_Package: ResolverTypeWrapper<BuildData_Package>;
  BuildData_Range: ResolverTypeWrapper<BuildData_Range>;
  BuildData_Release: ResolverTypeWrapper<BuildData_Release>;
  BuildData_Vulnerability: ResolverTypeWrapper<BuildData_Vulnerability>;
  BuildData_VulnerabilityCwe: ResolverTypeWrapper<BuildData_VulnerabilityCwe>;
  BuildData_VulnerableRelease: ResolverTypeWrapper<BuildData_VulnerableRelease>;
  CreatePullRequestForVulnerabilityResponse: ResolverTypeWrapper<CreatePullRequestForVulnerabilityResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GithubRepository: ResolverTypeWrapper<GithubRepository>;
  InstallSelectedReposResponse: ResolverTypeWrapper<InstallSelectedReposResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrgWithRepos: ResolverTypeWrapper<OrgWithRepos>;
  OrgsWithReposInput: OrgsWithReposInput;
  PresignedUrlResponse: ResolverTypeWrapper<PresignedUrlResponse>;
  Query: ResolverTypeWrapper<{}>;
  SbomUploadUrlInput: SbomUploadUrlInput;
  SbomUploadUrlOutput: ResolverTypeWrapper<SbomUploadUrlOutput>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UploadUrl: ResolverTypeWrapper<UploadUrl>;
  jsonb: ResolverTypeWrapper<Scalars['jsonb']>;
  uuid: ResolverTypeWrapper<Scalars['uuid']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticatedRepoCloneUrlOutput: AuthenticatedRepoCloneUrlOutput;
  Boolean: Scalars['Boolean'];
  BuildData_Adjustment: BuildData_Adjustment;
  BuildData_AffectedByVulnerability: BuildData_AffectedByVulnerability;
  BuildData_Cwe: BuildData_Cwe;
  BuildData_DependencyNode: BuildData_DependencyNode;
  BuildData_Guide: BuildData_Guide;
  BuildData_Guide_Vulnerability: BuildData_Guide_Vulnerability;
  BuildData_IgnoredVulnerability: BuildData_IgnoredVulnerability;
  BuildData_Location: BuildData_Location;
  BuildData_Package: BuildData_Package;
  BuildData_Range: BuildData_Range;
  BuildData_Release: BuildData_Release;
  BuildData_Vulnerability: BuildData_Vulnerability;
  BuildData_VulnerabilityCwe: BuildData_VulnerabilityCwe;
  BuildData_VulnerableRelease: BuildData_VulnerableRelease;
  CreatePullRequestForVulnerabilityResponse: CreatePullRequestForVulnerabilityResponse;
  Float: Scalars['Float'];
  GithubRepository: GithubRepository;
  InstallSelectedReposResponse: InstallSelectedReposResponse;
  Int: Scalars['Int'];
  Mutation: {};
  OrgWithRepos: OrgWithRepos;
  OrgsWithReposInput: OrgsWithReposInput;
  PresignedUrlResponse: PresignedUrlResponse;
  Query: {};
  SbomUploadUrlInput: SbomUploadUrlInput;
  SbomUploadUrlOutput: SbomUploadUrlOutput;
  String: Scalars['String'];
  UploadUrl: UploadUrl;
  jsonb: Scalars['jsonb'];
  uuid: Scalars['uuid'];
};

export type AuthenticatedRepoCloneUrlOutputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthenticatedRepoCloneUrlOutput'] = ResolversParentTypes['AuthenticatedRepoCloneUrlOutput']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_AdjustmentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Adjustment'] = ResolversParentTypes['BuildData_Adjustment']> = {
  adjusted_from_cvss_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  adjusted_from_severity_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adjustments_applied?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  path_matched?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_AffectedByVulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_AffectedByVulnerability'] = ResolversParentTypes['BuildData_AffectedByVulnerability']> = {
  adjustment?: Resolver<Maybe<ResolversTypes['BuildData_Adjustment']>, ParentType, ContextType>;
  beneath_minimum_severity?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fix_versions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ignored?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ignored_vulnerability?: Resolver<Maybe<ResolversTypes['BuildData_IgnoredVulnerability']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ranges?: Resolver<Array<ResolversTypes['BuildData_Range']>, ParentType, ContextType>;
  trivially_updatable_to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['BuildData_Vulnerability'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_CweResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Cwe'] = ResolversParentTypes['BuildData_Cwe']> = {
  common_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_DependencyNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_DependencyNode'] = ResolversParentTypes['BuildData_DependencyNode']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locations?: Resolver<Array<ResolversTypes['BuildData_Location']>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reachable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['BuildData_Release'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_GuideResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Guide'] = ResolversParentTypes['BuildData_Guide']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_Guide_VulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Guide_Vulnerability'] = ResolversParentTypes['BuildData_Guide_Vulnerability']> = {
  guide?: Resolver<Maybe<ResolversTypes['BuildData_Guide']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_IgnoredVulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_IgnoredVulnerability'] = ResolversParentTypes['BuildData_IgnoredVulnerability']> = {
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Location'] = ResolversParentTypes['BuildData_Location']> = {
  end_column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  end_row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start_row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_PackageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Package'] = ResolversParentTypes['BuildData_Package']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  package_manager?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_RangeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Range'] = ResolversParentTypes['BuildData_Range']> = {
  fixed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introduced?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_ReleaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Release'] = ResolversParentTypes['BuildData_Release']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  package?: Resolver<ResolversTypes['BuildData_Package'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_VulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Vulnerability'] = ResolversParentTypes['BuildData_Vulnerability']> = {
  cvss_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cwes?: Resolver<Array<ResolversTypes['BuildData_VulnerabilityCwe']>, ParentType, ContextType>;
  guide_vulnerabilities?: Resolver<Array<ResolversTypes['BuildData_Guide_Vulnerability']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_VulnerabilityCweResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_VulnerabilityCwe'] = ResolversParentTypes['BuildData_VulnerabilityCwe']> = {
  cwe?: Resolver<ResolversTypes['BuildData_Cwe'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_VulnerableReleaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_VulnerableRelease'] = ResolversParentTypes['BuildData_VulnerableRelease']> = {
  adjustment?: Resolver<Maybe<ResolversTypes['BuildData_Adjustment']>, ParentType, ContextType>;
  affected_by?: Resolver<Array<ResolversTypes['BuildData_AffectedByVulnerability']>, ParentType, ContextType>;
  beneath_minimum_severity?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chains?: Resolver<Array<Array<ResolversTypes['BuildData_DependencyNode']>>, ParentType, ContextType>;
  cvss?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dev_only?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fix_versions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  guides?: Resolver<Array<ResolversTypes['BuildData_Guide']>, ParentType, ContextType>;
  paths?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  release?: Resolver<ResolversTypes['BuildData_Release'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trivially_updatable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePullRequestForVulnerabilityResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreatePullRequestForVulnerabilityResponse'] = ResolversParentTypes['CreatePullRequestForVulnerabilityResponse']> = {
  pullRequestUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  createPullRequestForVulnerability?: Resolver<Maybe<ResolversTypes['CreatePullRequestForVulnerabilityResponse']>, ParentType, ContextType, RequireFields<MutationCreatePullRequestForVulnerabilityArgs, 'new_package_slug' | 'old_package_slug' | 'package_manifest_path' | 'project_id' | 'vulnerability_id'>>;
  installSelectedRepos?: Resolver<Maybe<ResolversTypes['InstallSelectedReposResponse']>, ParentType, ContextType, RequireFields<MutationInstallSelectedReposArgs, 'orgs'>>;
  presignManifestUpload?: Resolver<Maybe<ResolversTypes['PresignedUrlResponse']>, ParentType, ContextType, RequireFields<MutationPresignManifestUploadArgs, 'project_id'>>;
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
  vulnerableReleasesFromBuild?: Resolver<Maybe<Array<ResolversTypes['BuildData_VulnerableRelease']>>, ParentType, ContextType, RequireFields<QueryVulnerableReleasesFromBuildArgs, 'buildId'>>;
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

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Resolvers<ContextType = Context> = {
  AuthenticatedRepoCloneUrlOutput?: AuthenticatedRepoCloneUrlOutputResolvers<ContextType>;
  BuildData_Adjustment?: BuildData_AdjustmentResolvers<ContextType>;
  BuildData_AffectedByVulnerability?: BuildData_AffectedByVulnerabilityResolvers<ContextType>;
  BuildData_Cwe?: BuildData_CweResolvers<ContextType>;
  BuildData_DependencyNode?: BuildData_DependencyNodeResolvers<ContextType>;
  BuildData_Guide?: BuildData_GuideResolvers<ContextType>;
  BuildData_Guide_Vulnerability?: BuildData_Guide_VulnerabilityResolvers<ContextType>;
  BuildData_IgnoredVulnerability?: BuildData_IgnoredVulnerabilityResolvers<ContextType>;
  BuildData_Location?: BuildData_LocationResolvers<ContextType>;
  BuildData_Package?: BuildData_PackageResolvers<ContextType>;
  BuildData_Range?: BuildData_RangeResolvers<ContextType>;
  BuildData_Release?: BuildData_ReleaseResolvers<ContextType>;
  BuildData_Vulnerability?: BuildData_VulnerabilityResolvers<ContextType>;
  BuildData_VulnerabilityCwe?: BuildData_VulnerabilityCweResolvers<ContextType>;
  BuildData_VulnerableRelease?: BuildData_VulnerableReleaseResolvers<ContextType>;
  CreatePullRequestForVulnerabilityResponse?: CreatePullRequestForVulnerabilityResponseResolvers<ContextType>;
  GithubRepository?: GithubRepositoryResolvers<ContextType>;
  InstallSelectedReposResponse?: InstallSelectedReposResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrgWithRepos?: OrgWithReposResolvers<ContextType>;
  PresignedUrlResponse?: PresignedUrlResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SbomUploadUrlOutput?: SbomUploadUrlOutputResolvers<ContextType>;
  UploadUrl?: UploadUrlResolvers<ContextType>;
  jsonb?: GraphQLScalarType;
  uuid?: GraphQLScalarType;
};

