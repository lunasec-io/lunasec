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
  dependend_by_relationship_id: string;
  range: string;
  release_id: string;
  package: {
    vulnerabilities: Array<{
      id: string;
    }>;
  };

  // root_range: string | null;
  // sub_dependency_relationships: Array<{
  //   range: string;
  //   to_dependency: string;
  // }>;
}

// Recursive type to model the recursive tree we are building.  Simply adds the field "dependents" which points down to more nodes.
type BuildDependencyTreeNode<D> = D & {
  dependents: Array<BuildDependencyTreeNode<D>>;
};

export type DependencyChain<D> = Array<BuildDependencyTreeNode<D>>;

/**
 *  hasura and graphql doesn't allow us to fetch recursive stuff, so we build the tree ourselves on the client
 *  Note that the same dependency could appear multiple times in this tree if multiple things depend on it
 * @class DependencyTree
 * @public tree A tree of all dependenices, starting as an array of the root level dependencies. Preserves types.
 * @public flatDeps The original set of dependencies that was passed in. Preserves types.
 */
export class DependencyTree<BuildDependency extends BuildDependencyPartial> {
  public tree: Array<BuildDependencyTreeNode<BuildDependency>>;

  constructor(public flatDeps: BuildDependency[]) {
    // define an internal recursive function that builds each node
    // it's in the constructor because this has access to the class generic and the flatDeps
    // recursive stuff is always a little hairy but this is really quite dead simple
    function recursivelyBuildNode(dep: BuildDependency): BuildDependencyTreeNode<BuildDependency> {
      // Find every dep that points back at this dep
      const unbuiltDependents = flatDeps.filter(
        (potentialDependent) => potentialDependent.dependend_by_relationship_id === dep.id
      );
      // For each dependent, populate its own dependents recursively
      const dependents = unbuiltDependents.map(recursivelyBuildNode);
      return { ...dep, dependents };
    }
    // start with the root dependencies
    const rootDeps = flatDeps.filter(function filterRoots(d) {
      d.dependend_by_relationship_id === null;
    });
    // kick off the tree build
    this.tree = rootDeps.map((rootDep) => recursivelyBuildNode(rootDep));
  }

  // Can show us why a dependency is installed
  // TODO: commented o until we need it and schema is solidified
  // public showDependencyChainsOfPackage(
  //   depId: string,
  //   prependToExistingChain: string[] = []
  // ): DependencyChain<BuildDependency>[] {
  //   const chains: DependencyChain<BuildDependency>[] = [];
  //   // walk tree recursively, finding all paths that contain a given item and putting them in the array
  //   function findInstanceRecur(
  //     currentNode: BuildDependencyTreeNode<BuildDependency>,
  //     currentChain: DependencyChain<BuildDependency>
  //   ): void {
  //     if (currentNode.id === depId) {
  //       chains.push(currentChain);
  //       // This was what we were looking for, abandon this chain
  //       return;
  //     }
  //     // if we aren't at the bottom of the chain yet, keep looking through transitives for our dependency
  //     currentNode.dependents.forEach((dep) => findInstanceRecur(dep, [...currentChain, currentNode]));
  //   }
  //   // Start at the root nodes and walk every path using the above function, looking for ones that lead to the dependency
  //   this.tree.forEach((rootDep) => {
  //     findInstanceRecur(rootDep, []);
  //   });
  //   return chains;
  // }

  /**
   * Finds a dependency out of the list of deps using its id
   * @param depId
   * @private
   * @throws Error
   */
  private lookupDepById(depId: string) {
    const dep = this.flatDeps.find((d) => d.id === depId);
    if (!dep) {
      throw new Error(
        `Couldnt find dependency during lookup, make sure DependencyTree was constructed with this dep included: ${depId}`
      );
    }
    return dep;
  }

  /**
   * Gets all the ranges that a package was requested with
   *   Note that this wont show ranges of different versions of the package in the tree, just ranges that resolved to the exact version/release.
   *   ex: if you had react 4.1.1 and react 5.1.1 in your tree, this would output something like `['>4.0.0, '4.1.1'] and not '>5.0.0' because that's resolved as a different package in the package-lock
   * @param depId
   * @throws Error
   */

  // public getRangesRequestedOfPackage(depId: string): string[] {
  //   const ranges: string[] = [];
  //
  //   // find the dep and see if it was required directly by the project
  //   const dep = this.lookupDepById(depId);
  //   if (dep.root_range) {
  //     ranges.push(dep.root_range);
  //   }
  //
  //   // go through all the deps and look for transitive dependencies on this dep
  //   this.flatDeps.forEach((d) => {
  //     // pick out what relationships in the tree point to this package
  //     const relationship = d.sub_dependency_relationships.find((r) => r.to_dependency === depId);
  //     if (relationship) {
  //       ranges.push(relationship.range);
  //     }
  //   });
  //   return ranges;
  // }

  /**
   * See if we can update a package to a fixed version(s) without violating semver
   * @param toVersions Since there might be multiple fix versions for a vulnerability, take a list of possible ones we could update to in `toVersions`
   * @param depId
   */
  // public determinePackageTriviallyUpdatable(toVersions: string[], depId: string): boolean {
  //   return toVersions.some((toVersion) => {
  //     // I think coercing like this is a good idea because it will make things like `1.2.3-hotfix` appear valid against the ranges, and a lot of patches might be like that
  //     // Maybe it will do that automatically, need to test. Awful docs for this library.
  //     const coercedVersion = semver.coerce(toVersion);
  //     if (!semver.valid(coercedVersion) || !coercedVersion) {
  //       throw new Error(
  //         'Invalid version specified when checking if updatable, probably bad OSV data from the vulnerability data source fixes field'
  //       );
  //     }
  //
  //     const ranges = this.getRangesRequestedOfPackage(depId);
  //     return ranges.every((range) => {
  //       semver.satisfies(coercedVersion, range);
  //     });
  //   });

  /**
   * since vulns are still coming in from grype for the moment, we need to look through the tree, find what they apply to, and then determine if an update will fix it.
   * In the future we will just build this info right into the tree, most likely
   * @param vulnId
   */
  public determineVulnTriviallyUpdatable(vulnId: string) {
    BuildDependencyTreeNode = [];
  }
}
