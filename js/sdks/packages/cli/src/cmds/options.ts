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
import { boolean, flag, oneOf, option, optional, string } from 'cmd-ts';

import { LunaSecStackEnvironment, LunaSecStackEnvironments } from '../docker-compose/constants';

const validEnv = (e: LunaSecStackEnvironment) => e !== 'production';

const environmentOptions = LunaSecStackEnvironments.filter(validEnv).map((e) => e as string);

export const envOption = option({
  type: oneOf(environmentOptions),
  long: 'env',
  defaultValue: () => 'dev',
  description: `Environment to start the LunaSec stack in. One of [${environmentOptions.join(', ')}]`,
});

export const localBuildFlag = flag({
  type: boolean,
  long: 'local-build',
  defaultValue: () => false,
  description: 'Build the LunaSec stack locally (command should be run from monorepo root).',
});

export const forceRebuildFlag = flag({
  type: boolean,
  long: 'force-rebuild',
  defaultValue: () => false,
  description:
    'Rebuild the LunaSec stack (command should be run from monorepo root). Only works if used with `--local-build`.',
});

export const noSudoFlag = flag({
  type: boolean,
  long: 'no-sudo',
  defaultValue: () => false,
  description: 'Do not prepend "sudo" before the docker-compose command.',
});

export const verboseFlag = flag({
  type: boolean,
  long: 'verbose',
  defaultValue: () => false,
  description: 'Log all actions performed by the CLI.',
});

export const showLogsFlag = flag({
  type: boolean,
  long: 'show-logs',
  defaultValue: () => false,
  description: 'Show the logs from a previous run of the LunaSec stack for the specified environment.',
});

export const buildDirOption = option({
  type: optional(string),
  long: 'build-dir',
  description: 'Build directory for built secure components.',
});

export const localFlag = flag({
  type: boolean,
  long: 'local',
  defaultValue: () => false,
  description: 'Deploy the LunaSec stack to Localstack.',
});

export const outputOption = option({
  type: optional(string),
  long: 'output',
  description: 'Path to where the resources output file will be written to.',
});

export const skipMirroringFlag = flag({
  type: boolean,
  long: 'skip-mirroring',
  defaultValue: () => false,
  description: 'Skip docker image mirroring.',
});

export const jsonFlag = flag({
  type: boolean,
  long: 'json',
  description: "Output this stack's resources as a json object.",
});
