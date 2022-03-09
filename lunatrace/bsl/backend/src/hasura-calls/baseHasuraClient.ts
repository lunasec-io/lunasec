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
import axios from 'axios';

const axiosClient = axios.create({
  headers: { 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'myadminsecretkey' },
});

const hasuraEndpoint = process.env.HASURA_URL || 'http://localhost:4455/api/hasura/v1/graphql';
export async function callHasura(operationsDoc: string, operationName: string, variables: Record<string, any>) {
  const res = await axiosClient.post(hasuraEndpoint, {
    query: operationsDoc,
    variables,
    operationName,
  });

  if ('errors' in res.data && res.data.errors && res.data.errors.length > 0) {
    console.error('Errors from hasura: ', res.data.errors);
    throw new Error('Failed to download manifest for processing');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data.data;
}
