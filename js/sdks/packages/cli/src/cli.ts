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

import os from 'os';
import path from 'path';

import * as yargs from 'yargs';

import { LunaSecStackDockerCompose, LunaSecStackEnvironments } from './docker-compose/lunasec-stack';
import { runCommand } from './utils/exec';
import { version } from './version';

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
      'no-sudo': {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Do not prepend "sudo" before the docker-compose command.',
      },
    },
    (args) => {
      const foundEnv = LunaSecStackEnvironments.filter((env) => env === args.env);
      if (foundEnv.length !== 1) {
        throw new Error(`Provided environment is not one of: ${LunaSecStackEnvironments.join(', ')}`);
      }

      const stack = new LunaSecStackDockerCompose(foundEnv[0], version, args['local-build']);

      const env = {
        ...process.env,
        COMPOSE_DOCKER_CLI_BUILD: '1',
        DOCKER_BUILDKIT: '1',
      };

      const useSudo = args['no-sudo'] ? '' : 'sudo ';

      if (foundEnv[0] === 'ci') {
        const composeFile = stack.write(process.cwd());

        // TODO (cthompson) this is a hack for now, we probably want to find a better way of building this command
        runCommand(
          'sh',
          [
            '-c',
            useSudo + `docker-compose -f ${composeFile} up --build --exit-code-from integration-test integration-test`,
          ],
          env
        );
      } else {
        const homeDir = os.homedir();
        const composePath = path.join(homeDir, '.lunasec');
        const composeFile = stack.write(composePath);

        runCommand('sh', ['-c', useSudo + `docker-compose -f ${composeFile} up`], env);
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
    (_args) => {
      const args = process.argv.slice(2, process.argv.length);
      runCommand(path.join(__dirname, '../bin/lunasec'), args);
    }
  )
  .demandCommand()
  .help();

void yargs.parse();
