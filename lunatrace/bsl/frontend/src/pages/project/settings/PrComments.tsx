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
import { Col, Form, Row } from 'react-bootstrap';

import api from '../../../api';
import { ProjectInfo } from '../types';

interface SettingsPRCommentsProps {
  project: ProjectInfo;
}

export const SettingsPrComments: React.FC<SettingsPRCommentsProps> = ({ project }) => {
  if (!project.github_repository) {
    return null;
  }

  const [updateSettings, { isLoading }] = api.useUpdateSettingsMutation();

  // Allows us to show the change before it syncs to the server. A bit easier than dealing with manually editing the store cache
  // to show optimistic updates
  const [checked, setChecked] = useState<boolean>(project.settings?.pr_feedback_enabled || false);

  // We have specified that updateSettings will bust the ProjectDetails cache, so we expect project to be refetched and
  // then we sync the state from its settings
  useEffect(() => {
    setChecked(project.settings?.pr_feedback_enabled || false);
  }, [project]);

  return (
    <>
      <Row>
        <Col md="4">
          <h2>Pull Request Feedback</h2>
        </Col>
        <Col md>
          <p>Whether LunaTrace will automatically submit feedback your PRs.</p>
        </Col>
      </Row>
      <Row>
        <Form className="d-flex justify-content-center">
          <Form.Switch
            className="form-switch-md"
            id="pr-reviews-switch"
            label={checked ? 'PR Reviews Enabled' : 'PR Reviews Disabled'}
            checked={checked}
            disabled={isLoading}
            onChange={(e) => {
              setChecked(!checked);
              void updateSettings({ id: project.settings_id, settings: { pr_feedback_enabled: e.target.checked } });
            }}
          />
        </Form>
      </Row>
      <hr />
    </>
  );
};
