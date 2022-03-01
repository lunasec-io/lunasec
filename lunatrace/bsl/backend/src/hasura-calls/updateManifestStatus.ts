import { callHasura } from './baseHasuraClient';

// todo: in prod add status: {_is_null: true} to the query
const operation = `
  mutation MyMutation($key_eq: String!, $set_status: String!, $message: String) {
    update_manifests(where: { s3_key: {_eq: $key_eq}}, _set: {status: $set_status, message:$message}) {
      returning {
        filename
      }
    }
  }
`;

interface ManifestMetadata {
  filename: string;
}

export async function fetchSetManifestStatus(
  key_eq: string,
  set_status: string,
  message?: string
): Promise<ManifestMetadata> {
  const res = await callHasura(operation, 'MyMutation', {
    key_eq: key_eq,
    set_status: set_status,
    message: message || null,
  });
  const data = res.data.data;
  console.log('data is ', data)
  if ('errors' in data && data.errors && data.errors.length > 0) {
    console.error('Errors from hasura: ', data.errors);
    throw new Error('Failed to download manifest for processing');
  }
  if (!data.update_manifests || data.update_manifests.returning.length < 1) {
    console.error('Hasura response missing fields ', data);
    throw new Error('Failed to download manifest for processing');
  }
  return data.update_manifests.returning[0];
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
