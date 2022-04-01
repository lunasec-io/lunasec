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
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { SidebarLink } from './types';

// const CustomRouterLink = forwardRef((props, ref) => (
//   <React.Fragment ref={ref}>
//     <NavLink {...props} />
//   </React.Fragment>
// ));

interface SidebarLinkProps {
  link: SidebarLink;
  depth: number;
}

const renderNavlinkBody = (props: SidebarLinkProps): React.ReactNode => {
  if (props.link.customElement) {
    return props.link.customElement;
  }
  return (
    <>
      {props.link.icon && !props.link.iconAfter && <props.link.icon className="feather align-middle" />}{' '}
      <span className="align-middle" depth={props.depth}>
        {props.link.title}
      </span>
      {props.link.icon && props.link.iconAfter && <props.link.icon className="feather align-middle ms-1" />}{' '}
      {props.link.badge && (
        <Badge className="badge-sidebar-primary" bg="" size={18}>
          {props.link.badge}
        </Badge>
      )}
    </>
  );
};

export const Link: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <li className="sidebar-item">
      <NavLink
        depth={props.depth}
        to={props.link.href}
        onClick={props.link.onClick}
        className={({ isActive }) => ['sidebar-link', isActive ? 'active ' : null].filter(Boolean).join(' ')}
      >
        {renderNavlinkBody(props)}
      </NavLink>
    </li>
  );
};
