import { FrameMessageCreator } from '@lunasec/secure-frame-common/build/main/rpc/frame-message-creator';
import { addReactEventListener } from '@lunasec/secure-frame-common/build/main/rpc/listener';
import { FrameMessage, InboundFrameMessageMap } from '@lunasec/secure-frame-common/build/main/rpc/types';
import React, { Component } from 'react';

import setNativeValue from '../set-native-value';

import { SecureFormContext } from './SecureFormContext';
export type SecureFormProps = {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export class SecureForm extends Component<SecureFormProps> {
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

    responses.forEach((data) => {
      if (data === null) {
        return;
      }

      const { nonce, response } = data;

      const childRef = this.childRefLookup[nonce];

      // Set the value back to the input element so that everything behaves like a normal html form,
      // and then force the react events to fire
      const inputElement = childRef[2].current;

      if (inputElement !== null) {
        // TODO: Throw an error here or something instead of "defaulting"
        setNativeValue(inputElement, response.data.token || '');
        const e = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(e);
      }
    }, {} as Record<string, string>);

    // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
    // like it would have in a normal form where the user pressed submit
    await new Promise((resolve) => {
      setTimeout(resolve, 5);
    });
    this.props.onSubmit(e);
    return;
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
