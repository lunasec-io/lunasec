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
import { getEtlBucketConfig } from '../config';
import { generateSnapshotForRepository } from '../github/actions/generate-snapshot-for-repository';
import { createGithubWebhookInterceptor } from '../github/webhooks';
import { S3ObjectMetadata } from '../types/s3';
import {
  LunaTraceProcessWebhookSqsEvent,
  LunaTraceRepositorySnapshotSqsEvent,
  LunaTraceSqsEvent,
  QueueHandlerType,
  S3SqsEvent,
} from '../types/sqs';
import { MaybeError } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';

import { handleSnapshotManifest } from './generate-sbom';
import { createGithubWebhookHandler } from './github-webhook';
import { handleScanSbom } from './scan-sbom';

export type QueueHandlerFunc<T> = (event: T) => Promise<MaybeError<undefined>>;

export type QueueHandlerFuncType = QueueHandlerFunc<S3SqsEvent> | QueueHandlerFunc<LunaTraceProcessWebhookSqsEvent>;

export type QueueHandlersType = Record<QueueHandlerType, QueueHandlerFuncType>;

export async function handleS3SqsEvent(event: S3SqsEvent): Promise<MaybeError<undefined>> {
  const bucketConfig = getEtlBucketConfig();

  if (!event.Records) {
    log.info('No records on sqs event, deleting message, exiting');
    return newError('No records on sqs event, deleting message, exiting');
  }
  // todo: do we actually need this promise handling or should we only take the first record from any event?
  // assuming one file per object created event makes sense
  const handlerPromises = event.Records.map((record) => {
    const s3Record: S3ObjectMetadata = {
      bucketName: record.s3.bucket.name,
      key: record.s3.object.key,
      region: record.awsRegion,
    };
    if (s3Record.bucketName === bucketConfig.sbomBucket) {
      return handleScanSbom(s3Record);
    } else if (s3Record.bucketName === bucketConfig.manifestBucket) {
      return handleSnapshotManifest(s3Record);
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

async function getPromisesFromHandler(event: LunaTraceSqsEvent) {
  const webhooks = await createGithubWebhookInterceptor();
  const webhookHandler = createGithubWebhookHandler(webhooks);

  if (!event.type) {
    log.error('event type is not defined', {
      event,
    });
    return [];
  }

  if (event.type === 'repository-snapshot') {
    // TODO (cthompson) how do you do that flow type interface thing? I thought it worked something like this but I was wrong.
    const repositorySnapshotEvent = event;
    return repositorySnapshotEvent.records.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return generateSnapshotForRepository(record);
    });
  } else if (event.type === 'process-webhook') {
    const repositoryWebhookEvent = event;
    return repositoryWebhookEvent.records.map((record) => {
      // Executes the proper handler for whatever queue we are processing, passed in above as an argument
      return webhookHandler(record);
    });
  }

  log.error('Unhandled queue event', {
    parsedBody: event,
  });
  return [];
}

export async function handleLunaTraceSqsEvent(event: LunaTraceSqsEvent): Promise<MaybeError<undefined>> {
  const handlerPromises = await getPromisesFromHandler(event);

  const results = await Promise.all(handlerPromises);

  const errors = results.filter((result) => result.error);

  if (errors.length > 0) {
    log.error('Errors found during SQS job:', { errors });
    // TODO: (freeqaz) Handle this case by changing the visibility timeout back instead of just swallowing this.
    return newError('Errors found during SQS job');
  }

  return newResult(undefined);
}
