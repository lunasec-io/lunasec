import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';


interface IProps {
}

interface IState {
    foo?: string
    bar?: string
}


class App extends React.Component<IProps, IState> {

    // Saves tokens from form to sessionStorage when form submit called
    saveTokensLocally(formData:Record<string, string>) {
        console.log('submit called, storing tokens', formData);
        window.sessionStorage.setItem('savedFields', JSON.stringify(formData));
    };
    // Retrieves tokens from sessionStorage and sets them to component's state
    constructor(props: IProps) {
        super(props);
        const dataString = window.sessionStorage.getItem('savedFields');
        const savedData:IState = JSON.parse(dataString||"{}"); // fail through to empty object if nothing set
        console.log("retrieved Saved Data of ", savedData);
        this.state = savedData;
    }

    render() {
      return <div className="App">
          <div className="app-form">
              <SecureForm onSubmit={this.saveTokensLocally}>
                  <SecureInput name="foo" token={this.state.foo}/>
                  <SecureInput name="bar" token={this.state.bar}/>
                  <input type="submit"/>
              </SecureForm>
          </div>
      </div>
    };
};

export default App;
