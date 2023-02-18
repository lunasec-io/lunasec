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
import { Navigate } from 'react-router-dom';

import { RouteGuard } from './components/auth/RouteGuard';
import MainLayout from './layouts/Main';
import { AdminDashboard, BuildDetails, OrganizationsList, ProjectMain, VulnerabilitiesMain } from './pages';
import { ApiExplorerMain } from './pages/api-explorer/Main';
import { AuthError } from './pages/auth/Error';
import { CwesMain } from './pages/cwes/Main';
import { CweDetailMain } from './pages/cwes/detail/CweDetailMain';
import { GuideMain } from './pages/guide/Guide';
import { GuideList } from './pages/guide/List';
import { HomePage } from './pages/homepage/Home';
import { Packages } from './pages/packages/Packages';
import { ProjectCreate } from './pages/project/Create';
import { ImportProjectsMain } from './pages/project/import/Main';
import { VulnerabilityDetailMain } from './pages/vulnerabilities/detail/DetailMain';

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
            element: <VulnerabilityDetailMain />,
          },
        ],
      },
      {
        path: 'cwes',
        children: [
          {
            path: '',
            element: <CwesMain />,
          },
          {
            path: ':cwe_id',
            element: <CweDetailMain />,
          },
        ],
      },
      {
        path: 'api-explorer',
        children: [
          {
            path: '',
            element: <ApiExplorerMain />,
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
        path: 'project/import',
        element: (
          <RouteGuard>
            <ImportProjectsMain />
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
      {
        path: 'guides',
        children: [
          {
            path: '',
            element: <GuideList />,
          },
          {
            path: ':guide_id',
            element: <GuideMain />,
          },
        ],
      },

      {
        path: 'admin',
        element: (
          <RouteGuard>
            <AdminDashboard />
          </RouteGuard>
        ),
      },
      { path: 'auth', children: [{ path: 'error', element: <AuthError /> }] },
      // Login is handled by auth service, but we can still get here if the user hits back. Send those users back to
      // the homepage.
      {
        path: 'login',
        element: <Navigate to={'/'} />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        element: <p>404</p>, //doesnt work
      },
    ],
  },
];
