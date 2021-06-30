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

interface BaseAttr {
  id: string;
  style?: string;
  token?: string;
  type?: string;
  hidden?: boolean;
  fileTokens?: string[];
}

export interface InputAttr extends BaseAttr {
  component: 'Input';
  token?: string;
  type?: string;
  placeholder?: string;
}

export interface TextAreaAttr extends BaseAttr {
  component: 'TextArea';
  token?: string;
  type?: string;
}

export interface DownloaderAttr extends BaseAttr {
  component: 'Downloader';
  token?: string;
  hidden?: boolean;
}

export interface ParagraphAttr extends BaseAttr {
  component: 'Paragraph';
  token?: string;
}

export interface UploaderAttr extends BaseAttr {
  component: 'Uploader';
  fileTokens?: string[];
  type?: string;
}

export type AttributesMessage = InputAttr | DownloaderAttr | ParagraphAttr | UploaderAttr | TextAreaAttr;

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

interface NotifyOnTokenData {
  token: Array<string>;
}

interface BaseFrameNotification {
  frameNonce: string;
  correlationToken?: undefined; // Necessary because when Posts come in we don't know if they are a message or a notification
}

export interface NotifyOnBlur extends BaseFrameNotification {
  command: 'NotifyOnBlur';
  data: Record<any, never>;
}

export interface NotifyOnStart extends BaseFrameNotification {
  command: 'NotifyOnStart';
  data: Record<any, never>;
}

export interface NotifyOnToken extends BaseFrameNotification {
  command: 'NotifyOnToken';
  data: NotifyOnTokenData;
}

export interface NotifyOnFullyLoaded extends BaseFrameNotification {
  command: 'NotifyOnFullyLoaded';
  data: Record<any, never>;
}

export interface NotifyOnSubmit extends BaseFrameNotification {
  command: 'NotifyOnSubmit';
  data: Record<any, never>;
}

export type FrameNotification = NotifyOnBlur | NotifyOnStart | NotifyOnToken | NotifyOnFullyLoaded | NotifyOnSubmit;
