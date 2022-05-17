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
import { Settings_Update_Column } from '../../../api/generated';
import { ProjectInfo } from '../types';

interface SettingsPRCommentsProps {
  project: ProjectInfo;
}

export const SettingsPrComments: React.FC<SettingsPRCommentsProps> = ({ project }) => {
  if (!project.github_repository) {
    return null;
  }

  const [updateSettings, { isLoading }] = api.useUpsertProjectSettingsMutation();

  // Allows us to show the change before it syncs to the server. A bit easier than dealing with manually editing the store cache
  // to show optimistic updates
  const [checked, setChecked] = useState<boolean>(project.settings?.pr_feedback_disabled || false);

  // We have specified that updateSettings will bust the ProjectDetails cache, so we expect project to be refetched and
  // then we sync the state from its settings
  useEffect(() => {
    setChecked(project.settings?.pr_feedback_disabled || false);
  }, [project]);

  return (
    <>
      <Row>
        <Col md="4">
          <h3>Pull Request Feedback</h3>
        </Col>
        <Col md>
          <p>Disable LunaTrace from submitting feedback to your PRs.</p>
        </Col>
      </Row>
      <Row>
        <Form className="d-flex justify-content-center">
          <Form.Switch
            className="form-switch-md"
            id="pr-reviews-switch"
            label={checked ? 'PR Reviews are Disabled' : 'PR Reviews are Enabled'}
            checked={checked}
            disabled={isLoading}
            onChange={(e) => {
              setChecked(!checked);
              void updateSettings({
                settings: {
                  project_id: project.id,
                  pr_feedback_disabled: e.target.checked,
                },
                update_columns: [Settings_Update_Column.PrFeedbackDisabled],
              });
            }}
          />
        </Form>
      </Row>
      <hr />
    </>
  );
};
