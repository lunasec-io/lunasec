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
import React, { useEffect, useState } from 'react';

import { api, GetCurrentUserInfoQuery } from '../api/generated';
import useAppSelector from '../hooks/useAppSelector';
import { selectKratosId } from '../store/slices/authentication';
import { ImpersonateUser } from '../types/user';

interface UserProviderState {
  isAdmin: boolean;
}

const initialState = {
  isAdmin: false,
};

const UserContext = React.createContext<UserProviderState>(initialState);

function userIsAdmin(data: GetCurrentUserInfoQuery | undefined): boolean {
  if (!data || data.users.length === 0) {
    return false;
  }

  const users = data.users;

  if (users.length !== 1) {
    throw new Error(`get current user information did not return exactly one user: ${users}`);
  }

  const user = users[0];
  const userRole = user.role;

  return userRole === 'lunatrace_admin';
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const userId = useAppSelector(selectKratosId);

  const [trigger, result] = api.useLazyGetCurrentUserInfoQuery();

  useEffect(() => {
    if (userId) {
      void trigger({
        kratos_id: userId,
      });
    }
  }, [userId]);

  const { data } = result;

  const isAdmin = userIsAdmin(data);

  return (
    <UserContext.Provider
      value={{
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
