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
import { SeverityNamesOsv, severityOrderOsv } from '@lunatrace/lunatrace-common';

import { loadTree } from '../../models/vulnerability-dependency-tree/load-tree';
import { log } from '../../utils/log';
import { QueryResolvers } from '../generated-resolver-types';
import { checkBuildsAreAuthorizedOrThrow, throwIfUnauthenticated } from '../helpers/auth-helpers';

type BuildVulnerabilitiesResolver = NonNullable<QueryResolvers['vulnerableReleasesFromBuild']>;

export const vulnerableReleasesFromBuildResolver: BuildVulnerabilitiesResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const buildId = args.buildId;
  await checkBuildsAreAuthorizedOrThrow([buildId], ctx);

  const logger = log.child('vulnerable-releases-resolver', { buildId });

  logger.info('getting build data');

  const minimumSeverity = args.minimumSeverity !== null ? args.minimumSeverity : undefined;

  if (!severityIsValid(minimumSeverity)) {
    throw new GraphQLYogaError(
      'Invalid minimum severity passed, acceptable arguments are: ' + JSON.stringify(severityOrderOsv)
    );
  }

  const depTree = await loadTree(logger, buildId, minimumSeverity);
  if (depTree.error) {
    logger.error('unable to build dependency tree', {
      error: depTree.msg,
    });
    return null;
  }

  logger.info('building vulnerable releases');

  const vulnerableReleases = depTree.res.getVulnerableReleases();

  logger.info('finished processing tree');
  return vulnerableReleases;
};

function severityIsValid(name: string | undefined): name is SeverityNamesOsv | undefined {
  return !name || severityOrderOsv.includes(name);
}
