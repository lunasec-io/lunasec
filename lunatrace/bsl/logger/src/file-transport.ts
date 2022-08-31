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
import * as fs from 'fs';

import { LevelChoice, logLevels, LogObj, Transport } from './types';

export interface FileTransportOptions {
  filename: string;
  minLevel: LevelChoice;
}

export class FileTransport implements Transport {
  private filename: string;
  private fileStream: fs.WriteStream;

  constructor(public options: FileTransportOptions) {
    this.filename = options.filename;
    this.fileStream = fs.createWriteStream(options.filename, { flags: 'a' });
  }

  public send(logObj: LogObj): void {
    const levelNumber = logLevels.indexOf(logObj.level);
    const minLevelNumber = logLevels.indexOf(this.options.minLevel);
    if (levelNumber < minLevelNumber) {
      return;
    }

    const logString = JSON.stringify(logObj, undefined, 0);

    this.fileStream.write(logString + '\n', (e) => {
      if (e) {
        console.error(`unable to write log message to: ${this.filename}`, e);
      }
    });
  }
}
