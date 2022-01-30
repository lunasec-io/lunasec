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
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-feather';
export const ProjectSearch: React.FunctionComponent = () => {
  return (
    <Form inline="true" className="d-none d-sm-inline-block">
      <InputGroup className="input-group-navbar">
        <Form.Control placeholder="Search Projects" aria-label="Search Projects" />
        <Button variant="">
          <Search className="feather" />
        </Button>
      </InputGroup>
    </Form>
  );
};
