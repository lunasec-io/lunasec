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
import { UiNode, UiNodeTextAttributes, UiText } from '@ory/kratos-client';
import { CodeBox, P } from '@ory/themes';
import React from 'react';

interface Props {
  node: UiNode;
  attributes: UiNodeTextAttributes;
}

const Content = ({ node, attributes }: Props) => {
  switch (attributes.text.id) {
    case 1050015:
      // This text node contains lookup secrets. Let's make them a bit more beautiful!
      // eslint-disable-next-line no-case-declarations
      const secrets = (attributes.text.context as any).secrets.map((text: UiText, k: number) => (
        <div key={k} data-testid={`node/text/${attributes.id}/lookup_secret`} className="col-xs-3">
          {/* Used lookup_secret has ID 1050014 */}
          <code>{text.id === 1050014 ? 'Used' : text.text}</code>
        </div>
      ));
      return (
        <div className="container-fluid" data-testid={`node/text/${attributes.id}/text`}>
          <div className="row">{secrets}</div>
        </div>
      );
  }

  return (
    <div data-testid={`node/text/${attributes.id}/text`}>
      <CodeBox code={attributes.text.text} />
    </div>
  );
};

export const NodeText = ({ node, attributes }: Props) => {
  return (
    <>
      <P data-testid={`node/text/${attributes.id}/label`}>{node.meta?.label?.text}</P>
      <Content node={node} attributes={attributes} />
    </>
  );
};
