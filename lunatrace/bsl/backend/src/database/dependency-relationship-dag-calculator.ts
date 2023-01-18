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

import { murmurHash128x64 } from 'murmurhash-native';
import { DepTreeDep } from 'snyk-nodejs-lockfile-parser-lunatrace-fork/dist/parsers';

// import { murmurhash3 } from '../utils/murmurhash3';

export interface DependencyGraphNode {
  treeHashId: string;
  packageData: DepTreeDep;
  mirroredBlobUrl?: string;
  packageEcosystem: string;
  customRegistry: string;
  parentRange: string;
  parent?: DependencyGraphNode;
  children: DependencyGraphNode[];
}

export interface PackageMerkleHashInputs {
  name: string;
  version: string;
  parentRange?: string;
  labels?: Record<string, unknown>;
  // TODO: Add support for other ecosystem types
  ecosystem: 'npm';
  // TODO: Allow this to be any string once we have support for custom registries.
  customRegistry: string;
  childHashes: string[];
}

/**
 * A function that generates a merkle hash of the data along with the hashes from its children.
 * @param hashInputs The data to hash.
 */
export function generateMerkleHash(hashInputs: PackageMerkleHashInputs): string {
  const { name, version, ecosystem, parentRange, customRegistry, labels, childHashes } = hashInputs;

  const hash = murmurHash128x64(
    childHashes.sort().join('') +
      name +
      version +
      ecosystem +
      customRegistry +
      (parentRange ?? '') +
      (labels !== undefined ? JSON.stringify(labels, Object.keys(labels).sort()) : '')
  );

  return (
    hash.substring(0, 8) +
    '-' +
    hash.substring(8, 12) +
    '-' +
    hash.substring(12, 16) +
    '-' +
    hash.substring(16, 20) +
    '-' +
    hash.substring(20, 32)
  );

  // return murmurhash3.hash128(name + version + ecosystem + parentRange + customRegistry + childHashes.sort().join(''));
}

export function dfsGenerateMerkleTreeFromDepTree(
  currentDep: DepTreeDep,
  recursionFn?: (dep: DepTreeDep) => DependencyGraphNode
): DependencyGraphNode {
  const children: DependencyGraphNode[] = [];

  if (!recursionFn) {
    recursionFn = dfsGenerateMerkleTreeFromDepTree;
  }

  // DependencyGraphEdge
  if (currentDep.dependencies) {
    Object.values(currentDep.dependencies).forEach((childDep) => {
      if (recursionFn) {
        children.push(recursionFn(childDep));
      }
    });
  }

  const currentEdge: DependencyGraphNode = {
    treeHashId: generateMerkleHash({
      name: currentDep.name !== undefined ? currentDep.name : '',
      version: currentDep.version !== undefined ? currentDep.version : '',
      // TODO: Add support for custom registries
      customRegistry: '',
      // TODO: Add support for other ecosystem types
      ecosystem: 'npm',
      parentRange: currentDep.range !== null ? currentDep.range : undefined,
      childHashes: children.map((edge) => edge.treeHashId),
    }),
    // TODO: Add support for custom registries
    customRegistry: '',
    // TODO: Add support for other ecosystem types
    packageEcosystem: 'npm',
    packageData: currentDep,
    parentRange: currentDep.range ? currentDep.range : currentDep.version || '',
    children,
  };

  // We have to create these edges afterwards unless we want to make `treeHashId` a nullable value.
  currentEdge.children.forEach((child) => (child.parent = currentEdge));

  return currentEdge;
}
