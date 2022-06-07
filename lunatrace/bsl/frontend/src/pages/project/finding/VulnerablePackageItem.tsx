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
import { severityOrder, VulnerablePackage } from '@lunatrace/lunatrace-common';
import compareVersions from 'compare-versions';
import React, { useState } from 'react';
import {
  Accordion,
  Card,
  Col,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
  FormControl,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { BsThreeDotsVertical } from 'react-icons/bs';

import api from '../../../api';
import { ConfirmationDailog } from '../../../components/ConfirmationDialog';
import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { capitalizeFirstLetter } from '../../../utils/string-utils';

import { GuideBlurb } from './GuideBlurb';
import { VulnerabilityTableItem } from './VulnerabilityTableItem';
import { Finding } from './types';

interface FindingListItemProps {
  pkg: VulnerablePackage<Finding>;
  severityFilter: number;
  setVulnQuickViewId: (vulnId: string) => void;
}

export const VulnerablePackageItem: React.FunctionComponent<FindingListItemProps> = ({
  pkg,
  severityFilter,
  setVulnQuickViewId,
}) => {
  const [shouldFilterFindings, setShouldFilterFindings] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ignoreNote, setIgnoreNote] = useState('');

  const filteredFindings = pkg.findings.filter((f) => {
    return severityOrder.indexOf(f.severity) >= severityFilter || !shouldFilterFindings;
  });

  const [insertVulnIgnore, insertVulnIgnoreState] = api.useInsertIgnoredVulnerabilitiesMutation();

  const fixVersions = [...pkg.fix_versions];

  const recommendVersion = fixVersions.sort(compareVersions).reverse()[0];

  const bulkIgnoreVulns = async () => {
    const toIgnore = pkg.findings.map((f) => {
      return {
        vulnerability_id: f.vulnerability_id,
        project_id: pkg.project_id,
        note: ignoreNote,
        locations: f.locations,
      };
    });
    await insertVulnIgnore({ objects: toIgnore });
  };
  // eslint-disable-next-line react/display-name
  const customMenuToggle = React.forwardRef<
    HTMLAnchorElement,
    { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }
  >(({ children, onClick }, ref) => (
    <a
      className="text-end position-absolute top-0 end-0 m-3 btn-white"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDotsVertical size={25} className="text-right position-absolute top-0 end-0 me-n3" />
      {children}
    </a>
  ));

  return (
    <>
      <Card className="vulnpkg-card">
        {insertVulnIgnoreState.isUninitialized ? (
          <Dropdown align="end">
            <Dropdown.Toggle as={customMenuToggle} />
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setShowConfirmation(true)}>Ignore</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Spinner animation="border" className="position-absolute top-0 end-0 m-3" />
        )}
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
        <Card.Body>
          <ConditionallyRender if={pkg.guides.length > 0}>
            <Container fluid className={'text-center'}>
              {pkg.guides.map((guide) => {
                return <GuideBlurb key={guide.id} guide={guide}></GuideBlurb>;
              })}
            </Container>
          </ConditionallyRender>

          <Container fluid>
            {pkg.fix_state === 'fixed' ? (
              <Row>
                <h5>
                  {' '}
                  <span className="darker">Recommended version: </span>
                  {recommendVersion}
                </h5>
              </Row>
            ) : null}
            <Row>
              <Col xs="12">
                <h5>
                  {' '}
                  <span className="darker">Language: </span>
                  {capitalizeFirstLetter(pkg.language)}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <h5 className="darker">Path{pkg.locations.length === 1 ? '' : 's'}:</h5>{' '}
                {pkg.locations.map((l) => {
                  return <h5 key={l}>{l}</h5>;
                })}
              </Col>
            </Row>
            <Row>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {filteredFindings.length}{' '}
                    {shouldFilterFindings && severityOrder[severityFilter] !== 'Unknown'
                      ? severityOrder[severityFilter] +
                        (severityFilter < severityOrder.indexOf('Critical') ? ' (or higher) ' : ' ')
                      : null}
                    {/*Todo: break this into a function*/}
                    finding
                    {filteredFindings.length === 1 ? '' : 's'}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table hover size="sm">
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>Vulnerability Number</th>
                          <th>Severity</th>
                          <th>CVSS</th>
                          <th>Fix</th>
                          <th>Ignore</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFindings.map((f) => (
                          <VulnerabilityTableItem key={f.id} finding={f} setVulnQuickViewId={setVulnQuickViewId} />
                        ))}
                      </tbody>
                    </Table>

                    {shouldFilterFindings ? (
                      pkg.findings.length > filteredFindings.length ? (
                        <span style={{ cursor: 'pointer' }} onClick={() => setShouldFilterFindings(false)}>
                          Show {pkg.findings.length - filteredFindings.length} lower severity findings
                          <ChevronDown />
                        </span>
                      ) : null
                    ) : (
                      <span style={{ cursor: 'pointer' }} onClick={() => setShouldFilterFindings(true)}>
                        Hide lower severity findings
                        <ChevronUp />
                      </span>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <ConfirmationDailog
        title={`Ignore All Findings For This Package`}
        body={(
          <>
            <p>
              Bulk ignore all currently reported findings for this package. New vulnerabilities or the same
              vulnerabilities at new locations will cause this package to appear again. This action is not yet
              reversible, but will be in a future update.
            </p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(false);
                void bulkIgnoreVulns();
              }}
            >
              <FloatingLabel controlId="floatingInput" label="Reason (optional)" className="mb-3">
                <FormControl
                  value={ignoreNote}
                  onChange={(e) => setIgnoreNote(e.target.value)}
                  required={false}
                  placeholder="Enter reason"
                />
              </FloatingLabel>
            </Form>
          </>
        )}
        onClose={(success) => {
          setShowConfirmation(false);
          if (success) {
            void bulkIgnoreVulns();
          }
        }}
        show={showConfirmation}
      />
    </>
  );
};
