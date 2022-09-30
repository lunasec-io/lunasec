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

import { hasura } from '../../hasura-api';
import { GetTreeFromBuildQuery } from '../../hasura-api/generated';
import { DependencyTree } from '../../models/dependency-tree/builds-dependency-tree';
import { log } from '../../utils/log';
import { QueryResolvers } from '../generated-resolver-types';
import { checkBuildsAreAuthorized, throwIfUnauthenticated } from '../helpers/auth-helpers';

type BuildVulnerabilitiesResolver = NonNullable<QueryResolvers['vulnerableReleasesFromBuild']>;

export const vulnerableReleasesFromBuildResolver: BuildVulnerabilitiesResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const buildId = args.buildId;
  await checkBuildsAreAuthorized([buildId], ctx);

  const { builds_by_pk: rawBuildData } = await hasura.GetTreeFromBuild({ build_id: buildId });
  if (!rawBuildData) {
    throw new GraphQLYogaError('Error fetching build data from database');
  }

  const startTime = Date.now();

  const rawManifests = rawBuildData.resolved_manifests;

  const depTree = buildTreeFromRawData(rawManifests);
  if (!depTree) {
    return null; // tells the client that we didnt get any tree info back and to fall back to grype (for now)
  }

  const vulnerableReleases = depTree.getVulnerableReleases();

  const totalTime = Date.now() - startTime;
  log.info(`spent ${totalTime}ms processing tree`);

  return vulnerableReleases;
};

type ManifestData = NonNullable<NonNullable<GetTreeFromBuildQuery['builds_by_pk']>['resolved_manifests']>;
type NodeData = NonNullable<ManifestData[number]['child_edges_recursive']>[number];

export function buildTreeFromRawData<iManifestData>(rawManifestData: ManifestData): DependencyTree<NodeData> | null {
  if (!rawManifestData || rawManifestData.length === 0) {
    return null;
  }

  const mergedDependencies = rawManifestData.flatMap((manifest) => {
    return manifest.child_edges_recursive || [];
  });

  if (!mergedDependencies || mergedDependencies.length === 0) {
    return null;
  }
  return new DependencyTree(mergedDependencies);
}
