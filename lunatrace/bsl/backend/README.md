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
* serverless (via serverless-express package?)
* auth with ORY?
* deployment with CDK

### Running Lambda

#### Sqs Queue Payload
Edit `data/upload-sbom-payload.json` or `data/scan-sbom-payload.json`
```json
{
    "Records": [
        {
            "messageId": "message-id1",
            "receiptHandle": "message-handle1",
            "body": "{\"action\":\"uploadSbom\",\"projectId\":\"5d1f9f0f-bdb3-4dc9-8454-2c77a58744f0\"}"
        }
    ]
}
```

#### Building lambda docker container
Build lambda docker container
```shell
docker build -f lambda.dockerfile . -t lunasec/lunatrace-backend-lambda
```

or Build lambda docker container with volume mount
```shell
docker run -p 9000:8080 -v $(pwd)/build:/var/task lunasec/lunatrace-backend-lambda
```

#### Running lambda docker container
Run lambda docker container
```shell
docker run -p 9000:8080 lunasec/lunatrace-backend-lambda
```

#### Sending data to lambda
```shell
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d @data/upload-sbom-payload.json | jq .
```
