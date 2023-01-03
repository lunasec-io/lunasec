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

import { Scalars } from '../hasura-api/generated';

import { MaybeError } from './util';

export type QueueMessageProcessorType = 's3-queue-handler' | 'lunatrace-queue-handler';

// The term 'activity' comes from Temporal and this represents a "single, well defined action". https://docs.temporal.io/concepts/what-is-an-activity/
// Every time we are processing data that comes from a queue, we want to decouple the "action" that is being performed on the collected data
// as much as possible.
export type ActivityFunc<T> = (event: T) => Promise<MaybeError<undefined>>;

export type ActivityHandlerType =
  | ActivityFunc<SnapshotForRepositoryRequest>
  | ActivityFunc<ProcessGithubWebhookRequest>;

export type MessageTypeToActivityLookup = Record<LunaTraceMessageTypes, ActivityHandlerType>;

export type LunaTraceMessageTypes = 'repository-snapshot' | 'process-webhook';

export type LunaTraceSqsMessage = LunaTraceRepositorySnapshotSqsMessage | LunaTraceProcessWebhookSqsMessage;

export interface LunaTraceRepositorySnapshotSqsMessage {
  type: 'repository-snapshot';
  records: SnapshotForRepositoryRequest[];
}

export interface LunaTraceProcessWebhookSqsMessage {
  type: 'process-webhook';
  records: ProcessGithubWebhookRequest[];
}

export interface LunaTraceStaticAnalysisSqsMessage {
  type: 'static-analysis';
  records: ProcessStaticAnalysisRequest[];
}

export interface ProcessGithubWebhookRequest {
  delivery_id: string;
}

export interface ProcessStaticAnalysisRequest {
  vulnerability_id: string;
  manifest_dependency_edge_id: string;
  save_results: boolean;
}

export interface SnapshotBuildInfo {
  projectId?: string;
  pullRequestId?: string;
  sourceType: Scalars['builds_source_type'];
  gitCommit?: string;
  gitBranch: string;
  cloneUrl: string;
}

export interface SnapshotForRepositoryRequest extends SnapshotBuildInfo {
  buildId: string;
  repoGithubId: number;
  installationId: number;
}

export interface S3SqsMessage {
  Records?: Array<FakeS3SqsRecord | S3SqsRecord>;
}

export interface S3SqsRecord {
  eventVersion: string;
  eventSource: string;
  awsRegion: string;
  eventTime: Date;
  eventName: string;
  userIdentity: ErIdentity;
  requestParameters: RequestParameters;
  responseElements: ResponseElements;
  s3: S3;
}

export interface FakeS3SqsRecord {
  s3: {
    bucket: {
      name: string;
    };
    object: {
      key: string;
    };
  };
  awsRegion: string;
}

export interface RequestParameters {
  sourceIPAddress: string;
}

export interface ResponseElements {
  'x-amz-request-id': string;
  'x-amz-id-2': string;
}

export interface S3 {
  s3SchemaVersion: string;
  configurationId: string;
  bucket: Bucket;
  object: S3Object;
}

export interface Bucket {
  name: string;
  ownerIdentity: ErIdentity;
  arn: string;
}

export interface ErIdentity {
  principalId: string;
}

export interface S3Object {
  key: string;
  size: number;
  eTag: string;
  sequencer: string;
}
