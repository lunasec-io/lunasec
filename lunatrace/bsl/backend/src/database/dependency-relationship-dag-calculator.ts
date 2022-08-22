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
import { PkgTree } from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import { DepTreeDep } from 'snyk-nodejs-lockfile-parser-lunatrace-fork/dist/parsers';

import { murmurhash3 } from '../utils/murmurhash3';

export interface DependencyGraphNode {
  treeHashId: string;
  packageData: DepTreeDep;
  parent?: DependencyGraphNode;
  children: DependencyGraphNode[];
}

export interface PackageMerkleHashInputs {
  name: string;
  version: string;
  // TODO: Add support for other ecosystem types
  ecosystem: 'npm';
  // TODO: Allow this to be any string once we have support for custom registries.
  customRegistry?: string;
  childHashes: string[];
}

/**
 * A function that generates a merkle hash of the data along with the hashes from its children.
 * @param hashInputs The data to hash.
 */
export function generateMerkleHash(hashInputs: PackageMerkleHashInputs): string {
  const { name, version, ecosystem, customRegistry } = hashInputs;

  const packageHashSlug = `${ecosystem}-${name}-${customRegistry === undefined ? '' : customRegistry}-${version}`;

  const childHashes = hashInputs.childHashes.sort().join('-');

  const hash = murmurhash3.hash128(`${packageHashSlug}-${childHashes}`);

  return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-${hash.substring(12, 16)}-${hash.substring(
    16,
    20
  )}-${hash.substring(20, 32)}`;
}

export function dfsGenerateMerkleTreeFromDepTree(
  currentDep: DepTreeDep,
  recursionFn?: (dep: DepTreeDep) => DependencyGraphNode
): DependencyGraphNode {
  if (!recursionFn) {
    recursionFn = dfsGenerateMerkleTreeFromDepTree;
  }

  const children: DependencyGraphNode[] = [];

  // DependencyGraphEdge
  if (currentDep.dependencies) {
    for (const childDep of Object.values(currentDep.dependencies)) {
      children.push(recursionFn(childDep));
    }
  }

  const currentEdge: DependencyGraphNode = {
    treeHashId: generateMerkleHash({
      name: currentDep.name || '',
      version: currentDep.version || '',
      ecosystem: 'npm',
      childHashes: children.map((edge) => edge.treeHashId),
    }),
    packageData: currentDep,
    children,
  };

  // We have to create these edges afterwards unless we want to make `treeHashId` a nullable value.
  currentEdge.children.forEach((child) => (child.parent = currentEdge));

  return currentEdge;
}
