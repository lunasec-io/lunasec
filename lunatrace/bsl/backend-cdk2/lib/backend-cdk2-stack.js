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

const yaml = require('js-yaml');
const request = require('sync-request');

class BackendCdk2Stack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const cluster = new eks.Cluster(this, 'lunatest', {
      version: eks.KubernetesVersion.V1_21,
      defaultCapacity: 0,
      albController: {
        version: eks.AlbControllerVersion.V2_4_1,
      },
    });

    cluster.addFargateProfile('DefaultProfile', {
      selectors: [ { namespace: '*' },  ],
    });

    const fluxNamespace = cluster.addManifest('FluxCD-namespace-flux', {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: { name: 'flux' },
    });

    const manifestUrl = 'https://raw.githubusercontent.com/fluxcd/helm-operator/master/deploy/crds.yaml';
    const manifest = yaml.loadAll(request('GET', manifestUrl).getBody());
    const fluxCRDs = cluster.addManifest('FluxCD-CRDs', manifest);
    fluxCRDs.node.addDependency(fluxNamespace)

    const fluxChart = new eks.HelmChart(this, 'FluxCD-chart-flux', {
      cluster,
      chart: 'flux',
      repository: 'https://charts.fluxcd.io',
      namespace: 'flux',
    });
    fluxChart.node.addDependency(fluxCRDs);
    const fluxHelmOperatorChart = new eks.HelmChart(this, 'FluxCD-chart-helm-operator', {
      cluster,
      chart: 'helm-operator',
      repository: 'https://charts.fluxcd.io',
      namespace: 'flux',
    });
    fluxHelmOperatorChart.node.addDependency(fluxCRDs);


  }
}

module.exports = { BackendCdk2Stack }
