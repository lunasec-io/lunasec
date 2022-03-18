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
import React, { useEffect } from 'react';

import useAppDispatch from '../../hooks/useAppDispatch';
import { setConfirmedUnauthenticated, setSession } from '../../store/slices/authentication';
import oryClient from '../../utils/ory-client';

export const LoadSession: React.FC = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    oryClient
      .toSession()
      .then(({ data }) => {
        dispatch(setSession(data));
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
            dispatch(setConfirmedUnauthenticated(true));
            break;
          default:
            // Something else happened!
            return Promise.reject(err);
        }
      });
  }, []);
  // It doesn't block currently, but this component is designed to wrap the entire app, just in case we ever do want to block on session confirmation.
  // Doesn't seem worth it to add an entire round-trip to the rendering timeline at the moment.
  return <>{props.children}</>;
};
