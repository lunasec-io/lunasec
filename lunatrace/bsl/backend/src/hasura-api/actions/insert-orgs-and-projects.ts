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
import { GithubRepositoryInfo } from '../../types/github';
import { OrganizationInputLookup, UpsertOrganizationResponse } from '../../types/hasura';
import { MaybeError } from '../../types/util';
import { logError } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError, Try } from '../../utils/try';
import {
  Github_Repositories_Constraint,
  Github_Repositories_On_Conflict,
  Github_Repositories_Update_Column,
  Organizations_Constraint,
  Organizations_Insert_Input,
  Organizations_On_Conflict,
  Organizations_Update_Column,
  Projects_Constraint,
  Projects_Insert_Input,
  Projects_On_Conflict,
  Projects_Update_Column,
  UpsertOrganizationsMutation,
} from '../generated';
import { hasura } from '../index';

function getExistingProjectsInOrg(orgLookup: OrganizationInputLookup, orgName: string) {
  const existingOrg = orgLookup[orgName];
  if (!existingOrg || !existingOrg.projects) {
    return [];
  }
  return existingOrg.projects.data;
}

export function generateOrgsAndProjectsMutation(
  installationId: number,
  repositories: GithubRepositoryInfo[]
): OrganizationInputLookup {
  return repositories.reduce((orgLookup, repo) => {
    const repoOnConflict: Github_Repositories_On_Conflict = {
      constraint: Github_Repositories_Constraint.GithubRepositoriesGithubIdKey,
      update_columns: [
        Github_Repositories_Update_Column.GitUrl,
        Github_Repositories_Update_Column.Traits,
        Github_Repositories_Update_Column.GithubId,
        Github_Repositories_Update_Column.GithubNodeId,
        Github_Repositories_Update_Column.DefaultBranch,
      ],
    };

    const project: Projects_Insert_Input = {
      name: repo.repoName,
      github_repositories: {
        data: [
          {
            github_id: repo.repoId,
            github_node_id: repo.repoNodeId,
            default_branch: repo.defaultBranch,
            git_url: repo.gitUrl,
            traits: repo,
          },
        ],
        on_conflict: repoOnConflict,
      },
    };

    const projectOnConflict: Projects_On_Conflict = {
      constraint: Projects_Constraint.ProjectsNameOrganizationIdKey,
      update_columns: [Projects_Update_Column.Repo],
    };

    const orgData: Organizations_Insert_Input = {
      name: repo.orgName,
      installation_id: installationId,
      github_id: repo.orgId,
      github_node_id: repo.orgNodeId,
      github_owner_type: repo.ownerType,
      projects: {
        data: [...getExistingProjectsInOrg(orgLookup, repo.orgName), project],
        on_conflict: projectOnConflict,
      },
    };
    return {
      ...orgLookup,
      [repo.orgName]: orgData,
    };
  }, {} as OrganizationInputLookup);
}

// This is DEPRECATED now that we do not insert orgs manually, and instead insert them from webhook. We can bring this back if we ever fix our oauth
export async function insertOrgsAndProjects(
  installationId: number,
  orgObjectList: Organizations_Insert_Input[]
): Promise<MaybeError<UpsertOrganizationResponse[]>> {
  log.info(
    `[installId: ${installationId}] Creating LunaTrace projects and orgs. Orgs are: ${orgObjectList.map(
      (org) => org.name
    )}`
  );

  const onOrgConflict: Organizations_On_Conflict = {
    constraint: Organizations_Constraint.OrganizationsGithubIdKey,
    update_columns: [
      Organizations_Update_Column.GithubOwnerType,
      Organizations_Update_Column.GithubId,
      Organizations_Update_Column.GithubNodeId,
      Organizations_Update_Column.InstallationId,
      Organizations_Update_Column.CreatorId,
      Organizations_Update_Column.Name,
    ],
  };

  const createOrgsRes: Try<UpsertOrganizationsMutation> = await catchError(
    async () =>
      await hasura.UpsertOrganizations({
        object: orgObjectList,
        on_conflict: onOrgConflict,
      })
  );

  if (threwError(createOrgsRes)) {
    logError(createOrgsRes);
    return {
      error: true,
      msg: 'unable to create LunaTrace organizations from collected Github Organizations.',
    };
  }

  const orgIds: UpsertOrganizationResponse[] = createOrgsRes.insert_organizations
    ? createOrgsRes.insert_organizations.returning.map((o) => {
        return {
          id: o.id as string,
          github_node_id: o.github_node_id || null,
          name: o.name,
        };
      })
    : [];

  return {
    error: false,
    res: orgIds,
  };
}
