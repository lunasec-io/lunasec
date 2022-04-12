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
import {
  Organization_User_Insert_Input,
  Organizations_Insert_Input,
  Users_Constraint,
  Users_Update_Column
} from "../../hasura/generated";
import {MaybeError} from "../../types/util";
import {logError} from "../../utils/errors";
import { normalizeGithubId } from "../../utils/github";
import {log} from "../../utils/log";
import {notEmpty} from "../../utils/predicates";
import {catchError, threwError} from "../../utils/try";

import {getGithubOrganizationMembers} from "./get-members-for-organization";

function newOrganizationUser(hasuraOrgId: string, githubNodeId: string): Organization_User_Insert_Input {
  const githubId = normalizeGithubId(githubNodeId);
  return {
    organization_id: hasuraOrgId,
    user: {
      data: {
        github_node_id: githubNodeId,
        github_id: githubId,
      },
      on_conflict: {
        constraint: Users_Constraint.UsersGithubIdKey,
        update_columns: [Users_Update_Column.GithubNodeId]
      }
    }
  }
}

function validateOrgParameters(
  githubOrgToHasuraOrg: Record<string, string>,
  org: Organizations_Insert_Input
): MaybeError<{ orgName: string, hasuraOrgId: string}> {
  const githubOrgId = org.github_node_id;
  if (!githubOrgId) {
    return {
      error: true,
      msg: 'Organization github node id is not defined.'
    }
  }

  const orgName = org.name;
  if (!orgName) {
    return {
      error: true,
      msg: 'Organization name is not defined.'
    }
  }

  const hasuraOrgId = githubOrgToHasuraOrg[githubOrgId];
  if (!hasuraOrgId) {
    return {
      error: true,
      msg: `Unable to find github organization ${githubOrgId} in hasura org lookup: ${Object.keys(githubOrgToHasuraOrg)}`
    }
  }
  return {
    error: false,
    res: {
      orgName,
      hasuraOrgId
    }
  }
}

export async function getHasuraOrgMembers(
  installationId: number,
  authToken: string,
  org: Organizations_Insert_Input,
  githubOrgToHasuraOrg: Record<string, string>
): Promise<MaybeError<Organization_User_Insert_Input[]>> {
  const ownerType = org.github_owner_type;

  const validatedParams = validateOrgParameters(githubOrgToHasuraOrg, org);

  if (validatedParams.error) {
    return {
      error: true,
      msg: validatedParams.msg
    };
  }

  const { orgName, hasuraOrgId } = validatedParams.res;

  if (ownerType === 'User') {
    const githubUserId = org.github_node_id;

    if (!githubUserId) {
      return {
        error: true,
        msg: 'github node id is not set for user'
      }
    }

    const organizationUser = newOrganizationUser(hasuraOrgId, githubUserId);
    return {
      error: false,
      res: [organizationUser]
    };
  }

  const githubOrgMembers = await catchError(async () => await getGithubOrganizationMembers(authToken, orgName));

  if (threwError(githubOrgMembers)) {
    logError(githubOrgMembers);
    throw new Error('getting organization members for installation failed');
  }

  if (githubOrgMembers === null || !githubOrgMembers.organization) {
    log.error('organization members are null.', {
      installationId
    });
    return {
      error: true,
      msg: 'getting organization members failed, orgMembers is not defined'
    }
  }

  const members = githubOrgMembers.organization.membersWithRole.nodes;
  const teams = githubOrgMembers.organization.teams.nodes;

  const githubOrgMemberIds: string[] = [];

  if (members) {
    const memberIds = members.filter(notEmpty).map(m => m.id);
    githubOrgMemberIds.push(...memberIds);
  }

  if (teams) {
    const teamMemberIds = teams.filter(notEmpty).reduce((ids, team) => {
      const teamMembers = team.members.nodes;
      if (!teamMembers) {
        return ids;
      }

      const filteredMembers = teamMembers.filter(notEmpty);

      return [
        ...ids,
        ...filteredMembers.map(m => m.id)
      ];
    }, [] as string[])
    githubOrgMemberIds.push(...teamMemberIds);
  }

  log.info('collected organization member ids', {orgMemberIds: githubOrgMemberIds});

  const orgUsers = githubOrgMemberIds.map(githubMemberId => newOrganizationUser(hasuraOrgId, githubMemberId));
  return {
    error: false,
    res: orgUsers
  };
}
