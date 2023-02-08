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
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api/generated';
import { inputChangeHandler } from '../../utils/input-helpers';

export const AdminDashboardOrgs = () => {
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState<string>('');

  const [insertNewOrgUser, { data: newOrgUser, error: newOrgUserError }] = api.endpoints.InsertNewOrgUser.useMutation();

  const { data, error, isLoading } = api.endpoints.GetLunaTraceOrganizations.useQuery();

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p><>Error loading data: {error}</></p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const filterOrganizations = (data: { name: string }) => {
    const { name } = data;
    const normalizedName = name ? name.toLowerCase() : '';
    return normalizedName.includes(orgName);
  };

  const createNewUserForOrg = (orgId: string) => () => {
    void insertNewOrgUser({
      organization_id: orgId,
    });
  };

  return (
    <>
      <Row className="mb-5">
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Search organizations..." onChange={inputChangeHandler(setOrgName)} />
          </Form.Group>
        </Form>
      </Row>
      {newOrgUserError && (
        <Row>
          <p>Error creating new org user: {newOrgUserError.message}</p>
        </Row>
      )}
      <Row>
        {data.organizations
          .filter((o) => filterOrganizations(o))
          .map((o) => {
            const orgInfoForm = [
              { name: 'id', value: o.id },
              { name: 'name', value: o.name },
            ].map((row) => (
              <Form.Group key={row.name} as={Row} className="mb-3">
                <Form.Label column sm="2">
                  {row.name}
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={row.value} />
                </Col>
              </Form.Group>
            ));

            return (
              <Col key={o.id} md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>{o.name}</Card.Title>
                    <Form>{orgInfoForm}</Form>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button onClick={createNewUserForOrg(o.id)}>Join Organization</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};
