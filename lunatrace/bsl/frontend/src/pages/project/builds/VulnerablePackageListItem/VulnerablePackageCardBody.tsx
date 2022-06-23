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
import { severityOrder, VulnerablePackage } from '@lunatrace/lunatrace-common/build/main';
import compareVersions from 'compare-versions';
import React, { useState } from 'react';
import { Accordion, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';

import { ConditionallyRender } from '../../../../components/utils/ConditionallyRender';
import { pluralizeIfMultiple, toTitleCase } from '../../../../utils/string-utils';
import { QuickViewProps } from '../types';

import { GuideBlurb } from './GuideBlurb';
import { VulnerabilityTableItem } from './VulnerabilityTableItem';
import { Finding } from './types';

interface VulnerablePackageCardBodyProps {
  pkg: VulnerablePackage<Finding>;
  severityFilter: number;
  quickView: QuickViewProps;
}

interface VulnerabilityAccordionHeaderProps {
  filteredFindingsCount: number;
  shouldFilterFindings: boolean;
  severityFilter: number;
}

interface VulnerabilityAccordionBodyProps {
  shouldFilterFindings: boolean;
  filteredFindings: Finding[];
  quickView: QuickViewProps;
  setShouldFilterFindings: (shouldFilter: boolean) => void;
  findingsCount: number;
}

interface PackageDetailsProps {
  pkg: VulnerablePackage<Finding>;
}

const VulnerabilityAccordionHeader: React.FunctionComponent<VulnerabilityAccordionHeaderProps> = ({
  filteredFindingsCount,
  shouldFilterFindings,
  severityFilter,
}) => {
  const getSeverityDescription = () => {
    const appliedSecurityFilter = shouldFilterFindings && severityOrder[severityFilter] !== 'Unknown';
    if (appliedSecurityFilter) {
      const extraSeverityInfo = severityFilter < severityOrder.indexOf('Critical') ? ' (or higher) ' : ' ';
      return severityOrder[severityFilter] + extraSeverityInfo;
    }
    return '';
  };

  const severityDescription = getSeverityDescription();

  const headerTitle = severityDescription + 'finding';
  const formattedHeaderTitle = pluralizeIfMultiple(filteredFindingsCount, headerTitle, true);

  return <Accordion.Header>{formattedHeaderTitle}</Accordion.Header>;
};

const VulnerabilityAccordionBody: React.FunctionComponent<VulnerabilityAccordionBodyProps> = ({
  shouldFilterFindings,
  filteredFindings,
  quickView,
  setShouldFilterFindings,
  findingsCount,
}) => {
  return (
    <Accordion.Body>
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Source</th>
            <th>Vulnerability Number</th>
            <th>Severity</th>
            <th>CVSS</th>
            <th>Fix</th>
            <th>Ignore</th>
          </tr>
        </thead>
        <tbody>
          {filteredFindings.map((f) => (
            <VulnerabilityTableItem
              key={f.id}
              finding={f}
              setVulnQuickViewId={quickView.setVulnQuickViewId}
              vulnQuickViewId={quickView.vulnQuickViewId}
            />
          ))}
        </tbody>
      </Table>

      {shouldFilterFindings ? (
        findingsCount > filteredFindings.length ? (
          <span style={{ cursor: 'pointer' }} onClick={() => setShouldFilterFindings(false)}>
            Show {findingsCount - filteredFindings.length} lower severity findings
            <ChevronDown />
          </span>
        ) : null
      ) : (
        <span style={{ cursor: 'pointer' }} onClick={() => setShouldFilterFindings(true)}>
          Hide lower severity findings
          <ChevronUp />
        </span>
      )}
    </Accordion.Body>
  );
};

const PackageDetails: React.FunctionComponent<PackageDetailsProps> = ({ pkg }) => {
  const fixVersions = [...pkg.fix_versions];
  const pkgLocations = pkg.locations.join(', ');
  const recommendVersion = fixVersions.sort(compareVersions).reverse()[0];

  return (
    <div className="mb-3">
      {pkg.fix_state === 'fixed' ? (
        <Row>
          <h5>
            {' '}
            <span className="darker">Recommended version: </span>
            {recommendVersion}
          </h5>
        </Row>
      ) : null}
      <Row>
        <Col xs="12">
          <h5>
            {' '}
            <span className="darker">Language: </span>
            {toTitleCase(pkg.language)}
          </h5>
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-flex">
          <span className="darker">{pluralizeIfMultiple(pkg.locations.length, 'Path') + ': '}</span>
          <div className="lighter mx-1">{pkgLocations}</div>
        </Col>
      </Row>
    </div>
  );
};

export const VulnerablePackageCardBody: React.FunctionComponent<VulnerablePackageCardBodyProps> = ({
  pkg,
  severityFilter,
  quickView,
}) => {
  const [shouldFilterFindings, setShouldFilterFindings] = useState(true);

  const filteredFindings = pkg.findings.filter((f) => {
    return severityOrder.indexOf(f.severity) >= severityFilter || !shouldFilterFindings;
  });
  return (
    <Card.Body>
      <ConditionallyRender if={pkg.guides.length > 0}>
        <Container fluid className={'text-center'}>
          {pkg.guides.map((guide) => {
            return <GuideBlurb key={guide.id} guide={guide}></GuideBlurb>;
          })}
        </Container>
      </ConditionallyRender>

      <Container fluid>
        <PackageDetails pkg={pkg} />
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <VulnerabilityAccordionHeader
                filteredFindingsCount={filteredFindings.length}
                shouldFilterFindings={shouldFilterFindings}
                severityFilter={severityFilter}
              />
              <VulnerabilityAccordionBody
                shouldFilterFindings={shouldFilterFindings}
                filteredFindings={filteredFindings}
                quickView={quickView}
                setShouldFilterFindings={setShouldFilterFindings}
                findingsCount={pkg.findings.length}
              />
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </Card.Body>
  );
};
