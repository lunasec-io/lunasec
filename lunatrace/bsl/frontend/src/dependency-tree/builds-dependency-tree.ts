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
import semver from 'semver';

import { AffectedByVulnerability, BuildDependencyPartial, DependencyChain } from './types';

/**
 *  hasura and graphql doesn't allow us to fetch recursive stuff, so we build the tree ourselves on the client
 *  Note that the same dependency could appear multiple times in this tree if multiple things depend on it
 * @class DependencyTree
 * @public flatDeps The original set of dependencies that was passed in. Preserves types.
 */
export class DependencyTree<BuildDependency extends BuildDependencyPartial> {
  public packageSlugToEdgeIds: Map<string, Set<string>> = new Map();
  public childIdToParentIds: Map<string, Set<string>> = new Map();
  public edgeById: Map<string, BuildDependency> = new Map();
  public vulnIdToVulns: Map<string, Set<AffectedByVulnerability>> = new Map();

  constructor(sourceDeps: Array<BuildDependency>) {
    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    const flatEdges = JSON.parse(JSON.stringify(sourceDeps)) as Array<BuildDependency>;

    flatEdges.forEach((edge) => {
      const versionSlug = `${edge.child.release.package.name}@${edge.child.release.version}`;

      const edgesWithNameAndVersion = this.packageSlugToEdgeIds.get(edge.child_id) || new Set();

      edgesWithNameAndVersion.add(edge.child_id);

      // Create an index to make the lookup of the edge by its name and version faster later
      this.packageSlugToEdgeIds.set(versionSlug, edgesWithNameAndVersion);

      // Create a lookup of child IDs that map to a set of edges that include them (parents).
      const parentIdsForEdge = this.childIdToParentIds.get(edge.child_id) || new Set();

      if (edge.parent_id && edge.parent_id !== '00000000-0000-0000-0000-000000000000') {
        parentIdsForEdge.add(edge.parent_id);
        this.childIdToParentIds.set(edge.child_id, parentIdsForEdge);
      }

      // Create a separate lookup to directly map an ID to an edge
      this.edgeById.set(edge.child_id, edge);

      edge.child.release.package.affected_by_vulnerability =
        edge.child.release.package.affected_by_vulnerability.filter((vuln) => {
          const vulnerableRange = this.convertRangesToSemverRange(vuln.ranges);
          const isVulnerable = semver.satisfies(edge.child.release.version, vulnerableRange);

          // Mark the vulns that can be trivially updated
          vuln.triviallyUpdatable = this.precomputeVulnTriviallyUpdatable(edge.child.range, vuln);

          // Add to the lookup of vulns for later
          if (isVulnerable) {
            const vulnerableEdgeSet = this.vulnIdToVulns.get(vuln.vulnerability.id) || new Set();
            vulnerableEdgeSet.add(vuln);
            this.vulnIdToVulns.set(vuln.vulnerability.id, vulnerableEdgeSet);
          }

          return isVulnerable;
        });
    });
  }

  private precomputeVulnTriviallyUpdatable(requestedRange: string, vuln: AffectedByVulnerability): boolean {
    const fixedVersions: string[] = [];
    vuln.ranges.forEach((range) => {
      if (range.fixed) {
        fixedVersions.push(range.fixed);
      }
    });
    return fixedVersions.some((fixVersion) => {
      return semver.satisfies(fixVersion, requestedRange);
    });
  }

  public convertRangesToSemverRange(ranges: AffectedByVulnerability['ranges']): semver.Range {
    const vulnerableRanges: string[] = [];
    ranges.forEach((range) => {
      if (range.introduced && range.fixed) {
        vulnerableRanges.push(`>=${range.introduced} <${range.fixed}`);
      } else if (range.introduced) {
        vulnerableRanges.push(`>=${range.introduced}`);
      }
    });
    const vulnerableRangesString = vulnerableRanges.join(' || '); // Just put them all in one big range and let semver figure it out
    const semverRange = new semver.Range(vulnerableRangesString);
    return semverRange;
  }

  // This will no longer be needed once the UI is only using this tree to show vulnerabilities
  // for now, since Grype is still in the loop, we need to cross-reference information out of this tree using vuln ids
  public checkIfVulnInstancesTriviallyUpdatable(vulnId: string): 'yes' | 'partially' | 'no' | 'not-found' {
    const vulns = this.vulnIdToVulns.get(vulnId);
    if (!vulns || vulns.size === 0) {
      console.warn(
        `failed to find a vuln with id ${vulnId} in the tree. 
        It may be that the tree determined this vulnerability did not apply and it was removed.`
      );
      return 'not-found';
    }
    const vulnsUpdatable = Array.from(vulns).filter(
      (vuln) => vuln.vulnerability.id === vulnId && vuln.triviallyUpdatable
    );

    if (vulnsUpdatable.length === vulns.size) {
      return 'yes';
    }

    if (vulnsUpdatable.length === 0) {
      return 'no';
    }

    return 'partially';
  }

  public checkIfPackageTriviallyUpdatable(packageName: string, version: string): 'yes' | 'partially' | 'no' {
    const edgeSet = this.packageSlugToEdgeIds.get(`${packageName}@${version}`);

    if (!edgeSet) {
      console.error(
        `failed to find a dependency with name ${packageName} and version ${version} in the tree for update check`
      );
      return 'no';
    }

    const matchingDeps = Array.from(edgeSet)
      .map((edgeId) => this.edgeById.get(edgeId))
      .filter((edge) => {
        if (!edge) {
          console.error(
            `failed to find a dependency with id ${edge} for ${packageName}@${version} in the tree for update check`
          );
          return false;
        }
        return true;
      }) as BuildDependency[];

    // also keep track of the vuln count in case we are checking a package with no vulns, which would not qualify as trivially updatable
    let totalVulnCount = 0;
    const fullyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.child.release.package.affected_by_vulnerability.every((vuln) => {
        totalVulnCount++;
        return vuln.triviallyUpdatable;
      });
    });
    const atLeastPartiallyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.child.release.package.affected_by_vulnerability.some((vuln) => vuln.triviallyUpdatable);
    });

    const fullUpdateCount = fullyUpdatableDeps.length;
    const partialUpdateCount = atLeastPartiallyUpdatableDeps.length;
    const allDepsCount = matchingDeps.length;

    if (totalVulnCount === 0 || (fullUpdateCount === 0 && partialUpdateCount === 0)) {
      return 'no';
    }
    if (fullUpdateCount < partialUpdateCount) {
      return 'partially';
    }
    if (fullUpdateCount === allDepsCount) {
      return 'yes';
    }
    return 'no';
  }

  // Show us how a dependency is being included by other dependencies by creating a "chain". It works from name and
  // version of package, which is necessary because we are collating the legacy Grype-based  system against this tree
  public showDependencyChainsOfPackage(
    packageName: string,
    packageVersion: string
  ): DependencyChain<BuildDependency>[] {
    const rootEdgeIds = this.packageSlugToEdgeIds.get(`${packageName}@${packageVersion}`);

    if (!rootEdgeIds) {
      console.error(`failed to find package ${packageName}@${packageVersion} in the tree`);
      return [];
    }

    const flattenedChains: DependencyChain<BuildDependency>[] = [];

    // Flatten the chains
    const recursivelyGenerateChainsWithStack = (dep: BuildDependency, stack: DependencyChain<BuildDependency>) => {
      // Fastest way to clone into a new array
      const stackLength = stack.length;
      const newStack = new Array<BuildDependency>(stackLength + 1);
      newStack[0] = dep;
      for (let i = 0; i < stackLength; i++) {
        newStack[i + 1] = stack[i];
      }

      if (!dep.parent_id || dep.parent_id === '00000000-0000-0000-0000-000000000000') {
        flattenedChains.push(newStack);
        return;
      }

      const parentEdges = this.childIdToParentIds.get(dep.child_id);

      if (!parentEdges) {
        throw new Error(`Failed to find parent edges for child id ${dep.child_id} in the tree`);
      }

      parentEdges.forEach((parentEdgeId) => {
        const parentEdge = this.edgeById.get(parentEdgeId);
        if (!parentEdge) {
          throw new Error(`Failed to find parent edge with id ${parentEdgeId} for child id ${dep.child_id}`);
        }
        recursivelyGenerateChainsWithStack(parentEdge, newStack);
      });
    };

    rootEdgeIds.forEach((rootEdgeId) => {
      const rootEdge = this.edgeById.get(rootEdgeId);

      if (!rootEdge) {
        throw new Error(`Failed to find root edge with id ${rootEdgeId} for package ${packageName}@${packageVersion}`);
      }

      const parentIds = this.childIdToParentIds.get(rootEdgeId);

      // Handle direct dependency case
      if (!parentIds) {
        flattenedChains.push([rootEdge]);
        return;
      }

      recursivelyGenerateChainsWithStack(rootEdge, []);
    });

    return flattenedChains;
  }
}
