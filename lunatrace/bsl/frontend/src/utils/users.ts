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
import { GetSidebarInfoQuery } from '../api/generated';
import { impersonateUserKey } from '../constants/localstorage';
import { ImpersonateUser } from '../types/user';

export function getImpersonatedUser(): ImpersonateUser | null {
  const user = localStorage.getItem(impersonateUserKey);
  if (user) {
    return JSON.parse(user) as ImpersonateUser;
  }
  return null;
}

export function setImpersonatedUser(user: ImpersonateUser | null): void {
  if (user === null) {
    localStorage.removeItem(impersonateUserKey);
    return;
  }
  localStorage.setItem(impersonateUserKey, JSON.stringify(user));
}

export function sidebarDataIsForAdmin(userId: string, data: GetSidebarInfoQuery | undefined): boolean {
  if (!data || data.users.length === 0) {
    return false;
  }

  const users = data.users.filter((u) => u.kratos_id === userId);
  if (users.length === 0) {
    return false;
  }

  if (users.length !== 1) {
    throw new Error(`users from sidebar query is not exactly one: ${users}`);
  }

  const user = users[0];
  const userRole = user.role;

  return userRole === 'lunatrace_admin';
}
