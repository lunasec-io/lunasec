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

import { spawn } from 'child_process';
import fs from 'fs';
import { get, IncomingMessage } from 'http';
import os from 'os';
import path from 'path';

import * as yargs from 'yargs';

import {
  LunaSecStackConfigOptions,
  LunaSecStackDockerCompose,
  LunaSecStackEnvironments,
} from './docker-compose/lunasec-stack';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

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

function timeout(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface RunCommandOptions {
  healthcheck?: () => Promise<boolean>;
  streamStdout?: boolean;
  onStdin?: Generator<undefined, void, string>;
}

function runCommand(command: string, options: RunCommandOptions) {
  const cmd = spawn('sh', ['-c', command]);

  cmd.stdout.on('data', (data: Buffer) => {
    const strData = data.toString();
    if (options.streamStdout) {
      console.log(strData);
    }

    if (options.onStdin) {
      options.onStdin.next(strData);
    }
  });

  cmd.stderr.on('data', (data: string) => {
    console.error(data.toString());
  });

  cmd.on('close', (code) => {
    if (code !== null) {
      process.exit(code);
    }
    process.exit(0);
  });

  process.on('SIGINT', function () {
    cmd.kill('SIGINT');
  });

  async function waitForAppToBeReady() {
    if (options.healthcheck === undefined) {
      // no healthcheck is defined, assume the app is healthy
      return;
    }

    let attempts = 0;
    let healthy = false;
    while (!healthy && attempts < 1000) {
      await timeout(1000);
      attempts++;
      healthy = await options.healthcheck();
    }

    if (!healthy) {
      throw new Error(`command did not arrive at healthy state: ${command}`);
    }
  }

  return waitForAppToBeReady();
}

function* onStdinDemo(data: string) {
  if (data.includes('Starting lunasec_', 0)) {
    console.log(data);
  }
  yield;
}

function loadLunaSecStackConfig(): LunaSecStackConfigOptions | undefined {
  let searchPath = process.cwd();
  while (searchPath !== '/') {
    const files = fs.readdirSync(searchPath);

    const configFile = files.filter((f) => f === 'lunasec.js');
    if (configFile.length !== 1) {
      searchPath = path.join(searchPath, '../');
      continue;
    }

    const configPath = path.join(searchPath, 'lunasec');
    console.log(`Loaded LunaSec stack config: ${configPath}.js`);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(configPath);
    return config as LunaSecStackConfigOptions;
  }
  return undefined;
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

      const foundEnv = LunaSecStackEnvironments.filter((env) => env === args.env);
      if (foundEnv.length !== 1) {
        throw new Error(`Provided environment is not one of: ${LunaSecStackEnvironments.join(', ')}`);
      }
      const env = foundEnv[0];

      const lunasecConfig = loadLunaSecStackConfig();

      const stack = new LunaSecStackDockerCompose(env, version, args['local-build'], lunasecConfig);

      const useSudo = args['no-sudo'] ? '' : 'sudo ';

      const envOverride = 'COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1';

      const homeDir = os.homedir();

      let composePath = path.join(homeDir, '.lunasec');
      if (!fs.existsSync(composePath)) {
        fs.mkdirSync(composePath);
      }

      if (env === 'tests' || args['local-build']) {
        composePath = process.cwd();
      }

      if (args['local-build']) {
        const outputsFile = path.join(composePath, './outputs');
        if (!fs.existsSync(outputsFile)) {
          fs.mkdirSync(outputsFile);
        }
      }

      const composeFile = stack.write(composePath);

      const directory = `--project-directory ${composePath}`;

      const baseDockerComposeCmd = `${useSudo} ${envOverride} docker-compose -f ${composeFile} ${directory}`;

      if (args['show-logs']) {
        await runCommand(`${baseDockerComposeCmd} logs`, {
          streamStdout: true,
        });
      }

      const forceRebuild = args['force-rebuild'] ? '--build' : '';

      const dockerComposeUpCmd = `${baseDockerComposeCmd} up ${forceRebuild}`;

      const shouldStreamStdio = env !== 'demo' || args['verbose'];

      if (env === 'tests') {
        // TODO (cthompson) this is a hack for now, we probably want to find a better way of building this command
        void runCommand(`${dockerComposeUpCmd} --force-recreate --exit-code-from integration-test integration-test`, {
          streamStdout: true,
        });
        return;
      }

      const demoOptions: RunCommandOptions = {
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

      const devOptions: RunCommandOptions = {
        streamStdout: true,
        healthcheck: async (): Promise<boolean> => {
          try {
            return await checkURLStatus('http://localhost:37766');
          } catch (e) {
            return false;
          }
        },
      };

      const localBuildOptions: RunCommandOptions = {
        streamStdout: true,
      };

      const options = args['local-build'] ? localBuildOptions : env === 'demo' ? demoOptions : devOptions;

      if (env === 'demo') {
        console.log('Starting the LunaSec Stack demo...');
      } else if (env === 'dev') {
        console.log('Starting the LunaSec Stack in dev mode...');
      }

      await runCommand(dockerComposeUpCmd, options);

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
      config: {
        required: false,
        description: 'Config file for building secure components.',
      },
      'build-dir': {
        required: false,
        description: 'Build directory for built secure components.',
      },
      'dry-run': {
        required: false,
        description: 'Perform a dry run of deployment that builds all resources which are to be deployed.',
      },
      local: {
        required: false,
        description: 'Deploy the LunaSec stack to Localstack.',
      },
      output: {
        required: false,
        description: 'Path to where the resources output file will be written to.',
      },
    },
    async () => {
      const args = process.argv.slice(2, process.argv.length);
      await runCommand(`${path.join(__dirname, '../bin/lunasec')} ${args.join(' ')}`, {
        streamStdout: true,
      });
    }
  )
  .demandCommand()
  .help();

void yargs.parse();
