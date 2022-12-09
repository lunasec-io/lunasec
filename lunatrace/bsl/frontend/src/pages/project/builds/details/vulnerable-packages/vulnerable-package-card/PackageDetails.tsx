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
import semver from 'semver';

import { PackageManagerLink } from '../../../../../../components/PackageManagerLink';
import { pluralizeIfMultiple } from '../../../../../../utils/string-utils';
import { VulnerablePackage } from '../types';

import { DepChains } from './DepChains';
interface PackageDetailsProps {
  pkg: VulnerablePackage;
}

export const PackageDetails: React.FunctionComponent<PackageDetailsProps> = ({ pkg }) => {
  console.log(
    pkg.chains.map((c) => {
      c.map((d) => d.locations);
    })
  );
  return (
    <div className="mb-3">
      <Row className={'d-flex flex-row'}>
        <Col xl={6} lg={12} className={'flex-grow-1'}>
          <h5>
            <span className="darker">{pluralizeIfMultiple(pkg.paths.length, 'Path') + ': '}</span>
            {pkg.paths.map((path, index) => {
              return (
                <div key={index}>
                  {index > 0 && <br />}
                  <span className="lighter mx-1">{path}</span>
                </div>
              );
            })}
          </h5>
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
