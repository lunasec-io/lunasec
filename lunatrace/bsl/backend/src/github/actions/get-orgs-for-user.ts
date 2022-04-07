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

import {log} from "../../utils/log";
import { isError, Try, tryF } from '../../utils/try';
import {getGithubGraphqlClient} from "../auth";
import { GetUserOrganizationsQuery } from '../generated';

export async function getOrgsForUser(userId: string, accessToken: string) {
  const github = getGithubGraphqlClient(accessToken);

  let orgsAfter: string | null | undefined = undefined;
  let allUserOrgs: GetUserOrganizationsQuery | null = null;
  let moreDataAvailable = true;

  while (moreDataAvailable) {
    log.info(`[user: ${userId}] Requesting Github user's organizations page`);

    const userOrgs: Try<GetUserOrganizationsQuery> = await tryF(
      async () =>
        await github.GetUserOrganizations({
          orgsAfter: orgsAfter,
        })
    );

    if (isError(userOrgs)) {
      // TODO (cthompson) is there a way that we can more gracefully handle this error? We might need to redirect the user back to the github auth page?
      log.debug('If you are seeing this then you should delete the user from kratos and go through this flow again.');
      throw new Error(
        `Unable to get user's organizations. This is most likely due to the user having revoked the Github auth from their account and attempting to login again.`
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
