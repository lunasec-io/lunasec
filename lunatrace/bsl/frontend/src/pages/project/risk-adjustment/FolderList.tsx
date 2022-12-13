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
import React, { useReducer } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

import { ProjectInfo } from '../types';

import { FolderSettings } from './FolderSettings';

interface FolderListProps {
  project: ProjectInfo;
}

// interface SettingsState {
//   [folderName: string]: FolderSettings;
// }
//
// interface FolderSettings {
//   isRoot: boolean;
//   precedence: number;
//   settings: { [settingGroupName: string]: SettingObject };
// }
//
// interface SettingObject {
//   options: string[];
//   value: string | null;
// }

export const FolderList: React.FC<FolderListProps> = ({ project }) => {
  const savedFolderSettings = project.project_folder_settings;
  //
  // if (isLoading) {
  //   return <Spinner animation="border" />;
  // }

  // const getSavedSetting = (optionNames: string[]):FolderSetting|null => {
  //   for (const folderSetting of folderSettings){
  //     for (const adjustmentJoin of folderSetting.folder_environmental_adjustments) {
  //       if (optionNames.includes(adjustmentJoin.cvss_environmental_adjustment.name)) {
  //         return folderSetting;
  //       }
  //     }
  //   }
  //   return null;
  // // };
  //
  // const createFolderSettingObject = function (savedFolderSetting): FolderSettings {
  //   return {
  //     settings: savedSetting.folder_environmental_adjustments.map((setting) => {
  //       return {
  //         options: optionNames,
  //         value:setting.cvss_environmental_adjustment.name
  //       }
  //     })
  //
  //     precedence: savedSetting.
  //   };
  // };

  // const buildInitialValues = () => {
  //   const settings: SettingsState = {};
  //   savedFolderSettings.forEach((folderSettings) => {
  //     settings[folderSettings.path_glob] = {
  //       isRoot: folderSettings.root,
  //       precedence: folderSettings.precedence,
  //       settings: folderSettings.folder_environmental_adjustments.map((adjustment) => {
  //         return {
  //
  //         }
  //       })
  //     }
  //   })
  // }

  // const allOptions = {
  //   'frontend-or-backend': ['frontend', 'backend'],
  //   internet: ['internet exposed', 'not internet exposed'],
  //   pii: ['PII', 'no PII'],
  //   tests: ['tests'],
  //   ignore: ['ignore all'],
  // };
  //
  // function findAdjustmentId(name: string): string {
  //   const globalAdjustment = globalAdjustments.cvss_environmental_adjustment.find(
  //     (globalAdjustment) => globalAdjustment.name === action.newValue
  //   );
  //   if (!globalAdjustment) {
  //     throw new Error('attempted to set up an adjustment name that doesnt exist in the database: ' + action.newValue);
  //   }
  //   return globalAdjustment.id;
  // }
  //
  // const changeSettingReducer = (
  //   state: SavedFolderSetting[],
  //   action: { type: 'change' | 'new-folder'; pathGlob: string; groupName: string; newValue: string | null }
  // ) => {
  //   if (action.type === 'change') {
  //     const folder = state.find((folderSetting) => folderSetting.path_glob === action.pathGlob);
  //     if (!folder) {
  //       throw new Error('Folder not found');
  //     }
  //     const adjustmentJoins = folder.folder_environmental_adjustments;
  //     const newAdjustmentJoins = adjustments.filter(
  //       (adjustment) => adjustment.cvss_environmental_adjustment.name !== action.groupName
  //     );
  //     if (action.newValue) {
  //       const adjustmentId = findAdjustmentId(action.newValue);
  //       const newJoin: FolderEnvironmentalAdjustment = {
  //         cvss_environmental_adjustment_id: adjustmentId,
  //         project_folder_settings_id: folder.id,
  //       };
  //     }
  //     folder.folder_environmental_adjustments.filter((adjustment) => adjustment.cvss_environmental_adjustment.name);
  //   }
  //   state[action.folderName].settings[action.settingGroupName].value = action.newValue;
  //   return state;
  // };

  // const [state, dispatch] = useReducer(changeSettingReducer);
  // const newRootSetting: FolderSettingPartial = {
  //   root: true,
  //   project_id: project.id,
  //   path_glob: '**',
  //   folder_environmental_adjustments: [],
  // };
  //
  // if (!folderSettings.find((s) => s.root)){
  //   folderSettings.push(rootSetting)
  // }

  const savedRootSettings = savedFolderSettings.find((folder) => folder.root === true);

  const availableRootSettings = [
    ['frontend', 'backend'],
    ['internet exposed', 'not internet exposed'],
    ['PII', 'no PII'],
  ];
  const availableFolderSettings = availableRootSettings.concat(['tests'], ['ignore']);

  return (
    <>
      <Row>
        <Col md="auto">
          <h3>Overall Project</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Set filters on the entire project. If unsure, leave unset.</p>l
        </Col>
        <FolderSettings savedSettings={savedRootSettings} availableSettings={availableRootSettings} />
      </Row>
      <Row className="mt-5">
        <Col md="auto">
          <h3>Folder Level</h3>
        </Col>
        <Col md className="mt-md-1">
          <p>Add filters to specific folder and sub-folders. Will merge into settings from higher levels.</p>
        </Col>
        {/*<FolderTags isNotRoot={true} />*/}
      </Row>
    </>
  );
};
