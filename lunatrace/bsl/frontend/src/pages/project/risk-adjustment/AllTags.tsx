import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { TagGroup } from './TagGroup';
import { FolderSettingPartial } from './types';

export const AllTags = ({
  isNotRoot,
  folderSettings,
}: {
  isNotRoot: boolean;
  folderSettings: FolderSettingPartial;
}) => {
  const frontendBackendOptions = ['frontend', 'backend'];
  const [frontendBackendSelected, setFrontendBackendSelected] = useState<typeof frontendBackendOptions[number] | null>(
    null
  );

  const internetFacingOptions = ['internet exposed', 'not internet exposed'];
  const [internetFacingSelected, setInternetFacingSelected] = useState<typeof internetFacingOptions[number] | null>(
    null
  );

  const setFrontendBackendSelectedWithSideEffects = (option: typeof frontendBackendOptions[number] | null) => {
    if (option !== 'backend') {
      setInternetFacingSelected(null);
    }
    setFrontendBackendSelected(option);
  };

  const getPresetOption = (optionNames: string[]) => {
    for (const adjustmentJoin of folderSettings.folder_environmental_adjustments) {
      if (optionNames.includes(adjustmentJoin.cvss_environmental_adjustment.name)) {
        return adjustmentJoin.cvss_environmental_adjustment.name;
      }
    }
  };

  const holdOptionState = (optionNames: string[]): ReturnType<useState<string | null>> => {
    return useState<string | null>(getPresetOption(optionNames));
  };

  const piiOptions = ['PII', 'no PII'];
  const [piiSelected, setPiiSelected] = holdOptionState(piiOptions);

  const testsOptions = ['tests'];
  const [testsSelected, setTestsSelected] = holdOptionState(testsOptions);

  const ignoreOptions = ['ignore all'];
  const [ignoreOption, setIgnoreOption] = holdOptionState(ignoreOptions);

  return (
    <Row>
      <Col md="auto" className="mt-3">
        <TagGroup
          options={frontendBackendOptions}
          selectedOption={frontendBackendSelected}
          setSelectedOption={setFrontendBackendSelectedWithSideEffects}
        />
      </Col>
      {frontendBackendSelected === 'backend' && (
        <Col md="auto" className="mt-3">
          <TagGroup
            options={internetFacingOptions}
            selectedOption={internetFacingSelected}
            setSelectedOption={setInternetFacingSelected}
          />
        </Col>
      )}
      <Col md="auto" className="mt-3">
        <TagGroup options={piiOptions} selectedOption={piiSelected} setSelectedOption={setPiiSelected} />
      </Col>
      {isNotRoot && (
        <>
          <Col md="auto" className="mt-3">
            <TagGroup options={testsOptions} selectedOption={testsSelected} setSelectedOption={setTestsSelected} />
          </Col>
          <Col md="auto" className="mt-3">
            <TagGroup options={ignoreOptions} selectedOption={ignoreOption} setSelectedOption={setIgnoreOption} />
          </Col>
        </>
      )}
    </Row>
  );
};
