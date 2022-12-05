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

import { DataType, IBackup, newDb } from 'pg-mem';
// eslint-disable-next-line import/order
import pgp from 'pg-promise';

const inMemoryPostgresDb = newDb();

const pgPromiseDb = inMemoryPostgresDb.adapters.createPgPromise() as typeof db;

import { v4 } from 'uuid';

inMemoryPostgresDb.registerExtension('uuid', (schema) => {
  schema.registerFunction({
    name: 'gen_random_uuid',
    returns: DataType.uuid,
    implementation: v4,
    impure: true,
  });
});

inMemoryPostgresDb.registerExtension('default_lunatrace_settings', (schema) => {
  schema.registerFunction({
    name: 'insert_default_settings',
    returns: DataType.uuid,
    implementation: v4,
    impure: true,
  });
});

// eslint-disable-next-line import/order
import { db } from '../database/db';

jest.mock('../database/db', () => {
  return {
    db: pgPromiseDb,
    pgp: pgp({
      capSQL: true,
    }),
  };
});

import { collectPackageGraphsFromDirectory, snapshotPinnedDependencies } from '../snapshot/node-package-tree';
jest.setTimeout(100000);

let backup: IBackup | null = null;

import { loadSql } from './mock-db';

const manifestFixtures = [
  // { name: 'large-yarn-repo'}, supporting workspaces right now will break this test but should in theory still work in prod, we can go to the trouble to write this test if we want to bring official support for them
  {
    name: 'normal-yarn1-repo',
    nodeCount: 444,
    edgeCount: 621,
    manifestPath: '/yarn.lock',
  },
  {
    name: 'normal-yarn3-repo',
    nodeCount: 510,
    edgeCount: 754,
    manifestPath: '/yarn.lock',
  },
  {
    name: 'normal-npm-repo',
    nodeCount: 387,
    edgeCount: 551,
    manifestPath: '/package-lock.json',
  },
  {
    name: 'large-npm-repo-with-react-scripts',
    nodeCount: 1489,
    edgeCount: 3303,
    manifestPath: '/package-lock.json',
  },
  // { name: 'vulnerable-repo' }, has no package.json and not sure where this came from so commented out since the test needs a package.json
];

const buildIdOne = 'aaaaaaaa-bbbb-4e6a-92d5-e1deddd1319a';
const buildIdTwo = 'bbbbbbbb-cccc-5e6a-a2d5-f1deddd1319b';

function testAllTreeTypes() {
  manifestFixtures.forEach((fixture) => {
    const fixturePath = path.resolve(__dirname, 'fixtures/manifests', fixture.name);
    describe(fixture.name, () => {
      it(`should call db when calling snapshotPinnedDependencies`, async () => {
        backup?.restore();
        await pgPromiseDb.none(`INSERT INTO builds (id, source_type) VALUES ($1, 'pr')`, [buildIdOne]);

        await snapshotPinnedDependencies(buildIdOne, fixturePath, '', '999fe4f2-9f6c-4e11-9b00-56fe2092ad2c');

        const initialManifests = await db.many<{ id: string; build_id: string; path: string }>(
          `SELECT id, build_id, path FROM manifest`
        );
        expect(initialManifests.length).toBe(1);
        expect(initialManifests[0].id).toBeTruthy();
        expect(initialManifests[0].build_id).toEqual(buildIdOne);
        expect(initialManifests[0].path).toEqual(fixture.manifestPath);

        const numberOfNodes = await db.one<{ count: number }>(`SELECT COUNT(*) AS count FROM manifest_dependency_node`);
        const numberOfEdges = await db.one<{ count: number }>(`SELECT COUNT(*) AS count FROM manifest_dependency_edge`);

        expect(numberOfNodes.count).toEqual(fixture.nodeCount);
        expect(numberOfEdges.count).toEqual(fixture.edgeCount);

        await pgPromiseDb.none(`INSERT INTO builds (id, source_type) VALUES ($1, 'pr')`, [buildIdTwo]);

        await snapshotPinnedDependencies(buildIdTwo, fixturePath, '', '999fe4f2-9f6c-4e11-9b00-56fe2092ad2c');

        const bothManifests = await db.many<{ id: string; build_id: string; path: string }>(
          `SELECT id, build_id, path FROM manifest`
        );
        expect(bothManifests.length).toBe(2);
        expect(bothManifests[0].id).toBeTruthy();
        expect(bothManifests[0].build_id).toEqual(buildIdOne);
        expect(bothManifests[0].path).toEqual(fixture.manifestPath);
        expect(bothManifests[1].id).toBeTruthy();
        expect(bothManifests[1].build_id).toEqual(buildIdTwo);
        expect(bothManifests[1].path).toEqual(fixture.manifestPath);

        const secondNumberOfNodes = await db.one<{ count: number }>(
          `SELECT COUNT(*) AS count FROM manifest_dependency_node`
        );
        const secondNumberOfEdges = await db.one<{ count: number }>(
          `SELECT COUNT(*) AS count FROM manifest_dependency_edge`
        );

        expect(numberOfNodes.count).toEqual(secondNumberOfNodes.count);
        expect(numberOfEdges.count).toEqual(secondNumberOfEdges.count);
      });

      it('collectPackageTreesFromDirectory should return one tree', async () => {
        const trees = await collectPackageGraphsFromDirectory(fixturePath);
        expect(trees.length).toEqual(1);
      });

      // TODO: Figure out if we want to make these tests work again or not.
      // it('should have no null ranges', async () => {
      //   await snapshotPinnedDependencies('7f73f7ca-19f0-4e6a-92d5-e1deddd1319a', fixturePath);
      //   const hasuraCallArgs = hasura.InsertBuildDependencyRelationships.mock.calls[0];
      //   const objectsInserted = hasuraCallArgs[0].objects;
      //
      //   (objectsInserted as Array<Build_Dependency_Relationship_Insert_Input>).forEach((dep) => {
      //     if (!dep.range) {
      //       console.log('encountered dep with null range: ', util.inspect(dep, { depth: Infinity }));
      //     }
      //     expect(dep.range).toBeTruthy();
      //   });
      // });

      // describe('root dependency counts', () => {
      //   // eslint-disable-next-line @typescript-eslint/no-var-requires
      //   const packageJson = require(path.join(fixturePath, 'package.json'));
      //   const expectedDepLength =
      //     Object.keys(packageJson.dependencies).length + Object.keys(packageJson.devDependencies).length;
      //
      //   it(`tree should have ${expectedDepLength} root level dependencies`, async () => {
      //     const [tree] = await collectPackageGraphsFromDirectory(fixturePath);
      //
      //     const outputRootDepCount = Object.keys(tree.dependencies).length;
      //     expect(outputRootDepCount).toEqual(expectedDepLength);
      //   });
      //
      //   it(`should call hasura with ${expectedDepLength} root level dependencies`, async () => {
      //     await snapshotPinnedDependencies('7f73f7ca-19f0-4e6a-92d5-e1deddd1319a', fixturePath);
      //     const hasuraCallArgs = hasura.InsertBuildDependencyRelationships.mock.calls[0];
      //     const objectsInserted = hasuraCallArgs[0].objects;
      //
      //     const rootObjects = (objectsInserted as Array<Build_Dependency_Relationship_Insert_Input>).filter((dep) => {
      //       return dep.depended_by_relationship_id === null;
      //     });
      //     expect(rootObjects.length).toEqual(expectedDepLength);
      //   });
      // });
    });
  });
}

describe.skip('building node dependency trees from fixture:', () => {
  beforeEach(async () => {
    if (backup === null) {
      await pgPromiseDb.none(loadSql('setup-db.sql'));
      await pgPromiseDb.none(loadSql('setup-db-schema.sql'));
      backup = inMemoryPostgresDb.backup();
    }

    // jest.resetAllMocks();
  });
  testAllTreeTypes();
});
