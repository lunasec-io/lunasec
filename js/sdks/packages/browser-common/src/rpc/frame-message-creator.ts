import { __SECURE_FRAME_URL__ } from '../constants';
import { timeout } from '../utils/async';
import { generateSecureNonce } from '../utils/random';

import {
  FrameMessage,
  FrameNotification,
  InboundFrameMessageMap,
  OutboundFrameMessageMap,
  OutboundToInboundMessageTypeMap,
  OutboundToInboundMessageValueMap,
  UnknownFrameMessage,
} from './types';

export class FrameMessageCreator {
  private readonly frameResponses: Record<string, UnknownFrameMessage>;
  private readonly timeout: number;
  private readonly frameNotificationCallback!: (notification: FrameNotification) => void;

  constructor(notificationCallback: (notification: FrameNotification) => void, timeout = 5000) {
    this.frameResponses = {};
    this.frameNotificationCallback = notificationCallback;
    this.timeout = timeout;
  }

  createMessageToFrame<K extends keyof OutboundFrameMessageMap>(
    command: K,
    data: OutboundFrameMessageMap[K]
  ): FrameMessage<OutboundFrameMessageMap, K> {
    return {
      command,
      correlationToken: generateSecureNonce(),
      data: data,
    };
  }

  postReceived(unknownPost: UnknownFrameMessage | FrameNotification): void {
    if (!unknownPost.frameNonce && !unknownPost.correlationToken) {
      throw new Error(
        'Unknown post message received without correlationToken or frameNonce, must have one or the other'
      );
    }

    // Notifications have a frameNonce.  Notifications are one way messages from the frame to the outside
    if (unknownPost.frameNonce) {
      this.handleNotificationReceived(unknownPost);
      return;
    }
    // Messages are receipt confirmations to things we have sent the frame, and have a correlationToken
    if (unknownPost.correlationToken) {
      this.handleMessageReceived(unknownPost);
      return;
    }
  }

  // Notifications start in the frame and are sent here to notify us of events
  handleNotificationReceived(notification: FrameNotification): void {
    const notificationTypes: FrameNotification['command'][] = [
      'NotifyOnBlur',
      'NotifyOnStart',
      'NotifyOnToken',
      'NotifyOnFullyLoaded',
    ];
    if (!notificationTypes.includes(notification.command)) {
      throw new Error(`Received Frame Notification of unknown type, allowed types are ${notificationTypes.toString()}`);
    }
    this.frameNotificationCallback(notification);
    return;
  }

  // Messages are responses from the frame to things we have sent it
  handleMessageReceived(message: UnknownFrameMessage): void {
    // TODO: Validate response has valid JSON
    this.frameResponses[message.correlationToken] = message;
  }

  async sendMessageToFrameWithReply<K extends keyof OutboundFrameMessageMap | keyof OutboundToInboundMessageTypeMap>(
    frameContext: Window,
    message: FrameMessage<OutboundFrameMessageMap, K>
  ): Promise<FrameMessage<InboundFrameMessageMap, OutboundToInboundMessageTypeMap[K]> | null> {
    const startTime = new Date();
    return new Promise(async (resolve, reject) => {
      // TODO: Make this domain be configurable
      frameContext.postMessage(JSON.stringify(message), __SECURE_FRAME_URL__);
      await timeout(2);

      // Spin lock that waits until we receive a response in another "thread".
      // This will return false when a message is in the response buffer "frameResponses".
      while (this.frameResponses[message.correlationToken] === undefined) {
        const currentTime = new Date();

        // Throw a timeout if we don't get a response.
        if (currentTime.getTime() - startTime.getTime() > this.timeout) {
          return reject('Timeout exceeded for frame call: ' + message.correlationToken);
        }

        // Delay loop asynchronously
        await timeout(5);
      }

      const rawResponse = this.frameResponses[message.correlationToken];

      delete this.frameResponses[message.correlationToken];

      if (rawResponse.command !== OutboundToInboundMessageValueMap[message.command]) {
        console.error('Wrong response message type from secure frame', rawResponse);
        return null;
      }

      // TODO: Add JSON validation to prevent badly formatted messaged from slipping through.
      // Or use Protobuf..?
      resolve(rawResponse as FrameMessage<InboundFrameMessageMap, OutboundToInboundMessageTypeMap[K]>);
    });
  }

  convertRawMessageToTypedMessage<K extends keyof InboundFrameMessageMap>(
    rawMessage: UnknownFrameMessage
  ): FrameMessage<InboundFrameMessageMap, K> {
    return rawMessage as FrameMessage<InboundFrameMessageMap, K>;
  }

  processFrameResponse(
    message: UnknownFrameMessage
  ): FrameMessage<InboundFrameMessageMap, keyof InboundFrameMessageMap> | null {
    // TODO: Add validation for this RPC here.
    switch (message.command) {
      case 'ReceiveCommittedToken':
        return this.convertRawMessageToTypedMessage<'ReceiveCommittedToken'>(message);
    }

    return null;
  }
}
