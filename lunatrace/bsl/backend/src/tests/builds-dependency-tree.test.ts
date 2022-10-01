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

import { fakeDependencyTreeHasuraOutputFixture } from '../fixtures/manifests/fake-dependency-tree-hasura-output-fixture';
import { DependencyTree } from '../models/dependency-tree/builds-dependency-tree';

describe('The dependency tree', () => {
  it('should generate a dependency tree', () => {
    const tree = new DependencyTree(fakeDependencyTreeHasuraOutputFixture);
    expect(tree).toBeDefined();
    expect(tree.depNodesById.size).toEqual(4);
    expect(tree.childIdToParentIds.size).toEqual(3);
    expect(tree.vulnIdToVulns.size).toEqual(1);
    // parse out vulnerable releases and check the data
    const vulnReleases = tree.getVulnerableReleases();
    expect(vulnReleases.length).toEqual(1);

    const vulnQux = vulnReleases[0];
    expect(vulnQux.triviallyUpdatable).toEqual('yes');
    expect(vulnQux.chains.length).toEqual(1);

    const chainPackageNames = vulnQux.chains[0].map((dep) => dep.release.package.name);
    expect(chainPackageNames).toEqual(['foo', 'bar', 'baz', 'qux']);
  });
});
