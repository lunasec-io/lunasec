import { GrantType, isToken, Tokenizer } from '@lunasec/tokenizer-sdk';
import { Request } from 'express';

import { LunaSecAuthentication } from '../authentication';
import { SessionIdProvider } from '../authentication/types';

export class LunaSecGrantService {
  private readonly auth: LunaSecAuthentication;
  private readonly sessionIdProvider: SessionIdProvider | undefined;

  constructor(auth: LunaSecAuthentication, sessionIdProvider?: SessionIdProvider) {
    this.auth = auth;
    this.sessionIdProvider = sessionIdProvider;
  }

  public async grant(sessionId: string, tokenId: string) {
    console.log('granting token using sessionId ', sessionId);
    if (!isToken(tokenId)) {
      throw new Error('Attempted to create a LunaSec Token Grant from a string that didnt look like a token');
    }
    // TODO (cthompson) as long as the node-sdk is the source of truth for authentication
    // this is ok. Once we are using an auth provider for this information, this will need to change.
    // in the future this will happen inside a lambda instead of making a request to the go server
    const authenticationToken = await this.auth.createAuthenticationJWT({});

    const tokenizer = new Tokenizer({
      authenticationToken: authenticationToken.toString(),
    });
    const resp = await tokenizer.setGrant(sessionId, tokenId, 'read_token');
    if (!resp.success) {
      throw new Error(`unable to set detokenization grant for: ${tokenId}`);
    }
  }

  public async verifyGrant(sessionId: string, tokenId: string, grantType: GrantType) {
    if (tokenId === '') {
      return Promise.resolve(); // no point in verifying empty tokens, allow them to be written to the db
    }
    if (!isToken(tokenId)) {
      throw new Error('Attempted to verify a LunaSec Token Grant from a string that didnt look like a token');
    }
    const authenticationToken = await this.auth.createAuthenticationJWT({});

    const tokenizer = new Tokenizer({
      authenticationToken: authenticationToken.toString(),
    });
    const resp = await tokenizer.verifyGrant(sessionId, tokenId, grantType);
    if (!resp.success) {
      throw new Error(`unable to verify tokenization grant for: ${tokenId}`);
    }
  }

  // _______________ GRAPHQL HELPER METHODS ________________________-
  // Uses the sessionIdProvider configured by the user

  private async getSessionIdFromReq(req: Request): Promise<string> {
    if (!this.sessionIdProvider) {
      throw new Error(
        'Attempted to grant or verifyGrant of a token automatically without the sessionIdProvider configured, check your LunaSec Config'
      );
    }
    const sessionId = await this.sessionIdProvider(req);
    // TODO: Will also need to support the case of the user not being logged in somehow, maybe that will be a URL param and can be handled by the customer in their callback
    if (typeof sessionId !== 'string') {
      const err = new Error(
        'Session ID from the SessionIdProvider passed in LunaSecOptions did not resolve to a string'
      );
      //@ts-ignore node errors have this .code property, don't know what typescript is complaining about
      err.code = 401;
      throw err;
    }
    return sessionId;
  }

  public async grantWithAutomaticSessionId(req: Request, tokenId: string) {
    return this.grant(await this.getSessionIdFromReq(req), tokenId);
  }

  public async verifyGrantWithAutomaticSessionId(req: Request, tokenId: string, grantType: GrantType) {
    return this.verifyGrant(await this.getSessionIdFromReq(req), tokenId, grantType);
  }
}
