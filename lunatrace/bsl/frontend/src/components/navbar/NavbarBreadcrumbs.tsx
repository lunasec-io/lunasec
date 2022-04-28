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
import { Params } from 'react-router-dom';
import useBreadCrumbs, {
  BreadcrumbComponentProps,
  BreadcrumbComponentType,
  BreadcrumbsRoute,
} from 'use-react-router-breadcrumbs';

import api from '../../api/';
import { GetSidebarInfoQuery } from '../../api/generated';

type Project = GetSidebarInfoQuery['projects'][number];

const getCurrentProject = (projects: Project[], params: Params): Project | null => {
  const filteredProjects = projects.filter((p) => p.id === params.project_id);

  if (filteredProjects.length === 0) {
    return null;
  }

  return filteredProjects[0];
};

// These small little components can figure out how to display their own names, since the IDs from the URL are too ugly
const ProjectBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  // Doing queries here is actually completely performant thanks to the cache system, no new queries will fire
  const { data } = api.useGetSidebarInfoQuery();
  if (!data) {
    return null;
  }
  const projects = data.projects;

  if (projects.length === 0) {
    console.error('no projects were found');
    return null;
  }

  const currentProject = getCurrentProject(projects, crumbProps.match.params);
  if (currentProject === null) {
    return null;
  }

  return <span>{currentProject.name}</span>;
};

const BuildBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const { data } = api.useGetSidebarInfoQuery();
  if (!data) {
    return null;
  }
  const projects = data.projects;

  if (projects.length === 0) {
    console.error('no projects were found');
    return null;
  }

  const currentProject = getCurrentProject(projects, crumbProps.match.params);
  if (currentProject === null) {
    console.error('could not find current project');
    return null;
  }

  const buildNumber = currentProject.builds.filter((b) => b.id === crumbProps.match.params.build_id)[0]?.build_number;
  return <span>Build # {buildNumber}</span>;
};

const VulnBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const vulnerability_id = crumbProps.match.params.vulnerability_id;
  const { data } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id });
  if (!data) {
    return null;
  }
  const vuln = data.vulnerabilities[0];
  return <span>{vuln.name}</span>;
};

const OrganizationBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const { data } = api.useGetSidebarInfoQuery();
  if (!data) {
    return null;
  }
  const filteredOrg = data.organizations.find((o) => o.id === crumbProps.match.params.project_id);
  if (!filteredOrg) {
    console.error('breadcrumb couldnt find org');
    return null;
  }
  return <span>{filteredOrg.name}</span>;
};

const NewProjectBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  return <span>New Project</span>;
};

export const NavbarBreadcrumbs: React.FunctionComponent = () => {
  // These custom breadcrumbs override the defaults from the library
  const customRoutes: BreadcrumbsRoute[] = [
    { path: '/project/:project_id', breadcrumb: ProjectBreadCrumb },
    { path: '/project/:project_id/build/:build_id', breadcrumb: BuildBreadCrumb },
    { path: '/vulnerabilities/:vulnerability_id', breadcrumb: VulnBreadCrumb },
    { path: '/organization/:project_id', breadcrumb: OrganizationBreadCrumb },
    { path: '/new-project', breadcrumb: null },
    { path: '/new-project/:organization_id', breadcrumb: NewProjectBreadCrumb },
  ];
  const breadCrumbs = useBreadCrumbs(customRoutes);

  // Not every path maps to an index page, so we just dont show those breadcrumbs
  // Really wanted to use micromatch for this but it doesnt work in the browser, so it's regexp :(
  const blackList = ['/project$', '/project/.*/build$', '/organization$'];

  return (
    <Breadcrumb className="breadcrumb-navigation">
      {breadCrumbs.map((crumbMeta, index) => {
        const isBanned = blackList.some((banned) => {
          return crumbMeta.match.pathname.match(new RegExp(banned));
        });

        if (isBanned) {
          return;
        }

        const isLastCrumb = index === breadCrumbs.length - 1;

        return (
          <LinkContainer key={crumbMeta.key} to={crumbMeta.match.pathname}>
            <Breadcrumb.Item key={crumbMeta.key} linkProps={isLastCrumb ? { className: 'text-reset ' } : {}}>
              {crumbMeta.breadcrumb}
            </Breadcrumb.Item>
          </LinkContainer>
        );
      })}
    </Breadcrumb>
  );
};
