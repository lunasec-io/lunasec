import React, { Component } from 'react';

import { SecureFormContext } from './SecureFormContext';

export interface SecureFormProps extends React.ComponentPropsWithoutRef<'form'> {
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SecureForm extends Component<SecureFormProps> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;
  private tokenCommitCallbacks: Record<string, () => Promise<void>>;

  constructor(props: SecureFormProps) {
    super(props);
    this.tokenCommitCallbacks = {};
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
    await new Promise((resolve) => {
      setTimeout(resolve, 5);
    });
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
        }}
      >
        <form {...this.props} onSubmit={(e) => this.onSubmit(e)}>
          {this.props.children}
        </form>
      </SecureFormContext.Provider>
    );
  }
}
