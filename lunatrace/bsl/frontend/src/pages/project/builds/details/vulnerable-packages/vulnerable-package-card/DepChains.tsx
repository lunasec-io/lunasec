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
import React, { useState } from 'react';
import { NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CheckCircle, Maximize2, Minimize2 } from 'react-feather';

import 'react-perfect-scrollbar/dist/css/styles.css';
import { Analysis_Finding_Type_Enum } from '../../../../../../api/generated';
import { LinkInNewTab } from '../../../../../../components/utils/LinkInNewTab';
import { Chain, VulnerablePackage } from '../types';

import { ChainDep } from './ChainDep';
interface TreeInfoProps {
  pkg: VulnerablePackage;
}

export const DepChains: React.FunctionComponent<TreeInfoProps> = ({ pkg }) => {
  // Show the longest chains first, a hack to make expandable double chevrons show on deduped collapsed chains. Also it looks nice
  const chains = [...pkg.chains].sort((a, b) => {
    return b.length - a.length;
  });
  const isDirectDep = chains.length === 1 && chains[0].length === 1;

  // We have both a collapsed and expanded mode of display
  const [isExpanded, setIsExpanded] = useState(false);

  // when chains are collapsed they can end up as dupes, so we use this to hide the dupes
  const chainDedupeSlugs: string[] = [];

  const getVisibleChain = (chain: Chain) => {
    if (isExpanded || chain.length === 0) {
      return chain;
    }
    return [chain[0], chain[chain.length - 1]];
  };

  // Todo: most of the data processing logic for the chains happens IN the render. It's pretty terse, so it could happen before in a separate step
  // Also too many inline styles. Overall this needs a rewrite someday, in the mean time contact Forrest if it breaks
  return (
    <div style={{ maxHeight: '800px' }} className="overflow-auto pretty-scroll">
      <h5 className="darker">
        {isDirectDep ? (
          <>
            Direct Dependency: <span className="lighter">{chains[0][0].range}</span>
          </>
        ) : (
          'Transitive Dependency Analysis'
        )}
        {!isDirectDep && chains.length > 0 && (
          <NavLink onClick={() => setIsExpanded(!isExpanded)} style={{ display: 'inline' }}>
            {isExpanded ? <Minimize2 size="1rem" /> : <Maximize2 size="1rem" />}
          </NavLink>
        )}
      </h5>
      {!isDirectDep &&
        chains.map((chain) => {
          const visibleChain = getVisibleChain(chain);
          const dedupeSlug = visibleChain.reduce((slug, chain) => slug + chain.release.package.name, '');
          if (chainDedupeSlugs.includes(dedupeSlug)) {
            return null;
          }
          chainDedupeSlugs.push(dedupeSlug);

          /*
           * since we might not have results for every edge in the dependency chain, we are collecting all the
           * indexes where a dependency is not reachable in the chain, and then letting that affect the display
           * of the rest of the chain (dependencies used further in the chain are not reachable if an index earlier
           * in the list was observed as not reachable).
           */
          const notReachableIndexes: number[] = [];
          chain.forEach((dep, idx) => {
            if (dep.reachable === Analysis_Finding_Type_Enum.NotVulnerable) {
              notReachableIndexes.push(idx);
            }
          });

          const vulnerabilityIsReachable = notReachableIndexes.length === 0;
          const chainTooltipMsg = vulnerabilityIsReachable
            ? 'All dependencies in the vulnerable chain are imported and called. Vulnerability is likely to be relevant.'
            : 'A continuous "imported and called" chain was not found. Vulnerability may not be relevant.';

          const chainHasBeenAnalyzed = !chain.some((d) => d.reachable === Analysis_Finding_Type_Enum.Error);

          return (
            <div key={dedupeSlug}>
              <div className="one-point-two-em d-flex pb-1 pt-1">
                {visibleChain.map((dep, index) => {
                  const depIsReachable = !notReachableIndexes.some((i) => i < index);
                  return (
                    <ChainDep
                      key={dep.id}
                      index={index}
                      dep={dep}
                      isExpanded={isExpanded}
                      chainLength={chain.length}
                      visibleChainLength={visibleChain.length}
                      setIsExpanded={setIsExpanded}
                      depIsReachable={depIsReachable}
                    />
                  );
                })}
                <div className="me-1 ms-1 d-inline-flex justify-content-center" style={{ flexDirection: 'column' }}>
                  {chainHasBeenAnalyzed && (
                    <OverlayTrigger
                      delay={{ hide: 2000, show: 0 }}
                      placement={'top'}
                      overlay={(
                        <Tooltip>
                          {chainTooltipMsg}{' '}
                          <LinkInNewTab href="https://www.lunasec.io/docs/pages/lunatrace/features/static-analysis/#reachability-analysis">
                            See Documentation
                          </LinkInNewTab>
                        </Tooltip>
                      )}
                    >
                      <CheckCircle
                        className={classNames([
                          'mb-1',
                          'me-1',
                          vulnerabilityIsReachable ? 'text-success' : 'text-warning',
                        ])}
                        size="1em"
                      />
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
