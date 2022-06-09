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
import * as process from 'process';

import { LunaSecMetrics } from '../analytics/metrics';
import { loadLunaSecStackConfig } from '../config/load-config';
import { awsResourcesOutputFile, outputDir } from '../constants/cli';
import { LunaSecStackEnvironment } from '../docker-compose/constants';
import { LunaSecStackDockerCompose } from '../docker-compose/lunasec-stack';
import { validateEnv } from '../utils/cli';
import { runCommand, runCommandWithHealthcheck, RunCommandWithHealthcheckOptions } from '../utils/exec';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

function ensureEmptyOutputsDirectoryExists(composePath: string) {
  const outputsDir = path.join(composePath, outputDir);
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
  console.debug(`${url} responded with ${resp.statusCode || 'undefined'}`);
  return resp.statusCode === 200 || resp.statusCode === 404;
}

function* onStdinDemo(data: string) {
  if (data.includes('Container lunasec', 0)) {
    console.log(data);
  }
  yield;
}

function getRunStackOptions(
  env: LunaSecStackEnvironment,
  localBuild: boolean,
  shouldStreamStdio: boolean,
  exitHandler?: (code: number, stderr: string) => Promise<void>
) {
  const demoOptions: RunCommandWithHealthcheckOptions = {
    streamStdout: shouldStreamStdio,
    healthcheck: async (): Promise<boolean> => {
      try {
        const checks = await Promise.all([
          checkURLStatus('http://localhost:3000'),
          checkURLStatus('http://localhost:37766/health'),
        ]);
        return checks.every((c) => c);
      } catch (e) {
        return false;
      }
    },
    onStdin: onStdinDemo(''),
    exitHandler,
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
    exitHandler,
  };

  const localBuildOptions: RunCommandWithHealthcheckOptions = {
    streamStdout: true,
    exitHandler,
  };

  if (env === 'demo') {
    return demoOptions;
  }
  if (localBuild) {
    return localBuildOptions;
  }
  return devOptions;
}

interface StartCmdOptions {
  forceRebuild: boolean;
  localBuild: boolean;
  env: string;
  noSudo: boolean;
  showLogs: boolean;
  verbose: boolean;
}

export async function startCmd(metrics: LunaSecMetrics, options: StartCmdOptions) {
  if (options.forceRebuild && !options.localBuild) {
    throw new Error('Attempted to force a rebuild without specifying `--local-build`.');
  }

  const env = validateEnv(options.env);

  const lunasecConfig = loadLunaSecStackConfig(env);
  const stack = new LunaSecStackDockerCompose(env, version, options.localBuild, lunasecConfig);

  const useSudo = options.noSudo ? '' : 'sudo ';
  const envOverride = 'COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain';

  const homeDir = os.homedir();

  let composePath = path.join(homeDir, '.lunasec');
  if (!fs.existsSync(composePath)) {
    fs.mkdirSync(composePath);
  }

  if (env === 'tests' || options.localBuild) {
    composePath = process.cwd();
  }

  ensureEmptyOutputsDirectoryExists(composePath);

  const composeFile = stack.write(composePath);

  const directory = `--project-directory ${composePath}`;

  const baseDockerComposeCmd = `${useSudo} ${envOverride} docker-compose -f ${composeFile} ${directory}`;
  if (options.showLogs) {
    const result = runCommand(`${baseDockerComposeCmd} logs`, true);
    process.exit(result.status);
  }

  const forceRebuild = options.forceRebuild ? '--build' : '';

  const dockerComposeUpCmd = `${baseDockerComposeCmd} up ${forceRebuild} --remove-orphans`;

  const shouldStreamStdio = env !== 'demo' || options.verbose;

  if (env === 'tests') {
    const cmd = `${dockerComposeUpCmd} --force-recreate --exit-code-from integration-test integration-test`;
    // TODO (cthompson) this is a hack for now, we probably want to find a better way of building this command
    const result = runCommand(cmd, true);

    await metrics.push(cmd, env, result.status === 0, result.stderr);
    process.exit(result.status);
  }

  const exitHandler = async (code: number, stderr: string) => {
    await metrics.push(dockerComposeUpCmd, env, code === 0, stderr);
  };

  const stackOptions = getRunStackOptions(env, options.localBuild, shouldStreamStdio, exitHandler);

  if (env === 'demo') {
    console.log('Starting the LunaSec Stack demo...');
  } else if (env === 'dev') {
    console.log('Starting the LunaSec Stack in dev mode...');
    console.log('Make sure your application backend is running and configured in the lunadefend.js config.');
  }

  await runCommandWithHealthcheck(dockerComposeUpCmd, stackOptions);

  if (env === 'demo') {
    console.log('LunaSec Stack demo started at http://localhost:3000.');
  } else if (env === 'dev') {
    console.log('Tokenizer Backend is accessible at http://localhost:37766.');
  }
  await metrics.push(dockerComposeUpCmd, env, true);
}
