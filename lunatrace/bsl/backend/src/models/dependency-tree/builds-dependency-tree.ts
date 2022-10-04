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

import {
  BuiltNode,
  BuiltRelease,
  BuiltVulnMeta,
  DependencyChain,
  RawEdge,
  RawNode,
  RawVulnMeta,
  VulnerableRelease,
} from './types';

export class DependencyTree {
  // The following indexes are how the tree is "built". They allow high speed querying against the tree data without ever building a full tree in memory

  // This is and should remain the only index that holds a reference to the actual nodes. All parsing algorithms must use this index to resolve depNodes
  public depNodesById: Map<string, BuiltNode> = new Map();
  // Used to trace the structure of the tree from the bottom up
  public nodeIdToParentIds: Map<string, Set<string>> = new Map();
  // Used so we can quickly fetch all nodes that are the same release (ex React@1.0.0)
  public depNodeIdsByReleaseId: Map<string, Set<string>> = new Map();
  // Holds which nodes have been determined to be vulnerable, for later processing
  public vulnerableDepNodeIds: Set<string> = new Set();
  // This is the full computed dataset that we server directly to the frontend. This is the "output" format of the tree.
  // Note that other public methods, like getVulnerabilities() rearrange this same data into different shapes for easier parsing outside of the tree
  public vulnerableReleases: VulnerableRelease[];

  // This constructor builds the indexes and any useful data that show useful data about the tree
  constructor(sourceDeps: Array<RawEdge>) {
    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    const flatEdges = JSON.parse(JSON.stringify(sourceDeps)) as Array<RawEdge>;

    flatEdges.forEach((edge) => {
      // We modify some vulnerability data on the release and since that changes the whole type chain, we rebuild the release here
      const builtRelease: BuiltRelease = {
        ...edge.child.release,
        package: { ...edge.child.release.package, affected_by_vulnerability: this.buildVulns(edge.child) },
      };
      // flatten the parent id into the child so we can forget about edges as much as possible, and filter the vulns
      const depNode: BuiltNode = { ...edge.child, edge_id: edge.id, parent_id: edge.parent_id, release: builtRelease };
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

      // Create a separate lookup to directly map an ID to a node
      this.depNodesById.set(depNode.id, depNode);
    });
    this.vulnerableReleases = this.getVulnerableReleases();
  }

  private buildVulns(depNode: RawNode): BuiltVulnMeta[] {
    const builtVulns: BuiltVulnMeta[] = [];
    depNode.release.package.affected_by_vulnerability.forEach((vuln) => {
      const vulnerableRange = this.convertRangesToSemverRange(vuln.ranges);
      const isVulnerable = semver.satisfies(depNode.release.version, vulnerableRange);

      if (isVulnerable) {
        // Add to the lookup of vulnerable deps for later
        this.vulnerableDepNodeIds.add(depNode.id);
        // Mark the vulns that can be trivially updated
        const triviallyUpdatable = this.precomputeVulnTriviallyUpdatable(depNode.range, vuln);

        const builtVuln: BuiltVulnMeta = { ...vuln, trivially_updatable: triviallyUpdatable, chains: [] };
        builtVulns.push(builtVuln);
      }
    });
    return builtVulns;
  }

  // Calls getVulnerableReleases and changes the data shape to just be a list of vulns and their chains
  public getVulnerabilities(): Array<BuiltVulnMeta> {
    const vulnsWithMetadata: Array<BuiltVulnMeta> = [];

    this.vulnerableReleases.forEach((release) => {
      release.affected_by.forEach((newVuln) => {
        const existingVuln = vulnsWithMetadata.find((v) => v.vulnerability.id === newVuln.vulnerability.id);
        if (!existingVuln) {
          // its a new vuln, just add it to the list
          vulnsWithMetadata.push(newVuln);
          return;
        }
        // just merge the vulnData into the main vuln
        existingVuln.chains = [...(existingVuln.chains || []), ...(newVuln.chains || [])];
        existingVuln.trivially_updatable = existingVuln.trivially_updatable && newVuln.trivially_updatable;
      });
    });
    return vulnsWithMetadata;
  }

  // this is the main function that we call to return useful information to the client about their vulnerabilities
  // Todo: The nice generic typing in the return type has been given up on for now (DependencyEdgePartial instead of DependencyEdge), it would be nice to fix it, but its maybe not worth it
  // Also this method is too long but also really hard to break up because of all the computed state from various steps
  private getVulnerableReleases(): VulnerableRelease[] {
    const vulnerableReleasesById: Record<string, VulnerableRelease> = {};

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
          const newVulnerableRelease: VulnerableRelease = {
            release,
            severity,
            cvss: affectedByVuln.vulnerability.cvss_score || null,
            dev_only: devOnly,
            chains,
            trivially_updatable: this.checkIfReleaseTriviallyUpdatable(release.id),
            affected_by: [affectedByVuln],
          };
          vulnerableReleasesById[release.id] = newVulnerableRelease;
          return;
        }
        // We are already tracking this release, just merge the new information

        // devOnly will be false if ANY nodes aren't devOnly
        existingRelease.dev_only = devOnly && existingRelease.dev_only;
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
        if (!existingRelease.affected_by.some((v) => v.vulnerability.id === affectedByVuln.vulnerability.id)) {
          existingRelease.affected_by.push(affectedByVuln);
        }
        // add chains to the top level list of chains on the release, if this is the first vuln we have process on the edge (because we only want to do this once per edge)
        if (vulnIndex === 0) {
          existingRelease.chains = [...existingRelease.chains, ...chains];
        }
      });
    });
    return Object.values(vulnerableReleasesById);
  }

  // unused but could come in handy someday
  private chainsAreIdentical(firstChain: DependencyChain, secondChain: DependencyChain): boolean {
    if (firstChain.length !== secondChain.length) {
      return false;
    }
    return !firstChain.some((dep, i) => dep.id !== secondChain[i].id);
  }

  private precomputeVulnTriviallyUpdatable(requestedRange: string, vuln: RawVulnMeta): boolean {
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

  public convertRangesToSemverRange(ranges: RawVulnMeta['ranges']): semver.Range {
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
        return affectedByVuln.trivially_updatable;
      });
    });
    const atLeastPartiallyUpdatableDeps = matchingDeps.filter((dep) => {
      return dep.release.package.affected_by_vulnerability.some((affectedByVuln) => affectedByVuln.trivially_updatable);
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
  private getDependencyChainsOfDepNode(depNode: BuiltNode): DependencyChain[] {
    const flattenedChains: DependencyChain[] = [];

    // Flatten the chains
    const recursivelyGenerateChainsWithStack = (dep: BuiltNode, stack: DependencyChain) => {
      // Fastest way to clone into a new array, with root at front and leaf at end
      const stackLength = stack.length;
      const newStack = new Array<BuiltNode>(stackLength + 1);
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
