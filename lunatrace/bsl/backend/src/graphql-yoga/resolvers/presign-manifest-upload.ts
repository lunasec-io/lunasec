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
import { v4 as uuid } from 'uuid';

import { getEtlBucketConfig } from '../../config';
import { hasura } from '../../hasura-api';
import { aws } from '../../utils/aws-utils';
import { Context } from '../context';
import { MutationResolvers } from '../generated-resolver-types';

import { getUserId, throwIfUnauthenticated } from './auth-helpers';

type PresignManifestUploadResolver = NonNullable<MutationResolvers['presignManifestUpload']>;

const sbomHandlerConfig = getEtlBucketConfig();

async function checkProjectIsAuthorized(projectId: string, ctx: Context) {
  const userId = getUserId(ctx);
  const usersAuthorizedProjects = await hasura.GetUsersProjects({ user_id: userId });
  const userIsAuthorized = usersAuthorizedProjects.projects.some((p) => {
    return p.id === projectId;
  });
  if (!userIsAuthorized) {
    throw new GraphQLYogaError('Not authorized for this project');
  }
  return;
}

export const presignManifestUploadResolver: PresignManifestUploadResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const projectId = args.project_id;
  await checkProjectIsAuthorized(projectId, ctx);
  const today = new Date();
  const uniqueId = uuid();

  const objectKey = `${encodeURIComponent(
    projectId
  )}/${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${today.getHours()}/${encodeURIComponent(uniqueId)}`;

  try {
    const result = await aws.generatePresignedS3Url(sbomHandlerConfig.manifestBucket, objectKey, 'PUT');
    return { error: false, key: objectKey, bucket: sbomHandlerConfig.manifestBucket, ...result };
  } catch (e) {
    throw new GraphQLYogaError('Failed to generate S3 presigned url');
  }
};
