/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import axios from 'axios';

import { newApp } from './app';
import { getServerConfig } from './config';
import { log } from './utils/log';

const serverConfig = getServerConfig();

void (async () => {
  const app = await newApp();
  try {
    app.listen(serverConfig.serverPort, () => {
      log.info('Server is running on port ', serverConfig.serverPort);
    });
  } catch (e) {
    log.error('UNCAUGHT TOP LEVEL ERROR, PROCESS WILL EXIT', { error: e });
    throw e;
  }
})().catch(async (e) => {
  log.error('unable to start server', {
    error: e,
  });
  await sendErrorToDiscord(e);
  throw e;
});

function sendErrorToDiscord(e: unknown): Promise<unknown> {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL_SECRET;
  if (!discordUrl) {
    log.error('Tried to send a discord message but could not load url, probably not in production');
    return Promise.resolve();
  }
  const errString = String(e);
  return axios.post(discordUrl, {
    content: 'Fatal Error in Node Process: ' + errString,
    embeds: null,
    attachments: [],
  });
}
