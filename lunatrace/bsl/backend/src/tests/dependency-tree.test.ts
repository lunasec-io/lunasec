import VulnerabilityDependencyTree from '../models/vulnerability-dependency-tree';

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
    expect(vulnerableReleases.length).toBe(48);
  });
});
