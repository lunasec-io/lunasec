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
import { ExternalLink } from 'react-feather';

import { linkToPathAtCommit } from '../../../../../../utils/build-display-helpers';
import { BuildDetailInfo } from '../../../types';
import { VulnerablePackage } from '../types';

interface CodeLocation {
  path: string;
  line: number;
}

interface LocationListProps {
  build: BuildDetailInfo;
  pkg: VulnerablePackage;
}

export const LocationList: React.FC<LocationListProps> = ({ build, pkg }) => {
  const locations: CodeLocation[] = [];
  pkg.chains.forEach((chain) => {
    const [_root, firstDep] = chain;
    // This should never happen since all chains should have both the project node and the root dep node, minimum
    if (!firstDep) {
      return;
    }
    firstDep.locations.forEach((l) => {
      if (!locations.some((loc) => loc.path === l.path)) {
        locations.push({ path: l.path, line: l.start_row });
      }
    });
  });

  if (locations.length === 0) {
    return null;
  }

  return (
    <>
      <span className="darker">Called from:</span>
      <ul>
        {locations.map((loc, idx) => (
          <li key={idx}>
            <span className="lighter mx-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                href={linkToPathAtCommit(build, loc.path, loc.line) || '#'}
              >
                {`${loc.path}:${loc.line}`}
              </a>{' '}
              <ExternalLink size="1em" className="mb-1 me-1" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
