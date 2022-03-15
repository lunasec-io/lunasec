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
import { graphql } from '@octokit/graphql';
import { Configuration, Identity, V0alpha2ApiFactory } from '@ory/kratos-client';
import deepmerge from 'deepmerge';
import express from 'express';

import { hasura } from '../hasura-api';
import {
  AuthorizedUserOrganizationsQuery,
  Identities_Constraint,
  Identities_Obj_Rel_Insert_Input,
  Organization_User_Constraint,
  Organization_User_Insert_Input,
  Organizations_Constraint,
  Organizations_Insert_Input,
  Organizations_Obj_Rel_Insert_Input,
} from '../hasura-api/generated';

import { GetUserOrganizationsQuery } from './generated';
import { pullDataForInstallation } from './installation-populate';

import { generateGithubGraphqlClient } from './index';

export const githubApiRouter = express.Router();

githubApiRouter.get('/webhook/github/install', async (req, res) => {
  const installationIdQueryParam = req.query.installation_id;
  const setupActionQueryParam = req.query.setup_action;

  const error = req.query.error;
  const error_description = req.query.error_description;
  const error_uri = req.query.error_uri;

  if (error) {
    res.status(401).send({
      error: error,
      description: error_description,
      uri: error_uri,
    });
    return;
  }

  if (!installationIdQueryParam || typeof installationIdQueryParam !== 'string') {
    res.status(401).send({
      error: 'installation_id not provided in query params',
    });
    return;
  }

  const installationId = parseInt(installationIdQueryParam, 10);

  const installationData = await pullDataForInstallation(installationId);

  const {
    data: { repositories },
  } = installationData;

  type OrganizationInputLookup = Record<string, Organizations_Insert_Input>;

  const organizations = repositories.reduce((orgLookup, repo) => {
    const orgName = repo.owner.login;
    const organizationId = repo.owner.id;
    const repoName = repo.name;
    const repoId = repo.id;
    const gitUrl = repo.git_url;

    const project = {
      name: repoName,
      github_repositories: {
        data: [
          {
            github_id: repoId,
            git_url: gitUrl,
            api_response: repo,
          },
        ],
      },
    };

    const getExistingProjects = (orgLookup: OrganizationInputLookup) => {
      const existingOrg = orgLookup[orgName];
      if (!existingOrg || !existingOrg.projects) {
        return [];
      }
      return existingOrg.projects.data;
    };

    return {
      ...orgLookup,
      [orgName]: {
        name: orgName,
        installation_id: installationId,
        github_id: organizationId,
        projects: {
          data: [...getExistingProjects(orgLookup), project],
        },
      },
    };
  }, {} as OrganizationInputLookup);

  await hasura.CreateOrganizations({
    objects: Object.values(organizations),
  });

  res.status(302).redirect('http://localhost:4455/');
});

function getGithubAccessToken(identity: Identity) {
  if (!identity.credentials) {
    throw new Error('credentials are not set for identity');
  }

  const oidcCreds = identity.credentials['oidc'];
  if (!oidcCreds.config) {
    throw new Error('config is not set for oidc credentials');
  }

  const config = oidcCreds.config as KratosIdentityConfig;

  const githubProviders = config.providers.filter((provider) => provider.provider === 'github-app');
  if (githubProviders.length !== 1) {
    throw new Error('could not find exactly one github oidc provider');
  }

  const githubProvider = githubProviders[0];
  return githubProvider.initial_access_token;
}

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

githubApiRouter.post('/webhook/github/login', async (req, res) => {
  const kratosConfig = new Configuration({
    basePath: 'http://localhost:4434',
  });

  const kratosApiClient = V0alpha2ApiFactory(kratosConfig);

  const userId = req.body.ctx.identity.id;

  const identity = await kratosApiClient.adminGetIdentity(userId, ['oidc']);

  const accessToken = getGithubAccessToken(identity.data);

  const github = generateGithubGraphqlClient(accessToken);

  let orgsAfter: string | null | undefined = undefined;
  let allUserOrgs: GetUserOrganizationsQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    const userOrgs: GetUserOrganizationsQuery = await github.GetUserOrganizations({
      orgsAfter: orgsAfter,
    });

    allUserOrgs = deepmerge(allUserOrgs || {}, userOrgs);

    if (!userOrgs.viewer) break;

    const orgPageInfo = userOrgs.viewer.organizations.pageInfo;

    orgsAfter = orgPageInfo.hasNextPage ? orgPageInfo.startCursor : null;
    moreDataAvailable = !!orgsAfter;
  }

  console.log('got orgs for user');

  if (allUserOrgs === null || !allUserOrgs.viewer) {
    throw new Error('github user organizations response is null');
  }

  const orgNodes = allUserOrgs.viewer.organizations.nodes;

  if (!orgNodes) {
    throw new Error('organization nodes are not defined');
  }

  const githubOrgIds = orgNodes.reduce<number[]>((filtered, org) => {
    if (!org) return filtered;
    /*
     * Example: MDEyOk9yZ2FuaXphdGlvbjgzMjQ0NTUw -> 012:Organization83244550
     */
    const idDecoded = Buffer.from(org.id, 'base64').toString();
    const idParts = idDecoded.split(':');
    const idNormalized = idParts[1].replace('Organization', '');
    const idNumber = parseInt(idNormalized, 10);

    return [...filtered, idNumber];
  }, []);

  const authorizedUserOrgs: AuthorizedUserOrganizationsQuery = await hasura.AuthorizedUserOrganizations({
    github_org_ids: githubOrgIds,
  });

  const organizationUserInput: Organization_User_Insert_Input[] = authorizedUserOrgs.organizations.map((org) => {
    return {
      user_id: userId,
      organization_id: org.id,
    };
  });

  const resp = await hasura.UpdateOrganizationsForUser({
    organizations_for_user: organizationUserInput,
  });

  res.send({
    authenticated_orgs: resp.insert_organization_user?.affected_rows,
  });
});
