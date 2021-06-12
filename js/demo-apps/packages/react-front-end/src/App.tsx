import { downloadFile } from '@lunasec/js-sdk';
import { SecureDownload, SecureForm, SecureInput, SecureParagraph, SecureUpload } from '@lunasec/react-sdk';
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
  tokenGrants: Tokens;
}

const defaultState: IAppState = {
  loading: true,
  fields: {},
  tokenIDs: {},
  tokenGrants: {},
};

class App extends React.Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    void this.retrieveTokens();
    this.loadFields();
  }

  handleFooChange(event: React.ChangeEvent<HTMLInputElement>) {
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
      if (token === undefined) {
        return {
          ...awaitedTokenGrants,
          [name]: undefined,
        };
      }
      const tokenGrant = await this.getDetokenizationGrant(token);
      if (tokenGrant === undefined) {
        throw new Error(`unable to get token grant for: ${token}`);
      }
      return {
        ...awaitedTokenGrants,
        [name]: tokenGrant,
      };
    };

    const tokenGrants = await Object.keys(tokens).reduce(resolveTokens.bind(this), Promise.resolve({}));
    this.setState({ tokenGrants });
    this.setState({ loading: false });

    if (this.state.tokenGrants.file !== undefined) {
      downloadFile(this.state.tokenGrants.file);
    }
  }

  async getDetokenizationGrant(tokenId: string) {
    const url = new URL('http://localhost:3001/grant');
    const params = {
      token: tokenId,
    };
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url.toString());
    const respJson: unknown = await res.json();
    const resBody = respJson as { grant?: string };
    const grant = resBody.grant;
    if (grant !== undefined) {
      console.log('Loaded detokenization grant for: ' + tokenId + ' - ' + grant);
      return grant;
    }
    console.error('Failed to load detokenization grant for: ' + tokenId);
    return undefined;
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
    const fileTokenGrant = this.state.tokenGrants.file;
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
        <h2>Secure Form</h2>
        <SecureForm onSubmit={(e) => this.persistTokens(e)}>
          <SecureInput
            name="foo"
            value={this.state.tokenGrants.foo}
            onChange={(e) => this.handleFooChange(e)}
            onBlur={(e) => console.log('blur1', e)}
            element="textarea"
          />
          <SecureInput
            name="bar"
            type="password"
            value={this.state.tokenGrants.bar}
            onChange={(e) => this.handleBarChange(e)}
            onBlur={(e) => console.log('blur2', e)}
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
              <SecureParagraph name="demo-paragraph" token={this.state.tokenGrants.foo} className="test-secure-span" />
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
