import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Info } from 'react-feather';

import { ProjectInfo } from '../types';

import { AllTags } from './AllTags';
import { FolderList } from './FolderList';
import { TagGroup } from './TagGroup';

interface FiltersProps {
  project: ProjectInfo;
}

export const RiskAdjustmentMain: React.FC<FiltersProps> = ({ project }) => {
  return (
    <Container>
      <Row>
        <Col md="auto">
          <h2>Risk Adjustment</h2>
        </Col>
        <Col md className="mt-md-1">
          <p>
            <Info size="1.2em" className="mb-1 me-2" /> Configure some simple information about the project. LunaTrace
            uses this data to adjust vulnerability scores and automatically ignore vulnerabilities in some cases.
            Configuring these settings properly will vastly decrease the rate of false-positives.
          </p>
        </Col>
      </Row>
      <hr />
      <FolderList project={project} />
    </Container>
  );
};
