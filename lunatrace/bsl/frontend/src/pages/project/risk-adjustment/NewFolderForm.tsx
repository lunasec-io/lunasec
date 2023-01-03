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
import Minimatch from 'minimatch';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { AiOutlineFolderAdd, AiOutlinePlus } from 'react-icons/ai';

import api from '../../../api';
import { ProjectInfo } from '../types';

interface NewFolderFormProps {
  project: ProjectInfo;
}
export const NewFolderForm: React.FC<NewFolderFormProps> = ({ project }) => {
  const [pathGlob, setPathGlob] = useState('');
  const [validationError, setValidationError] = useState('');
  const [insertProjectFolder, insertProjectFolderResults] = api.useInsertProjectFolderSettingMutation();

  if (!project.project_folder_settings || project.project_folder_settings.length < 1) {
    return null;
  }
  const existingPaths = project.project_folder_settings.map((folderSetting) => folderSetting.path_glob);

  const highestPrecedence =
    project.project_folder_settings
      .filter((folderSetting) => !folderSetting.root)
      .map((folderSetting) => folderSetting.precedence)
      .sort()
      .pop() || 0;

  const validatePath = () => {
    if (pathGlob.length < 1) {
      setValidationError('Must enter a path');
      return false;
    }
    if (existingPaths.includes(pathGlob)) {
      setValidationError('A folder using this path already exists, making this a duplicate.');
      return false;
    }
    // as far as i can tell basically everything is a valid glob but it doesn't hurt to check
    if (!Minimatch.makeRe(pathGlob)) {
      setValidationError('This is not a valid glob path according to minimatch, please check your syntax.');
      return false;
    }
    return true;
  };

  const submit = () => {
    setValidationError('');
    if (insertProjectFolderResults.isLoading) {
      return null;
    }
    const pathIsValid = validatePath();
    if (pathIsValid) {
      void insertProjectFolder({
        object: {
          path_glob: pathGlob,
          project_id: project.id,
          root: false,
          ignore: false,
          precedence: highestPrecedence + 1,
        },
      })
        .unwrap()
        .then((result) => {
          // onSuccess
          if (result?.insert_project_folder_settings_one?.id) {
            // clear the input
            setPathGlob('');
          }
        });
    }
  };
  return (
    <Row>
      <h3>
        <AiOutlineFolderAdd size="2rem" /> Add Folder
      </h3>
      <Form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Form.Group>
          <Form.Label>Path Match</Form.Label>
          <InputGroup className="">
            <Form.Control
              isInvalid={!!validationError}
              placeholder="Ex: /src/tests/**/*.ts"
              aria-label="new folder path glob"
              aria-describedby="folder path glob"
              value={pathGlob}
              onChange={(e) => setPathGlob(e.target.value)}
            />

            <Button variant="success" onClick={submit}>
              {insertProjectFolderResults.isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <AiOutlinePlus size="1.2rem" className="mb-1 ms-1" /> Add Folder
                </>
              )}
            </Button>
            <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
          </InputGroup>
          <Form.Text className="text-muted">Globs are supported.</Form.Text>
        </Form.Group>
      </Form>
    </Row>
  );
};

// {/*<Col>*/}
// {/*  <Form.Group className="" controlId="folderPath">*/}
// {/*    <Form.Label>Path Match</Form.Label>*/}
// {/*    <Form.Control type="email" placeholder="Ex: /src/tests/**/*.ts" />*/}
//     {/*    <Form.Text className="text-muted">Globs are supported.</Form.Text>*/}
//     {/*  </Form.Group>*/}
//     {/*</Col>*/}
//     {/*<Col>*/}
//     {/*  <Form.Group className="mt-4" controlId="submit">*/}
//     {/*    <Button className="d-inline" variant="success">*/}
//     {/*      Add Folder*/}
//     {/*    </Button>*/}
//     {/*  </Form.Group>{' '}*/}
//     {/*</Col>*/}
