import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { ProjectInfo } from '../types';

import { AllTags } from './AllTags';
import { FolderSetting } from './types';

interface FolderListProps {
  project: ProjectInfo;
}

export const FolderList: React.FC<FolderListProps> = ({ project }) => {
  const preExistingRootSetting = project.project_folder_settings.find((s) => s.root);
  const folderSettings = project.project_folder_settings.filter((s) => !s.root);

  const rootSetting: Partial<FolderSettingPartial> = preExistingRootSetting || {
    root: true,
    project_id: project.id,
    path_glob: '**',
    folder_environmental_adjustments: [],
  };

  return (
    <>
      <Row>
        <Col md="auto">
          <h3>Overall Project</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Set filters on the entire project. If unknown, leave unset.</p>
        </Col>
        <AllTags isNotRoot={false} />
      </Row>
      <Row className="mt-5">
        <Col md="auto">
          <h3>Folder Level</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Add filters to specific folder and sub-folders. Will merge into settings from higher levels.</p>
        </Col>
        <AllTags isNotRoot={true} />
      </Row>
    </>
  );
};
