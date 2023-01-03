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
import { userIsAdmin } from '../hasura-api/actions/user-is-admin';
import { MaybeError } from '../types/util';
import { errorResponse } from '../utils/errors';
import { jwtMiddleware } from '../utils/jwt-middleware';
import { log } from '../utils/log';
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
  log.error('failed to authorize', {
    errorMessage,
  });
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
  const projectData = hasuraRes.project_access_tokens?.[0] || hasuraRes.builds?.[0];
  if (!projectData) {
    return generateErrorResponse(
      res,
      `Invalid Access Token specified in X-LunaTrace-Access-Token header: ${parsedRequest.res}`,
      401
    );
  }
  res.send({
    error: false,
    extra: {
      project_uuid: projectData.project.id,
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

lookupAccessTokenRouter.post('/internal/auth/hydrate-user-id', async (req, res) => {
  const failAndContinue = () => {
    res.send({
      ...req.body,
    });
    return;
  };

  const kratosUserId = req.body.subject;
  if (!kratosUserId || kratosUserId === 'guest') {
    return failAndContinue();
  }

  const userId = await impersonateAsAdmin(kratosUserId, req, res);
  const impersonateOverride = userId !== kratosUserId ? { impersonate_user_id: userId } : {};

  const hasuraRes = await hasura.GetUserFromIdentity({ id: kratosUserId });

  const realUserId = hasuraRes.identities_by_pk?.user?.id;

  res.status(200).send({
    ...req.body,
    extra: {
      ...impersonateOverride,
      real_user_id: realUserId,
    },
  });
  return;
});

export async function impersonateAsAdmin(kratosUserId: string, req: Request, res: Response): Promise<string> {
  const logger = log.child('impersonate-as-admin', {
    kratos_id: kratosUserId,
  });

  const impersonateHeader = 'X-Lunatrace-Impersonate-User-Id';
  const impersonateUserIdHeader = req.body.match_context.header[impersonateHeader];

  // if no impersonate header is present then return quickly and quietly
  if (!impersonateUserIdHeader) {
    return kratosUserId;
  }

  if (!isArray(impersonateUserIdHeader) || impersonateUserIdHeader.length !== 1) {
    log.info('provided header is not an array', {
      impersonateUserIdHeader,
    });
    return kratosUserId;
  }

  const impersonateUserId = impersonateUserIdHeader[0];

  const parsedRequest = validateUUIDValue(impersonateUserId);
  if (parsedRequest.error) {
    logger.info('unable to validate header', {
      impersonateUserId,
    });
    return kratosUserId;
  }

  const userToImpersonate = parsedRequest.res;

  const isAdmin = await userIsAdmin(kratosUserId);
  if (!isAdmin) {
    logger.info('user is not admin', {
      kratosUserId,
      userToImpersonate,
    });
    res.send(req.body);
    return kratosUserId;
  }

  logger.info('impersonating user', {
    userToImpersonate,
  });

  return userToImpersonate;
}
