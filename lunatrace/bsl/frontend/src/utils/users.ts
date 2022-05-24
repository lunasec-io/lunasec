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
