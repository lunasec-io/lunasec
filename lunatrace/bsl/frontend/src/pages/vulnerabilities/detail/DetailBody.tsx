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
import { Card, Col, Container, Modal, OverlayTrigger, Row, Spinner, Table, Tooltip } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { prettyDate } from '../../../utils/pretty-date';
import { VulnInfoDetails } from '../types';

import { AffectedPackagesList } from './AffectedPackagesList';

interface VulnerabilityDetailBodyProps {
  vuln: VulnInfoDetails;
  isEmbedded?: boolean;
  sideBySideView?: boolean;
}

export const VulnerabilityDetailBody: React.FunctionComponent<VulnerabilityDetailBodyProps> = ({
  isEmbedded = false,
  sideBySideView = false,
  vuln,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="vulnerability-detail-page">
        <Row>
          <Col xs="12">
            {isEmbedded ? (
              <NavLink to={`/vulnerabilities/${vuln.id}`}>
                <h1 className="link-primary">{vuln.name}</h1>
              </NavLink>
            ) : (
              <h1>{vuln.name}</h1>
            )}

            <h5>
              <a className="text-lg" href={vuln.data_source || ''}>
                <ExternalLink size="1em" className="mb-1 me-1" />
                {vuln.namespace}
              </a>
            </h5>
          </Col>
          <hr />
          <Col md={sideBySideView ? '12' : { span: 4, order: 'last' }} xs="12">
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
                <hr />
                <h4 className="">
                  Your Projects Vulnerable: <span className="lighter">{vuln.findings.length}</span>{' '}
                </h4>

                {vuln.findings.map((f) => {
                  const projectName = f.default_branch_build?.project?.name;
                  const projectId = f.default_branch_build?.project_id;
                  const buildId = f.default_branch_build?.id;
                  const buildDate = f.default_branch_build?.created_at;

                  if (!projectName || !projectId || !buildId || !buildDate) {
                    console.error('missing data to show project vulnerable', projectName, projectId, buildId);
                    return null;
                  }

                  const buildLink = `/project/${projectId}/build/${buildId}`;
                  return (
                    <div key={f.id as string}>
                      <h3>
                        {' '}
                        <NavLink key={f.id as string} to={buildLink}>
                          {projectName}
                        </NavLink>
                        <span className="darker" style={{ fontSize: '.9rem' }}>
                          {' '}
                          - as of: {prettyDate(new Date(buildDate), false)}
                        </span>
                      </h3>
                    </div>
                  );
                })}
              </Modal.Body>
            </Card>
          </Col>
          <Col md={sideBySideView ? '12' : '8'} xs="12">
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
          <AffectedPackagesList relatedVulns={vuln.related_vulnerabilities} />
        )}
      </Container>
    </>
  );
};
