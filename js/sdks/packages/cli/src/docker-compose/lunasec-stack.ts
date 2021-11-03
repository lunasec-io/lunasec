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

import { DevConfigOptions, devConfigOptionsDefaults, LunaSecStackConfigOptions } from '../config/types';

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
  composeOptions?: {
    test?: string[];
    timeout?: string;
    interval?: string;
    retries?: number;
  };
}

function serviceHealthCheck(port: number, options?: healthCheckOptions) {
  const endpoint = options ? (options.endpoint ? options.endpoint : '') : '';
  const composeOptions = options ? options.composeOptions : {};
  return {
    test: ['CMD-SHELL', `curl -k http://localhost:${port}${endpoint}`],
    timeout: '30s',
    interval: '10s',
    retries: 10,
    ...composeOptions,
  };
}

const demoDockerFile = 'js/docker/demo.dockerfile';

const localstackImage = 'localstack/localstack:0.12.19';

export class LunaSecStackDockerCompose {
  env: LunaSecStackEnvironment = 'dev';
  localBuild = false;
  version: string;
  stackConfigOptions: DevConfigOptions;

  constructor(
    env: LunaSecStackEnvironment,
    stackVersion: string,
    localBuild: boolean,
    stackConfigOptions?: LunaSecStackConfigOptions
  ) {
    this.env = env;
    this.localBuild = localBuild;
    this.version = stackVersion;

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
    const tag: string = this.version;
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
      network_mode: 'host',
      ...(excludeEnv ? {} : { env_file: ['.env.docker'] }),
    };
  }

  localstack() {
    const name: LunaSecService = 'localstack';

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
        healthcheck: serviceHealthCheck(4566, {
          endpoint: '/health',
        }),
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

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(8000),
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

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(3000),
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

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(3001),
      },
    };
  }

  buildMountPath(targetPath: string): string {
    const hostDir = process.env.HOST_MACHINE_PWD;
    const outputBasePath = hostDir && hostDir !== '' ? hostDir : './';
    return path.join(outputBasePath, targetPath);
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
        entrypoint: 'lunasec deploy --local --output /outputs/aws_resources.json',
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
        healthcheck: serviceHealthCheck(37766),
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

  getDockerEnv(): Record<string, string> {
    return {
      APPLICATION_FRONT_END: this.stackConfigOptions.applicationFrontEnd,
      APPLICATION_BACK_END: this.stackConfigOptions.applicationBackEnd,
      LUNASEC_SIGNING_KEY: this.stackConfigOptions.signingKey,
      SESSION_JWKS_URL: this.stackConfigOptions.sessionJWKSURL,

      STAGE: 'DEV',
      TOKENIZER_URL: 'http://localhost:37766',
      CDN_HOST: 'localhost:8000',
      AWS_DEFAULT_REGION: 'us-west-2',
      AWS_ACCESS_KEY_ID: 'test',
      AWS_SECRET_ACCESS_KEY: 'test',
      LOCALSTACK_URL: 'http://localhost:4566',
      LOCAL_HTTPS_PROXY: 'https://localhost:4568',
    };
  }

  write(dir: string) {
    const dockerCompose = dump(this.getProject());
    console.log('Writing generated docker compose file: ', dockerCompose);
    const dockerDemoEnvPath = path.join(dir, `.env.docker`);
    const composePath = path.join(dir, `docker-compose.${this.env}.yaml`);
    console.log('Writing to: ', composePath);
    //TODO:QUESTION FOR CHRIS: are we reading from the existing demo.dockerfile before creating this new one?  ask how this all works
    writeFileSync(composePath, dockerCompose);

    const dockerEnv = this.getDockerEnv();

    const dockerEnvFile = Object.keys(dockerEnv)
      .map((k) => `${k}=${dockerEnv[k]}`)
      .join('\n');

    writeFileSync(dockerDemoEnvPath, dockerEnvFile);

    return composePath;
  }
}
