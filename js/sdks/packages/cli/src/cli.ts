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
import os from 'os';
import path from 'path';

import * as yargs from 'yargs';

import { LunaSecStackDockerCompose, LunaSecStackEnvironments } from './docker-compose/lunasec-stack';
import { runCommand } from './utils/exec';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

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
    },
    (args) => {
      if (args['force-rebuild'] && !args['local-build']) {
        throw new Error('Attempted to force a rebuild without specifying `--local-build`.');
      }

      const foundEnv = LunaSecStackEnvironments.filter((env) => env === args.env);
      if (foundEnv.length !== 1) {
        throw new Error(`Provided environment is not one of: ${LunaSecStackEnvironments.join(', ')}`);
      }
      const env = foundEnv[0];

      const stack = new LunaSecStackDockerCompose(env, version, args['local-build']);

      const useSudo = args['no-sudo'] ? '' : 'sudo ';

      const envOverride = 'COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1';

      const homeDir = os.homedir();

      let composePath = path.join(homeDir, '.lunasec');
      if (!fs.existsSync(composePath)) {
        fs.mkdirSync(composePath);
      }

      // if we are not in demo mode or in dev but not building locally, then write to the current directory
      if (!(env === 'demo' || (env === 'dev' && !args['local-build']))) {
        composePath = process.cwd();
      }

      const composeFile = stack.write(composePath);

      const directory = `--project-directory ${composePath}`;

      const forceRebuild = args['force-rebuild'] ? '--build' : '';

      const baseCmd = `${useSudo} ${envOverride} docker-compose -f ${composeFile} ${directory} up ${forceRebuild}`;

      const shouldStreamStdio = env !== 'demo' || args['verbose'];

      if (env === 'tests') {
        // TODO (cthompson) this is a hack for now, we probably want to find a better way of building this command
        const output = runCommand(
          `${baseCmd} --force-recreate --exit-code-from integration-test integration-test`,
          shouldStreamStdio
        );
        console.log(output);
        process.exit(output.status);
      }

      if (env === 'demo') {
        console.log('Starting the LunaSec Stack demo at http://localstack:3000...');
      } else if (env === 'dev') {
        console.log(
          'Starting the LunaSec Stack in dev mode. Tokenizer Backend will be accessible at http://localhost:37766.'
        );
      }

      const output = runCommand(baseCmd, shouldStreamStdio);
      if (env === 'demo' || output.status !== 0) {
        console.log(output.stdout.toString());

        if (output.stderr !== undefined) {
          console.log(output.stderr.toString());
        }
      }
      process.exit(output.status);
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
    () => {
      const args = process.argv.slice(2, process.argv.length);
      runCommand(`${path.join(__dirname, '../bin/lunasec')} ${args.join(' ')}`);
    }
  )
  .demandCommand()
  .help();

void yargs.parse();
