import { ReadElementStyle } from '@lunasec/browser-common';
import React, { CSSProperties, RefObject } from 'react';

import Downloader from './components/elements/downloader';
import Input from './components/elements/input';
import Paragraph from './components/elements/paragraph';
import TextArea from './components/elements/textarea';
import Uploader from './components/elements/uploader';

export interface ClassLookup {
  Paragraph: typeof Paragraph;
  Downloader: typeof Downloader;
  Uploader: typeof Uploader; // fragile, fix this later by manually passing the class as a type argument into WrapComponent
  TextArea: typeof TextArea;
  Input: typeof Input;
}

export interface TagLookup {
  Paragraph: 'p';
  Downloader: 'a';
  Uploader: 'input';
  TextArea: 'textarea';
  Input: 'input';
}

export const componentNames: Array<keyof ClassLookup> = ['Paragraph', 'Downloader', 'Uploader', 'TextArea', 'Input'];
export type ComponentNames = keyof ClassLookup;
// The properties our "wrapper" can take.  This, combined with the native react props is what gets passed
// to the user in "WrapperProps" type below.  Note it is a combination of our custom properties and the properties
// for whatever react element we are trying to render
interface LunaSecWrapperProps<C extends keyof ClassLookup> {
  token?: C extends 'Uploader' ? never : string;
  name: string;
  secureFrameUrl?: string;
  // special file picker types:
  filetokens?: C extends 'Uploader' ? string[] : never;
  onTokenChange?: C extends 'Uploader' ? (token: Array<string>) => void : never;
  validator?: C extends 'Input' ? 'Email' | 'SSN' | 'EIN' | 'SSN_EIN' : never;
  onValidate?: C extends 'Input' ? (isValid: boolean) => void : never; // It would be cool to require this whenever `validator` is passed above, not sure how without insane typescript foo though
}

export type WrapperProps<C extends keyof ClassLookup> = LunaSecWrapperProps<C> &
  React.ComponentPropsWithoutRef<TagLookup[C]>;

// These props are what is passed between the wrapper and the wrapped component found in ./components/elements
// As above, it is combined with the native react props for the given element
export interface LunaSecWrappedComponentProps<C extends keyof ClassLookup> {
  renderData: RenderData<C>;
  name: string;
}

export type WrappedComponentProps<C extends keyof ClassLookup> = LunaSecWrappedComponentProps<C> &
  React.ComponentPropsWithoutRef<TagLookup[C]>;

// Just a property we pass into the wrapped component's props to keep things more organized rather than putting everything in flat
export interface RenderData<C extends keyof ClassLookup> {
  frameId: string;
  frameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  frameContainerClasses?: Record<string, boolean>;
  frameRef: RefObject<HTMLIFrameElement>;
  dummyRef: RefObject<HTMLElementTagNameMap[TagLookup[C]]>;
  mountedCallback: () => void;
  parentContainerStyle: CSSProperties;
  dummyElementStyle: CSSProperties;
}
