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
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

import oryClient from '../utils/ory-client';

// Returns a function which will log the user out
export function createLogoutHandler(navigate: NavigateFunction) {
  const logoutToken = oryClient
    .createSelfServiceLogoutFlowUrlForBrowsers()
    .then(({ data }) => {
      return data.logout_token;
    })
    .catch((err: AxiosError) => {
      switch (err.response?.status) {
        case 401:
          // do nothing, the user is not logged in
          return;
      }

      // Something else happened!
      return Promise.reject(err);
    });

  return async () => {
    const resolvedLogoutToken = await logoutToken;
    if (resolvedLogoutToken) {
      await oryClient.submitSelfServiceLogoutFlow(resolvedLogoutToken).then(() => {
        navigate('/');
        window.location.reload();
      });
    }
  };
}
