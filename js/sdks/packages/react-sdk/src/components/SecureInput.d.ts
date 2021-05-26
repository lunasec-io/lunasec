import { AttributesMessage } from '@lunasec/secure-frame-common/build/main/rpc/types';
import { ReadElementStyle } from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import React, { Component, RefObject } from 'react';
import { SecureFormContext } from './SecureFormContext';
export declare const supportedInputTypes: string[];
export declare const supportedElements: string[];
export interface SecureInputProps extends React.ComponentPropsWithoutRef<'input'> {
    value?: string;
    secureFrameUrl?: string;
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    type?: typeof supportedInputTypes[number];
    element?: typeof supportedElements[number];
}
export interface SecureInputState {
    secureFrameUrl: string;
    frameStyleInfo: ReadElementStyle | null;
}
export declare class SecureInput extends Component<SecureInputProps, SecureInputState> {
    context: React.ContextType<typeof SecureFormContext>;
    static contextType: React.Context<import("./SecureFormContext").SecureFormContextProps>;
    readonly frameRef: RefObject<HTMLIFrameElement>;
    readonly inputRef: RefObject<HTMLInputElement>;
    /**
     * The frameId is a unique value that is associated with a given iframe instance.
     */
    readonly frameId: string;
    readonly state: SecureInputState;
    constructor(props: SecureInputProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    generateElementStyle(): void;
    generateIframeAttributes(): AttributesMessage;
    generateUrl(): string;
    setResizeListener(): void;
    renderFrame(): JSX.Element | null;
    renderHiddenElement(props: Record<string, any>): JSX.Element;
    render(): JSX.Element;
}
//# sourceMappingURL=SecureInput.d.ts.map