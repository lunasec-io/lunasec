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
import { DependencyTree } from './builds-dependency-tree';
import { DependencyEdgePartial } from './types';

// TODO: Move this to a fixtures file
const dependencies: Array<DependencyEdgePartial> = [
  {
    child_id: '1',
    parent_id: '00000000-0000-0000-0000-000000000000',
    child: {
      id: '1',
      range: '1.0.0',
      release_id: '1',
      release: {
        version: '1.0.0',
        package: {
          affected_by_vulnerability: [],
          name: 'foo',
          package_manager: 'npm',
        },
      },
    },
  },
  {
    child_id: '2',
    parent_id: '1',
    child: {
      id: '2',
      range: '1.0.0',
      release_id: '2',
      release: {
        version: '1.0.0',
        package: {
          affected_by_vulnerability: [],
          name: 'bar',
          package_manager: 'npm',
        },
      },
    },
  },
  {
    child_id: '3',
    parent_id: '2',
    child: {
      id: '3',
      range: '1.0.0',
      release_id: '3',
      release: {
        version: '1.0.0',
        package: {
          affected_by_vulnerability: [],
          name: 'baz',
          package_manager: 'npm',
        },
      },
    },
  },
  {
    child_id: '4',
    parent_id: '3',
    child: {
      id: '4',
      range: '^1.0.0',
      release_id: '4',
      release: {
        version: '1.0.2',
        package: {
          affected_by_vulnerability: [
            {
              vulnerability: {
                id: 'a',
              },
              ranges: [
                {
                  fixed: '1.0.3',
                  introduced: '1.0.0',
                },
              ],
            },
          ],
          name: 'qux',
          package_manager: 'npm',
        },
      },
    },
  },
];

describe('The dependency tree', () => {
  it('should generate a dependency tree', () => {
    const tree = new DependencyTree(dependencies);
    expect(tree).toBeDefined();
    expect(tree.depNodesById.size).toEqual(4);
    expect(tree.nodeIdToParentIds.size).toEqual(3);
    expect(tree.packageSlugToChildIds.size).toEqual(5);
    expect(tree.vulnIdToVulns.size).toEqual(1);

    const chains = tree.showDependencyChainsOfPackage('qux', '1.0.2');
    expect(chains.length).toEqual(1);
    expect(chains[0].length).toEqual(4);
    expect(chains[0][0].child.release.package.name).toEqual('foo');
    expect(chains[0][1].child.release.package.name).toEqual('bar');
    expect(chains[0][2].child.release.package.name).toEqual('baz');
    expect(chains[0][3].child.release.package.name).toEqual('qux');

    const vulnTriviallyUpdatable = tree.checkIfVulnInstancesTriviallyUpdatable('a');
    expect(vulnTriviallyUpdatable).toEqual('yes');
  });
});
