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
    console.log(vulnerableEdges.length);
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
    console.log(vulnerableEdges.length);
  });
});
