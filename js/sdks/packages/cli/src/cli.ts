#!/usr/bin/env node
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
import { get, IncomingMessage } from 'http';
import os from 'os';
import path from 'path';
import 'source-map-support/register';

import * as cdk from '@aws-cdk/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';
import * as yargs from 'yargs';

import { mirrorRepos } from './cdk-stack/mirror-service-repos';
import { getOutputName, LunaSecDeploymentStack } from './cdk-stack/stack';
import { AwsResourceConfig, LunaSecStackName, SecureFrameAssetFilename } from './cdk-stack/types';
import { loadLunaSecStackConfig } from './config/load-config';
import { awsResourcesOutputFile } from './constants/cli';
import {
  LunaSecStackDockerCompose,
  LunaSecStackEnvironment,
  LunaSecStackEnvironments,
} from './docker-compose/lunasec-stack';
import { runCommand, runCommandWithHealthcheck, RunCommandWithHealthcheckOptions } from './utils/exec';
import { copyFolderRecursiveSync } from './utils/filesystem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

const awsRegion = 'us-west-2';

async function resolveURL(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      resolve(res);
    }).on('error', function (e) {
      reject(e);
    });
  });
}

async function checkURLStatus(url: string): Promise<boolean> {
  const resp = await resolveURL(url);
  return resp.statusCode === 200 || resp.statusCode === 404;
}

function* onStdinDemo(data: string) {
  if (data.includes('Container lunasec', 0)) {
    console.log(data);
  }
  yield;
}

function getEnv(args: yargs.Arguments): LunaSecStackEnvironment {
  const foundEnv = LunaSecStackEnvironments.filter((env) => env === args.env);
  if (foundEnv.length !== 1) {
    throw new Error(`Provided environment is not one of: ${LunaSecStackEnvironments.join(', ')}`);
  }
  return foundEnv[0];
}

function getRunStackOptions(env: LunaSecStackEnvironment, localBuild: boolean, shouldStreamStdio: boolean) {
  const demoOptions: RunCommandWithHealthcheckOptions = {
    streamStdout: shouldStreamStdio,
    healthcheck: async (): Promise<boolean> => {
      try {
        const checks = await Promise.all([
          checkURLStatus('http://localhost:3000'),
          checkURLStatus('http://localhost:37766'),
        ]);
        return checks.every((c) => c);
      } catch (e) {
        return false;
      }
    },
    onStdin: onStdinDemo(''),
  };

  const devOptions: RunCommandWithHealthcheckOptions = {
    streamStdout: true,
    healthcheck: async (): Promise<boolean> => {
      try {
        return await checkURLStatus('http://localhost:37766');
      } catch (e) {
        return false;
      }
    },
  };

  const localBuildOptions: RunCommandWithHealthcheckOptions = {
    streamStdout: true,
  };
  if (localBuild) {
    return localBuildOptions;
  }
  if (env === 'demo') {
    return demoOptions;
  }
  return devOptions;
}

function ensureEmptyOutputsDirectoryExists(composePath: string) {
  const outputsDir = path.join(composePath, './outputs');
  if (!fs.existsSync(outputsDir)) {
    // if the outputs directory doesn't exist, just create the directory and return
    fs.mkdirSync(outputsDir);
    return;
  }

  const outputsFile = path.join(outputsDir, awsResourcesOutputFile);
  if (fs.existsSync(outputsFile)) {
    // if a previous outputs file exists, get rid of it before running this command
    fs.rmSync(path.join(outputsFile));
  }
}

yargs
  .scriptName('lunasec')
  .usage('$0 <cmd> [args]')
  .command(
    'start',
    'Start LunaSec stack locally.',
    {
      env: {
        type: 'string',
        required: false,
        default: 'dev',
        description: `Environment to start the LunaSec stack in: ${LunaSecStackEnvironments.join(', ')}`,
      },
      'local-build': {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Build the LunaSec stack locally (command should be run from monorepo root).',
      },
      'force-rebuild': {
        type: 'boolean',
        required: false,
        default: false,
        description:
          'Rebuild the LunaSec stack (command should be run from monorepo root). Only works if used with `--local-build`.',
      },
      'no-sudo': {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Do not prepend "sudo" before the docker-compose command.',
      },
      verbose: {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Log all actions performed by the CLI.',
      },
      'show-logs': {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Show the logs from a previous run of the LunaSec stack for the specified environment.',
      },
    },
    async (args) => {
      if (args['force-rebuild'] && !args['local-build']) {
        throw new Error('Attempted to force a rebuild without specifying `--local-build`.');
      }

      const env = getEnv(args);
      const lunasecConfig = loadLunaSecStackConfig(env);
      const stack = new LunaSecStackDockerCompose(env, version, args['local-build'], lunasecConfig);

      const useSudo = args['no-sudo'] ? '' : 'sudo ';
      const envOverride = 'COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain';

      const homeDir = os.homedir();

      let composePath = path.join(homeDir, '.lunasec');
      if (!fs.existsSync(composePath)) {
        fs.mkdirSync(composePath);
      }

      if (env === 'tests' || args['local-build']) {
        composePath = process.cwd();
      }

      ensureEmptyOutputsDirectoryExists(composePath);

      const composeFile = stack.write(composePath);

      const directory = `--project-directory ${composePath}`;

      const baseDockerComposeCmd = `${useSudo} ${envOverride} docker-compose -f ${composeFile} ${directory}`;
      if (args['show-logs']) {
        const result = runCommand(`${baseDockerComposeCmd} logs`, true);
        process.exit(result.status);
      }

      const forceRebuild = args['force-rebuild'] ? '--build' : '';

      const dockerComposeUpCmd = `${baseDockerComposeCmd} up ${forceRebuild} --remove-orphans`;

      const shouldStreamStdio = env !== 'demo' || args['verbose'];

      if (env === 'tests') {
        // TODO (cthompson) this is a hack for now, we probably want to find a better way of building this command
        const result = runCommand(
          `${dockerComposeUpCmd} --force-recreate --exit-code-from integration-test integration-test`,
          true
        );
        process.exit(result.status);
      }

      const options = getRunStackOptions(env, args['local-build'], shouldStreamStdio);

      if (env === 'demo') {
        console.log('Starting the LunaSec Stack demo...');
      } else if (env === 'dev') {
        console.log('Starting the LunaSec Stack in dev mode...');
        console.log('Make sure your application backend is running and configured in the lunasec.js config.');
      }

      await runCommandWithHealthcheck(dockerComposeUpCmd, options);

      if (env === 'demo') {
        console.log('LunaSec Stack demo started at http://localhost:3000.');
      } else if (env === 'dev') {
        console.log('Tokenizer Backend is accessible at http://localhost:37766.');
      }
    }
  )
  .command(
    'deploy',
    'Deploy the LunaSec stack to AWS.',
    {
      'build-dir': {
        required: false,
        type: 'string',
        description: 'Build directory for built secure components.',
      },
      'dry-run': {
        required: false,
        description: 'Perform a dry run of deployment that builds all resources which are to be deployed.',
      },
      local: {
        required: false,
        default: false,
        type: 'boolean',
        description: 'Deploy the LunaSec stack to Localstack.',
      },
      output: {
        required: false,
        type: 'string',
        description: 'Path to where the resources output file will be written to.',
      },
      'skip-mirroring': {
        required: false,
        default: false,
        description: 'Skip docker image mirroring.',
      },
    },
    async (args) => {
      const buildsFolder = path.join(os.homedir(), '.lunasec/builds');
      if (!fs.existsSync(buildsFolder)) {
        fs.mkdirSync(buildsFolder, { recursive: true });
      }

      const cacheBuildDir = path.join(buildsFolder, `build_${new Date().toISOString()}`);
      const buildDir = args['build-dir'] ? args['build-dir'] : cacheBuildDir;
      console.debug(`Building LunaSec Stack to ${buildDir}`);

      const localstackHostname = process.env.LOCALSTACK_HOSTNAME || 'localhost';

      const awsEndpoint = args.local ? `http://${localstackHostname}:4566` : undefined;

      const sts = new STSClient({ region: awsRegion, endpoint: awsEndpoint });
      const cmd = new GetCallerIdentityCommand({});
      const output = await sts.send(cmd);

      const accountID = output.Account;
      if (accountID === undefined) {
        throw new Error("unable to resolve current AWS user's account id");
      }

      if (!(args['skip-mirroring'] || args.local)) {
        await mirrorRepos(accountID, version);
      }

      const lunasecConfig = loadLunaSecStackConfig();
      if (lunasecConfig === undefined) {
        throw new Error(
          'unable to load lunasec config. Is the file "lunasec.js" accessible in the current directory tree?'
        );
      }

      if (lunasecConfig.production.applicationFrontEnd === undefined) {
        throw new Error('no application front end url provided in lunasec stack config.');
      }

      const app = new cdk.App();
      const stack = new LunaSecDeploymentStack(app, LunaSecStackName, args.local, lunasecConfig.production);
      const out = app.synth();
      copyFolderRecursiveSync(out.directory, buildDir);

      const outputsFilePath = path.join(buildDir, 'outputs.json');

      const cdkCmd = args.local ? 'cdklocal' : 'cdk';

      const account = args.local ? '' : `aws://${accountID}/${awsRegion}`;

      const bootstrapResp = runCommand(`${cdkCmd} bootstrap -a ${buildDir} ${account}`, true);
      if (bootstrapResp.status) {
        throw new Error(`command failed to execute`);
      }

      const deployResp = runCommand(
        `${cdkCmd} deploy --require-approval never -a ${buildDir} --outputs-file ${outputsFilePath}`,
        true
      );
      if (deployResp.status) {
        throw new Error(`command failed to execute`);
      }

      // TODO (cthompson) check if file exists
      const outputsFileContent = fs.readFileSync(outputsFilePath, 'utf-8');

      const stackOutputFile = JSON.parse(outputsFileContent);

      const stackOutputs = stackOutputFile[LunaSecStackName] as Record<string, string>;
      if (stackOutputs === undefined) {
        throw new Error(
          `unable to locate outputs for stack: ${LunaSecStackName} in stack output file ${outputsFilePath}`
        );
      }

      if (!args.local) {
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

      const localstackUrl = process.env.LOCALSTACK_URL || 'http://localhost:4566';

      const localstackConfig = args.local ? { localstack_url: localstackUrl } : {};

      if (args.output) {
        console.debug(`Writing resource config to: ${args.output}`);
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
        fs.writeFileSync(args.output, serializedConfig);
      }

      console.log(`Completed LunaSec stack deployment for version: ${version as string}`);
    }
  )
  .command(
    'resources',
    'Show the stack resources for the latest deployment.',
    {
      'build-dir': {
        required: false,
        type: 'string',
        description: 'Build directory for built secure components.',
      },
      json: {
        required: false,
        type: 'boolean',
        description: "Output this stack's resources as a json object.",
      },
    },
    (args) => {
      const cacheBuildDir = path.join(os.homedir(), '.lunasec/builds');
      if (!fs.existsSync(cacheBuildDir)) {
        throw new Error('There are no LunaSec deploys. Please use `lunasec deploy` to first deploy the stack.');
      }

      const dirs = fs.readdirSync(cacheBuildDir).sort().reverse();

      const latestBuildDir = dirs.length ? dirs[0] : undefined;

      const buildDir = args['build-dir']
        ? args['build-dir']
        : latestBuildDir
        ? path.join(cacheBuildDir, latestBuildDir)
        : undefined;

      if (buildDir === undefined) {
        throw new Error('There are no LunaSec deploys. Please use `lunasec deploy` to first deploy the stack.');
      }

      const outputsFilename = path.join(buildDir, 'outputs.json');
      const outputs = fs.readFileSync(outputsFilename, 'utf-8');
      const parsedOutputs = JSON.parse(outputs);

      const stackOutputs = parsedOutputs[LunaSecStackName] as Record<string, string>;
      if (stackOutputs === undefined) {
        throw new Error(
          `unable to locate outputs for stack: ${LunaSecStackName} in stack output file ${outputsFilename}`
        );
      }

      if (args.json) {
        console.log(JSON.stringify(stackOutputs, null, 2));
        return;
      }

      console.log(`Tokenizer URL: ${stackOutputs[getOutputName('gateway')]}`);
      console.log(`Tokenizer Secret ARN: ${stackOutputs[getOutputName('tokenizer-secret')]}`);
      console.log(``);
      console.log(`Tables:`);
      console.log(`  Keys Table: ${stackOutputs[getOutputName('keys-table')]}`);
      console.log(`  Grants Table: ${stackOutputs[getOutputName('grants-table')]}`);
      console.log(`  Metadata Table: ${stackOutputs[getOutputName('metadata-table')]}`);
    }
  )
  .command(
    'eject',
    'generate a docker compose file in the current directory without invoking docker-compose',
    {
      'local-build': {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Build the LunaSec stack locally.',
      },
      env: {
        type: 'string',
        required: false,
        default: 'dev',
        description: `Environment to start the LunaSec stack in: ${LunaSecStackEnvironments.join(', ')}`,
      },
    },
    (args) => {
      const lunasecConfig = loadLunaSecStackConfig();
      const env = getEnv(args);
      const stack = new LunaSecStackDockerCompose(env, version, args['local-build'], lunasecConfig);
      stack.write(process.cwd());
    }
  )
  .demandCommand()
  .help();

void yargs.parse();
