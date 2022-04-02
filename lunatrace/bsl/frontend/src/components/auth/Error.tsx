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
import { SelfServiceError } from '@ory/kratos-client';
import { CardTitle, CodeBox } from '@ory/themes';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import oryClient from '../../utils/ory-client';

const AuthErrorComponent: React.FC = () => {
  const [error, setError] = useState<SelfServiceError | string>();
  const navigate = useNavigate();
  // Get ?id=... from the URL
  const { search } = useLocation();

  const queryParams = React.useMemo(() => new URLSearchParams(search), [search]);
  const id = queryParams.get('id');

  if (!id) {
    return (
      <span>Reached the error page without an error id, not sure what happened. Let us know if you see this.</span>
    );
  }

  useEffect(() => {
    // If the router is not ready yet, or we already have an error, do nothing.
    if (error) {
      return;
    }
    if (!id) {
      return;
    }

    oryClient
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            // The error id could not be found. Let's just redirect home!
            return navigate('/');
          case 403:
            // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
            return navigate('/');
          case 410:
            // The error id expired. Let's just redirect home!
            return navigate('/');
        }

        return Promise.reject(err);
      });
  }, [id, error]);

  if (!error) {
    return null;
  }

  return (
    <>
      <Card>
        <Card.Header>
          <h2>Authentication Error</h2>
        </Card.Header>
        <Card.Body>
          <CodeBox className="error-codebox color-responds-theme" code={JSON.stringify(error, null, 2)} />
        </Card.Body>
      </Card>
      <NavLink to="/">
        <Button>Go Home</Button>
      </NavLink>
    </>
  );
};

export default AuthErrorComponent;
