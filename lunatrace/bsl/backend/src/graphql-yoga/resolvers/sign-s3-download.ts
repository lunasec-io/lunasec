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

import { aws } from '../../utils/aws-utils';
import { log } from '../../utils/log';
import { QueryResolvers } from '../generated-resolver-types';

type SignS3DownloadResolver = NonNullable<QueryResolvers['signS3Download']>;

export const signS3DownloadResolver: SignS3DownloadResolver = async (parent, args, ctx, info) => {
  //todo: ensure this request only comes from hasura.
  let downloadURL = '';
  try {
    const result = await aws.signArbitraryS3URL(args.s3URL, 'GET');
    downloadURL = formatUrl(result);
  } catch (e) {
    log.warn('Failed to sign S3 url', args, e);
    throw new GraphQLYogaError('Failed to sign URL');
  }

  return downloadURL;
};
