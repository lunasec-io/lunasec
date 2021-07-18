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
    let openIdToken = undefined;
    try {
      openIdToken = await this.auth.createAuthenticationJWT({});
    } catch (e) {
      console.error(`error while attempting to create authentication token: ${e}`);
    }

    if (openIdToken === undefined) {
      return null;
    }

    const redirectUrl = new URL(this.secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', openIdToken.toString());
    redirectUrl.pathname += '/session/create';
    return redirectUrl;
  }

  async handleSecureFrameAuthRequest(req: Request, res: Response) {
    console.log('HANDLING SECURE FRAME AUTH REQUEST');
    const authFlowCorrelationToken = req.query.state;
    console.log('correlation token is ', authFlowCorrelationToken);
    if (typeof authFlowCorrelationToken !== 'string') {
      res.status(400).send({
        success: false,
        error: 'state is not set in request',
      });
      return;
    }
    // DO SOMETHING WITH THIS SESSIONID?  Is this even necessary to do here or is this taken care of by the go server
    // const sessionId = await this.config.sessionIdProvider(req);
    // console.log('sessionId is ', sessionId);
    // if (sessionId === null) {
    //   res.status(400).send({
    //     success: false,
    //     error: 'unable to authenticate the user of this request',
    //   });
    //   return;
    // }
    // console.log('accepted sessionid ', sessionId);
    const redirectUrl = await this.buildSecureFrameRedirectUrl(authFlowCorrelationToken);
    if (redirectUrl === null) {
      console.error('unable to complete auth flow, redirectURL not set');
      res.status(400).send({
        success: false,
        error: 'unable to complete auth flow, building redirect url from node-sdk to go server failed',
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
