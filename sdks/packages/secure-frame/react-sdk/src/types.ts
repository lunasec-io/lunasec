import React, {RefObject} from "react";

export interface AllowedElements {
  span:HTMLSpanElement
  input:HTMLInputElement
  textarea:HTMLTextAreaElement
  a:HTMLAnchorElement
}

export interface RenderData {
  frameId:string,
  frameUrl:string,
  frameStyleInfo:Record<string,any> | null,
  frameRef: RefObject<HTMLIFrameElement>
  dummyRef: RefObject<AllowedElements[keyof AllowedElements]>
  mountedCallback: () => void
}

// export const supportedElements = ['span','input','textarea','a']


export interface WrappedProps extends React.ComponentPropsWithoutRef<keyof AllowedElements> {
  renderData: RenderData,
  name:string
}

