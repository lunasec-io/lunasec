import { __SECURE_FRAME_URL__, secureFramePathname } from '@lunasec/secure-frame-common';
import { AttributesMessage } from '@lunasec/secure-frame-common/build/main/rpc/types';
import { getStyleInfo } from '@lunasec/secure-frame-common/build/main/style-patcher/read';
import { ReadElementStyle } from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import { generateSecureNonce } from '@lunasec/secure-frame-common/build/main/utils/random';
import { camelCaseObject } from '@lunasec/secure-frame-common/build/main/utils/to-camel-case';
import React, { Component, CSSProperties, RefObject } from 'react';

export interface SecureTextProps extends React.ComponentPropsWithoutRef<'span'> {
  token: string;
  secureFrameUrl?: string;
  name: string;
}

export interface SecureTextState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
}

export class SecureText extends Component<SecureTextProps, SecureTextState> {
  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly hiddenElementRef!: RefObject<HTMLSpanElement>;

  /**
   * The frameId is a unique value that is associated with a given iframe instance.
   */
  readonly frameId!: string;

  readonly state!: SecureTextState;

  constructor(props: SecureTextProps) {
    super(props);

    this.frameId = generateSecureNonce();
    this.frameRef = React.createRef();
    this.hiddenElementRef = React.createRef();

    const secureFrameURL = new URL(__SECURE_FRAME_URL__);
    secureFrameURL.pathname = secureFramePathname;

    this.state = {
      // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
      secureFrameUrl: secureFrameURL.toString(),
      frameStyleInfo: null,
    };
  }

  componentDidMount() {
    this.generateElementStyle();
    this.setResizeListener();
  }

  generateElementStyle() {
    if (!this.hiddenElementRef.current) {
      throw new Error('Unable to locate `inputRef` in SecureElement component');
    }

    const frameStyleInfo = getStyleInfo(this.hiddenElementRef.current);

    this.setState({
      frameStyleInfo: frameStyleInfo,
    });
  }

  // Generate some attributes for sending to the iframe via RPC.  This is called from SecureForm
  generateIframeAttributes(): AttributesMessage {
    const id = this.frameId;
    // initialize the attributes with the only required property
    const attrs: AttributesMessage = { id };

    // Build the style for the iframe
    if (!this.state.frameStyleInfo) {
      console.error('Attempted to build style for element but it wasnt populated yet');
    } else {
      attrs.style = JSON.stringify(this.state.frameStyleInfo.childStyle);
    }

    if (this.props.token) {
      attrs.token = this.props.token;
    }

    return attrs;
  }

  generateUrl() {
    const urlFrameId = this.frameId;
    const frameURL = new URL('frame', this.state.secureFrameUrl);
    frameURL.searchParams.set('n', urlFrameId);
    frameURL.searchParams.set('origin', window.location.origin);
    return frameURL.toString();
  }

  setResizeListener() {
    const observer = new ResizeObserver(() => {
      const hiddenElement = this.hiddenElementRef.current;
      const iframe = this.frameRef.current;
      if (!hiddenElement || !iframe || !hiddenElement.offsetHeight) {
        // DOMs not actually ready
        return;
      }
      iframe.style.width = `${hiddenElement.offsetWidth}px`;
      iframe.style.height = `${hiddenElement.offsetHeight}px`;
    });

    if (this.hiddenElementRef.current) {
      observer.observe(this.hiddenElementRef.current as Element);
    }
  }

  renderFrame() {
    if (!this.state.frameStyleInfo) {
      return null;
    }

    const { parentStyle, width, height } = this.state.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      display: 'block',
      width: width,
      height: height,
    };

    const frameUrl = this.generateUrl();

    return <iframe ref={this.frameRef} src={frameUrl} frameBorder={0} style={iframeStyle} key={frameUrl} />;
  }

  render() {
    const { token, children, ...otherProps } = this.props;

    const parentContainerStyle: CSSProperties = {
      position: 'relative',
      display: 'block',
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
      display: 'block',
    };

    return (
      <div
        className={`secure-form-container-${this.frameId} secure-form-container-${this.props.name}`}
        style={parentContainerStyle}
      >
        <span
          {...otherProps}
          className={isRendered ? `secure-form-input--hidden ${this.props.className}` : `${this.props.className}`}
          // TODO: support setting type to the passed prop to catch all possible style selectors, rare case
          ref={this.hiddenElementRef}
          style={{ ...this.props.style, ...hiddenElementStyle }}
          onChange={isRendered ? this.props.onChange : undefined}
        />
        {this.renderFrame()}
      </div>
    );
  }
}
