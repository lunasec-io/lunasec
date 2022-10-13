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

export type BuildData_AffectedByVulnerability = {
  __typename?: 'BuildData_AffectedByVulnerability';
  chains?: Maybe<Array<Array<BuildData_DependencyNode>>>;
  ranges?: Maybe<Array<Maybe<BuildData_Range>>>;
  trivially_updatable?: Maybe<Scalars['Boolean']>;
  vulnerability: BuildData_Vulnerability;
};

export type BuildData_DependencyNode = {
  __typename?: 'BuildData_DependencyNode';
  id: Scalars['String'];
  range: Scalars['String'];
  release: BuildData_Release;
  release_id: Scalars['String'];
};

export type BuildData_Package = {
  __typename?: 'BuildData_Package';
  affected_by_vulnerability?: Maybe<Array<BuildData_AffectedByVulnerability>>;
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
  id: Scalars['String'];
  severity_name?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  source_id: Scalars['String'];
};

export type BuildData_VulnerableRelease = {
  __typename?: 'BuildData_VulnerableRelease';
  affected_by: Array<BuildData_AffectedByVulnerability>;
  chains: Array<Array<BuildData_DependencyNode>>;
  cvss?: Maybe<Scalars['Float']>;
  dev_only: Scalars['Boolean'];
  release: BuildData_Release;
  severity?: Maybe<Scalars['String']>;
  trivially_updatable: Scalars['String'];
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
  showIgnored?: InputMaybe<Scalars['Boolean']>;
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
  BuildData_AffectedByVulnerability: ResolverTypeWrapper<BuildData_AffectedByVulnerability>;
  BuildData_DependencyNode: ResolverTypeWrapper<BuildData_DependencyNode>;
  BuildData_Package: ResolverTypeWrapper<BuildData_Package>;
  BuildData_Range: ResolverTypeWrapper<BuildData_Range>;
  BuildData_Release: ResolverTypeWrapper<BuildData_Release>;
  BuildData_Vulnerability: ResolverTypeWrapper<BuildData_Vulnerability>;
  BuildData_VulnerableRelease: ResolverTypeWrapper<BuildData_VulnerableRelease>;
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
  BuildData_AffectedByVulnerability: BuildData_AffectedByVulnerability;
  BuildData_DependencyNode: BuildData_DependencyNode;
  BuildData_Package: BuildData_Package;
  BuildData_Range: BuildData_Range;
  BuildData_Release: BuildData_Release;
  BuildData_Vulnerability: BuildData_Vulnerability;
  BuildData_VulnerableRelease: BuildData_VulnerableRelease;
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

export type BuildData_AffectedByVulnerabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_AffectedByVulnerability'] = ResolversParentTypes['BuildData_AffectedByVulnerability']> = {
  chains?: Resolver<Maybe<Array<Array<ResolversTypes['BuildData_DependencyNode']>>>, ParentType, ContextType>;
  ranges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BuildData_Range']>>>, ParentType, ContextType>;
  trivially_updatable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vulnerability?: Resolver<ResolversTypes['BuildData_Vulnerability'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_DependencyNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_DependencyNode'] = ResolversParentTypes['BuildData_DependencyNode']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['BuildData_Release'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_PackageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_Package'] = ResolversParentTypes['BuildData_Package']> = {
  affected_by_vulnerability?: Resolver<Maybe<Array<ResolversTypes['BuildData_AffectedByVulnerability']>>, ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildData_VulnerableReleaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BuildData_VulnerableRelease'] = ResolversParentTypes['BuildData_VulnerableRelease']> = {
  affected_by?: Resolver<Array<ResolversTypes['BuildData_AffectedByVulnerability']>, ParentType, ContextType>;
  chains?: Resolver<Array<Array<ResolversTypes['BuildData_DependencyNode']>>, ParentType, ContextType>;
  cvss?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dev_only?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['BuildData_Release'], ParentType, ContextType>;
  severity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trivially_updatable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  BuildData_AffectedByVulnerability?: BuildData_AffectedByVulnerabilityResolvers<ContextType>;
  BuildData_DependencyNode?: BuildData_DependencyNodeResolvers<ContextType>;
  BuildData_Package?: BuildData_PackageResolvers<ContextType>;
  BuildData_Range?: BuildData_RangeResolvers<ContextType>;
  BuildData_Release?: BuildData_ReleaseResolvers<ContextType>;
  BuildData_Vulnerability?: BuildData_VulnerabilityResolvers<ContextType>;
  BuildData_VulnerableRelease?: BuildData_VulnerableReleaseResolvers<ContextType>;
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

