import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';

import { cweQuickViewState } from '../../project/builds/state';
import { QuickViewProps } from '../../project/builds/types';

interface CweBadgeProps {
  id: number;
  name: string;
  quickView?: QuickViewProps;
  tooltipDescription?: boolean;
}

export const CweBadge: React.FC<CweBadgeProps> = ({ id, name, quickView, tooltipDescription }) => {
  const cweBadge = (
    <div style={{ display: 'inline-flex' }}>
      {quickView ? (
        <Badge
          style={{ cursor: 'pointer' }}
          bg={'light'}
          onClick={() => quickView?.setVulnQuickViewState(cweQuickViewState(id))}
          className={'mx-1'}
        >
          CWE-{id}
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
