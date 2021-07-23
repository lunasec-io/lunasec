// TODO: Is this component even necessary, at all?
// TODO: Delete it
import React, { Component } from 'react';

import { SecureFormContext } from '../providers/SecureFormContext';

export interface SecureSubmitProps {}

export class SecureSubmit extends Component<SecureSubmitProps> {
  declare context: React.ContextType<typeof SecureFormContext>;

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
