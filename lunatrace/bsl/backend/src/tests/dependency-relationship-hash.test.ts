/* eslint-disable */
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
import {
  dfsGenerateMerkleTreeFromDepTree,
  generateMerkleHash,
  PackageMerkleHashInputs
} from '../database/dependency-relationship-dag-calculator';

const hashInputData: PackageMerkleHashInputs = {
  name: 'test',
  version: '1.0.0',
  ecosystem: 'npm',
  childHashes: ['2972817b-3bf3-42fd-8ffc-a92b595a5f38', '2655a2f8-7693-4083-9168-2c934b3636bd'],
};

describe('Dependency relationship hashing', () => {
  const baseHash = generateMerkleHash(hashInputData);

  it.concurrent('should hash data', () => {
    const hash = generateMerkleHash(hashInputData);
    expect(baseHash === hash).toBeTruthy();
    expect(hash).toBe('0dfa8e52-9b89-35e4-126a-ca48abdff888');
  });

  it.concurrent('should hash data with no child hashes', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      childHashes: [],
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('f3201bf5-5894-eb81-1fa4-99c8b910b131');
  });

  it.concurrent('should hash data with custom registry', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      customRegistry: 'registry.com',
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('f4a38231-2b6a-ef80-9ed6-ee77cfbc9050');
  });

  it.concurrent('should hash data with parent range', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      parentRange: '^1.2.3',
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('7ad6be10-69c9-f343-f915-1fc953c11de2');
  });

  it.concurrent('should hash data with different ecosystem', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      // TODO: Add support for other ecosystems in types
      ecosystem: 'java' as any,
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('68e904ee-552c-4c1c-7a1c-f4e5132a063d');
  });
});

const testPackageTree: PkgTree = {
  name: 'test',
  version: '1.0.0',
  dependencies: {
    'test-dep': {
      name: 'test-dep',
      version: '1.0.0',
      dependencies: {
        'test-dep-dep': {
          name: 'test-dep-dep',
          version: '1.0.0',
        },
      },
    },
    'test-dep-2': {
      name: 'test-dep-2',
      version: '1.0.0',
    },
  },
};

describe('Dependency graph generation', () => {

  it.concurrent('should generate merkle hashes for tree', () => {

    const rootNode = dfsGenerateMerkleTreeFromDepTree(JSON.parse(JSON.stringify(testPackageTree)));

    // expect(flatDeps.length).toBe(4);
    // expect(flatDeps[0].dependency.name).toBe('test-dep-dep');
    // expect(flatDeps[0].parentId).toBe('2b556b32-4e7e-b3e6-7406-ccb21927b4ff');
    // expect(flatDeps[1].dependency.name).toBe('test-dep');
    // expect(flatDeps[1].parentId).toBe('84e96045-7e6b-bd96-71ca-135c92165f56');
    // expect(flatDeps[2].dependency.name).toBe('test-dep-2');
    // expect(flatDeps[2].parentId).toBe('84e96045-7e6b-bd96-71ca-135c92165f56');
    // expect(flatDeps[3].dependency.name).toBe('test');
    // expect(flatDeps[4].parentId).toBe(undefined);

    expect(rootNode.children?.length).toBe(2);
    expect(rootNode.children?.[0].children?.length).toBe(1);
    expect(rootNode.children?.[1].children?.length).toBe(0);
    expect(rootNode.packageData.name).toBe('test');
    expect(rootNode.packageData.version).toBe('1.0.0');
    expect(rootNode.parent).toBe(undefined);

    expect(rootNode.children?.[0].children?.[0].treeHashId).toBe('06f79a95-dbdf-89be-1447-9d31d1c1967a');
    expect(rootNode.children?.[0].treeHashId).toBe('b015639a-1ac0-4503-a117-48238de949cd');
    expect(rootNode.children?.[1].treeHashId).toBe('d4770201-7d3c-4165-17cf-23f92c18fe7d');
    expect(rootNode.treeHashId).toBe('f416765f-f52b-f3ec-e7bf-7dd52a4b217b');
  });
});
