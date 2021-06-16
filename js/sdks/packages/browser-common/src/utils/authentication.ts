let requestInProgress: Promise<void> | null = null;
const lastAuthenticatedTime: number | null = null;
import { __SECURE_FRAME_URL__ } from '../constants';

export async function authenticateSession() {
  // Stop every component from trying to do this flow on first page load
  // If a request is in flight but we already had an older session, just resolve immediately
  if (requestInProgress) {
    if (lastAuthenticatedTime) {
      // If a request is in flight but we already had an older session, just resolve immediately
      return Promise.resolve();
    } else {
      // or if this is the first time and we dont have an older session, block until the session gets set
      return Promise.resolve(requestInProgress);
    }
  }

  // TODO: support env var refresh interval
  // const refreshTimeInMinutes = process.env.LUNASEC_VERIFY_SESSION_INTERVAL

  const refreshInterval = 5 * 60000; // 5 mins
  if (!lastAuthenticatedTime || lastAuthenticatedTime < Date.now() - refreshInterval) {
    requestInProgress = doAuthFlow();
    await doAuthFlow();
    requestInProgress = null;
  }
}

async function doAuthFlow() {
  const secureFrameEnsureSessionURL = new URL(__SECURE_FRAME_URL__);
  secureFrameEnsureSessionURL.pathname = '/session/ensure';

  const firstEnsureResponse = await ensureSession();
  if (firstEnsureResponse.status === 200) {
    console.debug('secure frame session is verified');
    return;
  }
  // If the above was not 200, we need to send more requests to verify the session
  await verifySession();
  const secondEnsureResponse = await ensureSession();

  if (secondEnsureResponse.status !== 200) {
    // TODO: Throw or escalate this error in a better way.
    throw new Error('unable to create secure frame session, is there a user currently authenticated to this site?');
  }

  return;
}

function ensureSession() {
  const secureFrameEnsureSessionURL = new URL(__SECURE_FRAME_URL__);
  secureFrameEnsureSessionURL.pathname = '/session/ensure';

  return fetch(secureFrameEnsureSessionURL.toString(), {
    credentials: 'include',
    mode: 'cors',
  });
}

function verifySession() {
  const secureFrameVerifySessionURL = new URL(__SECURE_FRAME_URL__);
  secureFrameVerifySessionURL.pathname = '/session/verify';

  // dispatch to the secure frame session verifier to make sure that a secure frame session exists
  return fetch(secureFrameVerifySessionURL.toString(), {
    credentials: 'include',
    mode: 'no-cors',
  });
}
