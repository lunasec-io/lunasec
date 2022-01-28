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
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  MapPin,
  PieChart,
  Share,
  Sliders,
  Users,
} from 'react-feather';

import { NavSection, SidebarItem } from './types';

const pagesSection: SidebarItem[] = [
  {
    href: '/dashboard',
    icon: Sliders,
    title: 'Dashboards',
    badge: '5',
    children: [
      {
        href: '/dashboard/default',
        title: 'Default',
      },
      {
        href: '/dashboard/analytics',
        title: 'Analytics',
      },
      {
        href: '/dashboard/saas',
        title: 'SaaS',
      },
      {
        href: '/dashboard/social',
        title: 'Social',
      },
      {
        href: '/dashboard/crypto',
        title: 'Crypto',
      },
    ],
  },
  {
    href: '/pages',
    icon: Layout,
    title: 'Pages',
    children: [
      {
        href: '/pages/profile',
        title: 'Profile',
      },
      {
        href: '/pages/settings',
        title: 'Settings',
      },
      {
        href: '/pages/clients',
        title: 'Clients',
      },
      {
        href: '/pages/projects',
        title: 'Projects',
      },
      {
        href: '/pages/invoice',
        title: 'Invoice',
      },
      {
        href: '/pages/pricing',
        title: 'Pricing',
      },
      {
        href: '/pages/tasks',
        title: 'Tasks',
      },
      {
        href: '/pages/chat',
        title: 'Chat',
        badge: 'New',
      },
      {
        href: '/pages/blank',
        title: 'Blank Page',
      },
    ],
  },
  {
    href: '/auth',
    icon: Users,
    title: 'Auth',
    children: [
      {
        href: '/auth/sign-in',
        title: 'Sign In',
      },
      {
        href: '/auth/sign-up',
        title: 'Sign Up',
      },
      {
        href: '/auth/reset-password',
        title: 'Reset Password',
      },
      {
        href: '/auth/404',
        title: '404 Page',
      },
      {
        href: '/auth/500',
        title: '500 Page',
      },
    ],
  },
  {
    href: '/docs/introduction',
    icon: BookOpen,
    title: 'Documentation',
  },
];

const componentsSection: SidebarItem[] = [
  {
    href: '/ui',
    icon: Grid,
    title: 'UI Elements',
    children: [
      {
        href: '/ui/alerts',
        title: 'Alerts',
      },
      {
        href: '/ui/buttons',
        title: 'Buttons',
      },
      {
        href: '/ui/cards',
        title: 'Cards',
      },
      {
        href: '/ui/carousel',
        title: 'Carousel',
      },
      {
        href: '/ui/embed-video',
        title: 'Embed Video',
      },
      {
        href: '/ui/general',
        title: 'General',
      },
      {
        href: '/ui/grid',
        title: 'Grid',
      },
      {
        href: '/ui/modals',
        title: 'Modals',
      },
      {
        href: '/ui/offcanvas',
        title: 'Offcanvas',
      },
      {
        href: '/ui/tabs',
        title: 'Tabs',
      },
      {
        href: '/ui/typography',
        title: 'Typography',
      },
    ],
  },
  {
    href: '/icons',
    icon: Heart,
    title: 'Icons',
    badge: '1500+',
    children: [
      {
        href: '/icons/feather',
        title: 'Feather',
      },
      {
        href: '/icons/font-awesome',
        title: 'Font Awesome',
      },
    ],
  },
  {
    href: '/forms',
    icon: CheckSquare,
    title: 'Forms',
    children: [
      {
        href: '/forms/layouts',
        title: 'Layouts',
      },
      {
        href: '/forms/basic-inputs',
        title: 'Basic Inputs',
      },
      {
        href: '/forms/input-groups',
        title: 'Input Groups',
      },
      {
        href: '/forms/floating-labels',
        title: 'Floating Labels',
      },
    ],
  },
  {
    href: '/tables',
    icon: List,
    title: 'Tables',
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
  // {
  //   href: '/404',
  //   icon: Share,
  //   title: 'Multi Level',
  //   children: [
  //     {
  //       href: '/404',
  //       title: 'Two Levels',
  //       children: [
  //         {
  //           href: '/404',
  //           title: 'Item 1',
  //         },
  //         {
  //           href: '/404',
  //           title: 'Item 2',
  //         },
  //       ],
  //     },
  //     {
  //       href: '/404',
  //       title: 'Three Levels',
  //       children: [
  //         {
  //           href: '/404',
  //           title: 'Item 1',
  //           children: [
  //             {
  //               href: '/404',
  //               title: 'Item 1',
  //             },
  //             {
  //               href: '/404',
  //               title: 'Item 2',
  //             },
  //           ],
  //         },
  //         {
  //           href: '/404',
  //           title: 'Item 2',
  //         },
  //       ],
  //     },
  //   ],
  // };
];

const navSections: NavSection[] = [
  {
    title: 'Pages',
    items: pagesSection,
  },
  {
    title: 'Tools & Components',
    items: componentsSection,
  },
  {
    title: 'Plugins & Addons',
    items: pluginsSection,
  },
];

export default navSections;
