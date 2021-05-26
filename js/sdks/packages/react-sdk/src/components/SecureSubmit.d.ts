import React, { Component } from 'react';
import { SecureFormContext } from './SecureFormContext';
export interface SecureSubmitProps {
}
export declare class SecureSubmit extends Component<SecureSubmitProps> {
    context: React.ContextType<typeof SecureFormContext>;
    static contextType: React.Context<import("./SecureFormContext").SecureFormContextProps>;
    render(): JSX.Element;
}
//# sourceMappingURL=SecureSubmit.d.ts.map