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
import * as net from 'net';

import { LevelChoice, logLevels, LogObj, Transport } from './types';

export interface LogIOTransportOptions {
  minLevel: LevelChoice;
}

class LogIOClient {
  private readonly socket: net.Socket;
  private address: string;
  private port: number;

  constructor(address: string, port: number) {
    this.socket = new net.Socket();
    this.address = address;
    this.port = port;
  }

  init() {
    const { address, port } = this;
    this.socket.connect(port, address, () => {
      console.log(`LogIOClient connected: ${address}:${port}`);
    });

    this.socket.on('close', () => {
      console.log('LogIOClient closed');
    });
  }

  async send(message: string) {
    const s = this.socket;
    return new Promise((resolve, reject) => {
      s.write(message);

      s.on('data', (data) => {
        resolve(data);
        if (data.toString().endsWith('exit')) {
          s.destroy();
        }
      });

      s.on('error', (err) => {
        reject(err);
      });
    });
  }
}

function getSourceAndRemove(logObj: LogObj): string {
  const logContextWithSource = logObj.context as { source?: string };
  if (logContextWithSource.source) {
    const source = logContextWithSource.source;

    // remove source from context to ensure that it only gets logged in one place
    delete logContextWithSource.source;
    return source;
  }
  return 'source';
}

export class LogIOTransport implements Transport {
  private logIOClient: LogIOClient;
  constructor(public options: LogIOTransportOptions) {
    const host = 'localhost';
    const port = 6689;
    this.logIOClient = new LogIOClient(host, port);

    try {
      this.logIOClient.init();
    } catch (e) {
      console.error(`unable to connect to LogIO on ${host}:${port}`);
    }
  }

  public send(logObj: LogObj): void {
    const levelNumber = logLevels.indexOf(logObj.level);
    const minLevelNumber = logLevels.indexOf(this.options.minLevel);
    if (levelNumber < minLevelNumber) {
      return;
    }

    const logSource = getSourceAndRemove(logObj);
    const ctxString = JSON.stringify(logObj.context, undefined, 0);

    this.logIOClient.send(`+msg|${logObj.name}|${logSource}|[${ctxString}]\n\t${logObj.message}\0`).catch((e) => {
      console.error('unable to send message to LogIO');
    });
    return;
  }
}
