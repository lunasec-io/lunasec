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
import { Card, Col, NavLink, OverlayTrigger, Popover, Row, Tooltip } from 'react-bootstrap';
import { CopyBlock, tomorrowNight } from 'react-code-blocks';
import { Upload } from 'react-feather';
import semver from 'semver';

import { PackageManagerLink } from '../../../../../../components/PackageManagerLink';
import useBreakpoint from '../../../../../../hooks/useBreakpoint';
import { VulnerablePackage } from '../types';

import { PackageUpdatablePopOver } from './PackageUpdatablePopOver';

interface VulnerablePackageCardHeaderProps {
  ignored: boolean;
  pkg: VulnerablePackage;
  onClickUpdate: (pkg: VulnerablePackage) => Promise<void>;
}

export const VulnerablePackageCardHeader: React.FunctionComponent<VulnerablePackageCardHeaderProps> = ({
  pkg,
  ignored,
  onClickUpdate,
}) => {
  const recommendedVersion = semver.rsort([...pkg.fix_versions])[0];
  return (
    <Card.Header>
      <div className="ms-lg-2 me-lg-2">
        <Row>
          <Col sm="6">
            <Card.Title>
              <h2 className={ignored ? 'text-decoration-line-through' : ''}>{pkg.release.package.name}</h2>
            </Card.Title>
            <Card.Subtitle>
              <span className="darker">Installed: </span>
              {pkg.release.version}
              {recommendedVersion && (
                <>
                  <span className="darker">, Recommended: </span>
                  {recommendedVersion}
                </>
              )}
              <PackageUpdatablePopOver pkg={pkg} onClickUpdate={onClickUpdate} />
              <PackageManagerLink
                packageName={pkg.release.package.name}
                packageManager={pkg.release.package.package_manager}
              />
            </Card.Subtitle>
          </Col>
          <Col sm={{ span: 6 }}>
            <div className="text-sm-end">
              {pkg.severity ? (
                <>
                  <Card.Title>
                    <span className="text-right darker"> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4 className={`p-1 ${pkg.severity.toLowerCase()} text-capitalize`} style={{ display: 'inline' }}>
                        {pkg.severity}
                      </h4>
                    </div>
                  </Card.Title>
                  <Card.Subtitle>
                    {' '}
                    <span className="darker">CVSS: </span>
                    {pkg.cvss}
                    {pkg.adjustment && (
                      <span className="dot-through darker ms-1">{pkg.adjustment.adjusted_from_cvss_score}</span>
                    )}
                  </Card.Subtitle>
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    </Card.Header>
  );
};
