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
import * as querystring from 'querystring';

import { Request, Response } from 'express';

import { getServerConfig } from '../config';
import { hasura } from '../hasura-api';
import { MaybeErrorVoid } from '../types/util';
import { errorResponse, newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { tryParseInt } from '../utils/parse';
import { sleep } from '../utils/sleep';

import { getInstallationAccessToken } from './auth';

const serverConfig = getServerConfig();

async function waitForGithubInstall(installationId: number): Promise<MaybeErrorVoid> {
  // Check to see if user has any projects installed
  // TODO (cthompson) this is a simple check at the moment for the scenario where someone
  // is performing their first install. For any updates to an install, we want to be smart with this check
  // and make sure that the newly added repos have been installed correctly before moving on.
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const installedProjects = await hasura.GetProjectsForInstallationId({
      installation_id: installationId,
    });

    const projects = installedProjects.organizations.flatMap((o) => o.projects);

    if (projects.length > 0) {
      break;
    }
    await sleep(1000);
    attempts += 1;
  }
  if (attempts === maxAttempts) {
    return newError(
      'Unable to verify Github App was installed successfully. Contact support if this problem persists.'
    );
  }
  return newResult(undefined);
}

// All of this code just checks that we are properly authed, it's just a sanity check.
// We handle all the installation tasks such as populating repos in the github webhook queue handler for `installation.created`
export async function githubInstall(req: Request, res: Response): Promise<void> {
  const installationIdQueryParam = req.query.installation_id;

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

  log.info('verifying Github App was installed correctly', {
    installationId,
  });

  const installationAuthToken = await getInstallationAccessToken(installationId);

  if (installationAuthToken.error) {
    res.status(500).send(errorResponse(installationAuthToken.msg));
    return;
  }

  const error = req.query.error;
  const errorDescription = req.query.error_description;
  const errorUri = req.query.error_uri;

  if (error) {
    log.error('Error installing Github App', {
      installationId,
      error: errorDescription,
    });
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

  const installError = await waitForGithubInstall(installationId);

  if (installError.error) {
    log.error('unable to verify that Github App was installed successfully', {
      installationId,
    });
    const errorMsg = querystring.stringify({
      error: installError.msg,
    });
    res.status(302).redirect(serverConfig.sitePublicUrl + '?' + errorMsg);
    return;
  }

  log.info('Github App was installed successfully', {
    installationId,
  });

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
