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
import path from 'path';
import { URL } from 'url';

import cookieParser from 'cookie-parser';
import { Request, Response, Router } from 'express';
import { JWTPayload } from 'jose/types';

import { KeyService } from '../authentication';
import { SessionIdProvider } from '../authentication/types';

export interface ExpressAuthPluginConfig {
  sessionIdProvider: SessionIdProvider;
  payloadClaims?: string[];
  secureFrameURL: string;
  auth: KeyService;
  pluginBaseUrl?: string;
}

export class LunaSecExpressAuthPlugin {
  private readonly secureFrameUrl: string;
  private readonly auth: KeyService;
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

  async buildSecureFrameRedirectUrl(stateToken: string, sessionId: string) {
    // This gets set into the "access_token" cookie by the Secure Frame Backend after the redirect
    let access_token = undefined;
    try {
      const claims = { session_id: sessionId };
      access_token = await this.auth.createAuthenticationJWT('user', claims);
    } catch (e) {
      console.error(`error while attempting to create authentication token: ${e}`);
    }

    if (access_token === undefined) {
      return null;
    }

    const redirectUrl = new URL('/session/create', this.secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', access_token.toString());
    return redirectUrl;
  }

  async redirectToTokenizer(req: Request, res: Response) {
    const authFlowCorrelationToken = req.query.state;
    if (typeof authFlowCorrelationToken !== 'string') {
      res.status(400).send({
        success: false,
        error: 'state is not set in request',
      });
      return;
    }

    const sessionId = await this.config.sessionIdProvider(req);
    if (sessionId === null) {
      res.status(400).send({
        success: false,
        error: 'unable to authenticate the user of this request',
      });
      return;
    }

    // session id could be passed in as a number, enforce that this value is a string
    const normalizedSessionId = sessionId.toString();

    // This method creates the JWT that becomes the iframe's "access_token" cookie, which contains the sessionId
    const redirectUrl = await this.buildSecureFrameRedirectUrl(authFlowCorrelationToken, normalizedSessionId);
    if (redirectUrl === null) {
      console.error('unable to complete auth flow, redirectURL not set');
      res.status(400).send({
        success: false,
        error: 'unable to complete auth flow, building redirect url from node-sdk to go server failed',
      });
      return;
    }

    console.log('LunaSec Auth Plugin is redirecting request back to tokenizer backend.W');

    res.redirect(redirectUrl.href);
  }

  async handleJwksRequest(_req: Request, res: Response) {
    const jwkConfig = await this.auth.getJwksConfig();
    const keys = {
      keys: [
        {
          ...jwkConfig,
          kid: 'lunasec-signing-key',
        },
      ],
    };
    res.json(keys).status(200);
  }

  getUrlPath(urlPath: string): string {
    if (this.config.pluginBaseUrl !== undefined) {
      return path.join(this.config.pluginBaseUrl, urlPath);
    }
    return urlPath;
  }

  register(app: Router) {
    // Rename this route to "/redirect-to-tokenizer", it doesnt have anything to do with the iframe.
    app.get(this.getUrlPath('/secure-frame'), cookieParser(), this.redirectToTokenizer.bind(this));
    app.get(this.getUrlPath('/.lunasec/jwks.json'), this.handleJwksRequest.bind(this));
  }
}
