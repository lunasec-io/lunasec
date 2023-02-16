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
import { Args, Command, Flags } from '@oclif/core';

import {
  PullRequestOctokit,
  PullRequestOctokitType,
  replacePackageAndFileGitHubPullRequest,
} from '../../package/github-pr';
import { PackageManagerType } from '../../package/types';
import { ReplacePackageFlags } from '../replace-package';

export default class GitHubReplacePackage extends Command {
  static description = 'Replaces a package in an NPM project on GitHub and then files a Pull Request';

  static examples = [
    `$ lunatrace-npm-cli github-pr replace-package owner/repo --githubToken <SECRET> --old js-yaml@^3.13.1 --new js-yaml@^3.14.0`,
  ];

  static flags = {
    ...ReplacePackageFlags,
    githubToken: Flags.string({
      aliases: ['github-token'],
      env: 'GITHUB_TOKEN',
      required: true,
      summary: 'GitHub Token to authenticate against the API with.',
    }),
    gitRef: Flags.string({
      aliases: ['ref'],
      required: false,
      summary: 'Optional git ref to use for the pull request',
    }),
    manifestPath: Flags.string({
      aliases: ['manifest-path'],
      default: '/',
      required: false,
      summary: 'Path in the repo to the folder containing manifest files.',
    }),
    packageManager: Flags.string({
      aliases: ['package-manager'],
      default: 'npm',
      options: ['npm', 'yarn'],
      required: false,
      summary: `Package manager to read files from the repo and modify.
  If this is npm, it will read 'package-lock.json' and for Yarn 'yarn.lock'.`,
    }),
    tempWritePath: Flags.string({
      aliases: ['temp-write-path'],
      required: false,
      summary: 'The folder where the temporary files will be downloaded to and written.',
    }),
  };

  static args = {
    repo: Args.string({
      description: 'Repo to read package data from. Specified as <:user>/<:repo> (like lunasec-io/lunasec).',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(GitHubReplacePackage);

    const splitRepo = args.repo.split('/');

    if (splitRepo.length !== 2) {
      throw new Error(`Invalid repo passed. Must be <:user>/<:repo> (like lunasec-io/lunasec)`);
    }

    const userOrOrg = splitRepo[0];
    const repo = splitRepo[1];

    if (!userOrOrg) {
      throw new Error('Missing user or org for command');
    }

    if (!repo) {
      throw new Error('Missing repo for command');
    }

    const octokit = new PullRequestOctokit({
      auth: flags.githubToken,
    });

    await replacePackageAndFileGitHubPullRequest(
      octokit,
      userOrOrg,
      repo,
      flags.manifestPath,
      flags.packageManager as PackageManagerType,
      flags.old,
      flags.new,
      flags.gitRef
    );
  }
}
