// import { DeploymentStage, SecureResolverSdkConfig } from './types';

export const refinerySecretHeader = 'REFINERY_DEPLOYMENT_SECRET';
export const containerSecretHeader = 'X-Container-Secret';
export const deploymentEndpoint = '/api/v1/deployments/secure_resolver';

// Can we still have a default config if we aren't depending on ENV vars anymore?
// export const defaultConfig: SecureResolverSdkConfig = {
//   stage: DeploymentStage.DEV,
//   appDir: '/app',
//   language: 'Node.js 10 Temporal',
//   functionsConfigPath: 'lunasec.json',
// };
