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
import VulnerabilityDependencyTree from '../models/vulnerability-dependency-tree';
import { Manifest } from '../models/vulnerability-dependency-tree/types';

import { fakeDependencyTreeHasuraOutputFixture } from './fixtures/manifests/fake-dependency-tree-hasura-output-fixture';
import { realDependencyTreeHasuraOutputFixture } from './fixtures/manifests/real-dependency-tree-hasura-output';

describe('The fake dependency tree', () => {
  it('should generate a dependency tree from fake dependency tree', () => {
    const tree = new VulnerabilityDependencyTree(fakeDependencyTreeHasuraOutputFixture);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(1);
  });
  it('should generate a dependency tree from real dependency tree', () => {
    const tree = new VulnerabilityDependencyTree(realDependencyTreeHasuraOutputFixture);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(6);
  });
  it('should generate a dependency tree from a very large dependency tree', () => {
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

  it('should generate a dependency tree from a very large dependency tree1', () => {
    const rawTreeString = fs
      .readFileSync(path.join(__dirname, 'fixtures/manifests/huge-docusaurus-tree-hasura-output.json'))
      .toString();
    const parsedTreeData = JSON.parse(rawTreeString) as Manifest[];

    parsedTreeData.forEach((t) => t.child_edges_recursive?.forEach((e) => (e.analysis_results = [])));

    const tree = new DependencyTree(parsedTreeData, null, []);
    const vulnerableReleases = tree.vulnerableReleases;
    expect(vulnerableReleases.length).toBe(17);

    const vulnerableEdges = tree.getVulnerabilities();
    expect(vulnerableEdges.length).toBe(15);
  });
});
