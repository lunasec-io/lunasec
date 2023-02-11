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
import { ImpersonateUser } from '../../types/user';
import { inputChangeHandler } from '../../utils/input-helpers';
import { setImpersonatedUser } from '../../utils/users';

export const AdminDashboardUsers = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const { data, error, isLoading } = api.endpoints.GetLunaTraceUsers.useQuery();

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return (
      <p>
        <>Error loading data: {error}</>
      </p>
    );
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const impersonateUser = (user: ImpersonateUser) => () => {
    setImpersonatedUser(user);
    window.location.href = '/';
  };

  const filterUser = (data: { name: string; email: string }) => {
    const { name, email } = data;
    const normalizedName = name ? name.toLowerCase() : '';
    const normalizedEmail = email ? email.toLowerCase() : '';
    return normalizedName.includes(username) || normalizedEmail.includes(username);
  };

  return (
    <>
      <Row className="mb-5">
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Search users..." onChange={inputChangeHandler(setUsername)} />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        {data.users
          .filter((u) => u.kratos_identity && filterUser(u.kratos_identity.traits))
          .map((u) => {
            if (!u.kratos_identity) {
              return null;
            }

            const id = u.id;
            const kratosId = u.kratos_id;
            const name = u.kratos_identity.traits.name;
            const email = u.kratos_identity.traits.email;

            const userInfoForm = [
              { name: 'id', value: id },
              { name: 'email', value: email },
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
              <Col key={id} md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Form>{userInfoForm}</Form>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button onClick={impersonateUser({ id: kratosId, name })}>Impersonate User</Button>
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
