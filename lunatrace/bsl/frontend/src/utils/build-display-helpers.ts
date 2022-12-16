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

import { BuildDetailInfo } from '../pages/project/builds/types';

type BuildInfoSubset = Pick<BuildDetailInfo, 'git_branch' | 'git_remote' | 'git_hash'>;

export const gitUrlToLink = (build: BuildInfoSubset): string | false => {
  const gitUrl = build.git_remote;
  // Attempt to build the "html url" for the build using the git_url. Only works with github and even then might be fragile, will need testing
  if (!gitUrl || !new RegExp('(^https:\\/\\/github.com|^git@github.com)').test(gitUrl)) {
    return false;
  }
  const protocolsRegex = new RegExp('(^https:\\/\\/|^git@|\\.git$)', 'gm');

  const withoutProtocols = gitUrl.replace(protocolsRegex, '');
  const colonToSlash = withoutProtocols.replace(':', '/');
  return 'https://www.'.concat(colonToSlash);
};

export function branchName(build: BuildInfoSubset): string | false {
  const fullBranch = build.git_branch;
  if (!fullBranch) {
    return false;
  }
  return fullBranch.split('/').pop() || false;
}

export function branchLink(build: BuildInfoSubset): string | false {
  const gitUrl = gitUrlToLink(build);
  const branch = branchName(build);
  if (!gitUrl || !branch) {
    return false;
  }
  return `${gitUrl}/tree/${branch}`;
}

// Todo: this might make broken links, double check
export function commitLink(build: BuildInfoSubset): string | false {
  const gitUrl = gitUrlToLink(build);
  if (!gitUrl || !build.git_hash) {
    return false;
  }
  return `${gitUrl}/commit/${build.git_hash}`;
}

export function linkToPathAtCommit(build: BuildInfoSubset, path: string, line?: number): string | false {
  const gitUrl = gitUrlToLink(build);
  if (!gitUrl || !build.git_hash) {
    return false;
  }
  const lineLink = line ? `#L${line}` : '';
  return `${gitUrl}/blob/${build.git_hash}${path}${lineLink}`;
}
