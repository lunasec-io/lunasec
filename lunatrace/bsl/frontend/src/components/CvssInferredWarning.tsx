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
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Copy } from 'react-feather';

interface CvssInferredWarningProps {
  inferred: boolean;
  placement?: React.ComponentProps<typeof OverlayTrigger>['placement'];
}

export const CvssInferredWarning: React.FunctionComponent<CvssInferredWarningProps> = ({
  inferred,
  placement = 'left',
}) => {
  if (!inferred) {
    return null;
  }
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>This CVSS score has been inferred from a linked NVD vulnerability.</Tooltip>}
    >
      <Copy size="12" />
    </OverlayTrigger>
  );
};
