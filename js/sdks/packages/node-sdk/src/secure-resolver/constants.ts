import { DeploymentStage, SecureResolverSdkConfig } from '../types/config';

export const refinerySecretHeader = 'REFINERY_DEPLOYMENT_SECRET';
export const containerSecretHeader = 'X-Container-Secret';
export const deploymentEndpoint = '/api/v1/deployments/secure_resolver';
export const deploymentIDEnvVar = 'REFINERY_DEPLOYMENT_ID';

export const defaultConfig: SecureResolverSdkConfig = {
  stage: DeploymentStage.DEV,
  appDir: '/app',
  language: 'Node.js 10 Temporal',
  functionsConfigPath: 'lunasec.json',
};
