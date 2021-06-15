import { BuildActionFunctionConfig } from '../api/types';

export enum DeploymentStage {
  DEV = 'DEV',
  PROD = 'PROD',
}

export interface FunctionConfig {
  projectID: string;
  functions: BuildActionFunctionConfig[];
}

export interface SecureResolverSdkConfig {
  stage: DeploymentStage;
  deploymentId?: string;
  appDir?: string;
  language?: string;
  functionsConfigPath?: string;
  functionsConfig?: FunctionConfig;
}
