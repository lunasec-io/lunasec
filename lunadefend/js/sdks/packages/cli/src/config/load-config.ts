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
import findConfig from 'find-config';

import { LunaSecStackEnvironment } from '../docker-compose/constants';

import {
  deploymentConfigOptionsDefaults,
  devConfigOptionsDefaults,
  grantConfigOptionsDefaults,
  LunaSecStackConfigOptions,
  metricConfigOptionsDefaults,
} from './types';

export function loadLunaSecStackConfig(env?: LunaSecStackEnvironment): LunaSecStackConfigOptions | undefined {
  const onlyUseDefaults = env ? env === 'demo' || env === 'tests' : false;

  const configPath = findConfig('lunadefend.js');

  if (configPath === null) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath);
  const lunaseConfig = config as LunaSecStackConfigOptions;

  const productionConfig =
    lunaseConfig.production && !onlyUseDefaults ? lunaseConfig.production : { metrics: {}, grants: {} };
  const devConfig = lunaseConfig.development && !onlyUseDefaults ? lunaseConfig.development : { grants: {} };
  return {
    development: {
      ...devConfigOptionsDefaults,
      ...devConfig,
      grants: {
        ...grantConfigOptionsDefaults,
        ...devConfig.grants,
      },
    },
    production: {
      ...deploymentConfigOptionsDefaults,
      ...productionConfig,
      grants: {
        ...grantConfigOptionsDefaults,
        ...productionConfig.grants,
      },
      metrics: {
        ...metricConfigOptionsDefaults,
        ...productionConfig.metrics,
      },
    },
  };
}
