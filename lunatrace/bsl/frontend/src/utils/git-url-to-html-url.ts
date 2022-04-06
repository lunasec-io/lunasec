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
export const gitUrlToHtmlUrl = (gitUrl: string | null | undefined): string | false => {
  // Attempt to build the "html url" for the build using the git_url. Only works with github and even then might be fragile, will need testing
  if (!gitUrl || !new RegExp('(^https:\\/\\/github.com|^git@github.com)').test(gitUrl)) {
    return false;
  }
  const protocolsRegex = new RegExp('(^https:\\/\\/|^git@|\\.git$)', 'gm');

  const withoutProtocols = gitUrl.replace(protocolsRegex, '');
  const colonToSlash = withoutProtocols.replace(':', '/');
  return 'https://www.'.concat(colonToSlash);
};
