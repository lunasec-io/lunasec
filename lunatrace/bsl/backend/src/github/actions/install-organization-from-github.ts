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
import { hasura } from '../../hasura-api';
import { getOrgMembersInHasuraFormat } from '../../hasura-api/formatters/get-org-members';
import {
  Organizations_Constraint,
  Organizations_Insert_Input,
  Organizations_On_Conflict,
  Organizations_Update_Column,
} from '../../hasura-api/generated';
import { WebHookOrgData } from '../../types/github';
import { log } from '../../utils/log';
import { getInstallationAccessToken } from '../auth';

export async function installOrganizationFromGithub(newOrg: WebHookOrgData) {
  log.info('Handling github install for organization', {
    newOrg,
  });

  const installationAccessTokenRes = await getInstallationAccessToken(newOrg.id);
  if (installationAccessTokenRes.error) {
    log.error('Failed to fetch installation access token', { installationAccessTokenRes });
    throw new Error('Error fetching installation access token');
  }

  const installationAccessToken = installationAccessTokenRes.res;
  const installationId = newOrg.id;

  const orgMembers = await getOrgMembersInHasuraFormat(installationId, installationAccessToken, newOrg);

  const orgInHasuraFormat: Organizations_Insert_Input = {
    name: newOrg.account.login,
    github_id: newOrg.account.id,
    github_owner_type: newOrg.account.type,
    installation_id: installationId,
    github_node_id: newOrg.account.node_id,
    organization_users: orgMembers,
  };

  const onOrgConflict: Organizations_On_Conflict = {
    constraint: Organizations_Constraint.OrganizationsGithubIdKey,
    update_columns: [
      Organizations_Update_Column.GithubOwnerType,
      Organizations_Update_Column.GithubId,
      Organizations_Update_Column.GithubNodeId,
      Organizations_Update_Column.InstallationId,
      Organizations_Update_Column.Name,
    ],
  };

  const orgUpsertResult = await hasura.UpsertOrganization({ object: orgInHasuraFormat, on_conflict: onOrgConflict });

  log.info('Upserted organization for installation', { orgUpsertResult });
  if (!orgUpsertResult.insert_organizations_one) {
    throw new Error('Failed to upsert org, hasura rejected it');
  }
  const orgHasuraId = orgUpsertResult.insert_organizations_one.id;
  return orgHasuraId;
}
