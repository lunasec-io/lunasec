import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';


interface IAppProps {
}

interface IAppState {
    foo?: string
    bar?: string
    savedFoo?: string
    savedBar?: string
}


class App extends React.Component<IAppProps, IAppState> {

    // Retrieves tokens from sessionStorage and sets them to component's state
    constructor(props: IAppProps) {
        super(props);
        this.retrieveTokens();
    }

    handleFooChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event.target.value);
        this.setState({foo: event.target.value})
    }

    handleBarChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event.target.value);
        this.setState({bar: event.target.value})
    }

    persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
        window.sessionStorage.setItem('savedFields', JSON.stringify({
            foo: this.state.foo,
            bar: this.state.bar
        }));
    };

    retrieveTokens(){
        const dataString = window.sessionStorage.getItem('savedFields');
        const savedData = JSON.parse(dataString || "{}") as IAppState; // fail through to empty object if nothing set
        console.log("retrieved Saved Data of ", savedData);
        this.state = ({
            savedFoo: savedData.foo,
            savedBar: savedData.bar
        });
    }

    render() {
      return <div className="App">
          <div className="app-form">
              <SecureForm onSubmit={(e) => this.persistTokens(e)}>
                  <SecureInput secureFrameUrl="https://i2vu672h8f.execute-api.us-west-2.amazonaws.com/prod/frame" name="foo" token={this.state.savedFoo} onChange={(e) => this.handleFooChange(e)}/>
                  <SecureInput secureFrameUrl="https://i2vu672h8f.execute-api.us-west-2.amazonaws.com/prod/frame" name="bar" token={this.state.savedBar} onChange={(e) => this.handleBarChange(e)}/>
                  <input type="submit"/>
              </SecureForm>
          </div>
      </div>
    };
};

export default App;
