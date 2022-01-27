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
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Icon } from 'react-feather';

export interface NavbarDropdownProps {
  children: React.ReactNode;
  count: number;
  showBadge?: boolean;
  header: string;
  footer: string;
  icon: Icon;
}

const NavbarDropdown: React.FunctionComponent<NavbarDropdownProps> = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon,
}) => (
  <Dropdown className="me-2 nav-item" align="end">
    <Dropdown.Toggle as="a" className="nav-link nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <Dropdown.Header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </Dropdown.Header>
    </Dropdown.Menu>
  </Dropdown>
);

export default NavbarDropdown;
