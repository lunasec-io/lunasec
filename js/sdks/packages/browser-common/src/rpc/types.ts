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

// Tell the iframe to commit its data to the server and send back a token
export interface CommitTokenMessage {}
// Initialize or update some attribute of the iframe
export interface AttributesMessage {
  id: string;
  style?: string;
  token?: string;
  type?: string;
  filename?: string;
  hidden?: boolean;
}

// Notifications from the iframe
export interface NotifyOnBlurMessage {}
export interface NotifyOnStartMessage {}

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

export type OutboundMessageLookupType = {
  [key in keyof OutboundFrameMessageMap]: keyof InboundFrameMessageMap;
};

export interface OutboundToInboundMessageTypeMap extends OutboundMessageLookupType {
  CommitToken: 'ReceiveCommittedToken';
}

export const OutboundToInboundMessageValueMap: OutboundMessageLookupType = {
  CommitToken: 'ReceiveCommittedToken',
  Attributes: 'ReceiveAttributesConfirmation',
};
