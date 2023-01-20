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
import { AiOutlineCode } from 'react-icons/ai';

import { BuildDetailInfo } from '../../../types';
import { VulnerablePackage } from '../types';

import { Adjustment } from './Adjustment';
import { DepChains } from './DepChains';
import { LocationList } from './LocationList';

interface PackageDetailsProps {
  pkg: VulnerablePackage;
  build: BuildDetailInfo;
}

export const PackageDetails: React.FunctionComponent<PackageDetailsProps> = ({ pkg, build }) => {
  return (
    <Row className="justify-content-between mb-3">
      <Col xl={6} lg={12}>
        <Adjustment pkg={pkg} />
        <LocationList build={build} pkg={pkg} />
        {pkg.dev_only && (
          <h5>
            <AiOutlineCode className="mb-1 me-1 darker" />
            <span className="">Dev Only</span>
          </h5>
        )}
        <div>
          <span className="darker">Found in: </span>

          {pkg.paths.length === 1 ? (
            <span className="lighter">{pkg.paths[0]}</span>
          ) : (
            <>
              <ul>
                {pkg.paths.map((path, index) => {
                  return (
                    <li key={index}>
                      <span className="lighter mx-1">{path}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </Col>
      <Col xl="auto" lg={12}>
        <DepChains pkg={pkg} />
      </Col>
    </Row>
  );
};
