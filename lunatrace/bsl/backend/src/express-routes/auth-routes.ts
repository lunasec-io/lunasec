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

import { inspect } from 'util';

import express, { Request, Response } from 'express';
import { validate as validateUUID } from 'uuid';

import { getHasuraConfig } from '../config';
import { hasura } from '../hasura-api';
import { Scalars } from '../hasura-api/generated';
import { MaybeError } from '../types/util';
import { errorResponse, newResult } from '../utils/errors';
import { parsePsqlStringArray } from '../utils/json-utils';
import { jwtMiddleware } from '../utils/jwt-middleware';
import { log } from '../utils/log';
import { catchError, threwError } from '../utils/try';
import { isArray } from '../utils/types';

// These routes are used by oathkeeper to validate incoming requests before they are allowed to reach the rest of the cluster
const hasuraConfig = getHasuraConfig();
export const lookupAccessTokenRouter = express.Router();

lookupAccessTokenRouter.get('/internal/auth/lookup-project-access-token', cliAuthorizer);
lookupAccessTokenRouter.get('/internal/auth/lookup-static-access-token', serviceAuthorizer);
lookupAccessTokenRouter.post('/internal/auth/impersonate-as-admin', jwtMiddleware, impersonateAsAdmin);

function validateUUIDValue(value: any): MaybeError<string> {
  if (typeof value !== 'string') {
    return {
      error: true,
      msg: `Invalid Access Token specified in ${value} header`,
    };
  }

  const token = value;

  if (!validateUUID(token)) {
    return {
      error: true,
      msg: `Invalid Access Token specified in ${value} header`,
    };
  }

  return {
    error: false,
    res: token,
  };
}

function parseRequestTokenHeader(headerName: string, req: Request): MaybeError<string> {
  const tokenHeader = req.header(headerName);
  if (!tokenHeader) {
    return {
      error: true,
      msg: `Missing Access Token in ${headerName} header`,
    };
  }
  return validateUUIDValue(tokenHeader);
}

function generateErrorResponse(res: Response, errorMessage: string, statusCode = 500) {
  res.status(statusCode);
  res.send(errorResponse(errorMessage));
}

// Oathkeeper calls this when requests from the CLI come through the gateway.. We append this data here just for the action
// but currently this fires for all calls..could clean that up with a new oathkeeper rule
export async function cliAuthorizer(req: Request, res: Response): Promise<void> {
  const parsedRequest = parseRequestTokenHeader('X-LunaTrace-Access-Token', req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.msg);
  }

  const hasuraRes = await hasura.GetAuthDataFromProjectToken({ access_token: parsedRequest.res });
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
      access_token: parsedRequest.res,
    },
  });
  return;
}

// Oathkeeper calls this when requests from a backend service come through the gateway, this is a string matcher behind a rest endpoint :p
export function serviceAuthorizer(req: Request, res: Response): void {
  const parsedRequest = parseRequestTokenHeader('X-LunaTrace-Access-Token', req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.msg);
  }

  // TODO: Make this read from Secrets Manager instead.
  if (!parsedRequest.res || parsedRequest.res !== hasuraConfig.staticAccessToken) {
    return generateErrorResponse(res, 'Invalid Access Token specified in X-LunaTrace-Access-Token header', 401);
  }

  res.send({
    error: false,
  });
  return;
}

export async function impersonateAsAdmin(req: Request, res: Response): Promise<void> {
  const impersonateHeader = 'X-Lunatrace-Impersonate-User-Id';

  const impersonateUserIdHeader = req.body.match_context.header[impersonateHeader];
  // if no impersonate header is present then return quickly and quietly
  if (!impersonateUserIdHeader) {
    res.send(req.body);
    return;
  }

  if (!isArray(impersonateUserIdHeader) || impersonateUserIdHeader.length !== 1) {
    log.info('provided header is not an array', {
      impersonateHeader,
    });
    res.send(req.body);
    return;
  }

  const impersonateUserId = impersonateUserIdHeader[0];

  const kratosUserId = req.body.subject;
  const logger = log.child('impersonate-as-admin', {
    kratos_id: kratosUserId,
  });

  const parsedRequest = validateUUIDValue(impersonateUserId);
  if (parsedRequest.error) {
    logger.info('unable to validate header', {
      impersonateHeader,
    });
    res.send(req.body);
    return;
  }

  const userToImpersonate = parsedRequest.res;

  const userRole = await catchError(
    hasura.GetUserRole({
      kratos_id: kratosUserId,
    })
  );

  if (threwError(userRole)) {
    logger.error('unable to get role for user');
    res.send(req.body);
    return;
  }

  if (userRole.users.length !== 1) {
    logger.error('did not find exactly one user for uuid', {
      users: userRole.users,
    });
    res.send(req.body);
    return;
  }

  const user = userRole.users[0];
  const role = user.role;

  // verify that the user performing this request is a lunatrace_admin
  if (role !== 'lunatrace_admin') {
    logger.info('user is not admin', {
      role,
    });
    res.send(req.body);
    return;
  }

  logger.info('impersonating user', {
    userToImpersonate,
  });

  res.send({
    ...req.body,
    extra: {
      userToImpersonate,
    },
  });
  return;
}
