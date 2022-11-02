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

import { FileTransport, JsonTransport, LogIOTransport, LunaLogger } from '@lunatrace/logger';

import { getLogConfig, isProduction } from '../config';

const logConfig = getLogConfig();

export const log = new LunaLogger({ loggerName: logConfig.loggerName });

log.addTransport(
  new JsonTransport({
    colors: !isProduction,
    minLevel: isProduction ? 'info' : 'debug',
    pretty: !isProduction,
  })
);

if (logConfig.logFilePath) {
  log.addTransport(
    new FileTransport({
      filename: logConfig.logFilePath,
      minLevel: isProduction ? 'info' : 'debug',
    })
  );
}

// TODO (cthompson) formalize this into a README
// npm install -g log.io
// start log server: log.io-server
// go to: http://localhost:6688/
// need to check the boxes of log sources that you want to follow
// There is a way to build a config file that will start the server with a specific config: https://github.com/breadchris/log.io
// We can have field level filtering with something like this: https://ianwitherow.github.io/react-filterable-table/example/index.html

if (logConfig.enableLogIOLogging) {
  log.addTransport(
    new LogIOTransport({
      minLevel: isProduction ? 'info' : 'debug',
    })
  );
}
