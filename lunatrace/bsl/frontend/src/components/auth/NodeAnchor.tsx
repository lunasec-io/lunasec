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
import { UiNode, UiNodeAnchorAttributes } from '@ory/kratos-client';
import { Button } from '@ory/themes';
import React from 'react';

interface Props {
  node: UiNode;
  attributes: UiNodeAnchorAttributes;
}

export const NodeAnchor = ({ attributes }: Props) => {
  return (
    <Button
      data-testid={`node/anchor/${attributes.id}`}
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = attributes.href;
      }}
    >
      {attributes.title.text}
    </Button>
  );
};
