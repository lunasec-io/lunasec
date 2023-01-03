import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import api from '../../../api';

import { CweDetails } from './CweDetails';

export const CweDetailMain: React.FC = () => {
  const { cwe_id } = useParams();

  if (!cwe_id) {
    return <p>Missing CWE ID in url.</p>;
  }

  const parsedCweId = parseInt(cwe_id, 10);

  const cweIdIsNotANumber = isNaN(parsedCweId);
  if (cweIdIsNotANumber) {
    return <p>CWE ID is not a number: ${cwe_id}.</p>;
  }

  const { data, isFetching } = api.useGetCweDetailsQuery({ id: parsedCweId });
  if (!data) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {data && data.vulnerability_cwe_by_pk && !isFetching ? (
        <>
          <Helmet title={`CWE-${data.vulnerability_cwe_by_pk.id}`} />
          <CweDetails cwe={data.vulnerability_cwe_by_pk} sideBySideView={false} />
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};
