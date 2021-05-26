import { FrameMessage, InboundFrameMessageMap, OutboundFrameMessageMap, OutboundToInboundMessageTypeMap, UnknownFrameMessage, UnknownFrameNotification } from './types';
export declare class FrameMessageCreator {
    private readonly frameResponses;
    private readonly timeout;
    private readonly frameNotificationCallback;
    constructor(notificationCallback: (notification: UnknownFrameNotification) => void, timeout?: number);
    createMessageToFrame<K extends keyof OutboundFrameMessageMap>(command: K, data: OutboundFrameMessageMap[K]): FrameMessage<OutboundFrameMessageMap, K>;
    postReceived(unknownPost: UnknownFrameMessage | UnknownFrameNotification): void;
    handleNotificationReceived(notification: UnknownFrameNotification): void;
    handleMessageReceived(message: UnknownFrameMessage): void;
    sendMessageToFrameWithReply<K extends keyof OutboundFrameMessageMap | keyof OutboundToInboundMessageTypeMap>(frameContext: Window, message: FrameMessage<OutboundFrameMessageMap, K>): Promise<FrameMessage<InboundFrameMessageMap, OutboundToInboundMessageTypeMap[K]> | null>;
    convertRawMessageToTypedMessage<K extends keyof InboundFrameMessageMap>(rawMessage: UnknownFrameMessage): FrameMessage<InboundFrameMessageMap, K>;
    processFrameResponse(message: UnknownFrameMessage): FrameMessage<InboundFrameMessageMap, keyof InboundFrameMessageMap> | null;
}
//# sourceMappingURL=frame-message-creator.d.ts.map