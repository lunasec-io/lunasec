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
import { Button } from '@ory/themes';
import React from 'react';

import { NodeInputProps } from './helpers';

export function NodeInputSubmit<T>({ node, attributes, setValue, disabled, dispatchSubmit }: NodeInputProps) {
  return (
    <>
      <Button
        name={attributes.name}
        onClick={(e) => {
          // On click, we set this value, and once set, dispatch the submission!
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
