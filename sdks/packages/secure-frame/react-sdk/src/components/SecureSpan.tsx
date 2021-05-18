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
import React, { Component, CSSProperties, RefObject } from 'react';

export interface SecureSpanProps extends React.ComponentPropsWithoutRef<'span'> {
  token?: string;
  secureFrameUrl?: string;
  name: string;
  className: string;
}

export interface SecureSpanState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  frameReady: boolean;
}

export class SecureSpan extends Component<SecureSpanProps, SecureSpanState> {
  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly dummyElementRef!: RefObject<HTMLSpanElement>;
  readonly messageCreator: FrameMessageCreator;

  // This is created on component mounted to enable server-side rendering
  private abortController!: AbortController;
  /**
   * The frameId is a unique value that is associated with a given iframe instance.
   */
  readonly frameId!: string;

  readonly state!: SecureSpanState;

  constructor(props: SecureSpanProps) {
    super(props);
    this.frameId = generateSecureNonce();
    this.frameRef = React.createRef();
    this.dummyElementRef = React.createRef();
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
    // presumably generateElementStyle is called here in order to read the CSS after the component mounts
    // with a side effect of causing it to re-render again once it know's its own styles
    this.setState({
      frameStyleInfo: this.generateElementStyle(),
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  generateElementStyle() {
    if (!this.dummyElementRef.current) {
      throw new Error('Unable to locate `inputRef` in SecureElement component');
    }
    return getStyleInfo(this.dummyElementRef.current);
  }

  generateUrl() {
    const urlFrameId = this.frameId;
    const frameURL = new URL('frame', this.state.secureFrameUrl);
    frameURL.searchParams.set('n', urlFrameId);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('element', 'span');
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
  sendIFrameAttributes() {
    const frameAttributes = this.generateIframeAttributes();
    const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
    if (!this.frameRef.current || !this.frameRef.current.contentWindow) {
      console.error('Frame not initialized for message sending');
      return;
    }
    void this.messageCreator.sendMessageToFrameWithReply(this.frameRef.current.contentWindow, message);
    return;
  }

  frameNotificationCallback(notification: UnknownFrameNotification) {
    if (notification.frameNonce !== this.frameId) {
      console.debug('Received notification intended for different listener, discarding');
      return;
    }
    switch (notification.command) {
      case 'NotifyOnStart':
        this.setState({ frameReady: true });
        this.sendIFrameAttributes();
        break;
    }
  }

  renderFrame() {
    if (!this.state.frameStyleInfo) {
      return null;
    }

    const { height } = this.state.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      // ...camelCaseObject(parentStyle),
      display: 'inline',
      // width: width,
      height: height,
    };

    const frameUrl = this.generateUrl();

    return <iframe ref={this.frameRef} src={frameUrl} style={iframeStyle} frameBorder={0} key={frameUrl} />;
  }

  render() {
    const { ...otherProps } = this.props;

    return (
      <span
        {...otherProps}
        className={`secure-span-container-${this.frameId} secure-span-container-${this.props.name}`}
        ref={this.dummyElementRef}
      >
        {this.renderFrame()}
      </span>
    );
  }
}
