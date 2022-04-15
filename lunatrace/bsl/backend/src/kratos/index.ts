/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Configuration, V0alpha2ApiFactory } from '@ory/kratos-client';

import { KratosIdentityConfig } from '../types/kratos';
import {defaultLogger} from "../utils/logger";

export async function getGithubAccessTokenFromKratos(
  userId: string
): Promise<{ error: false; token: string } | { error: true; message: string }> {
  defaultLogger.info('getGithubAccessTokenFromKratos called for user:', userId);
  const kratosConfig = new Configuration({
    basePath: 'http://localhost:4434',
  });

  const kratosApiClient = V0alpha2ApiFactory(kratosConfig);

  const kratosRes = await kratosApiClient.adminGetIdentity(userId, ['oidc']);
  const identity = kratosRes.data;

  if (!identity.credentials) {
    return { error: true, message: 'credentials are not set for identity' };
  }

  const oidcCreds = identity.credentials['oidc'];
  if (!oidcCreds.config) {
    return { error: true, message: 'config is not set for oidc credentials' };
  }

  const config = oidcCreds.config as KratosIdentityConfig;

  const githubProviders = config.providers.filter((provider) => provider.provider === 'github-app');
  if (githubProviders.length < 1) {
    return { error: true, message: 'No oidc providers for this user' };
  }
  if (githubProviders.length > 1) {
    return { error: true, message: 'Too many oidc providers for this user, there should be only one' };
  }

  const githubProvider = githubProviders[0];
  return { error: false, token: githubProvider.initial_access_token };
}
