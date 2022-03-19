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
import React from 'react';
import { Alert, Container } from 'react-bootstrap';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';

export const AlertsHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const alertsIndex = useAppSelector((state) => state.alerts.alerts);
  const alerts = Object.values(alertsIndex);
  if (alerts.length === 0) {
    return null;
  }
  return (
    <Container>
      {alerts.map((a) => {
        return (
          <Alert
            key={a.message}
            dismissible={true}
            onClose={() => dispatch({ type: 'alerts/remove', payload: a.message })}
            variant={a.variant || 'danger'}
          >
            {a.message}
          </Alert>
        );
      })}
    </Container>
  );
};
