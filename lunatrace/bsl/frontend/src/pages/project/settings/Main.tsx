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
import { Container } from 'react-bootstrap';

import { ProjectInfo } from '../types';

import { SettingsPrComments } from './PrComments';

interface ProjectSettingsProps {
  project: ProjectInfo;
}
export const ProjectSettingsMain: React.FC<ProjectSettingsProps> = ({ project }) => {
  return (
    <Container>
      <SettingsPrComments project={project} />
    </Container>
  );
};
