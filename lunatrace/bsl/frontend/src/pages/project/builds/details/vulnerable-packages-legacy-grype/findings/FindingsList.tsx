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
import { Finding } from '../types';

import { FindingItem } from './FindingItem';

interface FindingsTableProps {
  shouldFilterFindings: boolean;
  filteredFindings: Finding[];
  setShouldFilterFindings: (shouldFilter: boolean) => void;
  findingsCount: number;
}

export const FindingsTable: React.FC<FindingsTableProps> = ({
  shouldFilterFindings,
  filteredFindings,
  setShouldFilterFindings,
  findingsCount,
}) => {
  return (
    <Accordion.Body>
      <Table hover size="sm" responsive>
        <thead>
          <tr>
            <th>Source</th>
            <th>Vulnerability ID</th>
            <th>Type</th>
            <th>Severity</th>
            <th>CVSS</th>
            <th>Fix</th>
            <th>Ignore</th>
          </tr>
        </thead>
        <tbody>
          {filteredFindings.map((f) => {
            return <FindingItem patchable="no" key={f.id} finding={f} />;
          })}
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
