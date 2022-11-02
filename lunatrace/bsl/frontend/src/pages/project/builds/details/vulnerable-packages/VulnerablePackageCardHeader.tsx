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
import { FcUpload } from 'react-icons/fc';

import useBreakpoint from '../../../../../hooks/useBreakpoint';

import { VulnerablePackage } from './types';

interface VulnerablePackageCardHeaderProps {
  ignored: boolean;
  pkg: VulnerablePackage;
}

export const VulnerablePackageCardHeader: React.FunctionComponent<VulnerablePackageCardHeaderProps> = ({
  pkg,
  ignored,
}) => {
  const renderUpdatableStatus = () => {
    const trivialUpdateStatus = pkg.trivially_updatable;

    if (!trivialUpdateStatus || trivialUpdateStatus === 'no') {
      return null;
    }

    const renderToolTip = (props: React.ComponentProps<typeof Tooltip>) => {
      return (
        <Popover className="vulnerablePackage-update-popover" {...props}>
          <Popover.Header>Trivially Updatable</Popover.Header>
          <Popover.Body>
            A fix is available within the semver range this package was requested with, meaning that the{' '}
            <strong>project lockfile</strong> is probably the only thing constraining the package to the vulnerable
            version.
            <hr className="m-1" />
            This command will update the package:
            <CopyBlock
              text={`npm update ${pkg.release.package.name}`}
              language="bash"
              showLineNumbers={false}
              startingLineNumber={false}
              theme={tomorrowNight}
              codeBlock
            />
            or for Yarn:
            <CopyBlock
              text={`yarn upgrade ${pkg.release.package.name}`}
              language="bash"
              showLineNumbers={false}
              startingLineNumber={false}
              theme={tomorrowNight}
              codeBlock
            />
          </Popover.Body>
        </Popover>
      );
    };

    const mdOrLarger = useBreakpoint('md');
    return (
      <>
        {', '}
        <OverlayTrigger trigger="click" rootClose placement={mdOrLarger ? 'right' : 'bottom'} overlay={renderToolTip}>
          <NavLink className="primary-color d-inline m-0 p-0">
            {trivialUpdateStatus === 'partially' ? 'partially ' : ''}updatable
            <FcUpload color="black" className="pb-1" />
          </NavLink>
        </OverlayTrigger>
      </>
    );
  };
  return (
    <Card.Header>
      <div className="ms-lg-4 me-lg-4">
        <Row>
          <Col sm="6">
            <Card.Title>
              <h2 className={ignored ? 'text-decoration-line-through' : ''}>{pkg.release.package.name}</h2>
            </Card.Title>
            <Card.Subtitle>
              <span className="darker">Version: </span>
              {pkg.release.version}
              {renderUpdatableStatus()}
            </Card.Subtitle>
          </Col>
          <Col sm={{ span: 6 }}>
            <div className="text-sm-end">
              {pkg.severity ? (
                <>
                  <Card.Title>
                    <span className="text-right darker"> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4 className={`p-1 ${pkg.severity} text-capitalize`} style={{ display: 'inline' }}>
                        {pkg.severity}
                      </h4>
                    </div>
                  </Card.Title>
                  <Card.Subtitle>
                    {' '}
                    <span className="darker">CVSS: </span>
                    {pkg.cvss}
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
