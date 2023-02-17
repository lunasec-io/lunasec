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
import { formatUrl } from '@aws-sdk/util-format-url';
import { GraphQLYogaError } from '@graphql-yoga/node';

import { hasura } from '../../hasura-api';
import { aws } from '../../utils/aws-utils';
import { log } from '../../utils/log';
import { QueryResolvers } from '../generated-resolver-types';
import { checkProjectIsAuthorizedOrThrow, throwIfUnauthenticated } from '../helpers/auth-helpers';

type sbomUrlResolverT = NonNullable<QueryResolvers['sbomUrl']>;

export const sbomUrlResolver: sbomUrlResolverT = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const build = await hasura.GetBuild({ build_id: args.buildId });
  await checkProjectIsAuthorizedOrThrow(build.builds_by_pk?.project?.id, ctx);

  try {
    return formatUrl(await aws.signArbitraryS3URL(build.builds_by_pk?.s3_url || '', 'GET'));
  } catch (e) {
    log.warn('Failed to sign S3 url', args, e);
    throw new GraphQLYogaError('Failed to sign URL');
  }
};
