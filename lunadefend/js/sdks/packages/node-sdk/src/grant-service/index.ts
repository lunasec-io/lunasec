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
import { isToken, Tokenizer } from '@lunasec/tokenizer-sdk';
import { Request } from 'express';

import { KeyService } from '../authentication';
import { SessionIdProvider } from '../authentication/types';

// This Service is a wrapper around the Tokenizer SDK's grant functionality
//  making it more user-friendly
/**
 * Creates and checks grants.
 */
export class Grants {
  private readonly auth: KeyService;
  private readonly tokenizerUrl: string;
  private readonly sessionIdProvider: SessionIdProvider | undefined;

  /**
   * @ignore
   */
  constructor(auth: KeyService, tokenizerUrl: string, sessionIdProvider?: SessionIdProvider) {
    this.auth = auth;
    this.tokenizerUrl = tokenizerUrl;
    this.sessionIdProvider = sessionIdProvider;
  }

  private async initializeTokenizer() {
    // TODO (cthompson) as long as the node-sdk is the source of truth for authentication
    // this is ok. Once we are using an auth provider for this information, this will need to change.
    // in the future this will happen inside a lambda instead of making a request to the go server
    const authenticationToken = await this.auth.createAuthenticationJWT('application', {});
    return new Tokenizer({
      url: this.tokenizerUrl,
      authenticationToken: authenticationToken.toString(),
    });
  }

  /**
   *   This private function handles the creating of just one grant, and is used by the public function below
   */
  private async createOneGrant(sessionId: string, token: string, customDuration?: string) {
    if (!isToken(token)) {
      throw new Error('Attempted to create a LunaSec Token Grant from a string that didnt look like a token');
    }
    const tokenizer = await this.initializeTokenizer();
    const resp = await tokenizer.createGrant(sessionId, token, customDuration);
    if (!resp.success) {
      throw new LunaSecError({
        message: `unable to set detokenization grant for: ${token}`,
        name: 'grantCreationFailure',
        code: '500',
      });
    }
  }

  // Public create can also handle arrays for people's convenience, so it mostly deals with handling the array and passes the verifying logic to the private function above
  /**
   * Creates a grant for a token or array of tokens
   * @throws LunaSecError
   * @param sessionId The session ID of the user to create a grant for, should match whatever your sessionIdProvider in your LunaSec Config returns
   * @param tokenOrTokens The token to create a grant for, or an array of tokens
   * @param customDuration The time you would like the grant to last for as a string like "45s" or "1h10m30s", not to exceed the grant_maximum_time configured for the Tokenizer Backend.  Omit to use the default configured time.
   * */
  public async create(
    sessionId: string,
    tokenOrTokens: string | string[],
    customDuration?: string
  ): Promise<void | void[]> {
    if (Array.isArray(tokenOrTokens)) {
      const grantPromises: Promise<void>[] = [];
      tokenOrTokens.forEach((t) => {
        grantPromises.push(this.createOneGrant(sessionId, t, customDuration));
      });
      return await Promise.all(grantPromises);
    } else {
      return await this.createOneGrant(sessionId, tokenOrTokens, customDuration);
    }
  }

  /**
   * This private function handles the verifying of just one grant, and is used by the public function below
   * */
  private async verifyOneGrant(sessionId: string, tokenId: string) {
    const authenticationToken = await this.auth.createAuthenticationJWT('application', {});

    const tokenizer = new Tokenizer({
      url: this.tokenizerUrl,
      authenticationToken: authenticationToken.toString(),
    });

    if (tokenId === '') {
      return Promise.resolve(); // no point in verifying empty tokens, allow them to be written to the db
    }
    if (!isToken(tokenId)) {
      throw new LunaSecError({
        name: 'badToken',
        message: 'Attempted to verify a LunaSec Token Grant from a string that didnt look like a token',
        code: '400',
      });
    }

    const res = await tokenizer.verifyGrant(sessionId, tokenId);
    if (!res.success) {
      throw res.error;
    }
    if (res.valid === false) {
      throw new LunaSecError({
        name: 'invalidGrant',
        message: 'Grant Invalid',
        code: '401',
      });
    }
    return;
  }

  // Public verify can also handle arrays for people's convenience, so it deals with handling the array and passes the verifying logic to the private function above
  /**
   * Verifies a token grant or array of token grants
   * @param sessionId
   * @param tokenOrTokens
   * @throws LunaSecError
   */
  public async verify(sessionId: string, tokenOrTokens: string | string[]) {
    // Todo: dry up this array handling from above, we are doing it twice.
    if (Array.isArray(tokenOrTokens)) {
      const grantPromises: Promise<void>[] = [];
      tokenOrTokens.forEach((t) => {
        grantPromises.push(this.verifyOneGrant(sessionId, t));
      });
      return await Promise.all(grantPromises);
    } else {
      return await this.verifyOneGrant(sessionId, tokenOrTokens);
    }
  }

  // _______________ GRAPHQL HELPER METHODS ________________________-
  // Uses the sessionIdProvider configured by the user

  private async getSessionIdFromReq(req: Request): Promise<string> {
    if (!this.sessionIdProvider) {
      throw new LunaSecError({
        code: '500',
        name: 'sessionError',
        message:
          'Attempted to grant or verifyGrant of a token automatically without the sessionIdProvider configured, check your LunaSec Config',
      });
    }
    const sessionId = await this.sessionIdProvider(req);
    // TODO: Will also need to support the case of the user not being logged in somehow, currently we just tell the user to make a temporary session but maybe there is a better solution
    if (typeof sessionId !== 'string') {
      throw new LunaSecError({
        message: 'Session ID from the SessionIdProvider passed in LunaSecOptions did not resolve to a string',
        code: '401',
        name: 'sessionError',
      });
    }
    return sessionId;
  }

  /**
   * @throws LunaSecError
   * @param req
   * @param token
   * @param customDuration
   */
  public async createWithAutomaticSessionId(req: Request, token: string | string[], customDuration?: string) {
    return this.create(await this.getSessionIdFromReq(req), token, customDuration);
  }

  /**
   * @throws LunaSecError
   * @param req
   * @param token
   */
  public async verifyWithAutomaticSessionId(req: Request, token: string | string[]) {
    return this.verify(await this.getSessionIdFromReq(req), token);
  }
}
