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
  hostedLiveDemoConfigOptionsDefaults,
  LunaSecStackConfigOptions,
  testsConfigOptionsDefaults,
} from '../config/types';
import { formatAuthenticationProviders } from '../utils/auth-providers';

import { ComposeSpecification, DefinitionsService } from './docker-compose-types';
import { generateNginxEnvConfig } from './generate-nginx-config';

export const LunaSecStackEnvironments = ['local-dependencies', 'demo', 'dev', 'hosted-live-demo', 'tests'] as const;
export type LunaSecStackEnvironment = typeof LunaSecStackEnvironments[number];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

const debug = process.env.DEBUG || false;

type LunaSecService =
  | 'localstack'
  | 'localstack-proxy'
  | 'lunasec-cli'
  | 'secure-frame-iframe'
  | 'application-front-end'
  | 'application-back-end'
  | 'tokenizer-backend'
  | 'integration-test'
  | 'nginx-live-demo';

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

function getStackConfigOptions(env: LunaSecStackEnvironment, configOptions?: DevelopmentConfigOptions) {
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

    const devConfigOptions = stackConfigOptions ? stackConfigOptions.development : undefined;
    this.stackConfigOptions = getStackConfigOptions(env, devConfigOptions);

    if (this.stackConfigOptions.sessionJwksUrl === '') {
      this.stackConfigOptions.sessionJwksUrl = `${this.stackConfigOptions.applicationBackEnd}/.lunasec/jwks.json`;
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
        depends_on: [this.localstack().name],
        healthcheck: serviceHealthCheck(4568, {
          composeOptions: {
            test: ['CMD-SHELL', `curl -k https://localhost:4568`],
          },
        }),
        ...composeServicePorts([proxyPort]),
      },
    };
  }

  /**
   * This service is only used for the hosted live demo of LunaSec.
   * TODO (freeqaz) Migrate this out to another file for better code quality.
   */
  nginxLiveDemo(): ComposeService {
    const nginxResourcesPatch = this.buildMountPath('js/internal-infrastructure/public-live-demo/demo-nginx.conf');

    return {
      name: 'nginx',
      config: {
        ...this.baseServiceConfig('nginx-live-demo'),
        image: 'nginx',
        depends_on: [
          this.localstack().name,
          this.localstackProxy().name,
          this.applicationBackEnd().name,
          this.applicationFrontEnd().name,
          this.tokenizerBackEnd().name,
          this.secureFrameIFrameService().name,
        ],
        healthcheck: serviceHealthCheck(80, {
          composeOptions: {
            test: ['CMD-SHELL', 'curl -k http://localhost:80'],
          },
        }),
        volumes: [`${nginxResourcesPatch}:/etc/nginx/conf.d/default.conf:ro`],
        ...composeServicePorts([80]),
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

    const debugVolumes = debug ? ['./:/repo'] : [];

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(secureFramePort),
        ...composeServicePorts([secureFramePort]),
        volumes: debugVolumes,
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

    const debugVolumes = debug ? ['./:/repo'] : [];

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(frontEndPort),
        ...composeServicePorts([frontEndPort]),
        volumes: debugVolumes,
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

    const debugVolumes = debug ? ['./:/repo'] : [];

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(3001),
        ...composeServicePorts([expressAppPort, graphqlAppPort, simpleTokenizerAppPort]),
        volumes: debugVolumes,
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

    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
      volumes: [outputMount],
    };

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        command: 'deploy --local --output /outputs/aws_resources.json',
        depends_on: [this.localstackProxy().name],
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

    const dependsOnServices = [this.lunasecCli().name];

    if (this.env === 'demo') {
      dependsOnServices.push(this.applicationBackEnd().name);
    }

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        volumes: [`${awsResourcesPath}:/config/tokenizerbackend/outputs/`],
        depends_on: dependsOnServices,
        ...composeServicePorts([tokenizerPort]),
        healthcheck: serviceHealthCheck(tokenizerPort),
      },
    };
  }

  integrationTest(): ComposeService {
    const name: LunaSecService = 'integration-test';

    const debugEntrypoint = debug
      ? {
          entrypoint: 'yarn run test:open',
        }
      : {};

    const debugVolumes = debug ? ['./:/repo'] : [];

    const debugWorkingDir = debug ? { working_dir: '/repo/js/demo-apps/packages/react-front-end' } : {};

    const localBuildConfig: DefinitionsService = {
      ...this.dockerfileTarget(demoDockerFile, name),
      ...debugEntrypoint,
      ...debugWorkingDir,
      volumes: [
        '/tmp/.X11-unix:/tmp/.X11-unix',
        '/videos:/repo/js/demo-apps/packages/react-front-end/cypress/videos',
        ...debugVolumes,
      ],
      depends_on: [
        this.secureFrameIFrameService().name,
        this.applicationFrontEnd().name,
        this.applicationBackEnd().name,
        this.tokenizerBackEnd().name,
      ],
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

    const hostedLiveDemoServices = [...demoServices, this.nginxLiveDemo()];

    if (this.env === 'local-dependencies') {
      return localDependencies;
    }

    if (this.env === 'dev') {
      return tokenizerBackendServices;
    }

    if (this.env === 'demo') {
      return demoServices;
    }

    if (this.env === 'hosted-live-demo') {
      return hostedLiveDemoServices;
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

  getBackEndHostname() {
    if (this.env === 'demo') {
      return 'localhost';
    }
    if (this.env === 'tests') {
      return 'application-back-end';
    }
    return undefined;
  }

  getLocalstackHostname() {
    if (this.env === 'tests' || this.env === 'hosted-live-demo') {
      return 'localstack';
    }
    return 'localhost';
  }

  getSecureFrameHostname() {
    if (this.env === 'tests' || this.env === 'hosted-live-demo') {
      return 'secure-frame-iframe';
    }
    return 'localhost';
  }

  getAuthenticationProviders(): Record<string, AuthProviderConfig> | undefined {
    if (this.env === 'hosted-live-demo') {
      return {
        'express-back-end': {
          url: `https://express.lunasec.dev`,
        },
        'graphql-back-end': {
          url: `https://graphql.lunasec.dev`,
        },
      };
    }
    const authProviderHostname = this.getBackEndHostname();
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

  getApplicationBackEndEnvUrls() {
    if (this.env === 'hosted-live-demo') {
      return {
        REACT_APP_EXPRESS_URL: `https://express.lunasec.dev`,
        REACT_APP_GRAPHQL_URL: `https://graphql.lunasec.dev`,
        REACT_APP_SIMPLE_TOKENIZER_URL: `https://simple.lunasec.dev`,
      };
    }

    const backEndHostname = this.getBackEndHostname();
    if (backEndHostname !== undefined) {
      return {
        REACT_APP_EXPRESS_URL: `http://${backEndHostname}:3001`,
        REACT_APP_GRAPHQL_URL: `http://${backEndHostname}:3002`,
        REACT_APP_SIMPLE_TOKENIZER_URL: `http://${backEndHostname}:3003`,
      };
    }
    return undefined;
  }

  getDockerEnv(): Record<string, string> {
    const localAuthProviders = this.getAuthenticationProviders();
    const authProviders = formatAuthenticationProviders(this.stackConfigOptions.applicationBackEnd, localAuthProviders);
    const display: Record<string, string> = debug ? { DISPLAY: ':0' } : {};
    const applicationBackEndUrls = this.getApplicationBackEndEnvUrls();

    const localstackUrl = `http://${this.getLocalstackHostname()}:4566`;
    const localstackHttpsProxyUrl = 'https://localstack-proxy:4568';
    const tokenizerHost = 'http://tokenizer-backend:37766';
    const cdnHost = `${this.getSecureFrameHostname()}:8000`;

    // These values are for the hosts that the Integration Test depends on in
    // order to start up. It's passed via Env vars as a comma separated list.
    const integrationTestDependencies = [
      tokenizerHost,
      applicationBackEndUrls?.REACT_APP_EXPRESS_URL,
      applicationBackEndUrls?.REACT_APP_GRAPHQL_URL,
      applicationBackEndUrls?.REACT_APP_SIMPLE_TOKENIZER_URL,
      this.stackConfigOptions.applicationFrontEnd,
      cdnHost,
    ]
      .filter((t) => t)
      .join(',');

    return {
      ...applicationBackEndUrls,
      ...display,

      APPLICATION_FRONT_END: this.stackConfigOptions.applicationFrontEnd,
      AUTH_PROVIDERS: JSON.stringify(authProviders),
      LUNASEC_SIGNING_KEY: this.stackConfigOptions.signingKey,
      SESSION_JWKS_URL: this.stackConfigOptions.sessionJwksUrl,

      STAGE: 'DEV',
      LUNASEC_STACK_ENV: this.env,
      TOKENIZER_URL: tokenizerHost,
      REACT_APP_TOKENIZER_URL: this.stackConfigOptions.tokenizerUrl,
      CDN_HOST: cdnHost,
      LOCALSTACK_URL: localstackUrl,
      LOCAL_HTTPS_PROXY: localstackHttpsProxyUrl,
      LOCALSTACK_HOSTNAME: 'localstack',

      AWS_DEFAULT_REGION: 'us-west-2',
      AWS_ACCESS_KEY_ID: 'test',
      AWS_SECRET_ACCESS_KEY: 'test',

      CYPRESS_REMOTE_DEBUGGING_PORT: '42042',

      // Tell the services to wait for each other for up this number of seconds
      WAIT_FOR_TIMEOUT: '300',

      // These services must wait for the other services before starting up.
      // They check if another service is up via a script that checks if a port is accessible.
      // The ports to check are passed like this with commas between values:
      // "some-host-name:8080,another-host:8001"
      DEPENDENCIES__CLI: localstackHttpsProxyUrl,
      DEPENDENCIES__INTEGRATION_TEST: integrationTestDependencies,
      DEPENDENCIES__LOCALSTACK_PROXY: localstackUrl,
    };
  }

  write(dir: string) {
    const dockerCompose = dump(this.getProject());
    const dockerDemoEnvPath = path.join(dir, `.env.docker`);
    const composePath = path.join(dir, `docker-compose.${this.env}.yaml`);

    writeFileSync(composePath, dockerCompose);

    // TODO (freeqaz) Create a function for every environment that we support and
    // have it merge in all of them using something like Ramda.pipe()
    // As long as every function is referentially transparent, it's a clean abstraction.
    const dockerEnv = generateNginxEnvConfig(this.env, this.getDockerEnv());

    const dockerEnvFile = Object.keys(dockerEnv)
      .map((k) => `${k}=${dockerEnv[k]}`)
      .join('\n');

    writeFileSync(dockerDemoEnvPath, dockerEnvFile);

    return composePath;
  }
}
