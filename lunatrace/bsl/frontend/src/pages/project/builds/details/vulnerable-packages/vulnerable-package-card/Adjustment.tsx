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
import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

import { VulnerablePackage } from '../types';
export const Adjustment: React.FC<{ pkg: VulnerablePackage }> = ({ pkg }) => {
  const [collapsed, setCollapsed] = useState(true);

  const adjustment = pkg.adjustment;
  if (!adjustment) {
    return null;
  }

  if (collapsed) {
    return (
      <>
        <h6 onClick={() => setCollapsed(false)} className="cursor-pointer">
          <span className="darker">Adjusted from:</span>{' '}
          <span className="dot-through" style={{ color: 'var(--bs-green)' }}>
            {adjustment.adjusted_from_severity_name}, {adjustment.adjusted_from_cvss_score}
          </span>
          <BsArrowsAngleExpand style={{ color: 'var(--bs-green)' }} className="ms-2 mb-1" size=".8rem" />
        </h6>
      </>
    );
  }
  return (
    <fieldset className="adjustment-fieldset">
      <legend onClick={() => setCollapsed(true)} className="adjustment-legend cursor-pointer">
        Adjusted from <BsArrowsAngleContract className="ms-1" />
      </legend>
      <h6>
        <span className="darker">Severity:</span> {adjustment.adjusted_from_severity_name}
      </h6>
      <h6>
        <span className="darker">CVSS:</span> {adjustment.adjusted_from_cvss_score}
      </h6>
      <h6>
        <span className="darker">Path Matched:</span> {adjustment.path_matched}
      </h6>
      <h6>
        <span className="darker">Adjustments Applied:</span>{' '}
        {adjustment.adjustments_applied.map((adjustmentName) => {
          return (
            <Badge key={adjustmentName} bg="primary" className="me-2 fs-6">
              {adjustmentName}
            </Badge>
          );
        })}
      </h6>
    </fieldset>
  );
};
