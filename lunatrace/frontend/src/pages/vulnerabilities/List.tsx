/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

import { VulnerabilityListItem } from './ListItem';
import { VulnInfo } from './types';
interface VulnerabilityListProps {
  vulnerabilities: VulnInfo[];
  isLoading: boolean;
}

export const VulnerabilitiesList: React.FunctionComponent<VulnerabilityListProps> = ({
  vulnerabilities,
  isLoading,
}) => {
  const vulnCards = vulnerabilities.map((vuln) => {
    return (
      <Row key={vuln.slug}>
        <VulnerabilityListItem vuln={vuln} />
      </Row>
    );
  });
  return (
    <Container className="vulnerability-list">
      {isLoading ? <Spinner animation="border" variant="primary" /> : null}
      {vulnCards}
    </Container>
  );
};
