import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';


interface IAppProps {
}

interface IAppState {
    formState: Record<string, string>
}


class App extends React.Component<IAppProps, IAppState> {

    // Retrieves tokens from sessionStorage and sets them to component's state
    constructor(props: IAppProps) {
        super(props);
        const dataString = window.sessionStorage.getItem('savedFields');
        const savedData: Record<string, string> = JSON.parse(dataString || "{}"); // fail through to empty object if nothing set
        console.log("retrieved Saved Data of ", savedData);
        this.state = { formState: savedData } ;
    }

    // Saves tokens from form to sessionStorage when form submit called
    saveTokensLocally(formData:Record<string, string>) {
        console.log('submit called, storing tokens', formData);
        window.sessionStorage.setItem('savedFields', JSON.stringify(formData));
    };

    render() {
      return <div className="App">
          <div className="app-form">
              <SecureForm onSubmit={this.saveTokensLocally}>
                  <SecureInput name="foo" token={this.state.formState.foo}/>
                  <SecureInput name="bar" token={this.state.formState.bar}/>
                  <input type="submit"/>
              </SecureForm>
          </div>
      </div>
    };
};

export default App;
