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

export interface BuildDependencyPartial {
  id: string;
  depended_by_relationship_id?: string;
  range: string;
  release_id: string;
  release: {
    version: string;
    package: {
      affected_by_vulnerability: Array<AffectedByVulnerability>;
      name: string;
      package_manager: string;
    };
  };
}

export interface AffectedByVulnerability {
  vulnerability: {
    id: string;
  };
  ranges: Array<{
    introduced?: string | null;
    fixed?: string | null;
  }>;
  triviallyUpdatable?: boolean; // We add this by determining something can be updated to a non-vulnerable version without violating semver
}

// Recursive type to model the recursive tree we are building.  Simply adds the field "dependents" which points down to more nodes.
export type TreeNode<D> = D & {
  dependents: Array<TreeNode<D>>;
};

export type DependencyChain<D> = Array<TreeNode<D>>;
