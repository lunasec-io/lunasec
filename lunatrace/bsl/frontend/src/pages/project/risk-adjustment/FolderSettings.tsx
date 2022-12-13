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
import { Col, Row } from 'react-bootstrap';

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
  const getSavedSetting = (optionNames: string[]): FolderEnvironmentalAdjustment | null => {
    if (!savedSettings) {
      return null;
    }
    for (const adjustmentJoin of savedSettings.folder_environmental_adjustments) {
      if (optionNames.includes(adjustmentJoin.cvss_environmental_adjustment.name)) {
        return adjustmentJoin;
      }
    }
    return null;
  };

  // const createGetterSetter = (optionNames: string[]): SettingGetterSetter => {
  //   return useState<string | null>(getPresetOption(optionNames));
  // };
  //
  // const createOptionObject = function (optionNames: string[]): OptionObject {
  //   const [value, setter] = createGetterSetter(optionNames);
  //   return {
  //     options: optionNames,
  //     value,
  //     setter,
  //   };
  // };
  //
  // const allOptionNames = [
  //   ['frontend', 'backend'],
  //   ['internet exposed', 'not internet exposed'],
  //   ['PII', 'no PII'],
  // ];
  //
  // if (isNotRoot) {
  //   allOptionNames.push(['tests'], ['ignore all']);
  // }

  // const allOptions = allOptionNames.map(createOptionObject);
  //
  // const frontendBackendOptions = ['frontend', 'backend'];
  // ``;
  // const [frontendBackendSelected, setFrontendBackendSelected] = createGetterSetter(frontendBackendOptions);
  //
  // const internetFacingOptions = ['internet exposed', 'not internet exposed'];
  // const [internetFacingSelected, setInternetFacingSelected] = createGetterSetter(internetFacingOptions);
  //
  // //
  // // const setFrontendBackendSelectedWithSideEffects = (option: typeof frontendBackendOptions[number] | null) => {
  // //   if (option !== 'backend') {
  // //     setInternetFacingSelected(null);
  // //   }
  // //   setFrontendBackendSelected(option);
  // // };
  //
  // const piiOptions = ['PII', 'no PII'];
  // const [piiSelected, setPiiSelected] = createGetterSetter(piiOptions);
  //
  // const testsOptions = ['tests'];
  // const [testsSelected, setTestsSelected] = createGetterSetter(testsOptions);
  //
  // const ignoreOptions = ['ignore all'];
  // const [ignoreOption, setIgnoreOption] = createGetterSetter(ignoreOptions);

  // FolderTags.returnSelectedTags = () => {
  //   return allOptions.map((o) => o.value).filter((o) => !!o);
  // };

  return (
    <Row>
      {availableSettings.map((availableSettingsGroup) => {
        const savedSetting = getSavedSetting(availableSettingsGroup);
        return (
          <Col key={availableSettings.toString()} md="auto" className="mt-3">
            <SettingRadio savedSetting={savedSetting} availableSettings={availableSettingsGroup} />
          </Col>
        );
      })}
    </Row>
  );

  // return (
  //   <Row>
  //     {allOptions.map((o) => {
  //       <Col md="auto" className="mt-3">
  //         <TagRadio options={o.options} selectedOption={o.value} setSelectedOption={o.setter} />
  //       </Col>;
  //     })}
  //     <Col md="auto" className="mt-3">
  //       <TagRadio
  //         options={frontendBackendOptions}
  //         selectedOption={frontendBackendSelected}
  //         setSelectedOption={setFrontendBackendSelectedWithSideEffects}
  //       />
  //     </Col>
  //     {frontendBackendSelected === 'backend' && (
  //       <Col md="auto" className="mt-3">
  //         <TagRadio
  //           options={internetFacingOptions}
  //           selectedOption={internetFacingSelected}
  //           setSelectedOption={setInternetFacingSelected}
  //         />
  //       </Col>
  //     )}
  //     <Col md="auto" className="mt-3">
  //       <TagRadio options={piiOptions} selectedOption={piiSelected} setSelectedOption={setPiiSelected} />
  //     </Col>
  //     {isNotRoot && (
  //       <>
  //         <Col md="auto" className="mt-3">
  //           <TagRadio options={testsOptions} selectedOption={testsSelected} setSelectedOption={setTestsSelected} />
  //         </Col>
  //         <Col md="auto" className="mt-3">
  //           <TagRadio options={ignoreOptions} selectedOption={ignoreOption} setSelectedOption={setIgnoreOption} />
  //         </Col>
  //       </>
  //     )}
  //   </Row>
  // );
};
