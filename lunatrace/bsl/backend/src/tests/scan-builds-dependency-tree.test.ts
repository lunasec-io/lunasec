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
import { queueManifestDependencyEdgeForStaticAnalysis } from '../analysis/static-analysis';
import { DependencyTree } from '../models/dependency-tree/builds-dependency-tree';
import { scanSnapshotActivity } from '../workers/queue/activities/scan-snapshot-activity';

describe('scan dependency tree for vulnerabilities', () => {
  it('should queue manifest edges for analysis', async () => {
    process.env.GOLANG_QUEUE_NAME = 'lunatrace-breadchris-EtlStorage-LunaTraceDevelopmentGolangQueue6299-oCQ8RCgX4f91';
    await queueManifestDependencyEdgeForStaticAnalysis(
      '9b0c3bd4-afa8-4846-beb2-c83793e566aa',
      '2d41be4c-b5bd-92ef-1bed-e6233160f0d2'
    );
    // await scanSnapshotActivity('c01082ea-3d94-4089-9a9f-dcfe08975bbf', {
    //   key: 'fake',
    //   region: 'fake',
    //   bucketName: 'fake',
    // });
  });
});
