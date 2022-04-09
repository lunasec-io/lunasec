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
import { Response } from 'express';

import {hasura} from "../../hasura";
import {
  GetAuthorizedUserOrganizationsQuery, Organization_User_Constraint,
  Organization_User_Insert_Input, Organization_User_Update_Column,
  UpdateOrganizationsForUserMutation
} from "../../hasura/generated";
import {getGithubAccessTokenFromKratos} from "../../kratos";
import {errorResponse, logError} from "../../utils/errors";
import {log} from "../../utils/log";
import {catchError, threwError, Try} from "../../utils/try";
import {GetUserOrganizationsQuery} from "../generated";

import {getOrgsForUser} from "./get-orgs-for-user";

function getGithubOrgIdsFromApiResponse(userId: string, userGithubOrgs: GetUserOrganizationsQuery): string[] | null {
  const orgNodes = userGithubOrgs.viewer.organizations.nodes;

  if (!orgNodes) {
    log.error(`orgNodes is null, api response from github is incomplete: ${userGithubOrgs.viewer.organizations.nodes}`);
    return null;
  }

  log.debug(`[user: ${userId}] Github user's organizations count: ${orgNodes.length}`);

  const orgIds = orgNodes.reduce<string[]>((filtered, org) => {
    if (!org) {
      return filtered;
    }
    return [...filtered, org.id];
  }, []);

  return [
    ...orgIds,
    // the user github id is also considered an organization, include it in this list
    userGithubOrgs.viewer.id,
  ];
}

export async function authUserToOrgs(res: Response, userId: string) {
  const kratosResponse = await getGithubAccessTokenFromKratos(userId);
  if (kratosResponse.error) {
    res.status(500).send(kratosResponse.message);
    return;
  }

  const userGithubOrgs: Try<GetUserOrganizationsQuery | null> = await catchError(
    async () => await getOrgsForUser(userId, kratosResponse.token)
  );

  if (threwError(userGithubOrgs) || userGithubOrgs === null) {
    logError(userGithubOrgs === null ? new Error('userGithubOrgs is null') : userGithubOrgs);
    res.status(500).send(errorResponse('cannot collect user Github orgs from api'));
    return;
  }

  log.info(`[user: ${userId}] Collected Github user's organizations.`);

  const githubOrgIds = getGithubOrgIdsFromApiResponse(userId, userGithubOrgs);
  if (githubOrgIds === null) {
    res.status(500).send(errorResponse('unable to collect User Organization Ids from GitHub API.'));
    return;
  }

  log.debug(`[user: ${userId}] Github user's organization ids: ${githubOrgIds}`);

  const authorizedUserOrgs: Try<GetAuthorizedUserOrganizationsQuery> = await catchError(
    async () =>
      await hasura.GetAuthorizedUserOrganizations({
        github_org_ids: githubOrgIds,
      })
  );

  if (threwError(authorizedUserOrgs)) {
    logError(authorizedUserOrgs);
    res.status(500).send(errorResponse('unable to collect User Organization Ids from GitHub API.'));
    return;
  }

  log.debug(
    `[user: ${userId}] Authorized LunaTrace organizations: ${JSON.stringify(authorizedUserOrgs.organizations)}`
  );

  const organizationUserInput: Organization_User_Insert_Input[] = authorizedUserOrgs.organizations.map((org) => {
    return {
      user_id: userId,
      organization_id: org.id,
    };
  });

  const updatedOrganizations: Try<UpdateOrganizationsForUserMutation> = await catchError(
    async () =>
      await hasura.UpdateOrganizationsForUser({
        organizations_for_user: organizationUserInput,
        on_conflict: {
          constraint: Organization_User_Constraint.OrganizationUserUserIdOrganizationIdKey,
          update_columns: [Organization_User_Update_Column.UserId],
        },
      })
  );

  if (threwError(updatedOrganizations)) {
    logError(updatedOrganizations);
    res.status(500).send(errorResponse('updated organizations.'));
    return;
  }

  if (!updatedOrganizations.insert_organization_user) {
    logError(new Error('updated organizations response is null'));
    res.status(500).send(errorResponse('unable to updated LunaTrace organizations from Github organizations.'));
    return;
  }

  log.info(
    `[user: ${userId}] Authenticated user to LunaTrace organizations: ${JSON.stringify(
      updatedOrganizations.insert_organization_user.returning
    )}`
  );

  const personalOrgExists = await catchError(async () => {
    // todo: This is honestly pretty brittle, but it will work for now
    const result = await hasura.GetCountOfPersonalOrg({ user_id: userId });
    if (result.organizations_aggregate.aggregate?.count === undefined) {
      throw new Error('Failed to get aggregate count');
    }
    return result.organizations_aggregate.aggregate.count > 0;
  });
  if (!personalOrgExists) {
    await hasura.InsertPersonalProjectAndOrg({ user_id: userId });
  }
}
