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
import { Col, Row } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';
import { AiOutlineCode } from 'react-icons/ai';
import semver from 'semver';

import { Builds } from '../../../../../../api/generated';
import { PackageManagerLink } from '../../../../../../components/PackageManagerLink';
import { linkToPathAtCommit } from '../../../../../../utils/build-display-helpers';
import { pluralizeIfMultiple } from '../../../../../../utils/string-utils';
import { BuildDetailInfo } from '../../../types';
import { VulnerablePackage } from '../types';

import { DepChains } from './DepChains';

interface CodeLocation {
  path: string;
  line: number;
}

interface LocationListProps {
  build: BuildDetailInfo;
  locations: CodeLocation[];
}

const LocationList: React.FC<LocationListProps> = ({ build, locations }) => {
  if (locations.length === 0) {
    return null;
  }

  return (
    <>
      <span className="darker">Locations:</span>
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
                {loc.path}
              </a>{' '}
              <ExternalLink size="1em" className="mb-1 me-1" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

interface PackageDetailsProps {
  pkg: VulnerablePackage;
  build: BuildDetailInfo;
}

export const PackageDetails: React.FunctionComponent<PackageDetailsProps> = ({ pkg, build }) => {
  const locations: CodeLocation[] = [];
  pkg.chains.forEach((c) => {
    c.forEach((dep, idx) => {
      // Only show the first party code locations. Anything > 1 is deeper in the chain.
      if (idx > 1) {
        return;
      }

      dep.locations.forEach((l) => {
        if (!locations.some((loc) => loc.path === l.path)) {
          locations.push({ path: l.path, line: l.start_row });
        }
      });
    });
  });

  return (
    <div className="mb-3">
      <Row className={'d-flex flex-row'}>
        <Col xl={6} lg={12} className={'flex-grow-1'}>
          <div>
            <span className="darker">{pluralizeIfMultiple(pkg.paths.length, 'Path') + ': '}</span>
            <ul>
              {pkg.paths.map((path, index) => {
                return (
                  <li key={index}>
                    {index > 0 && <br />}
                    <span className="lighter mx-1">{path}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <LocationList build={build} locations={locations} />
          {pkg.dev_only && (
            <h5>
              <AiOutlineCode className="mb-1 me-1 darker" />

              <span className="">Dev Only</span>
            </h5>
          )}
        </Col>
        <Col xl="auto" lg={12} className="justify-content-xl-end d-flex">
          <DepChains pkg={pkg} />
        </Col>
      </Row>
    </div>
  );
};
