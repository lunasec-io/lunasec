/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
/* eslint-disable @typescript-eslint/no-var-requires */
import { LunaSecError } from '../../../isomorphic-common'; // Just for type info
import { SecureFrameAuthClient } from '../../src/auth/auth-client';

const realDate = Date.now;
const refreshTime = 60000;
const startTime = 100000000;
const errorHandler = jest.fn();

let startSessionManagement: () => Promise<() => void>;

let client: jest.MockedClass<typeof SecureFrameAuthClient>;
let clientMethods: typeof client.prototype;

// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// window.__DEBUG_LUNASEC_AUTH__ = true; // USE THIS IF YOU NEED TO DEBUG ANYTHING

// eslint-disable-next-line @typescript-eslint/no-empty-function
console.debug = () => {};

describe('authentication.ts', () => {
  beforeEach(() => {
    // This is needed because we have state hanging around in authentication.ts(because of the singleton), and that stays in the
    // require-cache messing up subsequent tests, so by using this jest feature, we blow that away.  It ALSO blows away our mocks though,
    // so we have to set up our mocks again each time in this callback
    jest.isolateModules(() => {
      const { LunaSecAuthentication } = require('../../src/auth/authentication');
      const auth = new LunaSecAuthentication('www.fakedomain.com', errorHandler);
      startSessionManagement = () => auth.startSessionManagement() as Promise<() => void>;
      client = require('../../src/auth/auth-client').SecureFrameAuthClient as jest.MockedClass<
        typeof SecureFrameAuthClient
      >;
      clientMethods = client.prototype;
      jest.mock('../../src/auth/auth-client');
    });
    jest.useFakeTimers();

    Date.now = jest.fn(() => startTime);
  });

  afterEach(() => {
    Date.now = realDate;
    client.mockReset();
    jest.useRealTimers();
  });

  describe('when user has a session cookie', () => {
    beforeEach(() => {
      clientMethods.verifySession.mockResolvedValue({ success: true });
      clientMethods.ensureSession.mockResolvedValue({} as Response);
    });

    describe('and calls authenticateSession() for the first time', () => {
      it('should call verify once and then resolve', async () => {
        await startSessionManagement();
        expect(clientMethods.verifySession).toBeCalledTimes(1);
      });

      it('should check again after the refresh time has elapsed', async () => {
        await startSessionManagement();
        Date.now = jest.fn(() => startTime + refreshTime + 1);
        jest.advanceTimersByTime(refreshTime + 1);
        expect(clientMethods.ensureSession).toBeCalledTimes(2);
      });

      it('should remove call clearInterval when we call the deleteTimer callback', async () => {
        const deleteTimer = await startSessionManagement();
        expect(jest.getTimerCount()).toBe(1);
        deleteTimer();
        expect(jest.getTimerCount()).toBe(0); // this is truly peak testing right here
      });
    });

    describe('and calls authenticateSession after it has already been called once', () => {
      it('should do nothing but set a timer if not enough time has passed', async () => {
        await startSessionManagement();
        await startSessionManagement();
        expect(clientMethods.verifySession).toBeCalledTimes(1);
      });
    });
  });

  describe('when no cookie is set but ensure successfully creates one successfully', () => {
    beforeEach(() => {
      // First call to verify fails but second one succeeds
      clientMethods.verifySession.mockResolvedValue({ success: true });
      clientMethods.ensureSession.mockResolvedValue(Promise.resolve({} as Response));
    });

    it('should succeed', async () => {
      const destroyTimer = await startSessionManagement();
      expect(clientMethods.verifySession).toBeCalledTimes(1);
      expect(typeof destroyTimer).toBe('function');
    });
  });

  describe('when user has no session cookie and ensure fails to create one', () => {
    const fakeError = new LunaSecError(new Error(''));
    beforeEach(() => {
      clientMethods.verifySession.mockResolvedValue(Promise.resolve({ success: false, error: fakeError }));
    });

    it('should call error handler when one set ', async () => {
      await startSessionManagement();
      expect(errorHandler).toBeCalledWith(fakeError);
    });
  });

  describe('when a request was already in flight', () => {
    it('it should not make any additional server calls', () => {
      clientMethods.ensureSession.mockResolvedValue(
        new Promise(() => {
          /*block*/
        })
      );

      void startSessionManagement();
      void startSessionManagement();
      expect(clientMethods.ensureSession).toHaveBeenCalledTimes(1);
    });
  });
});
