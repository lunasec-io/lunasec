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
import { Button, Modal } from 'react-bootstrap';

import { ConditionallyRender } from './utils/ConditionallyRender';

interface ConfirmationDialogProps {
  onClose: (success: boolean) => void;
  show: boolean;
  title?: string;
  body?: React.ReactNode;
}

export const ConfirmationDailog: React.FC<ConfirmationDialogProps> = ({ onClose, show, title, body }) => {
  return (
    <Modal show={show} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <ConditionallyRender if={title}>
          <Modal.Title>{title}</Modal.Title>
        </ConditionallyRender>
      </Modal.Header>
      <ConditionallyRender if={body}>
        <Modal.Body>{body}</Modal.Body>
      </ConditionallyRender>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Go Back
        </Button>
        <Button variant="primary" onClick={() => onClose(true)}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
