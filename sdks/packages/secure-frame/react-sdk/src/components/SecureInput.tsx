import { __SECURE_FRAME_URL__, secureFramePathname } from '@lunasec/secure-frame-common';
import { AttributesMessage } from '@lunasec/secure-frame-common/build/main/rpc/types';
import { getStyleInfo } from '@lunasec/secure-frame-common/build/main/style-patcher/read';
import { ReadElementStyle } from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import { generateSecureNonce } from '@lunasec/secure-frame-common/build/main/utils/random';
import { camelCaseObject } from '@lunasec/secure-frame-common/build/main/utils/to-camel-case';
import React, { Component, CSSProperties, RefObject } from 'react';

import { SecureFormContext } from './SecureFormContext';

export const SecureInputType = {
  text: 'text',
  password: 'password',
  email: 'email',
} as const;

export interface SecureInputProps extends React.ComponentPropsWithoutRef<'input'> {
  value?: string;
  secureFrameUrl?: string;
  // TODO: Will this force the component to have a key?
  name: string;
  // TODO: Add form validation logic..?
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: typeof SecureInputType[keyof typeof SecureInputType];
}

export interface SecureInputState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
}

export class SecureInput extends Component<SecureInputProps, SecureInputState> {
  declare context: React.ContextType<typeof SecureFormContext>;

  static contextType = SecureFormContext;

  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly inputRef!: RefObject<HTMLInputElement>;

  /**
   * The frameId is a unique value that is associated with a given iframe instance.
   */
  readonly frameId!: string;

  readonly state!: SecureInputState;

  constructor(props: SecureInputProps) {
    super(props);

    this.frameId = generateSecureNonce();
    this.frameRef = React.createRef();
    this.inputRef = React.createRef();

    const secureFrameURL = new URL(__SECURE_FRAME_URL__);
    secureFrameURL.pathname = secureFramePathname;

    this.state = {
      // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
      secureFrameUrl: secureFrameURL.toString(),
      frameStyleInfo: null,
    };
  }

  componentDidMount() {
    this.context.addComponent(this);

    this.generateElementStyle();
    this.setResizeListener();
  }

  componentWillUnmount() {
    this.context.removeComponent(this.frameId);
  }

  generateElementStyle() {
    if (!this.inputRef.current) {
      throw new Error('Unable to locate `inputRef` in SecureInput component');
    }

    const frameStyleInfo = getStyleInfo(this.inputRef.current);

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
      console.debug(
        'Attempted to build style for input but it wasnt populated yet. Omitting style from attribute message'
      );
    } else {
      attrs.style = JSON.stringify(this.state.frameStyleInfo.childStyle);
    }

    if (this.props.value) {
      attrs.token = this.props.value;
    }

    if (this.props.type) {
      const validTypes = Object.values(SecureInputType);
      if (!validTypes.includes(this.props.type)) {
        throw new Error(`SecureInput not set to allowed type.  Permitted types are: ${validTypes.toString()}`);
      }
      attrs.type = this.props.type;
    }
    return attrs;
  }

  generateUrl() {
    const urlFrameId = this.frameId;
    const frameURL = new URL('frame', this.state.secureFrameUrl);
    frameURL.searchParams.set('n', urlFrameId);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('element', 'input');
    return frameURL.toString();
  }

  setResizeListener() {
    const observer = new ResizeObserver(() => {
      const hiddenInput = this.inputRef.current;
      const iframe = this.frameRef.current;
      if (!hiddenInput || !iframe || !hiddenInput.offsetHeight) {
        // DOMs not actually ready
        return;
      }
      iframe.style.width = `${hiddenInput.offsetWidth}px`;
      iframe.style.height = `${hiddenInput.offsetHeight}px`;
    });

    const hiddenInput = this.inputRef.current;
    if (hiddenInput) {
      observer.observe(hiddenInput as Element);
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
    const { value, children, ...otherProps } = this.props;

    const parentContainerStyle: CSSProperties = {
      position: 'relative',
      display: 'block',
    };

    const isRendered = this.state.frameStyleInfo !== undefined;

    const hiddenInputStyle: CSSProperties = {
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
        <input
          {...otherProps}
          className={isRendered ? `secure-form-input--hidden ${this.props.className}` : `${this.props.className}`}
          // TODO: support setting type to the passed prop to catch all possible style selectors, rare case
          type="text"
          ref={this.inputRef}
          name={this.props.name}
          defaultValue={isRendered ? this.props.value : ''}
          style={{ ...this.props.style, ...hiddenInputStyle }}
          onChange={isRendered ? this.props.onChange : undefined}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        {this.renderFrame()}
      </div>
    );
  }
}
