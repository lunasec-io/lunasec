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

interface SettingsPRChecksProps {
  project: ProjectInfo;
}

export const SettingsPrChecks: React.FC<SettingsPRChecksProps> = ({ project }) => {
  if (!project.github_repository) {
    return null;
  }

  const [updateSettings, { isLoading }] = api.useUpdateSettingsMutation();

  const pr_check_enabled = !!project.settings.pr_check_enabled;

  const [checked, setChecked] = useState<boolean>(pr_check_enabled || true);

  useEffect(() => {
    setChecked(pr_check_enabled);
  }, [project]);

  return (
    <>
      <Row>
        <Col md="4">
          <h3>Pull Request Check</h3>
        </Col>
        <Col md>
          <p>Whether LunaTrace will run as a check on your PRs.</p>
        </Col>
      </Row>
      <Row>
        <Form className="d-flex justify-content-center">
          <Form.Switch
            className="form-switch-md"
            id="pr-reviews-switch"
            label={checked ? 'PR Checks Enabled' : 'PR Checks Disabled'}
            checked={checked}
            disabled={isLoading}
            onChange={(e) => {
              setChecked(!checked);
              void updateSettings({ id: project.settings_id, settings: { pr_check_enabled: e.target.checked } });
            }}
          />
        </Form>
      </Row>
      <hr />
    </>
  );
};
