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
import { UiNode, UiNodeImageAttributes } from '@ory/kratos-client';
import React from 'react';

interface Props {
  node: UiNode;
  attributes: UiNodeImageAttributes;
}

export const NodeImage = ({ node, attributes }: Props) => {
  return <img data-testid={`node/image/${attributes.id}`} src={attributes.src} alt={node.meta.label?.text} />;
};
