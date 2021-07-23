import { timeout } from '@lunasec/browser-common';
import React, { Component } from 'react';

import { SecureFormContext } from '../providers/SecureFormContext';

export interface SecureFormProps extends React.ComponentPropsWithoutRef<'form'> {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SecureForm extends Component<SecureFormProps> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;
  private tokenCommitCallbacks: Record<string, () => Promise<void>>;
  private form: React.RefObject<HTMLFormElement>;

  constructor(props: SecureFormProps) {
    super(props);
    this.tokenCommitCallbacks = {};
    this.form = React.createRef();
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commitPromises = Object.keys(this.tokenCommitCallbacks).map((frameId) => {
      const triggerCommit = this.tokenCommitCallbacks[frameId];
      return triggerCommit();
    });

    // Now just wait for side effects to happen
    // TODO: Catch and display errors here in some clean way
    await Promise.all(commitPromises);

    // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
    // like it would have in a normal form where the user pressed submit.  That's right, we are hacking now
    await timeout(5);
    this.props.onSubmit(e);
  }

  render() {
    return (
      <SecureFormContext.Provider
        value={{
          addTokenCommitCallback: (frameId: string, cb: () => Promise<void>) => {
            this.tokenCommitCallbacks[frameId] = cb;
          },
          removeTokenCommitCallback: (frameId: string) => {
            delete this.tokenCommitCallbacks[frameId];
          },
          submit: () => {
            if (this.form.current) {
              this.form.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          },
        }}
      >
        <form {...this.props} ref={this.form} onSubmit={(e) => this.onSubmit(e)}>
          {this.props.children}
        </form>
      </SecureFormContext.Provider>
    );
  }
}
