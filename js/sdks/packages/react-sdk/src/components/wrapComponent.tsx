import {
  __SECURE_FRAME_URL__,
  addReactEventListener,
  AttributesMessage,
  FrameMessageCreator,
  FrameNotification,
  generateSecureNonce,
  getStyleInfo,
  ReadElementStyle,
  secureFramePathname,
  startSessionManagement,
  triggerBlur,
  triggerFocus,
} from '@lunasec/browser-common';
import React, { Component, CSSProperties, RefObject } from 'react';
import styled from 'styled-components';

import { ClassLookup, LunaSecWrappedComponentProps, RenderData, TagLookup, WrapperProps } from '../types';
import setNativeValue from '../utils/set-native-value';

import { SecureFormContext } from './SecureFormContext';

export interface WrapperState {
  secureFrameUrl: string;
  frameStyleInfo: ReadElementStyle | null;
  frameFullyLoaded: boolean;
  sessionAuthenticated: boolean;
  isValid: boolean;
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
    declare context: React.ContextType<typeof SecureFormContext>;
    static contextType = SecureFormContext;

    readonly messageCreator: FrameMessageCreator;
    // This is created on component mounted to enable server-side rendering
    abortController!: AbortController;
    /**
     * The frameId is a unique value that is associated with a given iframe instance.
     */
    readonly frameId!: string;

    readonly frameRef!: RefObject<HTMLIFrameElement>;
    readonly dummyRef!: RefObject<HTMLElementTagNameMap[TagLookup[W]]>;

    readonly isInputLike = componentName === 'Input' || componentName === 'TextArea';
    frameReadyForListening = false;
    stopSessionManagement: (() => void) | null = null;

    constructor(props: WrapperProps<W>) {
      super(props);
      this.frameId = generateSecureNonce();
      this.frameRef = React.createRef();
      this.dummyRef = React.createRef();
      const secureFrameURL = new URL(__SECURE_FRAME_URL__);
      secureFrameURL.pathname = secureFramePathname;
      this.messageCreator = new FrameMessageCreator(this.frameId, (notification) =>
        this.frameNotificationCallback(notification)
      );
      this.state = {
        // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
        secureFrameUrl: secureFrameURL.toString(),
        frameStyleInfo: null,
        frameFullyLoaded: false,
        sessionAuthenticated: false,
        isValid: true,
      };
    }

    componentDidMount() {
      this.abortController = new AbortController();
      addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));
      void startSessionManagement().then((abort) => {
        this.setState({ sessionAuthenticated: true });
        this.stopSessionManagement = abort;
      });
    }

    // Pass this to our wrapped component so it can tell us when its on the DOM and ready to give us styles
    // Our pattern causes the component to render twice, the first time without the iframe
    // in order to capture the style from the dummy element.  Then the this callback is called
    // and style is put onto the state, causing the component to rerender with the iframe properly styled
    wrappedComponentDidMount() {
      this.setState({
        frameStyleInfo: this.generateElementStyle(),
      });
      if (this.isInputLike) {
        this.context.addTokenCommitCallback(this.frameId, () => {
          return this.triggerTokenCommit();
        });
      }
    }

    componentWillUnmount() {
      this.abortController.abort();
      if (this.isInputLike) {
        this.context.removeTokenCommitCallback(this.frameId);
      }
      if (this.stopSessionManagement) {
        this.stopSessionManagement();
      }
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

    validationHandler(isValid: boolean) {
      if (!this.props.onValidate) {
        throw new Error('Got validation message from iframe for component without an onValidation handler');
      }
      this.setState({ isValid: isValid });
      this.props.onValidate(isValid);
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

      if (this.props.validator) {
        if (attrs.component !== 'Input') {
          throw new Error('Validators can only be set on SecureInputs');
        }
        if (!this.props.onValidate) {
          throw new Error(
            'Must pass onValidate() callback when a validator is specified.  Use the callback to block the form from submitting and display user feedback.'
          );
        }
        attrs.validator = this.props.validator;
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
        case 'NotifyOnBlur':
          this.blur();
          break;
        case 'NotifyOnValidate':
          this.validationHandler(notification.data.isValid);
          break;
      }
    }

    // Blur happens after the element loses focus
    blur() {
      if (!this.isInputLike) {
        return;
      }
      const dummyElement = this.dummyRef.current;
      if (!dummyElement) {
        throw new Error('Missing element to trigger notification for in secure frame');
      }

      const currentlyFocusedElement = document.activeElement;

      // In order to trigger a blur event, we must first focus the element.
      triggerFocus(dummyElement);
      // Only then will the blur be triggered.
      triggerBlur(dummyElement);

      // put the focus back where it was before we hacked it
      if (currentlyFocusedElement) {
        triggerFocus(currentlyFocusedElement);
      }
    }

    // Left here for posterity, but I (factoidforrest) think we can assume styles wont be changed except by react
    // and that is caught by ComponentDidUpdate above
    // watchStyle() {
    //   const observer = new MutationObserver(() => this.sendIFrameAttributes());
    //   if (!this.dummyRef.current) {
    //     return console.error('Attempted to register style watcher on component not yet mounted');
    //   }
    //   observer.observe(this.dummyRef.current, {
    //     attributeFilter: ['style'],
    //   });
    // }

    // Called on form submit from the SecureForm
    // we pass this into the SecureFormProvider so that it can call it when we submit
    public async triggerTokenCommit(): Promise<void> {
      if (componentName !== 'Input' && componentName !== 'TextArea') {
        throw new Error('Attempted to trigger a token commit for something that wasnt an Input or TextArea');
      }

      const message = this.messageCreator.createMessageToFrame('CommitToken', {});

      const currentFrame = this.frameRef.current;
      if (!currentFrame || !currentFrame.contentWindow) {
        console.error('Attempted token commit for unmounted frame');
        return;
      }
      const response = await this.messageCreator.sendMessageToFrameWithReply(currentFrame.contentWindow, message);

      if (!response) {
        return console.error('No response from frame for token commit');
      }
      if (!response.data.success) {
        return console.error('Tokenization failed: ', response.data.error);
      }
      if (!response.data.token) {
        return console.error('Tokenization didnt return a token: ', response);
      }

      const currentDummy = this.dummyRef.current;
      if (!currentDummy) {
        throw new Error('Token Commit cant find dummy element to insert token into');
      }

      setNativeValue(componentName, currentDummy, response.data.token);
      // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
      // like it would have in a normal form where the user pressed submit.  Yes, we are hacking hard now
      return new Promise((resolve) => {
        setTimeout(resolve, 5);
      });
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
      if (!this.state.sessionAuthenticated) {
        return null;
      }
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
          invalid: !this.state.isValid,
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
