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

interface FormData {
  text_area?: string;
  email?: string;
  insecure_field?: string;
  files: string[];
}

interface IAppState {
  formData: FormData;
  authError: string | null;
}

const defaultState: IAppState = {
  formData: { files: [] },
  authError: null,
};

class App extends React.Component<Record<string, never>, IAppState> {
  private isValid = true;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = defaultState;

    onLunaSecAuthError((e: Error) => {
      this.setState({ authError: 'Failed to authenticate with LunaSec. \n Is a user logged in?' });
    });
  }

  componentDidMount() {
    void this.getFormDataFromDb();
  }

  // This kind of works but it creates a grant for the previous token at the moment, because retrieveTokens pulls from sessionstorage.
  //We really need a cleaner way to handle this and to get all of this grant stuff out of this demo app
  // At the very least separate the pulling of tokens from session storage and the turning them into grants into separate functions
  // componentDidUpdate(prevProps: Record<string, any>, prevState: IAppState) {}

  handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log('setting foo', event.target.value);
    this.setState({ formData: { ...this.state.formData, text_area: event.target.value } });
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting bar', event.target.value);
    this.setState({ formData: { ...this.state.formData, email: event.target.value } });
  }

  handleUploaderChange(tokens: string[]) {
    console.log('file uploader gave new tokens: ', tokens);
    this.setState({ formData: { ...this.state.formData, files: tokens } });
  }

  async makeGraphqlRequest(requestBody: string) {
    const res = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: requestBody,
      }),
    });
    const resJson = await res.json();
    return resJson.data;
  }

  async getFormDataFromDb() {
    const resData = (await this.makeGraphqlRequest(`
          query GetFormData {
            getFormData {
              email
              insecure_field
              text_area
              files
            }
          }
        `)) as { getFormData: FormData };
    console.log('retrieved formdata ', resData);
    this.setState({ formData: resData.getFormData });
  }

  async uploadFormDataToDb(formData: FormData) {
    const mutationString = `
      mutation {
        setFormData(formData: {
          email: "${formData.email || ''}",
          insecure_field: "${formData.insecure_field || ''}",
          text_area: "${formData.text_area || ''}",
          files: ${JSON.stringify(formData.files)},
        }) {
          email
        }
      }`;
    console.log('mutation string is ', mutationString);
    const formDataRes = (await this.makeGraphqlRequest(mutationString)) as { setFormData: FormData };
    console.log('Upload data response is ', formDataRes);
  }

  persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
    if (!this.isValid) {
      return console.log('submit blocked because email is not valid');
    }
    void this.uploadFormDataToDb(this.state.formData);
  }

  emailValidated(isValid: boolean) {
    console.log(isValid ? 'Email is valid' : 'Email is not valid');
    this.isValid = isValid;
  }

  // Take in the first file from our uploader, if there is any.
  renderFileDownloadComponents(fileToken: string | undefined) {
    if (!fileToken) {
      return null;
    }
    return (
      <>
        <section>
          <h3>Secure Download (element)</h3>
          <div>
            <SecureDownload name="securefile.pdf" token={fileToken} className="test-secure-downloader" />
          </div>
        </section>
        <section>
          <h3>Secure Download (programmatic)</h3>
          <button
            onClick={() => {
              console.log('starting download');
              downloadFile(fileToken);
            }}
          >
            Click to trigger download with JS
          </button>
        </section>
      </>
    );
  }

  renderFileComponents() {
    const files = this.state.formData.files;
    return (
      <div>
        {this.renderFileDownloadComponents(files[0])}
        <section>
          <h2>Secure Upload</h2>
          <div>
            <SecureUpload
              name="uploader"
              filetokens={files}
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
    return (
      <section>
        {this.state.authError && <p style={{ color: 'red' }}>{this.state.authError}</p>}
        <h2>Secure Form</h2>
        <SecureForm onSubmit={(e) => this.persistTokens(e)}>
          <SecureTextArea
            name="text-area"
            token={this.state.formData.text_area}
            onChange={(e) => this.handleTextAreaChange(e)}
            onBlur={(e) => console.log('blur1', e)}
          />
          <SecureInput
            name="email"
            type="email"
            validator="Email"
            onValidate={(isValid) => this.emailValidated(isValid)}
            token={this.state.formData.email}
            onChange={(e) => this.handleEmailChange(e)}
            onBlur={(e) => console.log('blur2', e)}
            className="test-class"
            placeholder="Enter Your Email"
          />
          {/*an example of a plaintext field coexisting just fine with the secure components*/}
          <input
            className="d-block"
            name="normal"
            type="text"
            value={this.state.formData.insecure_field}
            placeholder="Insecure field coexisting"
            onChange={(e) => this.setState({ formData: { ...this.state.formData, insecure_field: e.target.value } })}
            onBlur={(e) => console.log('blur3', e)}
          />
          <input type="submit" />
          <section>
            <h2>Secure Paragraph</h2>
            <div>
              <span>Type in the form above to populate</span>
              <SecureParagraph
                name="demo-paragraph"
                token={this.state.formData.text_area}
                className="test-secure-span"
              />
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
