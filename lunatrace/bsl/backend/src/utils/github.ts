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
import { tryGithubIdBase64Decode } from './parse';

export function normalizeGithubId(githubNodeId: string) {
  /*
    When we query organization members we get ids like this MDQ6VXNlcjU1MzU5Nw==
    which is base64 for 04:User553597 and on github login the id that we are given is 553597.
   */
  const githubId = tryGithubIdBase64Decode(githubNodeId);

  // BUT new github user ids are not base65 encoded, they look like: U_553597.
  if (githubId.startsWith('U_')) {
    return githubId.replace('U_', '');
  }

  if (!githubId.match(/:/)) {
    return githubId;
  }

  // 04:User553597 -> 553597
  const parts = githubId.split(':');
  if (parts.length !== 2) {
    throw new Error(`invalid github id: ${githubNodeId}`);
  }
  return parts[1].replace('User', '');
}
