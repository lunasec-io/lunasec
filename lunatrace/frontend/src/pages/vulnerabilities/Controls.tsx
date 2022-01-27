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
import React, { useState } from 'react';
import { Button, Col, Dropdown, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { AlignLeft, ChevronDown, Filter, Search } from 'react-feather';

import useTheme from '../../hooks/useTheme';

import { Order } from './types';

export interface VulnerabilitiesControlsProps {
  submitSearch: (s: string) => void;
  submitFilter: (s: string) => void;
  submitOrder: (s: Order) => void;
  order: Order;
}
export const VulnerabilitiesControls: React.FunctionComponent<VulnerabilitiesControlsProps> = (props) => {
  const [search, setSearch] = useState('');
  const [namespaceFilter, setNamespaceFilter] = useState('');
  const { submitOrder, order } = props;
  const { theme } = useTheme();
  return (
    <Row className="mb-2 mb-xl-3">
      <Col sm="3" className="d-none d-sm-block">
        <h3>Vulnerabilities</h3>
      </Col>
      <Col sm="5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.submitSearch(search);
          }}
        >
          <InputGroup className="input-group-vulnerabilities">
            <Form.Control
              placeholder="Search Vulnerabilities"
              aria-label="Search Vulnerabilities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="">
              <Search className="feather" />
            </Button>
          </InputGroup>
        </form>
      </Col>

      <Col sm="4" className="ms-auto text-end">
        <Dropdown autoClose="outside" className="d-inline me-2">
          <Dropdown.Toggle
            variant={order !== 'none' && theme === 'dark' ? 'primary' : ''}
            className="bg-white shadow-sm"
          >
            <AlignLeft className="feather align-middle mt-n1" /> Sort
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={order === 'severity'}
              onClick={(e) => submitOrder(order !== 'severity' ? 'severity' : 'none')}
            >
              Severity <ChevronDown />
            </Dropdown.Item>
            <Dropdown.Item active={order === 'cvss'} onClick={(e) => submitOrder(order !== 'cvss' ? 'cvss' : 'none')}>
              CVSS Score <ChevronDown />
            </Dropdown.Item>
            <Dropdown.Item active={order === 'date'} onClick={(e) => submitOrder(order !== 'date' ? 'date' : 'none')}>
              Date <ChevronDown />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <form
          onBlur={() => props.submitFilter(namespaceFilter)}
          onSubmit={(e) => {
            e.preventDefault();
            props.submitFilter(namespaceFilter);
          }}
          style={{ display: 'inline' }}
        >
          <FormGroup style={{ width: '150px' }} inline="true" className="d-sm-inline-block">
            <InputGroup className="input-group-vulnerabilities">
              <Form.Control
                placeholder="NameSpace"
                aria-label="Search Vulnerabilities"
                value={namespaceFilter}
                onChange={(e) => setNamespaceFilter(e.target.value)}
              />
              <Button type="submit" variant="">
                <Filter className="feather" />
              </Button>
            </InputGroup>
          </FormGroup>
        </form>

        {/*<Dropdown autoClose="outside" className="d-inline me-2">*/}
        {/*  <Dropdown.Toggle variant="light" className="bg-white shadow-sm">*/}
        {/*    <Filter className="feather align-middle mt-n1" /> Source*/}
        {/*  </Dropdown.Toggle>*/}
        {/*  <Dropdown.Menu>*/}
        {/*    <Dropdown.Item active={nvdSelected} onClick={() => setNvdSelected(!nvdSelected)}>*/}
        {/*      NVD*/}
        {/*    </Dropdown.Item>*/}
        {/*    <Dropdown.Item active={githubSelected} onClick={() => setGithubSelected(!githubSelected)}>*/}
        {/*      GitHub*/}
        {/*    </Dropdown.Item>*/}
        {/*  </Dropdown.Menu>*/}
        {/*</Dropdown>*/}
      </Col>
    </Row>
  );
};
