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
  mutation UpdateManifest($key_eq: String!, $set_status: String!, $message: String, $build_id: uuid) {
    update_manifests(where: { s3_key: {_eq: $key_eq}}, _set: {status: $set_status, message:$message, build_id: $build_id}) {
      returning {
        filename
        project_id
        project {
          organization_id
        }
      }
    }
  }
`;

interface ManifestMetadata {
  filename: string;
  project_id: string;
  project: {
    organization_id: string;
  };
}

export async function setManifestStatus(
  key_eq: string,
  set_status: string,
  message: string | null,
  build_id: string | null
): Promise<ManifestMetadata> {
  const data = await callHasura(operation, 'UpdateManifest', {
    key_eq: key_eq,
    set_status: set_status,
    message: message,
    build_id: build_id,
  });

  if (!data.update_manifests || data.update_manifests.returning.length < 1) {
    console.error('Hasura response missing fields ', data);
    throw new Error('Failed to download manifest for processing');
  }
  return data.update_manifests.returning[0] as ManifestMetadata;
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
