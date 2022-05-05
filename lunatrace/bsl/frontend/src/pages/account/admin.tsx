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
import React from 'react';

import { api } from '../../api/generated';

export const AdminPage = () => {
  const { data, error, isLoading } = api.endpoints.GetLunaTraceUsers.useQuery();

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <ul>
      {data.users.map((u) => {
        return <li key={u.id}>u.id</li>;
      })}
    </ul>
  );
};
