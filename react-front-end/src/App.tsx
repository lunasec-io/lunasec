import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';


interface IAppProps {
}

interface IAppState {
    foo?: string
    bar?: string
}


class App extends React.Component<IAppProps, IAppState> {

    // Retrieves tokens from sessionStorage and sets them to component's state
    constructor(props: IAppProps) {
        super(props);
        const dataString = window.sessionStorage.getItem('savedFields');
        const savedData = JSON.parse(dataString || "{}") as IAppState; // fail through to empty object if nothing set
        console.log("retrieved Saved Data of ", savedData);
        this.state =  savedData;
        this.handleFooChange = this.handleFooChange.bind(this)
        this.handleBarChange = this.handleBarChange.bind(this)
    }

    handleFooChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log("FOO CHANGE HANDLER CALLED ", event)
        this.setState({foo: event.target.value})
    }

    handleBarChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({bar: event.target.value})
    }

    persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
        window.sessionStorage.setItem('savedFields', JSON.stringify(this.state));
    };

    render() {
      return <div className="App">
          <div className="app-form">
              <SecureForm onSubmit={(e) => this.persistTokens(e)}>
                  <SecureInput name="foo" token={this.state.foo} onChange={this.handleFooChange}/>
                  <SecureInput name="bar" token={this.state.bar} onChange={this.handleBarChange}/>
                  <input type="submit"/>
              </SecureForm>
          </div>
      </div>
    };
};

export default App;
