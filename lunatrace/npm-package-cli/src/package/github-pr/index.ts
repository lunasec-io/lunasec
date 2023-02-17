/*
 * Copyright 2023 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import fs from 'fs';

import type { PaginateInterface } from '@octokit/plugin-paginate-rest';
import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import type { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types';
import { Octokit } from '@octokit/rest';
import { createPullRequest } from 'octokit-plugin-create-pull-request';
import type { Options } from 'octokit-plugin-create-pull-request/dist-types/types';

import { replacePackagesForNode } from '../replace-package';
import { setupPackageTree } from '../replace-package/package-tree';
import { PackageManagerType } from '../types';

export type ManifestFileData = {
  manifest: { contents: string; path: string };
  lockfile: { contents: string; path: string };
  packageManagerType: PackageManagerType;
};

export const PullRequestOctokit = Octokit.plugin(createPullRequest);

// This type is annoying but without it, we don't seem to get proper type checking for the PR plugin call.
export type PullRequestOctokitType = Octokit & { paginate: PaginateInterface } & RestEndpointMethods &
  Api &
  ReturnType<typeof createPullRequest>;

function getManifestLockFilename(packageManager: PackageManagerType): string {
  if (packageManager === 'yarn') {
    return 'yarn.lock';
  }
  return 'package-lock.json';
}

/**
 * Makes a request to GitHub to download a file from a repo with the specific ref (commit hash).
 * The path is merged with the filename to create the absolute path to the file.
 */
async function downloadFileFromGitHub(
  octokit: PullRequestOctokitType,
  owner: string,
  repo: string,
  ref: string,
  path: string,
  filename: string
) {
  const normalizedPath = path.replace(/\/$/, '');

  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    ref,
    path: `${normalizedPath}/${filename}`,
  });

  if (response.status !== 200) {
    throw new Error(`GitHub Error: Unable to download ${filename} from ${owner}/${repo}/${ref}/${path}`);
  }

  if (Array.isArray(response.data)) {
    throw new Error(`GitHub Error: ${owner}/${repo}/${ref}/${path}/package.json is a directory.`);
  }

  if (response.data.type !== 'file') {
    throw new Error(`GitHub Error: ${owner}/${repo}/${ref}/${path}/package.json is not a file.`);
  }

  return {
    contents: response.data.content,
    path: response.data.path,
  };
}

export async function downloadManifestFromGithub(
  octokit: PullRequestOctokitType,
  owner: string,
  repo: string,
  ref: string,
  path: string,
  packageManager: PackageManagerType
): Promise<ManifestFileData> {
  const packageJson = await downloadFileFromGitHub(octokit, owner, repo, ref, path, 'package.json');

  const lockfile = await downloadFileFromGitHub(
    octokit,
    owner,
    repo,
    ref,
    path,
    getManifestLockFilename(packageManager)
  );

  return {
    manifest: packageJson,
    lockfile: lockfile,
    packageManagerType: packageManager,
  };
}

export async function writeManifestToFolder(manifestFileData: ManifestFileData, directory: string): Promise<void> {
  const packageJsonPath = `${directory}/package.json`;
  const packageLockPath = `${directory}/${getManifestLockFilename(manifestFileData.packageManagerType)}`;

  await fs.promises.mkdir(directory, { recursive: true });
  await fs.promises.writeFile(packageJsonPath, manifestFileData.manifest.contents, 'base64');
  await fs.promises.writeFile(packageLockPath, manifestFileData.lockfile.contents, 'base64');
}

export async function getRepoAuthState(
  octokit: PullRequestOctokitType,
  owner: string,
  repo: string
): Promise<{
  isUser: boolean;
  baseBranch: string;
  // TODO: Make this actually have a real type.
  repository: any;
}> {
  const response = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });

  if (response.status !== 200) {
    throw new Error(`GitHub Error: Unable to get repo ${owner}/${repo} (Status: ${response.status})`);
  }

  const { data: repository, headers } = response;

  const isUser = !!headers['x-oauth-scopes'];

  if (!repository.permissions) {
    throw new Error(`GitHub Error: Missing auth for repo ${owner}/${repo}`);
  }

  return { isUser, baseBranch: repository.default_branch, repository };
}

export async function replacePackageAndFileGitHubPullRequest(
  octokit: PullRequestOctokitType,
  owner: string,
  repo: string,
  path: string,
  packageManager: PackageManagerType,
  oldPackage: string,
  newPackage: string,
  ref?: string
): Promise<{ pullRequestUrl: string; pullRequestTitle: string }> {
  const repoAuthState = await getRepoAuthState(octokit, owner, repo);

  const checkoutRef = ref || repoAuthState.baseBranch;

  const manifestFileData = await downloadManifestFromGithub(octokit, owner, repo, checkoutRef, path, packageManager);

  const tmpDirPath = '/tmp/manifest' + Math.round(Math.random() * 1000000).toString(10);

  await writeManifestToFolder(manifestFileData, tmpDirPath);

  const tree = setupPackageTree({
    root: tmpDirPath,
    packageManager: packageManager,
  });

  // TODO: Figure out why Arborist marks everything as "extraneous" in the generated lockfile.
  const node = await tree.arborist.loadVirtual();

  const { updatedNodes } = await replacePackagesForNode(node, oldPackage, newPackage);

  // TODO: Replace this with a logger.
  console.log(`Updated ${updatedNodes.length} packages`);

  // This updates the package-lock.json file on disk.
  // Note: We may actually need to call `tree.reify()` in order to get the transitive dependencies to update.
  // It's unclear and untested currently.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await node.meta.save();

  // Read new manifest and lockfile contents
  const newManifestData = await fs.promises.readFile(`${tmpDirPath}/package.json`, 'utf8');
  const newLockfileData = await fs.promises.readFile(
    `${tmpDirPath}/${getManifestLockFilename(packageManager)}`,
    'utf8'
  );

  const normalizedOldPackageName = oldPackage.replace(/[\W]+/g, '');
  const normalizedNewPackageName = newPackage.replace(/[\W]+/g, '');

  const branchName = `replace-${normalizedOldPackageName}-with-${normalizedNewPackageName}`;
  const message = `This pull request replaces \`${oldPackage}\` with \`${newPackage}\` in \`${owner}/${repo}@${checkoutRef}\` in path: \`${path}\``;

  const pullRequest = await octokit.createPullRequest({
    owner,
    repo,
    title: `[Security][LunaTrace] Replace ${oldPackage} with ${newPackage}`,
    head: branchName,
    base: ref,
    createWhenEmpty: false,
    body: message,
    update: true,
    changes: {
      files: {
        [manifestFileData.manifest.path]: newManifestData,
        [manifestFileData.lockfile.path]: newLockfileData,
      },
      commit: message,
      author: {
        name: 'LunaTrace',
        email: 'github-bot@lunasec.io',
        date: new Date().toISOString(),
      },
      // TODO: Figure out if we want to allow for a custom committer.
      // TODO: Figure out signed commits.
    },
  });

  if (!pullRequest) {
    throw new Error(`GitHub Error: Unable to create pull request for ${owner}/${repo}@${checkoutRef} in path: ${path}`);
  }

  if (pullRequest.status !== 200) {
    throw new Error(
      `GitHub Error: Unable to create pull request for ${owner}/${repo}@${checkoutRef} in path: ${path} (Status: ${pullRequest.status})`
    );
  }

  console.log('PR Created:', pullRequest.data.html_url);
  console.log('PR Title:', pullRequest.data.title);

  // Delete temporary directory
  await fs.promises.rm(tmpDirPath, { recursive: true, force: true });

  return {
    pullRequestUrl: pullRequest.data.html_url,
    pullRequestTitle: pullRequest.data.title,
  };
}
