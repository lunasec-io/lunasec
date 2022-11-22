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
import { Accordion, Badge, Card, Container, Row } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';

import { ConditionallyRender } from '../../../../../../components/utils/ConditionallyRender';
import { QuickViewProps } from '../../../types';
import { VulnerablePackage } from '../types';

import { GuideBlurb } from './GuideBlurb';
import { PackageDetails } from './PackageDetails';
import { FindingsTable } from './findings/FindingsList';
import { FindingsListHeader } from './findings/FindingsListHeader';

interface VulnerablePackageCardBodyProps {
  pkg: VulnerablePackage;
  quickView: QuickViewProps;
  severity: SeverityNamesOsv;
  findings: VulnerablePackage['affected_by'];
  setShouldFilterFindingsBySeverity: (should: boolean) => void;
  shouldFilterFindingsBySeverity: boolean;
  findingsHiddenBySeverityCount: number;
}

export const PackageCardBody: React.FunctionComponent<VulnerablePackageCardBodyProps> = ({
  pkg,
  quickView,
  severity,
  shouldFilterFindingsBySeverity,
  setShouldFilterFindingsBySeverity,
  findings,
  findingsHiddenBySeverityCount,
}) => {
  return (
    <Card.Body>
      <ConditionallyRender if={pkg.guides.length > 0}>
        <Container fluid className={'text-center'}>
          {pkg.guides.map((guide) => {
            return <GuideBlurb key={guide.id} guide={guide}></GuideBlurb>;
          })}
        </Container>
      </ConditionallyRender>

      <div className="m-lg-4">
        <PackageDetails pkg={pkg} />
        <Row>
          <Accordion defaultActiveKey={''}>
            <Accordion.Item eventKey="0">
              <FindingsListHeader findingsCount={findings.length} severity={severity} />
              <FindingsTable
                shouldFilterFindings={shouldFilterFindingsBySeverity}
                filteredFindings={findings}
                quickView={quickView}
                setShouldFilterFindings={setShouldFilterFindingsBySeverity}
                findingsHiddenBySeverityCount={findingsHiddenBySeverityCount}
              />
            </Accordion.Item>
          </Accordion>
        </Row>
      </div>
    </Card.Body>
  );
};
