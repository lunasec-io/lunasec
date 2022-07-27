import * as os from 'os';
import path from 'path';

import { snapshotPinnedDependencies } from '../snapshot/node-package-tree';

// This is a one-off script for manual testing purposes
// TODO: change this to whatever directory you want to manually load a tree from
const fixturePath = path.resolve(os.homedir(), 'tmp/beer-me');
console.log('loading from ', fixturePath);
// again change the buildId to whatever you want
snapshotPinnedDependencies('736de7fc-2df3-4438-af90-b3596f65dd8d', fixturePath);
