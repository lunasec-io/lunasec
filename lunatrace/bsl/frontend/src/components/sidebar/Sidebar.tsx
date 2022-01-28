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
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import useSidebar from '../../hooks/useSidebar';

import { Section } from './Section';
import SidebarFooter from './SidebarFooter';
import { NavSection } from './types';

interface SidebarProps {
  sections: NavSection[];
  showFooter?: boolean;
}
const Sidebar: React.FunctionComponent<SidebarProps> = ({ sections, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Logo /> <span className="align-middle me-3">LunaTrace</span>
          </a>

          <ul className="sidebar-nav">
            {sections &&
              sections.map((section) => <Section key={section.title} items={section.items} title={section.title} />)}
          </ul>
          {showFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
