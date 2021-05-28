import {
  __SECURE_FRAME_URL__,
  addReactEventListener,
  AttributesMessage,
  // camelCaseObject,
  FrameMessageCreator,
  generateSecureNonce,
  getStyleInfo,
  ReadElementStyle,
  secureFramePathname,
  UnknownFrameNotification,
} from '@lunasec/browser-common';
import React, { Component, CSSProperties, RefObject } from 'react';

import { AllowedElements, ElementLookup, ElementLookupMap, RenderData } from '../types';

import Downloader from './elements/downloader';
import Span from './elements/span';

// TODO: pass in list of all supported elements for this extends
export interface WrapperProps<T extends ElementLookup> extends React.ComponentPropsWithoutRef<ElementLookupMap[T]> {
  token?: string;
  secureFrameUrl?: string;
  name: string;
  className: string;
}

export interface WrapperState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
}

// TODO: figure out how to pass this to the Wrapped props below
// interface WrappedProps extends React.ComponentPropsWithoutRef<keyof AllowedElements> {
//   renderData: RenderData;
// }

export const WrappedComponentLookupMap = {
  span: Span,
  a: Downloader,
  input: Downloader,
  textarea: Downloader,
};

export class WrappedComponent<
  E extends keyof AllowedElements,
  TWrappedd extends typeof WrappedComponentLookupMap[E]
> extends Component<WrapperProps, WrapperState> {
  readonly messageCreator: FrameMessageCreator;

  // This is created on component mounted to enable server-side rendering
  abortController!: AbortController;
  /**
   * The frameId is a unique value that is associated with a given iframe instance.
   */
  readonly frameId!: string;
  readonly wrapped!: TWrappedd;
  readonly elementName!: E;

  readonly state!: WrapperState;
  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly dummyRef!: RefObject<AllowedElements[E]>;
  frameReady = false;
  constructor(wrappedComponent: TWrappedd, elementName: E, props: WrapperProps) {
    super(props);
    this.wrapped = wrappedComponent;
    this.elementName = elementName;
    this.frameId = generateSecureNonce();
    this.frameRef = React.createRef();
    this.dummyRef = React.createRef();
    const secureFrameURL = new URL(__SECURE_FRAME_URL__);
    secureFrameURL.pathname = secureFramePathname;
    this.messageCreator = new FrameMessageCreator((notification) => this.frameNotificationCallback(notification));
    this.state = {
      // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
      secureFrameUrl: secureFrameURL.toString(),
      frameStyleInfo: null,
    };
  }

  componentDidMount() {
    this.abortController = new AbortController();
    addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));
  }

  // Pass this to our wrapped component so it can tell us when its on the DOM and ready to give us styles
  // Our pattern causes the component to render twice, the first time without the iframe
  // in order to capture the style from the dummy element.  Then the this callback is called
  // and style is put onto the state, causing the component to rerender with the iframe properly styled
  wrappedComponentDidMount() {
    this.setState({
      frameStyleInfo: this.generateElementStyle(),
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  generateElementStyle() {
    if (!this.dummyRef.current) {
      throw new Error('Unable to locate `inputRef` for wrapped component when generating style');
    }
    return getStyleInfo(this.dummyRef.current);
  }

  generateUrl() {
    const urlFrameId = this.frameId;
    const frameURL = new URL('frame', this.state.secureFrameUrl);
    frameURL.searchParams.set('n', urlFrameId);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('element', this.elementName);
    return frameURL.toString();
  }

  componentDidUpdate() {
    // Also causes style changes to propagate, as long as they come from within react
    if (this.frameReady) {
      console.log('component ', this.elementName, ' updated, sending attributes');
      void this.sendIFrameAttributes();
    }
  }

  // Generate some attributes for sending to the iframe via RPC.
  generateIframeAttributes(): AttributesMessage {
    const id = this.frameId;
    // initialize the attributes with the only required property
    const attrs: AttributesMessage = { id };

    // Build the style for the iframe
    const style = this.generateElementStyle();
    if (!style) {
      console.error('Attempted to build style for element but it wasnt populated yet');
    } else {
      delete style.childStyle.style.display;
      attrs.style = JSON.stringify(style.childStyle);
    }

    if (this.props.token) {
      attrs.token = this.props.token;
    }

    return attrs;
  }

  // Give the iframe all the information it needs to exist when it wakes up
  async sendIFrameAttributes() {
    console.log('sending iframe attributes for element ', this.elementName);
    const frameAttributes = this.generateIframeAttributes();
    const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
    if (!this.frameRef.current || !this.frameRef.current.contentWindow) {
      console.error('Frame not initialized for message sending');
      return;
    }
    await this.messageCreator.sendMessageToFrameWithReply(this.frameRef.current.contentWindow, message);
    return;
  }

  frameNotificationCallback(notification: UnknownFrameNotification) {
    if (notification.frameNonce !== this.frameId) {
      console.debug('Received notification intended for different listener, discarding');
      return;
    }
    switch (notification.command) {
      case 'NotifyOnStart':
        this.frameReady = true;
        void this.sendIFrameAttributes();
        break;
    }
  }

  render() {
    // We make the parent container relative so that we can throw the dummy element to the top left
    // corner so that it will not move the real elements around.
    const parentContainerStyle: CSSProperties = {
      position: 'relative',
      display: 'block',
    };

    const isRendered = this.state.frameStyleInfo !== undefined;

    const dummyElementStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      // We can't set the "visibility" to "collapsed" or "hidden",
      // Or else the "on focus" and "on blur" events won't fire.
      // So we use zIndex instead to "hide" the input.
      zIndex: isRendered ? -1 : 1,
      opacity: isRendered ? 0 : 1,
      display: 'block',
      resize: 'none',
    };

    const renderData: RenderData<AllowedElements[E]> = {
      frameId: this.frameId,
      frameUrl: this.generateUrl(),
      frameStyleInfo: this.state.frameStyleInfo,
      frameRef: this.frameRef,
      dummyRef: this.dummyRef,
      mountedCallback: this.wrappedComponentDidMount.bind(this),
      parentContainerStyle,
      dummyElementStyle,
    };

    console.log(this.wrapped);

    // const w = new this.wrapped()

    // @ts-ignore
    return <this.wrapped renderData={renderData} {...this.props} />;
  }
}

// TODO: lock down the passed components props instead of the implicit <any>
export default function wrapComponent<
  E extends keyof AllowedElements,
  TWrapped extends typeof WrappedComponentLookupMap[E]
>(Wrapped: TWrapped, elementName: E) {
  return class WrappedWrappedComponent extends WrappedComponent<E, TWrapped> {
    constructor(props: WrapperProps) {
      super(Wrapped, elementName, props);
    }
  };
}
