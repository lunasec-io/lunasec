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
import { getGithubOrganizationMembers } from '../../github/actions/fetch-org-members-from-github';
import { GitHubUserData, WebHookOrgData } from '../../types/github';
import { log } from '../../utils/log';
import {
  Organization_User_Arr_Rel_Insert_Input,
  Organization_User_Constraint,
  Organization_User_Insert_Input,
  Users_Constraint,
  Users_Obj_Rel_Insert_Input,
  Users_Update_Column,
} from '../generated';

function newUser(githubUserData: GitHubUserData): Users_Obj_Rel_Insert_Input {
  return {
    data: {
      github_node_id: githubUserData.nodeId,
      github_id: githubUserData.githubUserId.toString(),
    },
    on_conflict: {
      constraint: Users_Constraint.UsersGithubIdKey,
      update_columns: [Users_Update_Column.GithubId, Users_Update_Column.GithubNodeId],
    },
  };
}

// we insert a new user as a child of the organization user
function newOrganizationUser(githubUserData: GitHubUserData): Organization_User_Insert_Input {
  return {
    user: newUser(githubUserData),
  };
}

function generateOrganizationUsersInsertQuery(
  githubUsersData: GitHubUserData[]
): Organization_User_Arr_Rel_Insert_Input {
  return {
    data: githubUsersData.map((user) => newOrganizationUser(user)),
    on_conflict: {
      constraint: Organization_User_Constraint.OrganizationUserUserIdOrganizationIdKey,
      update_columns: [],
    },
  };
}

// This function takes an org that came from a webhook and builds user data for that org in hasura format.
// If necessary, it queries github, however in the case that the org IS a user's personal org, it simply returns it directly.
export async function getOrgMembersInHasuraFormat(
  installationId: number,
  authToken: string,
  org: WebHookOrgData
): Promise<Organization_User_Arr_Rel_Insert_Input> {
  const ownerType = org.account.type;

  if (ownerType === 'User') {
    const githubUserNodeId = org.account.node_id;
    const githubUserPrimaryKey = org.account.id;

    const query = generateOrganizationUsersInsertQuery([
      {
        nodeId: githubUserNodeId,
        githubUserId: githubUserPrimaryKey,
      },
    ]);
    return query;
  }

  // It wasnt a user org, its a real org, so continue with fetching

  const orgName = org.account.login;

  if (!orgName) {
    throw new Error('No org name');
  }

  const githubOrgMembers = await getGithubOrganizationMembers(authToken, orgName);

  if (githubOrgMembers === null || !githubOrgMembers.organization) {
    log.error('organization members are null.', {
      installationId,
    });
    throw new Error('getting organization members failed, orgMembers is not defined');
  }

  const members = githubOrgMembers.organization.membersWithRole.nodes;
  const teams = githubOrgMembers.organization.teams.nodes;

  const userData: GitHubUserData[] = [];

  if (members) {
    members.forEach((member) => {
      if (member && member.databaseId) {
        userData.push({ nodeId: member.id, githubUserId: member.databaseId });
      }
    });
  }

  if (teams) {
    teams.forEach((team) => {
      if (team && team.members && team.members.nodes) {
        team.members.nodes.forEach((teamMember) => {
          if (teamMember && teamMember.databaseId) {
            userData.push({ nodeId: teamMember.id, githubUserId: teamMember.databaseId });
          }
        });
      }
    });
  }

  log.info('collected organization member ids', { orgMemberIds: userData });

  // const orgUsers = userData.map((githubMemberId) => newOrganizationUser(githubMemberId));

  return generateOrganizationUsersInsertQuery(userData);
}
