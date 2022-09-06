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
#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { BackendCdk2Stack } = require('../lib/backend-cdk2-stack');

import { stackInputs } from '../stack-inputs';

const app = new cdk.App();

const appName = stackInputs.appName;
const env = {
  account: stackInputs.cdkDefaultAccount,
  region: stackInputs.cdkDefaultRegion,
};

new BackendCdk2Stack(app, 'BackendCdk2Stack', {
  env: env,
  ...stackInputs,
});
