import { FrameMessageCreator } from '@lunasec/secure-frame-common/build/main/rpc/frame-message-creator';
import { addReactEventListener } from '@lunasec/secure-frame-common/build/main/rpc/listener';
import { FrameMessage, InboundFrameMessageMap } from '@lunasec/secure-frame-common/build/main/rpc/types';
import React, { Component } from 'react';

import { SecureFormContext } from './SecureFormContext';

export type SecureFormProps = {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type SecureFormState = {
  tokens: Record<string, string>;
};

export class SecureForm extends Component<SecureFormProps, SecureFormState> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;

  private readonly messageCreator: FrameMessageCreator;
  private childRefLookup: Record<
    string,
    readonly [string, React.RefObject<HTMLIFrameElement>, React.RefObject<HTMLInputElement>]
  >;
  private readonly abortController: AbortController;

  constructor(props: SecureFormProps) {
    super(props);
    this.messageCreator = new FrameMessageCreator();
    this.childRefLookup = {};
    this.abortController = new AbortController();
    this.state = {
      tokens: {},
    };
  }

  componentDidMount() {
    // Pushes events received back up.
    addReactEventListener(window, this.abortController, (message) => this.messageCreator.messageReceived(message));
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setNativeValue(element: HTMLInputElement, value: string) {
    // @ts-ignore
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    // @ts-ignore
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      // @ts-ignore
      prototypeValueSetter.call(element, value);
    } else {
      // @ts-ignore
      valueSetter.call(element, value);
    }
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const awaitedPromises: Promise<{
      readonly nonce: string;
      readonly response: FrameMessage<InboundFrameMessageMap, 'ReceiveCommittedToken'>;
    } | null>[] = [];

    Object.keys(this.childRefLookup).forEach((key) => {
      const [name, ref] = this.childRefLookup[key];

      if (!ref.current || !ref.current.contentWindow) {
        console.error('Invalid frame detected', key, name, ref);
        return;
      }

      awaitedPromises.push(this.triggerTokenCommit(ref.current.contentWindow, key));
    });

    const responses = await Promise.all(awaitedPromises);

    const formData = responses.reduce((out, data) => {
      if (data === null) {
        return out;
      }

      const { nonce, response } = data;

      const childRef = this.childRefLookup[nonce];

      // Set the value back to the input element so that if the "form" is actually
      // going to submit, the browser will be able to grab the token's value.
      const inputElement = childRef[2].current;

      if (inputElement !== null) {
        // TODO: Throw an error here or something instead of "defaulting"
        // inputElement.value = response.data.token !== undefined ? response.data.token : 'unknown token value';
        this.setNativeValue(inputElement, response.data.token || '');
        const e = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(e);
      }

      const name = childRef[0];

      // TODO: Add error case handling
      out[name] = response.data.token || '';

      return out;
    }, {} as Record<string, string>);
    this.setState({
      tokens: formData,
    });
    console.log("Calling user's onsubmit");
    this.props.onSubmit(e);
  }

  async triggerTokenCommit(
    frameContext: Window,
    nonce: string
  ): Promise<{
    readonly nonce: string;
    readonly response: FrameMessage<InboundFrameMessageMap, 'ReceiveCommittedToken'>;
  } | null> {
    const message = this.messageCreator.createMessageToFrame('CommitToken');

    if (message === null) {
      console.error('Unable to create CommitToken message');
      return null;
    }

    const response = await this.messageCreator.sendMessageToFrameWithReply(frameContext, message);

    if (response === null) {
      console.error('Unable to retrieve reply for frame');
      return null;
    }

    return { nonce, response };
  }

  render() {
    return (
      <SecureFormContext.Provider
        value={{
          addComponentRef: (ref, inputRef, frameId, name) => {
            this.childRefLookup[frameId] = [name, ref, inputRef];
          },
          removeComponentRef: (frameId) => {
            if (this.childRefLookup[frameId]) {
              delete this.childRefLookup[frameId];
            }
          },
        }}
      >
        <form onSubmit={(e) => this.onSubmit(e)}>{this.props.children}</form>
      </SecureFormContext.Provider>
    );
  }
}
