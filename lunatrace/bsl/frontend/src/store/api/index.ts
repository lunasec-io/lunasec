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
import { api as generatedApi } from './generated';

// This extends the generated API so we can add any custom logic needed, as per https://www.graphql-code-generator.com/plugins/typescript-rtk-query
export const api = generatedApi.enhanceEndpoints({
  // addTagTypes: ['User'],
  // endpoints: {
  //     GetUserById: {
  //         providesTags: (result, error, arg) => [{ type: 'User', id: arg.userId }]
  //     }
  // }
});
