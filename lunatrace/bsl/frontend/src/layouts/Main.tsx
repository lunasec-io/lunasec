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
import { Outlet } from 'react-router-dom';

import { AlertsHeader } from '../components/AlertsHeader';
import Wrapper from '../components/Wrapper';
import Navbar from '../components/navbar/Navbar';
import { NavbarBreadcrumbs } from '../components/navbar/NavbarBreadcrumbs';
import Sidebar from '../components/sidebar/Sidebar';
import { generateSidebarItems } from '../components/sidebar/sidebarItems';
import { useGetSidebarInfoQuery } from '../store/api/generated';
import { showAlert } from '../utils/showAlert';

const MainLayout: React.FunctionComponent = (props) => {
  const { data, error, isLoading } = useGetSidebarInfoQuery();
  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar sections={generateSidebarItems(data)} />
        <div className="main">
          <Navbar />
          <NavbarBreadcrumbs />
          <AlertsHeader />

          <div className="content">
            <Outlet />
          </div>
        </div>
        {/*<Main>*/}
        {/*  <Navbar />*/}
        {/*  <Content>*/}
        {/*    <Outlet />*/}
        {/*  </Content>*/}
        {/*  <Footer />*/}
        {/*</Main>*/}
      </Wrapper>
      {/*<Settings />*/}
    </React.Fragment>
  );
};
export default MainLayout;
