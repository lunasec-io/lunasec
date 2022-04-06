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
import { Readable } from 'stream';
import zlib from 'zlib';

import markdownTable from 'markdown-table';
import validate from 'validator';

import { generateGithubGraphqlClient } from '../github';
import { getInstallationAccessToken } from '../github/auth';
import { hasura } from '../hasura-api';
import { Scans_Insert_Input } from '../hasura-api/generated';
import { parseAndUploadScan } from '../models/scan';
import { S3ObjectMetadata } from '../types/s3';
import { SbomBucketInfo } from '../types/scan';
import { QueueErrorResult, QueueSuccessResult } from '../types/sqs';
import { aws } from '../utils/aws-utils';
import { isError, tryF } from '../utils/try';

import { groupByPackage, VulnerablePackage } from './report-generator/group-findings';

function decompressGzip(stream: Readable, streamLength: number): Promise<zlib.Gzip> {
  return new Promise((resolve, reject) => {
    console.debug('started streaming file from s3');

    const chunkSize = streamLength < 1024 * 256 ? streamLength : 1024 * 256;

    const gunzip = zlib.createGunzip({ chunkSize: chunkSize < 64 ? 64 : chunkSize });

    console.debug('started unzipping file');
    const unZippedSbomStream = stream.pipe(gunzip);
    unZippedSbomStream.on('error', (e) => {
      console.error('Error unzipping sbom ', e);
      unZippedSbomStream.end(() => console.log('closed stream due to error'));
      reject(e);
    });

    resolve(unZippedSbomStream);
  });
}

async function scanSbom(buildId: string, sbomBucketInfo: SbomBucketInfo): Promise<Scans_Insert_Input> {
  console.log(`[buildId: ${buildId}]`, `scanning sbom ${JSON.stringify(sbomBucketInfo)}`);

  const [sbomStream, sbomLength] = await aws.getFileFromS3(
    sbomBucketInfo.key,
    sbomBucketInfo.bucketName,
    sbomBucketInfo.region
  );

  const unZippedSbomStream = await decompressGzip(sbomStream, sbomLength);

  console.log(`[buildId: ${buildId}]`, `updating manifest status to "scanning" if it existed`);
  await hasura.UpdateManifestStatusIfExists({ status: 'scanning', buildId: buildId });

  const scanReport = await parseAndUploadScan(unZippedSbomStream, buildId);

  console.log(`[buildId: ${buildId}]`, 'upload complete, notifying manifest if one exists');
  await hasura.UpdateManifestStatusIfExists({ status: 'scanned', buildId: buildId });

  console.log(`[buildId: ${buildId}]`, 'done with scan');

  return scanReport;
}

function formatLocationText(finding: VulnerablePackage) {
  if (finding.locations.length === 0) {
    return 'Unknown';
  }

  return `${finding.locations.length} location${finding.locations.length > 1 ? 's' : ''}`;
}

function generatePullRequestCommentFromReport(projectId: string, report: Scans_Insert_Input) {
  const messageParts = [
    '## Build Snapshot Complete',
    '',
    `\n[View Full Report](https://lunatrace.lunasec.io/project/${projectId}/build/${report.build_id})`,
  ];

  if (!report.findings) {
    return messageParts.join('\n');
  }

  const groupedFindings = groupByPackage(projectId, report.findings.data);

  const filteredFindings = Object.values(groupedFindings).filter(
    // TODO: Make the severity filter configurable.
    (finding) => finding.severity !== 'Unknown' && finding.severity === 'Critical'
  );

  const tableData: string[][] = filteredFindings.map((finding): string[] => {
    return [
      finding.package_name,
      finding.package_versions ? finding.package_versions.join(', ') : 'Unknown Version',
      finding.severity,
      formatLocationText(finding),
      `[Dismiss](https://lunatrace.lunasec.io/project/${projectId}/build/${report.build_id})`,
    ] as string[];
  });

  messageParts.push('### Security Scan Findings');
  messageParts.push(`Showing ${tableData.length} results.\n`);
  messageParts.push(markdownTable([['Package Name', 'Versions', 'Severity', 'Locations', ''], ...tableData]));

  return messageParts.join('\n');
}

async function notifyScanResults(buildId: string, scanReport: Scans_Insert_Input) {
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

  const body = generatePullRequestCommentFromReport(projectId, scanReport);

  if (body === null) {
    console.error(`generated scan report is null`, {
      projectId,
      installationId,
      pullRequestId,
    });
    return;
  }

  await github.AddComment({
    subjectId: pullRequestId.toString(),
    body,
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

  const scanResp = await tryF<Scans_Insert_Input>(async () => await scanSbom(buildId, bucketInfo));
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
