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
import { severityOrderOsv } from '@lunatrace/lunatrace-common';
import semver from 'semver';

import { AffectedByVulnerability, DependencyChain, DependencyEdgePartial, VulnerableRelease } from './types';

/**
 * @class DependencyTree
 */
export class DependencyTree<DependencyEdge extends DependencyEdgePartial> {
  public packageSlugToChildIds: Map<string, Set<string>> = new Map();
  public nodeIdToParentIds: Map<string, Set<string>> = new Map();
  public depNodesById: Map<string, DependencyEdge['child']> = new Map();
  public vulnIdToVulns: Map<string, Set<AffectedByVulnerability>> = new Map();

  public depNodesByReleaseId: Map<string, Set<string>> = new Map();

  // public vulnerableReleasesById: Map<string, VulnerableRelease<BuildDependency>> = new Map();

  public vulnerableDepNodeIds: Set<string> = new Set();
  // This builds the indexes and any useful data that show useful data about the tree
  // Note that because we mostly extract information from the bottom of the tree upwards ( ex: show why a vulnerable package was installed)
  constructor(sourceDeps: Array<DependencyEdge>) {
    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    const flatEdges = JSON.parse(JSON.stringify(sourceDeps)) as Array<DependencyEdge>;

    flatEdges.forEach((edge) => {
      // flatten the parent id into the child so we can forget about edges as much as possible
      const depNode = edge.child;
      depNode.parent_id = edge.parent_id;

      // Create a map from a given release to the list of depNodes
      const existingNodesForThisRelease = this.depNodesByReleaseId.get(depNode.release_id);
      if (existingNodesForThisRelease) {
        // just add the depNodes to the existing release ID
        existingNodesForThisRelease.add(depNode.id);
      } else {
        this.depNodesByReleaseId.set(depNode.release_id, new Set([depNode.id]));
      }

      // Create a lookup of child IDs that map to a set of nodes that include them (parents).
      const parentIdsToNode = this.nodeIdToParentIds.get(edge.child_id) || new Set();

      if (depNode.parent_id && depNode.parent_id !== '00000000-0000-0000-0000-000000000000') {
        parentIdsToNode.add(depNode.parent_id);
        this.nodeIdToParentIds.set(depNode.id, parentIdsToNode);
      }

      // Create a separate lookup to directly map an ID to an edge
      this.depNodesById.set(depNode.id, depNode);

      // delete the vulnerabilities that don't apply because of semver
      depNode.release.package.affected_by_vulnerability = depNode.release.package.affected_by_vulnerability.filter(
        (vuln) => {
          const vulnerableRange = this.convertRangesToSemverRange(vuln.ranges);
          const isVulnerable = semver.satisfies(edge.child.release.version, vulnerableRange);

          // Mark the vulns that can be trivially updated
          vuln.triviallyUpdatable = this.precomputeVulnTriviallyUpdatable(edge.child.range, vuln);

          // Add to the lookup of vulns for later
          if (isVulnerable) {
            const vulnSet = this.vulnIdToVulns.get(vuln.vulnerability.id) || new Set();
            vulnSet.add(vuln);
            this.vulnIdToVulns.set(vuln.vulnerability.id, vulnSet);
            // mark this edge for later postprossesing when the tree is done being built
            this.vulnerableDepNodeIds.add(depNode.id);
          }

          return isVulnerable;
        }
      );
    });
  }

  // this is the main function that we call to return useful information to the client about their vulnerabilities
  public getVulnerableReleases(): VulnerableRelease<DependencyEdge>[] {
    const vulnerableReleasesById = new Map<string, VulnerableRelease<DependencyEdge>>();

    this.vulnerableDepNodeIds.forEach((nodeId) => {
      const vulnerableDep = this.depNodesById.get(nodeId);
      if (!vulnerableDep) {
        throw new Error('failed to lookup depNode by id');
      }

      const release = vulnerableDep.release;

      const chains = this.getDependencyChainsOfDepNode(vulnerableDep);
      const devOnly = chains.every((chain) => {
        const rootLabels = chain[0].labels;
        if (rootLabels && 'scope' in rootLabels && rootLabels.scope === 'dev') {
          return true;
        }
        return false;
      });

      const existingRelease = vulnerableReleasesById.get(release.id);

      // there might be multiple vulnerabilities for one release so loop through them
      // subsequent vulns on the same node will just merge together
      vulnerableDep.release.package.affected_by_vulnerability.forEach((affectedByVuln) => {
        //add the chains to the vulnerability
        affectedByVuln.chains = chains;

        const rawSeverity = affectedByVuln.vulnerability.severity_name;
        // Clean the severity just in case of bad data or nulls, just in case
        const severity = rawSeverity && severityOrderOsv.includes(rawSeverity) ? rawSeverity : 'Unknown';

        // We arent tracking this release yet, make a new object
        if (!existingRelease) {
          const newRelease: VulnerableRelease<DependencyEdge> = {
            release,
            severity,
            cvss: affectedByVuln.vulnerability.cvss_score || null,
            devOnly,
            affectedBy: [affectedByVuln],
          };
          vulnerableReleasesById.set(release.id, newRelease);
          return;
        }
        // We are already tracking this release, just merge the new information

        // devOnly will be false if ANY nodes aren't devOnly
        existingRelease.devOnly = devOnly && existingRelease.devOnly;
        // take the highest cvss
        if (
          affectedByVuln.vulnerability.cvss_score &&
          (existingRelease.cvss || 0) < affectedByVuln.vulnerability.cvss_score
        ) {
          existingRelease.cvss = affectedByVuln.vulnerability.cvss_score;
        }
        // take the highest severity
        if (severityOrderOsv.indexOf(severity) > severityOrderOsv.indexOf(existingRelease.severity)) {
          existingRelease.severity = severity;
        }
        // add vuln to the release if its not being tracked yet
        if (!existingRelease.affectedBy.some((v) => v.vulnerability.id === affectedByVuln.vulnerability.id)) {
          existingRelease.affectedBy.push(affectedByVuln);
        }
      });

      // merge node data into existing vulnerableRelease
    });
    return Object.values(vulnerableReleasesById);
  }

  // add this to the main list of vulnerabilities
  //   const existingVulnerableRelease = this.vulnerableReleases.find((p) => p.releaseId === edge.child.release_id);
  //   if (existingVulnerableRelease){
  //     const vr = existingVulnerableRelease;
  //     const existingVulnerability = vr.vulnerabilities.find((existingVulnerability) => existingVulnerability.vulnerability.id === vuln.vulnerability.id)
  // }

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
        `failed to find a vuln with id in the tree. Tree maybe determined this vulnerability did not apply.`,
        { vulnId }
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
    const edgeSet = this.packageSlugToChildIds.get(`${packageName}@${version}`);

    if (!edgeSet) {
      console.error(`failed to find a dependency with name and version in the tree for update check`, {
        packageName,
        version,
      });
      return 'no';
    }

    const matchingDeps = Array.from(edgeSet)
      .map((childId) => this.depNodesById.get(childId))
      .filter((child) => {
        if (!child) {
          console.error(`failed to find a dependency with id for in the tree for update check`, {
            packageName,
            version,
          });
          return false;
        }
        return true;
      }) as DependencyEdge['child'][];

    // also keep track of the vuln count in case we are checking a package with no vulns, which would not qualify as trivially updatable
    let totalVulnCount = 0;
    const fullyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.release.package.affected_by_vulnerability.every((vuln) => {
        totalVulnCount++;
        return vuln.triviallyUpdatable;
      });
    });
    const atLeastPartiallyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.release.package.affected_by_vulnerability.some((vuln) => vuln.triviallyUpdatable);
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

  // Show us how a dependency is being included by other dependencies by creating a "chain".
  private getDependencyChainsOfDepNode(depNode: DependencyEdge['child']): DependencyChain<DependencyEdge['child']>[] {
    const flattenedChains: DependencyChain<DependencyEdge['child']>[] = [];

    // Flatten the chains
    const recursivelyGenerateChainsWithStack = (
      dep: DependencyEdge['child'],
      stack: DependencyChain<DependencyEdge['child']>
    ) => {
      // Fastest way to clone into a new array, with root at front and leaf at end
      const stackLength = stack.length;
      const newStack = new Array<DependencyEdge['child']>(stackLength + 1);
      newStack[0] = dep;
      for (let i = 0; i < stackLength; i++) {
        newStack[i + 1] = stack[i];
      }

      if (!dep.parent_id || dep.parent_id === '00000000-0000-0000-0000-000000000000') {
        flattenedChains.push(newStack);
        return;
      }

      const parents = this.nodeIdToParentIds.get(dep.id);

      if (!parents) {
        throw new Error(`Failed to find parent edges for child id ${dep.id} in the tree`);
      }

      parents.forEach((parentEdgeId) => {
        const parentEdge = this.depNodesById.get(parentEdgeId);
        if (!parentEdge) {
          throw new Error(`Failed to find parent edge with id ${parentEdgeId} for child id ${dep.id}`);
        }
        recursivelyGenerateChainsWithStack(parentEdge, newStack);
      });
    };

    // start the recursive search

    const parentIds = this.nodeIdToParentIds.get(depNode.id);

    recursivelyGenerateChainsWithStack(depNode, []);

    return flattenedChains;
  }
}
