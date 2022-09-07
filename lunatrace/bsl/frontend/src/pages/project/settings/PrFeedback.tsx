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

export const SettingsPrFeedback: React.FC<SettingsPRCommentsProps> = ({ project }) => {
  if (!project.github_repository) {
    return null;
  }

  const [updateSettings, { isLoading }] = api.useUpdateSettingsMutation();

  // Unset flags in settings are NULL, and the "default value" is false if it has been set
  // This way if the value is falsy we know it is in the default position
  const pr_comment_enabled = project.settings.pr_feedback_disabled !== true;
  const pr_check_enabled = project.settings.pr_check_enabled === true;

  // Allows us to show the change before it syncs to the server. A bit easier than dealing with manually editing the store cache
  // to show optimistic updates
  const [commentButtonChecked, setCommentButtonChecked] = useState<boolean>(pr_comment_enabled);
  const [checkButtonChecked, setCheckButtonChecked] = useState<boolean>(pr_check_enabled);

  // We have specified that updateSettings will bust the ProjectDetails cache, so we expect project to be refetched and
  // then we sync the state from its settings
  useEffect(() => {
    setCommentButtonChecked(pr_comment_enabled);
    setCheckButtonChecked(pr_check_enabled);
  }, [project]);

  return (
    <>
      <Row>
        <Col md="4">
          <h3>Pull Request Feedback</h3>
        </Col>
        <Col md>
          <p>Whether LunaTrace will automatically submit feedback on your PRs.</p>
        </Col>
      </Row>
      <Row>
        <Form className="d-flex align-items-center flex-column">
          <div>
            <Form.Switch
              className="form-switch-md"
              id="pr-reviews-switch"
              label={commentButtonChecked ? 'PR Comments Enabled' : 'PR Comments Disabled'}
              checked={commentButtonChecked}
              disabled={isLoading}
              onChange={(e) => {
                setCommentButtonChecked(!commentButtonChecked);
                void updateSettings({ id: project.settings_id, settings: { pr_feedback_disabled: !e.target.checked } });
              }}
            />

            <Form.Switch
              className="form-switch-md"
              id="pr-reviews-switch"
              label={checkButtonChecked ? 'PR Checks Enabled' : 'PR Checks Disabled'}
              checked={checkButtonChecked}
              disabled={isLoading}
              onChange={(e) => {
                setCheckButtonChecked(!checkButtonChecked);
                void updateSettings({ id: project.settings_id, settings: { pr_check_enabled: e.target.checked } });
              }}
            />
          </div>
        </Form>
      </Row>
      <hr />
    </>
  );
};
