import React, { RefObject } from 'react';

export interface AllowedElements {
  span: HTMLSpanElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
  a: HTMLAnchorElement;
}

// Just a property we pass on component props to keep things more organized rather than putting everything directly into props
// Helps
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

// export const supportedElements = ['span','input','textarea','a']

export interface WrappedProps<E extends AllowedElements[keyof AllowedElements]>
  extends React.ComponentPropsWithoutRef<keyof AllowedElements> {
  renderData: RenderData<E>;
  name: string;
}
