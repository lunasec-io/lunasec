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
import React from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';

import { QuickViewProps } from '../../../types';
import { VulnMeta } from '../../types';

import { VulnInfo } from './VulnInfo';

interface FindingsTableProps {
  shouldFilterFindings: boolean;
  filteredFindings: VulnMeta[];
  quickView: QuickViewProps;
  setShouldFilterFindings: (shouldFilter: boolean) => void;
  findingsHiddenBySeverityCount: number;
}

export const FindingsTable: React.FC<FindingsTableProps> = ({
  shouldFilterFindings,
  filteredFindings,
  quickView,
  setShouldFilterFindings,
  findingsHiddenBySeverityCount,
}) => {
  return (
    <Accordion.Body>
      <Table hover size="sm" responsive>
        <thead>
          <tr>
            <th>Source</th>
            <th>Vulnerability ID</th>
            <th>Severity</th>
            <th>CVSS</th>
            <th>Fix</th>
            <th>Ignore</th>
          </tr>
        </thead>
        <tbody>
          {filteredFindings.map((vulnMeta) => {
            return (
              <VulnInfo
                key={vulnMeta.vulnerability.id}
                vulnMeta={vulnMeta}
                setVulnQuickViewId={quickView.setVulnQuickViewId}
                vulnQuickViewId={quickView.vulnQuickViewId}
              />
            );
          })}
        </tbody>
      </Table>

      {shouldFilterFindings ? (
        findingsHiddenBySeverityCount > 0 ? (
          <span style={{ cursor: 'pointer' }} onClick={() => setShouldFilterFindings(false)}>
            Show {findingsHiddenBySeverityCount} lower severity findings
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
