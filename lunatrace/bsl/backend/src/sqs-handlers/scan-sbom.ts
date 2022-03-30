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
import zlib from 'zlib';

import markdownTable from 'markdown-table';
import validate from 'validator';

import { generateGithubGraphqlClient } from '../github';
import { getInstallationAccessToken } from '../github/auth';
import { hasura } from '../hasura-api';
import { Scan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { Finding, Report, SbomBucketInfo } from '../types/scan';
import { QueueErrorResult, QueueSuccessResult } from '../types/sqs';
import { aws } from '../utils/aws-utils';
import { isError, tryF } from '../utils/try';

async function scanSbom(buildId: string, sbomBucketInfo: SbomBucketInfo): Promise<Report> {
  console.log(`[buildId: ${buildId}]`, `scanning sbom ${sbomBucketInfo}`);

  const [sbomStream, sbomLength] = await aws.getFileFromS3(
    sbomBucketInfo.key,
    sbomBucketInfo.bucketName,
    sbomBucketInfo.region
  );
  console.debug('started streaming file from s3');
  const gunzip = zlib.createGunzip({ chunkSize: sbomLength });

  console.debug('started unzipping file');
  const unZippedSbomStream = sbomStream.pipe(gunzip);
  unZippedSbomStream.on('error', (e) => {
    console.error('Error unzipping sbom ', e);
    unZippedSbomStream.end(() => console.log('closed stream due to error'));
    // throw e;
  });

  console.log(`[buildId: ${buildId}]`, `updating manifest status to "scanning" if it existed`);
  await hasura.UpdateManifestStatusIfExists({ status: 'scanning', buildId: buildId });

  const report = await Scan.uploadScan(unZippedSbomStream, buildId);

  console.log(`[buildId: ${buildId}]`, 'upload complete, notifying manifest if one exists');
  await hasura.UpdateManifestStatusIfExists({ status: 'scanned', buildId: buildId });

  console.log(`[buildId: ${buildId}]`, 'done with scan');

  return report;
}

async function notifyScanResults(buildId: string, scanReport: Report) {
  const notifyInfo = await hasura.GetScanReportNotifyInfoForBuild({
    build_id: buildId,
  });

  if (!notifyInfo.builds_by_pk || !notifyInfo.builds_by_pk.project || !notifyInfo.builds_by_pk.project.organization) {
    console.error(`unable to get required scan notify information for buildId: ${buildId}`);
    return;
  }

  const projectId = notifyInfo.builds_by_pk.project.id;
  const installationId = notifyInfo.builds_by_pk.project.organization.installation_id;
  const pullRequestId = notifyInfo.builds_by_pk.pull_request_id;

  if (!installationId) {
    console.error(`installation id is not defined for buildId: ${buildId}`);
    return;
  }

  if (!pullRequestId) {
    console.error(`pull request id is not defined for buildId: ${buildId}`);
    return;
  }

  const installationToken = await getInstallationAccessToken(installationId);

  const github = generateGithubGraphqlClient(installationToken);

  function generatePullRequestCommentFromReport(projectId: string, report: Report) {
    const messageParts = ['## LunaTrace Scan Report', ''];

    const tableData = report.findings.map((finding) => {
      return [
        finding.package_name,
        finding.severity,
        `${finding.locations.length} location${finding.locations.length > 1 ? 's' : ''}`,
        `[View Report](https://lunatrace.lunasec.io/project/${projectId}/build/${report.build_id}`,
      ];
    });

    return messageParts.join('\n') + markdownTable([['Package Name', 'Severity', 'Locations', ''], ...tableData]);
  }

  await github.AddComment({
    subjectId: pullRequestId.toString(),
    body: generatePullRequestCommentFromReport(projectId, scanReport),
  });
}

export async function handleScanSbom(message: S3ObjectMetadata): Promise<QueueSuccessResult | QueueErrorResult> {
  const { key, region, bucketName } = message;
  const buildId = key.split('/').pop();
  if (!buildId || !validate.isUUID(buildId)) {
    console.error('invalid build uuid from s3 object at key ', key);
    // not much we can do without a valid buildId
    return {
      success: false,
      error: new Error('invalid build uuid from s3 object at key ' + key),
    };
  }

  const bucketInfo: SbomBucketInfo = { region, bucketName, key };

  const scanResp = await tryF<Report>(async () => await scanSbom(buildId, bucketInfo));
  if (isError(scanResp)) {
    console.error('SBOM generation error', { scanResp });
    await hasura.UpdateManifestStatusIfExists({
      status: 'error',
      message: String(scanResp.message),
      buildId: buildId,
    });
    return {
      success: false,
      error: new Error(scanResp.message),
    };
  }

  await notifyScanResults(buildId, scanResp);

  return {
    success: true,
  };
}
