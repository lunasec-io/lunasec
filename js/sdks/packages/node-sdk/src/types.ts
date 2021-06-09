import {LunaSecDeploymentJSON} from "./deployment-json-types";

export enum DeploymentStage {
  DEV = 'dev',
  PROD = 'prod'
}

export enum DeploymentState {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export const LunaSecDeploymentTemplateArray = ['secure-enclave', 'secure-resolver'] as const;
export type LunaSecDeploymentTemplates = typeof LunaSecDeploymentTemplateArray[number];

export interface SecureEnclaveInputs {

}

export interface SecureResolverInputs {
  container_uri: string
  language: string
  functions: SecureResolverFunctionConfig[]
}

export type DeploymentTemplateInputs =
  SecureEnclaveInputs
  | SecureResolverInputs;

export interface SecureResolverFunctionConfig {
  import_path: string;
  function_name: string;
  work_dir: string;
}

export interface GetDeploymentsOptions {
  deploymentId?: string;
  deploymentTag?: string;
  stage?: string;
}

export interface GetDeploymentOptions {
  deploymentId?: string;
  deploymentTag?: string;
}

export interface DeploymentInfo {
  project_id: string;
  organization_id: string;
  deployment_json: LunaSecDeploymentJSON;
  state: DeploymentState;
  log: string;
  tag: string;
}
