import { getStyleInfo } from '@lunasec/secure-frame-common/build/main/style-patcher/read';
import { ElementStyleInfo, ReadElementStyle } from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import { generateSecureNonce } from '@lunasec/secure-frame-common/build/main/utils/random';
import { camelCaseObject } from '@lunasec/secure-frame-common/build/main/utils/to-camel-case';
import React, { Component, CSSProperties, RefObject } from 'react';

import { SecureFormContext } from './SecureFormContext';

export enum SecureInputType {
  Text = 'text',
  Password = 'password',
  Email = 'email'
}

export interface SecureInputProps {
  token?: string;
  secureFrameUrl?: string;
  // TODO: Will this force the component to have a key?
  name: string;
  // TODO: Add form validation logic..?
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: SecureInputType;
}

export interface SecureInputState {
  /**
   * The frameId is a unique value that is associated with a given iframe instance.
   */
  token?: string;
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
}

export class SecureInput extends Component<SecureInputProps, SecureInputState> {
  declare context: React.ContextType<typeof SecureFormContext>;

  static contextType = SecureFormContext;

  readonly frameRef!: RefObject<HTMLIFrameElement>;
  readonly inputRef!: RefObject<HTMLInputElement>;
  readonly frameId!: string;
  readonly state!: SecureInputState;

  constructor(props: SecureInputProps) {
    super(props);

    this.frameId = generateSecureNonce();
    this.frameRef = React.createRef();
    this.inputRef = React.createRef();

    this.state = {
      // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
      secureFrameUrl: props.secureFrameUrl || 'http://localhost:5002/',
      frameStyleInfo: null,
    };
  }

  componentDidMount() {
    this.context.addComponentRef(this.frameRef, this.inputRef, this.frameId, this.props.name);

    this.generateElementStyle();
    this.setResizeListener();
  }

  componentWillUnmount() {
    this.context.removeComponentRef(this.frameId);
  }

  tokenChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
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

  generateUrl(frameStyleInfo: ElementStyleInfo) {
    const urlFrameId = encodeURIComponent(this.frameId);
    console.log(frameStyleInfo)
    const styleHash = encodeURIComponent(JSON.stringify(frameStyleInfo));

    const frameURL = new URL('frame', this.state.secureFrameUrl);

    frameURL.hash = styleHash;
    frameURL.searchParams.set('n', urlFrameId);

    if (this.props.token) {
      frameURL.searchParams.set('t', encodeURIComponent(this.props.token));
    }

    if (this.props.type) {
      const validTypes = Object.values(SecureInputType);

      if (!validTypes.includes(this.props.type)) {
        throw new Error(
          `SecureInput not set to allowed type.  Permitted types are: ${validTypes.toString()}`
        );
      }

      frameURL.searchParams.set('type', this.props.type);
    }

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

    const { parentStyle, width, height, childStyle } = this.state.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      display: 'block',
      width: width,
      height: height,
    };

    return (
      <iframe
        ref={this.frameRef}
        src={this.generateUrl(childStyle)}
        frameBorder={0}
        style={iframeStyle}
        key={this.frameId}
      />
    );
  }

  render() {
    const parentContainerStyle: CSSProperties = {
      // position: 'relative'
      display: 'block',
    };

    const divContainerStyle: CSSProperties = {
      position: 'relative',
    };

    const hiddenInputStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -999,
      visibility: this.state.frameStyleInfo ? 'hidden' : 'visible',
      display: 'block',
    };

    return (
      <div
        className={`secure-form-container-${this.frameId} secure-form-container-${this.props.name}`}
        style={parentContainerStyle}
      >
        <div style={divContainerStyle}>
          <input
            className={`secure-form-input--hidden`}
            // TODO: support setting type to the passed prop to catch all possible style selectors, rare case
            type="text"
            ref={this.inputRef}
            name={this.props.name}
            defaultValue={this.props.token}
            style={hiddenInputStyle}
            onChange={(e) => this.tokenChanged(e)}
          />
          {this.renderFrame()}
        </div>
      </div>
    );
  }
}
