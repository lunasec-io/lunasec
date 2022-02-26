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
import { RouteObject } from 'react-router';

import MainLayout from './layouts/Main';
import { Account, Login, OrganizationsList, Registration, VulnerabilitiesMain } from './pages';
import { ProjectCreate } from './pages/project/Create';
import { ProjectMain } from './pages/project/Main';
import { BuildDetails } from './pages/project/builds/BuildDetails';
import { Builds } from './pages/project/builds/Builds';
import { VulnerabilityDetail } from './pages/vulnerabilities/Detail';

export const routes: RouteObject[] = [
  // {
  //   path:'/login',
  //   element: <NotLoggedInLayout/>
  //   children: [
  //     {
  //       path: '',
  //       element: <LoginPage/>
  //     }
  //   ]
  // },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'account',
        children: [
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Registration />,
          },
        ],
      },
      {
        path: 'vulnerabilities',
        children: [
          {
            path: '',
            element: <VulnerabilitiesMain />,
          },
          {
            path: ':vulnerability_id',
            element: <VulnerabilityDetail />,
          },
        ],
      },
      {
        path: 'organization',
        children: [
          {
            path: '',
            element: <OrganizationsList />,
          },
          {
            path: ':organization_id',
            // element: <Organization />,
          },
        ],
      },
      {
        path: 'project/create', //maybe this should be under a project group...not sure
        element: <ProjectCreate />,
      },
      {
        path: 'project/:project_id',
        children: [
          {
            path: '',
            element: <ProjectMain />,
          },
          {
            path: 'build/:build_id',
            element: <BuildDetails />,
          },
        ],
      },
      {
        element: <p>404</p>, //doesnt work
      },
    ],
  },
];
