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

import { Request, Response } from 'express';

import { getServerConfig } from '../config';
import { hasura } from '../hasura-api';
import { CreateOrganizationsMutation } from '../hasura-api/generated';
import { ListReposAccessibleToInstallationResponseType } from '../types/github';
import { errorResponse, logError } from '../utils/errors';
import { tryParseInt } from '../utils/parse-int';
import { isError, Try, tryF } from '../utils/try';

import { pullDataForInstallation } from './installation-populate';
import { lunatraceOrgsFromGithubOrgs } from './organizations';

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
