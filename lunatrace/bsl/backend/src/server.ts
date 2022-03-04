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

import { app } from './app';
import { handleGenerateSbom } from './handlers/generateSbom';
import { readDataFromQueue } from './sqs/read-queue';
import { S3ObjectMetadata } from './types/s3';

const executionMode = process.env.EXECUTION_MODE || 'server';

if (executionMode === 'process-manifest-queue') {
  void (async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await readDataFromQueue(handleGenerateSbom);
    }
  })();
} else if (executionMode === 'process-sbom-queue') {
  void (async () => {
    const processMessage = (object: S3ObjectMetadata) => {
      // Todo: might want to have this be careful and poll hasura to make sure the build exists first..im not sure how fast those sqs
      // s3 events are but we dont want a race condition where we havent created the build in hasura yet but have uploaded the sbom
      console.log(object);
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await readDataFromQueue(processMessage);
    }
  })();
} else {
  const port = process.env.PORT || 3002; // This port needs to be exposed to the hasura backend, via the docker-compose
  app.listen(port, () => {
    console.log('Server is running on port ', port);
  });
}
