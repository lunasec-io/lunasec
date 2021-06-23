import { __SECURE_FRAME_URL__ } from '../constants';

// This could probably be a local variable but just worried about any potential duplication between a custom app and our libraries makes the singletons a little sketchier
declare global {
  interface Window {
    LUNASEC_AUTH_ERROR_HANDLER: (e: Error) => void;
  }
}

// TODO: support env var refresh interval
// const refreshTimeInMinutes = process.env.LUNASEC_VERIFY_SESSION_INTERVAL
const refreshInterval = 5 * 60000; // 5 mins

let lastAuthenticatedTime: number | null = null;
let authFlowInProgress: Promise<boolean> | null = null;

// If you can figure out a simpler way to do this, please write it. This function:
// 1 ) Starts the auth flow by calling authenticate session
// 2 ) Starts a timer that will do the auth flow again on a timer, recursively
// 3 ) Returns a promise, which when the first auth flow is complete, resolves to a function that can be called to clear whatever the last timer was.  This is our "abort"
export async function startSessionManagement(): Promise<() => void> {
  await authenticateSession();

  const timer = setInterval(() => {
    authenticateSession().catch((e) => {
      throw e;
    });
  }, refreshInterval);

  return function destroyTimer() {
    clearInterval(timer);
  };
}

async function authenticateSession(): Promise<Promise<boolean> | void> {
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
    authFlowInProgress = validateOrCreateSecureFrameSession();
    const authSuccess = await authFlowInProgress;
    if (authSuccess) {
      lastAuthenticatedTime = Date.now();
      authFlowInProgress = null;
    }
  }
}

async function validateOrCreateSecureFrameSession(): Promise<boolean> {
  const firstEnsureResponse = await ensureSession();
  if (firstEnsureResponse.status === 200) {
    const ensureResponse = await firstEnsureResponse.json();
    if (ensureResponse.error === false) {
      console.debug('secure frame session is verified');
      return true;
    }
  }
  // If the above was not 200, we need to send more requests to verify the session
  await verifySession();
  const secondEnsureResponse = await ensureSession();
  const ensureResponse = await secondEnsureResponse.json();

  if (secondEnsureResponse.status !== 200 || ensureResponse.error === true) {
    // TODO: Throw or escalate this error in a better way to the client application, right now it crashes the app
    const e = new Error(
      'Unable to create secure frame session, is there a user currently authenticated to this site?  To handle this error gracefully call onLunaSecAuthError'
    );
    // This can optionally be set in @lunasec/react-sdk/utils/setAuthErrorHandler
    if (typeof window.LUNASEC_AUTH_ERROR_HANDLER !== 'function') {
      throw e;
    }
    window.LUNASEC_AUTH_ERROR_HANDLER(e);
    return false;
  }

  return true;
}

function ensureSession() {
  const secureFrameEnsureSessionURL = new URL(__SECURE_FRAME_URL__);
  secureFrameEnsureSessionURL.pathname += '/session/ensure';

  return fetch(secureFrameEnsureSessionURL.toString(), {
    credentials: 'include',
    mode: 'cors',
  });
}

function verifySession() {
  const secureFrameVerifySessionURL = new URL(__SECURE_FRAME_URL__);
  secureFrameVerifySessionURL.pathname += '/session/verify';

  // dispatch to the secure frame session verifier to make sure that a secure frame session exists
  return fetch(secureFrameVerifySessionURL.toString(), {
    credentials: 'include',
    mode: 'no-cors',
  });
}
