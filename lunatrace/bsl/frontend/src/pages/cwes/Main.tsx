import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Search } from 'react-feather';
import { Helmet } from 'react-helmet-async';

import api from '../../api';
import { Vulnerability_Cwe_Bool_Exp } from '../../api/generated';

import { CweList } from './CweList';

export const CwesMain: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const [cweLimit, setCweLimit] = useState(20);
  const submitSearch = (search: string) => {
    setSearch(search);
  };

  const parsedSearch = parseInt(search.toLowerCase().replace('cwe-', ''), 10);
  const searchIsNumber = !isNaN(parsedSearch);

  const searchConditions: Vulnerability_Cwe_Bool_Exp[] = [{ name: { _ilike: `%${search}%` } }];

  if (searchIsNumber) {
    searchConditions.push({ id: { _eq: parsedSearch } });
  }

  const where: Vulnerability_Cwe_Bool_Exp = {
    _or: searchConditions,
  };

  const { data, isFetching, refetch } = api.useGetCwesQuery({
    limit: cweLimit,
    offset: 0,
    where,
  });

  // lazy loading. Reloads all the old vulns when expanding the batch size but..it works fine
  useBottomScrollListener(
    () => {
      if (data && data.vulnerability_cwe) {
        const cweCount = data.vulnerability_cwe.length;
        if (cweCount === cweLimit) {
          setCweLimit(cweLimit + 20);
          refetch();
        }
      }
    },
    { offset: 200 }
  );

  return (
    <>
      <Helmet title="Common Weakness Enumeration (CWE) Index" />
      <Container>
        <Row className="mb-2 mb-xl-3">
          <Col sm="6" md="4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(search);
              }}
            >
              <InputGroup>
                <Form.Control
                  placeholder="Search CWEs"
                  aria-label="Search CWEs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="">
                  {isFetching ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    <Search className="feather" />
                  )}
                </Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <CweList cwes={data?.vulnerability_cwe || []} isLoading={isFetching} />
      </Container>
    </>
  );
};
