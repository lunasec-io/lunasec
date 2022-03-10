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
import jwt_decode from 'jwt-decode';
import validate from 'validator';

import { sbomBucket } from '../constants';
import { aws } from '../utils/aws-utils';

interface ErrorResponse {
  error: true;
  message: string;
}

interface ParsedPresignRequestData {
  error: false;
  buildId: string;
  orgId: string;
  authorizedBuildsString: string;
}

export const sbomPresignerRouter = express.Router();

function parseRequest(req: Request): ErrorResponse | ParsedPresignRequestData {
  const buildId = req?.body?.input?.buildId;

  if (!buildId) {
    return {
      error: true,
      message: 'Missing buildId in query params',
    };
  }

  if (typeof buildId !== 'string' || !validate.isUUID(buildId)) {
    return {
      error: true,
      message: 'Invalid buildId specified in request',
    };
  }

  const orgId = req?.body?.input?.orgId;

  if (!orgId) {
    return {
      error: true,
      message: 'Missing orgId in query params',
    };
  }

  if (typeof orgId !== 'string' || !validate.isUUID(orgId)) {
    return {
      error: true,
      message: 'Invalid orgId specified in request',
    };
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader || typeof authHeader !== 'string') {
    return {
      error: true,
      message: 'Missing auth header in request',
    };
  }
  const decodedJwt = jwt_decode(authHeader);
  console.log('jwt is ', decodedJwt);
  // messy data coming from oathkeeper, stringifying this value wasnt working so its one big weird golang string
  const authorizedBuilds = (decodedJwt as any)['https://hasura.io/jwt/claims']?.['x-hasura-builds'] as
    | string
    | undefined;

  if (!authorizedBuilds) {
    return {
      error: true,
      message: 'Missing authorized builds in jwt',
    };
  }

  return {
    error: false,
    buildId: buildId,
    orgId: orgId,
    authorizedBuildsString: authorizedBuilds,
  };
}

function generateErrorResponse(res: Response, errorMessage: string, statusCode = 500) {
  res.status(statusCode);
  res.send(JSON.stringify({ error: true, message: errorMessage }));
}

// Presigns sbombs that are uploaded from the CLI.  Note that the backend can also generate sboms out of uploaded manifests,
// but it uploads them directly and doesnt use this logic

sbomPresignerRouter.post('/s3/presign-sbom-upload', async (req, res) => {
  const parsedRequest = parseRequest(req);
  if (parsedRequest.error) {
    return generateErrorResponse(res, parsedRequest.message);
  }

  if (!parsedRequest.authorizedBuildsString.includes(parsedRequest.buildId)) {
    return generateErrorResponse(
      res,
      'Attempted to presign a build that wasnt in the list of builds belonging to the project'
    );
  }

  try {
    const result = await aws.generatePresignedS3Url(
      sbomBucket,
      aws.generateSbomS3Key(parsedRequest.orgId, parsedRequest.buildId),
      'PUT'
    );

    res.send(JSON.stringify({ error: false, uploadUrl: result }));
    res.status(200);
  } catch (e) {
    return generateErrorResponse(res, 'Unable to generate ');
  }
  return;
});
