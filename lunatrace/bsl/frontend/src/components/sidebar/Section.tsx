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

import { SidebarLinkOrSection } from './LinkOrSubSection';
import { SidebarItem } from './types';

interface NavSectionProps {
  title: string;
  items: SidebarItem[];
}

export const Section: React.FunctionComponent<NavSectionProps> = (props) => {
  const { title, items, ...rest } = props;

  const children = items.map((child: SidebarItem) => {
    return <SidebarLinkOrSection key={child.href} item={child} depth={0} />;
  });

  return (
    <React.Fragment {...rest}>
      {title && <li className="sidebar-header fs-4">{title}</li>}
      {children}
    </React.Fragment>
  );
};
