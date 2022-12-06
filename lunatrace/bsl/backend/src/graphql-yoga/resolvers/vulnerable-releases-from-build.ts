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
import { LunaLogger } from '@lunatrace/logger/build/main';
import { SeverityNamesOsv, severityOrderOsv } from '@lunatrace/lunatrace-common';

import { hasura } from '../../hasura-api';
import { GetTreeFromBuildQuery } from '../../hasura-api/generated';
import VulnerabilityDependencyTree from '../../models/vulnerability-dependency-tree';
import { Manifest, ManifestEdge, ManifestNode } from '../../models/vulnerability-dependency-tree/types';
import { log } from '../../utils/log';
import { newBenchmarkTable, start } from '../../utils/performance';
import { notEmpty } from '../../utils/predicates';
import { QueryResolvers } from '../generated-resolver-types';
import { checkBuildsAreAuthorized, throwIfUnauthenticated } from '../helpers/auth-helpers';

type BuildVulnerabilitiesResolver = NonNullable<QueryResolvers['vulnerableReleasesFromBuild']>;

export const vulnerableReleasesFromBuildResolver: BuildVulnerabilitiesResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const buildId = args.buildId;
  await checkBuildsAreAuthorized([buildId], ctx);

  const logger = log.child('vulnerable-releases-resolver', { buildId });

  logger.info('getting build data');

  const { builds_by_pk: rawBuildData } = await hasura.GetTreeFromBuild({
    build_id: buildId,
  });

  if (!rawBuildData) {
    throw new GraphQLYogaError('Error fetching build data from database');
  }

  const rawManifests = rawBuildData.resolved_manifests;

  const ignoredVulnerabilities = rawBuildData.project.ignored_vulnerabilities;

  const minimumSeverity = args.minimumSeverity !== null ? args.minimumSeverity : undefined;

  if (!severityIsValid(minimumSeverity)) {
    throw new GraphQLYogaError(
      'Invalid minimum severity passed, acceptable arguments are: ' + JSON.stringify(severityOrderOsv)
    );
  }

  const uniqueChildIds = new Set<string>();
  rawManifests.forEach((m) => {
    m.child_edges_recursive?.forEach((c) => {
      uniqueChildIds.add(c.child_id);
    });
  });

  const childIdList = [...uniqueChildIds.values()];

  logger.info('collecting child information', {
    childrenCount: childIdList.length,
  });

  const { manifest_dependency_node: childrenInfo } = await hasura.GetManifestDependencyEdgeChildren({
    ids: childIdList,
  });

  const childInfoLookup = new Map<string, ManifestNode>();
  childrenInfo.forEach((c) => {
    childInfoLookup.set(c.id, c);
  });

  const manifests: Array<Manifest> = rawManifests
    .map((m) => {
      return {
        ...m,
        child_edges_recursive: m.child_edges_recursive
          ?.map((c): ManifestEdge | undefined => {
            const child = childInfoLookup.get(c.child_id);
            if (!child) {
              return undefined;
            }
            return {
              ...c,
              child,
            };
          })
          .filter(notEmpty),
      };
    })
    .filter(notEmpty);

  logger.info('building tree', {
    childrenInfo: childrenInfo.length,
    manifests: manifests.length,
  });

  if (!manifests || manifests.length === 0) {
    // fallback to grype
    logger.warn('no manifest data to build tree from');
    return null;
  }

  const depTree = new VulnerabilityDependencyTree(manifests, ignoredVulnerabilities, minimumSeverity);
  if (!depTree) {
    // tells the client that we didnt get any tree info back and to fall back to grype (for now)
    return null;
  }

  logger.info('building vulnerable releases');

  const vulnerableReleases = depTree.getVulnerableReleases(true);

  logger.info('finished processing tree');
  return vulnerableReleases;
};

function severityIsValid(name: string | undefined): name is SeverityNamesOsv | undefined {
  return !name || severityOrderOsv.includes(name);
}
