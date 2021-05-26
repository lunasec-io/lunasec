import { FrameMessage, FrameNotification, InboundFrameMessageMap, InboundFrameNotificationMap, UnknownFrameNotification } from '@lunasec/secure-frame-common/build/main/rpc/types';
import React, { Component } from 'react';
import { SecureFormContext } from './SecureFormContext';
import { SecureInput } from './SecureInput';
export interface SecureFormProps extends React.ComponentPropsWithoutRef<'form'> {
    readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export declare class SecureForm extends Component<SecureFormProps> {
    readonly context: React.ContextType<typeof SecureFormContext>;
    private readonly messageCreator;
    private readonly childInputs;
    private abortController;
    constructor(props: SecureFormProps);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    authenticateSession(): Promise<void>;
    blur(notification: FrameNotification<InboundFrameNotificationMap, 'NotifyOnBlur'>): void;
    iframeStartup(notification: FrameNotification<InboundFrameNotificationMap, 'NotifyOnStart'>): Promise<void>;
    frameNotificationCallback(notification: UnknownFrameNotification): void;
    onStyleChange(component: SecureInput): Promise<void>;
    watchStyle(component: SecureInput): void;
    onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>;
    triggerTokenCommit(frameContext: Window, nonce: string): Promise<{
        readonly nonce: string;
        readonly response: FrameMessage<InboundFrameMessageMap, 'ReceiveCommittedToken'>;
    } | null>;
    render(): JSX.Element;
}
//# sourceMappingURL=SecureForm.d.ts.map