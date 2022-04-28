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

// eslint-disable-next-line import/no-unresolved
import { components } from '@octokit/openapi-types';

export type RepositoriesForInstallationResponse = components['schemas']['repository'][];

export interface GithubRepositoryInfo {
  orgName: string;
  orgId: number;
  orgNodeId: string;
  repoName: string;
  repoId: number;
  repoNodeId: string;
  gitUrl: string;
  ownerType: string;
}

export interface GithubPullRequest {
  installationId: number;
  pullRequestId: string;
  cloneUrl: string;
  gitUrl: string;
  gitBranch: string;
}
