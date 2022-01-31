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
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import useBreadCrumbs, {
  BreadcrumbComponentProps,
  BreadcrumbComponentType,
  BreadcrumbsRoute,
} from 'use-react-router-breadcrumbs';

import { useGetSidebarInfoQuery } from '../../store/api/generated';
export const NavbarBreadcrumbs: React.FunctionComponent = () => {
  const { data } = useGetSidebarInfoQuery();
  if (!data) {
    return null;
  }
  const projects = data.projects;

  const DynamicProjectBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
    const currentProject = projects.filter((p) => p.id === crumbProps.match.params.project_id)[0];
    return <span>{currentProject.name}</span>;
  };

  const customRoutes: BreadcrumbsRoute[] = [{ path: '/project/:project_id', breadcrumb: DynamicProjectBreadCrumb }];
  const breadCrumbs = useBreadCrumbs(customRoutes);

  return (
    <Breadcrumb>
      {breadCrumbs.map((breadCrumbInfo) => {
        console.log('pathname is ', breadCrumbInfo.match);
        return (
          <LinkContainer key={breadCrumbInfo.key} to={breadCrumbInfo.match.pathname}>
            <Breadcrumb.Item href={breadCrumbInfo.match.pathname} key={breadCrumbInfo.key}>
              {breadCrumbInfo.breadcrumb}
            </Breadcrumb.Item>
          </LinkContainer>
        );
      })}
    </Breadcrumb>
  );
};
