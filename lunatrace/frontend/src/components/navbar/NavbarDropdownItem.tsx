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
import { Col, ListGroup, Row } from 'react-bootstrap';

export interface NavbarDropdownItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  spacing?: boolean;
}

const NavbarDropdownItem: React.FunctionComponent<NavbarDropdownItemProps> = ({
  icon,
  title,
  description,
  time,
  spacing,
}) => (
  <ListGroup.Item>
    <Row className="align-items-center g-0">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? 'pl-2' : undefined}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroup.Item>
);

export default NavbarDropdownItem;
