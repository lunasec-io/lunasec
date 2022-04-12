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
import {log} from "../../utils/log";
import {getGithubGraphqlClient, getInstallationAccessToken} from "../auth";

export async function commentOnPullRequest(installationId: number, pullRequestId: string, body: string): Promise<void> {
  const installationToken = await getInstallationAccessToken(installationId);

  const github = getGithubGraphqlClient(installationToken);

  if (body === null) {
    log.error(`generated scan report is null`, {
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
