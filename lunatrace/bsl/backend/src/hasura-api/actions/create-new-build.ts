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
import { SnapshotBuildInfo } from '../../types/sqs';
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { removeAuthFromGitUrl } from '../../utils/git';
import { log } from '../../utils/log';
import { catchError, ErrorOrResult, threwError } from '../../utils/try';
import { InsertBuildMutation } from '../generated';
import { hasura } from '../index';

async function getProjectId(repoId: number, projectId: string | undefined): Promise<MaybeError<string>> {
  if (projectId) {
    return newResult(projectId);
  }

  const projectResult = await catchError(
    hasura.GetProjectFromRepoId({
      repo_github_id: repoId,
    })
  );
  if (threwError(projectResult)) {
    return newError('Failed to lookup project when using repository id');
  }
  if (projectResult.github_repositories.length !== 1) {
    return newError(
      `Did not get exactly one github repository when lookup up repository id: ${projectResult.github_repositories}`
    );
  }
  return newResult(projectResult.github_repositories[0].project.id);
}

export async function createNewBuild(repoGithubId: number, buildInfo: SnapshotBuildInfo): Promise<MaybeError<string>> {
  log.info('Creating a new build for repository', {
    buildInfo,
  });

  const projectIdResult = await getProjectId(repoGithubId, buildInfo.projectId);
  if (projectIdResult.error) {
    return projectIdResult;
  }

  const insertBuildResponse: ErrorOrResult<InsertBuildMutation> = await catchError(
    async () =>
      await hasura.InsertBuild({
        build: {
          project_id: projectIdResult.res,
          pull_request_id: buildInfo.pullRequestId,
          source_type: buildInfo.sourceType,
          git_hash: buildInfo.gitCommit,
          git_branch: buildInfo.gitBranch,
          git_remote: removeAuthFromGitUrl(buildInfo.cloneUrl),
        },
      })
  );

  if (threwError(insertBuildResponse)) {
    const msg = 'failed to insert a new build';
    log.error(msg, {
      error: insertBuildResponse,
    });

    return {
      error: true,
      msg: msg,
      rawError: insertBuildResponse,
    };
  }

  const { insert_builds_one } = insertBuildResponse;

  log.info('inserted new build', {
    insert_builds_one,
  });

  if (!insert_builds_one || insert_builds_one.id === undefined) {
    const msg = 'missing idd in insert build response';
    log.error(msg, {
      insert_builds_one,
    });
    return {
      error: true,
      msg: msg,
      rawError: new Error(msg),
    };
  }

  return newResult(insert_builds_one.id as string);
}
