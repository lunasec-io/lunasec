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
import deepmerge from 'deepmerge';
import express, { Request, Response } from 'express';

import { getServerConfig } from '../config';
import { hasura } from '../hasura-api';
import {
  AuthorizedUserOrganizationsQuery,
  CreateOrganizationsMutation,
  Organization_User_Insert_Input,
  UpdateOrganizationsForUserMutation,
} from '../hasura-api/generated';
import { getGithubAccessTokenFromKratos } from '../kratos';
import { ListReposAccessibleToInstallationResponseType } from '../types/github';
import { errorResponse, logError } from '../utils/errors';
import { tryParseInt } from '../utils/parse-int';
import { isError, Try, tryF } from '../utils/try';

import { GetUserOrganizationsQuery } from './generated';
import { pullDataForInstallation } from './installation-populate';
import { lunatraceOrgsFromGithubOrgs } from './organizations';

import { generateGithubGraphqlClient } from './index';

const serverConfig = getServerConfig();

export const githubInstall = async (req: Request, res: Response) => {
  const installationIdQueryParam = req.query.installation_id;
  const setupActionQueryParam = req.query.setup_action;

  if (!installationIdQueryParam || typeof installationIdQueryParam !== 'string') {
    res.status(401).send(errorResponse('installation_id not provided in query params'));
    return;
  }

  const installationIdRet = tryParseInt(installationIdQueryParam, 10);

  if (!installationIdRet.success) {
    res.status(401).send(errorResponse('installation_id is not a valid integer'));
    return;
  }

  const installationId = installationIdRet.value;

  console.log(`[installId: ${installationId}] Installing Github App to organization`);

  const error = req.query.error;
  const errorDescription = req.query.error_description;
  const errorUri = req.query.error_uri;

  if (error) {
    console.log(`[installId: ${installationId}] Error installing Github App: ${errorDescription}`);
    res.status(401).send(
      errorResponse(
        JSON.stringify({
          error: error,
          description: errorDescription,
          uri: errorUri,
        })
      )
    );
    return;
  }

  const installDataRes: Try<ListReposAccessibleToInstallationResponseType> = await tryF(
    async () => await pullDataForInstallation(installationId)
  );

  if (isError(installDataRes)) {
    logError(installDataRes);
    res.status(500).send(errorResponse('unable to collect Github information for install.'));
    return;
  }

  const organizations = lunatraceOrgsFromGithubOrgs(installationId, installDataRes);
  const orgObjectList = Object.values(organizations);

  console.log(
    `[installId: ${installationId}] Creating LunaTrace organizations and projects: ${orgObjectList.map(
      (org) => org.name
    )}`
  );

  const createOrgsRes: Try<CreateOrganizationsMutation> = await tryF(
    async () =>
      await hasura.CreateOrganizations({
        objects: orgObjectList,
      })
  );

  if (isError(createOrgsRes)) {
    logError(createOrgsRes);
    res
      .status(500)
      .send(errorResponse('unable to create LunaTrace organizations from collected Github Organizations.'));
    return;
  }

  const orgIds = createOrgsRes.insert_organizations
    ? createOrgsRes.insert_organizations.returning.map((o) => o.id as string)
    : [];

  console.log(`[installId: ${installationId}] Created/updated LunaTrace organizations: ${orgIds}`);

  res.status(302).redirect(serverConfig.sitePublicUrl);
};

async function collectUserGithubOrgs(userId: string, accessToken: string) {
  const github = generateGithubGraphqlClient(accessToken);

  let orgsAfter: string | null | undefined = undefined;
  let allUserOrgs: GetUserOrganizationsQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    console.log(`[user: ${userId}] Requesting Github user's organizations page`);

    const userOrgs: Try<GetUserOrganizationsQuery> = await tryF(
      async () =>
        await github.GetUserOrganizations({
          orgsAfter: orgsAfter,
        })
    );

    if (isError(userOrgs)) {
      // TODO (cthompson) is there a way that we can more gracefully handle this error? We might need to redirect the user back to the github auth page?
      console.debug(
        'If you are seeing this then you should delete the user from kratos and go through this flow again.'
      );
      throw new Error(
        `Unable to get user's organizations. This is most likely due to the user having revoked the Github auth from their account and attempting to login again: ${userOrgs.message}`
      );
    }

    allUserOrgs = deepmerge(allUserOrgs || {}, userOrgs);

    if (!userOrgs.viewer) {
      break;
    }

    const orgPageInfo = userOrgs.viewer.organizations.pageInfo;

    orgsAfter = orgPageInfo.hasNextPage ? orgPageInfo.startCursor : null;
    moreDataAvailable = !!orgsAfter;
  }
  return allUserOrgs;
}

function parseGithubEncodedId(encodedId: string, entityName: string) {
  /*
   * Example: MDEyOk9yZ2FuaXphdGlvbjgzMjQ0NTUw -> 012:Organization83244550
   * We have to parse here because the value that comes from repo.owner.id when installing
   * the github app is the number id;
   */
  const idDecoded = Buffer.from(encodedId, 'base64').toString();
  const idParts = idDecoded.split(':');
  const idNormalized = idParts[1].replace(entityName, '');
  return tryParseInt(idNormalized, 10);
}

function getGithubOrgIdsFromApiResponse(userId: string, userGithubOrgs: GetUserOrganizationsQuery): number[] | null {
  const orgNodes = userGithubOrgs.viewer.organizations.nodes;

  if (!orgNodes) {
    console.error(
      `orgNodes is null, api response from github is incomplete: ${userGithubOrgs.viewer.organizations.nodes}`
    );
    return null;
  }

  console.debug(`[user: ${userId}] Github user's organizations count: ${orgNodes.length}`);

  const userGithubId = parseGithubEncodedId(userGithubOrgs.viewer.id, 'User');

  if (!userGithubId.success) {
    console.error(`[user: ${userId}] Unable to parse github user id: ${userGithubOrgs.viewer.id}`);
    return null;
  }

  const orgIds = orgNodes.reduce<number[]>((filtered, org) => {
    if (!org) {
      return filtered;
    }

    const idNumber = parseGithubEncodedId(org.id, 'Organization');

    if (!idNumber.success) {
      console.error(`[user: ${userId}] Unable to parse github organization id: ${org.id}`);
      return filtered;
    }

    return [...filtered, idNumber.value];
  }, []);

  return [
    ...orgIds,
    // the user github id is also considered an organization, include it in this list
    userGithubId.value,
  ];
}

export const githubLogin = async (req: Request, res: Response): Promise<void> => {
  // todo: fix this unsafe property access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId: string = req.body.ctx.identity.id as string;

  console.log(`[user: ${userId}] Github login webhook started`);

  const kratosResponse = await getGithubAccessTokenFromKratos(userId);
  if (kratosResponse.error) {
    res.status(500).send(kratosResponse.message);
    return;
  }

  const userGithubOrgs: Try<GetUserOrganizationsQuery | null> = await tryF(
    async () => await collectUserGithubOrgs(userId, kratosResponse.token)
  );

  if (isError(userGithubOrgs) || userGithubOrgs === null) {
    logError(userGithubOrgs === null ? new Error('userGithubOrgs is null') : userGithubOrgs);
    res.status(500).send(errorResponse('cannot collect user Github orgs from api'));
    return;
  }

  console.log(`[user: ${userId}] Collected Github user's organizations.`);

  const githubOrgIds = getGithubOrgIdsFromApiResponse(userId, userGithubOrgs);
  if (githubOrgIds === null) {
    res.status(500).send(errorResponse('unable to collect User Organization Ids from GitHub API.'));
    return;
  }

  console.debug(`[user: ${userId}] Github user's organization ids: ${githubOrgIds}`);

  // TODO (cthompson) handle error cases for when this fails

  const authorizedUserOrgs: Try<AuthorizedUserOrganizationsQuery> = await tryF(
    async () =>
      await hasura.AuthorizedUserOrganizations({
        github_org_ids: githubOrgIds,
      })
  );

  if (isError(authorizedUserOrgs)) {
    logError(authorizedUserOrgs);
    res.status(500).send(errorResponse('unable to collect User Organization Ids from GitHub API.'));
    return;
  }

  console.debug(
    `[user: ${userId}] Authorized LunaTrace organizations: ${JSON.stringify(authorizedUserOrgs.organizations)}`
  );

  const organizationUserInput: Organization_User_Insert_Input[] = authorizedUserOrgs.organizations.map((org) => {
    return {
      user_id: userId,
      organization_id: org.id,
    };
  });

  const updatedOrganizations: Try<UpdateOrganizationsForUserMutation> = await tryF(
    async () =>
      await hasura.UpdateOrganizationsForUser({
        organizations_for_user: organizationUserInput,
      })
  );

  if (isError(updatedOrganizations)) {
    logError(updatedOrganizations);
    res.status(500).send(errorResponse('updated organizations.'));
    return;
  }

  if (!updatedOrganizations.insert_organization_user) {
    logError(new Error('updated organizations response is null'));
    res.status(500).send(errorResponse('unable to updated LunaTrace organizations from Github organizations.'));
    return;
  }

  console.log(
    `[user: ${userId}] Authenticated user to LunaTrace organizations: ${JSON.stringify(
      updatedOrganizations.insert_organization_user.returning
    )}`
  );

  res.send({
    error: false,
    message: 'Github login callback completed successfully',
  });
};
