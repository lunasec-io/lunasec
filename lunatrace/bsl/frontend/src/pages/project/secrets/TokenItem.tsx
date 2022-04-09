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
import { Button, Col, ListGroupItem, Row, Spinner } from 'react-bootstrap';
import { XCircle } from 'react-feather';

import api from '../../../api';
import { ConfirmationDailog } from '../../../components/ConfirmationDialog';
import { displayName } from '../../../utils/display-name';
import { prettyDate } from '../../../utils/pretty-date';
import { ProjectInfo } from '../types';

export const TokenItem: React.FC<{ token: ProjectInfo['project_access_tokens'][number] }> = ({ token }) => {
  const [deleteTrigger, deleteResult] = api.useDeleteProjectAccessTokenMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <ListGroupItem>
      <Row>
        <Col>
          <span className="darker">Name: </span> <span>{token.name}</span>
        </Col>
        <Col sm>
          <span className="darker">Created: </span> <span>{prettyDate(new Date(token.created_at))}</span>
        </Col>
        <Col sm>
          <span className="darker">Created by: </span> <span>{displayName(token.created_by_user?.kratos_identity?.traits)}</span>
        </Col>
        <Col>
          {/* flexbox wouldn't work but float worked*/}
          <Button variant="secondary" className="float-sm-end" onClick={() => setShowConfirmation(true)}>
            Delete
            {deleteResult.isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <XCircle size="1.2em" className="align-middle mb-1 ms-2" />
            )}
          </Button>
          <ConfirmationDailog
            title={`Delete ${token.name}`}
            body={`Are you sure you want to delete token "${token.name}"? \n Once deleted, any of your build jobs using this token will stop working.`}
            onClose={(success) => {
              setShowConfirmation(false);
              if (success) {
                void deleteTrigger({ id: token.id });
              }
            }}
            show={showConfirmation}
          />
        </Col>
      </Row>
    </ListGroupItem>
  );
};
