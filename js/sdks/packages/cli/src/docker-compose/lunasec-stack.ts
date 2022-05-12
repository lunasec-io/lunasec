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

import { AuthProviderConfig, LunaSecStackConfigOptions } from '../config/types';
import { awsResourcesOutputFile, debug } from '../constants/cli';
import { formatAuthenticationProviders } from '../utils/auth-providers';

import { demoDockerFile, localstackImage, LunaSecStackEnvironment, version } from './constants';
import { ComposeSpecification, DefinitionsService } from './lib/docker-compose-types';
import {
  baseServiceConfig,
  composeServicePorts,
  dockerfileTarget,
  dockerImageConfigFn,
  getLocalstackUrl,
  getStackConfigOptions,
  serviceHealthCheck,
} from './lunasec-common';
import { generateFrontEndDockerConfig } from './services/application-front-end';
import { generateNginxEnvConfig } from './services/nginx-demo';
import {
  ComposeService,
  LunaSecDockerEnv,
  LunaSecReactEnv,
  LunaSecService,
  LunaSecServiceCreationConfig,
  LunaSecServiceDependenciesEnv,
} from './types';

export class LunaSecStackDockerCompose {
  serviceCreationConfig!: LunaSecServiceCreationConfig;

  constructor(
    env: LunaSecStackEnvironment,
    stackVersion: string,
    localBuild: boolean,
    stackConfigOptions?: LunaSecStackConfigOptions
  ) {
    const environmentConfig = getStackConfigOptions(env, stackConfigOptions && stackConfigOptions.development);

    this.serviceCreationConfig = {
      environmentConfig: environmentConfig,
      env: env || 'dev',
      localBuild: localBuild,
      getBaseServiceConfig: baseServiceConfig,
      getDockerImageName: dockerImageConfigFn('lunasec/', version),
      getDockerfileTarget: dockerfileTarget,
    };
  }

  localstack() {
    const name: LunaSecService = 'localstack';

    const localstackPort = 4566;

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name, true),
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
      ...this.serviceCreationConfig.getDockerImageName(`${name}-demo`),
    };

    const localBuildConfig = {
      build: {
        context: '.',
        dockerfile: 'lunadefend/js/docker/httpsproxy.dockerfile',
      },
    };

    const proxyPort = 4568;

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...(this.serviceCreationConfig.localBuild ? localBuildConfig : dockerBuildConfig),
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
  nginxLiveDemo(reactEnv: LunaSecReactEnv): ComposeService {
    const nginxResourcesPatch = this.buildMountPath('js/internal-infrastructure/public-live-demo/demo-nginx.conf');

    return {
      name: 'nginx',
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig('nginx-live-demo'),
        image: 'nginx',
        depends_on: [
          this.localstack().name,
          this.localstackProxy().name,
          this.applicationBackEnd().name,
          this.applicationFrontEnd(reactEnv).name,
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
      ...this.serviceCreationConfig.getDockerImageName(`${name}-demo`),
    };
    // TODO(forrest): why are we splatting these?
    const localBuildConfig = {
      ...this.serviceCreationConfig.getDockerfileTarget(demoDockerFile, name),
    };

    const secureFramePort = 8000;

    const debugVolumes = debug ? ['./:/repo'] : [];

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...(this.serviceCreationConfig.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(secureFramePort),
        ...composeServicePorts([secureFramePort]),
        volumes: debugVolumes,
      },
    };
  }

  applicationFrontEnd(reactEnv: LunaSecReactEnv): ComposeService {
    return generateFrontEndDockerConfig(this.serviceCreationConfig, reactEnv);
  }

  applicationBackEnd(): ComposeService {
    const name: LunaSecService = 'application-back-end';

    const awsResourcesPath = this.buildMountPath('outputs/');

    const outputMount = `${awsResourcesPath}:/outputs/`;

    const dockerBuildConfig = {
      ...this.serviceCreationConfig.getDockerImageName(`${name}-demo`),
    };

    const localBuildConfig = {
      ...this.serviceCreationConfig.getDockerfileTarget(demoDockerFile, name),
    };

    const expressAppPort = 3001;
    const graphqlAppPort = 3002;
    const simpleTokenizerAppPort = 3003;

    const debugVolumes = debug ? ['./:/repo'] : [];

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...(this.serviceCreationConfig.localBuild ? localBuildConfig : dockerBuildConfig),
        healthcheck: serviceHealthCheck(3001),
        ...composeServicePorts([expressAppPort, graphqlAppPort, simpleTokenizerAppPort]),
        volumes: [...debugVolumes, outputMount],
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
      ...this.serviceCreationConfig.getDockerImageName(`${name}-demo`),
      volumes: [outputMount],
    };

    const localBuildConfig = {
      ...this.serviceCreationConfig.getDockerfileTarget(demoDockerFile, name),
      volumes: [outputMount],
    };

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...(this.serviceCreationConfig.localBuild ? localBuildConfig : dockerBuildConfig),
        command: `deploy --local --output /outputs/${awsResourcesOutputFile}`,
        depends_on: [this.localstackProxy().name],
      },
    };
  }

  tokenizerBackEnd(): ComposeService {
    const name: LunaSecService = 'tokenizer-backend';

    const dockerBuildConfig = {
      ...this.serviceCreationConfig.getDockerImageName(`${name}-demo`),
    };

    const localBuildConfig = {
      build: {
        context: '.',
        dockerfile: 'go/docker/tokenizerbackend.dockerfile',
        args: {
          tag: 'dev',
          version: version,
        },
      },
    };

    const tokenizerPort = 37766;

    const awsResourcesPath = this.buildMountPath('outputs/');

    const dependsOnServices = [this.lunasecCli().name];

    if (this.serviceCreationConfig.env === 'demo') {
      dependsOnServices.push(this.applicationBackEnd().name);
    }

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...(this.serviceCreationConfig.localBuild ? localBuildConfig : dockerBuildConfig),
        volumes: [`${awsResourcesPath}:/config/tokenizerbackend/outputs/`],
        depends_on: dependsOnServices,
        ...composeServicePorts([tokenizerPort]),
        healthcheck: serviceHealthCheck(tokenizerPort),
      },
    };
  }

  integrationTest(reactEnv: LunaSecReactEnv): ComposeService {
    const name: LunaSecService = 'integration-test';

    const debugEntrypoint = debug
      ? {
          entrypoint: 'yarn run test:e2e:docker',
        }
      : {};

    const debugVolumes = debug ? ['./:/repo'] : [];

    const debugWorkingDir = debug ? { working_dir: '/repo/lunadefend/js/demo-apps/packages/react-front-end' } : {};

    const localBuildConfig: DefinitionsService = {
      ...this.serviceCreationConfig.getDockerfileTarget(demoDockerFile, name),
      ...debugEntrypoint,
      ...debugWorkingDir,
      volumes: [
        '/tmp/.X11-unix:/tmp/.X11-unix',
        '/videos:/repo/lunadefend/js/demo-apps/packages/react-front-end/cypress/videos',
        ...debugVolumes,
      ],
      depends_on: [
        this.secureFrameIFrameService().name,
        this.applicationFrontEnd(reactEnv).name,
        this.applicationBackEnd().name,
        this.tokenizerBackEnd().name,
      ],
    };

    return {
      name,
      config: {
        ...this.serviceCreationConfig.getBaseServiceConfig(name),
        ...localBuildConfig,
      },
    };
  }

  getStackServices(reactEnv: LunaSecReactEnv | undefined): ComposeService[] | null {
    const env = this.serviceCreationConfig.env;

    if (env === 'production') {
      return null;
    }

    const localDependencies = [this.localstack(), this.localstackProxy(), this.lunasecCli()];

    if (env === 'local-dependencies') {
      return localDependencies;
    }

    const tokenizerBackendServices = [...localDependencies, this.tokenizerBackEnd(), this.secureFrameIFrameService()];

    if (env === 'dev') {
      return tokenizerBackendServices;
    }

    if (!reactEnv) {
      throw new Error('Unable to create stack service config without React Environment config');
    }

    const demoServices = [...tokenizerBackendServices, this.applicationFrontEnd(reactEnv), this.applicationBackEnd()];

    if (env === 'demo') {
      return demoServices;
    }

    const hostedLiveDemoServices = [...demoServices, this.nginxLiveDemo(reactEnv)];

    if (env === 'hosted-live-demo') {
      return hostedLiveDemoServices;
    }

    const testsServices = [...demoServices, this.integrationTest(reactEnv)];

    if (env === 'tests') {
      return testsServices;
    }

    throw new Error('Unknown environment to configure Docker services for');
  }

  getProject(reactEnv: LunaSecReactEnv | undefined): ComposeSpecification {
    const services = this.getStackServices(reactEnv);
    if (services === null) {
      throw new Error(`unsupported stack environment ${this.serviceCreationConfig.env}`);
    }

    return {
      version: '3.8',
      services: {
        ...services.reduce((serviceDefs, service) => {
          if (service.config === null) {
            return serviceDefs;
          }
          return {
            ...serviceDefs,
            [service.name]: service.config,
          };
        }, {}),
      },
    };
  }

  getSecureFrameHostname() {
    const env = this.serviceCreationConfig.env;

    if (env === 'tests') {
      return {
        internalHostname: 'http://secure-frame-iframe:8000',
        externalHostname: 'http://secure-frame-iframe:8000',
      };
    }

    if (env === 'demo') {
      return {
        internalHostname: 'http://secure-frame-iframe:8000',
        externalHostname: 'http://localhost:8000',
      };
    }

    if (env === 'hosted-live-demo') {
      return {
        internalHostname: 'http://secure-frame-iframe:8000',
        externalHostname: 'https://secure-frame.lunasec.dev',
      };
    }

    return {
      internalHostname: 'http://localhost:8000',
      externalHostname: 'http://localhost:8000',
    };
  }

  getAuthenticationProviders(): Record<string, AuthProviderConfig> | undefined {
    function generateAuthProviderConfig(expressUrl: string, graphqlUrl: string) {
      return {
        'express-back-end': {
          url: expressUrl,
        },
        'graphql-back-end': {
          url: graphqlUrl,
        },
      };
    }

    if (this.serviceCreationConfig.env === 'hosted-live-demo') {
      return generateAuthProviderConfig(`https://express.lunasec.dev`, `https://graphql.lunasec.dev`);
    }

    const port = 3001;

    if (this.serviceCreationConfig.env === 'demo') {
      return generateAuthProviderConfig(`http://localhost:${port}`, `http://localhost:${port}`);
    }

    if (this.serviceCreationConfig.env === 'tests') {
      return generateAuthProviderConfig(`http://application-back-end:${port}`, `http://application-back-end:${port}`);
    }

    return this.serviceCreationConfig.environmentConfig.authProviders;
  }

  getFrontEndReactEnv(env: 'hosted-live-demo' | 'demo' | 'tests'): LunaSecReactEnv {
    if (env === 'hosted-live-demo') {
      return {
        REACT_APP_EXPRESS_URL: `https://express.lunasec.dev`,
        REACT_APP_GRAPHQL_URL: `https://graphql.lunasec.dev`,
        REACT_APP_SIMPLE_TOKENIZER_URL: `https://simple.lunasec.dev`,
        REACT_APP_TOKENIZER_URL: 'https://tokenizer.lunasec.dev',
      };
    }

    const expressPort = 3001;
    const graphqlPort = 3002;
    const simpleTokenizerPort = 3003;

    if (env === 'demo') {
      return {
        REACT_APP_EXPRESS_URL: `http://localhost:${expressPort}`,
        REACT_APP_GRAPHQL_URL: `http://localhost:${graphqlPort}`,
        REACT_APP_SIMPLE_TOKENIZER_URL: `http://localhost:${simpleTokenizerPort}`,
        REACT_APP_TOKENIZER_URL: 'http://localhost:37766',
      };
    }

    if (env === 'tests') {
      return {
        REACT_APP_EXPRESS_URL: `http://application-back-end:${expressPort}`,
        REACT_APP_GRAPHQL_URL: `http://application-back-end:${graphqlPort}`,
        REACT_APP_SIMPLE_TOKENIZER_URL: `http://application-back-end:${simpleTokenizerPort}`,
        REACT_APP_TOKENIZER_URL: 'http://tokenizer-backend:37766',
      };
    }

    throw new Error('Invalid environment for generating React environment config');
  }

  getDockerDevEnv(): LunaSecDockerEnv {
    const { environmentConfig } = this.serviceCreationConfig;
    const { applicationBackEnd, applicationFrontEnd, signingKey, sessionJwksUrl } = environmentConfig;

    const localAuthProviders = this.getAuthenticationProviders();
    const authProviders = formatAuthenticationProviders(applicationBackEnd, localAuthProviders);
    const display = debug && { DISPLAY: ':99' };

    const localstackUrl = getLocalstackUrl(this.serviceCreationConfig.env);
    const localstackHttpsProxyUrl = 'https://localstack-proxy:4568';
    const tokenizerHost = 'http://tokenizer-backend:37766';
    const cdnHostConfig = this.getSecureFrameHostname();

    // parse a URL into a URL object
    const cdnExternalUrl = new URL(cdnHostConfig.externalHostname);

    const proto = cdnExternalUrl.protocol.replace(':', '');
    const host = cdnExternalUrl.host;

    const config: LunaSecDockerEnv = {
      ...display,

      APPLICATION_FRONT_END: applicationFrontEnd,
      AUTH_PROVIDERS: JSON.stringify(authProviders),
      LUNASEC_SIGNING_KEY: signingKey,
      SESSION_JWKS_URL: sessionJwksUrl,

      STAGE: 'DEV',
      LUNASEC_STACK_ENV: this.serviceCreationConfig.env,
      TOKENIZER_URL: tokenizerHost,

      CDN_HOST: host,
      CDN_PROTOCOL: proto,
      // TODO (jwortley) Pass in HTTPS from the main config here.
      // CDN_PROTOCOL: cdnHostConfig.internalHostname.split(':')[0],

      LOCALSTACK_URL: localstackUrl,
      LOCAL_HTTPS_PROXY: localstackHttpsProxyUrl,
      LOCALSTACK_HOSTNAME: 'localstack',

      AWS_DEFAULT_REGION: 'us-west-2',
      AWS_ACCESS_KEY_ID: 'test',
      AWS_SECRET_ACCESS_KEY: 'test',

      CYPRESS_REMOTE_DEBUGGING_PORT: '42042',
    };

    return config;
  }

  getDependenciesEnv(dockerDevEnv: LunaSecDockerEnv): LunaSecServiceDependenciesEnv {
    const { environmentConfig } = this.serviceCreationConfig;
    const { applicationFrontEnd, applicationBackEnd } = environmentConfig;
    const { TOKENIZER_URL, CDN_HOST, LOCAL_HTTPS_PROXY } = dockerDevEnv;

    // These values are for the hosts that the Integration Test depends on in
    // order to start up. It's passed via Env vars as a comma separated list.
    const integrationTestDependenciesList = [TOKENIZER_URL, applicationFrontEnd, applicationBackEnd, CDN_HOST];

    const integrationTestDependencies = integrationTestDependenciesList.join(',');

    return {
      WAIT_FOR_TIMEOUT: 300,
      DEPENDENCIES__CLI: LOCAL_HTTPS_PROXY,
      DEPENDENCIES__INTEGRATION_TEST: integrationTestDependencies,
      DEPENDENCIES__LOCALSTACK_PROXY: TOKENIZER_URL,
    };
  }

  write(dir: string) {
    const env = this.serviceCreationConfig.env;

    // TODO (freeqaz) Remove `generateNginxEnvConfig` and use an externally merged config or something.
    const dockerEnv = generateNginxEnvConfig(env, this.getDockerDevEnv());
    const dependenciesEnv = this.getDependenciesEnv(dockerEnv);

    let reactEnv: LunaSecReactEnv | undefined = undefined;

    if (env === 'demo' || env === 'hosted-live-demo' || env === 'tests') {
      reactEnv = this.getFrontEndReactEnv(env);
    }

    const dockerCompose = dump(this.getProject(reactEnv));
    const dockerDemoEnvPath = path.join(dir, `.env.docker`);
    const composePath = path.join(dir, `docker-compose.${env}.yaml`);

    writeFileSync(composePath, dockerCompose);

    const outputEnvFile = {
      ...dockerEnv,
      ...reactEnv,
      ...dependenciesEnv,
    };

    const dockerEnvValues = Object.values(outputEnvFile);

    const dockerEnvFile = Object.keys(outputEnvFile)
      .map((k, i) => `${k}=${dockerEnvValues[i]}`)
      .join('\n');

    writeFileSync(dockerDemoEnvPath, dockerEnvFile);

    return composePath;
  }
}
