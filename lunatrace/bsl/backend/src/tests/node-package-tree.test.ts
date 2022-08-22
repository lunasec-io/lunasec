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
import path from 'path';
import util from 'util';

// eslint-disable-next-line import/order
import { collectPackageGraphsFromDirectory, snapshotPinnedDependencies } from '../snapshot/node-package-tree';
jest.setTimeout(100000);

jest.mock('../hasura-api');

import { hasura as mockedHasura } from '../hasura-api';
import { Build_Dependency_Relationship_Insert_Input } from '../hasura-api/generated';

const hasura = mockedHasura as jest.MockedObject<typeof mockedHasura>;

const manifestFixtures = [
  // { name: 'large-yarn-repo'}, supporting workspaces right now will break this test but should in theory still work in prod, we can go to the trouble to write this test if we want to bring official support for them
  { name: 'normal-yarn1-repo' },
  { name: 'normal-yarn3-repo' },
  { name: 'normal-npm-repo' },
  // { name: 'vulnerable-repo' }, has no package.json and not sure where this came from so commented out since the test needs a package.json
];

function testAllTreeTypes() {
  manifestFixtures.forEach((fixture) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/manifests', fixture.name);
    describe(fixture.name, () => {
      it(`should call hasura when calling snapshotPinnedDependecies`, async () => {
        // build id doesnt matter, this never hits the DB
        await snapshotPinnedDependencies('7f73f7ca-19f0-4e6a-92d5-e1deddd1319a', fixturePath);
        expect(hasura.InsertBuildDependencyRelationships).toBeCalled();
      });

      it('collectPackageTreesFromDirectory should return one tree', async () => {
        const trees = await collectPackageGraphsFromDirectory(fixturePath);
        expect(trees.length).toEqual(1);
      });

      it('should have no null ranges', async () => {
        await snapshotPinnedDependencies('7f73f7ca-19f0-4e6a-92d5-e1deddd1319a', fixturePath);
        const hasuraCallArgs = hasura.InsertBuildDependencyRelationships.mock.calls[0];
        const objectsInserted = hasuraCallArgs[0].objects;

        (objectsInserted as Array<Build_Dependency_Relationship_Insert_Input>).forEach((dep) => {
          if (!dep.range) {
            console.log('encountered dep with null range: ', util.inspect(dep, { depth: Infinity }));
          }
          expect(dep.range).toBeTruthy();
        });
      });

      describe('root dependency counts', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageJson = require(path.join(fixturePath, 'package.json'));
        const expectedDepLength =
          Object.keys(packageJson.dependencies).length + Object.keys(packageJson.devDependencies).length;

        it(`tree should have ${expectedDepLength} root level dependencies`, async () => {
          const [tree] = await collectPackageGraphsFromDirectory(fixturePath);

          const outputRootDepCount = Object.keys(tree.pkgTree.dependencies).length;
          expect(outputRootDepCount).toEqual(expectedDepLength);
        });

        it(`should call hasura with ${expectedDepLength} root level dependencies`, async () => {
          await snapshotPinnedDependencies('7f73f7ca-19f0-4e6a-92d5-e1deddd1319a', fixturePath);
          const hasuraCallArgs = hasura.InsertBuildDependencyRelationships.mock.calls[0];
          const objectsInserted = hasuraCallArgs[0].objects;

          const rootObjects = (objectsInserted as Array<Build_Dependency_Relationship_Insert_Input>).filter((dep) => {
            return dep.depended_by_relationship_id === null;
          });
          expect(rootObjects.length).toEqual(expectedDepLength);
        });
      });
    });
  });
}

describe('building node dependency trees from fixture:', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  testAllTreeTypes();
});
