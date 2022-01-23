/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
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
      {title && <li className="sidebar-header">{title}</li>}
      {children}
    </React.Fragment>
  );
};
