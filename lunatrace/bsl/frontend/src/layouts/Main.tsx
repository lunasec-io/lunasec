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
import { Outlet } from 'react-router-dom';

import api from '../api';
import { AlertsHeader } from '../components/AlertsHeader';
import Wrapper from '../components/Wrapper';
import Navbar from '../components/navbar/Navbar';
import { NavbarBreadcrumbs } from '../components/navbar/NavbarBreadcrumbs';
import Sidebar from '../components/sidebar/Sidebar';
import { generateSidebarItems } from '../components/sidebar/sidebarItems';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { selectIsAuthenticated, setConfirmedUnauthenticated, setSession } from '../store/slices/authentication';
import { userHasAnyOrganizations } from '../utils/organizations';
import oryClient from '../utils/ory-client';

const MainLayout: React.FunctionComponent = (props) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  // TODO move this somewhere more else
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

            // do nothing, the user is not logged in
            break;
          default:
            // Something else happened!
            return Promise.reject(err);
        }
      });
  }, []);

  const [trigger, result, lastPromiseInfo] = api.useLazyGetSidebarInfoQuery();
  const { data } = result;

  useEffect(() => {
    if (isAuthenticated) {
      void trigger();
    }
  }, [isAuthenticated]);

  const setupWizardOpen = !userHasAnyOrganizations(data);

  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar sections={generateSidebarItems(data, isAuthenticated)} />
        <div className="main">
          <Navbar setupWizardOpen={setupWizardOpen} />

          {!setupWizardOpen && <NavbarBreadcrumbs />}

          <AlertsHeader />

          <div className="content">
            <Outlet />
          </div>
        </div>
      </Wrapper>
      {/*<Settings />*/}
    </React.Fragment>
  );
};
export default MainLayout;
