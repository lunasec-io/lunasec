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

import { JsonTransport, logLevels, LunaLogger } from '../index';
const log = new LunaLogger({ trace: false }, {});
log.addTransport(new JsonTransport({ minLevel: 'debug', colors: false, pretty: true }));

const consoleMock = jest.spyOn(console, 'log');

describe('LunaLogger', () => {
  // beforeEach(() => {});
  afterEach(() => {
    // Nice to see the raw value, really shows you how colors screw up the output
    console.log('Console was called with: ', consoleMock.mock.calls);
    jest.clearAllMocks();
  });

  it('ignores lower level logs', () => {
    const ignoreLogger = new LunaLogger();
    ignoreLogger.addTransport(new JsonTransport({minLevel: 'info', colors: false, pretty: false}));
    ignoreLogger.debug('this is ignored');
    ignoreLogger.info('this is not ignored');
    expect(consoleMock).toBeCalledTimes(1);
  });

  it('appends any object properties from the first argument', () => {
    log.log({test: 'field'});
    const output = consoleMock.mock.calls[0][0];
    parseAndCheck(output, 'test', 'field');
  });

  it('stringifies anything else into message', () => {
    log.log(['test'], 'test message');
    const output = consoleMock.mock.calls[0][0];
    parseAndCheck(output, 'message', '["test"]test message');
  });

  describe('helper method', () => {
    logLevels.forEach((level) => {
      it(`${level} works`, () => {
        log[level]('testMessage');

        const output = consoleMock.mock.calls[0][0];
        parseAndCheck(output, 'level', level);
      });
    });
  });

  describe('child logger', () => {
    it('appends any child additional fields', () => {
      const childLogger = log.child({child: 'field'});
      childLogger.log('test');
      const output = consoleMock.mock.calls[0][0];
      parseAndCheck(output, 'child', 'field');
    });
  });

  describe('logger provider', () => {
    it('adds fields', async () => {
      await log.provideFields({asyncStored: 'field'}, () => {
        log.info('should have stored field');
        const output = consoleMock.mock.calls[0][0];
        parseAndCheck(output, 'asyncStored', 'field');
        return;
      })
    })

  it('preserves fields on nesting', async () => {
    await log.provideFields({asyncStored: 'field'}, () => {
      await log.provideFields({anotherAsyncStored: 'field'}, () => {
        log.info('should have stored field');
        const output = consoleMock.mock.calls[0][0];
        parseAndCheck(output, 'asyncStored', 'field');
        parseAndCheck(output, 'anotherAsyncStored', 'field');
        return;
      })
    })
  })

  })
})

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

function parseAndCheck(jsonString: string, key: string, value: unknown) {
  const parsed = JSON.parse(jsonString); // This breaks if we use color, interestingly
  expect(parsed[key]).toEqual(value);
}
