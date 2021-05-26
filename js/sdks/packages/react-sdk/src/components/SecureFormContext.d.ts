import React from 'react';
import { SecureInput } from './SecureInput';
export declare type SecureFormContextProps = {
    addComponent: (component: SecureInput) => void;
    readonly removeComponent: (frameId: string) => void;
};
export declare const SecureFormContext: React.Context<SecureFormContextProps>;
//# sourceMappingURL=SecureFormContext.d.ts.map