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

import { ComposeSpecification, DefinitionsService } from './docker-compose-types';

export const LunaSecStackEnvironments = ['dev', 'demo', 'tests'] as const;
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

export interface LunaSecStackConfigOptions {
  applicationFrontEnd: string;
  applicationBackEnd: string;
  sessionJWKSURL: string;
  signingKey: string;
}

const devConfigOptionsDefaults: LunaSecStackConfigOptions = {
  applicationFrontEnd: 'http://localhost:3000',
  applicationBackEnd: 'http://localhost:3001',
  sessionJWKSURL: '',
  signingKey:
    'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQ1dmV1pXYWdoR01NWkQKaWxWeHl3SG5JbmNNVWkxUjczTXNWVGlkcXF4OFZnbkxBcklDd2ZqekJRZVFGZlJsRzZ1Y1FTaWEzR2FQY1gwSAo1MW41UXNWN2NtY1d0WU9NM3RjNFhIS2ZjbDllUEJWOFI4RFlYRmdzdkdEQm5GOFVXOXhZS0hhT2gwQ1U4N3JvCnNHMTVKc0NseVc5S2VudmhrY0pJU3Z3TVVLL3N0VG5SM1NnZjdHR3MzV0hwZ3U4c1l0dDBVVm1tL0RWMnNGcFgKc28yODVIeTNpb3h0eE4wT1BsOVk4R1lwbmxwamg3ZWtwZnoxSUZ6d0sxaDhGeDlJenU3aVRGMFlpMzZlUnJiMQpMSXBKZ0hGWXR6aHNVd283QmFQRFNCNzh0dWZDMFVTVkQ1SEpPanNCS1A2ZzByY0pFNUUwQnJGajQ3UHlvdlRSCnk3QzZqZG85QWdNQkFBRUNnZ0VBVGxSM01BT0F5d2dZS28rV2FlU0EyUTNYYVZKY3hJa2VLYlV5QXQ4VGFLUmYKOUlzeW5MemFGNlJHaTNqaC9MNnFWR3FWK0FWQVhPbDFhdWZBclQxVURTMCsrMUwvWmhPWGNuNnNLdElkVWE5MApmM3ZacE1Sc0lOenNmOW9rb3pRdFBMWFMvOXptZ0tGY2FFRnN1ZUt4NDVrMWxFNnNySHh4NDY4a0FrVDlUUGM3CkJpQ3d2REMwM1VCUUdJaFdESGZjZzJ5aTA3VzVLb01VNjZSS0ZxMk5WT1NwdW1Tb2VyMjVNLytKNFZCc05mb3MKeEM0eEc3aWRTNzZZa21JalBMZnZjelZRUk9xNDlnblBnMHE2SWpBZHN2TVNjMHBhYUlYNkVmRUU4K2Ewd3VoWgpqTWUxQWd1V09OMEs0ajZXeHIrT0UwMEJJNjB0akhNaVdsU2JNU3R6QVFLQmdRREhlSHdOUWQ4dE5tYlhPOXB4CmxtdFVwNENOZ09FZEp6b2ZlOG9tRzl2K2gxNGxUcjFOVkZPT3VaSFFsZUFXZnl6ZDZFdmpicDY1VU4wa1h0QnEKOFllNHY5dkJ3S2thL3d1ODJPS0dKMmQ3aTF4Z2U3YjFiSEt4VVQ2Y0F2bFU4cmYzQTEwdHp0MHNMaVlEbythTQo3R25JMkZVU2t3OTg1YU5SNnFKSUtTcFJHd0tCZ1FEQkkyQ3hkd1F3L3ZNVVZvcGN4TzZTMThzNklvODdJV0dVCnpnZXpqZUpIYW1VV3JaSWJRZ2txRU1aWVZSdFhpVXBDZEJySHpNd2pXWFBmN3pVQzRPdWZlZzhVYkJneTNhWUsKMHBzMHlXZTY4VUJpOEdTK2M0M2lhb0pnSGVwcW9ydHVUNlZvdFRJaEN0SnhKYTFNTEZoMHBQbitCN2RFakFocApLbmk4azcyUGh3S0JnUUNTT3p6T1IwVkNrd2hQcjl4VHUwOVNEejRKL3JxSnNkRkZkVzNjQkQ2Q1dXRG1mdFArCmxkeHYzSkVPVm1HaWZIYzY4MnAzQUFpeW1KcVdhRC9vdHNxbDRWbE1zRjRJb1lOTVhiK3JVOFhrWjJWQWdsRzkKbUZSNHM3UHZrYXFSNFNLR250dTNrbGpJWThpUWtKNmJIMUhwNE5aMU9JUjVMcXhOaUhLUjdrUE1rd0tCZ0NmTQpvNE5PZEVXb2MrenYvR2tyaDhJb3g4OCtDZWYwZEFoWEFJMUdvcWQyekVnRkVvT2Rjd2dCRnU1aTgxUnhqU1R1CmlnbzhNS0RrTVJXblZIUTRaeldnMEhTejViU3RxaWEyeVpieUhmY08rZWFwaFFrZUJOSHdndGROc3Qyd2xSRWgKUm9PeU94ZEdCS0dlVXZ6TWNwbnUyVGs0MjlJN1RReG0zU1IzQ1d3SEFvR0JBS1FIZitncCtFUmFOcDExdU1OQgo0b3hpbHhwaklqeE8wOTE2WnkyUWFxTjlqSGV1RFc5YmdyWDBjQm1kdExPMjdRZE9EekVwcloyd1h5SDRDSGkxClRsQzdnSksvYlNUSnYyQnpwcUtjOVVQbXpiMnhTeFJaRnBiQkp3KytnRnF4UFlST0NqRWpIc2lmaWJxSmFPdzAKZkN3dzA5SlJDTkVsUU40R2FwRElXUlQ5Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K',
};

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
  stackConfigOptions: LunaSecStackConfigOptions;

  constructor(
    env: LunaSecStackEnvironment,
    stackVersion: string,
    localBuild: boolean,
    stackConfigOptions?: LunaSecStackConfigOptions
  ) {
    this.env = env;
    this.localBuild = localBuild;
    this.version = stackVersion;
    this.stackConfigOptions = {
      ...devConfigOptionsDefaults,
      ...stackConfigOptions,
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

  lunasecCli(): ComposeService {
    const name: LunaSecService = 'lunasec-cli';

    const outputMount = './outputs/:/outputs/';

    const dockerBuildConfig = {
      ...this.dockerImage(`${name}-demo`),
      volumes: [outputMount],
    };

    const localBuildConfig = {
      ...this.dockerfileTarget(demoDockerFile, name),
      volumes: ['./js/sdks/packages/cli/config/lunasec/:/config/lunasec/', outputMount],
    };

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        entrypoint: 'lunasec deploy --local --output /outputs/aws_resources.yaml',
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

    return {
      name,
      config: {
        ...this.baseServiceConfig(name),
        ...(this.localBuild ? localBuildConfig : dockerBuildConfig),
        volumes: ['./outputs/aws_resources.yaml:/config/tokenizerbackend/aws_resources.yaml'],
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
    const tokenizerBackendServices = [
      this.localstack(),
      this.localstackProxy(),
      this.secureFrameIFrameService(),
      this.lunasecCli(),
      this.tokenizerBackEnd(),
    ];

    const demoServices = [...tokenizerBackendServices, this.applicationFrontEnd(), this.applicationBackEnd()];

    const testsServices = [...demoServices, this.integrationTest()];

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
