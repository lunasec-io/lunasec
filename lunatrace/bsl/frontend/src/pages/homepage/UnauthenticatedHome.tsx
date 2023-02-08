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
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LunaTraceIntroVideo } from '../../components/LunaTraceIntroVideo';
import { Login } from '../../components/auth/Login';

export const UnauthenticatedHome: React.FunctionComponent = (_props) => {
  return (
    <>
      <Helmet title="Log In" />
      <div className="d-flex flex-column align-items-center">
        <h1>LunaTrace</h1>
        <h4 className="darker">Vulnerability Tracking Control Center</h4>
        <LunaTraceIntroVideo />
        <br />
        <Login />
      </div>
    </>
  );
};
