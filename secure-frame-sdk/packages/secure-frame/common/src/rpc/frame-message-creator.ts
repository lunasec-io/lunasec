import {timeout} from '../utils/async';
import {
  FrameMessage,
  InboundFrameMessageMap,
  OutboundFrameMessageMap,
  OutboundToInboundMessageValueMap, OutboundToInboundMessageTypeMap,
  UnknownFrameMessage
} from './types';
import {generateSecureNonce} from '../utils/random';

export class FrameMessageCreator {
  private readonly frameResponses: Record<string, UnknownFrameMessage>;
  private readonly timeout: number;

  constructor(timeout: number = 5000) {
    this.frameResponses = {};
    this.timeout = timeout;
  }

  // TODO: Will need called to supply "inner" message eventually.
  createMessageToFrame<K extends keyof OutboundFrameMessageMap>(s: K): FrameMessage<OutboundFrameMessageMap, K> | null {
    function createInnerMessage() {
      switch (s) {
        case 'CommitToken':
          return {};
      }

      return null;
    }

    const innerMessage = createInnerMessage();

    if (innerMessage === null) {
      return null;
    }

    return {
      command: s,
      correlationToken: generateSecureNonce(),
      data: innerMessage
    };
  }

  messageReceived(unknownMessage: UnknownFrameMessage) {
    // TODO: Validate response has valid JSON
    this.frameResponses[unknownMessage.correlationToken] = unknownMessage;
  }

  async sendMessageToFrameWithReply<K extends (keyof OutboundFrameMessageMap | keyof OutboundToInboundMessageTypeMap)>(frameContext: Window, message: FrameMessage<OutboundFrameMessageMap, K>): Promise<FrameMessage<InboundFrameMessageMap, OutboundToInboundMessageTypeMap[K]> | null> {
    const startTime = new Date();

    return new Promise(async (resolve, reject) => {

      frameContext.postMessage(JSON.stringify(message), 'http://localhost:5002');

      await timeout(2);

      // Spin lock that waits until we receive a response in another "thread".
      // This will return false when a message is in the "response buffer".
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

  convertRawMessageToTypedMessage<K extends keyof InboundFrameMessageMap>(rawMessage: UnknownFrameMessage): FrameMessage<InboundFrameMessageMap, K> {
    return rawMessage as FrameMessage<InboundFrameMessageMap, K>;
  }

  processFrameResponse(message: UnknownFrameMessage): FrameMessage<InboundFrameMessageMap, keyof InboundFrameMessageMap> | null {
    // TODO: Add validation for this RPC here.
    switch (message.command) {
      case "ReceiveCommittedToken":
        return this.convertRawMessageToTypedMessage<"ReceiveCommittedToken">(message);
    }

    return null;
  }
}
