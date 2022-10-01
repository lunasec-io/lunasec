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

import { log } from '../../utils/log';

import { AffectedByVulnerability, DependencyChain, DependencyEdgePartial, VulnerableRelease } from './types';

/**
 * @class DependencyTree
 */
export class DependencyTree<DependencyEdge extends DependencyEdgePartial> {
  // The following indexes are how the tree is "built". They allow high speed querying against the tree data without ever building a full tree in memory
  public nodeIdToParentIds: Map<string, Set<string>> = new Map();
  public depNodesById: Map<string, DependencyEdge['child']> = new Map();
  public vulnIdToVulns: Map<string, Set<AffectedByVulnerability>> = new Map();
  public depNodeIdsByReleaseId: Map<string, Set<string>> = new Map();
  public vulnerableDeps: Set<{ depNode: DependencyEdge['child']; vulnerabilityId: string }> = new Set();
  // This builds the indexes and any useful data that show useful data about the tree
  // Note that because we mostly extract information from the bottom of the tree upwards ( ex: show why a vulnerable package was installed)
  constructor(sourceDeps: Array<DependencyEdge>) {
    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    const flatEdges = JSON.parse(JSON.stringify(sourceDeps)) as Array<DependencyEdge>;

    flatEdges.forEach((edge) => {
      // flatten the parent id into the child so we can forget about edges as much as possible
      const depNode = edge.child;

      if (!depNode) {
        log.warn('child node of edge is null', {
          edge,
        });
        return;
      }

      depNode.parent_id = edge.parent_id;

      // Create a map from a given release to the list of depNodes
      const existingNodesForThisRelease = this.depNodeIdsByReleaseId.get(depNode.release_id);
      if (existingNodesForThisRelease) {
        // just add the depNodes to the existing release ID
        existingNodesForThisRelease.add(depNode.id);
      } else {
        this.depNodeIdsByReleaseId.set(depNode.release.id, new Set([depNode.id]));
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

          // Add to the lookup of vulns for later
          if (isVulnerable) {
            // Mark the vulns that can be trivially updated
            vuln.triviallyUpdatable = this.precomputeVulnTriviallyUpdatable(edge.child.range, vuln);

            const vulnSet = this.vulnIdToVulns.get(vuln.vulnerability.id) || new Set();
            vulnSet.add(vuln);
            this.vulnIdToVulns.set(vuln.vulnerability.id, vulnSet);
            // mark this edge for later postprossesing when the tree is done being built
            this.vulnerableDeps.add({ depNode, vulnerabilityId: vuln.vulnerability.id });
          }

          return isVulnerable;
        }
      );
    });
  }

  public getVulnerableDependencyChainsByEdgeId(): Record<string, string[][]> {
    const vulnerabilityToChains: Record<string, string[][]> = {};
    this.vulnerableDeps.forEach((vulnerableDepInfo) => {
      const vulnerableDep = vulnerableDepInfo.depNode;
      const chains = this.getDependencyChainsOfDepNode(vulnerableDep);
      const chainsForVulnerability = chains.map((chain) => chain.map((edge) => edge.id));
      vulnerabilityToChains[vulnerableDepInfo.vulnerabilityId] = chainsForVulnerability;
    });
    return vulnerabilityToChains;
  }

  // this is the main function that we call to return useful information to the client about their vulnerabilities
  // Todo: The nice generic typing in the return type has been given up on for now (DependencyEdgePartial instead of DependencyEdge), it would be nice to fix it, but its maybe not worth it
  // Also this method is too long but also really hard to break up because of all the computed state from various steps
  public getVulnerableReleases(): VulnerableRelease<DependencyEdgePartial>[] {
    const vulnerableReleasesById: Record<string, VulnerableRelease<DependencyEdge>> = {};

    this.vulnerableDeps.forEach((vulnerableDepInfo) => {
      const vulnerableDep = vulnerableDepInfo.depNode;
      const release = vulnerableDep.release;

      const chains = this.getDependencyChainsOfDepNode(vulnerableDep);
      const devOnly = chains.every((chain) => {
        const rootLabels = chain[0].labels;
        if (rootLabels && 'scope' in rootLabels && rootLabels.scope === 'dev') {
          return true;
        }
        return false;
      });

      const existingRelease = vulnerableReleasesById[release.id];

      // there might be multiple vulnerabilities for one release so loop through them
      // subsequent vulns on the same node will just merge together
      vulnerableDep.release.package.affected_by_vulnerability.forEach((affectedByVuln, vulnIndex) => {
        //add the chains to the vulnerability
        affectedByVuln.chains = chains;

        const rawSeverity = affectedByVuln.vulnerability.severity_name;
        // Clean the severity just in case of bad data or nulls, just in case
        const severity = rawSeverity && severityOrderOsv.includes(rawSeverity) ? rawSeverity : 'Unknown';

        // We arent tracking this release yet, make a new object
        if (!existingRelease) {
          const newVulnerableRelease: VulnerableRelease<DependencyEdge> = {
            release,
            severity,
            cvss: affectedByVuln.vulnerability.cvss_score || null,
            devOnly,
            chains,
            triviallyUpdatable: this.checkIfReleaseTriviallyUpdatable(release.id),
            affectedBy: [affectedByVuln],
          };
          vulnerableReleasesById[release.id] = newVulnerableRelease;
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
        // add chains to the top level list of chains on the release, if this is the first vuln we have process on the edge (because we only want to do this once per edge)
        if (vulnIndex === 0) {
          existingRelease.chains = [...existingRelease.chains, ...chains];
        }
      });
    });
    return Object.values(vulnerableReleasesById);
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
    return new semver.Range(vulnerableRangesString);
  }

  private checkIfReleaseTriviallyUpdatable(releaseId: string): 'yes' | 'partially' | 'no' {
    const matchingDepIds = this.depNodeIdsByReleaseId.get(releaseId);
    if (!matchingDepIds) {
      throw new Error(`Failed to find release for id ${releaseId} while checking triviallyUpdatable`);
    }

    const matchingDeps = [...matchingDepIds].map((depId) => {
      const depNode = this.depNodesById.get(depId);
      if (!depNode) {
        throw new Error('Missing dep node for dep id while checking triviallyUpdatable');
      }
      return depNode;
    });

    let totalVulnCount = 0;

    const fullyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.release.package.affected_by_vulnerability.every((affectedByVuln) => {
        totalVulnCount++; // also keep track of the vuln count while we are in this loop
        return affectedByVuln.triviallyUpdatable;
      });
    });
    const atLeastPartiallyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.release.package.affected_by_vulnerability.some((affectedByVuln) => affectedByVuln.triviallyUpdatable);
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
    recursivelyGenerateChainsWithStack(depNode, []);

    return flattenedChains;
  }
}
