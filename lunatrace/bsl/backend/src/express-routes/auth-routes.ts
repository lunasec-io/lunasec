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

import express, { Request, Response } from 'express';
import { validate as validateUUID } from 'uuid';

import { getHasuraConfig } from '../config';
import { hasura } from '../hasura-api';
import {log} from "../utils/log";

// These routes are used by oathkeeper to validate incoming requests before they are allowed to reach the rest of the cluster
const hasuraConfig = getHasuraConfig();
export const lookupAccessTokenRouter = express.Router();


lookupAccessTokenRouter.get('/internal/auth/lookup-project-access-token', cliAuthorizer);
lookupAccessTokenRouter.get('/internal/auth/lookup-static-access-token', serviceAuthorizer);

interface ErrorResponse {
  error: true;
  message: string;
}

function parseRequestHeaders(req: Request): ErrorResponse | { error: false; accessToken: string } {
  const accessTokenHeader = req.header('X-LunaTrace-Access-Token');
  if (!accessTokenHeader) {
    return {
      error: true,
      message: 'Missing Access Token in X-LunaTrace-Access-Token header',
    };
  }

  if (typeof accessTokenHeader !== 'string') {
    return {
      error: true,
      message: 'Invalid Access Token specified in X-LunaTrace-Access-Token header',
    };
  }

  const accessToken = accessTokenHeader;

  if (!validateUUID(accessToken)) {
    return {
      error: true,
      message: 'Invalid Access Token specified in X-LunaTrace-Access-Token header',
    };
  }

  return {
    error: false,
    accessToken: accessToken,
  };
}

function generateErrorResponse(res: Response, errorMessage: string, statusCode = 500) {
  res.status(statusCode);
  res.send(JSON.stringify({ error: true, message: errorMessage }));
}

// Oathkeeper calls this when requests from the CLI come through the gateway.. We append this data here just for the action
// but currently this fires for all calls..could clean that up with a new oathkeeper rule
export async function cliAuthorizer(req: Request, res: Response): Promise<void> {
  log.info('CLI authorizer called for route ', req.originalUrl);
  const parsedRequest = parseRequestHeaders(req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  const hasuraRes = await hasura.GetAuthDataFromProjectToken({ access_token: parsedRequest.accessToken });
  if (!hasuraRes.project_access_tokens?.[0]) {
    return generateErrorResponse(res, 'Invalid Access Token specified in X-LunaTrace-Access-Token header', 401);
  }
  const projectData = hasuraRes.project_access_tokens[0];
  const builds = projectData.project.builds.map((b) => b.id as string);
  res.send({
    error: false,
    // Put anything else needed into here
    extra: {
      project_uuid: projectData.project.id,
      builds: builds,
      access_token: parsedRequest.accessToken,
    },
  });
  return;
}

// Oathkeeper calls this when requests from a backend service come through the gateway, this is a string matcher behind a rest endpoint :p
export function serviceAuthorizer(req: Request, res: Response): void {
  log.info('Service authorizer called for route ', req.originalUrl);

  const parsedRequest = parseRequestHeaders(req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  // TODO: Make this read from Secrets Manager instead.
  if (!parsedRequest.accessToken || parsedRequest.accessToken !== hasuraConfig.staticAccessToken) {
    return generateErrorResponse(res, 'Invalid Access Token specified in X-LunaTrace-Access-Token header', 401);
  }

  res.send({
    error: false,
  });
  return;
}
