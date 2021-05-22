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
} from '@lunasec/secure-frame-common';
import React, { Component, RefObject } from 'react';
import { RenderData, AllowedElements } from "../types";

// TODO: pass in list of all supported elements for this extends
export interface WrapperProps extends React.ComponentPropsWithoutRef<keyof AllowedElements> {
  token?: string;
  secureFrameUrl?: string;
  name: string;
  className: string;
}

export interface WrapperState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  frameReady: boolean;
}

// export interface WrappedComponentAttributes {
//   frameRef: RefObject<HTMLIFrameElement>,
//   dummyRef: RefObject<HTMLInputElement | HTMLSpanElement | HTMLTextAreaElement | HTMLAnchorElement>
// }

// TODO: lock down the passed components props instead of the implicit <any>
export default function wrapComponent<e extends keyof AllowedElements>(Wrapped: typeof Component, elementName: e) {
  return class extends Component<WrapperProps, WrapperState> {
    readonly messageCreator: FrameMessageCreator;

    // This is created on component mounted to enable server-side rendering
    abortController!: AbortController;
    /**
     * The frameId is a unique value that is associated with a given iframe instance.
     */
    readonly frameId!: string;

    readonly state!: WrapperState;
    readonly frameRef!: RefObject<HTMLIFrameElement>;
    readonly dummyRef!: RefObject<AllowedElements[e]>;

    constructor(props: WrapperProps) {
      super(props);
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
        frameReady: false,
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
      })
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
      frameURL.searchParams.set('element', elementName);
      return frameURL.toString();
    }

    componentDidUpdate() {
      // Also causes style changes to propagate, as long as they come from within react
      if (this.state.frameReady) {
        this.sendIFrameAttributes();
      }
    }

    // Generate some attributes for sending to the iframe via RPC.
    generateIframeAttributes(): AttributesMessage {
      const id = this.frameId;
      // initialize the attributes with the only required property
      const attrs: AttributesMessage = {id};

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
          this.setState({frameReady: true});
          void this.sendIFrameAttributes();
          break;
      }
    }

    render() {
      const renderData: RenderData = {
        frameId: this.frameId,
        frameUrl: this.generateUrl(),
        frameStyleInfo: this.state.frameStyleInfo,
        frameRef:this.frameRef,
        dummyRef:this.dummyRef,
        mountedCallback: this.wrappedComponentDidMount.bind(this)
      }
      return (
        <Wrapped renderData={renderData} {...this.props} />
      );
    }
  }
}
