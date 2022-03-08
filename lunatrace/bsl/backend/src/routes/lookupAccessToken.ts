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

import { db } from '../database/db';

export const lookupAccessTokenRouter = express.Router();

lookupAccessTokenRouter.get('/api/internal/auth/lookup-project-access-token', lookupProjectAccessToken);
lookupAccessTokenRouter.get('/api/internal/auth/lookup-static-access-token', lookupStaticAccessToken);

interface ErrorResponse {
  error: true;
  message: string;
}

function parseRequest(req: Request): ErrorResponse | { error: false; accessToken: string } {
  const accessTokenHeader = req.header('X-LunaTrace-Access-Token');

  if (!accessTokenHeader) {
    return {
      error: true,
      message: 'Missing Access Token in X-LunaTrace-Access-Token header',
    };
  }

  const headerPrefix = 'Bearer ';

  if (typeof accessTokenHeader !== 'string' || !accessTokenHeader.startsWith(headerPrefix)) {
    return {
      error: true,
      message: 'Invalid Access Token specified in X-LunaTrace-Access-Token header',
    };
  }

  const accessToken = accessTokenHeader.slice(headerPrefix.length);

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

export async function lookupProjectAccessToken(req: Request, res: Response): void {
  const parsedRequest = parseRequest(req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  const result = await db.oneOrNone<{ project_uuid: string } | null>(
    'SELECT project_uuid FROM project_access_tokens WHERE access_token = $1',
    parsedRequest.accessToken
  );

  if (!result) {
    return generateErrorResponse(res, 'Invalid Access Token specified in X-LunaTrace-Access-Token header', 401);
  }

  res.send({
    error: false,
    subject: parsedRequest.accessToken,
    // Put anything else needed into here
    extra: {
      project_uuid: result.project_uuid,
    },
  });
  return;
}

export function lookupStaticAccessToken(req: Request, res: Response): void {
  const parsedRequest = parseRequest(req);

  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  // TODO: Make this read from Secrets Manager instead.
  if (!parsedRequest.accessToken || parsedRequest.accessToken !== process.env.STATIC_SECRET_ACCESS_TOKEN) {
    return generateErrorResponse(res, 'Invalid Access Token specified in X-LunaTrace-Access-Token header', 401);
  }

  res.send({
    error: false,
  });
  return;
}
