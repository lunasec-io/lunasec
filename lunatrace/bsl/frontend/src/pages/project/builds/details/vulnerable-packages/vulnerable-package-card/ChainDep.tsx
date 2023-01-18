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
import classNames from 'classnames';
import React from 'react';
import { Badge, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ChevronRight, ChevronsRight, X } from 'react-feather';

import { Analysis_Finding_Type_Enum } from '../../../../../../api/generated';
import { ChainDepType } from '../types';

interface DepProps {
  index: number;
  dep: ChainDepType;
  isExpanded: boolean;
  chainLength: number;
  visibleChainLength: number;
  setIsExpanded: (expanded: boolean) => void;
  depIsReachable: boolean;
}

// Determines if the package is the start, the middle, or the target package and then colors them appropriately
const getBadgeColor = (depIndex: number, chainLength: number, reachable: string) => {
  if (!reachable) {
    return 'light';
  }
  if (depIndex === chainLength - 1) {
    return 'success';
  }
  if (depIndex === 0) {
    return 'primary';
  }
  return 'light';
};

export const ChainDep: React.FunctionComponent<DepProps> = ({
  index,
  dep,
  isExpanded,
  chainLength,
  visibleChainLength,
  setIsExpanded,
  depIsReachable,
}) => {
  const dependencyEdgeClassNames = ['mb-n1', !depIsReachable && 'text-warning'];

  const dependencyEdgeNotReachable = (
    <OverlayTrigger
      placement={'top'}
      overlay={<Tooltip>No instances found of {dep.release.package.name} being used.</Tooltip>}
    >
      <X
        size="1em"
        className="mb-n1 text-warning"
        style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
      />
    </OverlayTrigger>
  );

  const edgeIsReachableTooltip =
    dep.reachable === Analysis_Finding_Type_Enum.Unknown || dep.reachable === Analysis_Finding_Type_Enum.Vulnerable
      ? `${dep.release.package.name} was used by the parent package.`
      : `${dep.release.package.name} has not been analyzed for reachability.`;

  const depedencyEdgeIsReachable = (
    <OverlayTrigger placement={'top'} overlay={<Tooltip>{edgeIsReachableTooltip}</Tooltip>}>
      <ChevronRight
        size="1em"
        className={classNames(dependencyEdgeClassNames)}
        style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
      />
    </OverlayTrigger>
  );

  const dependencyEdgeIcon =
    dep.reachable === Analysis_Finding_Type_Enum.NotVulnerable ? dependencyEdgeNotReachable : depedencyEdgeIsReachable;

  return (
    <React.Fragment key={dep.id}>
      <div className="me-1 ms-1 d-inline-flex justify-content-center" style={{ flexDirection: 'column' }}>
        {index !== 0 &&
          (chainLength > visibleChainLength ? (
            <NavLink className="p-0" onClick={() => setIsExpanded(true)} style={{ display: 'inline' }}>
              <ChevronsRight size="1em" className="" />
            </NavLink>
          ) : (
            dependencyEdgeIcon
          ))}
        {isExpanded && index !== 0 && <div style={{ fontSize: '.7rem' }}>{dep.range}</div>}
      </div>
      <Badge text="dark" bg={getBadgeColor(index, visibleChainLength, dep.reachable)}>
        <div>{dep.release.package.name}</div>
        {isExpanded && (
          <div className="mt-1" style={{ fontSize: '.7rem' }}>
            {dep.release.version}
          </div>
        )}
      </Badge>
    </React.Fragment>
  );
};
