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
        inputElement.value = response.data.token !== undefined ? response.data.token : 'unknown token value';
      }

      // TODO: Add a callback that will "set" the token value inside of the `<SecureInput>` element.
      // Otherwise a re-render by React will wipe the value of the `<input>` element state.
      // Alternatively, we just add logic to prevent re-renders by React inside of SecureInput?

      const name = childRef[0];

      // TODO: Add error case handling
      out[name] = response.data.token || '';

      return out;
    }, {} as Record<string, string>);
    this.setState({
      tokens: formData,
    });

    // Just for testing, read the value back out of the element and make sure it passed through Context properly
    const firstFakeInputRef = this.childRefLookup[Object.keys(this.childRefLookup)[0]][2];
    firstFakeInputRef.current
      ? console.log('INPUT VALUE IS ', firstFakeInputRef.current.value)
      : console.log('failed to get inputRef');
  }

  // TODO: I think we should maybe be doing this iframe communication inside the secureInput elements, letting them manage their own state
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
          tokens: this.state.tokens,
        }}
      >
        <form onSubmit={(e) => this.onSubmit(e)}>{this.props.children}</form>
      </SecureFormContext.Provider>
    );
  }
}
