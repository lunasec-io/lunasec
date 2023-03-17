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
import { writeFile } from 'fs/promises';

// eslint-disable-next-line import/order
import dotenv from 'dotenv';

dotenv.config({ path: './.env.dev' });
dotenv.config({ path: '../bsl/backend/.env.dev' });
dotenv.config();

import { dump } from 'js-yaml';

import { bslDir, tmuxpConfgFile } from './constants';
import {
  backend,
  dockerCompose,
  frontend,
  generateCommon,
  generateLogger,
  goQueueHandler,
  hasura, pythonGrpc,
  queueWorker,
  smeeWebhook,
} from './services';
import { tmuxpConfig, tmuxWindow } from './tmux';

const servicesWindow = tmuxWindow('services', [hasura, frontend, dockerCompose]);

const workerWindow = tmuxWindow('workers', [queueWorker, goQueueHandler, pythonGrpc]);

const backendWindow = tmuxWindow('backend', [smeeWebhook, backend]);

const generatedCodeWindow = tmuxWindow('generated-code', [generateCommon, generateLogger]);

const config = tmuxpConfig('lunatrace', [servicesWindow, backendWindow, workerWindow, generatedCodeWindow]);

void (async () => {
  console.log(`Generating tmuxp config: ${tmuxpConfgFile}...`);
  const serializedTmuxp = dump(config);
  await writeFile(tmuxpConfgFile, serializedTmuxp);

  console.log(`Starting tmuxp...`);
  console.log(`cd ${bslDir} && tmuxp load ${tmuxpConfgFile}`);
})();
