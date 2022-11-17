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
  const recommendedVersion = semver.rsort([...pkg.fix_versions])[0];

  return (
    <div className="mb-3">
      {recommendedVersion && (
        <Row>
          <h5>
            <span className="darker">Recommended version: </span>
            {recommendedVersion}
          </h5>
        </Row>
      )}
      <Row>
        <Col xl={6} lg={12}>
          <h5>
            <span className="darker">{pluralizeIfMultiple(pkg.paths.length, 'Path') + ': '}</span>
            <span className="lighter mx-1">{pkg.paths}</span>
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
