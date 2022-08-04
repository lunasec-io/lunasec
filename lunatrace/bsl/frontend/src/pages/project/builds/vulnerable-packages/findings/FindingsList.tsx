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
import { VulnerablePackage } from '@lunatrace/lunatrace-common/build/main';
import React from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';

import { DepTree, QuickViewProps } from '../../types';
import { Finding } from '../types';

import { FindingItem } from './FindingItem';

interface FindingsTableProps {
  shouldFilterFindings: boolean;
  filteredFindings: Finding[];
  quickView: QuickViewProps;
  setShouldFilterFindings: (shouldFilter: boolean) => void;
  findingsCount: number;
  depTree: DepTree | null;
}

export const FindingsTable: React.FC<FindingsTableProps> = ({
  shouldFilterFindings,
  filteredFindings,
  quickView,
  setShouldFilterFindings,
  findingsCount,
  depTree,
}) => {
  return (
    <Accordion.Body>
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Source</th>
            <th>Vulnerability Number</th>
            {depTree && <th>Patchable</th>}
            <th>Severity</th>
            <th>CVSS</th>
            <th>Fix</th>
            <th>Ignore</th>
          </tr>
        </thead>
        <tbody>
          {filteredFindings.map((f) => {
            const patchable = depTree?.checkIfVulnInstancesTriviallyUpdatable(f.vulnerability.id);
            return (
              <FindingItem
                patchable={patchable}
                key={f.id}
                finding={f}
                setVulnQuickViewId={quickView.setVulnQuickViewId}
                vulnQuickViewId={quickView.vulnQuickViewId}
              />
            );
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
