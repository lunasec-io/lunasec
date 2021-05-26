import React, {Component} from 'react';
import {SecureFormContext} from './SecureFormContext';

export interface SecureSubmitProps {
}

export class SecureSubmit extends Component<SecureSubmitProps> {
  declare context: React.ContextType<typeof SecureFormContext>

  static contextType = SecureFormContext;

  render() {
    // TODO: Allow passing classes to this component for styling
    return (
      <input type="submit" className={`secure-form-submit`}>
        {this.props.children}
      </input>
    );
  }
}
