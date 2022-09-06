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
const cdk = require('aws-cdk-lib');
const eks = require('aws-cdk-lib/aws-eks');

class BackendCdk2Stack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new eks.FargateCluster(this, 'lunatest', {
      version: eks.KubernetesVersion.V1_21,
    });
  }
}

module.exports = { BackendCdk2Stack }
