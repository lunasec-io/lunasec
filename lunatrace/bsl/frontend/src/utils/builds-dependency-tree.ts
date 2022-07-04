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
/* example query on builds
    build_dependencies {
          id
          root_range
          version
          release_id
          sub_dependencies {
            to_dependency
            from_dependency
          }
        }
 */

import semver from 'semver';
// This is just what we need someone to give us to build the tree
// We extend this type with generics so if they give us more, we will give back more data
export interface BuildDependencyPartial {
  id: string;
  root_range: string | null;
  version: string;
  release: {
    package: {
      name: string;
    };
  };
  sub_dependency_relationships: Array<{
    range: string;
    to_dependency: string;
    from_dependency: string;
  }>;
}

// Recursive type to model the recursive tree we are building.  Simply adds the field "dependents" which points down to more nodes.
type BuildDependencyTreeNode<D> = D & {
  rangeRequested: string;
  dependents: Array<BuildDependencyTreeNode<D>>;
};

export type DependencyChain<D> = Array<BuildDependencyTreeNode<D>>;

// hasura doesn't allow us to fetch recursive stuff, so we build the tree ourselves on the client
// Note that the same dependency could appear multiple times in this tree if multiple things depend on it
export class DependencyTree<BuildDependency extends BuildDependencyPartial> {
  public tree: Array<BuildDependencyTreeNode<BuildDependency>>;

  constructor(public flatDeps: BuildDependency[]) {
    // define an internal recursive function that builds each node
    // it's in here because this has access to the class generic and the flatDeps
    function recursivelyBuildNode(
      dep: BuildDependency,
      rangeRequested: string
    ): BuildDependencyTreeNode<BuildDependency> {
      const dependents = dep.sub_dependency_relationships.map((relationship) => {
        const subDep = flatDeps.find((d) => d.id === relationship.to_dependency);
        if (!subDep) {
          throw new Error(
            `Failed to build a dependency relationship from a parent to a child, the child is missing. Parent dep was ${dep}`
          );
        }
        return recursivelyBuildNode(subDep, relationship.range);
      });
      return { ...dep, rangeRequested, dependents };
    }
    // start with the root dependencies
    const rootDeps = flatDeps.filter(function filterRoots(d) {
      d.root_range !== null;
    });
    // kick off the tree build
    this.tree = rootDeps.map((rootDep) => recursivelyBuildNode(rootDep, rootDep.root_range as string));
  }

  // Can show us why a dependency is installed
  public showDependencyChainsOfPackage(
    depId: string,
    prependToExistingChain: string[] = []
  ): DependencyChain<BuildDependency>[] {
    const chains: DependencyChain<BuildDependency>[] = [];
    // walk tree recursively, finding all paths that contain a given item and putting them in the array
    function findInstanceRecur(
      currentNode: BuildDependencyTreeNode<BuildDependency>,
      currentChain: DependencyChain<BuildDependency>
    ): void {
      if (currentNode.id === depId) {
        chains.push(currentChain);
        return;
      }

      currentNode.dependents.forEach((dep) => findInstanceRecur(dep, [...currentChain, currentNode]));
    }
    // Start at the root nodes and walk every path, looking for ones that lead to the dependency
    this.tree.forEach((rootDep) => {
      findInstanceRecur(rootDep, []);
    });
    return chains;
  }

  private lookupDepById(depId: string) {
    const dep = this.flatDeps.find((d) => d.id === depId);
    if (!dep) {
      throw new Error(
        `Couldnt find dependency during lookup, make sure DependencyTree was constructed with this dep included: ${depId}`
      );
    }
    return dep;
  }

  // Note that this wont show ranges of different versions of the package in the tree, just ranges that resolved to the exact version/release.
  // ex: if you had react 4.1.1 and react 5.1.1 in your tree, this would output something like `['>4.0.0, '4.1.1'] and not '>5.0.0' because that's resolved as a different package in the package-lock
  public getRangesRequestedOfPackage(depId: string): string[] {
    const ranges: string[] = [];

    // find the dep and see if it was required directly by the project
    const dep = this.lookupDepById(depId);
    if (dep.root_range) {
      ranges.push(dep.root_range);
    }

    // go through all the deps and look for transitive dependencies on this dep
    this.flatDeps.forEach((d) => {
      // pick out what relationships in the tree point to this package
      const relationship = d.sub_dependency_relationships.find((r) => r.to_dependency === depId);
      if (relationship) {
        ranges.push(relationship.range);
      }
    });
    return ranges;
  }

  public determinePackageTriviallyUpdatable(toVersion: string, depId: string) {
    // I think coercing like this is a good idea because it will make things like `1.2.3-hotfix` appear valid against the ranges, and a lot of patches might be like that
    const coercedVersion = semver.coerce(toVersion);
    if (!semver.valid(coercedVersion) || !coercedVersion) {
      throw new Error('Invalid version specified when checking ');
    }

    const ranges = this.getRangesRequestedOfPackage(depId);
    return ranges.every((range) => {
      semver.satisfies(coercedVersion, range);
    });
  }
}
