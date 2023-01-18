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
import { waitForItScript } from './constants';
import { backendEnv, goQueueHandlerEnv, queueWorkerEnv, smeeWebhookUrl } from './env';
import { tmuxPane } from './tmux';

function waitForItCmd(host: string, port: number) {
  return `${waitForItScript} -h ${host} -p ${port} -t 30`;
}

const waitForGraphqlServer = waitForItCmd('localhost', 8080);
const waitForBackendServer = waitForItCmd('localhost', 3002);

export const backend = tmuxPane(['cd backend', `${backendEnv} yarn run start:server`]);

export const hasura = tmuxPane([
  'cd hasura',
  `${waitForGraphqlServer} && sleep 3`,
  'hasura console --skip-update-check',
]);

export const frontend = tmuxPane(['cd frontend', 'yarn run start:server']);

export const dockerCompose = tmuxPane([
  `sudo docker-compose down && ${waitForBackendServer} && sleep 1 && sudo docker-compose up`,
]);

export const queueWorker = tmuxPane(['cd backend', `${queueWorkerEnv} yarn run start:worker`]);

export const smeeWebhook = tmuxPane([`npx smee-client -u ${smeeWebhookUrl} -p 3002 -P /github/webhook/events`]);

export const generateCommon = tmuxPane([`cd common`, `yarn start`]);

export const generateLogger = tmuxPane([`cd logger`, `yarn start`]);

export const goQueueHandler = tmuxPane([`cd ingest-worker`, `${goQueueHandlerEnv} air`]);
