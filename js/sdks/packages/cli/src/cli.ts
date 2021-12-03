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

import { binary, command, run, subcommands } from 'cmd-ts';

import { getLunaSecMetrics } from './analytics/metrics';
import { deployCmd } from './cmds/deploy';
import { ejectCmd } from './cmds/eject';
import {
  buildDirOption,
  envOption,
  forceRebuildFlag,
  jsonFlag,
  localBuildFlag,
  localFlag,
  noSudoFlag,
  outputOption,
  showLogsFlag,
  skipMirroringFlag,
  verboseFlag,
} from './cmds/options';
import { resourcesCmd } from './cmds/resources';
import { startCmd } from './cmds/start';
import { debug } from './constants/cli';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

// eslint-disable-next-line @typescript-eslint/no-empty-function
console.debug = debug ? console.debug : (...data: any[]) => {};

const start = command({
  name: 'start',
  description: 'Start LunaSec stack locally.',
  args: {
    envOption,
    localBuildFlag,
    forceRebuildFlag,
    noSudoFlag,
    verboseFlag,
    showLogsFlag,
  },
  handler: async (args) => {
    const metrics = await getLunaSecMetrics();
    return startCmd(metrics, {
      env: args.envOption,
      localBuild: args.localBuildFlag,
      forceRebuild: args.forceRebuildFlag,
      noSudo: args.noSudoFlag,
      verbose: args.verboseFlag,
      showLogs: args.showLogsFlag,
    });
  },
});

const deploy = command({
  name: 'deploy',
  description: 'Deploy the LunaSec stack to AWS.',
  args: {
    buildDirOption,
    localFlag,
    outputOption,
    skipMirroringFlag,
  },
  handler: async (args) => {
    const metrics = await getLunaSecMetrics();
    return await deployCmd(metrics, {
      buildDir: args.buildDirOption,
      local: args.localFlag,
      output: args.outputOption,
      skipMirroring: args.skipMirroringFlag,
    });
  },
});

const resources = command({
  name: 'resources',
  description: 'Show the stack resources for the latest deployment.',
  args: {
    buildDirOption,
    jsonFlag,
  },
  handler: (args) => {
    return resourcesCmd({
      buildDir: args.buildDirOption,
      json: args.jsonFlag,
    });
  },
});

const eject = command({
  name: 'eject',
  description: 'Generate a docker compose file in the current directory without invoking docker-compose.',
  args: {
    localBuildFlag,
    envOption,
  },
  handler: (args) => {
    return ejectCmd({
      env: args.envOption,
      localBuild: args.localBuildFlag,
    });
  },
});

const commands = subcommands({
  name: 'lunasec',
  description: 'Cli for interacting with LunaSec locally and for deploying.',
  version: version,
  cmds: {
    start,
    deploy,
    resources,
    eject,
  },
});

const cli = binary(commands);

void run(cli, process.argv);
