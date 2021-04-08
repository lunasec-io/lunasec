export enum SecureResolverAction {
  build = "build",
  listDeployments = "list_deployments",
  listFunctions = "list_functions",
  remove = "remove",
  url = "url"
}

export type ValidStages = "dev" | "prod";

export type ValidApiRequestTypes = (keyof typeof SecureResolverAction | keyof SecureResolverActionResponseMessageMap | keyof SecureResolverActionMessageMap);

export interface SecureResolverApiResponse<T> {
  success: boolean,
  msg?: string,
  result?: T
}

export interface BaseSecureResolverAction<T extends keyof typeof SecureResolverAction> {
  action: T
}

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

export interface SecureResolverActionResponseMessageMap extends SecureResolverResponseLookup {
  build: BuildResolverResponse,
  listDeployments: ListDeploymentsResponse,
  listFunctions: ListFunctionsResponse,
  remove: RemoveResolverResponse,
  url: GetResolverUrlResponse,
}

export type SecureResolverResponseLookup = {
  [key in keyof typeof SecureResolverAction]: SecureResolverActionResponseMessageMap[key]
}
