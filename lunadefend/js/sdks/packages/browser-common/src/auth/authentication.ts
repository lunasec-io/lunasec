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
import { LunaSecError } from '@lunasec/isomorphic-common';

import { SecureFrameAuthClient } from './auth-client';
// This could probably be a local variable but just worried about any potential duplication between a custom app and our libraries makes the singletons a little sketchier

// TODO: support configurable refresh inverval
// const refreshTimeInMinutes = process.env.LUNASEC_VERIFY_SESSION_INTERVAL
//const refreshInterval = 5 * 60000; // 5 mins
const refreshInterval = 1 * 60000; // 5 mins

let lastAuthenticatedTime: number | null = null;
let authFlowInProgress: Promise<boolean> | null = null;

declare global {
  interface Window {
    __DEBUG_LUNASEC_AUTH__: boolean | undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const log = window.__DEBUG_LUNASEC_AUTH__ === true ? console.log : () => {};

// If you can figure out a simpler way to do this, please write it. This function:
// 1 ) Starts the auth flow by calling authenticate session
// 2 ) Starts a timer that will do the auth flow again on an interval
// 3 ) Returns a promise, which when the first auth flow is complete, resolves to a function that can be called to clear whatever the last timer was.  This is our "abort"
export class LunaSecAuthentication {
  private readonly authClient: SecureFrameAuthClient;
  private readonly errorHandler: (_e: Error) => void;
  private readonly sessionAuthProvider?: string;

  constructor(authDomain: string, errorHandler: (e: Error) => void, sessionAuthProvider?: string) {
    this.authClient = new SecureFrameAuthClient(authDomain);
    if (!errorHandler) {
      throw new LunaSecError({
        code: '500',
        name: 'errorHandlerUnset',
        message: 'Must set error handler for LunaSec auth',
      });
    }
    this.errorHandler = errorHandler;
    this.sessionAuthProvider = sessionAuthProvider;
  }

  async startSessionManagement(): Promise<() => void> {
    log('session management called');
    await this.authenticateSession();

    const timer = setInterval(() => {
      log('timer called authenticate session for a second run');
      this.authenticateSession().catch((e) => {
        throw e;
      });
    }, refreshInterval);

    return function destroyTimer() {
      clearInterval(timer);
    };
  }

  // TODO (forrest) move this authentication logic into the LunaSecConfigContext provider and get rid of a lot of this logic
  async authenticateSession(): Promise<Promise<boolean> | void> {
    // Stop every component from making a request on first page load
    if (authFlowInProgress) {
      if (lastAuthenticatedTime) {
        // If a request is in flight but we already had an older session, just resolve immediately
        log('previous request in flight but old session exists, returning instantly');
        return;
      } else {
        // or if this is the first time and we dont have an older session, block until the session gets set
        log('previous request in flight and no old session, returning request promise');
        return authFlowInProgress;
      }
    }
    log('authenticate session not skipping');

    if (!lastAuthenticatedTime || lastAuthenticatedTime < Date.now() - refreshInterval) {
      log('need to fetch new session');
      authFlowInProgress = this.validateOrCreateSession();
      const authSuccess = await authFlowInProgress;
      if (authSuccess) {
        lastAuthenticatedTime = Date.now();
      }
      authFlowInProgress = null;
    } else {
      log('authenticated recently enough to skip the auth flow');
    }
  }

  /**
    Ensure session will first call into the secure frame to create an auth flow state session
    it will then redirect to the auth provider to verify the user's identity
    the auth provider will then redirect back to the secure frame's '/session/create' endpoint
    this will finalize the authentication request and set an 'access_token' cookie on the secure frame origin

    Because we are redirecting cross origin, ensure session will not have a response as it is set to execute
    with 'no-cors' set. It is possible to experience an error in this request flow.
   */
  async validateOrCreateSession(): Promise<boolean> {
    log('ensuring the secure frame has a valid session');

    // We can get NO information back from this call because of CORS, so we have to call again afterwards
    await this.authClient.ensureSession(this.sessionAuthProvider);

    log('verifying the created session is valid');
    const verifyResponse = await this.authClient.verifySession();
    if (!verifyResponse.success) {
      this.errorHandler(verifyResponse.error);
      return false;
    }

    return true;
  }
}
