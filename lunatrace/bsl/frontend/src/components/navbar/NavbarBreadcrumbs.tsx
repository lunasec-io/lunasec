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
import React, { useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink, Params } from 'react-router-dom';
import useBreadCrumbs, {
  BreadcrumbComponentProps,
  BreadcrumbComponentType,
  BreadcrumbData,
  BreadcrumbsRoute,
} from 'use-react-router-breadcrumbs';

import api from '../../api/';
import { GetSidebarInfoQuery } from '../../api/generated';
import { SidebarContext } from '../../contexts/SidebarContext';
import { WizardOpenContext } from '../../contexts/WizardContext';

type Project = GetSidebarInfoQuery['projects'][number];

const getCurrentProject = (projects: Project[], params: Params): Project | null => {
  const filteredProjects = projects.filter((p) => p.id === params.project_id);

  if (filteredProjects.length === 0) {
    return null;
  }

  return filteredProjects[0];
};

// These little breadcrumb components can figure out how to display their own names, since the IDs from the URL are too ugly

// TODO: it seems like it's possible to define these breadcrumbs in the route definitions, instead of in this file.  That would be cleaner
const ProjectBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  // Doing queries here is actually completely performant thanks to the cache system, no new queries will fire
  const { sidebarData } = useContext(SidebarContext);
  if (!sidebarData) {
    return null;
  }
  const projects = sidebarData.projects;

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
  const { sidebarData } = useContext(SidebarContext);
  if (!sidebarData) {
    return null;
  }
  const projects = sidebarData.projects;

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
  return <span># {buildNumber}</span>;
};

const BuildMainPathBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  return <span>Snapshot</span>;
};
const VulnBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const vulnerability_id = crumbProps.match.params.vulnerability_id;
  if (!vulnerability_id) {
    return null;
  }
  const { data } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id });
  if (!data) {
    return null;
  }
  const vuln = data.vulnerability_by_pk;
  if (!vuln) {
    return null;
  }
  return <span>{vuln.source_id}</span>;
};

const OrganizationBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const { sidebarData } = useContext(SidebarContext);
  if (!sidebarData) {
    return null;
  }
  const filteredOrg = sidebarData.organizations.find((o) => o.id === crumbProps.match.params.project_id);
  if (!filteredOrg) {
    console.error('breadcrumb couldnt find org');
    return null;
  }
  return <span>{filteredOrg.name}</span>;
};

const NewProjectBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  return <span>New Project</span>;
};

const NewGuideBreadCrumb: BreadcrumbComponentType = (crumbProps: BreadcrumbComponentProps) => {
  const id = crumbProps.match.params.guide_id;
  if (!id) {
    return null;
  }
  const { data } = api.useGetGuideDetailsQuery({ id });
  if (!data || !data.guides_by_pk) {
    return null;
  }

  return <span>{data.guides_by_pk.title}</span>;
};

export const NavbarBreadcrumbs: React.FunctionComponent = () => {
  const wizardIsOpen = useContext(WizardOpenContext);
  if (wizardIsOpen) {
    return null;
  }
  // These custom breadcrumbs override the defaults from the library
  const customRoutes: BreadcrumbsRoute[] = [
    { path: '/project/:project_id', breadcrumb: ProjectBreadCrumb },
    { path: '/project/:project_id/build/:build_id', breadcrumb: BuildBreadCrumb },
    { path: '/project/:project_id/build/', breadcrumb: BuildMainPathBreadCrumb },

    { path: '/vulnerabilities/:vulnerability_id', breadcrumb: VulnBreadCrumb },
    { path: '/organization/:project_id', breadcrumb: OrganizationBreadCrumb },
    { path: '/new-project', breadcrumb: null },
    { path: '/new-project/:organization_id', breadcrumb: NewProjectBreadCrumb },
    { path: '/guides/:guide_id', breadcrumb: NewGuideBreadCrumb },
  ];
  const breadCrumbs = useBreadCrumbs(customRoutes, {});

  // Not every path maps to an index page, so those aren't link breadcrumbs
  const notLinksRegex = ['/project$', '/project/.*/build$', '/organization$'];

  return (
    <Breadcrumb className="breadcrumb-navigation">
      {breadCrumbs.map((crumbMeta, index) => {
        const isNotLink = notLinksRegex.some((banned) => {
          return crumbMeta.match.pathname.match(new RegExp(banned));
        });

        const isLastCrumb = index === breadCrumbs.length - 1;

        if (isNotLink || isLastCrumb) {
          return <TextCrumb key={crumbMeta.key} crumbMeta={crumbMeta} />;
        }

        return <LinkCrumb key={crumbMeta.key} crumbMeta={crumbMeta} />;
      })}
    </Breadcrumb>
  );
};

const LinkCrumb: React.FC<{ crumbMeta: BreadcrumbData }> = ({ crumbMeta }) => {
  return (
    <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: crumbMeta.match.pathname }}>
      {crumbMeta.breadcrumb}
    </Breadcrumb.Item>
  );
};

const TextCrumb: React.FC<{ crumbMeta: BreadcrumbData }> = ({ crumbMeta }) => {
  return <li className="breadcrumb-item">{crumbMeta.breadcrumb}</li>;
};
