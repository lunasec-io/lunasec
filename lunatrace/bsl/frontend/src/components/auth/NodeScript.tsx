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
import { UiNode, UiNodeScriptAttributes } from '@ory/kratos-client';
import { HTMLAttributeReferrerPolicy, useEffect } from 'react';

interface Props {
  node: UiNode;
  attributes: UiNodeScriptAttributes;
}

export const NodeScript = ({ attributes }: Props) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.async = true;
    script.setAttribute('data-testid', `node/script/${attributes.id}`);
    script.src = attributes.src;
    script.async = attributes.async;
    script.crossOrigin = attributes.crossorigin;
    script.integrity = attributes.integrity;
    script.referrerPolicy = attributes.referrerpolicy as HTMLAttributeReferrerPolicy;
    script.type = attributes.type;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [attributes]);

  return null;
};
