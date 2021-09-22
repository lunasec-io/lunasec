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
import { KeyService } from '../authentication';
import { SecretConfig, SessionIdProvider } from '../authentication/types';
import { LunaSecExpressAuthPlugin } from '../express-auth-plugin';
import { LunaSecGrantService } from '../grant-service';
import { setGrantServiceForDirective, TokenDirective } from '../graphql';
import { SecureResolver } from '../secure-resolver';
import { SecureResolverSdkConfig } from '../secure-resolver/types';

// Please attempt to keep this configuration organized and named in a way that is easy for the API user to understand
// Todo: Do TSDoc for all these params

export interface LunaSecConfig {
  secureFrameURL: string;
  auth: {
    pluginBaseUrl?: string;
    secrets: SecretConfig;
    payloadClaims?: string[]; // Note that not setting this allows unfiltered claims to be set, do we want that?
    sessionIdProvider: SessionIdProvider; // A callback used in situations where we have the req object and would like to know the sessionId
  };
  secureResolverConfig?: SecureResolverSdkConfig;
}

// This is the main class that customers will create to use LunaSec on their node server
// When created, it exposes the other customer-facing classes like the grant service and express plugin.
// It also works as a dependency injector, for example: passing auth into those plugins' constructors so that they are able to make authentication JWTs to talk to the server.
export class LunaSec {
  public keyService: KeyService;
  public grants: LunaSecGrantService;
  public expressAuthPlugin: LunaSecExpressAuthPlugin;
  public tokenDirective: typeof TokenDirective; // Graphql initializes this class, not us
  public secureResolvers?: SecureResolver;

  constructor(config: LunaSecConfig) {
    this.keyService = new KeyService(config.auth.secrets);
    // This express plugin is created here if users optionally wish to access it and register it onto their app
    this.expressAuthPlugin = new LunaSecExpressAuthPlugin({
      auth: this.keyService,
      sessionIdProvider: config.auth.sessionIdProvider,
      payloadClaims: config.auth.payloadClaims,
      secureFrameURL: config.secureFrameURL,
      pluginBaseUrl: config.auth.pluginBaseUrl,
    });

    this.grants = new LunaSecGrantService(this.keyService, config.auth.sessionIdProvider);
    setGrantServiceForDirective(this.grants);
    this.tokenDirective = TokenDirective;
    if (config.secureResolverConfig) {
      this.secureResolvers = new SecureResolver(config.secureResolverConfig);
    }
  }
}
