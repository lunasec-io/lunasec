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
import { SeverityNamesOsv, severityOrderOsv } from '@lunatrace/lunatrace-common/build/main';
import React, { ChangeEvent } from 'react';
import { Button, Col, Dropdown, Form, OverlayTrigger, Row } from 'react-bootstrap';
import { FcPlus } from 'react-icons/fc';

import { isDirectDep } from '../../../../../utils/package';
import { BuildDetailInfo, QuickViewProps } from '../../types';

import { AutoUpdatePopOverHOC } from './AutoUpdatePopOverHOC';
import { VulnerablePackage } from './types';
import { VulnerablePackageMain } from './vulnerable-package-card/VulnerablePackageMain';

interface FindingListProps {
  setIgnoreFindings: (ignored: boolean) => void;
  vulnerablePackages: VulnerablePackage[];
  severity: SeverityNamesOsv;
  setSeverity: (s: SeverityNamesOsv) => void;
  shouldIgnore: boolean;
  build: BuildDetailInfo;
}

export const VulnerablePackagesList: React.FunctionComponent<FindingListProps> = ({
  setIgnoreFindings,

  vulnerablePackages,
  severity,
  setSeverity,
  shouldIgnore,
  build,
}) => {
  // Todo: not sure if this should include below minimum severity packages or not, might be confusing. For now we are, though
  const pkgsToUpdate = vulnerablePackages.filter((pkg) => {
    if (pkg.trivially_updatable === 'yes' || pkg.trivially_updatable === 'partially') {
      // only show the overall update queue for direct deps that could be updated, transitives don't work
      return isDirectDep(pkg);
    }
  });

  const packagesFilteredBySeverity = vulnerablePackages.filter((p) => !p.beneath_minimum_severity);

  const handleShowIgnoredFindings = (e: ChangeEvent<HTMLInputElement>) => setIgnoreFindings(!e.target.checked);

  const pkgCards = packagesFilteredBySeverity.map((p) => {
    return (
      <VulnerablePackageMain key={p.release.id} pkg={p} severity={severity} shouldIgnore={shouldIgnore} build={build} />
    );
  });

  const areUpdatesAvailable = pkgsToUpdate.length > 0;

  return (
    <div className="vulnerability-list p-3">
      <Row>
        <Col>
          <Row>
            <Col lg="12" xl="8">
              <h2 className="d-inline-block me-3">Vulnerable Packages</h2>
              <p className="mt-n2">
                <FcPlus className="mb-1 me-1" />
                Showing Enhanced Tree Data
              </p>
            </Col>
            <Col lg="12" xl="4">
              {areUpdatesAvailable && (
                <OverlayTrigger
                  placement="bottom"
                  trigger="click"
                  rootClose
                  overlay={AutoUpdatePopOverHOC(pkgsToUpdate)}
                >
                  <Button className="mb-2 d-inline-block">Update Packages</Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
        </Col>
        <Col lg="6">
          <Row className="justify-content-lg-end">
            <Col md="12" lg="auto">
              <Form.Check
                className="pt-1 mb-2"
                type="checkbox"
                label="Show Ignored"
                id="show-ignored"
                onChange={handleShowIgnoredFindings}
              />
            </Col>
            <Col md="12" lg="auto">
              <Dropdown align={{ md: 'end' }} className="d-inline me-2">
                <Dropdown.Toggle variant="secondary" className="text-capitalize">
                  Minimum Severity: {severity === 'Unknown' ? 'None' : severity}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    Lowest severity to show <hr className="m-1" />
                  </Dropdown.Header>
                  {severityOrderOsv
                    .map((severityName) => {
                      return (
                        <Dropdown.Item
                          active={severityName === severity}
                          onClick={() => setSeverity(severityName as SeverityNamesOsv)}
                          key={severityName}
                        >
                          {severityName === 'Unknown' ? 'None' : severityName}
                        </Dropdown.Item>
                      );
                    })
                    .reverse()}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      {pkgCards}
      {vulnerablePackages.length > packagesFilteredBySeverity.length ? (
        <Row className="text-center">
          {' '}
          <span className="link-primary cursor-pointer" onClick={() => setSeverity('Unknown')}>
            Show {vulnerablePackages.length - packagesFilteredBySeverity.length} lower severity vulnerabilities...{' '}
          </span>
        </Row>
      ) : null}
    </div>
  );
};
