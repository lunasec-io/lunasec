import React, { RefObject } from 'react';

import Downloader from './components/elements/downloader';
import Span from './components/elements/span';

export interface AllowedElements {
  span: HTMLSpanElement;
  a: HTMLAnchorElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
}

export interface WrappedClassLookup {
  span: typeof Span;
  a: typeof Downloader;
}

// The properties our "wrapper" can take.  This, combined with the native react props is what gets passed
// to the user in "WrapperProps" type below.  Note it is a combination of our custom properties and the properties
// for whatever react element we are trying to render
interface LunaSecWrapperProps {
  token?: string;
  name: string;
  secureFrameUrl?: string;
}

export type WrapperProps<E extends keyof AllowedElements> = LunaSecWrapperProps & React.ComponentPropsWithoutRef<E>;

// These props are what is passed between the wrapper and the wrapped component found in ./components/elements
// As above, it is combined with the native react props for the given element
interface LunaSecWrappedComponentProps<E extends AllowedElements[keyof AllowedElements]> {
  renderData: RenderData<E>;
  name: string;
}

export type WrappedComponentProps<E extends keyof AllowedElements> = LunaSecWrappedComponentProps<AllowedElements[E]> &
  React.ComponentPropsWithoutRef<E>;

// Just a property we pass into the wrapped component's props to keep things more organized rather than putting everything in flat
export interface RenderData<E extends AllowedElements[keyof AllowedElements]> {
  frameId: string;
  frameUrl: string;
  frameStyleInfo: Record<string, any> | null;
  frameRef: RefObject<HTMLIFrameElement>;
  dummyRef: RefObject<E>;
  mountedCallback: () => void;
  parentContainerStyle: Record<string, any>;
  dummyElementStyle: Record<string, any>;
}
