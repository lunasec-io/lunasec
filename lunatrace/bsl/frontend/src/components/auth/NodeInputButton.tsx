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
import { getNodeLabel } from '@ory/integrations/ui';
import React from 'react';
import { Button } from 'react-bootstrap';

import { NodeInputProps } from './helpers';

export function NodeInputButton<T>({ node, attributes, setValue, disabled, dispatchSubmit }: NodeInputProps) {
  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const run = new Function(attributes.onclick);
      run();
    }
  };

  console.log('input button attributes are ', attributes);

  return (
    <>
      <Button
        name={attributes.name}
        onClick={(e: any) => {
          onClick();
          void setValue(attributes.value).then(() => dispatchSubmit(e));
        }}
        value={attributes.value || ''}
        disabled={attributes.disabled || disabled}
      >
        {getNodeLabel(node)}
      </Button>
    </>
  );
}
