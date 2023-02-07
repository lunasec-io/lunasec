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
import { skipToken } from '@reduxjs/toolkit/query/react';
import React from 'react';
import { Card, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { ExternalLink } from 'react-feather';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import api from '../../../api';
import CisaLogo from '../../../assets/cisa_logo.png';
import { Markdown } from '../../../components/Markdown';
import { PackageManagerLink } from '../../../components/PackageManagerLink';
import { LinkInNewTab } from '../../../components/utils/LinkInNewTab';
import { useUser } from '../../../hooks/useUser';
import { getAffectedVersionConstraint, getFixedVersions } from '../../../utils/advisory';
import { formatPackageName } from '../../../utils/package';
import { prettyDate } from '../../../utils/pretty-date';
import { SourceLink } from '../SourceLink';
import { Findings, VulnInfoDetails } from '../types';

import { CweBadge } from './CweBadge';
import { EquivalentVulnerabilitiesList } from './EquivalentVulnerabilitiesList';

interface VulnerabilityDetailBodyProps {
  vuln: VulnInfoDetails;
  isEmbedded?: boolean;
  sideBySideView?: boolean;
}

interface VulnerableProjectsList {
  findings: Findings | undefined | null;
}

// TODO: Move this to its own file, having multiple components jammed into the same file is bad
const VulnerableProjectsList: React.FunctionComponent<VulnerableProjectsList> = ({ findings }) => {
  if (!findings) {
    return null;
  }
  const projects = findings.map((f) => {
    const projectName = f.latest_default_build?.project?.name;
    const projectId = f.latest_default_build?.project_id;
    const buildId = f.latest_default_build?.id;
    const buildDate = f.latest_default_build?.created_at;

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
        Your Projects Vulnerable: <span className="lighter">{findings.length}</span>{' '}
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
  //get findings if logged in
  const { user } = useUser();
  const { data: findingDetails } = api.useGetVulnerabilityFindingsQuery(
    user ? { vulnerability_id: vuln.id } : skipToken
  );
  const findings = findingDetails ? findingDetails.vulnerability_by_pk?.findings : null;

  const severity = getCvssVectorFromSeverities(vuln.severities);

  function buildUrlIfPossible(urlString: string): URL | null {
    try {
      return new URL(urlString);
    } catch {
      return null;
    }
  }

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
          <Col md={sideBySideView ? '12' : '8'} xs="12">
            <Card>
              <Card.Header>
                <Modal.Title className="darker d-inline">Summary: </Modal.Title>
                <span className="lighter">{vuln.summary}</span>
              </Card.Header>
              <Modal.Body>
                {vuln.cisa_known_vuln?.id && (
                  <h2 className="mb-4">
                    <img src={CisaLogo} alt="cisa-logo"></img> Cisa Known Exploited Vulnerability{' '}
                    <LinkInNewTab href="https://www.mainstream-tech.com/cisa/">
                      {' '}
                      <AiOutlineQuestionCircle className="mb-1" />
                    </LinkInNewTab>
                  </h2>
                )}
                <Markdown markdown={vuln.details || ''}></Markdown>
              </Modal.Body>
              <Card.Footer>
                <h5 className={'darker'}>Vulnerability Categories</h5>
                <div>
                  {vuln.cwes.map((c) => (
                    <CweBadge key={c.id} id={c.cwe.id} name={c.cwe.name} />
                  ))}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={sideBySideView ? '12' : { span: 4 }} xs="12">
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
                      <h4 style={{ display: 'inline' }}>{vuln.severity_name}</h4>
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
                    {vuln.epss_percentile && (
                      <div>
                        <h5 className="d-inline-block">{Math.round(vuln.epss_percentile * 100)}%</h5>
                        <span className="darker"> EPSS Score</span>
                        <LinkInNewTab href="https://www.lunasec.io/docs/blog/what-is-epss/">
                          {' '}
                          <AiOutlineQuestionCircle className="mb-1" />
                        </LinkInNewTab>
                      </div>
                    )}
                  </>
                ) : (
                  <span>No CVSS score</span>
                )}
                <hr />
                <VulnerableProjectsList findings={findings} />
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
                        const packageManager = affected.package?.package_manager;
                        const formattedName = formatPackageName(packageName);

                        if (packageName && packageManager) {
                          return (
                            <>
                              <>{formattedName}</>
                              <PackageManagerLink packageName={packageName} packageManager={packageManager} />
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
        {vuln.equivalents.length < 1 ? null : <EquivalentVulnerabilitiesList relatedVulns={vuln.equivalents} />}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Links</Card.Title>
                {vuln.references.map((reference) => {
                  const url = buildUrlIfPossible(reference.url);
                  if (!url) {
                    return;
                  }
                  return (
                    <p key={reference.id}>
                      {/*TODO: make this into an icon, the types are "'advisory'|'article'|'fix'|'git'|'package'|'report'|'web'"*/}
                      <span className="text-capitalize">{reference.type}</span>:{' '}
                      <a className="text-clear darker" href={reference.url}>
                        <ExternalLink size="1em" className="mb-1 me-1" /> {url.protocol}
                        {'//'}
                        <span className="lighter font-weight-bold">{url.host}</span>
                        {url.pathname}
                      </a>
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
