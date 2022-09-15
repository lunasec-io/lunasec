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
import { getCvssVectorFromSeverities } from '@lunatrace/lunatrace-common/build/main/cvss';
import React from 'react';
import { Card, Col, Container, Modal, OverlayTrigger, Row, Spinner, Table, Tooltip } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';

import { Markdown } from '../../../components/Markdown';
import {
  formatPackageManagerUrlForPackage,
  getAffectedVersionConstraint,
  getFixedVersions,
} from '../../../utils/advisory';
import { prettyDate } from '../../../utils/pretty-date';
import { SourceLink } from '../SourceLink';
import { VulnInfoDetails } from '../types';

import { AffectedPackagesList } from './AffectedPackagesList';

interface VulnerabilityDetailBodyProps {
  vuln: VulnInfoDetails;
  isEmbedded?: boolean;
  sideBySideView?: boolean;
}

interface VulnerableProjectsList {
  vuln: VulnInfoDetails;
}

const VulnerableProjectsList: React.FunctionComponent<VulnerableProjectsList> = ({ vuln }) => {
  const projects = vuln.findings.map((f) => {
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
  });
  return (
    <div className="mb-3">
      <h4>
        Your Projects Vulnerable: <span className="lighter">{vuln.findings.length}</span>{' '}
      </h4>

      <div className="overflow-auto">{projects}</div>
    </div>
  );
};

export const VulnerabilityDetailBody: React.FunctionComponent<VulnerabilityDetailBodyProps> = ({
  isEmbedded = false,
  sideBySideView = false,
  vuln,
}) => {
  const severity = getCvssVectorFromSeverities(vuln.severities);

  return (
    <>
      <Container className="vulnerability-detail-page">
        <Row>
          <Col xs="12">
            {isEmbedded ? (
              <NavLink to={`/vulnerabilities/${vuln.id}`}>
                <h1 className="link-primary">{vuln.source_id}</h1>
              </NavLink>
            ) : (
              <h1>{vuln.source_id}</h1>
            )}

            <h5>
              <SourceLink source={vuln.source} sourceId={vuln.source_id} />
            </h5>
          </Col>
          <hr />
          <Col md={sideBySideView ? '12' : { span: 4, order: 'last' }} xs="12">
            <Card style={{ height: '90%' }}>
              <Modal.Header>
                <Modal.Title>
                  <span className="darker "> Severity: </span>
                  <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                    {severity ? (
                      <h4
                        className={`${severity.cvss3OverallSeverityText} text-capitalize`}
                        style={{ display: 'inline' }}
                      >
                        {severity.cvss3OverallSeverityText}
                      </h4>
                    ) : (
                      <h4 style={{ display: 'inline' }}>unknown</h4>
                    )}
                  </div>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body className="cvss-scores">
                {severity ? (
                  <>
                    <div>
                      <h2 className="d-inline-block"> {severity.overallScore} </h2>{' '}
                      <h6 className="d-inline-block darker">/ 10 overall CVSS</h6>
                    </div>

                    <div>
                      <h5 className="d-inline-block">{severity.impactSubscore.toFixed(1)}</h5>
                      <span className="darker"> impact score</span>
                    </div>
                    <div>
                      <h5 className="d-inline-block">{severity.exploitabilitySubscore.toFixed(1)}</h5>
                      <span className="darker"> exploitability score</span>
                    </div>
                  </>
                ) : (
                  <span>No CVSS score</span>
                )}
                <hr />
                <VulnerableProjectsList vuln={vuln} />
              </Modal.Body>
            </Card>
          </Col>
          <Col md={sideBySideView ? '12' : '8'} xs="12">
            <Card>
              <Card.Header>
                <Modal.Title className="darker d-inline">Summary: </Modal.Title>
                <span className="lighter">{vuln.summary}</span>
              </Card.Header>
              <Modal.Body>
                <Markdown markdown={vuln.details || ''}></Markdown>
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
                    {vuln.affected.map((affected) => {
                      const getPackageColumn = () => {
                        const packageName = affected.package?.name;
                        const nameOverflow = packageName && packageName.length > 41 ? '...' : '';
                        const formattedPackageName = packageName?.substring(0, 40) || '';
                        const formattedName = formattedPackageName + nameOverflow;

                        const packageManager = affected.package?.package_manager;
                        if (packageName && packageManager) {
                          const packageManagerLink = formatPackageManagerUrlForPackage(packageManager, packageName);
                          if (packageManagerLink === null) {
                            return <>{formattedName}</>;
                          }
                          return (
                            <>
                              {formattedName} -
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                href={packageManagerLink}
                                className="m-1"
                              >
                                <ExternalLink size="1em" className="mb-1 me-1" />
                                {packageManager}
                              </a>
                            </>
                          );
                        }
                        return <>{formattedName}</>;
                      };

                      const fixedVersions = getFixedVersions(affected);

                      return (
                        <tr key={affected.id}>
                          <td className="lighter">{getPackageColumn()}</td>
                          <td>{getAffectedVersionConstraint(affected) || '>= 0.0.0'}</td>
                          <td>{fixedVersions.length > 0 ? 'fixed' : 'not fixed'}</td>
                          <td>{fixedVersions}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {vuln.equivalents.length < 1 ? null : <AffectedPackagesList relatedVulns={vuln.equivalents} />}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Links</Card.Title>
                {vuln.references.map((r) => {
                  const url = new URL(r.url);
                  return (
                    <p key={r.id}>
                      {/*TODO: make this type an icon, the types are "'advisory'|'article'|'fix'|'git'|'package'|'report'|'web'"*/}
                      <span className="text-capitalize">{r.type}</span>:{' '}
                      <NavLink className="text-clear darker" to={r.url}>
                        {' '}
                        {url.protocol}
                        <span className="lighter font-weight-bold">{url.host}</span>
                        {url.pathname}
                      </NavLink>
                    </p>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
