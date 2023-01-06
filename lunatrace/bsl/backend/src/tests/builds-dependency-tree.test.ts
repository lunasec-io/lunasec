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

import { DependencyChain, Manifest } from '../models/vulnerability-dependency-tree/types';
import VulnerabilityDependencyTree from '../models/vulnerability-dependency-tree/vulnerability-dependency-tree';

import { fakeDependencyTreeHasuraOutputFixture } from './fixtures/manifests/fake-dependency-tree-hasura-output-fixture';
import { realDependencyTreeHasuraOutputFixture } from './fixtures/manifests/real-dependency-tree-hasura-output';

describe('The fake dependency tree', () => {
  const tree = new VulnerabilityDependencyTree(fakeDependencyTreeHasuraOutputFixture);

  it('should generate a dependency tree', () => {
    expect(tree).toBeDefined();
  });

  it('should have the right parents for node 4', () => {
    const parentIds = tree.graph.getParentIds('4');
    expect(parentIds).toEqual(new Set(['3', '1']));
  });

  it('Should show vulnerable releases properly', () => {
    const vulnReleases = tree.getVulnerableReleases();
    expect(vulnReleases.length).toEqual(1);

    const vulnQux = vulnReleases[0];
    expect(vulnQux.trivially_updatable).toEqual('yes');
    console.log('vulnQux is', vulnQux);
    expect(vulnQux.chains.length).toEqual(2);
    expect(vulnQux.paths).toEqual(['package-lock.json']);
    const chain = vulnQux.chains[1];

    const chainPackageNames = chain.map((dep) => dep.release.package.name);
    expect(chainPackageNames).toEqual(['foo', 'bar', 'baz', 'qux']);

    const leafNode = chain[chain.length - 1];
    expect(leafNode.id).toEqual('4');
  });

  it('should filter vulnerabilities by severity', () => {
    const treeWithMiminumSeverity = new VulnerabilityDependencyTree(fakeDependencyTreeHasuraOutputFixture, [], 'High');
    const vulnerableReleases = treeWithMiminumSeverity.getVulnerableReleases();
    expect(vulnerableReleases.length).toEqual(1);
    const vulnRelease = vulnerableReleases[0];
    expect(vulnRelease.beneath_minimum_severity).toEqual(true);
    expect(vulnRelease.affected_by[0].beneath_minimum_severity).toEqual(true);
  });

  it('should ignore vulnerabilities', () => {
    const ignored = [{ vulnerability_id: 'a', locations: ['package-lock.json'], note: 'this is the note' }];
    const treeWithIgnored = new VulnerabilityDependencyTree(fakeDependencyTreeHasuraOutputFixture, ignored);
    expect(treeWithIgnored.getVulnerableReleases()[0].affected_by[0].ignored).toEqual(true);
  });
  it('should show guides', () => {
    const guides = tree.getVulnerableReleases()[0].guides;
    expect(guides.length).toEqual(1);
    expect(guides[0].id).toEqual('g1');
  });
});

describe('a real sample dependency tree', () => {
  const tree = new VulnerabilityDependencyTree(realDependencyTreeHasuraOutputFixture);
  it('should build', () => {
    expect(tree).toBeDefined();
  });
});

describe('huge docusaurus dependency tree', () => {
  const rawTreeString = fs
    .readFileSync(path.join(__dirname, 'fixtures/manifests/huge-docusaurus-tree-hasura-output.json'))
    .toString();
  const parsedTreeData = JSON.parse(rawTreeString) as Manifest[];
  parsedTreeData.forEach((t) => t.child_edges_recursive?.forEach((e) => (e.analysis_results = [])));

  const tree = new VulnerabilityDependencyTree(parsedTreeData);

  it('should build', () => {
    expect(tree).toBeDefined();
  });

  it('should have a sane first vuln', () => {
    const vulnerableReleases = tree.getVulnerableReleases();
    const firstVuln = vulnerableReleases[0];
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

  it('should have no duplicate chains', () => {
    tree.getVulnerableReleases().forEach((vr) => {
      const chainStrings = vr.chains.map((chain) => {
        const jsonSlug = JSON.stringify(chain);
        return jsonSlug;
      });

      const chainStringSet = new Set(chainStrings);
      expect(chainStrings.length).toEqual(chainStringSet.size);
    });
  });

  it('should generate the right number of vulnerabilities', () => {
    const rawTreeString = fs
      .readFileSync(path.join(__dirname, 'fixtures/manifests/huge-docusaurus-tree-hasura-output.json'))
      .toString();
    const parsedTreeData = JSON.parse(rawTreeString) as Manifest[];

    parsedTreeData.forEach((t) => t.child_edges_recursive?.forEach((e) => (e.analysis_results = [])));

    const tree = new VulnerabilityDependencyTree(parsedTreeData);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(17);

    const vulnerableEdges = tree.getEdgesWhereChildIsVulnerable();
    expect(vulnerableEdges.length).toBe(54);
  });
});

function chainToChainNames(chain: DependencyChain): string {
  return chain.map((node) => node.release.package.name).join('#');
}
