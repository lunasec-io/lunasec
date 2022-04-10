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
import { promisify } from 'util';

import { ConsoleTransport } from '../logger/console-transport';
import { LunaLogger } from '../logger/main';
import { logLevels } from '../logger/types';
const log = new LunaLogger({ callsite: false }, {});
log.addTransport(new ConsoleTransport({ minLevel: 'debug', colors: false, pretty: true }));

const consoleSpy = jest.spyOn(console, 'log');
const nextTick = promisify(process.nextTick);

describe('LunaLogger', () => {
  // beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('appends any object properties from the first argument', () => {
    log.log({ test: 'field' });
    const output = consoleSpy.mock.calls[0][0];
    parseAndCheck(output, 'test', 'field');
  });
  it('stringifies anything else into message', () => {
    log.log(['test'], 'test message');
    const output = consoleSpy.mock.calls[0][0];
    parseAndCheck(output, 'message', '["test"]test message');
  });

  describe('helper method', () => {
    logLevels.forEach((level) => {
      it(`${level} works`, () => {
        log[level]('testMessage');
        const output = consoleSpy.mock.calls[0][0];
        parseAndCheck(output, 'level', level);
      });
    });
  });

  describe('child logger', () => {
    it('appends any child additional fields', () => {
      const childLogger = log.child({ child: 'field' });
      childLogger.log('test');
      const output = consoleSpy.mock.calls[0][0];
      parseAndCheck(output, 'child', 'field');
    });
  });
  // This is just extremely hard to test because of the async issue.. Feature is manually tested
  // it('finds the callsite', async () => {
  //   const logWithCallsite = new LunaLogger({ callsite: true }, {});
  //
  //   await logWithCallsite._doLog('info', ['hi there']);
  //   await new Promise(process.nextTick);
  //   expect(consoleSpy).toBeCalledTimes(1);
  //   const output = consoleSpy.mock.calls[0][0];
  //   expect(JSON.stringify(output)).toHaveProperty('fileLink')
  // });
});

function parseAndCheck(jsonString: string, key: string, value: unknown) {
  const parsed = JSON.parse(jsonString); // This breaks if we use color, interestingly
  expect(parsed[key]).toEqual(value);
}
