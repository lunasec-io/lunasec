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
import { skipToken } from '@reduxjs/toolkit/query/react';
import React, { useEffect } from 'react';

import { api, GetCurrentUserInfoQuery } from '../api/generated';
import useAppSelector from '../hooks/useAppSelector';
import { selectKratosId } from '../store/slices/authentication';
import { User } from '../types/user';

interface UserProviderState {
  isAdmin: boolean;
  user: User | null;
}

const initialState = {
  isAdmin: false,
  user: null,
};

const UserContext = React.createContext<UserProviderState>(initialState);

function getUserInfo(data: GetCurrentUserInfoQuery | undefined): UserProviderState {
  if (!data || data.users.length === 0) {
    return initialState;
  }

  const users = data.users;

  if (users.length !== 1) {
    throw new Error(`get current user information did not return exactly one user: ${users}`);
  }

  const user = users[0];
  const userRole = user.role;

  return {
    user,
    isAdmin: userRole === 'lunatrace_admin',
  };
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const userId = useAppSelector(selectKratosId);

  const { data } = api.useGetCurrentUserInfoQuery(userId ? { kratos_id: userId } : skipToken);

  const userInfo = getUserInfo(data);

  return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
