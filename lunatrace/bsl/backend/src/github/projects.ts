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
import deepmerge from 'deepmerge';
import express from 'express';

import { hasura } from '../hasura-api';
import {
  AuthorizedUserOrganizationsQuery,
  Github_Repositories_Constraint,
  Github_Repositories_On_Conflict,
  Github_Repositories_Update_Column,
  Organization_User_Insert_Input,
  Organizations_Insert_Input,
  Projects_Constraint,
  Projects_Insert_Input,
  Projects_On_Conflict,
  Projects_Update_Column,
} from '../hasura-api/generated';

import { GetUserOrganizationsQuery } from './generated';
import { pullDataForInstallation } from './installation-populate';

import { generateGithubGraphqlClient } from './index';

export const githubApiRouter = express.Router();

githubApiRouter.get('/github/install', async (req, res) => {
  const installationIdQueryParam = req.query.installation_id;
  const setupActionQueryParam = req.query.setup_action;

  console.log(`[installId: ${installationIdQueryParam}] Installing Github App to organization`);

  const error = req.query.error;
  const error_description = req.query.error_description;
  const error_uri = req.query.error_uri;

  if (error) {
    console.log(`[installId: ${installationIdQueryParam}] Error installing Github App: ${error_description}`);
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

  console.log(
    `[installId: ${installationIdQueryParam}] Collected installation data: ${repositories.map((repo) => repo.name)}`
  );

  type OrganizationInputLookup = Record<string, Organizations_Insert_Input>;

  const organizations = repositories.reduce((orgLookup, repo) => {
    const orgName = repo.owner.login;
    const organizationId = repo.owner.id;
    const repoName = repo.name;
    const repoId = repo.id;
    const gitUrl = repo.git_url;

    const repoOnConflict: Github_Repositories_On_Conflict = {
      constraint: Github_Repositories_Constraint.GithubRepositoriesGithubIdKey,
      update_columns: [Github_Repositories_Update_Column.GitUrl, Github_Repositories_Update_Column.ApiResponse],
    };

    const project: Projects_Insert_Input = {
      name: repoName,
      github_repositories: {
        data: [
          {
            github_id: repoId,
            git_url: gitUrl,
            api_response: repo,
          },
        ],
        on_conflict: repoOnConflict,
      },
    };

    const getExistingProjects = (orgLookup: OrganizationInputLookup) => {
      const existingOrg = orgLookup[orgName];
      if (!existingOrg || !existingOrg.projects) {
        return [];
      }
      return existingOrg.projects.data;
    };

    const projectOnConflict: Projects_On_Conflict = {
      constraint: Projects_Constraint.ProjectsNameOrganizationIdKey,
      update_columns: [Projects_Update_Column.Repo],
    };

    const orgData: Organizations_Insert_Input = {
      name: orgName,
      installation_id: installationId,
      github_id: organizationId,
      projects: {
        data: [...getExistingProjects(orgLookup), project],
        on_conflict: projectOnConflict,
      },
    };

    return {
      ...orgLookup,
      [orgName]: orgData,
    };
  }, {} as OrganizationInputLookup);

  const orgObjectList = Object.values(organizations);

  console.log(
    `[installId: ${installationIdQueryParam}] Creating LunaTrace organizations and projects: ${orgObjectList.map(
      (org) => org.name
    )}`
  );

  await hasura.CreateOrganizations({
    objects: orgObjectList,
  });

  res.status(302).redirect('http://localhost:4455/');
});

async function getGithubAccessTokenFromKratos(userId: string) {
  const kratosConfig = new Configuration({
    basePath: 'http://localhost:4434',
  });

  const kratosApiClient = V0alpha2ApiFactory(kratosConfig);

  const kratosResp = await kratosApiClient.adminGetIdentity(userId, ['oidc']);

  const identity = kratosResp.data;

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

githubApiRouter.post('/github/login', async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId: string = req.body.ctx.identity.id as string;

  console.log(`[user: ${userId}] Github login webhook started`);

  const accessToken = await getGithubAccessTokenFromKratos(userId);

  const github = generateGithubGraphqlClient(accessToken);

  let orgsAfter: string | null | undefined = undefined;
  let allUserOrgs: GetUserOrganizationsQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    console.log(`[user: ${userId}] Requesting Github user's organizations page`);

    const getUserOrgs = async (): Promise<GetUserOrganizationsQuery | null> => {
      try {
        return await github.GetUserOrganizations({
          orgsAfter: orgsAfter,
        });
      } catch (e) {
        console.error(e);
        return null;
      }
    };
    const userOrgs = await getUserOrgs();

    if (userOrgs === null) {
      // TODO (cthompson) is there a way that we can more gracefully handle this error? We might need to redirect the user back to the github auth page?
      console.debug(
        'If you are seeing this then you should delete the user from kratos and go through this flow again.'
      );
      throw new Error(
        `Unable to get user's organizations. This is most likely due to the user having revoked the Github auth from their account and attempting to login again.`
      );
    }

    allUserOrgs = deepmerge(allUserOrgs || {}, userOrgs);

    if (!userOrgs.viewer) break;

    const orgPageInfo = userOrgs.viewer.organizations.pageInfo;

    orgsAfter = orgPageInfo.hasNextPage ? orgPageInfo.startCursor : null;
    moreDataAvailable = !!orgsAfter;
  }

  console.log(`[user: ${userId}] Collected Github user's organizations.`);

  if (allUserOrgs === null || !allUserOrgs.viewer) {
    throw new Error('github user organizations response is null');
  }

  const orgNodes = allUserOrgs.viewer.organizations.nodes;

  if (!orgNodes) {
    throw new Error('organization nodes are not defined');
  }

  console.debug(`[user: ${userId}] Github user's organizations count: ${orgNodes.length}`);

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

  console.debug(`[user: ${userId}] Github user's organization ids: ${githubOrgIds}`);

  // TODO (cthompson) handle error cases for when this fails

  const authorizedUserOrgs: AuthorizedUserOrganizationsQuery = await hasura.AuthorizedUserOrganizations({
    github_org_ids: githubOrgIds,
  });

  console.debug(`[user: ${userId}] Authorized LunaTrace organizations: ${authorizedUserOrgs.organizations}`);

  const organizationUserInput: Organization_User_Insert_Input[] = authorizedUserOrgs.organizations.map((org) => {
    return {
      user_id: userId,
      organization_id: org.id,
    };
  });

  const resp = await hasura.UpdateOrganizationsForUser({
    organizations_for_user: organizationUserInput,
  });

  if (!resp.insert_organization_user) {
    throw new Error(`[user: ${userId}] Updating LunaTrace user organizations failed`);
  }

  console.log(
    `[user: ${userId}] Authenticated user to LunaTrace organizations: ${resp.insert_organization_user.returning}`
  );

  res.send({
    authenticated_orgs: resp.insert_organization_user?.affected_rows,
  });
});
