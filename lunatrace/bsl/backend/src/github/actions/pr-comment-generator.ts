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
import { filterFindingsByIgnored, Finding, groupByPackage, VulnerablePackage } from '@lunatrace/lunatrace-common';
import markdownTable from 'markdown-table';

import { hasura } from '../../hasura-api';
import { InsertedScan } from '../../models/scan';
import {log} from '../../utils/log'
import { generateGithubGraphqlClient } from '../api';
import { getInstallationAccessToken } from '../auth';

function formatLocationText(finding: VulnerablePackage<Finding>) {
  if (finding.locations.length === 0) {
    return 'Unknown';
  }

  return `${finding.locations.length} location${finding.locations.length > 1 ? 's' : ''}`;
}

function generatePullRequestCommentFromReport(projectId: string, scan: InsertedScan) {
  const messageParts = [
    process.env.NODE_ENV === 'production' ? null : 'LUNATRACE IN DEV MODE',
    '## Build Snapshot Complete',
    '',
    `\n[View Full Report](https://lunatrace.lunasec.io/project/${projectId}/build/${scan.build_id})`,
  ];

  const unignoredFindings = filterFindingsByIgnored(scan.findings);

  if (!unignoredFindings) {
    return messageParts.join('\n');
  }

  const groupedFindings = groupByPackage(projectId, unignoredFindings);
  const filteredFindings = Object.values(groupedFindings).filter(
    // TODO: Make the severity filter configurable.
    (finding) => finding.severity !== 'Unknown' && finding.severity === 'Critical'
  );

  const tableData: string[][] = filteredFindings.map((finding): string[] => {
    return [
      finding.package_name,
      finding.version || 'Unknown Version',
      finding.severity,
      formatLocationText(finding),
      `[Dismiss](https://lunatrace.lunasec.io/project/${projectId}/build/${scan.build_id})`,
    ] as string[];
  });

  // Only show the table if there were any results to display.
  if (tableData.length > 0) {
    messageParts.push('### Security Scan Findings');
    messageParts.push(`Showing ${tableData.length} results.\n`);
    messageParts.push(markdownTable([['Package Name', 'Versions', 'Severity', 'Locations', ''], ...tableData]));
  }

  return messageParts.join('\n');
}

export async function commentOnPrIfExists(buildId: string, scanReport: InsertedScan) {
  const buildLookup = await hasura.GetBuild({
    build_id: buildId,
  });

  if (
    !buildLookup.builds_by_pk ||
    !buildLookup.builds_by_pk.project ||
    !buildLookup.builds_by_pk.project.organization
  ) {
    log.error(`unable to get required scan notify information for buildId: ${buildId}`);
    return;
  }

  const projectId = buildLookup.builds_by_pk.project.id;
  const installationId = buildLookup.builds_by_pk.project.organization.installation_id;
  const pullRequestId = buildLookup.builds_by_pk.pull_request_id;

  if (!installationId) {
    log.error(
      `github installation id is not defined for the organization linked to build: ${buildId}, skipping github PR comment`
    );
    return;
  }

  if (!pullRequestId) {
    log.error(
      `pull request id is not defined for buildId: ${buildId}, skipping comment because this build did not come from a PR`
    );
    return;
  }

  const installationToken = await getInstallationAccessToken(installationId);

  if (installationToken.error) {
    log.error('unable to get installation token', {
      error: installationToken.msg
    });
    return;
  }

  const github = generateGithubGraphqlClient(installationToken.res);

  const body = generatePullRequestCommentFromReport(projectId, scanReport);

  if (body === null) {
    log.error(`generated scan report is null`, {
      projectId,
      installationId,
      pullRequestId,
    });
    return;
  }

  // Check if a previous build already commented on the PR. Could probably query github for this but its hard and rate limits exist so we just check our own db
  const previousReviewId = await findPreviousReviewId(pullRequestId);

  log.info('Starting PR Comment Submission flow')
  log.info('found previous review id of ', previousReviewId)
  // This is the first build on this pr so make a new comment
  if (!previousReviewId) {
    const githubReviewResponse = await github.AddPrReview({
      pull_request_id: pullRequestId.toString(),
      body,
    });
    const existing_github_review_id = githubReviewResponse.addPullRequestReview?.pullRequestReview?.id;
    if (!existing_github_review_id) {
      return log.error('Failed to generate a review on pr, github responded ', githubReviewResponse);
    }
    log.info('review created')
    // const submitResponse = await github.SubmitPrReview({ pull_request_id: pullRequestId.toString() })
    // logger.log('successfully reviewed the PR',submitResponse)

    await hasura.UpdateBuildExistingReviewId({ id: buildId, existing_github_review_id });
    return;
  }

  // Otherwise just update the existing review on the PR.  Very similar to above but we update instead
  const githubReviewResponse = await github.UpdatePrReview({
    pull_request_review_id: previousReviewId,
    body,
  });
  const existing_github_review_id = githubReviewResponse.updatePullRequestReview?.pullRequestReview?.id;
  if (!existing_github_review_id) {
    return log.error('Failed to generate a review on pr, github responded ', githubReviewResponse);
  }
  log.info('successfully updated the PR review')
  // Put the ID onto the latest build also, in case we want to make sure later that it submitted successfully.
  await hasura.UpdateBuildExistingReviewId({ id: buildId, existing_github_review_id });
  return;
}

async function findPreviousReviewId(pullRequestId: string): Promise<string | null> {
  const previousBuildRes = await hasura.GetPreviousBuildForPr({ pull_request_id: pullRequestId });
  if (!previousBuildRes.builds || !previousBuildRes.builds[0]) {
    return null;
  }
  return previousBuildRes.builds[0].existing_github_review_id || null;
}
