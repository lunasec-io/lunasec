/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';

import dotenv from 'dotenv';
import { dump } from 'js-yaml';

import { bslDir, hasuraDir, kratosDir, tmuxpConfgFile } from './constants';
import { dbUrlEnv } from './env';
import {
  backend,
  dockerCompose,
  frontend,
  generateCommon,
  generateLogger,
  hasura,
  manifestWorker,
  oathkeeper,
  sbomWorker,
  smeeWebhook,
  webhookWorker,
} from './services';
import { tmuxpConfig, tmuxWindow } from './tmux';

dotenv.config();

const servicesWindow = tmuxWindow('services', [oathkeeper, hasura, frontend, dockerCompose]);

const backendWindow = tmuxWindow('backend', [smeeWebhook, backend]);

const workerWindow = tmuxWindow('workers', [manifestWorker, sbomWorker, webhookWorker]);

const generatedCodeWindow = tmuxWindow('generated-code', [generateCommon, generateLogger]);

const config = tmuxpConfig('lunatrace', [servicesWindow, backendWindow, workerWindow, generatedCodeWindow]);

function hasuraInit() {
  console.log(`Running hasura migrations...`);
  exec('hasura migrate apply', {
    cwd: hasuraDir,
  });
  exec('hasura metadata apply', {
    cwd: hasuraDir,
  });
  exec('hasura metadata reload', {
    cwd: hasuraDir,
  });
}

function kratosInit() {
  console.log(`Running kratos migrations...`);
  exec(`${dbUrlEnv} kratos -c config.yaml migrate sql -e --yes`, {
    cwd: kratosDir,
  });
}

void (async () => {
  console.log(`Generating tmuxp config: ${tmuxpConfgFile}...`);
  const serializedTmuxp = dump(config);
  await writeFile(tmuxpConfgFile, serializedTmuxp);

  console.log(`Starting tmuxp...`);
  console.log(`cd ${bslDir} && tmuxp load ${tmuxpConfgFile}`);
})();
