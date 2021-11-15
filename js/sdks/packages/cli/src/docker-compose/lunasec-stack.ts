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
import { writeFileSync } from 'fs';
import path from 'path';

import { dump } from 'js-yaml';

import {
  AuthProviderConfig,
  devConfigOptionsDefaults,
  DevelopmentConfigOptions,
  LunaSecStackConfigOptions,
} from '../config/types';
import { formatAuthenticationProviders } from '../utils/auth-providers';

import { ComposeSpecification, DefinitionsService } from './docker-compose-types';

export const LunaSecStackEnvironments = ['local-dependencies', 'demo', 'dev', 'tests'] as const;
export type LunaSecStackEnvironment = typeof LunaSecStackEnvironments[number];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

type LunaSecService =
  | 'localstack'
  | 'localstack-proxy'
  | 'lunasec-cli'
  | 'secure-frame-iframe'
  | 'application-front-end'
  | 'application-back-end'
  | 'tokenizer-backend'
  | 'integration-test';

interface ComposeService {
  name: string;
  config: DefinitionsService | null;
}

interface healthCheckOptions {
  endpoint?: string;
  protocol?: string;
  composeOptions?: {
    test?: string[];
    timeout?: string;
    interval?: string;
    retries?: number;
  };
}

function serviceHealthCheck(port: number, options?: healthCheckOptions) {
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

function composeServicePorts(ports: number[]): DefinitionsService {
  return {
    ports: ports.map((port) => {
      return {
        target: port,
        published: port,
      };
    }),
  };
}

const demoDockerFile = 'js/docker/demo.dockerfile';

const localstackImage = 'localstack/localstack:0.12.19';

export class LunaSecStackDockerCompose {
  env: LunaSecStackEnvironment = 'dev';
  localBuild = false;
  stackConfigOptions: DevelopmentConfigOptions;

  constructor(
    env: LunaSecStackEnvironment,
    stackVersion: string,
    localBuild: boolean,
    stackConfigOptions?: LunaSecStackConfigOptions
  ) {
    this.env = env;
    this.localBuild = localBuild;

    const devConfigOptions = stackConfigOptions ? stackConfigOptions.development : {};
    this.stackConfigOptions = {
      ...devConfigOptionsDefaults,
      ...devConfigOptions,
    };

    if (this.stackConfigOptions.sessionJWKSURL === '') {
      this.stackConfigOptions.sessionJWKSURL = `${this.stackConfigOptions.applicationBackEnd}/.lunasec/jwks.json`;
    }
  }

  dockerImage(name: string) {
    const tag: string = version;
    return {
      image: `lunasec/${name}:${tag}`,
    };
  }

  dockerfileTarget(dockerfile: string, target: string): DefinitionsService {
    return {
      build: {
        context: '.',
        dockerfile,
        target,
      },
    };
  }

  baseServiceConfig(name: LunaSecService, excludeEnv?: boolean): DefinitionsService {
    return {
      hostname: name,
      ...(excludeEnv ? {} : { env_file: ['.env.docker'] }),
    };
  }

  localstack() {
    const name: LunaSecService = 'localstack';

    const localstackPort = 4566;

    return {
      name,
      config: {
        ...this.baseServiceConfig(name, true),
        image: localstackImage,
        environment: [
          'SERVICES=s3,dynamodb,secretsmanager,sts,cloudformation,cloudwatch',
          // "DEBUG=1",
          'AWS_ACCESS_KEY_ID=test',
          'AWS_SECRET_ACCESS_KEY=test',
        ],
        volumes: ['/tmp/localstack:/tmp/localstack'],
        healthcheck: serviceHealthCheck(localstackPort, {
          endpoint: '/health',
        }),
        ...composeServicePorts([localstackPort]),
      },
    };
  }

  localstackProxy(): ComposeService {
    const name: LunaSecService = 'localstack-proxy';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
    };

    const localBuildConfig = {
      build: {
        context: '.',
        dockerfile: 'js/docker/httpsproxy.dockerfile',
      },
    };

    const proxyPort = 4568;

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        depends_on: {
          [this.localstack().name]: {
            condition: 'service_healthy',
          },
        },
        healthcheck: serviceHealthCheck(4568, {
          composeOptions: {
            test: ['CMD-SHELL', `curl -k https://localhost:4568`],
          },
        }),
        ...composeServicePorts([proxyPort]),
      },
    };
  }

  secureFrameIFrameService(): ComposeService {
    const name: LunaSecService = 'secure-frame-iframe';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
    };
    // TODO(forrest): why are we splatting these?
    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
    };

    const secureFramePort = 8000;

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(secureFramePort),
        ...composeServicePorts([secureFramePort]),
      },
    };
  }

  applicationFrontEnd(): ComposeService {
    const name: LunaSecService = 'application-front-end';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
    };

    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
    };

    const frontEndPort = 3000;

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(frontEndPort),
        ...composeServicePorts([frontEndPort]),
      },
    };
  }

  applicationBackEnd(): ComposeService {
    const name: LunaSecService = 'application-back-end';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
    };

    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
    };

    const expressAppPort = 3001;
    const graphqlAppPort = 3002;
    const simpleTokenizerAppPort = 3003;

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(3001),
        ...composeServicePorts([expressAppPort, graphqlAppPort, simpleTokenizerAppPort]),
      },
    };
  }

  buildMountPath(targetPath: string): string {
    const hostDir = process.env.HOST_MACHINE_PWD;
    const outputBasePath = hostDir && hostDir !== '' ? hostDir : './';
    const buildPath = path.join(outputBasePath, targetPath);
    return outputBasePath === './' ? `./${buildPath}` : buildPath;
  }

  lunasecCli(): ComposeService {
    const name: LunaSecService = 'lunasec-cli';

    const awsResourcesPath = this.buildMountPath('outputs/');

    const outputMount = `${awsResourcesPath}:/outputs/`;

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
      volumes: [outputMount],
    };

    const configSourcePath = this.buildMountPath('js/sdks/packages/cli/config/lunasec/');

    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
      volumes: [`${configSourcePath}:/config/lunasec/`, outputMount],
    };

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        command: 'deploy --local --output /outputs/aws_resources.json',
        depends_on: {
          [this.localstackProxy().name]: {
            condition: 'service_healthy',
          },
        },
      },
    };
  }

  tokenizerBackEnd(): ComposeService {
    const name: LunaSecService = 'tokenizer-backend';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
    };

    const localBuildConfig = {
      build: {
        context: 'go/',
        dockerfile: 'docker/tokenizerbackend.dockerfile',
        args: {
          tag: 'dev',
          version: version,
        },
      },
    };

    const tokenizerPort = 37766;

    const awsResourcesPath = this.buildMountPath('outputs/');
    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        volumes: [`${awsResourcesPath}:/config/tokenizerbackend/outputs/`],
        depends_on: {
          [this.lunasecCli().name]: {
            condition: 'service_completed_successfully',
          },
          // if we are in demo mode, then have application backend as dependency
          ...(this.env === 'demo'
            ? {
                [this.applicationBackEnd().name]: {
                  condition: 'service_healthy',
                },
              }
            : {}),
        },
        ...composeServicePorts([tokenizerPort]),
        healthcheck: serviceHealthCheck(tokenizerPort),
      },
    };
  }

  integrationTest(): ComposeService {
    const name: LunaSecService = 'integration-test';

    const localBuildConfig: DefinitionsService = {
      ...this.dockerfileTarget(demoDockerFile, name),
      volumes: ['/tmp/.X11-unix:/tmp/.X11-unix', '/videos:/repo/js/demo-apps/packages/react-front-end/cypress/videos'],
      depends_on: {
        [this.secureFrameIFrameService().name]: {
          condition: 'service_healthy',
        },
        [this.applicationFrontEnd().name]: {
          condition: 'service_healthy',
        },
        [this.applicationBackEnd().name]: {
          condition: 'service_healthy',
        },
        [this.tokenizerBackEnd().name]: {
          condition: 'service_healthy',
        },
      },
    };

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...localBuildConfig,
      },
    };
  }

  getStackServices(): ComposeService[] | null {
    const localDependencies = [this.localstack(), this.localstackProxy(), this.lunasecCli()];

    const tokenizerBackendServices = [...localDependencies, this.tokenizerBackEnd(), this.secureFrameIFrameService()];

    const demoServices = [...tokenizerBackendServices, this.applicationFrontEnd(), this.applicationBackEnd()];

    const testsServices = [...demoServices, this.integrationTest()];

    if (this.env === 'local-dependencies') {
      return localDependencies;
    }

    if (this.env === 'dev') {
      return tokenizerBackendServices;
    }

    if (this.env === 'demo') {
      return demoServices;
    }

    if (this.env === 'tests') {
      return testsServices;
    }
    return null;
  }

  getProject(): ComposeSpecification {
    const services = this.getStackServices();
    if (services === null) {
      throw new Error(`unsupported stack environment ${this.env}`);
    }

    return {
      version: '3.8',
      services: {
        ...services.reduce((serviceDefs, service) => {
          if (service.config === null) return serviceDefs;
          return {
            ...serviceDefs,
            [service.name]: service.config,
          };
        }, {}),
      },
    };
  }

  getAuthProviderHostname() {
    if (this.env === 'demo') {
      return 'localhost';
    }
    if (this.env === 'tests') {
      return 'application-back-end';
    }
    return undefined;
  }

  getAuthenticationProviders(): Record<string, AuthProviderConfig> | undefined {
    const authProviderHostname = this.getAuthProviderHostname();
    if (authProviderHostname !== undefined) {
      return {
        'express-back-end': {
          url: `http://${authProviderHostname}:3001`,
        },
        'graphql-back-end': {
          url: `http://${authProviderHostname}:3002`,
        },
      };
    }
    return this.stackConfigOptions.authProviders;
  }

  getDockerEnv(): Record<string, string> {
    const localAuthProviders = this.getAuthenticationProviders();
    const authProviders = formatAuthenticationProviders(this.stackConfigOptions.applicationBackEnd, localAuthProviders);
    return {
      APPLICATION_FRONT_END: this.stackConfigOptions.applicationFrontEnd,
      AUTH_PROVIDERS: JSON.stringify(authProviders),
      LUNASEC_SIGNING_KEY: this.stackConfigOptions.signingKey,
      SESSION_JWKS_URL: this.stackConfigOptions.sessionJWKSURL,

      STAGE: 'DEV',
      TOKENIZER_URL: 'http://tokenizer-backend:37766',
      REACT_APP_TOKENIZER_URL: this.stackConfigOptions.tokenizerUrl,
      CDN_HOST: 'localhost:8000',
      AWS_DEFAULT_REGION: 'us-west-2',
      AWS_ACCESS_KEY_ID: 'test',
      AWS_SECRET_ACCESS_KEY: 'test',
      LOCALSTACK_URL: 'http://localhost:4566',
      LOCAL_HTTPS_PROXY: 'https://localstack-proxy:4568',
      LOCALSTACK_HOSTNAME: 'localstack',
    };
  }

  write(dir: string) {
    const dockerCompose = dump(this.getProject());
    const dockerDemoEnvPath = path.join(dir, `.env.docker`);
    const composePath = path.join(dir, `docker-compose.${this.env}.yaml`);

    writeFileSync(composePath, dockerCompose);

    const dockerEnv = this.getDockerEnv();

    const dockerEnvFile = Object.keys(dockerEnv)
      .map((k) => `${k}=${dockerEnv[k]}`)
      .join('\n');

    writeFileSync(dockerDemoEnvPath, dockerEnvFile);

    return composePath;
  }
}
