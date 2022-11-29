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

import { hasura } from '../../hasura-api';
import { GetTreeFromBuildQuery } from '../../hasura-api/generated';
import VulnerabilityDependencyTree from '../../models/vulnerability-dependency-tree';
import { log } from '../../utils/log';
import { QueryResolvers } from '../generated-resolver-types';
import { checkBuildsAreAuthorized, throwIfUnauthenticated } from '../helpers/auth-helpers';

type BuildVulnerabilitiesResolver = NonNullable<QueryResolvers['vulnerableReleasesFromBuild']>;

export const vulnerableReleasesFromBuildResolver: BuildVulnerabilitiesResolver = async (parent, args, ctx, info) => {
  throwIfUnauthenticated(ctx);
  const buildId = args.buildId;
  await checkBuildsAreAuthorized([buildId], ctx);

  const { builds_by_pk: rawBuildData } = await hasura.GetTreeFromBuild({
    build_id: buildId,
  });
  if (!rawBuildData) {
    throw new GraphQLYogaError('Error fetching build data from database');
  }

  const startTime = Date.now();

  const rawManifests = rawBuildData.resolved_manifests;

  const ignoredVulnerabilities = rawBuildData.project.ignored_vulnerabilities;

  const minimumSeverity = args.minimumSeverity !== null ? args.minimumSeverity : undefined;

  if (!severityIsValid(minimumSeverity)) {
    throw new GraphQLYogaError(
      'Invalid minimum severity passed, acceptable arguments are: ' + JSON.stringify(severityOrderOsv)
    );
  }
  const depTree = buildTreeFromRawData(rawManifests, ignoredVulnerabilities, minimumSeverity);
  if (!depTree) {
    return null; // tells the client that we didnt get any tree info back and to fall back to grype (for now)
  }

  const vulnerableReleases = depTree.getVulnerableReleases();

  const totalTime = Date.now() - startTime;
  log.info('finished processing tree', {
    totalTime,
  });
  return vulnerableReleases;
};

type RequestData = NonNullable<GetTreeFromBuildQuery['builds_by_pk']>;
type ManifestData = NonNullable<RequestData['resolved_manifests']>;
type IgnoredVulnerabilities = NonNullable<RequestData['project']['ignored_vulnerabilities']>;

export function buildTreeFromRawData(
  rawManifestData: ManifestData,
  ignoredVulnerabilities?: IgnoredVulnerabilities,
  minimumSeverity?: SeverityNamesOsv
): VulnerabilityDependencyTree | null {
  if (!rawManifestData || rawManifestData.length === 0) {
    // fallback to grype
    return null;
  }

  // check how many dependencies there are to make sure there are any at all, not sure if this is necessary
  const mergedDependencies = rawManifestData.flatMap((manifest) => {
    return manifest.child_edges_recursive || [];
  });
  if (!mergedDependencies || mergedDependencies.length === 0) {
    // fallback to grype
    return null;
  }

  return new VulnerabilityDependencyTree(rawManifestData, ignoredVulnerabilities, minimumSeverity);
}

function severityIsValid(name: string | undefined): name is SeverityNamesOsv | undefined {
  return !name || severityOrderOsv.includes(name);
}
