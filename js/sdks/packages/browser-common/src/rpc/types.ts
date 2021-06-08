export interface FrameMessage<K, T extends keyof K> {
  command: T;
  correlationToken: string;
  data: K[T];
}
// TODO: Get rid of this and replace with a type alias that narrows as we did below with FrameNotifications
export interface UnknownFrameMessage {
  command: string;
  correlationToken: string;
  frameNonce?: undefined;
  data: any;
}

// Tell the iframe to commit its data to the server and send back a token
export type CommitTokenMessage = Record<any, never>;
// Initialize or update some attribute of the iframe

export interface AttributesMessage {
  id: string;
  style?: string;
  token?: string;
  type?: string;
  hidden?: boolean;
  fileTokens?: [string];
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

// FRAME NOTIFICATION TYPES START HERE
// Frame notifications go from the frame to the outside app and don't receive a reply

type NotifyOnBlurData = Record<any, never>;
type NotifyOnStartData = Record<any, never>;
interface NotifyOnTokenData {
  token: string | Array<string>;
}

interface BaseFrameNotification {
  frameNonce: string;
  correlationToken?: undefined; // Necessary because when Posts come in we don't know if they are a message or a notification
}

export interface NotifyOnBlur extends BaseFrameNotification {
  command: 'NotifyOnBlur';
  data: NotifyOnBlurData;
}

export interface NotifyOnStart extends BaseFrameNotification {
  command: 'NotifyOnStart';
  data: NotifyOnStartData;
}

export interface NotifyOnToken extends BaseFrameNotification {
  command: 'NotifyOnToken';
  data: NotifyOnTokenData;
}

export type FrameNotification = NotifyOnBlur | NotifyOnStart | NotifyOnToken;
