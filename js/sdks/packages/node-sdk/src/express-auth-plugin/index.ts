import { URL } from 'url';

import { JWTPayload } from 'jose/types';

import cookieParser from 'cookie-parser';
import { Router, Request, Response } from 'express';
import {LunaSecTokenAuthService} from "../token-auth-service";

export type AuthContextCallback = (req: Request) => JWTPayload | null;

export interface ExpressAuthPluginConfig {
  tokenService: LunaSecTokenAuthService;
  authContextCallback: AuthContextCallback
  payloadClaims?: string[];
}

export class LunaSecExpressAuthPlugin {
  private readonly secureFrameUrl: string;
  private readonly config: ExpressAuthPluginConfig;

  constructor(config: ExpressAuthPluginConfig) {
    this.config = config;
    const secureFrameUrl = process.env.SECURE_FRAME_URL;
    if (secureFrameUrl === undefined) {
      throw Error('SECURE_FRAME_URL not found in environment variables.');
    }
    this.secureFrameUrl = secureFrameUrl;
  }

  filterClaims(payload: JWTPayload): any {
    const whitelistedClaims = this.config.payloadClaims;
    if (whitelistedClaims === undefined) {
      return payload;
    }
    return Object.keys(payload)
      .filter(claim => whitelistedClaims.indexOf(claim) !== -1)
      .reduce((claims, claim) => {
      return {
        ...claims,
        [claim]: payload[claim]
      }
    }, {})
  }

  async buildSecureFrameRedirectUrl(stateToken: string, payloadClaims: any) {
    let authGrant = undefined;
    try {
      authGrant = await this.config.tokenService.authenticate(payloadClaims);
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
        error: 'state is not set in request',
      });
      return;
    }
    const payloadClaims = this.config.authContextCallback(req);
    if (payloadClaims === null) {
      res.status(400).send({
        error: 'unable to authenticate the user of this request',
      });
      return;
    }

    const redirectUrl = await this.buildSecureFrameRedirectUrl(stateToken, payloadClaims);
    if (redirectUrl === null) {
      console.error('unable to complete auth flow');
      res.status(400).send({
        error: 'unable to complete auth flow'
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
