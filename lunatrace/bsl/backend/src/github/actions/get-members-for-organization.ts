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

import {logError} from "../../utils/errors";
import { logger } from '../../utils/logger';
import { catchError, threwError, Try } from '../../utils/try';
import { GetMembersForOrganizationQuery } from '../api/generated';
import { getGithubGraphqlClient } from '../auth';

export async function getGithubOrganizationMembers(authToken: string, orgName: string): Promise<GetMembersForOrganizationQuery> {
  const github = getGithubGraphqlClient(authToken);

  let pageAfter: string | null | undefined = undefined;
  let allOrgMembers: GetMembersForOrganizationQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    logger.info(`[org: ${orgName}] Requesting Github organization's members page`);

    const orgMembers: Try<GetMembersForOrganizationQuery> = await catchError(
      async () =>
        await github.GetMembersForOrganization({
          org: orgName,
          after: pageAfter,
        })
    );

    if (threwError(orgMembers)) {
      logError(orgMembers);
      throw new Error(
        `Unable to get organization members. Most likely this is the Github rate limit getting hit.`
      );
    }

    allOrgMembers = deepmerge(allOrgMembers || {}, orgMembers);

    if (!orgMembers.organization) {
      break;
    }

    const orgTeamPageInfo = orgMembers.organization.teams.pageInfo;
    const orgMembersWithRolePageInfo = orgMembers.organization.membersWithRole.pageInfo;

    const getNextAfter = () => {
      if (orgTeamPageInfo.hasNextPage) {
        return orgTeamPageInfo.startCursor;
      }
      if (orgMembersWithRolePageInfo.hasNextPage) {
        return orgMembersWithRolePageInfo.startCursor;
      }
      return null;
    };

    pageAfter = getNextAfter();
    moreDataAvailable = !!pageAfter;
  }

  if (allOrgMembers === null)  {
    throw new Error('organization members is null');
  }

  return allOrgMembers;
}
