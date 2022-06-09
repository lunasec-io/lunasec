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
import fs from 'fs';
import path from 'path';

import * as cdk from '@aws-cdk/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

import { LunaSecMetrics } from '../analytics/metrics';
import { mirrorRepos } from '../cdk-stack/mirror-service-repos';
import { getOutputName, LunaSecDeploymentStack } from '../cdk-stack/stack';
import { AwsResourceConfig, LunaSecStackName, SecureFrameAssetFilename } from '../cdk-stack/types';
import { loadLunaSecStackConfig } from '../config/load-config';
import { awsRegion, buildsFolder } from '../constants/cli';
import { version } from '../docker-compose/constants';
import { runCommand } from '../utils/exec';
import { copyFolderRecursiveSync } from '../utils/filesystem';

async function setupProductionSecureFrameBucket(
  stack: LunaSecDeploymentStack,
  outputsFilePath: string,
  stackOutputs: Record<string, string>,
  awsEndpoint?: string
) {
  console.debug('Setting up secure frame iframe bucket...');
  const backendBucketOutputName = getOutputName('tokenizer-backend-bucket');
  const tokenizerBackendAssetBucket = stackOutputs[backendBucketOutputName];
  if (tokenizerBackendAssetBucket === undefined || tokenizerBackendAssetBucket === '') {
    throw new Error(
      `unable to load tokenizer backend bucket name ${backendBucketOutputName} in stack output file ${outputsFilePath}`
    );
  }

  if (stack.secureFrameAssets === undefined) {
    throw new Error(`secure frame assets are not defined in the LunaSec stack.`);
  }

  for (const secureFrameAssetName of Object.keys(stack.secureFrameAssets.files)) {
    const secureFrameAssetFilename = secureFrameAssetName as SecureFrameAssetFilename;
    const secureFrameAsset = stack.secureFrameAssets.files[secureFrameAssetFilename];

    const s3 = new S3Client({ region: awsRegion, endpoint: awsEndpoint });
    const cmd = new PutObjectCommand({
      Bucket: tokenizerBackendAssetBucket,
      Key: secureFrameAsset.filename,
      Body: secureFrameAsset.content,
    });
    try {
      await s3.send(cmd);
    } catch (e) {
      console.error(e);
    }
  }
}

function writeStackOutputsToConfig(output: string, local: boolean, stackOutputs: Record<string, string>) {
  const localstackUrl = process.env.LOCALSTACK_URL || 'http://localhost:4566';

  const localstackConfig = local ? { localstack_url: localstackUrl } : {};

  const resourceConfig: AwsResourceConfig = {
    aws_gateway: {
      table_names: {
        metadata: stackOutputs[getOutputName('metadata-table')],
        keys: stackOutputs[getOutputName('keys-table')],
        sessions: stackOutputs[getOutputName('sessions-table')],
        grants: stackOutputs[getOutputName('grants-table')],
      },
      ciphertext_bucket: stackOutputs[getOutputName('ciphertext-bucket')],
      ...localstackConfig,
    },
    tokenizer: {
      secret_arn: stackOutputs[getOutputName('tokenizer-secret')],
    },
  };
  const serializedConfig = JSON.stringify(resourceConfig, null, 2);
  fs.writeFileSync(output, serializedConfig);
}

function getCdkCommand(options: DeployCmdOptions) {
  if (options.local) {
    const envVars = options.localStackHostname ? `LOCALSTACK_HOSTNAME=${options.localStackHostname} ` : '';

    return `${envVars}cd /repo/lunadefend/js/sdks/packages/cli/ && yarn run cdklocal -v`;
  }

  return 'cdk';
}

interface DeployCmdOptions {
  buildDir?: string;
  local: boolean;
  localStackHostname?: string;
  skipMirroring: boolean;
  output?: string;
}

export async function deployCmd(metrics: LunaSecMetrics, options: DeployCmdOptions) {
  if (!fs.existsSync(buildsFolder)) {
    fs.mkdirSync(buildsFolder, { recursive: true });
  }

  const cacheBuildDir = path.join(buildsFolder, `build_${new Date().toISOString()}`);
  const buildDir = options.buildDir ? options.buildDir : cacheBuildDir;
  console.log(`Building LunaSec Stack to ${buildDir}`);

  const localStackHostname = process.env.LOCALSTACK_HOSTNAME || 'localhost';

  const awsEndpoint = options.local ? `http://${localStackHostname}:4566` : undefined;

  const sts = new STSClient({ region: awsRegion, endpoint: awsEndpoint });
  const cmd = new GetCallerIdentityCommand({});
  const output = await sts.send(cmd);

  const accountID = output.Account;
  if (accountID === undefined) {
    throw new Error("unable to resolve current AWS user's account id");
  }

  if (!(options.skipMirroring || options.local)) {
    await mirrorRepos(accountID, version);
  }

  const lunasecConfig = loadLunaSecStackConfig();
  if (lunasecConfig === undefined) {
    throw new Error(
      'unable to load lunasec config. Is the file "lunadefend.js" accessible in the current directory tree?'
    );
  }

  if (lunasecConfig.production.applicationFrontEnd === undefined) {
    throw new Error('no application front end url provided in lunasec stack config.');
  }

  const app = new cdk.App();
  const stack = new LunaSecDeploymentStack(app, LunaSecStackName, options.local, lunasecConfig.production);
  const out = app.synth();
  copyFolderRecursiveSync(out.directory, buildDir);

  const outputsFilePath = path.join(buildDir, 'outputs.json');

  const cdkCmd = getCdkCommand({
    localStackHostname: localStackHostname,
    ...options,
  });

  const account = options.local ? '' : `aws://${accountID}/${awsRegion}`;

  console.log('Bootstrapping LunaSec CDK environment...');

  const bootstrapCmd = `${cdkCmd} bootstrap -a ${buildDir} ${account}`;
  const bootstrapResp = runCommand(bootstrapCmd, true);
  if (bootstrapResp.status) {
    await metrics.push(bootstrapCmd, 'production', false, bootstrapResp.stderr);
    throw new Error(`command failed to execute`);
  }

  console.log('Deploying LunaSec CDK resources...');
  const deployCmd = `${cdkCmd} deploy --require-approval never -a ${buildDir} --outputs-file ${outputsFilePath}`;
  const deployResp = runCommand(deployCmd, true);
  if (deployResp.status) {
    await metrics.push(deployCmd, 'production', false, bootstrapResp.stderr);
    throw new Error(`command failed to execute`);
  }

  // TODO (cthompson) check if file exists
  const outputsFileContent = fs.readFileSync(outputsFilePath, 'utf-8');

  const stackOutputFile = JSON.parse(outputsFileContent);

  const stackOutputs = stackOutputFile[LunaSecStackName] as Record<string, string>;
  if (stackOutputs === undefined) {
    throw new Error(`unable to locate outputs for stack: ${LunaSecStackName} in stack output file ${outputsFilePath}`);
  }

  if (!options.local) {
    console.log(`Copying LunaSec frontend assets to S3...`);
    // Deploy assets to secure frame bucket if we are doing a production deployment.
    // Note: This is needed because the cdk construct for a s3 deployment is currently broken.
    await setupProductionSecureFrameBucket(stack, outputsFilePath, stackOutputs, awsEndpoint);
  }

  if (options.output) {
    console.log(`Writing resource config to: ${options.output}`);
    writeStackOutputsToConfig(options.output, options.local, stackOutputs);
  }

  await metrics.push(`lunasec deploy, options: ${JSON.stringify(options)}`, 'production', true);

  console.log(`Completed LunaSec stack deployment for version: ${version}`);
}
