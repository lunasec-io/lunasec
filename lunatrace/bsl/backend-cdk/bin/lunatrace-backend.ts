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
import { readFileSync } from 'fs';

import * as cdk from '@aws-cdk/core';

import { LunatraceBackendStack } from '../lib/lunatrace-backend-stack';
import { WorkerStorageStack } from '../lib/worker-storage-stack';

export interface StackInputsType {
  appName: string;
  domainName: string;
  domainZoneId: string;
  cdkDefaultRegion: string;
  cdkDefaultAccount: string;
  oathkeeperConfigBucketArn: string;
  certificateArn: string;
  backendStaticSecretArn: string;
  databaseSecretArn: string;
  gitHubAppId: string;
  gitHubAppPrivateKey: string;
  gitHubAppWebHookSecret: string;
  githubOauthAppLoginSecretArn: string;
  githubOauthAppLoginClientIdArn: string;
  kratosCookieSecretArn: string;
  kratosCipherSecretArn: string;
  vpcId: string;
}

const stackInputsFileContents = readFileSync('./stack-inputs.json');
const stackInputsJson = JSON.parse(stackInputsFileContents.toString());

const requiredFields = [
  'appName',
  'domainName',
  'domainZoneId',
  'cdkDefaultRegion',
  'cdkDefaultAccount',
  'oathkeeperConfigBucketArn',
  'certificateArn',
  'databaseSecretArn',
  'gitHubAppId',
  'gitHubAppPrivateKey',
  'gitHubAppWebHookSecret',
  'githubOauthAppLoginSecretArn',
  'githubOauthAppLoginClientIdArn',
  'kratosCookieSecretArn',
  'kratosCipherSecretArn',
  'vpcId',
];

requiredFields.forEach((field) => {
  if (!stackInputsJson[field]) {
    throw Error(`${field} was not provided in stack-inputs.json`);
  }
});

const stackInputs = stackInputsJson as StackInputsType;

const app = new cdk.App();

const appName = stackInputs.appName;
const env = {
  account: stackInputs.cdkDefaultAccount,
  region: stackInputs.cdkDefaultRegion,
};

function deployStack() {
  if (process.env.DEVELOPMENT === 'true') {
    const devUser = process.env.DEV_USER;
    if (!devUser) {
      throw new Error('unable to deploy development stack, must specify DEV_USER');
    }

    return new WorkerStorageStack(app, `${appName}-${devUser}-EtlStorage`, {
      env,
      publicBaseUrl: 'http://localhost:4455',
      development: true,
    });
  }
  return new LunatraceBackendStack(app, `${appName}-BackendStack`, {
    env: env,
    ...stackInputs,
  });
}

deployStack();
