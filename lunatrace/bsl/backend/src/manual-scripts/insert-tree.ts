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
import * as os from 'os';
import path from 'path';

import { snapshotPinnedDependencies } from '../snapshot/node-package-tree';

// This is a one-off script for manual testing purposes
// TODO: change this to whatever directory you want to manually load a tree from
const fixturePath = path.resolve(os.homedir(), 'tmp/beer-me');
console.log('loading from ', fixturePath);
// again change the buildId to whatever you want
void snapshotPinnedDependencies(
  '736de7fc-2df3-4438-af90-b3596f65dd8d',
  fixturePath,
  'http://some.code.url',
  '999fe4f2-9f6c-4e11-9b00-56fe2092ad2c'
);
