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
import { MaybeError } from '../../types/util';
import { newError, newResult } from '../../utils/errors';
import { log } from '../../utils/log';
import { catchError, threwError } from '../../utils/try';
import { hasura } from '../index';

export async function userIsAdmin(kratosUserId: string): Promise<MaybeError<boolean>> {
  const userRole = await catchError(
    hasura.GetUserRole({
      kratos_id: kratosUserId,
    })
  );

  if (threwError(userRole)) {
    const err = 'unable to get role for user';
    log.error(err, {
      kratosUserId,
    });
    return newError(err);
  }

  if (userRole.users.length !== 1) {
    const err = 'did not find exactly one user for uuid';
    log.error(err, {
      kratosUserId,
      users: userRole.users,
    });
    return newError(err);
  }

  const user = userRole.users[0];
  const role = user.role;

  return newResult(role !== 'lunatrace_admin');
}
