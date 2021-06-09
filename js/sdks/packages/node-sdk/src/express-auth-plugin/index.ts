import { URL } from 'url';

import { UnsecuredJWT } from 'jose/jwt/unsecured';
import { JWTPayload } from 'jose/types';

import cookieParser from 'cookie-parser';
import { Router, Request, Response } from 'express';
import {LunaSecTokenAuthService} from "../token-auth-service";

export interface ExpressAuthPluginConfig {
  tokenService: LunaSecTokenAuthService;
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

  async handleSecureFrameAuthRequest(req: Request, res: Response) {
    const stateToken = req.query.state;

    if (typeof stateToken !== 'string') {
      res.status(400).send({
        error: 'state is not set in request',
      });
      return;
    }

    const idToken = req.cookies['id_token'];

    if (idToken === undefined) {
      console.error('id_token is not set in request');
      res.status(400).send({
        error: 'id_token is not set in request',
      });
      return;
    }

    // TODO (cthompson) we probably want to validate this token to make
    // sure that it is signed by an auth provider

    const parsedJwt = UnsecuredJWT.decode(idToken, {});

    const payloadClaims = this.filterClaims(parsedJwt.payload);

    const authGrant = await this.config.tokenService.authenticate(payloadClaims);

    const redirectUrl = new URL(this.secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', authGrant.toString());
    redirectUrl.pathname = '/session/create';

    console.log('redirecting...', redirectUrl.href);

    res.redirect(redirectUrl.href);
  }

  async register(app: Router) {
    app.get('/secure-frame', cookieParser(), this.handleSecureFrameAuthRequest.bind(this));
  }
}
