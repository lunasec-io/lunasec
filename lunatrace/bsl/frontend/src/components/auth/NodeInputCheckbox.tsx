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
import { Checkbox } from '@ory/themes';
import React from 'react';

import { NodeInputProps } from './helpers';

export function NodeInputCheckbox<T>({ node, attributes, setValue, disabled }: NodeInputProps) {
  // Render a checkbox.s
  return (
    <>
      <Checkbox
        name={attributes.name}
        defaultChecked={attributes.value === true}
        onChange={(e: any) => setValue(e.target.checked)}
        disabled={attributes.disabled || disabled}
        label={getNodeLabel(node)}
        state={node.messages.find(({ type }) => type === 'error') ? 'error' : undefined}
        subtitle={node.messages.map(({ text }) => text).join('\n')}
      />
    </>
  );
}
