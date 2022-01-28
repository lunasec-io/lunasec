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
import { Badge, Collapse } from 'react-bootstrap';
import { useMatch } from 'react-router-dom';

import { SidebarItem, SidebarSubSection } from '../sidebar/types';

import { SidebarLinkOrSection } from './LinkOrSubSection';

interface SidebarSubSectionProps {
  section: SidebarSubSection;
  depth: number;
}

export const SubSection: React.FunctionComponent<SidebarSubSectionProps> = (props) => {
  const routeMatch = !!useMatch(props.section.href);
  const [open, setOpen] = React.useState(routeMatch);

  const handleToggle = () => {
    setOpen((isOpen) => !isOpen);
  };

  const section = props.section;

  const children = section.children.map((child: SidebarItem) => {
    return <SidebarLinkOrSection key={child.href} item={child} depth={props.depth + 1} />;
  });

  return (
    <li className={`sidebar-item ${open ? 'active' : ''}`}>
      <a
        className={`sidebar-link ${open ? '' : 'collapsed'}`}
        data-bs-toggle="collapse"
        aria-expanded={open ? 'true' : 'false'}
        depth={props.depth}
        onClick={handleToggle}
      >
        {section.icon && <section.icon className="feather align-middle" />}{' '}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*
        @ts-ignore */}
        <span className="align-middle" depth={props.depth}>
          {section.title}
        </span>
        {section.badge && (
          <Badge className="badge-sidebar-primary" bg="" size={18}>
            {section.badge}
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
