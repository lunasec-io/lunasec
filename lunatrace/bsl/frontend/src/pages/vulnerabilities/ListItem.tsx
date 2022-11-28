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
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { prettyDate } from '../../utils/pretty-date';
import { toTitleCase } from '../../utils/string-utils';

import { SourceLink } from './SourceLink';
import { VulnInfo } from './types';

interface VulnerabilityListItemProps {
  vuln: VulnInfo;
}

export const VulnerabilityListItem: React.FunctionComponent<VulnerabilityListItemProps> = ({ vuln }) => {
  const packageNamesString = vuln.affected
    .filter((p) => !!p.package)
    .map((p) => p.package?.name)
    .join(', ');
  const navigate = useNavigate();

  const severity = getCvssVectorFromSeverities(vuln.severities);

  const renderCvssScore = () => {
    if (!severity) {
      return null;
    }
    return (
      <>
        <span>
          CVSS: <h3>{severity.overallScore}</h3>
        </span>
      </>
    );
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/vulnerabilities/${vuln.id as string}`)}
        className="flex-fill w-100 vulnerability clickable-card"
      >
        <Card.Header>
          <Container fluid>
            <Row>
              <Col sm="6">
                <Card.Title>
                  <h3>{vuln.source_id}</h3>
                </Card.Title>
                <Card.Subtitle>
                  <SourceLink source={vuln.source} sourceId={vuln.source_id} />
                </Card.Subtitle>
              </Col>
              <Col sm={{ span: 6 }} className="mt-xs-2 mt-sm-0">
                <div>
                  <Card.Title className="text-right">
                    <span className="darker h4"> Severity: </span>
                    <div style={{ display: 'inline-block' }} className="vulnerability-severity-badge">
                      <h4
                        className={severity ? `${severity.cvss3OverallSeverityText}` : ''}
                        style={{ display: 'inline' }}
                      >
                        {severity ? toTitleCase(severity.cvss3OverallSeverityText) : vuln.severity_name}
                      </h4>
                    </div>
                  </Card.Title>
                  <Card.Subtitle className="text-right">
                    <span className="darker">Added on: </span>
                    {prettyDate(new Date(vuln.published))}
                  </Card.Subtitle>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="d-flex">
          <Container fluid>
            <Row>
              <Col xs="12" sm={{ order: 'last', span: 3 }}>
                <div style={{ float: 'right' }}>{renderCvssScore()}</div>
              </Col>
              <Col sm="9" xs="12">
                <Card.Text>
                  Packages:{' '}
                  <p>
                    <strong>{packageNamesString}</strong>
                  </p>
                </Card.Text>
                <div className="align-self-center w-100">
                  {/*<div className="chart chart-lg">*/}
                  {/*  <Bar data={data} options={options} />*/}
                  {/*</div>*/}
                </div>
              </Col>
            </Row>

            {vuln.summary ? (
              <Row>
                <Col xs="12">
                  Summary:
                  <p>
                    <strong>{vuln.summary}</strong>
                  </p>
                </Col>
              </Row>
            ) : null}
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};
