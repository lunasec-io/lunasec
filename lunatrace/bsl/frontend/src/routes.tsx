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

import { RouteGuard } from './components/auth/RouteGuard';
import MainLayout from './layouts/Main';
import { BuildDetails, OrganizationsList, ProjectMain, VulnerabilitiesMain } from './pages';
import { AuthError } from './pages/auth/Error';
import { HomePage } from './pages/homepage/Home';
import { ProjectCreate } from './pages/project/Create';
import { VulnerabilityDetail } from './pages/vulnerabilities/Detail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
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
            element: (
              <RouteGuard>
                <OrganizationsList />
              </RouteGuard>
            ),
          },
          {
            path: ':organization_id',
            element: <RouteGuard></RouteGuard>,
          },
        ],
      },
      {
        path: 'new-project/:organization_id', //maybe this should be under a project group...not sure
        element: (
          <RouteGuard>
            <ProjectCreate />
          </RouteGuard>
        ),
      },
      {
        path: 'project/:project_id',
        children: [
          {
            path: '',
            element: (
              <RouteGuard>
                <ProjectMain />
              </RouteGuard>
            ),
          },
          {
            path: 'build/:build_id',
            element: (
              <RouteGuard>
                <BuildDetails />
              </RouteGuard>
            ),
          },
        ],
      },
      { path: 'auth', children: [{ path: 'error', element: <AuthError /> }] },
      {
        element: <p>404</p>, //doesnt work
      },
    ],
  },
];
