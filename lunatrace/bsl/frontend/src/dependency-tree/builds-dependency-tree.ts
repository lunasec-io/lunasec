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
/* example query on builds to get these dependencies
build_dependency_relationships {
      depended_by_release_id
      range
      labels

      release {
        id
        fetched_time
        version
        package {
          name
          last_successful_fetch
          package_manager
          vulnerabilities {
            affected_range_events {
              event
              type
              version
              id
              database_specific
            }
          }
        }
      }
    }
 */

import semver from 'semver';

import { RawDependencyRelationship } from './types';
// This is just what we need someone to give us to build the tree
// We extend this type with generics below so if they give us more data, we will give back more data
export interface BuildDependencyPartial {
  id: string;
  depended_by_relationship_id?: string;
  range: string;
  release_id: string;
  release: {
    version: string;
    package: {
      vulnerabilities: Array<Vulnerability>;
      name: string;
      package_manager: string;
    };
  };
}

interface Vulnerability {
  id: string;
  ranges: Array<{
    introduced?: string | null;
    fixed?: string | null;
  }>;
  triviallyUpdatable?: boolean; // We add this by determining something can be updated to a non-vulnerable version without violating semver
}

// Recursive type to model the recursive tree we are building.  Simply adds the field "dependents" which points down to more nodes.
type TreeNode<D> = D & {
  dependents: Array<TreeNode<D>>;
};

export type DependencyChain<D> = Array<TreeNode<D>>;

/**
 *  hasura and graphql doesn't allow us to fetch recursive stuff, so we build the tree ourselves on the client
 *  Note that the same dependency could appear multiple times in this tree if multiple things depend on it
 * @class DependencyTree
 * @public tree A tree of all dependenices, starting as an array of the root level dependencies. Preserves types.
 * @public flatDeps The original set of dependencies that was passed in. Preserves types.
 */
export class DependencyTree<BuildDependency extends BuildDependencyPartial> {
  public readonly tree: Array<TreeNode<BuildDependency>>;
  public readonly flatVulns: Array<Vulnerability>;
  public flatDeps: Array<BuildDependency>;
  constructor(sourceDeps: Array<BuildDependency>) {
    this.flatVulns = [];
    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    this.flatDeps = JSON.parse(JSON.stringify(sourceDeps));
    // Go and clean out all the vulnerabilities that don't apply to this version since the DB doesn't know how to do that yet
    this.flatDeps.forEach((dep) => {
      dep.release.package.vulnerabilities = dep.release.package.vulnerabilities.filter((vuln) => {
        const vulnerableRange = this.convertRangesToSemverRange(vuln.ranges);
        const isVulnerable = semver.satisfies(dep.release.version, vulnerableRange);
        return isVulnerable;
      });

      // Mark the vulns that can be trivially updated
      dep.release.package.vulnerabilities.forEach((vuln) => {
        vuln.triviallyUpdatable = this.checkVulnTriviallyUpdatable(dep.range, vuln);
        // Also add it to the flat vuln list for easy access
        this.flatVulns.push(vuln);
      });
    });

    // define an internal recursive function that builds each node
    // it's in the constructor because this has access to the class generic and the flatDeps
    // recursive stuff is always a little hairy but this is really quite dead simple
    const cycleCheckIds: Array<string> = [];
    const recursivelyBuildNode = (dep: BuildDependency): TreeNode<BuildDependency> => {
      // Check for cycles, just in case
      if (cycleCheckIds.includes(dep.id)) {
        throw new Error('Dependency cycle detected!');
      }
      cycleCheckIds.push(dep.id);
      // Find every dep that points back at this dep
      const unbuiltDependents = this.flatDeps.filter(
        (potentialDependent) => potentialDependent.depended_by_relationship_id === dep.id
      );
      // For each dependent, add it to our list of dependents and populate its own dependents recursively
      const dependents = unbuiltDependents.map(recursivelyBuildNode);
      const builtNode = { ...dep, dependents };
      return builtNode;
    };
    // start with the root dependencies
    const rootDeps = this.flatDeps.filter((d) => {
      return d.depended_by_relationship_id === null;
    });
    // kick off the tree build
    this.tree = rootDeps.map((rootDep) => recursivelyBuildNode(rootDep));
    console.log(this.tree.length, ' root deps in tree');
    console.log(this.flatDeps.length, ' total deps in tree');
  }

  private checkVulnTriviallyUpdatable(requestedRange: string, vuln: Vulnerability): boolean {
    const fixedVersions: string[] = [];
    vuln.ranges.forEach((range) => {
      if (range.fixed) {
        fixedVersions.push(range.fixed);
      }
    });
    return fixedVersions.some((fixVersion) => {
      return semver.satisfies(requestedRange, fixVersion);
    });
  }

  // only useful if you need the nodes flattened but also with tree links.  Otherwise, use flatDeps
  // todo: not currently used, delete if unused
  public collectAllTreeNodes(): TreeNode<BuildDependency>[] {
    const allDepNodes: TreeNode<BuildDependency>[] = [];
    function recurseNode(dep: TreeNode<BuildDependency>) {
      allDepNodes.push(dep);
      dep.dependents.forEach(recurseNode);
    }
    this.tree.forEach(recurseNode);
    return allDepNodes;
  }

  public convertRangesToSemverRange(ranges: Vulnerability['ranges']): semver.Range {
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
  // for now, since grype is still in the loop, we need to cross reference information out of this tree using vuln ids
  public checkIfVulnInstancesTriviallyUpdatable(vulnId: string): 'all' | 'partial' | 'none' | 'not-found' {
    const vulns = this.flatVulns.filter((v) => v.id === vulnId);
    if (vulns.length === 0) {
      console.warn(
        `failed to find a vuln with id ${vulnId} in the tree. 
        It may be that the tree determined this vulnerability did not apply and it was removed. 
         Grype must have thought differently`
      );
      return 'not-found';
    }
    const vulnsUpdatable = vulns.filter((vuln) => vuln.triviallyUpdatable);
    if (vulnsUpdatable.length === vulns.length) {
      return 'all';
    }
    if (vulnsUpdatable.length === 0) {
      return 'none';
    }
    return 'partial';
  }

  // Can show us why a dependency is installed
  // for now works from name and version of package, since we are collating the grype legacy system against this tree
  public showDependencyChainsOfPackage(
    packageName: string,
    packageVersion: string
  ): DependencyChain<BuildDependency>[] {
    const chains: DependencyChain<BuildDependency>[] = [];
    // walk tree recursively, finding all paths that contain a given item and putting them in the array
    function findInstanceRecur(
      currentNode: TreeNode<BuildDependency>,
      currentChain: DependencyChain<BuildDependency>
    ): void {
      if (currentNode.release.package.name === packageName && currentNode.release.version === packageVersion) {
        chains.push(currentChain);
        // This was what we were looking for, add it to the list and stop walking the tree
        return;
      }
      // if we aren't at the bottom of the chain yet, keep looking through transitives for our dependency
      currentNode.dependents.forEach((dep) => findInstanceRecur(dep, [...currentChain, currentNode]));
    }
    // Start at the root nodes and walk every path using the above function, looking for ones that lead to the dependency
    this.tree.forEach((rootDep) => {
      findInstanceRecur(rootDep, []);
    });
    return chains;
  }
}
