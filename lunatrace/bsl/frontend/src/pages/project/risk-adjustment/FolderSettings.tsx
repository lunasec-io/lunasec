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
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { AiOutlineCheck } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import api from '../../../api';
import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';

import { SettingRadio } from './SettingRadio';
import { FolderEnvironmentalAdjustment, SavedFolderSetting } from './types';
// import { FolderSettingPartial } from './types';

// type SettingGetterSetter = [string | null, (setTo: string | null) => void];
//
// interface OptionObject {
//   options: string[];
//   value: string | null;
//   setter: (setTo: string | null) => void;
// }

type AvailableSettings = string[][];

interface FolderTagProps {
  availableSettings: AvailableSettings;
  savedSettings: SavedFolderSetting | null | undefined;
}
export const FolderSettings: React.FC<FolderTagProps> = ({ savedSettings, availableSettings }) => {
  if (!savedSettings) {
    return null;
  }
  const getSavedSetting = (optionNames: string[]): FolderEnvironmentalAdjustment | null => {
    for (const adjustmentJoin of savedSettings.folder_environmental_adjustments) {
      if (optionNames.includes(adjustmentJoin.cvss_environmental_adjustment.name)) {
        return adjustmentJoin;
      }
    }
    return null;
  };

  const [deleteFolderSetting, deleteFolderSettingResults] = api.useDeleteProjectFolderSettingMutation();
  const submitDelete = () => {
    if (deleteFolderSettingResults.isLoading) {
      return;
    }
    void deleteFolderSetting({ id: savedSettings.id });
  };

  // Keep track of ignore state locally and also keep it updated with remote state when available
  const [triggerIgnore, ignoreResults] = api.useSetProjectFolderSettingsIgnoreMutation();
  const [ignoreFolder, setIgnoreFolder] = useState(savedSettings.ignore);
  useEffect(() => {
    setIgnoreFolder(savedSettings.ignore);
  }, [savedSettings]);

  const submitIgnore = (setTo: boolean) => {
    if (ignoreResults.isLoading) {
      return null;
    }
    setIgnoreFolder(setTo);
    void triggerIgnore({ id: savedSettings.id, ignore: setTo });
  };

  return (
    <Row>
      <ConditionallyRender if={!savedSettings.root}>
        <h4 className="mb-2" style={{ color: 'var(--bs-teal)' }}>
          {savedSettings.path_glob}
        </h4>
        <Col>
          <InputGroup style={{ maxWidth: '80px' }}>
            <Form.Control></Form.Control>
            <Button>
              <AiOutlineCheck className="mb-1" />
            </Button>
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button
            variant={ignoreFolder ? 'warning' : 'outline-secondary'}
            className="mb-3"
            disabled={ignoreResults.isLoading}
            onClick={() => submitIgnore(!savedSettings.ignore)}
          >
            Ignore All
          </Button>
        </Col>
      </ConditionallyRender>

      {!savedSettings.ignore &&
        availableSettings.map((availableSettingsGroup) => {
          const savedSetting = getSavedSetting(availableSettingsGroup);
          return (
            <Col key={availableSettingsGroup.toString()} md="auto" className="mb-3">
              <SettingRadio
                folderSettingsId={savedSettings.id}
                savedSetting={savedSetting}
                availableSettings={availableSettingsGroup}
              />
            </Col>
          );
        })}
      <ConditionallyRender if={!savedSettings.root}>
        <Col xs="12" md="auto" className="float-xs-end mb-3">
          <Button className="float-md-end" variant="outline-danger" onClick={submitDelete}>
            {deleteFolderSettingResults.isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <TiDeleteOutline size="1.2rem" className="mb-1 me-1" /> Remove
              </>
            )}
          </Button>{' '}
        </Col>
      </ConditionallyRender>

      <hr />
    </Row>
  );
};
