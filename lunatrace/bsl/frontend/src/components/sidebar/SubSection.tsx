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
import React, { useEffect, useState } from 'react';
import { Badge, Collapse } from 'react-bootstrap';
import { matchPath, useLocation, useMatch } from 'react-router-dom';

import { SidebarItem, SidebarSubSection } from '../sidebar/types';

import { SidebarLinkOrSection } from './LinkOrSubSection';

interface SidebarSubSectionProps {
  section: SidebarSubSection;
  depth: number;
}

export const SubSection: React.FunctionComponent<SidebarSubSectionProps> = (props) => {
  const subSection = props.section;
  // const routeMatch = !!useMatch(props.section.href);
  const { pathname } = useLocation();

  // recursive function that walks the subtree, starting with this section
  function checkIfChildActive(item: SidebarItem) {
    if (item.href && matchPath(item.href, pathname)) {
      return true;
    }
    if ('children' in item && item.children) {
      return item.children.some(checkIfChildActive);
    }
    return false;
  }

  const [open, setOpen] = useState(false);

  // Opens the sidebar section if the URL changes
  useEffect(() => {
    if (!open) {
      setOpen(checkIfChildActive(subSection));
    }
  }, [pathname]);

  const handleToggle = () => {
    setOpen((isOpen) => !isOpen);
  };

  const children = subSection.children.map((child: SidebarItem) => {
    return <SidebarLinkOrSection key={child.href} item={child} depth={props.depth + 1} />;
  });

  return (
    <li className={`sidebar-item ${open ? 'active' : ''}`}>
      <a
        className={`sidebar-link ${open ? '' : 'collapsed'}`}
        data-bs-toggle="collapse"
        aria-expanded={open ? 'true' : 'false'}
        // depth={props.depth}
        onClick={handleToggle}
      >
        {subSection.icon && <subSection.icon className="feather align-middle" />}{' '}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*
        @ts-ignore */}
        <span className="align-middle" depth={props.depth}>
          {subSection.title}
        </span>
        {subSection.badge && (
          <Badge className="badge-sidebar-primary" bg="" size={18}>
            {subSection.badge}
          </Badge>
        )}
        {open ? <div /> : <div />}
      </a>
      <Collapse in={open}>
        <ul className="sidebar-dropdown list-unstyled">{children}</ul>
      </Collapse>
    </li>
  );
};
