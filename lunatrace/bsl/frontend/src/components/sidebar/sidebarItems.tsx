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
import { useContext } from 'react';
import { AlertOctagon, Aperture, LogIn, Plus, User } from 'react-feather';
import { AiFillGithub } from 'react-icons/ai';
import { BiUnlink } from 'react-icons/bi';
import { BsChatSquareText } from 'react-icons/bs';
import { RiParkingFill } from 'react-icons/ri';

import { GetSidebarInfoQuery } from '../../api/generated';
import { UserContext } from '../../contexts/UserContext';
import { userHasAnyOrganizations } from '../../utils/organizations';

import { NavSection, SidebarItem } from './types';

export function generateSidebarItems(data: GetSidebarInfoQuery | undefined, isAuthenticated: boolean): NavSection[] {
  const { isAdmin } = useContext(UserContext);

  if (!userHasAnyOrganizations(data)) {
    return [];
  }

  const projectsSection: SidebarItem[] = !data
    ? []
    : data.organizations.map((o) => {
        return {
          href: `/organization/${o.id}`,
          icon: o.name === 'Personal' ? RiParkingFill : AiFillGithub, // todo: replace this with an icon from github
          title: o.name,
          children: [
            ...o.projects.map((p) => {
              return {
                href: `project/${p.id}`,
                icon: p.github_repository ? null : BiUnlink,
                iconAfter: true,
                title: p.name,
              };
            }),
            {
              href: `/project/import`,
              title: 'Import projects',
              icon: Plus,
            },
          ],
        };
      });

  // [
  //   {
  //     href: '/project/:project_id',
  //     icon: Folder,
  //     title: 'Projects',
  //     // badge: data.projects.length.toString(),
  //     children: [
  //       ...data.projects.map((p) => {
  //         return {
  //           href: `/project/${p.id as string}`,
  //           title: p.name,
  //         };
  //       }),
  //       {
  //         href: `/project/create`,
  //         title: 'New Project',
  //         icon: Plus,
  //       },
  //     ],
  //   },
  //   {
  //     href: '/organization/:organization_id',
  //     icon: Briefcase,
  //     title: 'Organizations',
  //     // badge: data.organizations.length.toString(),
  //     children: data.organizations.map((o) => {
  //       return {
  //         href: `/organization/${o.id as string}`,
  //         title: o.name,
  //       };
  //     }),
  //   },
  // ];

  const databaseSection: SidebarItem[] = [
    {
      href: '/guides',
      icon: BsChatSquareText,
      title: 'Guides Database',
    },
    {
      href: '/vulnerabilities',
      icon: AlertOctagon,
      title: 'Vulnerabilities Reference Database',
    },
    {
      href: '/cwes',
      icon: Aperture,
      title: 'Common Weakness Enumerations Database',
    },
  ];

  const accountSection: SidebarItem[] = [
    {
      href: '/',
      icon: LogIn,
      title: 'Login',
    },
  ];

  const adminSection: SidebarItem[] = [
    {
      href: '/admin',
      icon: User,
      title: 'Dashboard',
    },
  ];

  const adminNav: NavSection[] = [
    {
      title: 'Admin',
      items: adminSection,
    },
  ];

  const loggedOutSections = [
    {
      title: 'Account',
      items: accountSection,
    },
    {
      title: 'Information & Databases',
      items: databaseSection,
    },
  ];

  const loggedInSections = [
    {
      title: 'Your Organizations',
      items: projectsSection,
    },
    {
      title: 'Information & Databases',
      items: databaseSection,
    },
    ...(isAdmin ? adminNav : []),
  ];

  return isAuthenticated ? loggedInSections : loggedOutSections;
}
