import { FrameMessageCreator } from '@lunasec/secure-frame-common/build/main/rpc/frame-message-creator';
import { addReactEventListener } from '@lunasec/secure-frame-common/build/main/rpc/listener';
import {
  FrameMessage, FrameNotification,
  InboundFrameMessageMap, InboundFrameNotificationMap,
  UnknownFrameNotification
} from '@lunasec/secure-frame-common/build/main/rpc/types';
import React, {Component} from 'react';

import setNativeValue from '../set-native-value';
import { SecureFormContext } from './SecureFormContext';
import {
  triggerBlur,
  triggerFocus
} from '@lunasec/secure-frame-common/build/main/utils/element-event-triggers';

import {SecureInput} from "./SecureInput";

import {
  __SECURE_FRAME_URL__
} from "@lunasec/secure-frame-common";


export interface SecureFormProps extends React.ComponentPropsWithoutRef<"form">  {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SecureForm extends Component<SecureFormProps> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;

  private readonly messageCreator: FrameMessageCreator;
  private readonly childInputs: Record<
    string,
    SecureInput
  >;

  // This is created on component mounted to enable server-side rendering
  private abortController!: AbortController;

  constructor(props: SecureFormProps) {
    super(props);
    this.childInputs = {};
    this.messageCreator = new FrameMessageCreator(notification => this.frameNotificationCallback(notification));
  }

  async componentDidMount() {
    this.abortController = new AbortController();

    // Pushes events received back up.
    addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));

    const secureFrameVerifySessionURL = new URL(__SECURE_FRAME_URL__)
    secureFrameVerifySessionURL.pathname = '/session/verify';

    const secureFrameEnsureSessionURL = new URL(__SECURE_FRAME_URL__)
    secureFrameEnsureSessionURL.pathname = '/session/ensure';


    // Pushes events received back up.
    addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));

    const response = await fetch(secureFrameEnsureSessionURL.toString(),{
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

  // Blur happens after the element loses focus
  blur(notification: FrameNotification<InboundFrameNotificationMap, 'NotifyOnBlur'>){
    const child = this.childInputs[notification.frameNonce];

    const input = child.inputRef;

    const inputElement = input.current;

    if (!inputElement) {
      throw new Error('Missing element to trigger notification for in secure frame');
    }

    // In order to trigger a blur event, we must first focus the element.
    triggerFocus(inputElement);
    // Only then will the blur be triggered.
    triggerBlur(inputElement);
  }

  // Give the iframe all the information it needs to exist when it wakes up
  iframeStartup(notification: FrameNotification<InboundFrameNotificationMap, 'NotifyOnStart'>){
    const input = this.childInputs[notification.frameNonce]
    if (!input) {
      console.error('Received startup message from unknown frame:' , notification);
      return;
    }
    const frameAttributes = input.generateIframeAttributes();
    const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
    if (!input.frameRef.current || !input.frameRef.current.contentWindow) {
      console.error('Frame not initialized for message sending');
      return;
    }
    this.messageCreator.sendMessageToFrameWithReply(input.frameRef.current.contentWindow, message);
  }



  frameNotificationCallback(notification: UnknownFrameNotification) {
    switch (notification.command) {
      case 'NotifyOnBlur' :
        this.blur(notification as FrameNotification<InboundFrameNotificationMap, 'NotifyOnBlur'>);
        break;
      case 'NotifyOnStart':
        this.iframeStartup(notification as FrameNotification<InboundFrameNotificationMap, 'NotifyOnStart'>);
        break;
    }
  }


  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const awaitedPromises: Promise<{
      readonly nonce: string;
      readonly response: FrameMessage<InboundFrameMessageMap, 'ReceiveCommittedToken'>;
    } | null>[] = [];

    Object.keys(this.childInputs).forEach((key) => {
      const child = this.childInputs[key];
      const ref = child.frameRef;

      if (!ref.current || !ref.current.contentWindow) {
        console.error('Invalid frame detected', key, ref);
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

      const childInput = this.childInputs[nonce];

      // Set the value back to the input element so that everything behaves like a normal html form,
      // and then force the react events to fire
      const inputElement = childInput.inputRef.current;

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
    const message = this.messageCreator.createMessageToFrame('CommitToken', {});

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
          addComponent: (component) => {
            this.childInputs[component.frameId] = component;
          },
          removeComponent: (frameId) => {
            if (this.childInputs[frameId]) {
              delete this.childInputs[frameId];
            }
          },
        }}
      >
        <form {...this.props} onSubmit={(e) => this.onSubmit(e)}>{this.props.children}</form>
      </SecureFormContext.Provider>
    );
  }
}
