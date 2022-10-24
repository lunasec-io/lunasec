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
import colorize from 'json-colorizer';

import { LevelChoice, logLevels, LogObj, Transport } from './types';

export interface ConsoleTransportOptions {
  colors: boolean;
  pretty: boolean;
  minLevel: LevelChoice;
}

type ColorOptions = NonNullable<Parameters<typeof colorize>[1]>['colors'];

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export class JsonTransport implements Transport {
  constructor(public options: ConsoleTransportOptions) {}

  public send(logObj: LogObj): void {
    const levelNumber = logLevels.indexOf(logObj.level);
    const minLevelNumber = logLevels.indexOf(this.options.minLevel);
    if (levelNumber < minLevelNumber) {
      return;
    }

    const spacing = this.options.pretty ? 2 : 0;
    // some trickery to get the message on the bottom
    const { message, ...logWithoutMessage } = logObj;
    const logWithMessageOnBottom = { ...logWithoutMessage, message };

    const logString = JSON.stringify(logWithMessageOnBottom, getCircularReplacer(), spacing);
    if (this.options.colors) {
      const colors = this.getColors(logObj.level);
      console.log(colorize(logString, { colors }));
      return;
    }
    console.log(logString);
    return;
  }

  private getColors(level: LevelChoice): ColorOptions {
    if (level === 'warn') {
      return {
        BRACE: '#ff6700',
        BRACKET: 'redBright.bold',
        STRING_KEY: '#ff6700',
      };
    }
    if (level === 'error') {
      return {
        BRACE: 'redBright.bold',
        BRACKET: 'redBright.bold',
        STRING_KEY: 'red',
        STRING_LITERAL: 'redBright',
      };
    }
    return {};
  }
}
