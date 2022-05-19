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
import { getEtlBucketConfig } from '../../config';
import { S3ObjectMetadata } from '../../types/s3';
import { S3SqsMessage } from '../../types/sqs';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { scanSnapshotActivity } from '../activities/scan-snapshot-activity';
import { snapshotManifestActivity } from '../activities/snapshot-manifest-activity';

export async function processS3SqsMessage(msg: S3SqsMessage): Promise<MaybeError<undefined>> {
  const bucketConfig = getEtlBucketConfig();

  if (!msg.Records) {
    log.info('No records on sqs event, deleting message, exiting');
    return newError('No records on sqs event, deleting message, exiting');
  }

  // todo: do we actually need this promise handling or should we only take the first record from any event?
  // assuming one file per object created event makes sense
  const handlerPromises = msg.Records.map((record) => {
    const s3Record: S3ObjectMetadata = {
      bucketName: record.s3.bucket.name,
      key: record.s3.object.key,
      region: record.awsRegion,
    };

    if (s3Record.bucketName === bucketConfig.sbomBucket) {
      return scanSnapshotActivity(s3Record);
    } else if (s3Record.bucketName === bucketConfig.manifestBucket) {
      return snapshotManifestActivity(s3Record);
    } else {
      return newError(`unknown event from s3 bucket: ${s3Record.bucketName}`);
    }
  });
  const results = await Promise.all(handlerPromises);

  const errors = results.filter((result) => result.error);

  if (errors.length > 0) {
    log.error('Errors found during SQS job:', { errors });
    // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
    return newError('Errors found during SQS job');
  }

  return newResult(undefined);
}
