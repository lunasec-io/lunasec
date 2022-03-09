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
import { graphql, GraphqlResponseError } from '@octokit/graphql';
import { Configuration, Identity, V0alpha2ApiFactory } from '@ory/kratos-client';
import express from 'express';

import { callHasura } from '../hasura-calls/baseHasuraClient';

const operation = `
    mutation GetUserAccessToken($user_id: uuid!) {
        insert_builds_one(object: {project_id: $project_id, s3_url: $s3_url}) {
          id
        }
    }
`;

export async function getUserGithubAccessToken(variables: { user_id: string }): Promise<string> {
  const data = await callHasura(operation, 'InsertBuild', variables);
  if (!data.insert_builds_one) {
    console.error('Hasura response missing fields ', data);
    throw new Error('Failed to download manifest for processing');
  }
  return '';
}

export const githubApiRouter = express.Router();

export interface KratosIdentityConfig {
  providers: KratosIdentityProvider[];
}

export interface KratosIdentityProvider {
  initial_id_token: string;
  subject: string;
  provider: string;
  initial_access_token: string;
  initial_refresh_token: string;
}

function getGithubAccessToken(identity: Identity) {
  if (!identity.credentials) {
    throw new Error('credentials are not set for identity');
  }

  const oidcCreds = identity.credentials['oidc'];
  if (!oidcCreds.config) {
    throw new Error('config is not set for oidc credentials');
  }

  const config = oidcCreds.config as KratosIdentityConfig;
  const githubProviders = config.providers.filter((provider) => provider.provider === 'github-oauth');
  if (githubProviders.length !== 1) {
    throw new Error('could not find exactly one github oidc provider');
  }

  const githubProvider = githubProviders[0];
  return githubProvider.initial_access_token;
}

githubApiRouter.post('/github/user/projects', async (req, res) => {
  const kratosConfig = new Configuration({
    basePath: 'http://localhost:4434',
  });

  const kratosApiClient = V0alpha2ApiFactory(kratosConfig);

  const userId = req.body.user_id;

  const identity = await kratosApiClient.adminGetIdentity(userId, ['oidc']);

  const accessToken = getGithubAccessToken(identity.data);

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  try {
    const response = await graphqlWithAuth(
      `query ($login: String!) {
      organization(login: $login) {
        repositories(privacy: PRIVATE) {
          totalCount
        }
      }
    }`,
      { login: 'breadchris' }
    );
    res.send(response);
  } catch (e) {
    console.error(e);
    if (e instanceof GraphqlResponseError) {
      res.send({
        error: e.message,
      });
    } else {
      // TODO (cthompson) what other error types exist?
      res.send({
        error: e,
      });
    }
  }
});
