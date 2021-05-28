import React, { Component, RefObject } from 'react';

export type WrappedComponentLookup = {
  [key in keyof AllowedElements]: Component<WrappedProps<HTMLElement>>;
};

export interface AllowedElements {
  span: HTMLSpanElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
  a: HTMLAnchorElement;
}

export type ElementLookup = {
  [key in keyof AllowedElements]: React.ComponentPropsWithoutRef<key>;
};

export const ElementLookupMap: ElementLookup = {
  a: React.ComponentPropsWithoutRef<'a'>,
  span: React.ComponentPropsWithoutRef<'span'>,
  textarea: React.ComponentPropsWithoutRef<'textarea'>,
  input: React.ComponentPropsWithoutRef<'input'>,
};

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
