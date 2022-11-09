import fs from 'fs';
import path from 'path';

import VulnerabilityDependencyTree from '../models/vulnerability-dependency-tree';
import { Manifest } from '../models/vulnerability-dependency-tree/types';

import { fakeDependencyTreeHasuraOutputFixture } from './fixtures/manifests/fake-dependency-tree-hasura-output-fixture';
import { realDependencyTreeHasuraOutputFixture } from './fixtures/manifests/real-dependency-tree-hasura-output';

describe('The fake dependency tree', () => {
  const rawTreeString = fs
    .readFileSync(path.join(__dirname, 'fixtures/manifests/huge-docusaurus-tree-hasura-output.json'))
    .toString();
  const parsedTreeData = JSON.parse(rawTreeString) as Manifest[];

  it('should generate a dependency tree from fake dependency tree', () => {
    const tree = new VulnerabilityDependencyTree(fakeDependencyTreeHasuraOutputFixture as Array<Manifest>);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(1);
  });
  it('should generate a dependency tree from real dependency tree', () => {
    const tree = new VulnerabilityDependencyTree(realDependencyTreeHasuraOutputFixture as Array<Manifest>);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(48);
  });
  it('should generate a dependency tree from a very large dependency tree', () => {
    const tree = new VulnerabilityDependencyTree(parsedTreeData);
    const vulnerableReleases = tree.getVulnerableReleases();
    expect(vulnerableReleases.length).toBe(17);
  });
});
