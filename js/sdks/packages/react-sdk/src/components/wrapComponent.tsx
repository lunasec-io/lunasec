/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
  AttributesMessage,
  FrameMessenger,
  FrameNotification,
  generateSecureNonce,
  getStyleInfo,
  LunaSecAuthentication,
  ReadElementStyle,
  triggerBlur,
  triggerFocus,
} from '@lunasec/browser-common';
import { LunaSecError, scrubProperties } from '@lunasec/isomorphic-common';
import classnames from 'classnames';
import React, { Component, CSSProperties, JSXElementConstructor, RefObject } from 'react';
import styled from 'styled-components';

import { LunaSecConfigContext } from '../providers/LunaSecConfigContext';
import { SecureFormContext, SecureFormContextType } from '../providers/SecureFormContext';
import {
  ClassLookup,
  LunaSecWrappedComponentProps,
  RenderData,
  TagLookup,
  WrapperProps,
  WrapperPropsWithProviders,
} from '../types/internal-types';
import setNativeValue from '../utils/set-native-value';

export interface WrapperState {
  frameStyleInfo: ReadElementStyle | null;
  frameFullyLoaded: boolean;
  sessionAuthenticated: boolean;
  isValid: boolean;
}

// Since almost all the logic of being a Secure Component is shared(such as RPC),
// this function wraps a component found in ./elements with that logic.
// and adjusts for any small differences using the componentName to change behaviors between different types of components.
export default function WrapComponent<W extends keyof ClassLookup>(
  UnstyledWrappedParam: ClassLookup[W],
  componentNameParam: W
) {
  // We do this to let typescript know these function parameters will not be modified
  // typescript doesn't trust function params to stay locked, but it does trust const
  const UnstyledWrapped: ClassLookup[W] = UnstyledWrappedParam;
  const componentName: W = componentNameParam;

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

  class WrappedComponent extends Component<WrapperPropsWithProviders<W>, WrapperState> {
    declare context: SecureFormContextType;
    static contextType = SecureFormContext;

    readonly messageCreator: FrameMessenger;
    // This is created on component mounted to enable server-side rendering
    abortController!: AbortController;
    /**
     * The frameId is a random unique value(nonce) that is associated with a given iframe instance.
     */
    readonly frameId!: string;

    readonly frameRef!: RefObject<HTMLIFrameElement>;
    readonly dummyRef!: RefObject<HTMLElementTagNameMap[TagLookup[W]]>;
    readonly dummyInputStyleRef!: RefObject<HTMLInputElement>;
    readonly formContext!: SecureFormContextType;
    readonly lunaSecDomain: string;
    readonly isInputLike = componentName === 'Input' || componentName === 'TextArea';
    frameReadyForListening = false;
    readonly auth: LunaSecAuthentication;
    stopSessionManagement?: () => void;
    private lastTokenSent?: string;

    constructor(props: WrapperPropsWithProviders<W>) {
      super(props);
      this.throwIfLunaSecConfigNotSet();
      this.throwIfErrorHandlerNotSet();
      this.frameId = generateSecureNonce();
      this.frameRef = React.createRef();
      this.dummyRef = React.createRef();
      this.dummyInputStyleRef = React.createRef();
      this.formContext = props.formContext;
      this.lunaSecDomain = props.lunaSecConfigContext.lunaSecDomain;

      this.messageCreator = new FrameMessenger(this.lunaSecDomain, this.frameId, (notification) =>
        this.frameNotificationCallback(notification)
      );

      this.auth = new LunaSecAuthentication(
        props.lunaSecConfigContext.lunaSecDomain,
        props.lunaSecConfigContext.authenticationErrorHandler,
        props.lunaSecConfigContext.sessionAuthProvider
      );

      this.state = {
        frameStyleInfo: null,
        frameFullyLoaded: false,
        sessionAuthenticated: false,
        isValid: true,
      };
    }

    throwIfLunaSecConfigNotSet() {
      // It would be nice if there was an easier way to detect if we had loaded the default provider instead of one set by the user
      if (this.props.lunaSecConfigContext.lunaSecDomain.length === 0) {
        throw new Error(
          'LunaSecConfigContext Provider must be registered around any LunaSec components.  You probably want to include it at the top level in your app.tsx'
        );
      }
    }

    throwIfErrorHandlerNotSet() {
      if (!this.props.errorHandler || typeof this.props.errorHandler !== 'function') {
        throw new Error(
          'Error handler must be set for all LunaSec Components.  Pass the errorHandler prop to your secure component with a function to handle errors'
        );
      }
    }

    componentDidMount() {
      this.abortController = new AbortController();
      this.messageCreator.listen(window, this.abortController);
      void this.auth.startSessionManagement().then((abortSessionCallback) => {
        this.setState({ sessionAuthenticated: true });
        this.stopSessionManagement = abortSessionCallback;
      });
    }

    // Pass this to our wrapped component so it can tell us when its on the DOM and ready to give us styles
    // Our pattern causes the component to render twice, the first time without the iframe
    // in order to capture the style from the dummy element.  Then this callback is called
    // and style is put onto the state, causing the component to rerender with the iframe properly styled
    wrappedComponentDidMount() {
      this.setState({
        frameStyleInfo: this.generateElementStyle(),
      });
      if (this.isInputLike) {
        this.formContext.addTokenCommitCallback(this.frameId, () => {
          return this.triggerTokenCommit();
        });
        // Prefill the dummy element with a token if one was passed in props
        if ('token' in this.props) {
          const currentDummy = this.dummyRef.current;
          if (!currentDummy) {
            throw new Error('Token Commit cant find dummy element to insert token into');
          }
          if ('value' in currentDummy) {
            currentDummy.value = this.props.token || '';
          }
        }
      }
    }

    componentWillUnmount() {
      this.abortController.abort();
      if (this.isInputLike) {
        this.formContext.removeTokenCommitCallback(this.frameId);
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
        throw new Error('Unable to locate `dummyRef` for wrapped component when generating style');
      }

      const dummyInputStyleRef = this.dummyInputStyleRef.current;
      if (componentName === 'Input' && !dummyInputStyleRef) {
        throw new Error('Unable to locate dummyInputStyleRef when generating style for input');
      }

      // Inputs have a separate dummy element for styling because of issues with html5 validations on inputs
      // if its not an input just use the the main dummy element
      const styleRef = componentName === 'Input' && dummyInputStyleRef ? dummyInputStyleRef : this.dummyRef.current;
      const styleInfo = getStyleInfo(styleRef);

      if (!styleInfo) {
        return null;
      }

      if (!styleInfo.parentStyle) {
        return null;
      }

      styleInfo.parentStyle.position = 'absolute';
      styleInfo.parentStyle.top = '0';
      styleInfo.parentStyle.left = '0';

      return styleInfo;
    }

    generateUrl() {
      const lunaConf = this.props.lunaSecConfigContext;

      const frameURL = new URL('frame', lunaConf.lunaSecDomain);
      frameURL.searchParams.set('n', this.frameId);
      frameURL.searchParams.set('origin', window.location.origin);
      frameURL.searchParams.set('component', componentName);
      return frameURL.toString();
    }

    validationHandler(isValid: boolean) {
      if (!('onValidate' in this.props)) {
        throw new Error('Got validation message from iframe for component without an onValidation handler');
      }
      this.setState({ isValid: isValid });
      if ('onValidate' in this.props && this.props.onValidate) {
        this.props.onValidate(isValid);
      }
    }

    // TODO: (Plugins Epic) refactor this into a callback that gets passed to this class
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
      if ((attrs.component === 'Uploader' || attrs.component === 'Input') && dummyElement) {
        const inputType = dummyElement.getAttribute('type');
        if (inputType) {
          attrs.type = inputType;
        }
      }

      if (attrs.component === 'Uploader' || attrs.component === 'Input' || attrs.component === 'TextArea') {
        if ('customMetadata' in this.props) {
          attrs.customMetadata = this.props.customMetadata;
        }
      }

      if ('token' in this.props && 'fileTokens' in this.props) {
        throw new Error("Can't have both tokens and fileTokens specified in props");
      }

      if (attrs.component !== 'Uploader' && 'token' in this.props) {
        if (this.props.token !== this.lastTokenSent) {
          attrs.token = this.props.token;
          this.lastTokenSent = this.props.token;
        }
      }
      if (attrs.component === 'Uploader' && 'fileTokens' in this.props) {
        attrs.fileTokens = this.props.fileTokens;
      }
      if (attrs.component === 'Input' && 'placeholder' in this.props && this.props.placeholder) {
        attrs.placeholder = this.props.placeholder;
      }

      if ('validator' in this.props) {
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
          if ('onTokenChange' in this.props && this.props.onTokenChange && 'token' in notification.data) {
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
        case 'NotifyOnSubmit':
          this.formContext.submit();
          break;
        case 'NotifyOnError':
          this.props.errorHandler(new LunaSecError(notification.data)); // Call the application's provided error handler
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
        throw new Error('Missing element to trigger blur');
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

    // Left here for posterity, but I (forrest) think we can assume styles wont be changed except by react
    // and that is caught by ComponentDidUpdate above.  This function has serious performance impact
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
      if (response.data.token === undefined) {
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
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // We can't set the "visibility" to "collapsed" or "hidden",
        // Or else the "on focus" and "on blur" events won't fire.
        // So we use zIndex instead to "hide" the input.
        zIndex: -1,
        opacity: 0,
        display: 'block',
        resize: 'none',
      };

      const validatedName = this.props.name !== undefined ? this.props.name : '';

      // TODO: Fix the types so that we don't have to do this anymore.
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const containerName = `secure-${componentName.toLowerCase()}-container-${validatedName}`;

      const containerClass = classnames({
        [`secure-${componentName.toLowerCase()}-container-${this.frameId}`]: true,
        [containerName]: !!this.props.name,
      });

      const renderData: RenderData<W> = {
        frameId: this.frameId,
        frameUrl: this.generateUrl(),
        frameStyleInfo: this.state.frameStyleInfo,
        containerClass,
        frameClass: classnames(`lunasec-iframe-${componentName.toLowerCase()}`, {
          hidden: !this.state.frameFullyLoaded,
        }),
        hiddenElementClass: classnames({ invalid: !this.state.isValid }), // only used by input at the moment
        frameRef: this.frameRef,
        dummyRef: this.dummyRef,
        dummyInputStyleRef: this.dummyInputStyleRef,
        mountedCallback: this.wrappedComponentDidMount.bind(this),
        parentContainerStyle,
        dummyElementStyle,
      };

      const scrubbedProps = scrubProperties(this.props, [
        'customMetadata',
        'token',
        'onTokenChange',
        'onValidate',
        'validator',
        'formContext',
        'lunaSecConfigContext',
        'errorHandler',
        'fileTokens',
      ]);

      const propsForWrapped: LunaSecWrappedComponentProps<W> = {
        renderData,
      };

      // TODO: Fix this so the properties don't break in typescript.
      // For now be careful and think about what props you pass
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const IgnoredWrapped = Wrapped as any;

      return (
        <IgnoredWrapped {...scrubbedProps} {...propsForWrapped}>
          {this.renderLoadingOverlay()}
        </IgnoredWrapped>
      );
    }
  }

  // This small functional component is the only way for a component to access
  // more than one provider, thanks to a major shortcoming of react. So our
  // "wrapped component" is actually double wrapped, first by this function
  // component to add the providers, then by the class above.
  // You can never be too careful.
  return function ProviderWrapper(props: WrapperProps<W>) {
    const componentWithProviders: React.ReactElement<
      WrapperProps<W>,
      JSXElementConstructor<Component<WrapperPropsWithProviders<W>, WrapperState>>
    > = (
      <SecureFormContext.Consumer>
        {(formContext) => {
          return (
            <LunaSecConfigContext.Consumer>
              {(lunaSecConfigContext) => {
                return (
                  <WrappedComponent {...props} formContext={formContext} lunaSecConfigContext={lunaSecConfigContext} />
                );
              }}
            </LunaSecConfigContext.Consumer>
          );
        }}
      </SecureFormContext.Consumer>
    );

    return componentWithProviders;
  };
}
