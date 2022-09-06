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
const cdk = require("aws-cdk-lib");
const eks = require("aws-cdk-lib/aws-eks");
const iam = require("aws-cdk-lib/aws-iam");

class BackendCdk2Stack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const cluster = new eks.FargateCluster(this, "lunatest", {
      version: eks.KubernetesVersion.V1_21,
      albController: {
        version: eks.AlbControllerVersion.V2_4_1,
      },
      defaultProfile: {
        selectors: [{ namespace: "*" }],
      },
    });

    const fluxNamespace = cluster.addManifest("FluxCD-namespace-flux", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "flux" },
    });

    const fluxChart = new eks.HelmChart(this, "FluxCD-chart-flux", {
      cluster,
      chart: "flux2",
      repository: "https://fluxcd-community.github.io/helm-charts",
      namespace: "flux",
      version: "1.3.0",
    });
    fluxChart.node.addDependency(fluxNamespace);
  }
}

module.exports = { BackendCdk2Stack };
