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
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import useSidebar from '../../hooks/useSidebar';

import { Section } from './Section';
import SidebarFooter from './SidebarFooter';
import { NavSection } from './types';

interface SidebarProps {
  sections: NavSection[];
  showFooter?: boolean;
}
const Sidebar: React.FunctionComponent<SidebarProps> = ({ sections, showFooter = false }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <NavLink className="sidebar-brand" to="/">
            <Logo /> <span className="align-middle me-3">LunaTrace</span>
          </NavLink>

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
