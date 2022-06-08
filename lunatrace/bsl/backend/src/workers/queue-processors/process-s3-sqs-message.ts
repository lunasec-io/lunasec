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
import { WorkerBucketConfig } from '../../types/config';
import { S3ObjectMetadata } from '../../types/s3';
import { S3SqsMessage } from '../../types/sqs';
import { MaybeErrorVoid } from '../../types/util';
import { newError } from '../../utils/errors';
import { log } from '../../utils/log';
import { scanSnapshotActivity } from '../activities/scan-snapshot-activity';
import { snapshotManifestActivity } from '../activities/snapshot-manifest-activity';

export async function processS3SqsMessage(
  bucketConfig: WorkerBucketConfig,
  msg: S3SqsMessage
): Promise<MaybeErrorVoid[]> {
  if (!msg.Records) {
    log.info('No records on sqs event, deleting message, exiting');
    return [];
  }

  // todo: do we actually need this promise handling or should we only take the first record from any event?
  // assuming one file per object created event makes sense
  const handlerPromises = msg.Records.map((record) => {
    // TODO (cthompson) currently record will have "eventSource":"aws:s3" set on it always since all aws events are currently
    // coming from s3. If another aws data source is being used, we will have to check the event source first instead of just
    // assuming all the messages come from s3.

    const s3Record: S3ObjectMetadata = {
      bucketName: record.s3.bucket.name,
      key: record.s3.object.key,
      region: record.awsRegion,
    };

    if (s3Record.bucketName === bucketConfig.sbomBucket) {
      return log.provideFields({ source: 'process-sbom-message' }, () => scanSnapshotActivity(s3Record));
    } else if (s3Record.bucketName === bucketConfig.manifestBucket) {
      return log.provideFields({ source: 'process-manifest-message' }, () => snapshotManifestActivity(s3Record));
    } else {
      return newError(`unknown event from s3 bucket: ${s3Record.bucketName}`);
    }
  });
  return await Promise.all(handlerPromises);
}
