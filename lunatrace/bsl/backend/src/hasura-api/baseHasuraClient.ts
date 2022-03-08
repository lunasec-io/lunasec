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

// todo: DOUBLE CHECK THIS IS THE RIGHT ERROR SHAPE
interface ErrorResponse {
  data: {
    errors: [
      {
        extensions: {
          path: string;
          code: string;
        };
        message: string;
      }
    ];
  };
}

interface SuccessResponse<Data> {
  data: Data;
}

const axiosClient = axios.create({
  headers: { 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'myadminsecretkey' },
});
const hasuraEndpoint = process.env.HASURA_URL || 'http://localhost:4455/api/hasura/v1/graphql';

export async function callHasura<ResponseData>(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  const res = await axiosClient.post<SuccessResponse<ResponseData> | ErrorResponse>(hasuraEndpoint, {
    query: operationsDoc,
    variables,
    operationName,
  });
  if ('errors' in res.data.data) {
    console.error('Errors from hasura: ', res.data);
    if (res.data.data.errors[0]?.message) {
      throw new Error(res.data.data.errors[0].message);
    }
    throw new Error('Request to hasura failed for operation: ' + operationName);
  }

  return res.data.data;
}
