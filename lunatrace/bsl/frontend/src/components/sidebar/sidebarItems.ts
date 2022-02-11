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
import {
  AlertCircle,
  AlertOctagon,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  Folder,
  Grid,
  Heart,
  List,
  MapPin,
  PieChart,
} from 'react-feather';

import { GetSidebarInfoQuery } from '../../store/api/generated';

import { NavSection, SidebarItem } from './types';

export function generateSidebarItems(data: GetSidebarInfoQuery | undefined): NavSection[] {
  const projectsSection: SidebarItem[] = !data
    ? []
    : [
        {
          href: '/project/:project_id',
          icon: Folder,
          title: 'Projects',
          // badge: data.projects.length.toString(),
          children: data.projects.map((p) => {
            return {
              href: `/project/${p.id as string}`,
              title: p.name,
            };
          }),
        },
        {
          href: '/organization/:organization_id',
          icon: Briefcase,
          title: 'Organizations',
          // badge: data.organizations.length.toString(),
          children: data.organizations.map((o) => {
            return {
              href: `/project/${o.id as string}`,
              title: o.name,
            };
          }),
        },
      ];

  const databaseSection: SidebarItem[] = [
    {
      href: '/vulnerabilities',
      icon: AlertOctagon,
      title: 'Vulnerabilities',
    },
  ];

  const pluginsSection: SidebarItem[] = [
    {
      href: '/form-plugins',
      icon: CheckSquare,
      title: 'Form Plugins',
      children: [
        {
          href: '/form-plugins/advanced-inputs',
          title: 'Advanced Inputs',
        },
        {
          href: '/form-plugins/formik',
          title: 'Formik',
          badge: 'New',
        },
        {
          href: '/form-plugins/editors',
          title: 'Editors',
        },
      ],
    },
    {
      href: '/advanced-tables',
      icon: List,
      title: 'Advanced Tables',
      children: [
        {
          href: '/advanced-tables/pagination',
          title: 'Pagination',
        },
        {
          href: '/advanced-tables/column-sorting',
          title: 'Column Sorting',
        },
        {
          href: '/advanced-tables/column-filtering',
          title: 'Column Filtering',
        },
        {
          href: '/advanced-tables/row-expanding',
          title: 'Row Expanding',
        },
        {
          href: '/advanced-tables/row-selection',
          title: 'Row Selection',
        },
      ],
    },
    {
      href: '/charts',
      icon: PieChart,
      title: 'Charts',
      badge: 'New',
      children: [
        {
          href: '/charts/chartjs',
          title: 'Chart.js',
        },
        {
          href: '/charts/apexcharts',
          title: 'ApexCharts',
          badge: 'New',
        },
      ],
    },
    {
      href: '/notifications',
      icon: Bell,
      title: 'Notifications',
    },
    {
      href: '/maps',
      icon: MapPin,
      title: 'Maps',
      children: [
        {
          href: '/maps/google-maps',
          title: 'Google Maps',
        },
        {
          href: '/maps/vector-maps',
          title: 'Vector Maps',
        },
      ],
    },
    {
      href: '/calendar',
      icon: Calendar,
      title: 'Calendar',
    },
  ];

  return [
    {
      title: 'Projects & Organizations',
      items: projectsSection,
    },
    {
      title: 'Information & Databases',
      items: databaseSection,
    },
    {
      title: 'Settings & Policies',
      items: pluginsSection,
    },
  ];
}
