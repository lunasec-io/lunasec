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
import { GraphQLYogaError } from '@graphql-yoga/node';
import Express from 'express';

import { getBackendBucketConfig } from '../../config';
import { aws } from '../../utils/aws-utils';
import { JWTClaims } from '../context';
import { QueryResolvers } from '../generated-resolver-types';
import { throwIfUnauthenticated } from '../helpers/auth-helpers';

type PresignSbomUploadResolver = NonNullable<QueryResolvers['presignSbomUpload']>;

const sbomHandlerConfig = getBackendBucketConfig();

export const sbomPresignerRouter = Express.Router();

export function getAuthorizedBuilds(jwt: JWTClaims | undefined): string | false {
  if (!jwt) {
    throw new GraphQLYogaError('Missing auth header in request');
  }

  // messy data coming from oathkeeper, stringifying this value wasn't working so its one big weird golang string, fix later
  const authorizedBuilds =
    jwt && jwt['https://hasura.io/jwt/claims'] !== undefined && jwt['https://hasura.io/jwt/claims']['x-hasura-builds'];

  if (typeof authorizedBuilds !== 'string') {
    return false;
  }
  return authorizedBuilds;
}

function generateErrorResponse(errorMessage: string) {
  return { error: true, message: errorMessage };
}

// Presigns sbombs that are uploaded from the CLI.  Note that the backend can also generate sboms out of uploaded manifests,
// but it uploads them directly and doesnt use this logic
export const presignSbomUploadResolver: PresignSbomUploadResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const authorizedBuilds = getAuthorizedBuilds(ctx.req.user);
  if (!authorizedBuilds) {
    return generateErrorResponse('Missing x-hasura-builds in authorization jwt header');
  }

  if (!authorizedBuilds.includes(args.buildId)) {
    return generateErrorResponse(
      'Attempted to presign a build that wasnt in the list of builds belonging to the project'
    );
  }

  try {
    const result = await aws.generatePresignedS3Url(
      sbomHandlerConfig.sbomBucket,
      aws.generateSbomS3Key(args.orgId, args.buildId),
      'PUT'
    );

    return { error: false, uploadUrl: result };
  } catch (e) {
    return generateErrorResponse('Unable to generate presigned url');
  }
};
