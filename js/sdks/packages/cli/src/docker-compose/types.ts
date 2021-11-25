import { DevelopmentConfigOptions } from '../config/types';

import { DefinitionsService } from './lib/docker-compose-types';
import { LunaSecStackEnvironment } from './lunasec-stack';

export type LunaSecService =
  | 'localstack'
  | 'localstack-proxy'
  | 'lunasec-cli'
  | 'secure-frame-iframe'
  | 'application-front-end'
  | 'application-back-end'
  | 'tokenizer-backend'
  | 'integration-test'
  | 'nginx-live-demo';

export interface ComposeService {
  name: string;
  config: DefinitionsService | null;
}

export interface HealthCheckOptions {
  endpoint?: string;
  protocol?: string;
  composeOptions?: {
    test?: string[];
    timeout?: string;
    interval?: string;
    retries?: number;
  };
}

export interface DockerComposeImageConfig {
  image: string;
}

export interface LunaSecServiceCreationConfig {
  environmentConfig: DevelopmentConfigOptions;
  env: LunaSecStackEnvironment;
  localBuild: boolean;
  getBaseServiceConfig(name: string, excludeEnv?: boolean): DefinitionsService;
  getDockerImageName(tag: string): DockerComposeImageConfig;
  getDockerfileTarget(dockerfile: string, target: string): DefinitionsService;
}

export interface LunaSecReactEnv {
  REACT_APP_EXPRESS_URL: string;
  REACT_APP_SIMPLE_TOKENIZER_URL: string;
  REACT_APP_TOKENIZER_URL: string;
  REACT_APP_GRAPHQL_URL: string;
}

export interface LunaSecDockerEnv {
  LOCALSTACK_URL: string;
  APPLICATION_FRONT_END: string;
  LUNASEC_STACK_ENV: string;
  STAGE: 'DEV';
  AWS_SECRET_ACCESS_KEY: 'test';
  AUTH_PROVIDERS: string;
  AWS_DEFAULT_REGION: 'us-west-2';
  CYPRESS_REMOTE_DEBUGGING_PORT: '42042';
  LOCAL_HTTPS_PROXY: string;
  TOKENIZER_URL: string;
  LUNASEC_SIGNING_KEY: string;
  SESSION_JWKS_URL: string;
  AWS_ACCESS_KEY_ID: 'test';
  CDN_HOST: string;
  CDN_PROTOCOL: 'https' | 'http';
  LOCALSTACK_HOSTNAME: 'localstack';
}

export const DEFAULT_WAIT_FOR_SERVICE_TIMEOUT = 300;

export interface LunaSecServiceDependenciesEnv {
  // Tell the services to wait for each other for up this number of seconds
  WAIT_FOR_TIMEOUT: number;

  // These services must wait for the other services before starting up.
  // They check if another service is up via a script that checks if a port is accessible.
  // The ports to check are passed like this with commas between values:
  // "some-host-name:8080,another-host:8001"
  DEPENDENCIES__CLI: string;
  DEPENDENCIES__INTEGRATION_TEST: string;
  DEPENDENCIES__LOCALSTACK_PROXY: string;
}
