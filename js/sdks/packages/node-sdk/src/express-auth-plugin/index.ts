import { URL } from 'url';

import cookieParser from 'cookie-parser';
import { Request, Response, Router } from 'express';
import { JWTPayload } from 'jose/types';

import { LunaSecAuthentication } from '../authentication';
import { SessionIdProvider } from '../authentication/types';

export interface ExpressAuthPluginConfig {
  sessionIdProvider: SessionIdProvider;
  payloadClaims?: string[];
  secureFrameURL: string;
  auth: LunaSecAuthentication;
}

export class LunaSecExpressAuthPlugin {
  private readonly secureFrameUrl: string;
  private readonly auth: LunaSecAuthentication;
  private readonly config: ExpressAuthPluginConfig;

  constructor(config: ExpressAuthPluginConfig) {
    this.auth = config.auth;
    this.config = config;
    this.secureFrameUrl = config.secureFrameURL;
  }

  filterClaims(payload: JWTPayload): any {
    const whitelistedClaims = this.config.payloadClaims;
    if (whitelistedClaims === undefined) {
      return payload;
    }
    return Object.keys(payload)
      .filter((claim) => whitelistedClaims.indexOf(claim) !== -1)
      .reduce((claims, claim) => {
        return {
          ...claims,
          [claim]: payload[claim],
        };
      }, {});
  }

  async buildSecureFrameRedirectUrl(stateToken: string) {
    let authGrant = undefined;
    try {
      authGrant = await this.auth.createAuthenticationJWT({});
    } catch (e) {
      console.error(`error while attempting to create authentication token: ${e}`);
    }

    if (authGrant === undefined) {
      return null;
    }

    const redirectUrl = new URL(this.secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', authGrant.toString());
    redirectUrl.pathname += '/session/create';
    return redirectUrl;
  }

  async handleSecureFrameAuthRequest(req: Request, res: Response) {
    const stateToken = req.query.state;

    if (typeof stateToken !== 'string') {
      res.status(400).send({
        success: false,
        error: 'state is not set in request',
      });
      return;
    }
    // TODO: DO SOMETHING WITH THIS SESSIONID
    const sessionId = this.config.sessionIdProvider(req);
    if (sessionId === null) {
      res.status(400).send({
        success: false,
        error: 'unable to authenticate the user of this request',
      });
      return;
    }

    const redirectUrl = await this.buildSecureFrameRedirectUrl(stateToken);
    if (redirectUrl === null) {
      console.error('unable to complete auth flow');
      res.status(400).send({
        success: false,
        error: 'unable to complete auth flow',
      });
      return;
    }

    console.log('redirecting...', redirectUrl.href);

    res.redirect(redirectUrl.href);
  }

  register(app: Router) {
    app.get('/secure-frame', cookieParser(), this.handleSecureFrameAuthRequest.bind(this));
  }
}
