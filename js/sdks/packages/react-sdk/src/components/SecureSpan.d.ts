import { AttributesMessage, FrameMessageCreator, ReadElementStyle, UnknownFrameNotification } from '@lunasec/secure-frame-common';
import React, { Component, RefObject } from 'react';
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
export declare class SecureSpan extends Component<SecureSpanProps, SecureSpanState> {
    readonly frameRef: RefObject<HTMLIFrameElement>;
    readonly dummyElementRef: RefObject<HTMLSpanElement>;
    readonly messageCreator: FrameMessageCreator;
    private abortController;
    /**
     * The frameId is a unique value that is associated with a given iframe instance.
     */
    readonly frameId: string;
    readonly state: SecureSpanState;
    constructor(props: SecureSpanProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    generateElementStyle(): any;
    generateUrl(): string;
    componentDidUpdate(): void;
    generateIframeAttributes(): AttributesMessage;
    sendIFrameAttributes(): Promise<void>;
    frameNotificationCallback(notification: UnknownFrameNotification): void;
    renderFrame(): JSX.Element | null;
    render(): JSX.Element;
}
//# sourceMappingURL=SecureSpan.d.ts.map