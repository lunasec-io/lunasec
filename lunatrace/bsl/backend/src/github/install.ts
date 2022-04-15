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
import {hasura} from "../hasura-api";
import {
  createLunatraceOrgsFromGithubOrgs,
  hasuraOrgsFromGithubRepositories
} from '../hasura-api/actions/create-lunatrace-orgs-from-github-orgs';
import { RepositoriesForInstallationResponse } from '../types/github';
import { errorResponse, logError } from '../utils/errors';
import { defaultLogger } from '../utils/logger';
import { tryParseInt } from '../utils/parse';
import { catchError, threwError, Try } from '../utils/try';

import { getGithubReposForInstallation } from './actions/get-github-repos-for-installation';
import {getHasuraOrgMembers} from "./actions/get-org-members";
import {getInstallationAccessToken} from "./auth";

const serverConfig = getServerConfig();

export async function githubInstall(req: Request, res: Response): Promise<void> {
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

  defaultLogger.info(`[installId: ${installationId}] Installing Github App to organization`);

  const installationAuthToken = await getInstallationAccessToken(installationId);

  const error = req.query.error;
  const errorDescription = req.query.error_description;
  const errorUri = req.query.error_uri;

  if (error) {
    defaultLogger.info(`[installId: ${installationId}] Error installing Github App: ${errorDescription}`);
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

  const repositories: Try<RepositoriesForInstallationResponse> = await catchError(
    async () => await getGithubReposForInstallation(installationAuthToken, installationId)
  );

  if (threwError(repositories)) {
    logError(repositories);
    res.status(500).send(errorResponse('unable to collect Github information for install.'));
    return;
  }

  defaultLogger.info(`[installId: ${installationId}] Collected installation data: ${repositories.map((repo) => repo.name)}`);

  const organizations = hasuraOrgsFromGithubRepositories(installationId, repositories);
  const orgObjectList = Object.values(organizations);

  const orgIds = await createLunatraceOrgsFromGithubOrgs(installationId, orgObjectList);

  if (orgIds.error) {
    res.status(500).send(errorResponse(orgIds.msg));
    return;
  }

  defaultLogger.info(`[installId: ${installationId}] Created/updated LunaTrace organizations`, {
    orgs: orgIds.res
  });

  const githubOrgToHasuraOrg = orgIds.res.reduce((lookup, org) => {
    if (!org.github_node_id || !org.id) {
      defaultLogger.error('unable to add org to lookup', {
        org
      });
      return lookup;
    }

    return {
      ...lookup,
      [org.github_node_id]: org.id
    }
  }, {} as Record<string, string>);

  const orgLoginList = Object.keys(organizations);

  const createOrgUsersResp = await Promise.all(orgLoginList.map(async login => {
    const org = organizations[login];
    const orgMembers = await getHasuraOrgMembers(installationId, installationAuthToken, org, githubOrgToHasuraOrg);

    if (orgMembers.error) {
      defaultLogger.error(orgMembers.msg);
      return null;
    }

    const res = await catchError(async () => await hasura.UpsertOrganizationUsers({
      organizationUsers: orgMembers.res
    }));

    if (threwError(res)) {
      logError(res);
      return null;
    }
    return res.insert_organization_user?.affected_rows;
  }));

  if (createOrgUsersResp.some(c => c === null)) {
    res.status(500).send(errorResponse('creating organization users failed'));
    return;
  }

  res.status(302).redirect(serverConfig.sitePublicUrl);
}
