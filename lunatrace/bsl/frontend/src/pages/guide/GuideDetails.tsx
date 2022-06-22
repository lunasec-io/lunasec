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
import { Card, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FiAlertOctagon, FiInfo, FiTag, FiTerminal } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import { ConditionallyRender } from '../../components/utils/ConditionallyRender';
import { LinkInNewTab } from '../../components/utils/LinkInNewTab';
import { prettyDate } from '../../utils/pretty-date';

import { GuideBody } from './GuideBody';
import { GuideDetailsData } from './types';

const packageFixedString = (fixed: boolean | undefined) => {
  if (fixed === true) {
    return 'Yes';
  }
  if (fixed === false) {
    return 'No';
  }
  return 'Unknown';
};

export const GuideDetails: React.FC<{ guide: GuideDetailsData }> = ({ guide }) => {
  const meta = guide.metadata;

  // This is kind of a too-fancy way to dedupe something, but I wanted to try it
  const languageList = new Set<string>();
  meta.packages.forEach((p) => {
    languageList.add(p.language);
  });

  const languageElements = Array.from(languageList).map((language, n) => {
    return (
      <span key={language}>
        {n > 0 && ', '}
        {language}
      </span>
    );
  });

  const cweElements = meta.cwe.map((cwe, n) => {
    return (
      <React.Fragment key={cwe.number}>
        {n > 0 && <span>, </span>}
        <LinkInNewTab href={`https://cwe.mitre.org/data/definitions/${cwe.number}.html`}>{cwe.name}</LinkInNewTab>
      </React.Fragment>
    );
  });

  return (
    <>
      <Helmet title={guide.title} />
      <Container className="guide-detail-page">
        <Row className="mb-n4">
          <h1>{guide.title}</h1>
          <h4 className="text-capitalize darker">
            {languageElements} {languageElements.length > 0 && cweElements.length > 0 && ' - '} {cweElements}
          </h4>

          <hr />

          <Col md={12}>
            <Card style={{ height: '90%' }}>
              <Card.Header>
                <Row>
                  <Col md="4">
                    <Modal.Title>
                      {' '}
                      <h4 className="mt-1 darker">Summary</h4>
                    </Modal.Title>
                  </Col>
                  <Col md="4" className="text-md-center">
                    <span>{prettyDate(new Date(guide.created_at))}</span>
                  </Col>
                  <Col md="4" className="text-md-end">
                    <span className="darker "> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4 className={`${guide.severity}`} style={{ display: 'inline' }}>
                        {guide.severity}
                      </h4>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <p>
                  <span className="lighter">{guide.summary}</span>
                </p>
                <ConditionallyRender if={meta.tags && meta.tags.length > 0}>
                  <p>
                    <FiTag className="mb-1 me-1" /> Tags:{' '}
                    <span className="text-capitalize lighter">{meta.tags.join(', ')}</span>
                  </p>
                </ConditionallyRender>
                <ConditionallyRender if={meta.advisories && meta.advisories.length > 0}>
                  <p>
                    <FiInfo className="mb-1 me-1" /> Advisories:{' '}
                    {meta.advisories.map((advisory, n) => {
                      return [
                        n > 0 && ', ',
                        <NavLink key={advisory.url} to={advisory.url}>
                          {advisory.name}
                        </NavLink>,
                      ];
                    })}
                  </p>
                </ConditionallyRender>
                <ConditionallyRender if={meta.tools && meta.tools.length > 0}>
                  <p>
                    <FiTerminal className="mb-1 me-1" /> Useful Tools:{' '}
                    {meta.tools.map((tool, n) => {
                      return [
                        n > 0 && ', ',
                        <NavLink key={tool.link} to={tool.link}>
                          {tool.name}
                        </NavLink>,
                      ];
                    })}
                  </p>
                </ConditionallyRender>

                <p>
                  <FiAlertOctagon className="mb-1 me-1" /> CVEs:{' '}
                  {guide.guide_vulnerabilities.map(({ vulnerability }, n) => {
                    return [
                      n > 0 && ', ',
                      <NavLink key={vulnerability.id} to={`/vulnerabilities/${vulnerability.id}`}>
                        {/*{vulnerability.namespace}:{vulnerability.name}*/}
                        {vulnerability.source}
                      </NavLink>,
                    ];
                  })}
                </p>
              </Card.Body>
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
                      <th>Fixed</th>
                      <th>Fix Versions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meta.packages.map((pkg) => {
                      return (
                        <tr key={pkg.purl}>
                          <td className="lighter">
                            {pkg.name?.substring(0, 40)}
                            {pkg.name && pkg.name.length > 41 ? '...' : ''}
                            {/*  TODO: Make these show full name in a tooltip when truncated*/}
                          </td>
                          <td>{pkg.versionConstraint}</td>
                          <td>{packageFixedString(pkg.fixed)}</td>
                          <td>{pkg.fixVersion}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <GuideBody markdown={guide.body}></GuideBody>
      </Container>
    </>
  );
};
