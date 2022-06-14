/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
  devConfigOptionsDefaults,
  DevelopmentConfigOptions,
  hostedLiveDemoConfigOptionsDefaults,
  testsConfigOptionsDefaults,
} from '../config/types';

import { LunaSecStackEnvironment } from './constants';
import { DefinitionsService } from './lib/docker-compose-types';
import { HealthCheckOptions, LunaSecService } from './types';

export function dockerImageConfigFn(base: string, versionTag: string) {
  return function dockerImage(name: string) {
    return {
      image: `${base}${name}:${versionTag}`,
    };
  };
}

export function dockerfileTarget(dockerfile: string, target: string, context?: string): DefinitionsService {
  return {
    build: {
      context: context || '.',
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
