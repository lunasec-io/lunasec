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
import { DependencyList, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import ory from '../utils/sdk';

// Returns a function which will log the user out
export function createLogoutHandler(deps?: DependencyList) {
  const [logoutToken, setLogoutToken] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    ory
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        setLogoutToken(data.logout_token);
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
  }, deps);

  return () => {
    if (logoutToken) {
      void ory.submitSelfServiceLogoutFlow(logoutToken).then(() => navigate('/account/login'));
    }
  };
}
