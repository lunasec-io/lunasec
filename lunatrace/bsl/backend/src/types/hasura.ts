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
import { Organizations_Insert_Input } from '../hasura-api/generated';

export type OrganizationInputLookup = Record<string, Organizations_Insert_Input>;

export interface UpsertOrganizationResponse {
  id: string | null;
  github_node_id: string | null;
}
