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

export type Mutation = {
  __typename?: 'Mutation';
  /**  get s3 presigned url for manifest upload, used only by the frontend  */
  presignManifestUpload?: Maybe<PresignedUrlResponse>;
};


export type MutationPresignManifestUploadArgs = {
  project_id: Scalars['uuid'];
};

export type OrgWithRepos = {
  __typename?: 'OrgWithRepos';
  organizationName: Scalars['String'];
  repos: Array<GithubRepository>;
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
  availableRepos?: Maybe<Array<OrgWithRepos>>;
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
  GithubRepository: ResolverTypeWrapper<GithubRepository>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrgWithRepos: ResolverTypeWrapper<OrgWithRepos>;
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
  GithubRepository: GithubRepository;
  Int: Scalars['Int'];
  Mutation: {};
  OrgWithRepos: OrgWithRepos;
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

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  presignManifestUpload?: Resolver<Maybe<ResolversTypes['PresignedUrlResponse']>, ParentType, ContextType, RequireFields<MutationPresignManifestUploadArgs, 'project_id'>>;
};

export type OrgWithReposResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrgWithRepos'] = ResolversParentTypes['OrgWithRepos']> = {
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
  availableRepos?: Resolver<Maybe<Array<ResolversTypes['OrgWithRepos']>>, ParentType, ContextType>;
  fakeQueryToHackHasuraBeingABuggyMess?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  presignSbomUpload?: Resolver<Maybe<ResolversTypes['SbomUploadUrlOutput']>, ParentType, ContextType, RequireFields<QueryPresignSbomUploadArgs, 'buildId' | 'orgId'>>;
  sbomUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QuerySbomUrlArgs, 'buildId'>>;
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
  GithubRepository?: GithubRepositoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrgWithRepos?: OrgWithReposResolvers<ContextType>;
  PresignedUrlResponse?: PresignedUrlResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SbomUploadUrlOutput?: SbomUploadUrlOutputResolvers<ContextType>;
  UploadUrl?: UploadUrlResolvers<ContextType>;
  jsonb?: GraphQLScalarType;
  uuid?: GraphQLScalarType;
};

