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

const operation = `
mutation UpdateManifestStatusIfExists($buildId: uuid!, $status: String!) {
  update_manifests(where: {_and: {build_id: {_eq: $buildId}, status: {_eq: "sbom-generated"}}}, _set: {status: $status}) {
    affected_rows
  }
}
`;

interface ResponseData {
  update_manifests: {
    returning: [
      {
        filename: string;
        project_id: string;
        project: {
          organization_id: string;
        };
      }
    ];
  };
}

export async function setManifestStatus(
  key_eq: string,
  set_status: string,
  message: string | null,
  build_id: string | null
): Promise<ResponseData> {
  const data = await callHasura<ResponseData>(operation, 'UpdateManifest', {
    key_eq: key_eq,
    set_status: set_status,
    message: message,
    build_id: build_id,
  });

  // if (!data.update_manifests || data.update_manifests.returning.length < 1) {
  //   console.error('Hasura response missing fields ', data);
  //   throw new Error('Failed to download manifest for processing');
  // }
  return data.update_manifests.returning[0] as ResponseData;
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
