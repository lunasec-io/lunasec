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
  deploymentId: string;
  appDir?: string;
  language?: string;
  functionsConfigPath?: string;
  functionsConfig?: FunctionConfig;
  deploymentSecret: string;
  containerHeaders: string;
  deploymentUrl: string; // (forrest) it's possible I misunderstood and this is meant to come from an environment var set during deployment and not the users config
}
