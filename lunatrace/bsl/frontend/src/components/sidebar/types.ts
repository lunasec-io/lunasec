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
import { Icon } from 'react-feather';
/* Can either be a link or a subsection with child links*/
// export interface SidebarItem {
//   href: string;
//   icon?: Icon;
//   title: string;
//   children?: SidebarItem[];
//   badge?: string;
// }

export interface SidebarLink {
  href: string;
  title: string;
  icon?: Icon;
  iconAfter?: boolean;
  badge?: string | React.ReactNode;
  customElement?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarSubSection extends SidebarLink {
  children: SidebarItem[];
}

export type SidebarItem = SidebarLink | SidebarSubSection;

export interface NavSection {
  title: string;
  items: SidebarItem[];
}
