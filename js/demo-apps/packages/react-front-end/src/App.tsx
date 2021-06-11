import { downloadFile } from '@lunasec/js-sdk';
import { SecureDownload, SecureForm, SecureInput, SecureParagraph, SecureUpload } from '@lunasec/react-sdk';
import React from 'react';

// import logo from './logo.svg';
import './App.css';

interface IAppState {
  foo?: string;
  bar?: string;
  normal?: string;
}

class App extends React.Component<Record<string, never>, IAppState> {
  // Hardcoded token here will not work for you, use tokenizer CLI to upload your own test file
  private readonly downloadToken = 'lunasec-02bf82d6-025b-4b6a-bb63-e2d90877179a';

  constructor(props: Record<string, never>) {
    super(props);
    this.state = this.retrieveTokens();
  }

  handleFooChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting foo', event.target.value);
    this.setState({ foo: event.target.value });
  }

  handleBarChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting bar', event.target.value);
    this.setState({ bar: event.target.value });
  }

  handleUploaderChange(tokens: string | Array<string>) {
    console.log('file uploader gave new tokens: ', tokens);
  }

  persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    window.sessionStorage.setItem(
      'savedFields',
      JSON.stringify({
        foo: this.state.foo,
        bar: this.state.bar,
        normal: this.state.normal,
      })
    );
  }

  retrieveTokens() {
    const dataString = window.sessionStorage.getItem('savedFields');

    // fail through to empty object if nothing set
    const savedData = JSON.parse(dataString || '{}') as IAppState;

    return {
      foo: savedData.foo,
      bar: savedData.bar,
      normal: savedData.normal,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="app-form">
          <section>
            <h2>Secure Form</h2>
            <SecureForm onSubmit={(e) => this.persistTokens(e)}>
              <SecureInput
                name="foo"
                value={this.state.foo}
                onChange={(e) => this.handleFooChange(e)}
                onBlur={(e) => console.log('blur1', e)}
                element="textarea"
              />
              <SecureInput
                name="bar"
                type="password"
                value={this.state.bar}
                onChange={(e) => this.handleBarChange(e)}
                onBlur={(e) => console.log('blur2', e)}
              />
              <input
                className="d-block"
                name="normal"
                type="text"
                value={this.state.normal}
                placeholder="Insecure field coexisting"
                onChange={(e) => this.setState({ normal: e.target.value })}
                onBlur={(e) => console.log('blur3', e)}
              />
              <input type="submit" />
            </SecureForm>
          </section>
          <section>
            <h2>Secure Paragraph</h2>
            <div>
              <span>Type in the form above to populate</span>
              <SecureParagraph name="demo-paragraph" token={this.state.foo} className="test-secure-span" />
            </div>
          </section>
          <section>
            <h3>Secure Download (element)</h3>
            <div>
              <SecureDownload name="securefile.pdf" token={this.downloadToken} className="test-secure-downloader" />
            </div>
          </section>
          <section>
            <h3>Secure Download (programmatic)</h3>
            <button onClick={() => downloadFile(this.downloadToken)}>Click to trigger download with JS</button>
          </section>
          <section>
            <h2>Secure Upload</h2>

            <div>
              <SecureUpload
                name="uploader"
                filetokens={[this.downloadToken]}
                onTokenChange={(tokens) => {
                  this.handleUploaderChange(tokens);
                }}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
