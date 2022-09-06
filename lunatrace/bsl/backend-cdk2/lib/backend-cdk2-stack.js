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
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");

const systemFluxNamespaceName = "system-flux";

const systemSecretsNamespaceName = "system-secrets";

const systemSecretsServiceAccountName = "ssm-serviceaccount";

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

    const secretsNamespace = cluster.addManifest("secrets-namespace", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: systemSecretsNamespaceName },
    });

    const secretsOperatorChart = new eks.HelmChart(this, "secrets-operator", {
      cluster,
      chart: "external-secrets",
      version: "0.5.9",
      namespace: systemSecretsNamespaceName,
      repository: "https://charts.external-secrets.io",
    })
    secretsOperatorChart.node.addDependency(secretsNamespace);

    const secretsServiceAccount = cluster.addServiceAccount('secrets-sa', {namespace: systemSecretsNamespaceName, name: systemSecretsServiceAccountName});
    secretsServiceAccount.node.addDependency(secretsNamespace);

    // todo insecure
    secretsServiceAccount.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [ "secretsmanager:GetResourcePolicy",
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret",
        "secretsmanager:ListSecretVersionIds"],
      resources: ['*'],
    }));

    const secretsClusterStoreManifest = cluster.addManifest("secrets-cluster-store", {
      "apiVersion": "external-secrets.io/v1beta1",
      "kind": "ClusterSecretStore",
      "metadata": {
        "name": "secretstore"
      },
      "spec": {
        "provider": {
          "aws": {
            "service": "SecretsManager",
            "region": "us-west-2",
            "auth": {
              "jwt": {
                "serviceAccountRef": {
                  "name": systemSecretsServiceAccountName,
                  "namespace": systemSecretsNamespaceName
                }
              }
            }
          }
        }
      }
    });
    secretsClusterStoreManifest.node.addDependency(secretsServiceAccount);
    secretsClusterStoreManifest.node.addDependency(secretsOperatorChart);

    const fluxNamespace = cluster.addManifest("FluxCD-namespace-flux", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: systemFluxNamespaceName },
    });

    const fluxChart = new eks.HelmChart(this, "FluxCD-chart-flux", {
      cluster,
      chart: "flux2",
      repository: "https://fluxcd-community.github.io/helm-charts",
      namespace: systemFluxNamespaceName,
      version: "1.3.0",
    });
    fluxChart.node.addDependency(fluxNamespace);

    const fluxSyncChart = new eks.HelmChart(this, "FluxCD-chart-flux-sync", {
      cluster,
      chart: "flux2-sync",
      repository: "https://fluxcd-community.github.io/helm-charts",
      namespace: systemFluxNamespaceName,
      values: {

      }
    });
    fluxSyncChart.node.addDependency(fluxChart);
    fluxSyncChart.node.addDependency(secretsClusterStoreManifest);


  }
}

module.exports = { BackendCdk2Stack };
