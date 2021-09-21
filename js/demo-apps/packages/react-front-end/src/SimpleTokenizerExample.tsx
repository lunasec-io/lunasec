<!--
  ~ Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
import { SimpleTokenizer } from '@lunasec/tokenizer-sdk';
import { CONFIG_DEFAULTS } from '@lunasec/tokenizer-sdk/build/main/constants';
import React, { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface InsecureFormExampleState {
  inputValue: string;
  inputToken?: string;
  detokenizedValue?: string;
}

const tokenizer = new SimpleTokenizer({
  host: 'http://localhost:3001',
});

export class SimpleTokenizerExample extends React.Component<Record<any, never>, InsecureFormExampleState> {
  constructor(props: Record<any, never>) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log('insecure form submit');
  }

  async tokenizeValue(e: FocusEvent<HTMLInputElement>) {
    const result = await tokenizer.tokenize(e.target.value);

    if (!result.success) {
      throw result.error;
    }

    this.setState({
      inputToken: result.tokenId,
    });
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  async readToken() {
    if (!this.state.inputToken) {
      throw new Error('Missing input token');
    }

    console.log('detokenizing:', this.state.inputToken);
    const result = await tokenizer.detokenize(this.state.inputToken);

    if (!result.success) {
      throw result.error;
    }

    this.setState({
      detokenizedValue: result.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onBlur={(e) => this.tokenizeValue(e)}
            onChange={(e) => this.onInputChange(e)}
            value={this.state.inputValue}
          />
          <h4>Token: {this.state.inputToken}</h4>
          <input type="submit" />
        </form>
        <button onClick={() => this.readToken()} disabled={this.state.inputToken === undefined}>
          Detokenize
        </button>
        <h4>Detokenized Value: {this.state.detokenizedValue}</h4>
      </div>
    );
  }
}
