import { SecureFrameAuthClient } from './auth-client';

// This could probably be a local variable but just worried about any potential duplication between a custom app and our libraries makes the singletons a little sketchier

// TODO: support env var refresh interval
// const refreshTimeInMinutes = process.env.LUNASEC_VERIFY_SESSION_INTERVAL
//const refreshInterval = 5 * 60000; // 5 mins
const refreshInterval = 1 * 60000; // 5 mins

let lastAuthenticatedTime: number | null = null;
let authFlowInProgress: Promise<boolean> | null = null;

// If you can figure out a simpler way to do this, please write it. This function:
// 1 ) Starts the auth flow by calling authenticate session
// 2 ) Starts a timer that will do the auth flow again on an interval
// 3 ) Returns a promise, which when the first auth flow is complete, resolves to a function that can be called to clear whatever the last timer was.  This is our "abort"
export class LunaSecAuthentication {
  private readonly authClient: SecureFrameAuthClient;
  private readonly errorHandler: (e: Error) => void;
  private readonly sessionAuthProvider?: string;

  constructor(authDomain: string, errorHandler: (e: Error) => void, sessionAuthProvider?: string) {
    this.authClient = new SecureFrameAuthClient(authDomain);
    this.errorHandler = errorHandler;
    this.sessionAuthProvider = sessionAuthProvider;
  }

  async startSessionManagement(): Promise<() => void> {
    await this.authenticateSession();

    const timer = setInterval(() => {
      this.authenticateSession().catch((e) => {
        throw e;
      });
    }, refreshInterval);

    return function destroyTimer() {
      clearInterval(timer);
    };
  }

  // TODO: It might be possible to move this authentication logic into the LunaSecConfigContext provider somehow and get rid of a lot of this logic

  async authenticateSession(): Promise<Promise<boolean> | void> {
    // Stop every component from making a request on first page load
    if (authFlowInProgress) {
      if (lastAuthenticatedTime) {
        // If a request is in flight but we already had an older session, just resolve immediately
        console.debug('previous request in flight but old session exists, returning instantly');
        return;
      } else {
        // or if this is the first time and we dont have an older session, block until the session gets set
        console.debug('previous request in flight and no old session, returning request promise');
        return authFlowInProgress;
      }
    }
    console.debug('Start new auth flow');

    if (!lastAuthenticatedTime || lastAuthenticatedTime < Date.now() - refreshInterval) {
      console.debug('need to fetch new session');
      authFlowInProgress = this.validateOrCreateSession();
      const authSuccess = await authFlowInProgress;
      if (authSuccess) {
        lastAuthenticatedTime = Date.now();
      }
      authFlowInProgress = null;
    } else {
      console.debug('authenticated recently enough to skip the auth flow');
    }
  }

  async validateOrCreateSession(): Promise<boolean> {
    const firstVerifyResponse = await this.authClient.verifySession(); // If these calls throw, they will be uncaught and crash the app. Do we want that?
    if (firstVerifyResponse.success) {
      console.debug('secure frame session is verified');
      return true;
    }
    console.debug('secure frame session is not verified, creating a new session');

    /*
      If the above was not a success, we need to send more requests to verify the session.

      Ensure session will first call into the secure frame to create an auth flow state session
      it will then redirect to the auth provider to verify the user's identity
      the auth provider will then redirect back to the secure frame's '/session/create' endpoint
      this will finalize the authentication request and set an 'access_token' cookie on the secure frame origin

      Because we are redirecting cross origin, ensure session will not have a response as it is set to execute
      with 'no-cors' set. It is possible to experience an error in this request flow.
     */
    console.debug('ensuring the secure frame has a valid session');
    await this.authClient.ensureSession(this.sessionAuthProvider);

    console.debug('verifying the created session is valid');
    const secondVerifyResponse = await this.authClient.verifySession();
    if (!secondVerifyResponse.success) {
      const e = new Error(secondVerifyResponse.error);
      this.errorHandler(e);
      return false;
    }

    return true;
  }
}
