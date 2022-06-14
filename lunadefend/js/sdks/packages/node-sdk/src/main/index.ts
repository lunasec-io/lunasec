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
import { ExpressAuthPlugin } from '../express-auth-plugin';
import { Grants } from '../grant-service';
import { setGrantServiceForDirective, TokenDirective } from '../graphql';
import { SecureResolver } from '../secure-resolver';
import { SecureResolverSdkConfig } from '../secure-resolver/types';

// Please attempt to keep this configuration organized and named in a way that is easy for the API user to understand.

/**
 * The configuration for the LunaSec Node Plugin
 */
export interface LunaSecConfig {
  /** The URL where the tokenizer backend can be queried */
  tokenizerURL: string;
  /** The configuration for authentication */
  auth: {
    /** Optionally add a baseroute to the auth plugin's routes, useful if you need all of your application routes to be behind some route like `/api` */
    pluginBaseUrl?: string;
    /**
     * A configuration object that tells the LunaSec JWT generator where to find the signing key.  LunaSec uses JWTs minted on your server in a few places.
     *
     * @example
     * ```
     * {
     *   provider: 'environment'
     * }
     * ```
     * which will read the signing key from `process.env.LUNASEC_SIGNING_KEY` as base64 encoded
     *
     * Or for example to just pass it in directly
     * @example
     * ```
     * {type:'manual',
     * signingKey: createPrivateKey(signingKey)
     * }
     * ```
     * This needs to be a node KeyLike object
     */
    secrets: SecretConfig;
    /** Optionally set claims for the JWT, this is currently not used */
    // payloadClaims?: string[]; // Note that not setting this allows unfiltered claims to be set, do we want that?

    /** A callback used automatically by LunaSec when we have the req object and would like to know the sessionId.  Used in automatic granting and also the Auth Plugin */
    sessionIdProvider: SessionIdProvider;
    /** Optionally have the auth redirect URL use localhost as the domain name. This is used in the demo mode and local development. */
    publicTokenizerUrl?: string;
  };
  /** Optionally configure the Secure Resolver functionality of the plugin, must be configured if you want to use Secure Resolvers */
  secureResolverConfig?: SecureResolverSdkConfig;
}

/**
 * This is the main class that you will instantiate on your node server.
 * When created, it instantiates other classes and sets them as public properties you can use like the grant service and express plugin.
 * @example ``` myLunaSec.grants.verify('sessionId','someToken')```
 */
export class LunaSec {
  public keyService: KeyService;
  /** an instance of the grant service for handling grants, LunaSecs permission system */
  public grants: Grants;
  /** an instance of the auth plugin that can be optionally registered onto your express server if you would like to bootstrap from your own session management */
  public expressAuthPlugin: ExpressAuthPlugin;
  /** A graphQL directive for automatically dealing with grants in your schema */
  public tokenDirective: typeof TokenDirective; // Graphql initializes this class, not us
  /** LunaSec Secure Resolvers, for running functions that handle sensitive data in a secure context */
  public secureResolvers?: SecureResolver;

  constructor(config: LunaSecConfig) {
    this.keyService = new KeyService(config.auth.secrets);
    // This express plugin is created here if users optionally wish to access it and register it onto their app
    this.expressAuthPlugin = new ExpressAuthPlugin({
      auth: this.keyService,
      sessionIdProvider: config.auth.sessionIdProvider,
      // payloadClaims: config.auth.payloadClaims,
      tokenizerURL: config.tokenizerURL,
      pluginBaseUrl: config.auth.pluginBaseUrl,
      publicTokenizerUrl: config.auth.publicTokenizerUrl,
    });

    this.grants = new Grants(this.keyService, config.tokenizerURL, config.auth.sessionIdProvider);
    setGrantServiceForDirective(this.grants);
    this.tokenDirective = TokenDirective;
    if (config.secureResolverConfig) {
      this.secureResolvers = new SecureResolver(config.secureResolverConfig);
    }
  }
}
