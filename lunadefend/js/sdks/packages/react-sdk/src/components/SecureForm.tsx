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
import { timeout } from '@lunasec/browser-common';
import React, { Component } from 'react';

import { SecureFormContext } from '../providers/SecureFormContext';

export interface SecureFormProps extends React.ComponentPropsWithoutRef<'form'> {
  /**
   * @param On Submit - We call this function when the form submits, just like a normal React form
   */
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Secure Form Component, a wrapper around HTML Form that can handle SecureElements.
 * Use it like a normal `<form>` element.
 * ```tsx
 * <SecureForm name="secure-form-example" onSubmit={(e) => this.persistTokens(e)}>
 *   Your input elements, a mix of LunaSec and normal is fine
 *   <input type="submit" />
 * </SecureForm>
 * ```
 * @category Component
 *
 */
export class SecureForm extends Component<SecureFormProps> {
  declare readonly context: React.ContextType<typeof SecureFormContext>;
  private tokenCommitCallbacks: Record<string, () => Promise<void>>;
  private form: React.RefObject<HTMLFormElement>;

  constructor(props: SecureFormProps) {
    super(props);
    this.tokenCommitCallbacks = {};
    this.form = React.createRef();
  }

  private async onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
