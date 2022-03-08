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
import { callHasura } from './baseHasuraClient';

// todo: in prod add status: {_is_null: true} to the query
const operation = `
    mutation InsertBuild($project_id: uuid!, $s3_url: String!) {
        insert_builds_one(object: {project_id: $project_id, s3_url: $s3_url}) {
          id
        }
    }
`;

interface BuildData {
  id: string;
}

export async function insertBuild(variables: { project_id: string; s3_url: string }): Promise<BuildData> {
  const data = await callHasura(operation, 'InsertBuild', variables);
  if (!data.insert_builds_one) {
    console.error('Hasura response missing fields ', data);
    throw new Error('Failed to download manifest for processing');
  }
  return data.insert_builds_one as BuildData;
}

// fetchMyMutation()
//     .then(({ data, errors }) => {
//         if (errors) {
//             console.error(errors);
//         }
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });
