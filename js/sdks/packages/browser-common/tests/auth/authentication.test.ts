/* eslint-disable @typescript-eslint/no-var-requires */
import { SecureFrameAuthClient } from '../../src/auth/auth-client'; // Just for type info

const realDate = Date.now;
const refreshTime = 60000;
const startTime = 100000000;

let startSessionManagement: () => Promise<() => void>;

let client: jest.MockedClass<typeof SecureFrameAuthClient>;
let clientMethods: typeof client.prototype;

declare global {
  interface Window {
    LUNASEC_AUTH_ERROR_HANDLER?: (e: Error) => void;
  }
}

console.debug = () => {};

describe('authentication.ts', () => {
  beforeEach(() => {
    // This is needed because we have state hanging around in authentication.ts(because of the singleton), and that stays in the
    // require-cache messing up subsequent tests, so by using this jest feature, we blow that away.  It ALSO blows away our mocks though,
    // so we have to set up our mocks again each time in this callback
    jest.isolateModules(() => {
      startSessionManagement = require('../../src/auth/authentication').startSessionManagement;
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
      clientMethods.verifySession.mockResolvedValue(Promise.resolve({ success: true, error: '' }));
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
        expect(clientMethods.verifySession).toBeCalledTimes(2);
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
      clientMethods.verifySession
        .mockResolvedValueOnce(Promise.resolve({ success: false, error: 'anError' }))
        .mockResolvedValue(Promise.resolve({ success: true, error: '' }));
      clientMethods.ensureSession.mockResolvedValue(Promise.resolve({} as Response));
    });

    it('should succeed', async () => {
      const destroyTimer = await startSessionManagement();
      expect(clientMethods.verifySession).toBeCalledTimes(2);
      expect(typeof destroyTimer).toBe('function');
    });
  });

  describe('when user has no session cookie and ensure fails to create one', () => {
    beforeEach(() => {
      clientMethods.verifySession.mockResolvedValue(Promise.resolve({ success: false, error: '' }));
    });

    it('should throw when no error handler set ', () => {
      expect.assertions(1);
      expect(startSessionManagement()).rejects.toEqual(
        new Error(
          'Unable to create secure frame session, is there a user currently authenticated to this site?  To handle this error gracefully call onLunaSecAuthError'
        )
      );
    });

    it('should call error handler when one set ', async () => {
      window.LUNASEC_AUTH_ERROR_HANDLER = jest.fn();
      await startSessionManagement();
      expect(window.LUNASEC_AUTH_ERROR_HANDLER).toBeCalled();
      window.LUNASEC_AUTH_ERROR_HANDLER = undefined;
    });
  });

  describe('when a request was already in flight', () => {
    it('it should not make any additional server calls', () => {
      clientMethods.verifySession.mockResolvedValue(
        new Promise(() => {
          /*block*/
        })
      );

      void startSessionManagement();
      void startSessionManagement();
      expect(clientMethods.verifySession).toBeCalledTimes(1);
    });
  });
});
