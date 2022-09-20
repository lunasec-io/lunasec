import { GraphQLYogaError } from '@graphql-yoga/node';
import { v4 as uuid } from 'uuid';

import { getWorkerBucketConfig } from '../../config';
import { aws } from '../../utils/aws-utils';
import { MutationResolvers } from '../generated-resolver-types';
import { checkProjectIsAuthorized, throwIfUnauthenticated } from '../helpers/auth-helpers';

type PresignManifestUploadResolver = NonNullable<MutationResolvers['presignManifestUpload']>;

const sbomHandlerConfig = getWorkerBucketConfig();

export const VulnerabilityDataResolver: PresignManifestUploadResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
};
