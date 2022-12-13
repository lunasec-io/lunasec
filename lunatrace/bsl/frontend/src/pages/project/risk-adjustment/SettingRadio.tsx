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
import React, { useState } from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';

import api from '../../../api';

import { FolderEnvironmentalAdjustment } from './types';

interface TagRadioProps {
  savedSetting: FolderEnvironmentalAdjustment | null;
  availableSettings: string[];
}

export const SettingRadio = ({ savedSetting, availableSettings }: TagRadioProps) => {
  const { data: allAdjustmentsQuery, isLoading } = api.useGetAllCvssAdjustmentsQuery();

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

  const onOptionChanged = (option: string) => {
    // If we click an already selected option, unset it
    if (selectedOption === option) {
      return setSelectedOption(null);
    }
    setSelectedOption(option);
  };

  return (
    <ButtonGroup>
      {availableSettings.map((settingName) => {
        return (
          <Button
            key={settingName}
            variant={selectedOption === settingName ? 'primary' : 'outline-secondary'}
            name={settingName}
            id={settingName}
            onClick={(_e) => onOptionChanged(settingName)}
          >
            <span className="text-capitalize">{settingName}</span>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
