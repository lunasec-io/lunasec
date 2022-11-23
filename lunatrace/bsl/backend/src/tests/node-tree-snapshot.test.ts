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

import { collectPackageGraphsFromDirectory } from '../snapshot/node-package-tree';

const manifestFixtureMeta = [
  // { name: 'large-yarn-repo'}, supporting workspaces right now will break this test but should in theory still work in prod, we can go to the trouble to write this test if we want to bring official support for them
  {
    directory: 'normal-yarn1-repo',
    nodeCount: 444,
    edgeCount: 621,
    manifestPath: '/yarn.lock',
  },
  {
    directory: 'normal-yarn3-repo',
    nodeCount: 510,
    edgeCount: 754,
    manifestPath: '/yarn.lock',
  },
  {
    directory: 'normal-npm-repo',
    nodeCount: 387,
    edgeCount: 551,
    manifestPath: '/package-lock.json',
  },
  {
    directory: 'large-npm-repo-with-react-scripts',
    nodeCount: 1489,
    edgeCount: 3303,
    manifestPath: '/package-lock.json',
  },
];

manifestFixtureMeta.forEach((manifestMeta) => {
  const fixtureDir = path.join(__dirname, 'fixtures/manifests', manifestMeta.directory);
  describe(`collecting package graphs from directory ${manifestMeta.directory}`, () => {
    it('should run without throwing', async () => {
      await collectPackageGraphsFromDirectory(fixtureDir);
    });
  });
});
