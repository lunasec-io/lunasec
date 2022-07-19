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

// eslint-disable-next-line import/order
import { snapshotPinnedDependencies } from '../snapshot/node-package-tree';
jest.setTimeout(100000);

jest.mock('../hasura-api');

// eslint-disable-next-line import/order
import { hasura } from '../hasura-api';

const manifestFixtureDirs = [
  'large-yarn-repo',
  'normal-yarn1-repo',
  'normal-yarn3-repo',
  'normal-npm-repo',
  'vulnerable-repo',
];

function testAllTreeTypes() {
  manifestFixtureDirs.forEach((fixtureName) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/manifests', fixtureName);
    it(`should snapshot ${fixtureName}`, async () => {
      await snapshotPinnedDependencies('bfe13208-7b39-4f53-b8c0-46850e81457f', fixturePath);
      expect(hasura.InsertBuildDependencyRelationships).toBeCalled();
    });
  });
}

describe('building node dependency trees', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  testAllTreeTypes();
});
