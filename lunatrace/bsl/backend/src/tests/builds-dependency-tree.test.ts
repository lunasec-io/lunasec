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

import fs from 'fs';
import path from 'path';

import { DependencyTree } from '../models/dependency-tree/builds-dependency-tree';
import { DependencyChain, RawManifest } from '../models/dependency-tree/types';

import { fakeDependencyTreeHasuraOutputFixture } from './fixtures/manifests/fake-dependency-tree-hasura-output-fixture';
import { realDependencyTreeHasuraOutputFixture } from './fixtures/manifests/real-dependency-tree-hasura-output';

describe('The fake dependency tree', () => {
  const tree = new DependencyTree(fakeDependencyTreeHasuraOutputFixture, null, []);

  it('should generate a dependency tree', () => {
    expect(tree).toBeDefined();
    expect(tree.nodesByNodeId.size).toEqual(4);
    expect(tree.parentNodeIdsByNodeId.size).toEqual(3);
    expect(tree.parentNodeIdsByNodeId.get('4')?.size).toEqual(2);
  });

  it('Should show vulnerable releases properly', () => {
    const vulnReleases = tree.vulnerableReleases;
    expect(vulnReleases.length).toEqual(1);

    const vulnQux = vulnReleases[0];
    expect(vulnQux.trivially_updatable).toEqual('yes');
    expect(vulnQux.chains.length).toEqual(2);
    expect(vulnQux.paths).toEqual(['package-lock.json']);
    const chain = vulnQux.chains[0];

    const chainPackageNames = chain.map((dep) => dep.release.package.name);
    expect(chainPackageNames).toEqual(['foo', 'bar', 'baz', 'qux']);

    const leafNode = chain[chain.length - 1];
    expect(leafNode.id).toEqual('4');
  });

  it('should show all vulnerabilities with getVulnerabilities()', () => {
    const vulnerabilities = tree.getVulnerabilities();
    expect(vulnerabilities.length).toEqual(1);
    expect(vulnerabilities[0].vulnerability.source_id).toEqual('GHSA123ABC');
    expect(vulnerabilities[0].chains.length).toEqual(2);
    expect(vulnerabilities[0].chains[0].length).toEqual(4);
    expect(vulnerabilities[0].chains[1].length).toEqual(2);
  });

  it('should convert chain to edge ids', () => {
    const chain = tree.vulnerableReleases[0].chains[0];
    const edgeId = tree.getEdgeIdFromNodePair(chain[0].id, chain[1].id);
    expect(edgeId).toEqual('e2');
  });

  it('should filter vulnerabilities by severity', () => {
    const treeWithMiminumSeverity = new DependencyTree(fakeDependencyTreeHasuraOutputFixture, 'High', []);
    expect(treeWithMiminumSeverity.vulnerableReleases.length).toEqual(1);
    const vulnRelease = treeWithMiminumSeverity.vulnerableReleases[0];
    expect(vulnRelease.beneath_minimum_severity).toEqual(true);
    expect(vulnRelease.affected_by[0].beneath_minimum_severity).toEqual(true);
  });

  it('should ignore vulnerabilities', () => {
    const ignored = [{ vulnerability_id: 'a', locations: ['package-lock.json'], note: 'this is the note' }];
    const treeWithIgnored = new DependencyTree(fakeDependencyTreeHasuraOutputFixture, null, ignored);
    expect(treeWithIgnored.vulnerableReleases[0].affected_by[0].ignored).toEqual(true);
  });
  it('should show guides', () => {
    const guides = tree.vulnerableReleases[0].guides;
    expect(guides.length).toEqual(1);
    expect(guides[0].id).toEqual('g1');
  });
});

describe('a real sample dependency tree', () => {
  const tree = new DependencyTree(realDependencyTreeHasuraOutputFixture, null, []);
  it('should build', () => {
    expect(tree).toBeDefined();
  });
});

describe('huge docusaurus dependency tree', () => {
  const rawTreeString = fs
    .readFileSync(path.join(__dirname, '../fixtures/manifests/huge-docusaurus-tree-hasura-output.json'))
    .toString();
  const parsedTreeData = JSON.parse(rawTreeString) as RawManifest[];

  const tree = new DependencyTree(parsedTreeData, null, []);

  it('should build', () => {
    expect(tree).toBeDefined();
  });

  it('should have a sane first vuln', () => {
    const firstVuln = tree.vulnerableReleases[0];

    const byCount: Map<string, number> = new Map();

    firstVuln.chains.forEach((chain) => {
      const chainName = chainToChainNames(chain);
      const chainCount = byCount.get(chainName);
      byCount.set(chainName, chainCount ? chainCount + 1 : 1);
    });

    const chainStrings = firstVuln.chains.map(chainToChainNames);
    const chainStringSet = new Set(chainStrings);

    expect(chainStrings.length).toEqual(chainStringSet.size);
  });
});

function chainToChainNames(chain: DependencyChain): string {
  return chain.map((node) => node.release.package.name).join('#');
}
