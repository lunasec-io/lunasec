// import { gql } from '@apollo/client';
import { downloadFile } from '@lunasec/js-sdk';
import {
  onLunaSecAuthError,
  SecureDownload,
  SecureForm,
  SecureInput,
  SecureParagraph,
  SecureTextArea,
  SecureUpload,
} from '@lunasec/react-sdk';
import React from 'react';

// import logo from './logo.svg';
import './App.css';

interface Tokens {
  foo?: string;
  bar?: string;
  file?: string;
}

interface Fields {
  normal?: string;
}

interface IAppState {
  loading: boolean;
  fields: Fields;
  tokenIDs: Tokens;
  authError: string | null;
}

const defaultState: IAppState = {
  loading: true,
  fields: {},
  tokenIDs: {},
  authError: null,
};

// const FORMDATA_QUERY = gql`
//   query GetFormData {
//     getFormData {
//       email
//       insecure_field
//     }
//   }
// `;

class App extends React.Component<Record<string, never>, IAppState> {
  private isValid = true;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = defaultState;

    onLunaSecAuthError((e: Error) => {
      this.setState({ authError: 'Failed to authenticate with LunaSec. \n Is a user logged in?' });
    });
  }

  async componentDidMount() {
    this.loadFields();
    await this.retrieveTokens();
  }

  // This kind of works but it creates a grant for the previous token at the moment, because retrieveTokens pulls from sessionstorage.
  //We really need a cleaner way to handle this and to get all of this grant stuff out of this demo app
  // At the very least separate the pulling of tokens from session storage and the turning them into grants into separate functions
  componentDidUpdate(prevProps: Record<string, any>, prevState: IAppState) {
    // const oldTokens = prevState.tokenIDs;
    // const newTokens = this.state.tokenIDs;
    // const tokenChanged = Object.keys(newTokens).some((tokenName) => {
    //   return newTokens[tokenName as keyof Tokens] !== oldTokens[tokenName as keyof Tokens];
    // });
    // if (tokenChanged) {
    //   void this.retrieveTokens();
    // }
  }

  handleFooChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log('setting foo', event.target.value);
    this.setState({ tokenIDs: { ...this.state.tokenIDs, foo: event.target.value } });
  }

  handleBarChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting bar', event.target.value);
    this.setState({ tokenIDs: { ...this.state.tokenIDs, bar: event.target.value } });
  }

  handleUploaderChange(tokens: string | Array<string>) {
    console.log('file uploader gave new tokens: ', tokens);
    if (tokens.length === 1) {
      this.setState({ tokenIDs: { ...this.state.tokenIDs, file: tokens[0] } });
    }
  }

  persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
    if (!this.isValid) {
      return console.log('submit blocked because email is not valid');
    }
    formEvent.preventDefault();
    window.sessionStorage.setItem('savedTokenIDs', JSON.stringify(this.state.tokenIDs));
    window.sessionStorage.setItem('savedFields', JSON.stringify(this.state.fields));
  }

  loadFields() {
    const dataString = window.sessionStorage.getItem('savedFields');

    // fail through to empty object if nothing set
    const savedData = JSON.parse(dataString || '{}') as Fields;
    this.setState({ fields: savedData });
  }

  async retrieveTokens(): Promise<void> {
    const dataString = window.sessionStorage.getItem('savedTokenIDs');

    // fail through to empty object if nothing set
    const savedData = JSON.parse(dataString || '{}') as Tokens;

    console.log('retrieved Saved Data of ', savedData);

    const tokens: Record<string, string | undefined> = {
      foo: savedData.foo,
      bar: savedData.bar,
      file: savedData.file,
    };

    const resolveTokens = async (tokenGrants: Promise<Record<string, string>>, name: string) => {
      const awaitedTokenGrants = await tokenGrants;
      const token = tokens[name];
      if (token === undefined || token === '') {
        return {
          ...awaitedTokenGrants,
          [name]: undefined,
        };
      }
      await this.getDetokenizationGrant(token);
      return {
        ...awaitedTokenGrants,
        [name]: token,
      };
    };

    await Object.keys(tokens).reduce(resolveTokens.bind(this), Promise.resolve({}));
    this.setState({ loading: false, tokenIDs: tokens });

    if (this.state.tokenIDs.file !== undefined) {
      downloadFile(this.state.tokenIDs.file);
    }
  }

  async getDetokenizationGrant(tokenId: string) {
    const url = new URL('http://localhost:3001/grant');
    const params = {
      token: tokenId,
    };
    url.search = new URLSearchParams(params).toString();
    await fetch(url.toString());
  }

  emailValidated(isValid: boolean) {
    console.log(isValid ? 'Email is valid' : 'Email is not valid');
    this.isValid = isValid;
  }

  renderFileDownloadComponents(fileTokenGrant: string | undefined) {
    if (!fileTokenGrant) {
      return null;
    }
    return (
      <>
        <section>
          <h3>Secure Download (element)</h3>
          <div>
            <SecureDownload name="securefile.pdf" token={fileTokenGrant} className="test-secure-downloader" />
          </div>
        </section>
        <section>
          <h3>Secure Download (programmatic)</h3>
          <button onClick={() => downloadFile(fileTokenGrant)}>Click to trigger download with JS</button>
        </section>
      </>
    );
  }

  renderFileComponents() {
    const fileTokenGrant = this.state.tokenIDs.file;
    return (
      <div>
        {this.renderFileDownloadComponents(fileTokenGrant)}
        <section>
          <h2>Secure Upload</h2>
          <div>
            <SecureUpload
              name="uploader"
              filetokens={fileTokenGrant ? [fileTokenGrant] : undefined}
              onTokenChange={(tokens) => {
                this.handleUploaderChange(tokens);
              }}
            />
          </div>
        </section>
      </div>
    );
  }

  renderForm() {
    if (this.state.loading) {
      return null;
    }
    return (
      <section>
        {this.state.authError && <p style={{ color: 'red' }}>{this.state.authError}</p>}
        <h2>Secure Form</h2>
        <SecureForm onSubmit={(e) => this.persistTokens(e)}>
          <SecureTextArea
            name="foo"
            token={this.state.tokenIDs.foo}
            onChange={(e) => this.handleFooChange(e)}
            onBlur={(e) => console.log('blur1', e)}
          />
          <SecureInput
            name="bar"
            type="email"
            validator="Email"
            onValidate={(isValid) => this.emailValidated(isValid)}
            token={this.state.tokenIDs.bar}
            onChange={(e) => this.handleBarChange(e)}
            onBlur={(e) => console.log('blur2', e)}
            className="test-class"
            placeholder="Enter Your Email"
          />
          <input
            className="d-block"
            name="normal"
            type="text"
            value={this.state.fields.normal}
            placeholder="Insecure field coexisting"
            onChange={(e) => this.setState({ fields: { ...this.state.fields, normal: e.target.value } })}
            onBlur={(e) => console.log('blur3', e)}
          />
          <input type="submit" />
          <section>
            <h2>Secure Paragraph</h2>
            <div>
              <span>Type in the form above to populate</span>
              <SecureParagraph name="demo-paragraph" token={this.state.tokenIDs.foo} className="test-secure-span" />
            </div>
          </section>

          {this.renderFileComponents()}
        </SecureForm>
      </section>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="app-form">{this.renderForm()}</div>
      </div>
    );
  }
}

export default App;
