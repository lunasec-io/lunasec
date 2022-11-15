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
// This test has been deprecated until such time as can come back and write tests for all of this stuff

import fs from 'fs';
import path from 'path';

import { generateSbomFromAsset } from '../snapshot/call-cli';
import { S3ObjectMetadata } from '../types/s3';
import { snapshotManifestActivity } from '../workers/queue/activities/snapshot-manifest-activity';
const objectMetadata: S3ObjectMetadata = {
  key: '64ce049e-7dac-49a9-b9cb-0e3a53c23e37/2022/2/5/13/9c20ac11-556d-4c2a-886e-00dc12b81ab4',
  bucketName: 'test-manifest-bucket-one',
  region: 'us-west-2',
};

jest.setTimeout(15000);

describe('manifest handler', () => {
  for (let n = 0; n < 3; n++) {
    it.skip('should do full manifest processing flow', async () => {
      await snapshotManifestActivity(objectMetadata);
    });
  }
  for (let n = 0; n < 3; n++) {
    it.skip('should call lunatrace cli (this is a subset of the above test)', (done) => {
      const fileContents = fs.createReadStream(path.resolve(__dirname, 'fixtures/package-lock.json'));
      const gzipData = generateSbomFromAsset('file', 'package-lock.json', 'master', '123abc', {
        inputStream: fileContents,
      });

      expect(gzipData).toBeDefined();
    });
  }
});
