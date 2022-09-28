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
import { QueryResolvers } from '../generated-resolver-types';
import { checkBuildsAreAuthorized, throwIfUnauthenticated } from '../helpers/auth-helpers';

type BuildVulnerabilitiesResolver = NonNullable<QueryResolvers['buildVulnerabilities']>;

export const buildVulnerabilitiesResolver: BuildVulnerabilitiesResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);

  const buildId = args.buildId;
  await checkBuildsAreAuthorized([buildId], ctx);

  const { builds_by_pk: rawBuildData } = await hasura.GetTreeFromBuild({ build_id: buildId });
  if (!rawBuildData) {
    throw new GraphQLYogaError('Error fetching build data from database');
  }

  const depTree = buildTreeFromRawData(rawBuildData.resolved_manifests);
  if (!depTree) {
    return {};
  }
  console.log(depTree.getVulnerableReleases());
};

type ManifestData = NonNullable<NonNullable<GetTreeFromBuildQuery['builds_by_pk']>['resolved_manifests']>;
type NodeData = NonNullable<ManifestData[number]['child_edges_recursive']>[number];

export function buildTreeFromRawData(rawManifestData: ManifestData): DependencyTree<NodeData> | null {
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
