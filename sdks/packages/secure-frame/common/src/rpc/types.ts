export interface FrameMessage<K, T extends keyof K> {
  command: T;
  correlationToken: string;
  data: K[T];
}

export interface UnknownFrameMessage {
  command: string;
  correlationToken: string;
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
