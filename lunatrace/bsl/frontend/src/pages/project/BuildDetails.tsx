import React from 'react';
import { Container Col } from 'react-bootstrap';
import {useGetBuildDetailsQuery, GetBuildDetailsQuery} from "../../store/api/generated";
import {Spinner} from "react-bootstrap";

export interface BuildDetailsProps {
  buildId: string;
}
export const BuildDetails: React.FunctionComponent<BuildDetailsProps> = ({ buildId }) => {
  const {data, error, isLoading} = useGetBuildDetailsQuery({build_id:buildId})
  return (
      {isLoading ? <Spinner animation="border" variant="primary" /> : <Container className="build-page">
      <Col xs="12" className="d-none d-sm-block" style={{ textAlign: 'center' }}>
        <h1>{project.name}</h1>
        <br />
      </Col>
    </Container>}
  );
};
