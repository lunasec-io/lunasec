import { __SECURE_FRAME_URL__ } from '../constants';
import {SecureFrameAuthClient} from "./auth-client";

// This could probably be a local variable but just worried about any potential duplication between a custom app and our libraries makes the singletons a little sketchier
declare global {
  interface Window {
    LUNASEC_AUTH_ERROR_HANDLER: (e: Error) => void;
  }
}

// TODO: support env var refresh interval
// const refreshTimeInMinutes = process.env.LUNASEC_VERIFY_SESSION_INTERVAL
//const refreshInterval = 5 * 60000; // 5 mins
const refreshInterval = 1 * 60000; // 5 mins

const authClient = new SecureFrameAuthClient();
let lastAuthenticatedTime: number | null = null;
let authFlowInProgress: Promise<boolean> | null = null;

// If you can figure out a simpler way to do this, please write it. This function:
// 1 ) Starts the auth flow by calling authenticate session
// 2 ) Starts a timer that will do the auth flow again on a timer, recursively
// 3 ) Returns a promise, which when the first auth flow is complete, resolves to a function that can be called to clear whatever the last timer was.  This is our "abort"
export function startSessionManagement(): Promise<() => void> {
  return authenticateSession().then(() => {
    let timer: NodeJS.Timer;
    function setAuthTimerLoop(): NodeJS.Timer {
      return setTimeout(() => {
        void authenticateSession();
        timer = setAuthTimerLoop();
      }, refreshInterval);
    }
    timer = setAuthTimerLoop();
    return function destroyTimer() {
      clearInterval(timer);
    };
  });
}

async function authenticateSession() {
  // Stop every component from making a request on first page load
  if (authFlowInProgress) {
    if (lastAuthenticatedTime) {
      // If a request is in flight but we already had an older session, just resolve immediately
      console.debug('previous request in flight but old session exists, returning instantly');
      return Promise.resolve();
    } else {
      // or if this is the first time and we dont have an older session, block until the session gets set
      console.debug('previous request in flight and no old session, returning request promise');
      return Promise.resolve(authFlowInProgress);
    }
  }
  console.debug('Start new auth flow');

  if (!lastAuthenticatedTime || lastAuthenticatedTime < Date.now() - refreshInterval) {
    console.debug('need to fetch new session');

    try {
      authFlowInProgress = doAuthFlow();
      const authSuccess = await authFlowInProgress;
      if (authSuccess) {
        lastAuthenticatedTime = Date.now();
        authFlowInProgress = null;
      }
    } catch (e) {
      // TODO: Throw or escalate this error in a better way to the client application, right now it crashes the app
      throw e;
    }

    lastAuthenticatedTime = Date.now();
    authFlowInProgress = null;
  }
}

async function doAuthFlow() {
  const firstVerifyResponse = await authClient.verifySession();
  if (firstVerifyResponse.success) {
    console.debug('secure frame session is verified');
    return false;
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
  await authClient.ensureSession();

  console.debug('verifying the created session is valid');
  const secondVerifyResponse = await authClient.verifySession();
  if (!secondVerifyResponse.success) {
    // TODO: Throw or escalate this error in a better way to the client application, right now it crashes the app
    const e = new Error(
      'Unable to create secure frame session, is there a user currently authenticated to this site?  To handle this error gracefully call onLunaSecAuthError'
    );
    // This can optionally be set in @lunasec/react-sdk/utils/setAuthErrorHandler
    if (window.LUNASEC_AUTH_ERROR_HANDLER) {
      window.LUNASEC_AUTH_ERROR_HANDLER(e);
      return false;
    } else {
      throw e;
    }
  }
  return true;
}
