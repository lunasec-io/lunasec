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
export const Link: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <li className="sidebar-item">
      <NavLink
        depth={props.depth}
        to={props.link.href}
        className={({ isActive }) => ['sidebar-link', isActive ? 'active' : null].filter(Boolean).join(' ')}
      >
        {props.link.icon && <props.link.icon className="feather align-middle" />}{' '}
        <span className="align-middle" depth={props.depth}>
          {props.link.title}
        </span>
        {props.link.badge && (
          <Badge className="badge-sidebar-primary" bg="" size={18}>
            {props.link.badge}
          </Badge>
        )}
      </NavLink>
    </li>
  );
};
