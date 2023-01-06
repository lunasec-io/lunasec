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
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

import { impersonateUserHeader } from '../constants/headers';
import { getImpersonatedUser } from '../utils/users';

// import { ManifestDocument, ManifestSubscription, ManifestSubscriptionVariables } from './generated';

const impersonatedUser = getImpersonatedUser();
const headers: Record<string, string> = impersonatedUser ? { [impersonateUserHeader]: impersonatedUser.id } : {};

// This is the base API that is consumed by the graphql codegen
export const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4455/v1/graphql', {
  headers,
});

// highlight-start
export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({}),
});
