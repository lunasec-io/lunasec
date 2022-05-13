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
import React, { useState } from 'react';
import { Accordion, Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Plus } from 'react-feather';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { ProjectInfo } from '../types';

interface SettingsPRCommentsProps {
  project: ProjectInfo;
}

export const SettingsPrComments: React.FC<SettingsPRCommentsProps> = ({ project }) => {
  if (!project.github_repository) {
    return null;
  }

  const [checked, setChecked] = useState(true);
  return (
    <>
      <Row>
        <Col md="4">
          <h2>Pull Request Reviews</h2>
        </Col>
        <Col md>
          <p>Whether LunaTrace will automatically write scan results onto your PRs.</p>
        </Col>
      </Row>
      <Row>
        <Form className="d-flex justify-content-center">
          <Form.Switch
            id="pr-reviews-switch"
            label={checked ? 'PR Reviews Enabled' : 'PR Reviews Disabled'}
            checked={checked}
            disabled={false}
            onClick={() => setChecked(!checked)}
          />
        </Form>
      </Row>
      <hr />
    </>
  );
};
