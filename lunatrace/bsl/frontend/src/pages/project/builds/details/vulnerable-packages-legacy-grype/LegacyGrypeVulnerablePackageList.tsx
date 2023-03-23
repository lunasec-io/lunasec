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
import { getCvssVectorFromSeverities, groupByPackage, severityOrder } from '@lunatrace/lunatrace-common/build/main';
import React, { ChangeEvent, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import { VulnerablePackageMain } from './VulnerablePackageMain';
import { Finding } from './types';

interface FindingListProps {
  findings: Finding[];
  project_id: string;
  setIgnoreFindings: (ignored: boolean) => void;
}

export const LegacyGrypeVulnerablePackageList: React.FunctionComponent<FindingListProps> = ({
  project_id,
  findings,
  setIgnoreFindings,
}) => {
  const [severityFilter, setSeverityFilter] = useState(severityOrder.indexOf('critical'));
  const prettySeverity = severityOrder[severityFilter] === 'unknown' ? 'None' : severityOrder[severityFilter];

  const findingsWithSeverities = findings.map((finding) => {
    const severity = getCvssVectorFromSeverities(finding.vulnerability.severities);
    if (!severity) {
      return finding;
    }
    return {
      ...finding,
      severity: severity.cvss3OverallSeverityText,
    };
  });

  const vulnerablePkgs = groupByPackage(project_id, findingsWithSeverities);
  const filteredVulnerablePkgs = vulnerablePkgs.filter((pkg) => severityOrder.indexOf(pkg.severity) >= severityFilter);

  const pkgCards = filteredVulnerablePkgs.map((pkg) => {
    return (
      <Row key={pkg.purl}>
        <VulnerablePackageMain severityFilter={severityFilter} pkg={pkg} />
      </Row>
    );
  });

  const handleShowIgnoredFindings = (e: ChangeEvent<HTMLInputElement>) => setIgnoreFindings(!e.target.checked);

  return (
    <div className="vulnerability-list p-3">
      <Row>
        <Col md="6">
          <h2 className="d-inline-block me-3">Vulnerable Packages</h2>
          <p className="mt-n2">
            <AiOutlineMinusCircle className="mb-1 me-1" />
            Basic Vulnerability Data Only
          </p>
        </Col>
        <Col md="6" style={{ display: 'flex', justifyContent: 'right' }}>
          <label className="form-check mx-2 p-1 cursor-pointer user-select-none">
            <input className="form-check-input" type="checkbox" value="" onChange={handleShowIgnoredFindings} />
            Show Ignored
          </label>
          <Dropdown align={{ md: 'end' }} className="d-inline me-2">
            <Dropdown.Toggle variant="secondary" className="text-capitalize">
              Minimum Severity: {prettySeverity}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>
                Lowest severity to show <hr className="m-1" />
              </Dropdown.Header>
              {severityOrder
                .map((severityName, severityIndex) => {
                  return (
                    <Dropdown.Item
                      active={severityIndex === severityFilter}
                      onClick={() => setSeverityFilter(severityIndex)}
                      key={severityIndex}
                      className="text-capitalize"
                    >
                      {severityName === 'unknown' ? 'None' : severityName}
                    </Dropdown.Item>
                  );
                })
                .reverse()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <br />
      {pkgCards}
      {vulnerablePkgs.length > filteredVulnerablePkgs.length ? (
        <Row className="text-center">
          {' '}
          <span className="link-primary cursor-pointer" onClick={() => setSeverityFilter(0)}>
            Show {vulnerablePkgs.length - filteredVulnerablePkgs.length} lower severity vulnerabilities...{' '}
          </span>
        </Row>
      ) : null}
    </div>
  );
};
