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

import {PkgTree} from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import {
  dfsGenerateMerkleTreeFromDepTree,
  generateMerkleHash,
  PackageMerkleHashInputs
} from '../database/dependency-relationship-dag-calculator';

const hashInputData: PackageMerkleHashInputs = {
  name: 'test',
  version: '1.0.0',
  ecosystem: 'npm',
  customRegistry: '',
  childHashes: ['2972817b-3bf3-42fd-8ffc-a92b595a5f38', '2655a2f8-7693-4083-9168-2c934b3636bd']
};

describe('Dependency relationship hashing', () => {
  const baseHash = generateMerkleHash(hashInputData);

  it.concurrent('should hash data', () => {
    const hash = generateMerkleHash(hashInputData);
    expect(baseHash === hash).toBeTruthy();
    expect(hash).toBe('1e4f7e93-e3eb-d38e-b6e0-1d5444e09116');
  });

  it.concurrent('should hash data with no child hashes', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      childHashes: []
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('dfe1616f-8c9b-8bef-8b47-1f552b9a5fc9');
  });

  it.concurrent('should hash data with custom registry', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      customRegistry: 'registry.com'
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('83f2fa97-ae7d-9c0f-0985-37e38e567552');
  });

  it.concurrent('should hash data with parent range', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      parentRange: '^1.2.3'
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('8c78c738-e87e-0d10-2d42-9a34c9e675ed');
  });

  it.concurrent('should hash data with different ecosystem', () => {
    const hash = generateMerkleHash({
      ...hashInputData,
      // TODO: Add support for other ecosystems in types
      ecosystem: 'java' as any
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('67ca139b-2196-f6ec-5ad6-fc1337be5c0d');
  });

  it.concurrent('should hash data without labels', () => {
    const hash = generateMerkleHash({
      name: 'trim',
      version: '0.0.1',
      ecosystem: 'npm',
      customRegistry: '',
      childHashes: [],
      parentRange: '0.0.1',
      labels: undefined
    });
    expect(baseHash === hash).toBeFalsy();
    expect(hash).toBe('f6b07e92-29bc-25ab-933c-91f5895af5e5');
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
          version: '1.0.0'
        }
      }
    },
    'test-dep-2': {
      name: 'test-dep-2',
      version: '1.0.0'
    }
  }
};

const testPackageTreeWithCommonSubtrees: PkgTree = {
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
          dependencies: {
            'test-dep-2': {
              name: 'test-dep-2',
              version: '1.0.0'
            }
          }
        }
      }
    },
    'test-dep-2': {
      name: 'test-dep-2',
      version: '1.0.0'
    },
    'test-dep-dep': {
      name: 'test-dep-dep',
      version: '1.0.0',
      dependencies: {
        'test-dep-2': {
          name: 'test-dep-2',
          version: '1.0.0'
        }
      }
    }
  }
};

describe('Dependency graph generation', () => {

  it.concurrent('should generate merkle hashes for tree', () => {

    const rootNode = dfsGenerateMerkleTreeFromDepTree(JSON.parse(JSON.stringify(testPackageTree)));

    expect(rootNode.children?.length).toBe(2);
    expect(rootNode.children?.[0].children?.length).toBe(1);
    expect(rootNode.children?.[1].children?.length).toBe(0);
    expect(rootNode.packageData.name).toBe('test');
    expect(rootNode.packageData.version).toBe('1.0.0');
    expect(rootNode.parent).toBe(undefined);

    expect(rootNode.children?.[0].children?.[0].treeHashId).toBe('1ad4c5b9-4f06-7911-ad85-6677944a3d1a');
    expect(rootNode.children?.[0].treeHashId).toBe('39e82dcf-99f4-7f2c-6e96-1fc98d87c302');
    expect(rootNode.children?.[1].treeHashId).toBe('16cb328f-e554-2f2e-dbe9-1694dd107f27');
    expect(rootNode.treeHashId).toBe('90e4f604-b510-7ccd-a760-eef8ca9e3537');
  });

  it.concurrent('should generate merkle hashes for tree with common subtrees', () => {

    const rootNode = dfsGenerateMerkleTreeFromDepTree(JSON.parse(JSON.stringify(testPackageTreeWithCommonSubtrees)));

    expect(rootNode.children?.length).toBe(3);
    expect(rootNode.children?.[0].children?.length).toBe(1);
    expect(rootNode.children?.[1].children?.length).toBe(0);
    expect(rootNode.children?.[2].children?.length).toBe(1);
    expect(rootNode.packageData.name).toBe('test');
    expect(rootNode.packageData.version).toBe('1.0.0');
    expect(rootNode.parent).toBe(undefined);

    expect(rootNode.children?.[0].children?.[0].treeHashId).toEqual(rootNode.children?.[2].treeHashId);
    expect(rootNode.children?.[0].children?.[0].treeHashId).toBe('e0fa603b-568c-d6d7-d8c6-39e6cc783971');
    expect(rootNode.children?.[0].treeHashId).toBe('2434a8c2-835b-3351-41f9-e9dc404f6db9');
    expect(rootNode.children?.[1].treeHashId).toBe('16cb328f-e554-2f2e-dbe9-1694dd107f27');
    expect(rootNode.children?.[2].treeHashId).toBe('e0fa603b-568c-d6d7-d8c6-39e6cc783971');
    expect(rootNode.treeHashId).toBe('d7f9642b-fdb4-fb3f-40d6-f5cce92c95c6');
  });
});
