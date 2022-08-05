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
# LunaTrace Backend
Express server for trace backend.  Presigns upload URLs, runs grype tests, and serves frontend routes

### Technology Choices
* typescript
* postgres via aurora
* Fargate cluster for async tasks
* auth with ORY
* deployment with CDK

### Testing the queue

#### Snapshotting a repository
Go into the database in order to get `repo-github-id` and `install-id`
```shell
yarn test:queue snapshot-repository --branch main --repo-github-id 486437050 --install-id 26134064
```

#### Scanning a snapshot
The url comes from the `snapshot-repository` command in the logs.
```shell
yarn test:queue process-sbom --s3-url https://lunatrace-breadchris-etlstorag-sbombucket8550fee8-ohmyu4hf5uec.s3.us-west-2.amazonaws.com/26134064/2022/7/4/17/c9acaaf4-d564-4643-8892-09a9cd1173ff
```
