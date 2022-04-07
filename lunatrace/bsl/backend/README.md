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

### Running Lambda

#### Sqs Queue Payload
Edit `fixtures/upload-sbom-payload.json` or `fixtures/scan-sbom-payload.json` to see the payloads

#### Building lambda docker container
Build lambda docker container
```shell
sudo docker build -f lambda.dockerfile . -t lunasec/lunatrace-backend-lambda
```

#### Running lambda docker container
Run lambda docker container
```shell
run docker run -p 9000:8080 lunasec/lunatrace-backend-lambda
```

or run lambda docker container with volume mount
```shell
sudo docker run -p 9000:8080 -v $(pwd)/build:/var/task -e HASURA_ADMIN_SECRET=myadminsecretkey lunasec/lunatrace-backend-lambda
```

#### Sending data to lambda
```shell
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d @fixtures/upload-sbom-payload.json | jq .
```
