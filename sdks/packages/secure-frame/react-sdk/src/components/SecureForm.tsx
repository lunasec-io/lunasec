import { FrameMessageCreator } from '@lunasec/secure-frame-common/build/main/rpc/frame-message-creator';
import { addReactEventListener } from '@lunasec/secure-frame-common/build/main/rpc/listener';
import {
  FrameMessage,
  InboundFrameMessageMap,
  UnknownFrameNotification
} from '@lunasec/secure-frame-common/build/main/rpc/types';
import React, { Component } from 'react';

import setNativeValue from '../set-native-value';

import { SecureFormContext } from './SecureFormContext';
import {
  triggerBlur,
  triggerFocus
} from '@lunasec/secure-frame-common/build/main/utils/element-event-triggers';
import {
  __SECURE_FRAME_URL__
} from "@lunasec/secure-frame-common";

export interface SecureFormProps extends React.ComponentPropsWithoutRef<"form">  {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SecureForm extends Component<SecureFormProps> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;

  private readonly messageCreator: FrameMessageCreator;
  private readonly childRefLookup: Record<
    string,
    readonly [string, React.RefObject<HTMLIFrameElement>, React.RefObject<HTMLInputElement>]
  >;

  // This is created on component mounted to enable server-side rendering
  private abortController!: AbortController;

  constructor(props: SecureFormProps) {
    super(props);
    this.childRefLookup = {};
    this.messageCreator = new FrameMessageCreator(notification => this.frameNotificationCallback(notification));
  }

  async componentDidMount() {
    this.abortController = new AbortController();

    // Pushes events received back up.
    addReactEventListener(window, this.abortController, (message) => this.messageCreator.messageReceived(message));

    const secureFrameVerifySessionURL = new URL(__SECURE_FRAME_URL__)
    secureFrameVerifySessionURL.pathname = '/session/verify';

    const secureFrameEnsureSessionURL = new URL(__SECURE_FRAME_URL__)
    secureFrameEnsureSessionURL.pathname = '/session/ensure';

    const response = await fetch(secureFrameEnsureSessionURL.toString(), {
      credentials: 'include',
      mode: 'cors'
    });

    if (response.status === 200) {
      // TODO: Remove this log statement or move it to debug only.
      console.log("secure frame session is verified");
      return;
    }

    // dispatch to the secure frame session verifier to ensure that a secure frame session exists
    await fetch(secureFrameVerifySessionURL.toString(), {
      credentials: 'include',
      mode: 'cors',
    });

    const resp = await fetch(secureFrameEnsureSessionURL.toString());

    if (resp.status !== 200) {
      // TODO: Throw or escalate this error in a better way.
      console.error("unable to create secure frame session");
      return;
    }

    // TODO (cthompson) here in the code we have verification that the secure form should be able to tokenize data
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  frameNotificationCallback(notification: UnknownFrameNotification) {
    const child = this.childRefLookup[notification.frameNonce];

    if (notification.command !== 'NotifyOnBlur') {
      throw new Error('Unknown notification event type received from secure frame');
    }

    const input = child[2];

    const inputElement = input.current;

    if (!inputElement) {
      throw new Error('Missing element to trigger notification for in secure frame');
    }

    // In order to trigger a blur event, we must first focus the element.
    triggerFocus(inputElement);

    // Only then will the blur be triggered.
    triggerBlur(inputElement);
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
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

      if (!response.data.success) {
        console.error("error while tokenizing data:", response.data.error);
        return;
      }

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
    });

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
        <form {...this.props} onSubmit={(e) => this.onSubmit(e)}>{this.props.children}</form>
      </SecureFormContext.Provider>
    );
  }
}
