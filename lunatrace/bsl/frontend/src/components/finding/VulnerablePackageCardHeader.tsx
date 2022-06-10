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
import {VulnerablePackage} from "@lunatrace/lunatrace-common/build/main";
import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

import {Finding} from "./types";

interface VulnerablePackageCardHeaderProps {
  pkg: VulnerablePackage<Finding>;
}

export const VulnerablePackageCardHeader: React.FunctionComponent<VulnerablePackageCardHeaderProps> = ({
  pkg,
}) => {
  return (
    <Card.Header>
      <Container fluid>
        <Row>
          <Col sm="6">
            <Card.Title>
              <h2>{pkg.package_name} </h2>
            </Card.Title>
            <Card.Subtitle>
              {' '}
              <span className="darker">Version: </span>
              {pkg.version}
            </Card.Subtitle>
          </Col>
          <Col sm={{ span: 6 }}>
            <div style={{ float: 'right', textAlign: 'right' }}>
              <Card.Title>
                <span className="text-right darker"> Severity: </span>
                <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                  <h4 className={`p-1 ${pkg.severity}`} style={{ display: 'inline' }}>
                    {pkg.severity}
                  </h4>
                </div>
              </Card.Title>
              {pkg.cvss_score ? (
                <Card.Subtitle>
                  {' '}
                  <span className="darker">CVSS: </span>
                  {pkg.cvss_score}
                </Card.Subtitle>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </Card.Header>
  );
};
