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
import { VulnerablePackage } from '@lunatrace/lunatrace-common';
import React, { useState } from 'react';
import { Badge, Col, NavLink, Row } from 'react-bootstrap';
import { ChevronRight, ChevronsRight, Maximize2 } from 'react-feather';

import { DepTree } from '../../types';
import { Finding } from '../types';
interface TreeInfoProps {
  pkg: VulnerablePackage<Finding>;
  depTree: DepTree | null;
}

export const TreeInfo: React.FunctionComponent<TreeInfoProps> = ({ pkg, depTree }) => {
  if (!depTree) {
    return null;
  }
  // Determines if the package is the start, the middle, or the target package and then colors them appropriately
  const getBadgeColor = (depIndex: number, chainLength: number) => {
    if (depIndex === chainLength - 1) {
      return 'success';
    }
    if (depIndex === 0) {
      return 'primary';
    }
    return 'light';
  };

  const chains = depTree.showDependencyChainsOfPackage(pkg.package_name, pkg.version);
  const isDirectDep = chains.length === 1 && chains[0].length === 1;

  // We have both a collapsed and expanded mode of display
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Row className="package-trees">
      <Col>
        <h5 className="darker">
          {isDirectDep ? 'Direct Dependency' : 'Transitive Dependency'}
          {!isDirectDep && (
            <NavLink onClick={() => setIsExpanded(!isExpanded)} style={{ display: 'inline' }}>
              <Maximize2 size="1rem" />
            </NavLink>
          )}
        </h5>
        {!isDirectDep &&
          chains.map((chain) => {
            const visibleChain = isExpanded ? chain : [chain[0], chain[chain.length - 1]];
            return (
              <div className="mb-1" key={JSON.stringify(chain)}>
                {visibleChain.map((dep, index) => {
                  const isLast = index === visibleChain.length - 1;
                  return (
                    <React.Fragment key={JSON.stringify(dep)}>
                      <Badge text="dark" bg={getBadgeColor(index, visibleChain.length)}>
                        <div>{dep.release.package.name}</div>
                        {isExpanded && <div style={{ fontSize: '.7rem' }}>{dep.release.version}</div>}
                      </Badge>
                      {!isLast && chain.length > visibleChain.length && <ChevronsRight size="1em" className="" />}
                      {!isLast && chain.length === visibleChain.length && <ChevronRight size="1em" className="" />}
                    </React.Fragment>
                  );
                })}
                {/*<Badge bg="success">{pkg.package_name}</Badge>*/}
              </div>
            );
          })}
      </Col>
    </Row>
  );
};
