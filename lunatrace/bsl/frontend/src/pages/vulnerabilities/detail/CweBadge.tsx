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
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';

import { cweQuickViewState } from '../../project/builds/state';
import { QuickViewProps } from '../../project/builds/types';

interface CweBadgeProps {
  id: number;
  name: string;
  common_name?: string;
  quickView?: QuickViewProps;
  tooltipDescription?: boolean;
}

export const CweBadge: React.FC<CweBadgeProps> = ({ id, name, common_name, quickView, tooltipDescription }) => {
  const cweBadge = (
    <div style={{ display: 'inline-flex' }}>
      {quickView ? (
        <Badge
          style={{ cursor: 'pointer' }}
          bg={'light'}
          onClick={() => quickView?.setVulnQuickViewState(cweQuickViewState(id))}
          className={'mx-1'}
        >
          {common_name ? common_name : `CWE-${id}`}
        </Badge>
      ) : (
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            href={`https://cwe.mitre.org/data/definitions/${id}.html`}
          >
            <Badge bg={'light'}>CWE-{id}</Badge>
          </a>
          <ExternalLink size="1em" className="mb-1 me-1" />
        </div>
      )}
      {!tooltipDescription && <span>{name}</span>}
    </div>
  );
  if (tooltipDescription) {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip className="wide-tooltip">{name}</Tooltip>}
        delay={{ show: 250, hide: 400 }}
      >
        {cweBadge}
      </OverlayTrigger>
    );
  }
  return cweBadge;
};
