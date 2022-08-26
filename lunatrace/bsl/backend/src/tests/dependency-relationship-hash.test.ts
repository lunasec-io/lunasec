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
  it.concurrent('should hash data', () => {
    const hash = generateMerkleHash(hashInputData);
    expect(hash).toBe('4205f568-039b-835d-341a-0449419ce52a');
  });

  it.concurrent('should hash data with no child hashes', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      childHashes: [],
    });
    expect(hash).toBe('8ef7d4dd-1080-3586-6390-dde5ee27d8fd');
  });

  it.concurrent('should hash data with custom registry', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      customRegistry: 'registry.com',
    });
    expect(hash).toBe('42735086-192a-2496-cf2e-47899b24a49a');
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
