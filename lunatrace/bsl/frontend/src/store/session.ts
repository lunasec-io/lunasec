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
import { Session } from '@ory/kratos-client';
import { AxiosError } from 'axios';

import ory from '../utils/sdk';

export function getOrySession(setSession: (session: Session) => void) {
  ory
    .toSession()
    .then(({ data }) => {
      setSession(data);
    })
    .catch((err: AxiosError) => {
      switch (err.response?.status) {
        case 422:
          // This status code is returned when we are trying to
          // validate a session which has not yet completed
          // it's second factor
          // return router.push('/login?aal=aal2');
          console.error('second factor not completed');
          break;
        case 401:
          // do nothing, the user is not logged in
          break;
        default:
          // Something else happened!
          return Promise.reject(err);
      }
    });
}
