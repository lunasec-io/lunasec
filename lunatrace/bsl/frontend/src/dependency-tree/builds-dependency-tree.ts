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

import { AffectedByVulnerability, BuildDependencyPartial, DependencyChain, TreeNode } from './types';

// This is just what we need someone to give us to build the tree
// We extend this type with generics below so if they give us more data, we will give back more data

export interface BuildDependencyNode {
  id: string;
  range: string;
  release: {
    version: string;
    package: {
      affected_by_vulnerability: Array<AffectedByVulnerability>;
      name: string;
      package_manager: string;
    };
  };
  children: BuildDependencyNode[];
}

/**
 *  hasura and graphql doesn't allow us to fetch recursive stuff, so we build the tree ourselves on the client
 *  Note that the same dependency could appear multiple times in this tree if multiple things depend on it
 * @class DependencyTree
 * @public tree A tree of all dependenices, starting as an array of the root level dependencies. Preserves types.
 * @public flatDeps The original set of dependencies that was passed in. Preserves types.
 */
export class DependencyTree<BuildDependency extends BuildDependencyPartial> {
  public readonly tree: Array<TreeNode<BuildDependency>>;
  public readonly flatVulns: Array<AffectedByVulnerability>; // may contain multiple copies of the same vuln from different deps
  public flatEdges: Array<BuildDependency>;

  constructor(sourceDeps: Array<BuildDependency>) {
    this.flatVulns = [];

    // This is a hack to clone this object and unfreeze it, surprisingly tricky in JS
    this.flatEdges = JSON.parse(JSON.stringify(sourceDeps));

    // Go and clean out all the vulnerabilities that don't apply to this version since the DB doesn't know how to do that yet
    this.flatEdges.forEach((edge) => {
      edge.child.release.package.affected_by_vulnerability =
        edge.child.release.package.affected_by_vulnerability.filter((vuln) => {
          const vulnerableRange = this.convertRangesToSemverRange(vuln.ranges);
          const isVulnerable = semver.satisfies(edge.child.release.version, vulnerableRange);
          return isVulnerable;
        });

      // Mark the vulns that can be trivially updated
      edge.child.release.package.affected_by_vulnerability.forEach((vuln) => {
        vuln.triviallyUpdatable = this.precomputeVulnTriviallyUpdatable(edge.child.range, vuln);
        // Also add it to the flat vuln list for easy access
        this.flatVulns.push(vuln);
      });
    });

    const alreadyBuiltNodes = new Map<string, TreeNode<BuildDependency>>();

    // an internal recursive function that builds each node
    // it's in the constructor because this has access to the class generic and the flatDeps
    // recursive stuff is always a little hairy but this is really quite dead simple
    const recursivelyBuildNode = (dep: BuildDependency): TreeNode<BuildDependency> => {
      if (alreadyBuiltNodes.has(dep.child_id)) {
        return alreadyBuiltNodes.get(dep.child_id) as TreeNode<BuildDependency>;
      }

      // Find every dep that points back at this dep
      const unbuiltEdges = this.flatEdges.filter((potentialDependent) => potentialDependent.parent_id === dep.child_id);

      // For each dependent, add it to our list of dependents and populate its own dependents recursively
      const dependents = unbuiltEdges.map(recursivelyBuildNode);

      const newDep: TreeNode<BuildDependency> = {
        ...dep,
        dependents,
      };

      alreadyBuiltNodes.set(dep.child_id, newDep);

      return newDep;
    };

    // start with the root dependencies
    const rootEdges = this.flatEdges.filter((d) => {
      return d.parent_id === '00000000-0000-0000-0000-000000000000';
    });

    // kick off the tree build
    this.tree = rootEdges.map((rootEdge) => recursivelyBuildNode(rootEdge));
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
  // for now, since grype is still in the loop, we need to cross reference information out of this tree using vuln ids
  public checkIfVulnInstancesTriviallyUpdatable(vulnId: string): 'yes' | 'partially' | 'no' | 'not-found' {
    const vulns = this.flatVulns.filter((v) => v.vulnerability.id === vulnId);
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
      return 'yes';
    }
    if (vulnsUpdatable.length === 0) {
      return 'no';
    }
    return 'partially';
  }

  public checkIfPackageTriviallyUpdatable(packageName: string, version: string): 'yes' | 'partially' | 'no' {
    const matchingDeps = this.flatEdges.filter(
      (dep) => dep.child.release.package.name === packageName && dep.child.release.version === version
    );

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
      if (
        currentNode.child.release.package.name === packageName &&
        currentNode.child.release.version === packageVersion
      ) {
        // Put our targetted dep on the end since its the end of the chain
        currentChain.push(currentNode);
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
