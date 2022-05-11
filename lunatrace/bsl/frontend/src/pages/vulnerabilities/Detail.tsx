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
import { Card, Col, Container, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../api';
import { CvssInferredWarning } from '../../components/CvssInferredWarning';
import { SpinIfLoading } from '../../components/SpinIfLoading';
export const VulnerabilityDetail: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { vulnerability_id } = useParams();
  const { data, isFetching } = api.useGetVulnerabilityDetailsQuery({ vulnerability_id });

  const renderVulnDetails = () => {
    if (!data) {
      return null;
    }
    const vuln = data.vulnerabilities[0];

    return (
      <>
        <Helmet title={vuln.name} />
        <Container className="vulnerability-detail-page">
          <Row>
            <Col xs="12">
              <h1>{vuln.name}</h1>

              <h5>
                <a className="text-lg" href={vuln.data_source || ''}>
                  <ExternalLink size="1em" className="mb-1 me-1" />
                  {vuln.namespace}
                </a>
              </h5>
            </Col>
            <hr />
            <Col md={{ span: 4, order: 'last' }} xs="12">
              <Card style={{ height: '90%' }}>
                <Modal.Header>
                  <Modal.Title>
                    <span className="darker "> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4 className={`${vuln.severity}`} style={{ display: 'inline' }}>
                        {vuln.severity}
                      </h4>
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body className="cvss-scores">
                  {vuln.cvss_score ? (
                    <>
                      <div>
                        <h2 className="d-inline-block"> {vuln.cvss_score} </h2>{' '}
                        <h6 className="d-inline-block darker">/ 10 overall CVSS v.{vuln.cvss_version}</h6>
                      </div>

                      <div>
                        <h5 className="d-inline-block">{vuln.cvss_impact_score}</h5>
                        <span className="darker"> impact score</span>
                      </div>
                      <div>
                        <h5 className="d-inline-block">{vuln.cvss_exploitability_score}</h5>
                        <span className="darker"> exploitability score</span>
                      </div>
                    </>
                  ) : (
                    <span>No CVSS score</span>
                  )}
                </Modal.Body>
              </Card>
            </Col>
            <Col md="8" xs="12">
              <Card>
                <Modal.Header>
                  <Modal.Title className="darker">Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="lighter">{vuln.description}</p>
                  <hr />
                  <p>Relevant links:</p>
                  {(vuln.urls as string[]).map((l) => (
                    <p key={l}>
                      <a href={l}> {l} </a>
                    </p>
                  ))}
                </Modal.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <Card>
                <Card.Body>
                  <Card.Title>Affected Packages</Card.Title>{' '}
                  <Table>
                    <thead>
                      <tr>
                        <th>Package</th>
                        <th>Version</th>
                        <th>Fix State</th>
                        <th>Fix Versions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vuln.vulnerability_packages.map((pkg) => {
                        return pkg.package_versions.map((v) => {
                          return (
                            <tr key={v.id}>
                              <td className="lighter">
                                {pkg.name?.substring(0, 40)}
                                {pkg.name && pkg.name.length > 41 ? '...' : ''}
                                {/*  TODO: Make these show full name in a tooltip when truncated*/}
                              </td>
                              <td>{v.version_constraint}</td>
                              <td>{v.fix_state}</td>
                              <td>{v.fixed_in_versions}</td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {vuln.related_vulnerabilities.length < 1 ? null : (
            <Row>
              <Col xs="12">
                <Card>
                  <Card.Body>
                    <Card.Title>Related Vulnerabilities</Card.Title>
                    <Table size="sm" hover>
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>Vulnerability Number</th>
                          <th>Severity</th>
                          <th>CVSS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vuln.related_vulnerabilities.map(({ vulnerability: relatedVuln }) => {
                          return (
                            <OverlayTrigger
                              placement="bottom"
                              overlay={<Tooltip className="wide-tooltip"> {relatedVuln.description}</Tooltip>}
                              key={relatedVuln.id}
                            >
                              <tr
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/vulnerabilities/${relatedVuln.id as string}`)}
                              >
                                <td>{relatedVuln.namespace}</td>
                                <td>{relatedVuln.name}</td>
                                <td>{relatedVuln.severity}</td>
                                <td>
                                  {relatedVuln.cvss_score}{' '}
                                  <CvssInferredWarning inferred={relatedVuln.cvss_inferred || false} placement="top" />
                                </td>
                              </tr>
                            </OverlayTrigger>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
        {/*<Row>*/}
        {/*  <Col xs="12" sm={{ order: 'last', span: 5, offset: 4 }}>*/}
        {/*    <h6 style={{ textAlign: 'right' }}>*/}
        {/*      <span className="darker"> Last scanned:</span> {lastScannedDate}*/}
        {/*    </h6>*/}
        {/*    <h6 style={{ textAlign: 'right' }}>*/}
        {/*      <span className="darker">*/}
        {/*        Scanned {build.scans_aggregate.aggregate?.count} time*/}
        {/*        {build.scans_aggregate.aggregate?.count !== 1 ? 's' : ''}*/}
        {/*      </span>*/}
        {/*    </h6>*/}
        {/*  </Col>*/}
        {/*  <Col xs="12" sm="3">*/}
        {/*    <div className="build-git-info">*/}
        {/*      <h6>*/}
        {/*        <span className="darker">Branch: </span> master*/}
        {/*      </h6>*/}
        {/*      <h6>*/}
        {/*        <span className="darker">Commit: </span> 1231adf... ↪*/}
        {/*      </h6>*/}
        {/*      <h6>*/}
        {/*        <span className="darker">{capitalizeFirstLetter(firstScan.source_type)}:</span> {firstScan.target}*/}
        {/*      </h6>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<hr />*/}
        {/*<VulnerablePackageList findings={build.findings} />*/}
      </>
    );
  };

  return (
    <Container className="vuln-page">
      <SpinIfLoading isLoading={isFetching}>{renderVulnDetails()}</SpinIfLoading>
    </Container>
  );
};
