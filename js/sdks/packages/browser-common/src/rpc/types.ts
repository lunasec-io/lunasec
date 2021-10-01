/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { LunaSecErrorProperties } from '@lunasec/isomorphic-common';

import { ValidatorName } from '../types';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomMetadata = Record<string, any>;
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
  data: unknown;
}

// Tell the iframe to commit its data to the server and send back a token
export type CommitTokenMessage = Record<string | number, never>;
// Initialize or update some attribute of the iframe

interface BaseAttr {
  id: string;
  component: string;
  style?: string;
}

export interface InputAttr extends BaseAttr {
  component: 'Input';
  token?: string;
  type?: string;
  placeholder?: string;
  validator?: ValidatorName;
  customMetadata?: CustomMetadata;
}

export interface TextAreaAttr extends BaseAttr {
  component: 'TextArea';
  token?: string;
  type?: string;
  customMetadata?: CustomMetadata;
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
  customMetadata?: CustomMetadata;
}

export type AttributesMessage = InputAttr | DownloaderAttr | ParagraphAttr | UploaderAttr | TextAreaAttr;

// export interface AttributesMessageLookup {
//   Paragraph: ParagraphAttr;
//   Downloader: DownloaderAttr;
//   Uploader: UploaderAttr;
//   TextArea: TextAreaAttr;
//   Input: InputAttr;
// }

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

interface BaseFrameNotification {
  frameNonce: string;
  correlationToken?: undefined; // Necessary because when Posts come in we don't know if they are a message or a notification
}

export interface NotifyOnBlur extends BaseFrameNotification {
  command: 'NotifyOnBlur';
  data: Record<string | number, never>;
}

export interface NotifyOnStart extends BaseFrameNotification {
  command: 'NotifyOnStart';
  data: Record<string | number, never>;
}

export interface NotifyOnToken extends BaseFrameNotification {
  command: 'NotifyOnToken';
  data: {
    token: Array<string>;
  };
}

export interface NotifyOnFullyLoaded extends BaseFrameNotification {
  command: 'NotifyOnFullyLoaded';
  data: Record<string | number, never>;
}

export interface NotifyOnValidate extends BaseFrameNotification {
  command: 'NotifyOnValidate';
  data: { isValid: boolean };
}

export interface NotifyOnSubmit extends BaseFrameNotification {
  command: 'NotifyOnSubmit';
  data: Record<string | number, never>;
}

export interface NotifyOnError extends BaseFrameNotification {
  command: 'NotifyOnError';
  data: LunaSecErrorProperties;
}

export type FrameNotification =
  | NotifyOnBlur
  | NotifyOnStart
  | NotifyOnToken
  | NotifyOnFullyLoaded
  | NotifyOnSubmit
  | NotifyOnValidate
  | NotifyOnError;
