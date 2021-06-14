import {
  __SECURE_FRAME_URL__,
  addReactEventListener,
  AttributesMessage,
  // camelCaseObject,
  FrameMessageCreator,
  FrameNotification,
  generateSecureNonce,
  getStyleInfo,
  ReadElementStyle,
  secureFramePathname,
} from '@lunasec/browser-common';
import React, { Component, CSSProperties, RefObject } from 'react';
import styled from 'styled-components';

import { ClassLookup, LunaSecWrappedComponentProps, RenderData, TagLookup, WrapperProps } from '../types';

export interface WrapperState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  frameFullyLoaded: boolean;
}

// Since almost all the logic of being a Secure Component is shared(such as RPC),
// this function wraps a component found in ./elements with that logic.
// and adjusts for any small differences using the componentName to change behaviors between different types of components.
export default function WrapComponent<W extends keyof ClassLookup>(UnstyledWrapped: ClassLookup[W], componentName: W) {
  // Add some style to the element, for now just to do loading animations
  const Wrapped = styled(UnstyledWrapped)`
    .loading-animation {
      animation: shimmer 2s infinite;
      background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
      background-size: 1000px 100%;
      border-radius: 5px;
    }
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
    .hidden {
      opacity: 0;
    }
  `;

  return class WrappedComponent extends Component<WrapperProps<W>, WrapperState> {
    readonly messageCreator: FrameMessageCreator;

    // This is created on component mounted to enable server-side rendering
    abortController!: AbortController;
    /**
     * The frameId is a unique value that is associated with a given iframe instance.
     */
    readonly frameId!: string;

    readonly frameRef!: RefObject<HTMLIFrameElement>;
    readonly dummyRef!: RefObject<HTMLElementTagNameMap[TagLookup[W]]>;
    frameReadyForListening = false;

    constructor(props: WrapperProps<W>) {
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
        frameFullyLoaded: false,
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

    componentDidUpdate() {
      // Also causes style changes to propagate, as long as they come from within react
      if (this.frameReadyForListening) {
        void this.sendIFrameAttributes();
      }
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
      frameURL.searchParams.set('component', componentName);
      return frameURL.toString();
    }

    // Generate some attributes for sending to the iframe via RPC.
    generateIFrameAttributes(): AttributesMessage {
      const id = this.frameId;
      // initialize the attributes with the only required property
      const attrs: AttributesMessage = { id, component: componentName };

      // Build the style for the iframe
      const style = this.generateElementStyle();
      if (!style) {
        console.error('Attempted to build style for element but it wasnt populated yet');
      } else {
        delete style.childStyle.style.display;
        attrs.style = JSON.stringify(style.childStyle);
      }

      // Pull from the "type" of an input element if we have one in our wrapped element
      const dummyElement = this.dummyRef.current;
      if ((componentName === 'Uploader' || componentName === 'Input') && dummyElement) {
        const inputType = dummyElement.getAttribute('type');
        if (inputType) {
          attrs.type = inputType;
        }
      }

      if (this.props.token && this.props.filetokens) {
        throw new Error("Can't have both tokens and filetokens specified in props");
      }
      if (this.props.token) {
        attrs.token = this.props.token;
      }
      if (this.props.filetokens) {
        attrs.fileTokens = this.props.filetokens;
      }

      return attrs;
    }

    // Give the iframe all the information it needs to exist when it wakes up
    async sendIFrameAttributes() {
      const frameAttributes = this.generateIFrameAttributes();
      const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
      if (!this.frameRef.current || !this.frameRef.current.contentWindow) {
        console.error('Frame not initialized for message sending');
        return;
      }
      await this.messageCreator.sendMessageToFrameWithReply(this.frameRef.current.contentWindow, message);
      return;
    }

    frameNotificationCallback(notification: FrameNotification) {
      // TODO: move this filter into the RPC layer, we shouldnt have to filter here
      if (notification.frameNonce !== this.frameId) {
        return;
      }

      switch (notification.command) {
        case 'NotifyOnStart':
          this.frameReadyForListening = true;
          void this.sendIFrameAttributes();
          break;
        case 'NotifyOnToken':
          if (this.props.onTokenChange && 'token' in notification.data) {
            this.props.onTokenChange(notification.data.token);
          }
          break;
        case 'NotifyOnFullyLoaded':
          this.setState({ frameFullyLoaded: true });
          break;
      }
    }

    // Called on form submit from the SecureForm
    public getToken() {
      return;
    }

    renderLoadingOverlay() {
      if (this.state.frameFullyLoaded) {
        return null;
      }

      const overlayStyles: CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        display: 'block',
      };

      return <div style={overlayStyles} className="loading-animation" />;
    }

    render() {
      // We make the parent container relative so that we can throw the dummy element to the top left
      // corner so that it will not move the real elements around.
      const parentContainerStyle: CSSProperties = {
        position: 'relative',
        display: 'block',
      };

      const dummyElementStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        // We can't set the "visibility" to "collapsed" or "hidden",
        // Or else the "on focus" and "on blur" events won't fire.
        // So we use zIndex instead to "hide" the input.
        zIndex: -1,
        opacity: 0,
        display: 'block',
        resize: 'none',
      };

      const renderData: RenderData<W> = {
        frameId: this.frameId,
        frameUrl: this.generateUrl(),
        frameStyleInfo: this.state.frameStyleInfo,
        frameContainerClasses: {
          hidden: !this.state.frameFullyLoaded,
        },
        frameRef: this.frameRef,
        dummyRef: this.dummyRef,
        mountedCallback: this.wrappedComponentDidMount.bind(this),
        parentContainerStyle,
        dummyElementStyle,
      };

      const { token, secureFrameUrl, onTokenChange, ...scrubbedProps } = this.props;

      // TODO: Fix this issue, and in the mean time be very careful with your props
      const propsForWrapped: LunaSecWrappedComponentProps<W> = {
        name: this.props.name,
        renderData,
      };

      // TODO: Fix this so the properties don't break in typescript.
      // For now be careful and think about what props you pass
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const IgnoredWrapped = Wrapped as any;

      return (
        <IgnoredWrapped {...scrubbedProps} {...propsForWrapped}>
          {this.renderLoadingOverlay()}
        </IgnoredWrapped>
      );
    }
  };
}
