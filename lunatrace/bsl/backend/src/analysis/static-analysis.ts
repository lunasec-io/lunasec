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
import { SendMessageCommand } from '@aws-sdk/client-sqs';

import { sqsClient } from '../aws/sqs-client';
import { getStaticAnalysisConfig } from '../config';
import { hasura } from '../hasura-api';
import { Analysis_Finding_Type_Enum } from '../hasura-api/generated';
import { LunaTraceStaticAnalysisSqsMessage, ProcessStaticAnalysisRequest } from '../types/sqs';
import { MaybeErrorVoid } from '../types/util';
import { newError, newResult } from '../utils/errors';
import { log } from '../utils/log';
import { getSqsUrlFromName } from '../utils/sqs';
import { catchError, threwError } from '../utils/try';

// TODO (cthompson) we probably want this to be a shared constant in a protobuf definition
// this is the same constant as lunatrace/bsl/ingest-worker/pkg/staticanalysis/rules/importedandcalled.go
export const importedAndCalledRuleVersion = 4;

export async function queueManifestDependencyEdgeForStaticAnalysis(
  vulnerabilityId: string,
  manifestDependencyEdgeId: string
): Promise<MaybeErrorVoid> {
  const cacheResult = await catchError(
    hasura.GetManifestDependencyEdgeAnalysisResult({
      vulnerability_id: vulnerabilityId,
      manifest_dependency_edge_id: manifestDependencyEdgeId,
      finding_source_version: importedAndCalledRuleVersion,
    })
  );
  if (threwError(cacheResult)) {
    return newError('Failed to lookup project when using repository id');
  }

  if (cacheResult.analysis_manifest_dependency_edge_result.length > 0) {
    log.info('found cached analysis result for manifest dependency edge analysis', {
      vulnerabilityId,
      manifestDependencyEdgeId,
    });
    return newResult(undefined);
  }

  const staticAnalysisConfig = getStaticAnalysisConfig();

  const staticAnalysisQueueUrl = await getSqsUrlFromName(staticAnalysisConfig.queueName);

  if (staticAnalysisQueueUrl.error) {
    log.error('unable to load static analysis queue url', {
      queueName: staticAnalysisQueueUrl,
    });
    return newError('unable to get queue url');
  }

  log.info('Queueing manifest dependency edge for static analysis', {
    queue: staticAnalysisQueueUrl.res,
  });

  const req: ProcessStaticAnalysisRequest = {
    vulnerability_id: vulnerabilityId,
    manifest_dependency_edge_id: manifestDependencyEdgeId,
    // todo should we not save some results? this should be ok because we only analyze edges with known vulns.
    save_results: true,
  };

  const sqsEvent: LunaTraceStaticAnalysisSqsMessage = {
    type: 'static-analysis',
    records: [req],
  };
  const result = await sqsClient.send(
    new SendMessageCommand({
      MessageBody: JSON.stringify(sqsEvent),
      MessageAttributes: {},
      QueueUrl: staticAnalysisQueueUrl.res,
    })
  );
  if (!result || !result.$metadata.httpStatusCode || result.$metadata.httpStatusCode >= 300) {
    log.error('unable to queue manifest dependency edge for static analysis', {
      req,
    });
    return newError('sending message to queue failed, responded: ' + JSON.stringify(result));
  }
  log.info('queued dependency for static analysis', {
    queue: staticAnalysisQueueUrl.res,
    req,
  });
  return newResult(undefined);
}
