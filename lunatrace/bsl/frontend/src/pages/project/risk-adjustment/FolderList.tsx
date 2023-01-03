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
import { Col, Row, Spinner } from 'react-bootstrap';
import { RiFoldersLine } from 'react-icons/ri';

import api from '../../../api';
import { reorder } from '../../../utils/array-utils';
import { ProjectInfo } from '../types';

import { FolderSettings } from './FolderSettings';

interface FolderListProps {
  project: ProjectInfo;
}

export const FolderList: React.FC<FolderListProps> = ({ project }) => {
  console.log('rendering folderlist');
  const savedFolderSettings = project.project_folder_settings;

  const savedRootSettings = savedFolderSettings.find((folder) => folder.root === true);

  const availableRootSettings = [
    ['frontend', 'backend'],
    ['internet', 'internal', 'offline'],
    ['PII', 'no PII'],
  ];

  // Folder settings and ordering
  const availableFolderSettings = availableRootSettings.concat([['tests']]);

  const savedNonRootSettings = savedFolderSettings
    .filter((folder) => !folder.root)
    .sort((folderA, folderB) => folderA.precedence - folderB.precedence);

  const [nonRootFolders, setNonRootFolders] = useState(savedNonRootSettings);

  useEffect(() => {
    setNonRootFolders(savedNonRootSettings);
  }, [project.project_folder_settings]);

  const [triggerCustomMutation, customMutationResult] = api.endpoints.customProjectUpdateMutation.useMutation();

  const changePrecedence = (oldPrecedence: number, newPrecedence: number): void => {
    const reorderedSettings = reorder(nonRootFolders, oldPrecedence - 1, newPrecedence - 1);
    const gqlMutationStrings = reorderedSettings.map((setting, index) => {
      return `update${index}:update_project_folder_settings_by_pk(pk_columns: {id: "${
        setting.id
      }"}, _set: {precedence:${index + 1}}){id}`;
    });

    const queryBody = 'mutation UpdatePrecedence {' + gqlMutationStrings.join('') + '}';
    void triggerCustomMutation({ body: queryBody });
    setNonRootFolders(reorderedSettings);
  };

  return (
    <>
      <Row>
        <Col md="auto">
          <h3>Overall Project</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Set filters on the entire project. </p>
        </Col>
        <FolderSettings
          savedSettings={savedRootSettings}
          availableSettings={availableRootSettings}
          changePrecedence={changePrecedence}
        />
      </Row>
      <Row className="mt-5">
        <Col md="auto">
          <h3>
            <RiFoldersLine size="2rem" /> Folders
          </h3>
        </Col>
        <Col md className="mt-md-1">
          <p>
            Add filters to specific folder and sub-folders. Will override the above project settings. Folders at the top
            of the list will override lower folders.
          </p>
        </Col>
        {nonRootFolders.map((savedSetting) => {
          return (
            <FolderSettings
              key={`${savedSetting.path_glob}${savedSetting.precedence}`}
              availableSettings={availableFolderSettings}
              savedSettings={savedSetting}
              changePrecedence={changePrecedence}
            />
          );
        })}
        {/*<FolderTags isNotRoot={true} />*/}
      </Row>
    </>
  );
};
