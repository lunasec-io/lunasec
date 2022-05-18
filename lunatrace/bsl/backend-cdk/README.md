<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# Welcome to your CDK TypeScript project!

## Useful commands

* `yarn run build`   compile typescript to js
* `yarn run watch`   watch for changes and compile
* `yarn run test`    perform the jest unit tests
* `yarn run cdk deploy`      deploy this stack to your default AWS account/region
* `yarn run cdk diff`        compare deployed stack with current state
* `yarn run cdk synth`       emits the synthesized CloudFormation template

## Setting variables properly

For our deployment stack, we have a few variables that need to be set before any CDK commands.

Here is an example command to deploy this:
```shell
CDK_DOCKER="$(pwd)/sudo-docker-shim.sh" STACK_DOMAIN_NAME="lunatrace.lunasec.io" STACK_DOMAIN_ZONE_ID="SOME_ZONE_ID" yarn run cdk deploy
```

If you use `sudo docker` then you'll need that shim script. If you have rootless Docker or some other config, you can
just omit it though.


## Hacky Deployment Steps

With backend running on your box do

`cd backend-cdk`

`./build-containers`

`yarn run prod:cdk:deploy`

watch the deployment in aws console -
https://us-west-2.console.aws.amazon.com/ecs/v2/clusters/lunatrace-BackendStack-LunaTraceFargateClusterCF463AE0-eko30PlhvQ8T/services/lunatrace-BackendStack-Service9571FDD8-pRICa2elicKg/configuration?region=us-west-2

Watch the logs in the task, check health statuses of each container and make sure theyre healthy.

If anything goes wrong, go to the service and hit edit and roll the revision back to the previous number.

once finished manually apply the metadata from your machine to the production hasura instance. For me connecting to the prod instance looks like:

```bash
HASURA_GRAPHQL_ENDPOINT=https://lunatrace.lunasec.io/api/hasura HASURA_GRAPHQL_ADMIN_SECRET="$(aws secretsmanager get-secret-value --secret-id lunatrace-HasuraAdminSecret | jq -r .SecretString)" hasura migrate apply
```
followed by `hasura metadata apply` and `metadata reload`, also against the prod instance

### See production logs

`saw`
