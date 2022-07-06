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
import { groupByPackage, severityOrder } from '@lunatrace/lunatrace-common/build/main';
import { getCvssVectorFromSeverities } from '@lunatrace/lunatrace-common/build/main/cvss';
import React, { ChangeEvent, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

import { toTitleCase } from '../../../utils/string-utils';

import { VulnerablePackageListItem } from './VulnerablePackageListItem';
import { Finding } from './VulnerablePackageListItem/types';
import { QuickViewProps } from './types';

interface FindingListProps {
  findings: Finding[];
  project_id: string;
  quickView: QuickViewProps;
  setIgnoreFindings: (ignored: boolean) => void;
}

export const VulnerablePackageList: React.FunctionComponent<FindingListProps> = ({
  project_id,
  findings,
  quickView,
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
        <VulnerablePackageListItem severityFilter={severityFilter} pkg={pkg} quickView={quickView} />
      </Row>
    );
  });

  const handleShowIgnoredFindings = (e: ChangeEvent<HTMLInputElement>) => setIgnoreFindings(!e.target.checked);

  return (
    <div className="vulnerability-list p-3">
      <Row>
        <Col md="6">
          <h2>Vulnerable Packages</h2>
        </Col>
        <Col md="6" style={{ display: 'flex', justifyContent: 'right' }}>
          <label className="form-check mx-2 p-1 cursor-pointer user-select-none">
            <input className="form-check-input" type="checkbox" value="" onChange={handleShowIgnoredFindings} />
            Show Ignored Findings
          </label>
          <Dropdown align={{ md: 'end' }} className="d-inline me-2">
            <Dropdown.Toggle>Minimum Severity: {toTitleCase(prettySeverity)}</Dropdown.Toggle>
            <Dropdown.Menu>
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
