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
import { RepositoriesForInstallationResponse } from '../../types/github';
import {OrganizationInputLookup, UpsertOrganizationResponse} from '../../types/hasura';
import { MaybeError } from '../../types/util';
import { errorResponse, logError } from '../../utils/errors';
import {log} from "../../utils/log";
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

function getExistingProjects(orgLookup: OrganizationInputLookup, orgName: string) {
  const existingOrg = orgLookup[orgName];
  if (!existingOrg || !existingOrg.projects) {
    return [];
  }
  return existingOrg.projects.data;
}

export function hasuraOrgsFromGithubRepositories(
  installationId: number,
  repositories: RepositoriesForInstallationResponse
): OrganizationInputLookup {
  return repositories.reduce((orgLookup, repo) => {
    const orgName = repo.owner.login;
    // Deprecated. Use Node ID
    const organizationId = repo.owner.id;
    const organizationNodeId = repo.owner.node_id;
    const repoName = repo.name;
    // Deprecated. Use Node ID
    const repoId = repo.id;
    const repoNodeId = repo.node_id;
    const gitUrl = repo.git_url;
    const gitOwnerType = repo.owner.type;

    const repoOnConflict: Github_Repositories_On_Conflict = {
      constraint: Github_Repositories_Constraint.GithubRepositoriesGithubIdKey,
      update_columns: [
        Github_Repositories_Update_Column.GitUrl,
        Github_Repositories_Update_Column.Traits,
        Github_Repositories_Update_Column.GithubId,
        Github_Repositories_Update_Column.GithubNodeId,
      ],
    };

    const project: Projects_Insert_Input = {
      name: repoName,
      github_repositories: {
        data: [
          {
            github_id: repoId,
            github_node_id: repoNodeId,
            git_url: gitUrl,
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
      name: orgName,
      installation_id: installationId,
      github_id: organizationId,
      github_node_id: organizationNodeId,
      github_owner_type: gitOwnerType,
      projects: {
        data: [...getExistingProjects(orgLookup, orgName), project],
        on_conflict: projectOnConflict,
      },
    };

    return {
      ...orgLookup,
      [orgName]: orgData,
    };
  }, {} as OrganizationInputLookup);
}

export async function createLunatraceOrgsFromGithubOrgs(
  installationId: number,
  orgObjectList: Organizations_Insert_Input[]
): Promise<MaybeError<UpsertOrganizationResponse[]>> {
  log.info(
    `[installId: ${installationId}] Creating LunaTrace organizations and projects: ${orgObjectList.map(
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
        objects: orgObjectList,
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
        name: o.name 
      }
    })
    : [];

  return {
    error: false,
    res: orgIds,
  };
}
