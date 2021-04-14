/**
 * When adding a new API request, start by adding it here.
 * Ideally, the Typescript should fail to compile when you do.
 * The next step is to add Request/Response types and then "map" them to each other.
 */
export enum SecureResolverAction {
  build = "build",
  listDeployments = "list_deployments",
  listFunctions = "list_functions",
  remove = "remove",
  url = "url"
}

/// Common type information for request schemas ///
export type ValidStages = "dev" | "prod";

export type ValidSecureResolverApiRequestTypes = (keyof typeof SecureResolverAction | keyof SecureResolverActionResponseMessageMap | keyof SecureResolverActionMessageMap);

/// Generic Base Types ///
export interface BaseSecureResolverAction<T extends keyof typeof SecureResolverAction> {
  action: T
}

export interface SecureResolverApiSuccessResponse<T> {
  success: true,
  result: T
}

export interface SecureResolverApiFailResponse {
  success: false,
  msg: string,
}

/// API Request Schemas ///
export interface BuildActionFunctionConfig {
  import_path: string;
  function_name: string;
  work_dir: string;
}

export interface BuildResolverAction extends BaseSecureResolverAction<"build"> {
  payload: {
    stage: ValidStages;
    container_uri: string;
    app_dir: string;
    language: string;
    functions: BuildActionFunctionConfig[];
  };
}

export interface ListDeploymentsAction extends BaseSecureResolverAction<"listDeployments"> {
  payload: {
    stage: ValidStages;
  };
}

export interface ListFunctionsAction extends BaseSecureResolverAction<"listFunctions"> {
  payload: {
    deployment_id: string;
    stage: ValidStages;
  };
}

export interface RemoveResolverAction extends BaseSecureResolverAction<"remove"> {
  payload: {
    stage: ValidStages;
  };
}

export interface GetDeploymentUrlAction extends BaseSecureResolverAction<"url"> {
  payload: {
    deployment_id: string;
  };
}

/// API Response Schemas ///
export interface GetResolverUrlResponse {
  url: string;
}

export interface BuildResolverResponse {
}

export interface ListDeploymentsResponse {
}

export interface ListFunctionsResponse {
}

export interface RemoveResolverResponse {
}

/// Request Type Lookup ///
export type SecureResolverActionLookup = {
  [key in keyof typeof SecureResolverAction]: BaseSecureResolverAction<key>
}

export interface SecureResolverActionMessageMap extends SecureResolverActionLookup {
  build: BuildResolverAction,
  listDeployments: ListDeploymentsAction,
  listFunctions: ListFunctionsAction,
  remove: RemoveResolverAction,
  url: GetDeploymentUrlAction,
}

/// Response Type Lookup ///
export type SecureResolverResponseLookup = {
  [key in keyof typeof SecureResolverAction]: SecureResolverActionResponseMessageMap[key]
}

export interface SecureResolverActionResponseMessageMap extends SecureResolverResponseLookup {
  build: BuildResolverResponse,
  listDeployments: ListDeploymentsResponse,
  listFunctions: ListFunctionsResponse,
  remove: RemoveResolverResponse,
  url: GetResolverUrlResponse,
}
