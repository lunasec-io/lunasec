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

import 'source-map-support/register';

import * as yargs from 'yargs';

import { getLunaSecMetrics } from './analytics/metrics';
import { deployCmd } from './cmds/deploy';
import { ejectCmd } from './cmds/eject';
import { resourcesCmd } from './cmds/resources';
import { startCmd } from './cmds/start';
import { LunaSecStackEnvironments } from './docker-compose/lunasec-stack';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

yargs
  .scriptName('lunasec')
  .usage('$0 <cmd> [args]')
  .version(version)
  .command(
    'start',
    'Start LunaSec stack locally.',
    {
      env: {
        type: 'string',
        required: false,
        default: 'dev',
        description: `Environment to start the LunaSec stack in: ${LunaSecStackEnvironments.filter(
          (e) => e === 'production'
        ).join(', ')}`,
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
      const metrics = await getLunaSecMetrics();
      return startCmd(metrics, {
        env: args.env,
        localBuild: args['local-build'],
        forceRebuild: args['force-rebuild'],
        noSudo: args['no-sudo'],
        verbose: args.verbose,
        showLogs: args['show-logs'],
      });
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
      const metrics = await getLunaSecMetrics();
      return await deployCmd(metrics, {
        buildDir: args['build-dir'],
        local: args.local,
        output: args.output,
        skipMirroring: args['skip-mirroring'],
      });
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
        default: false,
        type: 'boolean',
        description: "Output this stack's resources as a json object.",
      },
    },
    (args) => {
      return resourcesCmd({
        buildDir: args['build-dir'],
        json: args.json,
      });
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
        description: `Environment to start the LunaSec stack in: ${LunaSecStackEnvironments.filter(
          (e) => e === 'production'
        ).join(', ')}`,
      },
    },
    (args) => {
      return ejectCmd({
        env: args.env,
        localBuild: args['local-build'],
      });
    }
  )
  .demandCommand()
  .help();

void yargs.parse();
