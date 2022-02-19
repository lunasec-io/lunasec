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
import { getNodeId, isUiNodeInputAttributes } from '@ory/integrations/ui';
import {
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRecoveryFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
  SubmitSelfServiceVerificationFlowBody,
  UiNode,
} from '@ory/kratos-client';
import React, { Component, FormEvent, ReactNode } from 'react';

import { Messages } from './Messages';
import { Node } from './Node';

export type Values = Partial<
  | SubmitSelfServiceLoginFlowBody
  | SubmitSelfServiceRegistrationFlowBody
  | SubmitSelfServiceRecoveryFlowBody
  | SubmitSelfServiceSettingsFlowBody
  | SubmitSelfServiceVerificationFlowBody
>;

export type Methods = 'oidc' | 'password' | 'profile' | 'totp' | 'webauthn' | 'link' | 'lookup_secret';

export type Props<T> = {
  // The flow
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow
    | SelfServiceRecoveryFlow;
  // Only show certain nodes. We will always render the default nodes for CSRF tokens.
  only?: Methods;
  // Is triggered on submission
  onSubmit: (values: T) => void;
  // Do not show the global messages. Useful when rendering them elsewhere.
  hideGlobalMessages?: boolean;
};

function emptyState<T>() {
  return {} as T;
}

type State<T> = {
  values: T;
  isLoading: boolean;
};

export class Flow<T extends Values> extends Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      values: emptyState<T>(),
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initializeValues(this.filterNodes());
  }

  componentDidUpdate(prevProps: Props<T>) {
    if (prevProps.flow !== this.props.flow) {
      // Flow has changed, reload the values!
      this.initializeValues(this.filterNodes());
    }
  }

  initializeValues = (nodes: Array<UiNode> = []) => {
    // Compute the values
    const values = emptyState<T>();
    nodes.forEach((node) => {
      // This only makes sense for text nodes
      if (isUiNodeInputAttributes(node.attributes)) {
        if (node.attributes.type === 'button' || node.attributes.type === 'submit') {
          // In order to mimic real HTML forms, we need to skip setting the value
          // for buttons as the button value will (in normal HTML forms) only trigger
          // if the user clicks it.
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        values[node.attributes.name as keyof Values] = node.attributes.value;
      }
    });

    // Set all the values!
    this.setState((state) => ({ ...state, values }));
  };

  filterNodes = (): Array<UiNode> => {
    const { flow, only } = this.props;
    if (!flow) {
      return [];
    }
    return flow.ui.nodes.filter(({ group }) => {
      if (!only) {
        return true;
      }
      return group === 'default' || group === only;
    });
  };

  // Handles form submission
  handleSubmit = (e: MouseEvent | FormEvent): void => {
    // Prevent all native handlers
    e.stopPropagation();
    e.preventDefault();

    // Prevent double submission!
    if (this.state.isLoading) {
      void Promise.resolve();
      return;
    }

    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));

    try {
      this.props.onSubmit(this.state.values);
    } finally {
      this.setState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
    return;
  };

  render(): ReactNode {
    const { hideGlobalMessages, flow } = this.props;
    const { values, isLoading } = this.state;

    // Filter the nodes - only show the ones we want
    const nodes = this.filterNodes();

    if (!flow) {
      // No flow was set yet? It's probably still loading...
      //
      // Nodes have only one element? It is probably just the CSRF Token
      // and the filter did not match any elements!
      return <></>;
    }

    return (
      <form action={flow.ui.action} method={flow.ui.method} onSubmit={this.handleSubmit}>
        {!hideGlobalMessages ? <Messages messages={flow.ui.messages} /> : null}
        {nodes.map((node, k) => {
          const id = getNodeId(node) as keyof Values;
          return (
            <Node
              key={`${id}-${k}`}
              disabled={isLoading}
              node={node}
              value={values[id]}
              dispatchSubmit={this.handleSubmit}
              setValue={(value) =>
                new Promise((resolve) => {
                  this.setState(
                    (state) => ({
                      ...state,
                      values: {
                        ...state.values,
                        [getNodeId(node)]: value,
                      },
                    }),
                    () => {
                      resolve();
                    }
                  );
                })
              }
            />
          );
        })}
      </form>
    );
  }
}
