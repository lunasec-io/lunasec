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
import { filterFindingsNotIgnored, Finding, groupByPackage, VulnerablePackage } from '@lunatrace/lunatrace-common';
import markdownTable from 'markdown-table';
import { Octokit } from 'octokit';

import { hasura } from '../../hasura-api';
import { GetBuildQuery } from '../../hasura-api/generated';
import { InsertedScan } from '../../models/scan';
import { newError } from '../../utils/errors';
import { log } from '../../utils/log';
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

  const unignoredFindings = filterFindingsNotIgnored(scan.findings);

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

async function executePRComment(
  buildLookup: GetBuildQuery,
  scanReport: InsertedScan,
  buildId: string,
  projectId: any,
  body: string,
  installationId: number,
  pullRequestId: string,
  previousReviewId: string | null
) {
  const githubClient = await generateGithubGraphqlClient(installationId);
  if (githubClient.error) {
    log.error(`unable to create github client`, {
      projectId,
      installationId,
      pullRequestId,
    });
    return;
  }
  const github = githubClient.res;

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

    log.info('review created');

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
  log.info('successfully updated the PR review');
  // Put the ID onto the latest build also, in case we want to make sure later that it submitted successfully.
  await hasura.UpdateBuildExistingReviewId({ id: buildId, existing_github_review_id });
  return;
}

async function executePRCheck(
  buildLookup: GetBuildQuery,
  scanReport: InsertedScan,
  buildId: string,
  projectId: any,
  body: string,
  installationId: number,
  pullRequestId: string,
  previousReviewId: string | null
) {
  log.info('starting check flow');
  const authToken = await getInstallationAccessToken(installationId);

  if (authToken.error) {
    const msg = 'unable to get installation token';
    log.error(msg, {
      error: authToken.msg,
    });
    return newError(msg);
  }

  const octokit = new Octokit({ auth: authToken.res });

  if (!buildLookup.builds_by_pk?.git_hash) {
    log.error("can't comment because git hash is missing");
  }

  const checkData = {
    name: 'LunaTrace',
    head_sha: buildLookup.builds_by_pk?.git_hash,
    external_id: buildId,
    details_url: `https://lunatrace.lunasec.io/project/${projectId}/build/${buildId}`,
    output: {
      title: 'LunaTrace',
      summary: scanReport.findings.length
        ? `${scanReport.findings.length} vulnerabilities detected`
        : 'No vulnerabilities detected',
      text: body,
    },
  };

  let inserted_check_id;
  // This is the first build on this pr so make a new comment
  if (!previousReviewId) {
    const githubReviewResponse = await octokit.rest.checks.create({
      owner: buildLookup.builds_by_pk?.project?.organization?.name || '',
      repo: buildLookup.builds_by_pk?.project?.name || '',
      status: 'in_progress',
      ...checkData,
    });

    inserted_check_id = githubReviewResponse.data.id;
    log.info('check created');
  }

  // Otherwise just update the existing review on the PR.  Very similar to above but we update instead
  const githubReviewResponse = await octokit.rest.checks.update({
    owner: buildLookup.builds_by_pk?.project?.organization?.name || '',
    repo: buildLookup.builds_by_pk?.project?.name || '',
    check_run_id: inserted_check_id || buildLookup.builds_by_pk?.existing_github_check_id,
    conclusion: scanReport.findings.length ? 'neutral' : 'success',
    completed_at: new Date().toISOString(),
    ...checkData,
  });

  const existing_github_check_id = githubReviewResponse.data.id;

  if (!existing_github_check_id) {
    return log.error('Failed to generate a check, github responded ', githubReviewResponse);
  }
  log.info('successfully updated the check');
  // Put the ID onto the latest build also, in case we want to make sure later that it submitted successfully.
  await hasura.UpdateBuildExistingCheckId({ id: buildId, existing_github_check_id });
  return;
}

export async function interactWithPR(buildId: string, scanReport: InsertedScan) {
  const buildLookup = await hasura.GetBuild({
    build_id: buildId,
  });

  if (
    !buildLookup.builds_by_pk ||
    !buildLookup.builds_by_pk.project ||
    !buildLookup.builds_by_pk.project.organization ||
    !buildLookup.builds_by_pk.project.settings
  ) {
    log.error(`unable to get required scan notify information for buildId: ${buildId}`);
    return;
  }

  const pullRequestId = buildLookup.builds_by_pk.pull_request_id;

  if (!pullRequestId) {
    log.info(`pull request id is not defined, skipping comment because this build did not come from a PR`, {
      buildId,
    });
    return;
  }

  const installationId = buildLookup.builds_by_pk?.project?.organization?.installation_id;
  if (!installationId) {
    log.error(
      `github installation id is not defined for the organization linked to build: ${buildId}, skipping github PR comment`
    );
    return;
  }

  const projectId = buildLookup.builds_by_pk.project.id;

  const body = generatePullRequestCommentFromReport(projectId, scanReport);

  if (body === null) {
    log.error(`generated scan report is null`, {
      projectId,
      pullRequestId,
    });
    return;
  }
  // Check if a previous build already commented on the PR. Could probably query github for this but its hard and rate limits exist so we just check our own db
  const previousReviewId = await findPreviousReviewId(pullRequestId);

  log.info('Starting PR Comment Submission flow');
  log.info('found previous review id of ', previousReviewId);

  if (!buildLookup.builds_by_pk.project.settings.pr_feedback_disabled) {
    await executePRCheck(
      buildLookup,
      scanReport,
      buildId,
      projectId,
      body,
      installationId,
      pullRequestId,
      previousReviewId
    );
  }
  if (buildLookup.builds_by_pk.project.settings.pr_check_enabled) {
    await executePRComment(
      buildLookup,
      scanReport,
      buildId,
      projectId,
      body,
      installationId,
      pullRequestId,
      previousReviewId
    );
  }

  return;
}

async function findPreviousReviewId(pullRequestId: string): Promise<string | null> {
  const previousBuildRes = await hasura.GetPreviousBuildForPr({ pull_request_id: pullRequestId });
  if (!previousBuildRes.builds || !previousBuildRes.builds[0]) {
    return null;
  }
  return previousBuildRes.builds[0].existing_github_review_id || null;
}
