export interface FrameMessage<K, T extends keyof K> {
    command: T;
    correlationToken: string;
    data: K[T];
}
export interface UnknownFrameMessage {
    command: string;
    correlationToken: string;
    frameNonce?: undefined;
    data: any;
}
export interface FrameNotification<K, T extends keyof K> {
    command: T;
    frameNonce: string;
    data: K[T];
}
export interface UnknownFrameNotification {
    command: string;
    correlationToken?: undefined;
    frameNonce: string;
    data: any;
}
export interface CommitTokenMessage {
}
export interface AttributesMessage {
    id: string;
    style?: string;
    token?: string;
    type?: string;
}
export interface NotifyOnBlurMessage {
}
export interface NotifyOnStartMessage {
}
export interface ReceiveCommittedTokenMessage {
    success: boolean;
    token?: string;
    error?: string;
}
export interface ReceivedAttributesMessage {
    success: boolean;
    error?: string;
}
export interface OutboundFrameMessageMap {
    CommitToken: CommitTokenMessage;
    Attributes: AttributesMessage;
}
export interface InboundFrameMessageMap {
    ReceiveCommittedToken: ReceiveCommittedTokenMessage;
    ReceiveAttributesConfirmation: ReceivedAttributesMessage;
}
export interface InboundFrameNotificationMap {
    NotifyOnBlur: NotifyOnBlurMessage;
    NotifyOnStart: NotifyOnStartMessage;
}
export declare type OutboundMessageLookupType = {
    [key in keyof OutboundFrameMessageMap]: keyof InboundFrameMessageMap;
};
export interface OutboundToInboundMessageTypeMap extends OutboundMessageLookupType {
    CommitToken: 'ReceiveCommittedToken';
}
export declare const OutboundToInboundMessageValueMap: OutboundMessageLookupType;
//# sourceMappingURL=types.d.ts.map