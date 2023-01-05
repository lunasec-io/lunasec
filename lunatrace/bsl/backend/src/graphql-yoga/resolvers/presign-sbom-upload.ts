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

function generateErrorResponse(errorMessage: string) {
  return { error: true, message: errorMessage };
}

// Presigns sbombs that are uploaded from the CLI.  Note that the backend can also generate sboms out of uploaded manifests,
// but it uploads them directly and doesnt use this logic
export const presignSbomUploadResolver: PresignSbomUploadResolver = async (parent, args, ctx, info) => {
  //throwIfUnauthenticated(ctx);

  // TODO (cthompson) authorize build id

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
