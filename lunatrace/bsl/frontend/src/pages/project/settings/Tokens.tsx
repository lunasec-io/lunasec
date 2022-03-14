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
import { Accordion, Button, Col, FloatingLabel, Form, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Check, Plus, XCircle } from 'react-feather';
import { v4 as uuid } from 'uuid';

import api from '../../../api';
import { ConfirmationDailog } from '../../../components/ConfirmationDialog';
import { displayName } from '../../../utils/display-name';
import { prettyDate } from '../../../utils/pretty-date';
import { ProjectInfo } from '../types';

interface ProjectTokensProps {
  project: ProjectInfo;
}

const CreateTokenForm: React.FC<{ project: ProjectInfo; setFormOpen: (o: boolean) => void }> = ({
  setFormOpen,
  project,
}) => {
  const newToken = useMemo(uuid, []);
  const [newTokenName, setNewTokenName] = useState<string>('');
  // const [validated, setValidated] = useState(false);
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
              body={`This is your last chance to copy the secret. Please make sure you copied it before hitting continue. Remember, don't commit it to revision control.`}
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

const TokenItem: React.FC<{ token: ProjectInfo['project_access_tokens'][number] }> = ({ token }) => {
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
          <span className="darker">Created by: </span> <span>{displayName(token.created_by_user?.traits)}</span>
        </Col>
        <Col>
          {/* flexbox wouldn't work but float worked*/}
          <Button variant="danger" className="float-sm-end" onClick={() => setShowConfirmation(true)}>
            Delete
            {deleteResult.isLoading ? (
              <Spinner className="me-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <XCircle size={18} className="align-middle ms-2" />
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

export const ProjectTokens: React.FC<ProjectTokensProps> = ({ project }) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Row>
        <Col md="4">
          <h2>Project Secrets</h2>
        </Col>
        <Col md>
          <p>
            Project Secrets can be used by the LunaTrace CLI to directly create builds of the project or one of its
            artifacts. This is typically done from a CI or release job.
          </p>
        </Col>
        <Col>
          <Accordion flush={true}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>More info and examples</Accordion.Header>
              <Accordion.Body>
                These tokens are designed to be embedded in a build job, and do not expire. Anyone with this secret can
                create builds of your project, so keep it secret and do not commit it. Project Secrets can only be
                copied at the time of creation. If you lose the key, you must create a new one. Project secrets are
                passed to the LunaTrace CLI as an environment variable.
                <CopyBlock
                  text={'LUNATRACE_PROJECT_SECRET=<YOUR SECRET> lunatrace inventory create <YOUR ARTIFACT>'}
                  language="bash"
                  showLineNumbers={false}
                  startingLineNumber={false}
                  theme={dracula}
                  codeBlock
                />
                If the project is linked to a repo in GitHub, LunaTrace will attempt to clone the repo and automatically
                perform a scan, which would make it unnecessary to create a token and call the CLI manually, as shown
                above. However, in many cases we will wish to scan a specific artifact such as a zip, jarfile,
                container, or manifest file that is not committed to git. This is especially useful for languages which
                do not have complete manifest files and need to be scanned after compilation, such as Java, and in cases
                where we want to scan a docker container.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <ListGroup>
          {project.project_access_tokens.map((t) => {
            return <TokenItem key={t.id} token={t} />;
          })}
          {formOpen ? <CreateTokenForm project={project} setFormOpen={setFormOpen} /> : null}
        </ListGroup>
      </Row>
      {formOpen ? null : (
        <Row className="justify-content-sm-center">
          <Col className="text-right" sm="3">
            <Button variant="success" className="m-2" onClick={() => setFormOpen(true)}>
              <Plus size={18} className="align-middle me-2" />
              Create New Secret
            </Button>
          </Col>
        </Row>
      )}
      <hr />
    </>
  );
};
