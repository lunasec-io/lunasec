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
