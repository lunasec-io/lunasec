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
import { debug } from '../../constants/cli';
import { demoDockerFile } from '../constants';
import { DefinitionsService } from '../lib/docker-compose-types';
import { composeServicePorts, serviceHealthCheck } from '../lunasec-common';
import { ComposeService, LunaSecReactEnv, LunaSecService, LunaSecServiceCreationConfig } from '../types';

export type FrontEndServingMode = 'dev' | 'static';

function generateEnvSpecificDockerConfigOptions(
  dockerComposeConfig: DefinitionsService,
  reactEnv: LunaSecReactEnv
): Partial<DefinitionsService> {
  const buildConfig = dockerComposeConfig.build !== undefined ? dockerComposeConfig.build : {};

  if (typeof buildConfig !== 'object') {
    throw new Error(
      'Unable to generate Docker Compose config to serve front end static assets. Build config must be an object.'
    );
  }

  return {
    ...dockerComposeConfig,
    build: {
      ...buildConfig,
      args: {
        ...buildConfig.args,
        REACT_APP_EXPRESS_URL: reactEnv.REACT_APP_EXPRESS_URL,
        REACT_APP_GRAPHQL_URL: reactEnv.REACT_APP_GRAPHQL_URL,
        REACT_APP_TOKENIZER_URL: reactEnv.REACT_APP_TOKENIZER_URL,
        REACT_APP_SIMPLE_TOKENIZER_URL: reactEnv.REACT_APP_SIMPLE_TOKENIZER_URL,
      },
    },
  };
}

export function generateFrontEndDockerConfig(
  config: LunaSecServiceCreationConfig,
  reactEnv: LunaSecReactEnv
): ComposeService {
  const name: LunaSecService = 'application-front-end';

  const dockerBuildConfig = {
    ...config.getDockerImageName(`${name}-demo`),
  };

  const localBuildConfig = {
    ...config.getDockerfileTarget(demoDockerFile, name),
  };

  if (config.localBuild) {
    localBuildConfig.command = ['build-and-serve-static', '-l', '3000'];
  }

  const frontEndPort = 3000;

  const debugVolumes = debug ? ['./:/repo'] : [];

  const baseDockerComposeConfig = {
    ...config.getBaseServiceConfig(name),
    ...(config.localBuild ? localBuildConfig : dockerBuildConfig),
    healthcheck: serviceHealthCheck(frontEndPort),
    ...composeServicePorts([frontEndPort]),
    volumes: debugVolumes,
  };

  return {
    name,
    config: generateEnvSpecificDockerConfigOptions(baseDockerComposeConfig, reactEnv),
  };
}
