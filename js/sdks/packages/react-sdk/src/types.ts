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

// Below we build the properties our "wrapper" can take.  This, combined with the native react props is what gets passed
// to the user in "WrapperProps" type below.  Note it is a combination of our custom properties and the properties
// for whatever react element we are trying to render.

interface BaseWrapperProps {
  name?: string;
  secureFrameUrl?: string;
}

interface TokenOnlyElementWrapperProps extends BaseWrapperProps {
  token?: string;
}

interface ValidatedInputWrapperProps extends BaseWrapperProps {
  token?: string;
  validator: 'Email' | 'SSN' | 'EIN' | 'SSN_EIN';
  onValidate: (isValid: boolean) => void;
}

interface UploaderWrapperProps extends BaseWrapperProps {
  filetokens?: string[];
  onTokenChange: (token: Array<string>) => void;
}

interface ElementNameToWrapperPropsLookup {
  Input: TokenOnlyElementWrapperProps | ValidatedInputWrapperProps;
  Uploader: UploaderWrapperProps;
  Downloader: TokenOnlyElementWrapperProps;
  Paragraph: TokenOnlyElementWrapperProps;
  TextArea: TokenOnlyElementWrapperProps;
}

export type WrapperProps<C extends keyof ClassLookup> = ElementNameToWrapperPropsLookup[C] &
  React.ComponentPropsWithoutRef<TagLookup[C]>;

// These props are what is passed between the wrapper and the wrapped component found in ./components/elements
// As above, it is combined with the native react props for the given element
export interface LunaSecWrappedComponentProps<C extends keyof ClassLookup> {
  renderData: RenderData<C>;
}

export type WrappedComponentProps<C extends keyof ClassLookup> = LunaSecWrappedComponentProps<C> &
  React.ComponentPropsWithoutRef<TagLookup[C]>;

// Just a property we pass into the wrapped component's props to keep things more organized rather than putting everything in flat
export interface RenderData<C extends keyof ClassLookup> {
  frameId: string;
  frameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  containerClass: string;
  frameClass: string;
  hiddenElementClass: string;
  frameRef: RefObject<HTMLIFrameElement>;
  dummyRef: RefObject<HTMLElementTagNameMap[TagLookup[C]]>;
  dummyInputStyleRef: RefObject<HTMLInputElement>;
  mountedCallback: () => void;
  parentContainerStyle: CSSProperties;
  dummyElementStyle: CSSProperties;
}
