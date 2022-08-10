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
import { Badge, NavLink } from 'react-bootstrap';
import { ChevronRight, ChevronsRight, Maximize2, Minimize2 } from 'react-feather';

import { DepChains } from '../../types';
import { Finding } from '../types';
interface TreeInfoProps {
  pkg: VulnerablePackage<Finding>;
  depChains: DepChains | undefined;
}

export const TreeInfo: React.FunctionComponent<TreeInfoProps> = ({ pkg, depChains: chains }) => {
  if (!chains) {
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

  // Show the longest chains first, a hack to make expandable double chevrons show on deduped collapsed chains. Also it looks nice
  chains.sort((a, b) => {
    return b.length - a.length;
  });
  const isDirectDep = chains.length === 1 && chains[0].length === 1;

  // We have both a collapsed and expanded mode of display
  const [isExpanded, setIsExpanded] = useState(false);

  // when chains are collapsed they can end up as dupes, so we use this to hide the dupes
  const chainDedupeSlugs: string[] = [];

  // Todo: most of the data processing logic for the chains happens IN the render. It's pretty terse, so it could happen before in a separate step
  // Also too many inline styles. Overall this needs a rewrite someday, in the mean time contact Forrest if it breaks
  return (
    <div>
      <h5 className="darker">
        {isDirectDep ? (
          <>
            Direct Dependency: <span className="lighter">{chains[0][0].range}</span>
          </>
        ) : (
          'Transitive Dependency'
        )}
        {!isDirectDep && (
          <NavLink onClick={() => setIsExpanded(!isExpanded)} style={{ display: 'inline' }}>
            {isExpanded ? <Minimize2 size="1rem" /> : <Maximize2 size="1rem" />}
          </NavLink>
        )}
      </h5>
      {!isDirectDep &&
        chains.map((chain) => {
          const visibleChain = isExpanded ? chain : [chain[0], chain[chain.length - 1]];
          const dedupeSlug = visibleChain.reduce((slug, chain) => slug + chain.release.package.name, '');
          if (chainDedupeSlugs.includes(dedupeSlug)) {
            return null;
          }
          chainDedupeSlugs.push(dedupeSlug);

          return (
            <div className="one-point-two-em d-flex pb-1 pt-1" key={JSON.stringify(chain)}>
              {visibleChain.map((dep, index) => {
                return (
                  <React.Fragment key={JSON.stringify(dep)}>
                    <div className="me-1 ms-1 d-inline-flex justify-content-center" style={{ flexDirection: 'column' }}>
                      {index !== 0 &&
                        (chain.length > visibleChain.length ? (
                          <NavLink className="p-0" onClick={() => setIsExpanded(true)} style={{ display: 'inline' }}>
                            <ChevronsRight size="1em" className="" />
                          </NavLink>
                        ) : (
                          <ChevronRight
                            size="1em"
                            className="mb-n1"
                            style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                          />
                        ))}
                      {isExpanded && <div style={{ fontSize: '.7rem' }}>{dep.range}</div>}
                    </div>
                    <Badge text="dark" bg={getBadgeColor(index, visibleChain.length)}>
                      <div>{dep.release.package.name}</div>
                      {isExpanded && (
                        <div className="mt-1" style={{ fontSize: '.7rem' }}>
                          {dep.release.version}
                        </div>
                      )}
                    </Badge>
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
