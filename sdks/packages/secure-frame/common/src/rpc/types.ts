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
  // Notifications don't have correlation tokens
  correlationToken?: undefined;
  frameNonce: string;
  data: any;
}

export interface CommitTokenMessage {}

export interface NotifyOnBlurMessage {}

export interface ReceiveCommittedTokenMessage {
  success: boolean;
  token?: string;
}

export interface OutboundFrameMessageMap {
  CommitToken: CommitTokenMessage;
}

export interface InboundFrameMessageMap {
  ReceiveCommittedToken: ReceiveCommittedTokenMessage;
}

export interface InboundFrameNotificationMap {
  NotifyOnBlur: NotifyOnBlurMessage;
}

export type OutboundMessageLookupType = {
  [key in keyof OutboundFrameMessageMap]: keyof InboundFrameMessageMap;
};

export interface OutboundToInboundMessageTypeMap extends OutboundMessageLookupType {
  CommitToken: 'ReceiveCommittedToken';
}

export const OutboundToInboundMessageValueMap: OutboundMessageLookupType = {
  CommitToken: 'ReceiveCommittedToken',
};
