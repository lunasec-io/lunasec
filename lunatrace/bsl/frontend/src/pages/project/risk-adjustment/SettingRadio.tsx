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
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import api from '../../../api';

import { FolderEnvironmentalAdjustment } from './types';

interface TagRadioProps {
  folderSettingsId: string; // used to build the join table on insert
  savedSetting: FolderEnvironmentalAdjustment | null;
  availableSettings: string[];
}

export const SettingRadio = ({ savedSetting, availableSettings, folderSettingsId }: TagRadioProps) => {
  const { data: allAdjustmentsQuery } = api.useGetAllCvssAdjustmentsQuery();

  const [insertAdjustment, insertAdjustmentResult] = api.useInsertFolderEnvironmentalAdjustmentMutation();
  const [deleteAdjustment, deleteAdjustmentResult] = api.useDeleteFolderAdjustmentMutation();

  // Watch our main project query for reloads so that we can show spinners and block new user interaction while things are syncing
  const { project_id } = useParams();
  const { isFetching: projectIsFetching } = api.endpoints.GetProject.useQueryState({
    project_id: project_id as string,
  });

  const mutationLoading = insertAdjustmentResult.isLoading || deleteAdjustmentResult.isLoading;

  const somethingIsLoading = mutationLoading || projectIsFetching;

  // match adjustment names to uuids in the database so we can insert without another query. These are the global adjustments for everyone, not joins or any other project specific data
  const getAdjustmentId = (adjustmentName: string) => {
    const allAdjustments = allAdjustmentsQuery?.cvss_environmental_adjustment;
    if (!allAdjustments) {
      throw new Error('Failed to fetch set of all existing possible adjustments from db');
    }
    const matchingAdjustment = allAdjustments.find((adjustment) => adjustment.name === adjustmentName);
    if (!matchingAdjustment) {
      throw new Error('failed to find adjustment matching the given name');
    }
    return matchingAdjustment.id;
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(
    savedSetting?.cvss_environmental_adjustment.name || null
  );
  // overwrite local settings with settings from the server, this will sync back any results that disagree with local state
  useEffect(() => {
    setSelectedOption(savedSetting?.cvss_environmental_adjustment.name || null);
  }, [savedSetting]);

  const unselectOption = (option: string): void => {
    setSelectedOption(null);
    if (savedSetting) {
      void deleteAdjustment({ id: savedSetting.id });
    }
  };

  const selectOption = async (option: string): Promise<void> => {
    setSelectedOption(option);
    if (savedSetting) {
      await deleteAdjustment({ id: savedSetting.id }).unwrap();
    }
    if (option) {
      void insertAdjustment({
        object: {
          cvss_environmental_adjustment_id: getAdjustmentId(option),
          project_folder_settings_id: folderSettingsId,
        },
      });
    }
  };

  const onOptionChanged = (option: string): void => {
    // If something is in flight just bail, the user clicks are disabled and we show grey buttons
    if (somethingIsLoading) {
      return;
    }
    // If we click an already selected option, unset it
    if (selectedOption === option) {
      unselectOption(option);
      return;
    }
    // otherwise set the new option we just clicked
    void selectOption(option);
  };

  return (
    <>
      <ButtonGroup>
        {availableSettings.map((settingName) => {
          return (
            <Button
              key={settingName}
              disabled={mutationLoading}
              variant={selectedOption === settingName ? 'primary' : 'outline-secondary'}
              name={settingName}
              id={settingName}
              onClick={(_e) => void onOptionChanged(settingName)}
            >
              <span className="text-capitalize">{settingName}</span>
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};
