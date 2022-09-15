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
import { severityOrder, VulnerablePackage } from '@lunatrace/lunatrace-common';
import React, { useState } from 'react';
import { Accordion, Card, Container, Row } from 'react-bootstrap';

import { ConditionallyRender } from '../../../../../components/utils/ConditionallyRender';
import { DepTree, QuickViewProps } from '../../types';
import { FindingsTable } from '../findings/FindingsList';
import { FindingsListHeader } from '../findings/FindingsListHeader';
import { Finding } from '../types';

import { GuideBlurb } from './GuideBlurb';
import { PackageDetails } from './PackageDetails';

interface VulnerablePackageCardBodyProps {
  pkg: VulnerablePackage<Finding>;
  severityFilter: number;
  quickView: QuickViewProps;
  depTree: DepTree | null;
}

export const PackageCardBody: React.FunctionComponent<VulnerablePackageCardBodyProps> = ({
  pkg,
  severityFilter,
  quickView,
  depTree,
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

      <div className="m-lg-4">
        <PackageDetails pkg={pkg} depTree={depTree} />
        <Row>
          <Accordion defaultActiveKey={filteredFindings.length > 2 ? 'nonexistant' : '0'}>
            <Accordion.Item eventKey="0">
              <FindingsListHeader
                filteredFindingsCount={filteredFindings.length}
                shouldFilterFindings={shouldFilterFindings}
                severityFilter={severityFilter}
              />
              <FindingsTable
                shouldFilterFindings={shouldFilterFindings}
                filteredFindings={filteredFindings}
                quickView={quickView}
                setShouldFilterFindings={setShouldFilterFindings}
                findingsCount={pkg.findings.length}
                depTree={depTree}
              />
            </Accordion.Item>
          </Accordion>
        </Row>
      </div>
    </Card.Body>
  );
};
