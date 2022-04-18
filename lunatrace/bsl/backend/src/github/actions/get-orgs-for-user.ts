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
import {logger} from "../../utils/logger";
import { catchError, threwError, Try } from '../../utils/try';
import { GetUserOrganizationsQuery } from '../api/generated';
import {getGithubGraphqlClient} from "../auth";

export async function getOrgsForUser(userId: string, accessToken: string) {
  const github = getGithubGraphqlClient(accessToken);

  let orgsAfter: string | null | undefined = undefined;
  let allUserOrgs: GetUserOrganizationsQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    logger.info(`[user: ${userId}] Requesting Github user's organizations page`);

    const userOrgs: Try<GetUserOrganizationsQuery> = await catchError(
      async () =>
        await github.GetUserOrganizations({
          orgsAfter: orgsAfter,
        })
    );

    if (threwError(userOrgs)) {
      logError(userOrgs);
      throw new Error(
        `Unable to get user's organizations. Most likely this is the Github rate limit getting hit.`
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
