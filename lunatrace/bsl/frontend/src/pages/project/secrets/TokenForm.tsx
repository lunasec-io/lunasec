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
import React, { FormEvent, useMemo, useState } from 'react';
import { Button, Col, FloatingLabel, Form, ListGroupItem, Row, Spinner } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Check } from 'react-feather';
import { v4 as uuid } from 'uuid';

import api from '../../../api';
import { ConfirmationDailog } from '../../../components/ConfirmationDialog';
import { ProjectInfo } from '../types';

export const CreateTokenForm: React.FC<{ project: ProjectInfo; setFormOpen: (o: boolean) => void }> = ({
  setFormOpen,
  project,
}) => {
  const newToken = useMemo(uuid, []);
  const [newTokenName, setNewTokenName] = useState<string>('');
  const [insertTrigger, insertResult] = api.useInsertProjectAccessTokenMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (insertResult.isSuccess) {
    insertResult.reset();
    setFormOpen(false);
  }
  return (
    <ListGroupItem>
      <Form onSubmit={(e) => formSubmit(e)}>
        <Row>
          <Col xl="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Secret Name" className="mb-3">
                <Form.Control
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  required={true}
                  placeholder="enter a name for the secret"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xl="6">
            <CopyBlock
              text={newToken}
              language="bash"
              showLineNumbers={false}
              startingLineNumber={false}
              theme={dracula}
              codeBlock={true}
            />
          </Col>

          <Col>
            {/* flexbox wouldn't work but float worked*/}
            <Button type="submit" variant="success" className="float-sm-end mt-2">
              {insertResult.isLoading ? (
                <Spinner className="me-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                <Check size={18} className="align-middle me-2" />
              )}
              Save
            </Button>
            <ConfirmationDailog
              title={`Remember to copy the secret value`}
              body={`This is your last chance to copy the secret. Please make sure you copied it before hitting continue.
                  Remember, don't commit it to revision control.`}
              onClose={(success) => {
                setShowConfirmation(false);
                if (success) {
                  void insertTrigger({ name: newTokenName, access_token: newToken, project_uuid: project.id });
                }
              }}
              show={showConfirmation}
            />
          </Col>
        </Row>
      </Form>
    </ListGroupItem>
  );
};
