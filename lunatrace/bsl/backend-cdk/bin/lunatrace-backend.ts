#!/usr/bin/env node
/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { stackInputsV1 } from '../inputs/stack-inputs-v1';
import { stackInputsV2 } from '../inputs/stack-inputs-v2';
import { StackInputs } from '../inputs/types';
import { LunatraceBackendStack } from '../lib/lunatrace-backend-stack';
import { WorkerStorageStack } from '../lib/worker-storage-stack';

const app = new App();

const stackVersionInputLookup: Record<string, StackInputs> = {
  V1: stackInputsV1,
  V2: stackInputsV2,
};

function deployStack() {
  if (process.env.DEVELOPMENT === 'true') {
    const devUser = process.env.DEV_USER;
    if (!devUser) {
      throw new Error('unable to deploy development stack, must specify DEV_USER');
    }

    const appName = stackInputsV1.appName;
    const env = {
      account: stackInputsV1.cdkDefaultAccount,
      region: stackInputsV1.cdkDefaultRegion,
    };

    return new WorkerStorageStack(app, `${appName}-${devUser}-EtlStorage`, {
      env,
      publicBaseUrl: 'http://localhost:4455',
      development: true,
    });
  }

  const stackVersion = process.env.STACK_VERSION;
  if (!stackVersion) {
    throw new Error('STACK_VERSION env var must be set');
  }
  const lunatraceStackInputs = stackVersionInputLookup[stackVersion];
  if (!lunatraceStackInputs) {
    throw new Error(`unable to find stack with version: ${stackVersion}`);
  }

  const appName = lunatraceStackInputs.appName;
  const env = {
    account: lunatraceStackInputs.cdkDefaultAccount,
    region: lunatraceStackInputs.cdkDefaultRegion,
  };

  return new LunatraceBackendStack(app, `${appName}-BackendStack`, {
    env: env,
    ...lunatraceStackInputs,
  });
}

deployStack();
