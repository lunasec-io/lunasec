import {
  devConfigOptionsDefaults,
  DevelopmentConfigOptions,
  hostedLiveDemoConfigOptionsDefaults,
  testsConfigOptionsDefaults,
} from '../config/types';

import { DefinitionsService } from './lib/docker-compose-types';
import { LunaSecStackEnvironment } from './lunasec-stack';
import { HealthCheckOptions, LunaSecService } from './types';

export function dockerImageConfigFn(base: string, versionTag: string) {
  return function dockerImage(name: string) {
    return {
      image: `${base}${name}:${versionTag}`,
    };
  };
}

export function dockerfileTarget(dockerfile: string, target: string): DefinitionsService {
  return {
    build: {
      context: '.',
      dockerfile,
      target,
    },
  };
}

export function baseServiceConfig(name: LunaSecService, excludeEnv?: boolean): DefinitionsService {
  return {
    hostname: name,
    ...(excludeEnv ? {} : { env_file: ['.env.docker'] }),
  };
}

export function serviceHealthCheck(port: number, options?: HealthCheckOptions) {
  const endpoint = options ? (options.endpoint ? options.endpoint : '') : '';
  const protocol = options ? (options.protocol ? options.protocol : 'http') : 'http';
  const composeOptions = options ? options.composeOptions : {};
  return {
    test: ['CMD-SHELL', `curl -k ${protocol}://localhost:${port}${endpoint}`],
    timeout: '30s',
    interval: '10s',
    retries: 10,
    ...composeOptions,
  };
}

export function composeServicePorts(ports: number[]): DefinitionsService {
  return {
    ports: ports.map((port) => {
      return {
        target: port,
        published: port,
      };
    }),
  };
}

function getEnvStackConfigOptions(env: LunaSecStackEnvironment, configOptions?: DevelopmentConfigOptions) {
  if (env === 'tests') {
    return testsConfigOptionsDefaults;
  }
  if (env === 'hosted-live-demo') {
    return hostedLiveDemoConfigOptionsDefaults;
  }
  return {
    ...devConfigOptionsDefaults,
    ...configOptions,
  };
}

export function getStackConfigOptions(env: LunaSecStackEnvironment, configOptions?: DevelopmentConfigOptions) {
  const stackConfig = getEnvStackConfigOptions(env, configOptions);

  if (stackConfig.sessionJwksUrl === '') {
    stackConfig.sessionJwksUrl = `${stackConfig.applicationBackEnd}/.lunasec/jwks.json`;
  }

  return stackConfig;
}

export function getLocalstackUrl(env: LunaSecStackEnvironment) {
  const port = 4566;

  if (env === 'tests' || env === 'hosted-live-demo') {
    return `http://localstack:${port}`;
  }

  return `http://localhost:${port}`;
}
