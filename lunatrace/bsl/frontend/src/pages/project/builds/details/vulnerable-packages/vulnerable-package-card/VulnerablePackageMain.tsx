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
import { SeverityNamesOsv } from '@lunatrace/lunatrace-common/build/main';
import React, { useState } from 'react';
import { Card, Dropdown, FloatingLabel, Form, FormControl, Spinner } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import api from '../../../../../../api';
import { ConfirmationDailog } from '../../../../../../components/ConfirmationDialog';
import {BuildDetailInfo, QuickViewProps} from '../../../types';
import { VulnerablePackage } from '../types';

import { PackageCardBody } from './PackageCardBody';
import { VulnerablePackageCardHeader } from './VulnerablePackageCardHeader';

interface VulnerablePackageMainProps {
  pkg: VulnerablePackage;
  quickView: QuickViewProps;
  severity: SeverityNamesOsv;
  shouldIgnore: boolean;
  build: BuildDetailInfo;
}

export const VulnerablePackageMain: React.FunctionComponent<VulnerablePackageMainProps> = ({
  pkg,
  quickView,
  severity,
  shouldIgnore,
  build,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [insertVulnIgnore, insertVulnIgnoreState] = api.useInsertIgnoredVulnerabilitiesMutation();
  const [ignoreNote, setIgnoreNote] = useState('');
  const { project_id } = useParams();
  const [shouldFilterFindingsBySeverity, setShouldFilterFindingsBySeverity] = useState(true);

  const findingsAboveSeverity = pkg.affected_by.filter((affectedByVuln) => {
    return !affectedByVuln.beneath_minimum_severity || !shouldFilterFindingsBySeverity;
  });

  const findingsHiddenBySeverityCount = pkg.affected_by.length - findingsAboveSeverity.length;

  const findings = findingsAboveSeverity.filter((f) => {
    if (!shouldIgnore) {
      return true;
    }
    return !f.ignored;
  });

  if (findings.length === 0) {
    return null;
  }

  const allFindingsIgnored = findings.every((f) => f.ignored);

  const bulkIgnoreVulns = async () => {
    if (!project_id) {
      throw new Error('attempted to ignore a vuln but no project id is in the url');
    }
    const toIgnore = pkg.affected_by.map((vulnMeta) => {
      return {
        vulnerability_id: vulnMeta.vulnerability.id,
        project_id: project_id,
        note: ignoreNote,
        locations: [vulnMeta.path],
      };
    });
    await insertVulnIgnore({ objects: toIgnore });
  };
  // eslint-disable-next-line react/display-name
  const customMenuToggle = React.forwardRef<
    HTMLAnchorElement,
    { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }
  >(({ children, onClick }, ref) => (
    <a
      className="text-end position-absolute top-0 end-0 m-3 btn-white"
      href="src/components/finding/VulnerablePackageItem"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDotsVertical size={25} className="text-right position-absolute top-0 end-0 me-n3" />
      {children}
    </a>
  ));

  const renderIgnoreUi = () => {
    if (insertVulnIgnoreState.isLoading) {
      return <Spinner animation="border" className="position-absolute top-0 end-0 m-3" />;
    }

    return (
      <Dropdown align="end">
        <Dropdown.Toggle as={customMenuToggle} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setShowConfirmation(true)}>Ignore</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <>
      <Card className="vulnpkg-card">
        {renderIgnoreUi()}
        <VulnerablePackageCardHeader pkg={pkg} ignored={allFindingsIgnored} />
        <PackageCardBody
          findingsHiddenBySeverityCount={findingsHiddenBySeverityCount}
          pkg={pkg}
          quickView={quickView}
          severity={severity}
          findings={findings}
          shouldFilterFindingsBySeverity={shouldFilterFindingsBySeverity}
          setShouldFilterFindingsBySeverity={setShouldFilterFindingsBySeverity}
          build={build}
        />
      </Card>
      <ConfirmationDailog
        title={`Ignore All Findings For This Package`}
        body={(
          <>
            <p>
              Bulk ignore all currently reported findings for this package. New vulnerabilities or the same
              vulnerabilities at new locations will cause this package to appear again. This action is not yet
              reversible, but will be in a future update.
            </p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(false);
                void bulkIgnoreVulns();
              }}
            >
              <FloatingLabel controlId="floatingInput" label="Reason (optional)" className="mb-3">
                <FormControl
                  value={ignoreNote}
                  onChange={(e) => setIgnoreNote(e.target.value)}
                  required={false}
                  placeholder="Enter reason"
                />
              </FloatingLabel>
            </Form>
          </>
        )}
        onClose={(success) => {
          setShowConfirmation(false);
          if (success) {
            void bulkIgnoreVulns();
          }
        }}
        show={showConfirmation}
      />
    </>
  );
};
