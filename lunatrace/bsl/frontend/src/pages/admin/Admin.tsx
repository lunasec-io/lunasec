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
import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';

import { AdminDashboardOrgs } from './Organizations';
import { AdminDashboardUsers } from './Users';

type AdminDashboardTabs = 'users' | 'organizations';

const AdminDashboardNav = () => {
  const [activeTab, setActiveTab] = useState<AdminDashboardTabs>('users');

  const getTabContent = () => {
    if (activeTab === 'users') {
      return <AdminDashboardUsers />;
    }
    if (activeTab === 'organizations') {
      return <AdminDashboardOrgs />;
    }
    throw new Error(`unhandled tab for admin dashboard: ${activeTab}`);
  };

  const tabs: AdminDashboardTabs[] = ['users', 'organizations'];

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="users" className="mb-4">
        {tabs.map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link eventKey={tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {getTabContent()}
    </>
  );
};

export const AdminDashboard = () => {
  return (
    <Container>
      <AdminDashboardNav />
    </Container>
  );
};
