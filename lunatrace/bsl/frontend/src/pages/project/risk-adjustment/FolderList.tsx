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
import React, { useCallback, useEffect, useReducer, useState } from 'react';
// import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
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
  const savedFolderSettings = project.project_folder_settings;

  const [insertFolder, insertFolderResult] = api.useInsertProjectFolderSettingMutation();

  const savedRootSettings = savedFolderSettings.find((folder) => folder.root === true);

  // make sure the root folder setting exists when we click the tab
  useEffect(() => {
    if (!savedRootSettings) {
      void insertFolder({
        object: { root: true, precedence: 1, path_glob: '**', project_id: project.id },
      });
    }
  }, []);

  if (!savedRootSettings) {
    return <Spinner animation="border" />;
  }

  const availableRootSettings = [
    ['frontend', 'backend'],
    ['internet exposed', 'not internet exposed'],
    ['PII', 'no PII'],
  ];

  const [nonRootFolders, setNonRootFolders] = useState(
    savedFolderSettings.filter((folder) => !folder.root).sort((folder) => folder.precedence)
  );
  // const onDragEnd = (result: DropResult) => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }
  //
  //   const items = reorder(nonRootFolders, result.source.index, result.destination.index);
  //
  //   setNonRootFolders(items);
  // };

  const availableFolderSettings = availableRootSettings.concat([['tests']]);

  return (
    <>
      <Row>
        <Col md="auto">
          <h3>Overall Project</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Set filters on the entire project. </p>
        </Col>
        <FolderSettings savedSettings={savedRootSettings} availableSettings={availableRootSettings} />
      </Row>
      <Row className="mt-5">
        <Col md="auto">
          <h3>
            <RiFoldersLine size="2rem" /> Folders
          </h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Add filters to specific folder and sub-folders. Will merge into settings from higher levels.</p>
        </Col>
        {nonRootFolders.map((savedSetting) => {
          return (
            <FolderSettings
              key={savedSetting.path_glob}
              availableSettings={availableFolderSettings}
              savedSettings={savedSetting}
            />
          );
        })}
        {/*<FolderTags isNotRoot={true} />*/}
      </Row>
    </>
  );
};
