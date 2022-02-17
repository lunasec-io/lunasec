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
import { CardTitle } from '@ory/themes';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import { Head, MarginCard } from '../../components/auth/Common';
import { createLogoutHandler } from '../../hooks/createLogoutHandler';
import ory from '../../utils/sdk';

import Login from './login';

export const LoginPage = () => {
  const [session, setSession] = useState<string>('No valid Ory Session was found.\nPlease sign in to receive one.');
  const [hasSession, setHasSession] = useState<boolean>(false);
  const onLogout = createLogoutHandler();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(JSON.stringify(data, null, 2));
        setHasSession(true);
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
  });

  return (
    <div className={'container-fluid'}>
      <Head>
        <title>Ory NextJS Integration Example</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>

      <MarginCard wide>
        <CardTitle>Welcome to Ory!</CardTitle>
        <p>
          Welcome to the Ory Managed UI. This UI implements a run-of-the-mill user interface for all self-service flows
          (login, registration, recovery, verification, settings). The purpose of this UI is to help you get started
          quickly. In the long run, you probably want to implement your own custom user interface.
        </p>
        <div className="row">
          <Login />
        </div>
      </MarginCard>
    </div>
  );
};

export default LoginPage;
