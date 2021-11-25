import { doc } from 'prettier';

import { demoDockerFile } from '../constants';
import { composeServicePorts, serviceHealthCheck } from '../lunasec-common';
import { ComposeService, LunaSecReactEnv, LunaSecService, LunaSecServiceCreationConfig } from '../types';

import debug = doc.debug;

import { DefinitionsService } from '../lib/docker-compose-types';

export type FrontEndServingMode = 'dev' | 'static';

function getFrontEndDockerfileTargetName(name: string, servingMode: FrontEndServingMode) {
  if (servingMode === 'static') {
    return `${name}_serve-static`;
  }

  return name;
}

function generateEnvSpecificDockerConfigOptions(
  dockerComposeConfig: DefinitionsService,
  reactEnv: LunaSecReactEnv
): Partial<DefinitionsService> {
  const buildConfig = dockerComposeConfig.build !== '' ? dockerComposeConfig.build : {};

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
  reactEnv: LunaSecReactEnv,
  servingMode: FrontEndServingMode
): ComposeService {
  const name: LunaSecService = 'application-front-end';

  const dockerBuildConfig = {
    ...config.getDockerImageName(`${name}-demo`),
  };

  const dockerfileTarget = getFrontEndDockerfileTargetName(name, servingMode);

  const localBuildConfig = {
    ...config.getDockerfileTarget(demoDockerFile, dockerfileTarget),
  };

  const frontEndPort = 3000;

  const debugVolumes = debug ? ['./:/repo'] : [];

  return {
    name,
    config: {
      ...config.getBaseServiceConfig(name),
      ...(config.localBuild ? localBuildConfig : dockerBuildConfig),
      healthcheck: serviceHealthCheck(frontEndPort),
      ...composeServicePorts([frontEndPort]),
      volumes: debugVolumes,
      ...generateEnvSpecificDockerConfigOptions(),
    },
  };
}
