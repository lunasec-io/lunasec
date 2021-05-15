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
}

export class SecureSpan extends Component<SecureSpanProps, SecureSpanState> {
  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly hiddenElementRef!: RefObject<HTMLSpanElement>;
  readonly messageCreator: FrameMessageCreator;
  private frameReady: boolean;
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
    this.hiddenElementRef = React.createRef();
    this.frameReady = false;
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
    // doing this in state after mounting is kinda weird, consider just calling the function in render instead
    this.setState({
      frameStyleInfo: this.generateElementStyle(),
    });
    // this.setResizeListener();
    // this.watchStyle();  WATCH STYLES IS OFF
  }

  generateElementStyle() {
    if (!this.hiddenElementRef.current) {
      throw new Error('Unable to locate `inputRef` in SecureElement component');
    }

    return getStyleInfo(this.hiddenElementRef.current);
  }

  generateUrl() {
    const urlFrameId = this.frameId;
    const frameURL = new URL('frame', this.state.secureFrameUrl);
    frameURL.searchParams.set('n', urlFrameId);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('element', 'span');
    return frameURL.toString();
  }
  //
  // setResizeListener() {
  //   const observer = new ResizeObserver(() => {
  //     const hiddenElement = this.hiddenElementRef.current;
  //     const iframe = this.frameRef.current;
  //     if (!hiddenElement || !iframe || !hiddenElement.offsetHeight) {
  //       // DOMs not actually ready
  //       return;
  //     }
  //     iframe.style.width = `${hiddenElement.offsetWidth}px`;
  //     iframe.style.height = `${hiddenElement.offsetHeight}px`;
  //   });
  //
  //   if (this.hiddenElementRef.current) {
  //     observer.observe(this.hiddenElementRef.current as Element);
  //   }
  // }

  componentDidUpdate() {
    if (this.frameReady) {
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
      attrs.style = JSON.stringify(style.childStyle);
      console.log('stringified child style ', style.childStyle);
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
        this.frameReady = true;
        this.sendIFrameAttributes();
        break;
    }
  }

  watchStyle() {
    console.log('SPAN STYLE CHANGED, SENDING MESSAGE');
    const self = this;
    function onStyleChange() {
      console.log('STYLE CHANGE DETECTED');
      const { id, style } = self.generateIframeAttributes();
      const message = self.messageCreator.createMessageToFrame('Attributes', { id, style });
      if (!self.frameRef.current || !self.frameRef.current.contentWindow) {
        return console.error('Style watcher updated for component that no longer has iframe ');
      }
      void self.messageCreator.sendMessageToFrameWithReply(self.frameRef.current.contentWindow, message);
    }

    const observer = new MutationObserver(onStyleChange);
    if (!this.hiddenElementRef.current) {
      return console.error('Attempted to register style watcher on component not yet mounted');
    }
    observer.observe(this.hiddenElementRef.current, {
      attributeFilter: ['style'],
    });
  }

  renderFrame() {
    if (!this.state.frameStyleInfo) {
      return null;
    }

    const { parentStyle, height } = this.state.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      // ...camelCaseObject(parentStyle),
      display: 'inline',
      // width: width,
      height: height,
    };
    console.log('iframe style to render is ', parentStyle);

    const frameUrl = this.generateUrl();

    return <iframe ref={this.frameRef} src={frameUrl} style={iframeStyle} frameBorder={0} key={frameUrl} />;
  }

  render() {
    const { token, ...otherProps } = this.props;

    const parentContainerStyle: CSSProperties = {
      position: 'relative',
      display: 'inline',
    };

    const isRendered = this.state.frameStyleInfo !== undefined;

    const hiddenElementStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      // We can't set the "visibility" to "collapsed" or "hidden",
      // Or else the "on focus" and "on blur" events won't fire.
      // So we use zIndex instead to "hide" the input.
      zIndex: isRendered ? -1 : 1,
      opacity: isRendered ? 0 : 1,
      display: 'inline',
    };

    return (
      <div
        className={`secure-span-container-${this.frameId} secure-span-container-${this.props.name}`}
        style={parentContainerStyle}
      >
        <span
          {...otherProps}
          className={isRendered ? `secure-span--hidden ${this.props.className}` : `${this.props.className}`}
          ref={this.hiddenElementRef}
          style={{ ...this.props.style, ...hiddenElementStyle }}
          onChange={isRendered ? this.props.onChange : undefined}
        />
        {this.renderFrame()}
      </div>
    );
  }
}
