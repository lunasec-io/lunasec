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
import { EmitterWebhookEvent } from '@octokit/webhooks';

export type RawRepository = components['schemas']['repository'];
export type RawRepositories = RawRepository[];

// repository typing for update events seems slightly different so we just pull it out of the event itself
type UpdateEvent = EmitterWebhookEvent<
  'repository.edited' | 'repository.privatized' | 'repository.publicized' | 'repository.renamed'
>;
export type UpdatedRawRepository = UpdateEvent['payload']['repository'];

export type RawInstallation = components['schemas']['installation'];

export interface GithubRepositoryInfo {
  orgName: string;
  orgId: number;
  orgNodeId: string;
  repoName: string;
  repoId: number;
  repoNodeId: string;
  gitUrl: string;
  ownerType: string;
  cloneUrl: string;
  defaultBranch: string;
  fullTraits: RawRepository;
}

export interface GithubPullRequest {
  installationId: number;
  pullRequestId: string;
  cloneUrl: string;
  gitUrl: string;
  gitBranch: string;
}

export interface GitHubUserData {
  // Can be either a base64 encoded value or a value like `U_adsjf1324512`
  nodeId: string;
  // This is a numerical value, ie 123456
  githubUserId: number;
}
